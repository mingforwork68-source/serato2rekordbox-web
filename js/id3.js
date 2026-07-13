// Minimal ID3v2 (2.2/2.3/2.4) reader -- just enough to find the "Serato
// Markers2" GEOB frame and a handful of text frames (title/artist/album/
// genre). Not a general-purpose ID3 library: unknown/irrelevant frames are
// skipped, and per-frame unsynchronisation (an ID3v2.4 option) is not
// unwound (rare in practice for GEOB-carrying files).
window.S2R = window.S2R || {};

(function (S2R) {
  "use strict";

  function readSyncsafe(bytes, offset) {
    return (
      ((bytes[offset] & 0x7f) << 21) |
      ((bytes[offset + 1] & 0x7f) << 14) |
      ((bytes[offset + 2] & 0x7f) << 7) |
      (bytes[offset + 3] & 0x7f)
    );
  }

  function deunsynchronize(bytes) {
    const out = [];
    for (let i = 0; i < bytes.length; i++) {
      out.push(bytes[i]);
      if (bytes[i] === 0xff && i + 1 < bytes.length && bytes[i + 1] === 0x00) {
        i++; // skip the inserted 0x00
      }
    }
    return new Uint8Array(out);
  }

  function findId3Tag(bytes) {
    if (
      bytes.length < 10 ||
      bytes[0] !== 0x49 ||
      bytes[1] !== 0x44 ||
      bytes[2] !== 0x33
    ) {
      return null;
    }
    const majorVersion = bytes[3];
    const flags = bytes[5];
    const size = readSyncsafe(bytes, 6);
    let pos = 10;
    const tagEnd = Math.min(10 + size, bytes.length);
    const unsynchronized = !!(flags & 0x80);
    const hasExtHeader = !!(flags & 0x40);
    if (hasExtHeader && pos + 4 <= tagEnd) {
      if (majorVersion >= 4) {
        pos += readSyncsafe(bytes, pos);
      } else {
        pos += 4 + S2R.readU32BE(bytes, pos);
      }
    }
    let body = bytes.slice(pos, tagEnd);
    if (unsynchronized) body = deunsynchronize(body);
    return { majorVersion, body };
  }

  function iterateFrames(tagInfo) {
    const { majorVersion, body } = tagInfo;
    const frames = [];
    let pos = 0;
    const idLen = majorVersion === 2 ? 3 : 4;
    const minHeader = majorVersion === 2 ? 6 : 10;
    while (pos + minHeader <= body.length) {
      const id = S2R.latin1Decode(body.slice(pos, pos + idLen));
      if (!/^[A-Za-z0-9]+$/.test(id)) break; // padding / garbage
      pos += idLen;
      let size;
      if (majorVersion === 2) {
        size = S2R.readU24BE(body, pos);
        pos += 3;
      } else if (majorVersion === 4) {
        size = readSyncsafe(body, pos);
        pos += 4 + 2; // size + flags
      } else {
        size = S2R.readU32BE(body, pos);
        pos += 4 + 2; // size + flags
      }
      if (size < 0 || pos + size > body.length) break;
      frames.push({ id, body: body.slice(pos, pos + size) });
      pos += size;
    }
    return frames;
  }

  function readCString(bytes, offset) {
    let end = offset;
    while (end < bytes.length && bytes[end] !== 0) end++;
    return { text: S2R.latin1Decode(bytes.slice(offset, end)), nextOffset: Math.min(end + 1, bytes.length) };
  }

  // Reads an encoding-aware terminated string (used for GEOB filename/desc
  // and for text-information frame values). encoding: 0=Latin1, 1=UTF-16
  // w/ BOM, 2=UTF-16BE no BOM (v2.4 only), 3=UTF-8 (v2.4 only).
  function decodeIdText(bytes, offset, encoding) {
    if (encoding === 1 || encoding === 2) {
      let end = offset;
      while (end + 1 < bytes.length && !(bytes[end] === 0 && bytes[end + 1] === 0)) end += 2;
      const slice = bytes.slice(offset, end);
      let text = "";
      try {
        if (encoding === 1 && slice.length >= 2 && slice[0] === 0xff && slice[1] === 0xfe) {
          text = new TextDecoder("utf-16le").decode(slice.slice(2));
        } else if (encoding === 1 && slice.length >= 2 && slice[0] === 0xfe && slice[1] === 0xff) {
          text = new TextDecoder("utf-16be").decode(slice.slice(2));
        } else {
          text = new TextDecoder(encoding === 2 ? "utf-16be" : "utf-16le").decode(slice);
        }
      } catch (e) {
        text = "";
      }
      return { text, nextOffset: Math.min(end + 2, bytes.length) };
    }
    let end = offset;
    while (end < bytes.length && bytes[end] !== 0) end++;
    const slice = bytes.slice(offset, end);
    const text = encoding === 3 ? new TextDecoder("utf-8").decode(slice) : S2R.latin1Decode(slice);
    return { text, nextOffset: Math.min(end + 1, bytes.length) };
  }

  function parseGeobFrame(body) {
    if (body.length < 1) return null;
    const encoding = body[0];
    let offset = 1;
    const mime = readCString(body, offset);
    offset = mime.nextOffset;
    const filename = decodeIdText(body, offset, encoding);
    offset = filename.nextOffset;
    const desc = decodeIdText(body, offset, encoding);
    offset = desc.nextOffset;
    return { desc: desc.text, data: body.slice(offset) };
  }

  function readTextFrameValue(frameBody) {
    if (frameBody.length < 1) return "";
    const encoding = frameBody[0];
    return decodeIdText(frameBody, 1, encoding).text;
  }

  // Standard ID3v1 genre list (same table mutagen's EasyID3 uses). Old
  // taggers store TCON as a bare numeric code, "(N)", or "(N)Refinement"
  // referencing this list instead of a plain genre name.
  const ID3V1_GENRES = [
    "Blues","Classic Rock","Country","Dance","Disco","Funk","Grunge","Hip-Hop","Jazz","Metal",
    "New Age","Oldies","Other","Pop","R&B","Rap","Reggae","Rock","Techno","Industrial",
    "Alternative","Ska","Death Metal","Pranks","Soundtrack","Euro-Techno","Ambient","Trip-Hop","Vocal","Jazz+Funk",
    "Fusion","Trance","Classical","Instrumental","Acid","House","Game","Sound Clip","Gospel","Noise",
    "Alt. Rock","Bass","Soul","Punk","Space","Meditative","Instrumental Pop","Instrumental Rock","Ethnic","Gothic",
    "Darkwave","Techno-Industrial","Electronic","Pop-Folk","Eurodance","Dream","Southern Rock","Comedy","Cult","Gangsta Rap",
    "Top 40","Christian Rap","Pop/Funk","Jungle","Native American","Cabaret","New Wave","Psychedelic","Rave","Showtunes",
    "Trailer","Lo-Fi","Tribal","Acid Punk","Acid Jazz","Polka","Retro","Musical","Rock & Roll","Hard Rock",
    "Folk","Folk-Rock","National Folk","Swing","Fast-Fusion","Bebop","Latin","Revival","Celtic","Bluegrass",
    "Avantgarde","Gothic Rock","Progressive Rock","Psychedelic Rock","Symphonic Rock","Slow Rock","Big Band","Chorus","Easy Listening","Acoustic",
    "Humour","Speech","Chanson","Opera","Chamber Music","Sonata","Symphony","Booty Bass","Primus","Porn Groove",
    "Satire","Slow Jam","Club","Tango","Samba","Folklore","Ballad","Power Ballad","Rhythmic Soul","Freestyle",
    "Duet","Punk Rock","Drum Solo","A Cappella","Euro-House","Dance Hall","Goa","Drum & Bass","Club-House","Hardcore",
    "Terror","Indie","BritPop","Afro-Punk","Polsk Punk","Beat","Christian Gangsta Rap","Heavy Metal","Black Metal","Crossover",
    "Contemporary Christian","Christian Rock","Merengue","Salsa","Thrash Metal","Anime","JPop","Synthpop","Abstract","Art Rock",
    "Baroque","Bhangra","Big Beat","Breakbeat","Chillout","Downtempo","Dub","EBM","Eclectic","Electro",
    "Electroclash","Emo","Experimental","Garage","Global","IDM","Illbient","Industro-Goth","Jam Band","Krautrock",
    "Leftfield","Lounge","Math Rock","New Romantic","Nu-Breakz","Post-Punk","Post-Rock","Psytrance","Shoegaze","Space Rock",
    "Trop Rock","World Music","Neoclassical","Audiobook","Audio Theatre","Neue Deutsche Welle","Podcast","Indie Rock","G-Funk","Dubstep",
    "Garage Rock","Psybient",
  ];

  function resolveGenre(text) {
    if (!text) return text;
    const trimmed = text.trim();
    const m = /^\((\d+)\)(.*)$/.exec(trimmed);
    if (m) {
      const idx = parseInt(m[1], 10);
      const refinement = m[2];
      if (refinement) return refinement;
      if (idx >= 0 && idx < ID3V1_GENRES.length) return ID3V1_GENRES[idx];
      return text;
    }
    if (/^\d+$/.test(trimmed)) {
      const idx = parseInt(trimmed, 10);
      if (idx >= 0 && idx < ID3V1_GENRES.length) return ID3V1_GENRES[idx];
    }
    return text;
  }

  // Returns the raw "Serato Markers2" GEOB payload bytes, or null.
  S2R.extractGeobMarkers2 = function (id3Bytes) {
    const tagInfo = findId3Tag(id3Bytes);
    if (!tagInfo) return null;
    const frames = iterateFrames(tagInfo);
    for (const f of frames) {
      if (f.id === "GEOB" || f.id === "GEO") {
        const geob = parseGeobFrame(f.body);
        if (geob && geob.desc.trim().toLowerCase() === "serato markers2") {
          return geob.data;
        }
      }
    }
    return null;
  };

  // Returns {title, artist, album, genre} (missing keys omitted).
  S2R.extractId3Tags = function (id3Bytes) {
    const tagInfo = findId3Tag(id3Bytes);
    const out = {};
    if (!tagInfo) return out;
    const frames = iterateFrames(tagInfo);
    // v2.3/2.4 use 4-char frame IDs; v2.2 uses the older 3-char IDs for the
    // same fields (e.g. a v2.2 file stores the title as "TT2", not "TIT2").
    const map = {
      TIT2: "title", TT2: "title",
      TPE1: "artist", TP1: "artist",
      TALB: "album", TAL: "album",
      TCON: "genre", TCO: "genre",
    };
    for (const f of frames) {
      const key = map[f.id];
      if (key && !out[key]) {
        const value = readTextFrameValue(f.body);
        out[key] = key === "genre" ? resolveGenre(value) : value;
      }
    }
    return out;
  };

  function id3TagEnd(bytes) {
    if (bytes.length < 10 || bytes[0] !== 0x49 || bytes[1] !== 0x44 || bytes[2] !== 0x33) return 0;
    const size = readSyncsafe(bytes, 6);
    return Math.min(10 + size, bytes.length);
  }

  // MPEG-1/2/2.5 Layer III (i.e. "MP3") frame header tables, needed to
  // compute duration/bitrate ourselves since the browser has no equivalent
  // of mutagen's audio-info parsing. Rekordbox needs a real TotalTime to
  // trust/display a track's Cue points, so this isn't just cosmetic.
  const V1_L3_BITRATES = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
  const V2_L3_BITRATES = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0];
  const V1_SAMPLE_RATES = [44100, 48000, 32000, 0];
  const V2_SAMPLE_RATES = [22050, 24000, 16000, 0];
  const V25_SAMPLE_RATES = [11025, 12000, 8000, 0];

  function parseMpegFrameHeader(bytes, pos) {
    if (pos + 4 > bytes.length) return null;
    if (bytes[pos] !== 0xff || (bytes[pos + 1] & 0xe0) !== 0xe0) return null;
    const b1 = bytes[pos + 1];
    const b2 = bytes[pos + 2];
    const b3 = bytes[pos + 3];
    const versionBits = (b1 >> 3) & 0x03; // 00=MPEG2.5, 10=MPEG2, 11=MPEG1
    const layerBits = (b1 >> 1) & 0x03; // 01=Layer III
    if (layerBits !== 0x01) return null;
    const isV1 = versionBits === 0x03;
    const isV2 = versionBits === 0x02;
    const isV25 = versionBits === 0x00;
    if (!isV1 && !isV2 && !isV25) return null;

    const bitrateIndex = (b2 >> 4) & 0x0f;
    const sampleRateIndex = (b2 >> 2) & 0x03;
    const padding = (b2 >> 1) & 0x01;
    const channelMode = (b3 >> 6) & 0x03; // 3 = mono

    const bitrate = (isV1 ? V1_L3_BITRATES : V2_L3_BITRATES)[bitrateIndex];
    const sampleRate = (isV1 ? V1_SAMPLE_RATES : isV2 ? V2_SAMPLE_RATES : V25_SAMPLE_RATES)[sampleRateIndex];
    if (!bitrate || !sampleRate) return null;

    const samplesPerFrame = isV1 ? 1152 : 576;
    const frameSize = isV1
      ? Math.floor((144 * bitrate * 1000) / sampleRate) + padding
      : Math.floor((72 * bitrate * 1000) / sampleRate) + padding;
    const sideInfoSize = isV1 ? (channelMode === 3 ? 17 : 32) : channelMode === 3 ? 9 : 17;

    return { bitrate, sampleRate, samplesPerFrame, frameSize, sideInfoSize };
  }

  function findFirstMpegFrame(bytes) {
    const start = id3TagEnd(bytes);
    const limit = Math.min(bytes.length - 4, start + 8192);
    for (let pos = start; pos <= limit; pos++) {
      const header = parseMpegFrameHeader(bytes, pos);
      if (header) return { pos, header };
    }
    return null;
  }

  // Returns duration in seconds, or null. Prefers an exact frame count from
  // a Xing/Info or VBRI VBR header when present; falls back to a CBR
  // estimate (file size / bitrate) otherwise -- same approach mutagen uses.
  S2R.extractMp3Duration = function (bytes) {
    const found = findFirstMpegFrame(bytes);
    if (!found) return null;
    const { pos, header } = found;

    const xingOffset = pos + 4 + header.sideInfoSize;
    const xingTag = S2R.latin1Decode(bytes.slice(xingOffset, xingOffset + 4));
    if (xingTag === "Xing" || xingTag === "Info") {
      const flags = S2R.readU32BE(bytes, xingOffset + 4);
      if (flags & 0x01) {
        const numFrames = S2R.readU32BE(bytes, xingOffset + 8);
        if (numFrames > 0) return (numFrames * header.samplesPerFrame) / header.sampleRate;
      }
    }

    const vbriOffset = pos + 4 + 32;
    const vbriTag = S2R.latin1Decode(bytes.slice(vbriOffset, vbriOffset + 4));
    if (vbriTag === "VBRI") {
      const totalFrames = S2R.readU32BE(bytes, vbriOffset + 14);
      if (totalFrames > 0) return (totalFrames * header.samplesPerFrame) / header.sampleRate;
    }

    const audioBytes = bytes.length - pos;
    return (audioBytes * 8) / (header.bitrate * 1000);
  };

  // Returns bitrate in bits/sec (matching mutagen's convention), or null.
  S2R.extractMp3Bitrate = function (bytes) {
    const found = findFirstMpegFrame(bytes);
    return found ? found.header.bitrate * 1000 : null;
  };
})(window.S2R);
