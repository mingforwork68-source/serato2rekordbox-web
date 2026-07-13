// FLAC metadata-block reader. Only reads the VORBIS_COMMENT block (for the
// SERATO_MARKERS_V2 comment + basic title/artist/album/genre tags) and the
// STREAMINFO block (for duration). Does not touch the audio stream itself.
window.S2R = window.S2R || {};

(function (S2R) {
  "use strict";

  function parseBlocks(bytes) {
    if (bytes.length < 4 || S2R.latin1Decode(bytes.slice(0, 4)) !== "fLaC") return [];
    const blocks = [];
    let pos = 4;
    while (pos + 4 <= bytes.length) {
      const header = bytes[pos];
      const isLast = !!(header & 0x80);
      const type = header & 0x7f;
      const length = S2R.readU24BE(bytes, pos + 1);
      const dataStart = pos + 4;
      if (dataStart + length > bytes.length) break;
      blocks.push({ type, data: bytes.slice(dataStart, dataStart + length) });
      pos = dataStart + length;
      if (isLast) break;
    }
    return blocks;
  }

  function parseVorbisComments(data) {
    if (data.length < 8) return [];
    const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
    let pos = 0;
    const vendorLen = dv.getUint32(pos, true);
    pos += 4 + vendorLen;
    if (pos + 4 > data.length) return [];
    const count = dv.getUint32(pos, true);
    pos += 4;
    const comments = [];
    for (let i = 0; i < count; i++) {
      if (pos + 4 > data.length) break;
      const len = dv.getUint32(pos, true);
      pos += 4;
      if (pos + len > data.length) break;
      comments.push(new TextDecoder("utf-8").decode(data.slice(pos, pos + len)));
      pos += len;
    }
    return comments;
  }

  function vorbisCommentBlock(bytes) {
    const blocks = parseBlocks(bytes);
    const vc = blocks.find((b) => b.type === 4);
    return vc ? parseVorbisComments(vc.data) : [];
  }

  // Returns the raw (still base64-wrapped) Serato Markers2 payload, or null.
  S2R.extractFlacMarkers = function (bytes) {
    const comments = vorbisCommentBlock(bytes);
    for (const c of comments) {
      const eq = c.indexOf("=");
      if (eq === -1) continue;
      if (c.slice(0, eq).toUpperCase() === "SERATO_MARKERS_V2") {
        const value = c.slice(eq + 1);
        const valueBytes = new Uint8Array(value.length);
        for (let i = 0; i < value.length; i++) valueBytes[i] = value.charCodeAt(i) & 0xff;
        return S2R.unwrapMockGeobFrame(valueBytes);
      }
    }
    return null;
  };

  S2R.extractFlacTags = function (bytes) {
    const out = {};
    const map = { TITLE: "title", ARTIST: "artist", ALBUM: "album", GENRE: "genre" };
    for (const c of vorbisCommentBlock(bytes)) {
      const eq = c.indexOf("=");
      if (eq === -1) continue;
      const key = map[c.slice(0, eq).toUpperCase()];
      if (key && !out[key]) out[key] = c.slice(eq + 1);
    }
    return out;
  };

  S2R.extractFlacDuration = function (bytes) {
    const blocks = parseBlocks(bytes);
    const si = blocks.find((b) => b.type === 0);
    if (!si || si.data.length < 18) return null;
    const d = si.data;
    const sampleRate = (d[10] << 12) | (d[11] << 4) | (d[12] >> 4);
    if (!sampleRate) return null;
    const totalSamplesHigh = d[13] & 0x0f;
    const totalSamplesLow = S2R.readU32BE(d, 14);
    const totalSamples = totalSamplesHigh * 4294967296 + totalSamplesLow;
    return totalSamples / sampleRate;
  };
})(window.S2R);
