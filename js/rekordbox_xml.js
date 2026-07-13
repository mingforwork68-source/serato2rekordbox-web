// Direct port of rekordbox_xml.py -- builds a Rekordbox-importable XML
// string from parsed track/cue/crate data. All logic (hot cue/loop slot
// collision remap, first-beat memory cue, fuzzy filename fallback
// matching) mirrors the desktop Python tool, including the bug fixes
// already found there.
window.S2R = window.S2R || {};

(function (S2R) {
  "use strict";

  function el(tag, attrs, children) {
    return { tag, attrs: attrs || {}, children: children || [] };
  }

  function renderElement(node, depth, lines) {
    const indent = "  ".repeat(depth);
    const attrStr = Object.entries(node.attrs)
      .map(([k, v]) => ` ${k}="${S2R.xmlAttrEscape(v)}"`)
      .join("");
    if (!node.children || node.children.length === 0) {
      lines.push(`${indent}<${node.tag}${attrStr} />`);
    } else {
      lines.push(`${indent}<${node.tag}${attrStr}>`);
      for (const child of node.children) renderElement(child, depth + 1, lines);
      lines.push(`${indent}</${node.tag}>`);
    }
  }

  function renderXml(root) {
    const lines = ['<?xml version="1.0" encoding="UTF-8"?>'];
    renderElement(root, 0, lines);
    return lines.join("\n") + "\n";
  }

  function basenameOf(p) {
    const parts = p.split("/");
    return parts[parts.length - 1];
  }

  function fmtSeconds(ms) {
    return (ms / 1000).toFixed(3);
  }

  function encodeSegmentPreserveColon(seg) {
    return encodeURIComponent(seg).replace(/%3A/g, ":");
  }

  function locationUrl(absPath) {
    const encoded = absPath.split("/").map(encodeSegmentPreserveColon).join("/");
    return "file://localhost" + encoded;
  }
  S2R.locationUrl = locationUrl;

  function buildLeafNode(name, trackPaths, pathToId, basenameToIds, idToPath) {
    const ids = [];
    const missing = [];
    const fuzzy = [];
    for (const p of trackPaths) {
      let tid = pathToId.get(p);
      if (tid === undefined) tid = pathToId.get(p.toLowerCase());
      if (tid === undefined) {
        const basename = basenameOf(p).toLowerCase();
        const candidates = basenameToIds.get(basename) || [];
        if (candidates.length === 1) {
          tid = candidates[0];
          fuzzy.push(`${p} -> matched by filename only to: ${idToPath.get(tid)}`);
        } else if (candidates.length > 1) {
          missing.push(`${p} (ambiguous: ${candidates.length} files share this filename)`);
          continue;
        } else {
          missing.push(p);
          continue;
        }
      }
      ids.push(tid);
    }
    const node = el(
      "NODE",
      { Name: S2R.xmlSafe(name), Type: "1", KeyType: "0", Entries: String(ids.length) },
      ids.map((tid) => el("TRACK", { Key: String(tid) }))
    );
    return { element: node, missing, fuzzy };
  }

  function buildPlaylistNode(name, node, pathToId, basenameToIds, idToPath) {
    let missing = [];
    let fuzzy = [];
    if (node.children.size > 0) {
      const count = node.children.size + (node.ownTracks !== null ? 1 : 0);
      const element = el("NODE", { Type: "0", Name: S2R.xmlSafe(name), Count: String(count) }, []);
      if (node.ownTracks !== null) {
        const leaf = buildLeafNode(name, node.ownTracks, pathToId, basenameToIds, idToPath);
        element.children.push(leaf.element);
        missing = missing.concat(leaf.missing);
        fuzzy = fuzzy.concat(leaf.fuzzy);
      }
      for (const [childName, childNode] of node.children) {
        const r = buildPlaylistNode(childName, childNode, pathToId, basenameToIds, idToPath);
        element.children.push(r.element);
        missing = missing.concat(r.missing);
        fuzzy = fuzzy.concat(r.fuzzy);
      }
      return { element, missing, fuzzy };
    }
    return buildLeafNode(name, node.ownTracks || [], pathToId, basenameToIds, idToPath);
  }

  // entries: [{ info: {path, title, artist, album, genre, kind, sizeBytes,
  //   totalTimeS, bitrate}, cues: [...], loops: [...], originalPath }]
  // opts: { includeCues, playlistTree }
  // playlistTree: { ownTracks: string[]|null, children: Map<string, node> }
  S2R.buildXml = function (entries, opts) {
    opts = opts || {};
    const includeCues = opts.includeCues !== false;
    const playlistTree = opts.playlistTree || null;

    const collectionChildren = [];
    const pathToId = new Map();
    const basenameToIds = new Map();
    const idToPath = new Map();

    entries.forEach((entry, i) => {
      const idx = i + 1;
      const info = entry.info;
      pathToId.set(info.path, idx);
      idToPath.set(idx, info.path);
      const bn = basenameOf(info.path).toLowerCase();
      if (!basenameToIds.has(bn)) basenameToIds.set(bn, []);
      basenameToIds.get(bn).push(idx);
      if (entry.originalPath) {
        if (!pathToId.has(entry.originalPath)) pathToId.set(entry.originalPath, idx);
        const obn = basenameOf(entry.originalPath).toLowerCase();
        if (!basenameToIds.has(obn)) basenameToIds.set(obn, []);
        basenameToIds.get(obn).push(idx);
      }

      const attrs = {
        TrackID: String(idx),
        Name: S2R.xmlSafe(info.title),
        Artist: S2R.xmlSafe(info.artist),
        Album: S2R.xmlSafe(info.album),
        Genre: S2R.xmlSafe(info.genre),
        Kind: info.kind,
        Size: String(info.sizeBytes),
        Location: locationUrl(info.path),
      };
      if (info.totalTimeS != null) attrs.TotalTime = String(Math.round(info.totalTimeS));
      if (info.bitrate) attrs.BitRate = String(Math.round(info.bitrate / 1000));

      const trackChildren = [];
      if (includeCues) {
        const sortedCues = entry.cues.slice().sort((a, b) => a.index - b.index);
        for (const cue of sortedCues) {
          const [r, g, b] = cue.color;
          trackChildren.push(
            el("POSITION_MARK", {
              Name: S2R.xmlSafe(cue.name),
              Type: "0",
              Start: fmtSeconds(cue.position_ms),
              Num: String(cue.index),
              Red: String(r),
              Green: String(g),
              Blue: String(b),
            })
          );
        }

        // Serato keeps Cues and Loops as two independently-numbered sets of
        // up to 8 pads each; Rekordbox Hot Cues (A-H) are one shared set of 8
        // slots. Keep cues on their original slot and bump any colliding loop
        // to the next free slot (or drop to a Memory Cue if all 8 are taken).
        const usedSlots = new Set(entry.cues.map((c) => c.index));
        const sortedLoops = entry.loops.slice().sort((a, b) => a.index - b.index);
        for (const loop of sortedLoops) {
          let slot = loop.index;
          if (usedSlots.has(slot)) {
            slot = null;
            for (let i = 0; i < 8; i++) {
              if (!usedSlots.has(i)) {
                slot = i;
                break;
              }
            }
          }
          if (slot !== null) usedSlots.add(slot);
          const [r, g, b] = loop.color;
          trackChildren.push(
            el("POSITION_MARK", {
              Name: S2R.xmlSafe(loop.name),
              Type: "4",
              Start: fmtSeconds(loop.start_ms),
              End: fmtSeconds(loop.end_ms),
              Num: slot !== null ? String(slot) : "-1",
              Red: String(r),
              Green: String(g),
              Blue: String(b),
            })
          );
        }
      }

      collectionChildren.push(el("TRACK", attrs, trackChildren));
    });

    const collection = el("COLLECTION", { Entries: String(entries.length) }, collectionChildren);

    let allMissing = [];
    let allFuzzy = [];
    const playlistsChildren = [];
    if (playlistTree && playlistTree.children.size > 0) {
      const rootChildren = [];
      for (const [name, child] of playlistTree.children) {
        const r = buildPlaylistNode(name, child, pathToId, basenameToIds, idToPath);
        rootChildren.push(r.element);
        allMissing = allMissing.concat(r.missing);
        allFuzzy = allFuzzy.concat(r.fuzzy);
      }
      playlistsChildren.push(el("NODE", { Type: "0", Name: "ROOT", Count: String(playlistTree.children.size) }, rootChildren));
    } else {
      playlistsChildren.push(el("NODE", { Type: "0", Name: "ROOT", Count: "0" }));
    }
    const playlists = el("PLAYLISTS", {}, playlistsChildren);

    const root = el("DJ_PLAYLISTS", { Version: "1.0.0" }, [
      el("PRODUCT", { Name: "rekordbox", Version: "6.0.0", Company: "Pioneer DJ" }),
      collection,
      playlists,
    ]);

    return { xmlText: renderXml(root), missing: allMissing, fuzzy: allFuzzy };
  };
})(window.S2R);
