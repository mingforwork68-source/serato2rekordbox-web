// Direct port of serato_markers.py -- parses the reverse-engineered
// "Serato Markers2" binary blob into Cue/Loop lists. Byte offsets and
// quirks here match the already-debugged Python implementation exactly
// (see serato2rekordbox/serato_markers.py for the full format writeup).
window.S2R = window.S2R || {};

(function (S2R) {
  "use strict";

  function looksLikeEntries(payload) {
    const p3 = S2R.latin1Decode(payload.slice(0, 3));
    const p4 = S2R.latin1Decode(payload.slice(0, 4));
    const p7 = S2R.latin1Decode(payload.slice(0, 7));
    return p3 === "CUE" || p3 === "COL" || p4 === "LOOP" || p7 === "BPMLOCK";
  }

  function startsWith0101(bytes) {
    return bytes.length >= 2 && bytes[0] === 0x01 && bytes[1] === 0x01;
  }

  function unwrapOuter(raw) {
    const candidates = [];
    if (startsWith0101(raw)) candidates.push(raw.slice(2));
    candidates.push(raw);

    for (const cand of candidates) {
      const decoded = S2R.permissiveBase64Decode(cand);
      if (decoded === null) continue;
      const body = startsWith0101(decoded) ? decoded.slice(2) : decoded;
      if (looksLikeEntries(body)) return body;
      const decoded2 = S2R.permissiveBase64Decode(decoded);
      if (decoded2 !== null) {
        const body2 = startsWith0101(decoded2) ? decoded2.slice(2) : decoded2;
        if (looksLikeEntries(body2)) return body2;
      }
    }
    throw new S2R.MarkerParseError("could not locate entry stream inside tag payload");
  }

  function parseCueEntry(body) {
    if (body.length < 13) throw new S2R.MarkerParseError(`CUE entry too short (${body.length} bytes)`);
    const index = body[1];
    const position_ms = S2R.readU32BE(body, 2);
    const r = body[7],
      g = body[8],
      b = body[9];
    let nameEnd = 12;
    while (nameEnd < body.length && body[nameEnd] !== 0) nameEnd++;
    const name = new TextDecoder("utf-8").decode(body.slice(12, nameEnd));
    return { index, position_ms, color: [r, g, b], name };
  }

  function parseLoopEntry(body) {
    if (body.length < 19) throw new S2R.MarkerParseError(`LOOP entry too short (${body.length} bytes)`);
    const index = body[1];
    const start_ms = S2R.readU32BE(body, 2);
    const end_ms = S2R.readU32BE(body, 6);
    const r = body[14],
      g = body[15],
      b = body[16];
    const locked = body[18] !== 0;
    let nameEnd = 19;
    while (nameEnd < body.length && body[nameEnd] !== 0) nameEnd++;
    const name = new TextDecoder("utf-8").decode(body.slice(19, nameEnd));
    return { index, start_ms, end_ms, color: [r, g, b], locked, name };
  }

  // raw: Uint8Array of the tag's raw payload (as handed back by id3.js /
  // flac.js / mp4.js). Returns {cues: [...], loops: [...]}.
  S2R.parseMarkers2 = function (raw) {
    let body = unwrapOuter(raw);
    if (startsWith0101(body)) body = body.slice(2);

    const cues = [];
    const loops = [];
    let pos = 0;
    const n = body.length;
    while (pos < n) {
      let nul = -1;
      for (let i = pos; i < n; i++) {
        if (body[i] === 0) {
          nul = i;
          break;
        }
      }
      if (nul === -1) break;
      const typeName = S2R.latin1Decode(body.slice(pos, nul));
      pos = nul + 1;
      if (pos + 4 > n) break;
      const length = S2R.readU32BE(body, pos);
      pos += 4;
      const entryBody = body.slice(pos, pos + length);
      pos += length;

      try {
        if (typeName === "CUE") {
          cues.push(parseCueEntry(entryBody));
        } else if (typeName === "LOOP") {
          loops.push(parseLoopEntry(entryBody));
        }
      } catch (e) {
        if (!(e instanceof S2R.MarkerParseError)) throw e;
        // skip malformed entry, keep scanning
      }
    }
    return { cues, loops };
  };
})(window.S2R);
