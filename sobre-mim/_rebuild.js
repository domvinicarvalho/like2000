var fs = require('fs');
var dir = 'd:/Bad Idea/LIKE 2000/sobre-mim';

function extractFromText(text) {
  var results = [];
  var i = 0;
  
  while (i < text.length) {
    var brace = text.indexOf('{', i);
    if (brace < 0) break;
    
    var snippet = text.substring(brace, Math.min(brace + 60, text.length));
    if (!snippet.includes('key:')) { i = brace + 1; continue; }
    
    var depth = 1, inStr = false, strCh = '';
    var j = brace + 1;
    
    while (j < text.length && depth > 0) {
      var ch = text[j];
      if (inStr) { if (ch === '\\') { j += 2; continue; } if (ch === strCh) inStr = false; j++; continue; }
      if (ch === "'" || ch === '"') { inStr = true; strCh = ch; j++; continue; }
      if (ch === '{') depth++;
      if (ch === '}') { depth--; if (depth === 0) { j++; break; } }
      j++;
    }
    
    if (depth === 0) {
      var objText = text.substring(brace, j);
      var keyMatch = objText.match(/key:\s*'([^']+)'/);
      if (keyMatch && (objText.includes('name:') || objText.includes('category:')) && objText.includes('apply:')) {
        results.push({ key: keyMatch[1], text: objText });
      } else if (keyMatch && objText.includes('name:') && objText.includes('map:')) {
        results.push({ key: keyMatch[1], text: objText });
      }
    }
    i = j;
  }
  return results;
}

// ============ FONTS.JS ============
var fontsRaw = fs.readFileSync(dir + '/fonts.js', 'utf8');
var firstClose = fontsRaw.indexOf('];');
var head = fontsRaw.substring(0, firstClose);
var tail = fontsRaw.substring(firstClose + 2);

// Extract only from first 2 objects in head (leet_classic and leet_extreme)
var headObjs = extractFromText(head);
var tailObjs = extractFromText(tail);

console.log('fonts head: ' + headObjs.length + ', tail: ' + tailObjs.length);

// Combine, dedup by key (tail wins)
var allFonts = [];
var keys = {};
// First add tail objects
tailObjs.forEach(function(o) { if (!keys[o.key]) { keys[o.key] = true; allFonts.push(o); } });
// Then add head objects that are NOT in tail
headObjs.forEach(function(o) { if (!keys[o.key]) { keys[o.key] = true; allFonts.push(o); } });

console.log('fonts: ' + allFonts.length + ' unicos: ' + allFonts.map(function(o) { return o.key; }).join(', '));

var fOut = 'var FONT_CATALOG = [\n';
for (var i = 0; i < allFonts.length; i++) {
  fOut += allFonts[i].text;
  if (i < allFonts.length - 1) fOut += ',';
  fOut += '\n';
}
fOut += '];\n\n';
fOut += [
'function aplicarFonte(texto, fontKey) {',
'  if (!texto || !fontKey) return texto || "";',
'  for (var i = 0; i < FONT_CATALOG.length; i++) {',
'    if (FONT_CATALOG[i].key === fontKey) {',
'      return texto.split("").map(function(c) { return FONT_CATALOG[i].map(c); }).join("");',
'    }',
'  }',
'  return texto;',
'}',
'',
'function getFontByKey(key) {',
'  for (var i = 0; i < FONT_CATALOG.length; i++) {',
'    if (FONT_CATALOG[i].key === key) return FONT_CATALOG[i];',
'  }',
'  return null;',
'}',
'',
'if (typeof module !== "undefined" && module.exports) {',
'  module.exports = { FONT_CATALOG: FONT_CATALOG, aplicarFonte: aplicarFonte, getFontByKey: getFontByKey };',
'}'
].join('\n') + '\n';

fs.writeFileSync(dir + '/fonts.js', fOut, 'utf8');

// ============ FRAMES.JS ============
var framesRaw = fs.readFileSync(dir + '/frames.js', 'utf8');
var fFirstClose = framesRaw.indexOf('];');
var fHead = framesRaw.substring(0, fFirstClose);
var fTail = framesRaw.substring(fFirstClose + 2);

var fHeadObjs = extractFromText(fHead);
var fTailObjs = extractFromText(fTail);

console.log('frames head: ' + fHeadObjs.length + ', tail: ' + fTailObjs.length);

var allFrames = [];
var fKeys = {};
fTailObjs.forEach(function(o) { if (!fKeys[o.key]) { fKeys[o.key] = true; allFrames.push(o); } });
fHeadObjs.forEach(function(o) { if (!fKeys[o.key]) { fKeys[o.key] = true; allFrames.push(o); } });

console.log('frames: ' + allFrames.length + ' unicos: ' + allFrames.map(function(o) { return o.key; }).join(', '));

var frOut = 'var FRAME_CATALOG = [\n';
for (var i = 0; i < allFrames.length; i++) {
  frOut += allFrames[i].text;
  if (i < allFrames.length - 1) frOut += ',';
  frOut += '\n';
}
frOut += '];\n\n';
frOut += [
'function aplicarMoldura(texto, frameKey) {',
'  if (!texto || !frameKey || frameKey === "none") return texto || "";',
'  for (var i = 0; i < FRAME_CATALOG.length; i++) {',
'    if (FRAME_CATALOG[i].key === frameKey) {',
'      return FRAME_CATALOG[i].apply(texto);',
'    }',
'  }',
'  return texto;',
'}',
'',
'function getFrameByKey(key) {',
'  for (var i = 0; i < FRAME_CATALOG.length; i++) {',
'    if (FRAME_CATALOG[i].key === key) return FRAME_CATALOG[i];',
'  }',
'  return null;',
'}',
'',
'if (typeof module !== "undefined" && module.exports) {',
'  module.exports = { FRAME_CATALOG: FRAME_CATALOG, aplicarMoldura: aplicarMoldura, getFrameByKey: getFrameByKey };',
'}'
].join('\n') + '\n';

fs.writeFileSync(dir + '/frames.js', frOut, 'utf8');

console.log('\n=== PRONTO ===');
