// Minimal MP4/M4A atom-tree walker. Only descends moov -> udta -> meta ->
// ilst to find the "----" freeform atom Serato uses for Markers2
// (mean="com.serato.dj", name="markersv2") plus the standard iTunes text
// atoms (c)nam/c)ART/c)alb/c)gen, and reads mvhd for duration.
window.S2R = window.S2R || {};

(function (S2R) {
  "use strict";

  function parseAtoms(bytes, start, end) {
    const atoms = [];
    let pos = start;
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    while (pos + 8 <= end) {
      let size = dv.getUint32(pos);
      const type = S2R.latin1Decode(bytes.slice(pos + 4, pos + 8));
      let headerSize = 8;
      if (size === 1) {
        if (pos + 16 > end) break;
        const hi = dv.getUint32(pos + 8);
        const lo = dv.getUint32(pos + 12);
        size = hi * 4294967296 + lo;
        headerSize = 16;
      } else if (size === 0) {
        size = end - pos;
      }
      if (size < headerSize || pos + size > end) break;
      atoms.push({ type, dataStart: pos + headerSize, dataEnd: pos + size });
      pos += size;
    }
    return atoms;
  }

  // Descends a fixed path of container atoms, handling the "meta" atom's
  // extra 4-byte version/flags field that most other containers don't have.
  function descend(bytes, path) {
    let atoms = parseAtoms(bytes, 0, bytes.length);
    let current = null;
    for (const type of path) {
      current = atoms.find((a) => a.type === type);
      if (!current) return null;
      let childStart = current.dataStart;
      if (type === "meta") childStart += 4;
      atoms = parseAtoms(bytes, childStart, current.dataEnd);
    }
    return atoms;
  }

  function ilstChildren(bytes) {
    return descend(bytes, ["moov", "udta", "meta", "ilst"]);
  }

  S2R.extractMp4Markers = function (bytes) {
    const children = ilstChildren(bytes);
    if (!children) return null;
    for (const atom of children) {
      if (atom.type !== "----") continue;
      const parts = parseAtoms(bytes, atom.dataStart, atom.dataEnd);
      let mean = null;
      let name = null;
      let dataAtom = null;
      for (const c of parts) {
        if (c.type === "mean") mean = S2R.latin1Decode(bytes.slice(c.dataStart + 4, c.dataEnd));
        else if (c.type === "name") name = S2R.latin1Decode(bytes.slice(c.dataStart + 4, c.dataEnd));
        else if (c.type === "data") dataAtom = c;
      }
      if (mean === "com.serato.dj" && name === "markersv2" && dataAtom) {
        const valueBytes = bytes.slice(dataAtom.dataStart + 8, dataAtom.dataEnd);
        return S2R.unwrapMockGeobFrame(valueBytes);
      }
    }
    return null;
  };

  S2R.extractMp4Tags = function (bytes) {
    const out = {};
    const children = ilstChildren(bytes);
    if (!children) return out;
    const map = { "©nam": "title", "©ART": "artist", "©alb": "album", "©gen": "genre" };
    for (const atom of children) {
      const key = map[atom.type];
      if (!key) continue;
      const parts = parseAtoms(bytes, atom.dataStart, atom.dataEnd);
      const dataAtom = parts.find((c) => c.type === "data");
      if (dataAtom) {
        out[key] = new TextDecoder("utf-8").decode(bytes.slice(dataAtom.dataStart + 8, dataAtom.dataEnd));
      }
    }
    return out;
  };

  S2R.extractMp4Duration = function (bytes) {
    const atoms = parseAtoms(bytes, 0, bytes.length);
    const moov = atoms.find((a) => a.type === "moov");
    if (!moov) return null;
    const moovChildren = parseAtoms(bytes, moov.dataStart, moov.dataEnd);
    const mvhd = moovChildren.find((a) => a.type === "mvhd");
    if (!mvhd) return null;
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const version = bytes[mvhd.dataStart];
    if (version === 1) {
      const timescale = dv.getUint32(mvhd.dataStart + 20);
      const hi = dv.getUint32(mvhd.dataStart + 24);
      const lo = dv.getUint32(mvhd.dataStart + 28);
      const duration = hi * 4294967296 + lo;
      return timescale ? duration / timescale : null;
    }
    const timescale = dv.getUint32(mvhd.dataStart + 12);
    const duration = dv.getUint32(mvhd.dataStart + 16);
    return timescale ? duration / timescale : null;
  };
})(window.S2R);
