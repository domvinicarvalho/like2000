var FONT_CATALOG = [
  { key: 'leet_classic', name: 'Leet Classico', category: 'Leetspeak', description: '3 d c l a s s i c 0', map: function(c) { var x={a:4,A:4,e:3,E:3,i:1,I:1,o:0,O:0,s:5,S:5,t:7,T:7}; return x[c]||c; } },
  { key: 'leet_extreme', name: 'Leet Radical', category: 'Leetspeak', description: '4 n d3', map: function(c) { var x={a:4,A:4,b:8,B:8,e:3,E:3,g:9,G:9,i:1,I:1,o:0,O:0,s:5,S:5,t:7,T:7,z:2,Z:2}; return x[c]||c; } },
  { key: 'leet_soft', name: 'Leet Suave', category: 'Leetspeak', description: 'l33t su4v3', map: function(c) { var x={a:4,A:4,e:3,E:3,i:1,I:1,s:5,S:5}; return x[c]||c; } },
  { key: 'bold_unicode', name: 'Negrito', category: 'Negrito', description: 'Bold text', map: function(c) { var b="abcefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ"; var r="𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐤𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙"; var i=b.indexOf(c); return i>=0?r[i]:c; } },
  { key: 'italic_unicode', name: 'Italico', category: 'Italico', description: 'Italic text', map: function(c) { var b="abcefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ"; var r="𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍"; var i=b.indexOf(c); return i>=0?r[i]:c; } },
  { key: 'strikethrough', name: 'Riscado', category: 'Decorativo', description: 'texto riscado', map: function(c) { if(c===" ")return c; return c+"\u0336"; } },
  { key: 'upsidedown', name: 'Invertido', category: 'Decorativo', description: 'texto invertido', map: function(c) { var x={a:"ɐ",A:"∀",b:"q",B:"ꓭ",c:"ɔ",C:"ꓛ",d:"p",D:"ꓷ",e:"ǝ",E:"Ǝ",f:"ɟ",F:"Ⅎ",g:"ɓ",G:"⅁",h:"ɥ",H:"ꓤ",i:"ı",I:"I",j:"ɾ",J:"Ր",k:"ʞ",K:"ꓘ",l:"l",L:"⅂",m:"ɯ",M:"ꟽ",n:"u",N:"ꓵ",o:"o",O:"O",p:"d",P:"ꓑ",q:"b",Q:"ꓐ",r:"ɹ",R:"ᴚ",s:"s",S:"ꓩ",t:"ʇ",T:"ꓔ",u:"n",U:"ꓵ",v:"ʌ",V:"ꓥ",w:"ʍ",W:"ꓪ",x:"x",X:"ꓫ",y:"ʎ",Y:"⅄",z:"z",Z:"ꓜ"}; return x[c]||c; } },
  { key: 'fullwidth', name: 'Full-Width', category: 'Full-Width', description: 'F U L L', map: function(c) { var b="abcefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ0123456789"; var r="ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ０１２３４５６７８９"; var i=b.indexOf(c); return i>=0?r[i]:c; } },
  { key: 'vaporwave', name: 'Vaporwave', category: 'Decorativo', description: 't e x t  w i d e', map: function(c) { if(c===" ")return "\u3000"; return c+" "; } }
];

function aplicarFonte(texto, fontKey) {
  if (!texto || !fontKey) return texto || "";
  for (var i = 0; i < FONT_CATALOG.length; i++) {
    if (FONT_CATALOG[i].key === fontKey) return texto.split("").map(function(c) { return FONT_CATALOG[i].map(c); }).join("");
  }
  return texto;
}

function getFontByKey(key) {
  for (var i = 0; i < FONT_CATALOG.length; i++) {
    if (FONT_CATALOG[i].key === key) return FONT_CATALOG[i];
  }
  return null;
}
