// Direct port of serato_crates.py -- parses Serato ".crate" files (under
// _Serato_/Subcrates/*.crate) to recover playlist track order. Does not
// handle Smart Crates (*.scrate), which are rule-based, not an ordered list.
window.S2R = window.S2R || {};

(function (S2R) {
  "use strict";

  function parseChunks(data) {
    const chunks = [];
    let pos = 0;
    const n = data.length;
    while (pos + 8 <= n) {
      const tag = S2R.latin1Decode(data.slice(pos, pos + 4));
      const length = S2R.readU32BE(data, pos + 4);
      pos += 8;
      if (pos + length > n) break;
      chunks.push({ tag, payload: data.slice(pos, pos + length) });
      pos += length;
    }
    return chunks;
  }

  function decodeUtf16be(payload) {
    try {
      return new TextDecoder("utf-16be").decode(payload);
    } catch (e) {
      return "";
    }
  }

  // Turns a crate-stored path back into an absolute filesystem path string.
  function resolveTrackPath(ptrk) {
    if (/^[A-Za-z]:\//.test(ptrk)) return ptrk; // Windows absolute path
    return "/" + ptrk;
  }

  // Returns the ordered list of resolved absolute track paths in a .crate file.
  S2R.parseCrateFile = function (bytes) {
    const trackPaths = [];
    for (const { tag, payload } of parseChunks(bytes)) {
      if (tag !== "otrk") continue;
      for (const sub of parseChunks(payload)) {
        if (sub.tag === "ptrk") {
          trackPaths.push(resolveTrackPath(decodeUtf16be(sub.payload)));
          break;
        }
      }
    }
    return trackPaths;
  };

  S2R.crateNameFromFilename = function (filename) {
    const stem = filename.replace(/\.crate$/i, "");
    return stem.split("%%");
  };

  function dedupePreservingOrder(paths) {
    const seen = new Set();
    const result = [];
    for (const p of paths) {
      const key = p.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      result.push(p);
    }
    return result;
  }

  // crates: [{namePath: [...], trackPaths: [...]}]
  // Returns a tree: {ownTracks: string[]|null, children: Map<string, node>}
  S2R.buildPlaylistTree = function (crates) {
    const root = { ownTracks: null, children: new Map() };
    for (const crate of crates) {
      let node = root;
      for (const segment of crate.namePath) {
        if (!node.children.has(segment)) {
          node.children.set(segment, { ownTracks: null, children: new Map() });
        }
        node = node.children.get(segment);
      }
      node.ownTracks = dedupePreservingOrder(crate.trackPaths);
    }
    return root;
  };
})(window.S2R);
