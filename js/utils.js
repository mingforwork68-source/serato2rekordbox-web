// Shared low-level byte/text helpers. Everything here is pure/offline --
// no network access, no external libraries.
window.S2R = window.S2R || {};

(function (S2R) {
  "use strict";

  S2R.MarkerParseError = class extends Error {};
  S2R.NoSeratoTagError = class extends Error {};

  function latin1Decode(bytes) {
    let s = "";
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return s;
  }
  S2R.latin1Decode = latin1Decode;

  S2R.readU32BE = function (bytes, offset) {
    return (
      ((bytes[offset] << 24) |
        (bytes[offset + 1] << 16) |
        (bytes[offset + 2] << 8) |
        bytes[offset + 3]) >>>
      0
    );
  };

  S2R.readU24BE = function (bytes, offset) {
    return (bytes[offset] << 16) | (bytes[offset + 1] << 8) | bytes[offset + 2];
  };

  // Tolerant base64 decoder: filters the input down to the valid base64
  // alphabet (silently dropping whitespace, NUL bytes, and any other stray
  // junk) before decoding -- mirrors Python's base64.b64decode(...,
  // validate=False), which several real-world Serato tags depend on
  // (trailing NUL filler, one-stray-character truncation, etc).
  const B64_ALPHABET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const B64_LOOKUP = new Int16Array(256).fill(-1);
  for (let i = 0; i < B64_ALPHABET.length; i++) {
    B64_LOOKUP[B64_ALPHABET.charCodeAt(i)] = i;
  }
  const B64_PAD = 0x3d; // '='

  S2R.permissiveBase64Decode = function (bytes) {
    const clean = [];
    for (let i = 0; i < bytes.length; i++) {
      const b = bytes[i];
      if (b === B64_PAD || B64_LOOKUP[b] !== -1) clean.push(b);
    }
    let data = clean;
    const remainder = data.length % 4;
    if (remainder === 1) {
      // A single leftover base64 character can't encode a full byte and
      // can't be padded into a valid group either -- some Serato tags end
      // up with one stray trailing character. Drop it.
      data = data.slice(0, data.length - 1);
    } else if (remainder) {
      data = data.concat(new Array(4 - remainder).fill(B64_PAD));
    }

    const out = [];
    for (let i = 0; i < data.length; i += 4) {
      const c0 = data[i];
      const c1 = data[i + 1];
      const c2 = data[i + 2];
      const c3 = data[i + 3];
      if (c0 === undefined || c1 === undefined) break;
      const isPad2 = c2 === undefined || c2 === B64_PAD;
      const isPad3 = c3 === undefined || c3 === B64_PAD;
      const v0 = B64_LOOKUP[c0];
      const v1 = B64_LOOKUP[c1];
      const v2 = isPad2 ? 0 : B64_LOOKUP[c2];
      const v3 = isPad3 ? 0 : B64_LOOKUP[c3];
      if (v0 === -1 || v1 === -1 || (!isPad2 && v2 === -1) || (!isPad3 && v3 === -1)) {
        return null;
      }
      const triple = (v0 << 18) | (v1 << 12) | (v2 << 6) | v3;
      out.push((triple >> 16) & 0xff);
      if (!isPad2) out.push((triple >> 8) & 0xff);
      if (!isPad3) out.push(triple & 0xff);
    }
    return new Uint8Array(out);
  };

  // FLAC/M4A wrap the *entire* mock ID3 GEOB frame (mime + filename + desc
  // + payload) in base64, instead of just the payload MP3 stores directly.
  // Strip the mime/filename/desc prefix so the result matches what the ID3
  // GEOB reader already hands back for MP3/WAV/AIFF.
  S2R.unwrapMockGeobFrame = function (outerBytes) {
    const decoded = S2R.permissiveBase64Decode(outerBytes);
    if (!decoded) {
      throw new S2R.NoSeratoTagError("malformed base64 in embedded Serato Markers2 frame");
    }
    let start = 0;
    let nulCount = 0;
    let dataStart = -1;
    for (let i = 0; i < decoded.length; i++) {
      if (decoded[i] === 0) {
        nulCount++;
        if (nulCount === 3) {
          dataStart = i + 1;
          break;
        }
      }
    }
    if (dataStart === -1) {
      throw new S2R.NoSeratoTagError(
        "malformed embedded Serato Markers2 frame (missing mime/filename/desc prefix)"
      );
    }
    return decoded.slice(dataStart);
  };

  // XML 1.0 forbids most C0 control characters even inside attribute
  // values. Strip them so every mark round-trips cleanly through Rekordbox.
  const XML_INVALID_RE = /[\x00-\x08\x0B\x0C\x0E-\x1F]/g;
  S2R.xmlSafe = function (text) {
    if (!text) return "";
    return String(text).replace(XML_INVALID_RE, "");
  };

  S2R.xmlAttrEscape = function (text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };
})(window.S2R);
