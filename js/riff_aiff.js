// WAV (RIFF, little-endian chunk sizes) and AIFF (IFF, big-endian chunk
// sizes) both carry Serato's Markers2 data inside an embedded ID3v2 tag
// stored in a chunk conventionally named "id3 " (WAV) or "ID3 " (AIFF).
// This module just locates and returns that chunk's raw bytes; id3.js
// does the actual ID3 parsing, same as it does for plain MP3 files.
window.S2R = window.S2R || {};

(function (S2R) {
  "use strict";

  S2R.findWavId3Chunk = function (bytes) {
    if (bytes.length < 12) return null;
    let pos = 12; // skip "RIFF" + size(4) + "WAVE"
    while (pos + 8 <= bytes.length) {
      const id = S2R.latin1Decode(bytes.slice(pos, pos + 4));
      const size =
        (bytes[pos + 4] | (bytes[pos + 5] << 8) | (bytes[pos + 6] << 16) | (bytes[pos + 7] << 24)) >>> 0;
      const dataStart = pos + 8;
      if (id.trim().toLowerCase() === "id3") {
        return bytes.slice(dataStart, Math.min(dataStart + size, bytes.length));
      }
      pos = dataStart + size + (size % 2); // chunks are padded to even length
    }
    return null;
  };

  S2R.findAiffId3Chunk = function (bytes) {
    if (bytes.length < 12) return null;
    let pos = 12; // skip "FORM" + size(4) + "AIFF"/"AIFC"
    while (pos + 8 <= bytes.length) {
      const id = S2R.latin1Decode(bytes.slice(pos, pos + 4));
      const size = S2R.readU32BE(bytes, pos + 4);
      const dataStart = pos + 8;
      if (id.trim().toLowerCase() === "id3") {
        return bytes.slice(dataStart, Math.min(dataStart + size, bytes.length));
      }
      pos = dataStart + size + (size % 2);
    }
    return null;
  };
})(window.S2R);
