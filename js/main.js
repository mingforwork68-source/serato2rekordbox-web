// UI wiring + orchestration. Everything below runs entirely in the
// browser: audio files are read with the File API and never leave this
// tab (no fetch/XHR/WebSocket calls happen anywhere in this app).
(function () {
  "use strict";

  const SUPPORTED_EXT = new Set([".mp3", ".flac", ".wav", ".aiff", ".aif", ".m4a", ".alac"]);
  const KIND_BY_EXT = {
    ".mp3": "MP3 File",
    ".flac": "FLAC File",
    ".wav": "WAV File",
    ".aiff": "AIFF File",
    ".aif": "AIFF File",
    ".m4a": "M4A File",
    ".alac": "M4A File",
  };

  let musicFiles = []; // {relativePath, file, topFolder}
  let seratoCrateFiles = []; // {relativePath, file, topFolder}
  let lastXml = null;
  let lastReport = null;

  // ---------- folder collection (drag&drop + <input webkitdirectory>) ----------

  function readEntryRecursive(entry, pathPrefix) {
    return new Promise((resolve) => {
      if (entry.isFile) {
        entry.file(
          (file) => resolve([{ relativePath: pathPrefix + entry.name, file }]),
          () => resolve([])
        );
      } else if (entry.isDirectory) {
        const reader = entry.createReader();
        const collected = [];
        const readBatch = () => {
          reader.readEntries((batch) => {
            if (!batch.length) {
              Promise.all(collected.map((e) => readEntryRecursive(e, pathPrefix + entry.name + "/"))).then((results) =>
                resolve(results.flat())
              );
            } else {
              collected.push(...batch);
              readBatch();
            }
          }, () => resolve([]));
        };
        readBatch();
      } else {
        resolve([]);
      }
    });
  }

  async function collectFromDataTransfer(dataTransfer) {
    const items = Array.from(dataTransfer.items);
    const entries = items.map((it) => (it.webkitGetAsEntry ? it.webkitGetAsEntry() : null)).filter(Boolean);
    const results = await Promise.all(entries.map((e) => readEntryRecursive(e, "")));
    return results.flat().map(({ relativePath, file }) => ({
      relativePath,
      file,
      topFolder: relativePath.split("/")[0],
    }));
  }

  function collectFromFileInput(fileList) {
    return Array.from(fileList).map((file) => {
      const rel = file.webkitRelativePath || file.name;
      return { relativePath: rel, file, topFolder: rel.split("/")[0] };
    });
  }

  // Accepts either a whole folder (containing Subcrates/*.crate anywhere
  // inside it) or one or more individually-picked .crate files -- any
  // entry ending in .crate is picked up regardless of its parent folder.
  function isCrateEntry(e) {
    return e.relativePath.toLowerCase().endsWith(".crate");
  }

  // ---------- UI: Serato playlist source ----------

  const seratoZone = document.getElementById("seratoDropZone");
  const seratoFolderInput = document.getElementById("seratoFolderInput");
  const seratoFileInput = document.getElementById("seratoFileInput");
  const seratoStatus = document.getElementById("seratoStatus");

  let seratoScannedCount = 0; // every file looked at, incl. non-.crate ones (diagnostic only)
  let seratoScannedSample = []; // a few example paths, for the "found nothing" hint

  function refreshSeratoStatus() {
    if (seratoCrateFiles.length) {
      const names = seratoCrateFiles.map((f) => f.file.name);
      const shown = names.slice(0, 5).join("、");
      const suffix = names.length > 5 ? ` 等,共 ${names.length} 個` : "";
      seratoStatus.textContent = `已讀取 ${seratoCrateFiles.length} 個 .crate 播放列表:${shown}${suffix}`;
      seratoStatus.className = "status ok";
    } else if (seratoScannedCount > 0) {
      const sample = seratoScannedSample.slice(0, 3).join("、");
      seratoStatus.textContent =
        `掃到 ${seratoScannedCount} 個檔案,但裡面沒有任何 .crate(例如:${sample})。` +
        `請確認選到的資料夾底下真的有 Subcrates 資料夾、裡面是 .crate 檔案。`;
      seratoStatus.className = "status warn";
    } else {
      seratoStatus.textContent = "尚未選擇";
      seratoStatus.className = "status warn";
    }
  }

  function addSeratoEntries(entries) {
    const crateEntries = entries.filter(isCrateEntry);
    seratoCrateFiles = seratoCrateFiles.concat(crateEntries);
    seratoScannedCount += entries.length;
    if (seratoScannedSample.length < 3) {
      seratoScannedSample = seratoScannedSample.concat(entries.slice(0, 3).map((e) => e.relativePath));
    }
    refreshSeratoStatus();
  }

  seratoZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    seratoZone.classList.add("dragover");
  });
  seratoZone.addEventListener("dragleave", () => seratoZone.classList.remove("dragover"));
  seratoZone.addEventListener("drop", async (e) => {
    e.preventDefault();
    seratoZone.classList.remove("dragover");
    const entries = await collectFromDataTransfer(e.dataTransfer);
    addSeratoEntries(entries);
  });
  seratoFolderInput.addEventListener("change", () => {
    addSeratoEntries(collectFromFileInput(seratoFolderInput.files));
    // Reset so picking the exact same folder again still fires "change" --
    // browsers only fire it when the input's value actually changes, and
    // re-selecting an identical folder/file leaves the value unchanged.
    seratoFolderInput.value = "";
  });
  seratoFileInput.addEventListener("change", () => {
    addSeratoEntries(collectFromFileInput(seratoFileInput.files));
    seratoFileInput.value = "";
  });
  document.getElementById("clearSeratoBtn").addEventListener("click", () => {
    seratoCrateFiles = [];
    seratoScannedCount = 0;
    seratoScannedSample = [];
    refreshSeratoStatus();
  });

  // ---------- UI: music folder drop zone (single folder only) ----------

  const musicZone = document.getElementById("musicDropZone");
  const musicInput = document.getElementById("musicInput");
  const musicStatus = document.getElementById("musicStatus");
  const rootRow = document.getElementById("rootRow");
  const rootLabel = document.getElementById("rootLabel");
  const rootInput = document.getElementById("rootInput");
  const pathWarning = document.getElementById("pathWarning");

  // The browser will never hand JS a file's real absolute filesystem path
  // (that's a deliberate privacy restriction, not a bug) -- so the closest
  // thing to "auto-fill" available is remembering what the user typed last
  // time for a folder of this name, in this browser's localStorage.
  function loadStoredFolderRoot(folder) {
    try { return localStorage.getItem("s2r_root_" + folder) || ""; } catch (e) { return ""; }
  }
  function storeFolderRoot(folder, v) {
    try { localStorage.setItem("s2r_root_" + folder, v); } catch (e) {}
  }

  function renderRootRow() {
    if (musicFiles.length === 0) {
      rootRow.classList.add("hidden");
      return;
    }
    const folder = musicFiles[0].topFolder;
    rootRow.classList.remove("hidden");
    rootLabel.textContent = `「${folder}」資料夾在你電腦上的完整路徑:`;
    rootInput.placeholder = `例如 /Users/yourname/Music/${folder}`;
    rootInput.dataset.folder = folder;
    rootInput.value = loadStoredFolderRoot(folder);
    updatePathWarning();
  }

  rootInput.addEventListener("input", () => {
    storeFolderRoot(rootInput.dataset.folder, rootInput.value.trim());
    updatePathWarning();
  });

  function addMusicFiles(entries) {
    const supported = entries.filter((e) => SUPPORTED_EXT.has(extOf(e.file.name)));
    if (supported.length === 0) return;
    const firstFolder = supported[0].topFolder;
    const kept = supported.filter((e) => e.topFolder === firstFolder);
    const ignoredFolders = new Set(supported.filter((e) => e.topFolder !== firstFolder).map((e) => e.topFolder));
    musicFiles = kept; // single-folder mode: a new selection replaces the old one
    musicStatus.textContent = ignoredFolders.size
      ? `已選擇「${firstFolder}」,共 ${musicFiles.length} 個音樂檔案(這裡只支援單一資料夾,已忽略:${Array.from(ignoredFolders).join("、")})`
      : `已選擇 ${musicFiles.length} 個音樂檔案`;
    musicStatus.className = "status ok";
    renderRootRow();
  }

  musicZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    musicZone.classList.add("dragover");
  });
  musicZone.addEventListener("dragleave", () => musicZone.classList.remove("dragover"));
  musicZone.addEventListener("drop", async (e) => {
    e.preventDefault();
    musicZone.classList.remove("dragover");
    const entries = await collectFromDataTransfer(e.dataTransfer);
    addMusicFiles(entries);
  });
  musicInput.addEventListener("change", () => {
    addMusicFiles(collectFromFileInput(musicInput.files));
    // Reset so picking the exact same folder again still fires "change".
    musicInput.value = "";
  });

  document.getElementById("clearMusicBtn").addEventListener("click", () => {
    musicFiles = [];
    musicStatus.textContent = "尚未選擇";
    musicStatus.className = "status warn";
    renderRootRow();
  });

  function extOf(filename) {
    const i = filename.lastIndexOf(".");
    return i === -1 ? "" : filename.slice(i).toLowerCase();
  }

  // ---------- absolute path resolution ----------

  function updatePathWarning() {
    pathWarning.textContent = "";
    updateConvertEnabled();
  }

  function updateConvertEnabled() {
    document.getElementById("convertBtn").disabled = musicFiles.length === 0;
  }

  function computeAbsPath(entry, root) {
    const relSuffix = entry.relativePath.split("/").slice(1).join("/");
    if (root) return root + "/" + relSuffix;
    // No root supplied: fall back to a relative-looking path. Location in
    // the XML will be wrong, but conversion can still proceed so the user
    // can see cue/playlist results before fixing the path and re-running.
    return "/" + entry.relativePath;
  }

  // ---------- per-file extraction ----------

  async function extractTrack(entry, root) {
    const ext = extOf(entry.file.name);
    const buf = new Uint8Array(await entry.file.arrayBuffer());
    let markersRaw = null;
    let tags = {};
    let duration = null;
    let bitrate = null;

    try {
      if (ext === ".mp3") {
        markersRaw = window.S2R.extractGeobMarkers2(buf);
        tags = window.S2R.extractId3Tags(buf);
        duration = window.S2R.extractMp3Duration(buf);
        bitrate = window.S2R.extractMp3Bitrate(buf);
      } else if (ext === ".wav") {
        const id3 = window.S2R.findWavId3Chunk(buf);
        if (id3) {
          markersRaw = window.S2R.extractGeobMarkers2(id3);
          tags = window.S2R.extractId3Tags(id3);
        }
      } else if (ext === ".aiff" || ext === ".aif") {
        const id3 = window.S2R.findAiffId3Chunk(buf);
        if (id3) {
          markersRaw = window.S2R.extractGeobMarkers2(id3);
          tags = window.S2R.extractId3Tags(id3);
        }
      } else if (ext === ".flac") {
        markersRaw = window.S2R.extractFlacMarkers(buf);
        tags = window.S2R.extractFlacTags(buf);
        duration = window.S2R.extractFlacDuration(buf);
      } else if (ext === ".m4a" || ext === ".alac") {
        markersRaw = window.S2R.extractMp4Markers(buf);
        tags = window.S2R.extractMp4Tags(buf);
        duration = window.S2R.extractMp4Duration(buf);
      }
    } catch (e) {
      return { status: "ERROR", relativePath: entry.relativePath, error: String((e && e.message) || e) };
    }

    let cues = [];
    let loops = [];
    let status = "NOCUE";
    if (markersRaw) {
      try {
        const parsed = window.S2R.parseMarkers2(markersRaw);
        cues = parsed.cues;
        loops = parsed.loops;
        status = "OK";
      } catch (e) {
        return { status: "ERROR", relativePath: entry.relativePath, error: String((e && e.message) || e) };
      }
    }

    const nameNoExt = entry.file.name.replace(/\.[^.]+$/, "");
    const absPath = computeAbsPath(entry, root);

    return {
      status,
      relativePath: entry.relativePath,
      trackEntry: {
        info: {
          path: absPath,
          title: tags.title || nameNoExt,
          artist: tags.artist || "",
          album: tags.album || "",
          genre: tags.genre || "",
          kind: KIND_BY_EXT[ext] || "Unknown",
          sizeBytes: entry.file.size,
          totalTimeS: duration,
          bitrate,
        },
        cues,
        loops,
        originalPath: null,
      },
    };
  }

  async function loadCrates() {
    const crates = [];
    const errors = [];
    for (const f of seratoCrateFiles) {
      try {
        const buf = new Uint8Array(await f.file.arrayBuffer());
        const trackPaths = window.S2R.parseCrateFile(buf);
        const namePath = window.S2R.crateNameFromFilename(f.file.name);
        crates.push({ namePath, trackPaths });
      } catch (e) {
        errors.push(`${f.relativePath}: ${(e && e.message) || e}`);
      }
    }
    return { crates, errors };
  }

  // ---------- convert ----------

  const progressBar = document.getElementById("progressBar");
  const progressLabel = document.getElementById("progressLabel");
  const logArea = document.getElementById("logArea");
  const resultsArea = document.getElementById("resultsArea");
  const summaryText = document.getElementById("summaryText");

  function log(line) {
    logArea.textContent += line + "\n";
    logArea.scrollTop = logArea.scrollHeight;
  }

  function setProgress(done, total, label) {
    const pct = total ? Math.round((done / total) * 100) : 0;
    progressBar.style.width = pct + "%";
    progressLabel.textContent = `${label} (${done}/${total})`;
  }

  function yieldToUI() {
    return new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
  }

  async function runConvert() {
    document.getElementById("convertBtn").disabled = true;
    resultsArea.classList.add("hidden");
    logArea.textContent = "";
    const root = rootInput.value.trim().replace(/\/+$/, "");

    const entries = [];
    const report = [];
    let okCount = 0;
    let nocueCount = 0;
    let errorCount = 0;

    setProgress(0, musicFiles.length, "掃描音樂檔案並讀取 Cue 資訊");
    for (let i = 0; i < musicFiles.length; i++) {
      const result = await extractTrack(musicFiles[i], root);
      if (result.status === "OK") {
        okCount++;
        entries.push(result.trackEntry);
      } else if (result.status === "NOCUE") {
        nocueCount++;
        entries.push(result.trackEntry);
      } else {
        errorCount++;
        report.push(`ERROR\t${result.relativePath}\t${result.error}`);
      }
      if (result.status !== "ERROR") {
        report.push(`${result.status}\t${result.relativePath}`);
      }
      if (i % 15 === 0 || i === musicFiles.length - 1) {
        setProgress(i + 1, musicFiles.length, "掃描音樂檔案並讀取 Cue 資訊");
        await yieldToUI();
      }
    }

    log(`掃描完成:OK ${okCount}、NOCUE ${nocueCount}、ERROR ${errorCount}`);

    setProgress(0, 1, "讀取 Serato 播放列表");
    await yieldToUI();
    const { crates, errors: crateErrors } = await loadCrates();
    for (const err of crateErrors) log(`CRATE_ERROR\t${err}`);
    const playlistTree = crates.length ? window.S2R.buildPlaylistTree(crates) : null;
    if (playlistTree) log(`已讀取 ${crates.length} 個播放列表`);

    setProgress(1, 1, "產生 Rekordbox XML");
    await yieldToUI();

    const includeCues = document.getElementById("optUseSeratoCueExtras").checked;
    const opts = { includeCues, playlistTree };
    const { xmlText, missing, fuzzy } = window.S2R.buildXml(entries, opts);

    for (const m of missing) report.push(`PLAYLIST_MISSING\t${m}`);
    for (const f of fuzzy) report.push(`PLAYLIST_FUZZY_MATCH\t${f}`);

    lastXml = xmlText;
    lastReport = report.join("\n") + "\n";

    summaryText.textContent =
      `共 ${musicFiles.length} 個檔案:OK ${okCount}、NOCUE ${nocueCount}、ERROR ${errorCount}。` +
      (playlistTree ? ` 播放列表比對:缺少 ${missing.length}、模糊比對 ${fuzzy.length}。` : " 沒有匯入播放列表。");
    resultsArea.classList.remove("hidden");
    document.getElementById("convertBtn").disabled = false;
    log("完成!可以下載 XML 了。");
  }

  function downloadText(filename, text, mime) {
    const blob = new Blob([text], { type: mime || "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  document.getElementById("convertBtn").addEventListener("click", () => {
    runConvert().catch((e) => {
      log("發生未預期的錯誤:" + ((e && e.stack) || e));
      document.getElementById("convertBtn").disabled = false;
    });
  });

  document.getElementById("downloadXmlBtn").addEventListener("click", () => {
    if (!lastXml) return;
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "").replace("T", "_");
    downloadText(`rekordbox_${stamp}.xml`, lastXml, "application/xml");
  });

  document.getElementById("downloadReportBtn").addEventListener("click", () => {
    if (!lastReport) return;
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "").replace("T", "_");
    downloadText(`report_${stamp}.txt`, lastReport, "text/plain");
  });

  updateConvertEnabled();
})();
