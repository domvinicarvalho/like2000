// ════════════════════════════════════════════════════════════════
// CATÁLOGO DE KAOMOJIS — "Sobre mim" Decorator
// Mínimo 42 opções organizadas por categoria
// ════════════════════════════════════════════════════════════════

const KAOMOJI_CATALOG = [
  // ── FELICIDADE / ANIMAÇÃO ──────────────────────────────────
  { key: 'happy_dance',    name: 'Dança Feliz',      category: 'Felicidade', kaomoji: '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',   position: 'end' },
  { key: 'happy_joy',      name: 'Alegria',          category: 'Felicidade', kaomoji: '٩(◕‿◕｡)۶',      position: 'end' },
  { key: 'happy_laugh',    name: 'Risada',           category: 'Felicidade', kaomoji: '(＾▽＾)',        position: 'end' },
  { key: 'happy_beam',     name: 'Sorriso Radiante', category: 'Felicidade', kaomoji: '(◕‿◕✿)',       position: 'end' },
  { key: 'happy_star',     name: 'Estrela Feliz',    category: 'Felicidade', kaomoji: '(✧◡✧)',        position: 'end' },
  { key: 'happy_sparkle',  name: 'Brilho Feliz',     category: 'Felicidade', kaomoji: '☆*:.｡.o(≧▽≦)o.｡.:*☆', position: 'end' },
  { key: 'happy_spin',     name: 'Girando',          category: 'Felicidade', kaomoji: '(◕‿◕)♡',       position: 'end' },
  { key: 'happy_victory',  name: 'Vitória',          category: 'Felicidade', kaomoji: '＼(^o^)／',      position: 'end' },
  { key: 'happy_arms',     name: 'Braços Abertos',   category: 'Felicidade', kaomoji: 'ヽ(´▽`)/',      position: 'end' },
  { key: 'happy_bounce',   name: 'Pulando',          category: 'Felicidade', kaomoji: '~(˘▾˘~)',       position: 'end' },

  // ── AMOR / CARINHO ─────────────────────────────────────────
  { key: 'love_heart',     name: 'Coração Apaixonado',   category: 'Amor', kaomoji: '(っ◔◡◔)っ ♥',    position: 'end' },
  { key: 'love_cute',      name: 'Amor Fofo',            category: 'Amor', kaomoji: '♡(˃͈ દ ˂͈ ༶ )', position: 'end' },
  { key: 'love_blush',     name: 'Coração Envergonhado', category: 'Amor', kaomoji: '(´｡• ᵕ •｡`)',    position: 'end' },
  { key: 'love_sparkle',   name: 'Amor Brilhante',       category: 'Amor', kaomoji: '(˘‿˘ʃƪ)♡',     position: 'end' },
  { key: 'love_kiss',      name: 'Beijo',                category: 'Amor', kaomoji: '( ˘ ³˘)♥',      position: 'end' },
  { key: 'love_forever',   name: 'Amor Eterno',          category: 'Amor', kaomoji: '∞♡(๑ᵔ⤙ᵔ๑)♡∞',  position: 'end' },

  // ── FOFURA ─────────────────────────────────────────────────
  { key: 'cute_uwu',       name: 'UwU',           category: 'Fofura', kaomoji: 'UwU',            position: 'end' },
  { key: 'cute_bear',      name: 'Ursinho',       category: 'Fofura', kaomoji: 'ʕ•ᴥ•ʔ',         position: 'end' },
  { key: 'cute_cat',       name: 'Gatinho',       category: 'Fofura', kaomoji: '=^.^=',          position: 'end' },
  { key: 'cute_blush',     name: 'Fofo Corado',   category: 'Fofura', kaomoji: '(ᵔᴥᵔ)',          position: 'end' },
  { key: 'cute_sleep',     name: 'Dormindo',      category: 'Fofura', kaomoji: '(ᴗ˳ᴗ)',          position: 'end' },
  { key: 'cute_paws',      name: 'Patas',         category: 'Fofura', kaomoji: 'ฅ^•ﻌ•^ฅ',       position: 'end' },
  { key: 'cute_bunny',     name: 'Coelhinho',     category: 'Fofura', kaomoji: '>^_^<',          position: 'end' },
  { key: 'cute_puppy',     name: 'Cachorrinho',   category: 'Fofura', kaomoji: 'U＾ェ＾U',       position: 'end' }
];

  // ── DESCONTRAÇÃO / COOL ────────────────────────────────────
  { key: 'cool_shades',    name: 'Cool Óculos',      category: 'Cool', kaomoji: '(⌐■_■)',          position: 'end' },
  { key: 'cool_sunglass',  name: 'Estiloso',         category: 'Cool', kaomoji: '( •_•)>(⌐■_■)',   position: 'end' },
  { key: 'cool_wink',      name: 'Piscada',          category: 'Cool', kaomoji: '(￣ω￣)',          position: 'end' },
  { key: 'cool_smirk',     name: 'Sorriso Irônico',  category: 'Cool', kaomoji: '(¬‿¬)',           position: 'end' },
  { key: 'cool_chill',     name: 'De Boa',           category: 'Cool', kaomoji: 'ˋ( ° ▽、° )',      position: 'end' },
  { key: 'cool_guitar',    name: 'Rock On',          category: 'Cool', kaomoji: 'ヽ(￣д￣;)ノ',      position: 'end' },

  // ── TIMIDEZ ─────────────────────────────────────────────────
  { key: 'shy_blush',      name: 'Envergonhado', category: 'Timidez', kaomoji: '(⁄ ⁄•⁄ω⁄•⁄ ⁄)',    position: 'end' },
  { key: 'shy_flower',     name: 'Flor Tímida',  category: 'Timidez', kaomoji: '(｡♥‿♥｡)',        position: 'end' },
  { key: 'shy_sweat',      name: 'Suor Tímido',  category: 'Timidez', kaomoji: '(￣▽￣*)ゞ',        position: 'end' },
  { key: 'shy_twiddle',    name: 'Mãos Tímidas', category: 'Timidez', kaomoji: '(/ω＼)',           position: 'end' },

  // ── DRAMA / IRÔNICO (bem-humorado) ─────────────────────────
  { key: 'drama_tableflip',  name: 'Virar Mesa',     category: 'Drama', kaomoji: '(╯°□°）╯︵ ┻━┻',  position: 'end' },
  { key: 'drama_fix',        name: 'Arrumar Mesa',   category: 'Drama', kaomoji: '┬─┬ノ( º _ ºノ)', position: 'end' },
  { key: 'drama_orz',        name: 'Orizuru',        category: 'Drama', kaomoji: 'orz',             position: 'end' },
  { key: 'drama_shrug',      name: 'Tanto Faz',      category: 'Drama', kaomoji: '¯\\(ツ)/¯',        position: 'end' },

  // ── NEUTRO / CÉTICO ────────────────────────────────────────
  { key: 'neutral_look',    name: 'Olhar Cético',    category: 'Neutro', kaomoji: 'ಠ_ಠ',           position: 'end' },
  { key: 'neutral_shrug',   name: 'Ombrear',         category: 'Neutro', kaomoji: '¯\\(°_o)/¯',     position: 'end' },
  { key: 'neutral_meh',     name: 'Meh',             category: 'Neutro', kaomoji: '‐‿‐',            position: 'end' },
  { key: 'neutral_think',   name: 'Pensativo',       category: 'Neutro', kaomoji: '(￢_￢)',         position: 'end' },
  { key: 'neutral_cool',    name: 'Descolado',       category: 'Neutro', kaomoji: '┐(￣ヘ￣)┌',      position: 'end' },
];

// ── Utilitários ────────────────────────────────────────────────
function aplicarKaomoji(texto, kaomojiKey) {
  if (!texto || !kaomojiKey) return texto || '';
  const k = KAOMOJI_CATALOG.find(k => k.key === kaomojiKey);
  if (!k) return texto;
  if (k.position === 'start') return k.kaomoji + ' ' + texto;
  return texto + ' ' + k.kaomoji;
}

function getKaomojiByKey(key) {
  return KAOMOJI_CATALOG.find(k => k.key === key);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KAOMOJI_CATALOG, aplicarKaomoji, getKaomojiByKey };
}

