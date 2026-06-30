var FONT_CATALOG = [
{
    key: 'cyrillic_light',
    name: 'Cirílico Leve',
    category: 'Cirílico',
    description: 'Тхιѕ ιѕ ℓιкє муѕтєяισυѕ',
    map: (c) => {
      const m = { 'a':'а','A':'А','b':'б','B':'В','c':'с','C':'С','e':'е','E':'Е','h':'н','H':'Н','i':'і','I':'І','k':'к','K':'К','m':'м','M':'М','o':'о','O':'О','p':'р','P':'Р','t':'т','T':'Т','x':'х','X':'Х','y':'у','Y':'Υ' };
      return m[c] || c;
    }
  },
{
    key: 'cyrillic_mix',
    name: 'Cirílico Mix',
    category: 'Cirílico',
    description: 'Му ςяzу кут1с т3xt',
    map: (c) => {
      const m = { 'a':'а','A':'А','b':'б','B':'В','c':'ς','C':'С','d':'ԁ','D':'Д','e':'е','E':'Е','f':'ғ','F':'Ғ','h':'н','H':'Н','i':'і','I':'І','j':'ј','J':'Ј','k':'к','K':'К','m':'м','M':'М','n':'п','N':'П','o':'о','O':'О','p':'р','P':'Р','r':'г','R':'Г','s':'ѕ','S':'Ѕ','t':'т','T':'Т','u':'у','U':'У','w':'ш','W':'Ш','x':'х','X':'Х','y':'у','Y':'Υ' };
      return m[c] || c;
    }
  },
{
    key: 'cyrillic_dark',
    name: 'Cirílico Pesado',
    category: 'Cirílico',
    description: 'Жєѕ тнιѕ ιѕ тяιρру',
    map: (c) => {
      const m = { 'a':'α','A':'Α','b':'в','B':'В','c':'¢','C':'С','e':'є','E':'Е','h':'н','H':'Н','i':'ι','I':'І','k':'к','K':'К','m':'м','M':'М','n':'η','N':'Ν','o':'σ','O':'Ο','p':'ρ','P':'Р','r':'я','R':'Я','s':'ѕ','S':'Ѕ','t':'т','T':'Т','u':'υ','U':'Υ','x':'χ','X':'Χ','y':'у','Y':'Υ' };
      return m[c] || c;
    }
  },
{
    key: 'leet_soft',

  // ── BOLHAS (2 variações) ────────────────────────────────────
  {
    key: 'bubbles_white',
    name: 'Bolhas Brancas',
    category: 'Bolhas',
    description: 'Ⓐ ⓑ ⓒ ⓓ ⓔ',
    map: (c) => {
      const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const curr = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓄ①②③④⑤⑥⑦⑧⑨';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  },
  {
    key: 'bubbles_black',
    name: 'Bolhas Pretas',
    category: 'Bolhas',
    description: '🅐 🅑 🅒 🅓 🅔',
    map: (c) => {
      const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const curr = '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  },

  // ── QUADRADO (2 variações) ──────────────────────────────────
  {
    key: 'square_white',
    name: 'Quadrado Branco',
    category: 'Quadrado',
    description: '🄰 🄱 🄲 🄳 🄴',
    map: (c) => {
      const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const curr = '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  },
  {
    key: 'square_black',
    name: 'Quadrado Preto',
    category: 'Quadrado',
    description: '🅰 🅱 🅲 🅳 🅴',
    map: (c) => {
      const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const curr = '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉';

  // ── FULL-WIDTH ──────────────────────────────────────────────
  {
    key: 'fullwidth',
    name: 'Full-Width',
    category: 'Full-Width',
    description: 'Ｆ Ｕ Ｌ Ｌ Ｗ Ｉ Ｄ Ｔ Ｈ',
    map: (c) => {
      const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const curr = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ０１２３４５６７８９';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  },

  // ── SMALL CAPS ──────────────────────────────────────────────
  {
    key: 'smallcaps',
    name: 'Small Caps',
    category: 'Small Caps',
    description: 'sᴍᴀʟʟ ᴄᴀᴘs ʟᴇᴛᴛᴇʀs',
    map: (c) => {
      const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const curr = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  },

  // ── NEGRITO / ITÁLICO / NEGRITO ITÁLICO (3 variações) ──────
  {
    key: 'bold_unicode',
    name: 'Negrito Unicode',
    category: 'Negrito/Itálico',
    description: '𝐁𝐨𝐥𝐝 𝐭𝐞𝐱𝐭',
    map: (c) => {
      const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const curr = '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  },
  {
    key: 'italic_unicode',
    name: 'Itálico Unicode',
    category: 'Negrito/Itálico',
    description: '𝐼𝑡𝑎𝑙𝑖𝑐 𝑡𝑒𝑥𝑡',
    map: (c) => {
      const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const curr = '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  },
  {
    key: 'bold_italic',
    name: 'Negrito Itálico',
    category: 'Negrito/Itálico',
    description: '𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄',
    map: (c) => {

  // ── FRAKTUR / GÓTICO (2 variações) ──────────────────────────
  {
    key: 'fraktur',
    name: 'Fraktur Gótico',
    category: 'Fraktur/Gótico',
    description: '𝔉𝔯𝔞𝔨𝔱𝔲𝔯 𝔱𝔢𝔵𝔱',
    map: (c) => {
      const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const curr = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  },
  {
    key: 'fraktur_bold',
    name: 'Fraktur Negrito',
    category: 'Fraktur/Gótico',
    description: '𝕱𝖗𝖆𝖐𝖙𝖚𝖗 𝖇𝖔𝖑𝖉',
    map: (c) => {
      const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const curr = '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  },

  // ── DOUBLE-STRUCK ───────────────────────────────────────────
  {
    key: 'doublestruck',
    name: 'Double-Struck',
    category: 'Double-Struck',
    description: '𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜',
    map: (c) => {
      const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const curr = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  },

  // ── MONOSPACE UNICODE ───────────────────────────────────────
  {
    key: 'monospace',
    name: 'Monospace Unicode',
    category: 'Monospace',
    description: '𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 𝚝𝚎𝚡𝚝',
    map: (c) => {
      const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const curr = '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  },

  // ── STRIKETHROUGH ───────────────────────────────────────────
  {
    key: 'strikethrough',
    name: 'Riscado (Strike)',
    category: 'Decorativo',
    description: 't̶e̶x̶t̶o̶ r̶i̶s̶c̶a̶d̶o̶',
    map: (c) => {
      if (c === ' ') return c;
      return c + '\u0336';
    }

  // ── VAPORWAVE / WIDE ────────────────────────────────────────
  {
    key: 'vaporwave',
    name: 'Vaporwave / Wide',
    category: 'Decorativo',
    description: 'ｔ ｅ ｘ ｔ ｏ   ｗ ｉ ｄ ｅ',
    map: (c) => {
      if (c === ' ') return '　'; // full-width space
      return c + ' ';
    }
  },

  // ── ZALGO LEVE ──────────────────────────────────────────────
  {
    key: 'zalgo_light',
    name: 'Zalgo Leve',
    category: 'Decorativo',
    description: 'Z̷a̶l̵g̷o̸ l̵e̸v̷e̸',
    map: (c) => {
      if (c === ' ') return c;
      const diacritics = ['\u0300','\u0301','\u0302','\u0303','\u0304','\u0308','\u030C','\u0311','\u0327','\u0328','\u0337','\u0338'];
      const num = Math.floor(Math.random() * 2) + 1;
      let result = c;
      for (let i = 0; i < num; i++) {
        result += diacritics[Math.floor(Math.random() * diacritics.length)];
      }
      return result;
    }
  },

  // ── INVERTIDO / UPSIDE DOWN ─────────────────────────────────
  {
    key: 'upsidedown',
    name: 'Invertido (Upside Down)',
    category: 'Decorativo',
    description: 'ʎxǝʇ uʍop ǝpısdn',
    map: (c) => {
      const m = { 'a':'ɐ','A':'∀','b':'q','B':'ꓭ','c':'ɔ','C':'ꓛ','d':'p','D':'ꓷ','e':'ǝ','E':'Ǝ','f':'ɟ','F':'Ⅎ','g':'ɓ','G':'⅁','h':'ɥ','H':'ꓤ','i':'ı','I':'I','j':'ɾ','J':'Ր','k':'ʞ','K':'ꓘ','l':'l','L':'⅂','m':'ɯ','M':'ꟽ','n':'u','N':'ꓵ','o':'o','O':'O','p':'d','P':'ꓑ','q':'b','Q':'ꓐ','r':'ɹ','R':'ᴚ','s':'s','S':'ꓩ','t':'ʇ','T':'ꓔ','u':'n','U':'ꓵ','v':'ʌ','V':'ꓥ','w':'ʍ','W':'ꓪ','x':'x','X':'ꓫ','y':'ʎ','Y':'⅄','z':'z','Z':'ꓜ','0':'0','1':'Ɩ','2':'2','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'ㄥ','8':'8','9':'6',',':'\'','.':'˙','?':'¿','!':'¡','\'':',','"':'„' };
      return m[c] || c;
    }
  },

  // ── RÚNICO ──────────────────────────────────────────────────
  {
    key: 'runic',
    name: 'Rúnico',
    category: 'Rúnico',
    description: 'ᚱᚢᚾᛁᚴ ᛏᛖᛋᛏ',
    map: (c) => {
      const m = { 'a':'ᚨ','A':'ᚨ','b':'ᛒ','B':'ᛒ','c':'ᚲ','C':'ᚲ','d':'ᛞ','D':'ᛞ','e':'ᛖ','E':'ᛖ','f':'ᚠ','F':'ᚠ','g':'ᚷ','G':'ᚷ','h':'ᚺ','H':'ᚺ','i':'ᛁ','I':'ᛁ','j':'ᛃ','J':'ᛃ','k':'ᚲ','K':'ᚲ','l':'ᛚ','L':'ᛚ','m':'ᛗ','M':'ᛗ','n':'ᚾ','N':'ᚾ','o':'ᛟ','O':'ᛟ','p':'ᛈ','P':'ᛈ','r':'ᚱ','R':'ᚱ','s':'ᛋ','S':'ᛋ','t':'ᛏ','T':'ᛏ','u':'ᚢ','U':'ᚢ','v':'ᚹ','V':'ᚹ','w':'ᚹ','W':'ᚹ','x':'ᛉ','X':'ᛉ','y':'ᚤ','Y':'ᚤ','z':'ᛉ','Z':'ᛉ' };
      return m[c] || c;
    }
  }
];

// ── Utilitários ────────────────────────────────────────────────
function aplicarFonte(texto, fontKey) {
  if (!texto || !fontKey) return texto || '';
  const fonte = FONT_CATALOG.find(f => f.key === fontKey);
  if (!fonte) return texto;
  return texto.split('').map(c => fonte.map(c)).join('');
}

function getFontByKey(key) {
  return FONT_CATALOG.find(f => f.key === key);
}

// Export para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FONT_CATALOG, aplicarFonte, getFontByKey };
}

  },

  // ── SUBLINHADO ──────────────────────────────────────────────
  {
    key: 'underline',
    name: 'Sublinhado Unicode',
    category: 'Decorativo',
    description: 't̲e̲x̲t̲o̲ s̲u̲b̲l̲i̲n̲h̲a̲d̲o̲',
    map: (c) => {
      if (c === ' ') return c;
      return c + '\u0332';
    }
  }
];

      const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const curr = '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁';
      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  }
];

      const i = base.indexOf(c);
      return i >= 0 ? curr[i] : c;
    }
  }
];

    name: 'Leet Suave',
    category: 'Leetspeak',
    description: 'l33t su4v3',
    map: (c) => {
      const m = { 'a':'4','A':'4','e':'3','E':'3','i':'1','I':'1','s':'5','S':'5' };
      return m[c] || c;
    }
  },
{
    key: 'leet_classic',
    name: 'Leet Clássico',
    category: 'Leetspeak',
    description: '3 d c l á s s i c 0',
    map: (c) => {
      const m = { 'a':'4','A':'4','e':'3','E':'3','i':'1','I':'1','o':'0','O':'0','s':'5','S':'5','t':'7','T':'7' };
      return m[c] || c;
    }
  },
{
    key: 'leet_extreme',
    name: 'Leet Radical',
    category: 'Leetspeak',
    description: '4|\|d3 734|\_|4874|_|',
    map: (c) => {
      const m = { 'a':'4','A':'4','b':'8','B':'8','e':'3','E':'3','g':'9','G':'9','i':'1','I':'1','o':'0','O':'0','s':'5','S':'5','t':'7','T':'7','z':'2','Z':'2' };
      return m[c] || c;
    }
  }
];

function aplicarFonte(texto, fontKey) {
  if (!texto || !fontKey) return texto || "";
  for (var i = 0; i < FONT_CATALOG.length; i++) {
    if (FONT_CATALOG[i].key === fontKey) {
      return texto.split("").map(function(c) { return FONT_CATALOG[i].map(c); }).join("");
    }
  }
  return texto;
}

function getFontByKey(key) {
  for (var i = 0; i < FONT_CATALOG.length; i++) {
    if (FONT_CATALOG[i].key === key) return FONT_CATALOG[i];
  }
  return null;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { FONT_CATALOG: FONT_CATALOG, aplicarFonte: aplicarFonte, getFontByKey: getFontByKey };
}
