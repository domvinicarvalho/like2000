// ════════════════════════════════════════════════════════════════
// CATÁLOGO DE EMOJIS AO REDOR DO TEXTO — "Sobre mim" Decorator
// Mínimo 28 opções organizadas por categoria
// ════════════════════════════════════════════════════════════════

const EMOJI_CATALOG = [
  // ── CORAÇÕES ────────────────────────────────────────────────
  { key: 'heart_pink',   name: '♥ Coração Pink',    category: 'Corações', emoji: '♥',  wrap: (t) => `♥ ${t} ♥` },
  { key: 'heart_white',  name: '♡ Coração Branco',  category: 'Corações', emoji: '♡',  wrap: (t) => `♡ ${t} ♡` },
  { key: 'heart_sparkle',name: '💕 Corações Duplos', category: 'Corações', emoji: '💕', wrap: (t) => `💕 ${t} 💕` },
  { key: 'heart_shine',  name: '💖 Coração Brilhante', category: 'Corações', emoji: '💖', wrap: (t) => `💖 ${t} 💖` },
  { key: 'heart_pulse',  name: '💗 Coração Batendo', category: 'Corações', emoji: '💗', wrap: (t) => `💗 ${t} 💗` },
  { key: 'heart_exclaim',name: '❣ Coração Ênfase',  category: 'Corações', emoji: '❣',  wrap: (t) => `❣ ${t} ❣` },

  // ── ESTRELAS / BRILHO ───────────────────────────────────────
  { key: 'star_filled',  name: '★ Estrela Cheia',    category: 'Estrelas', emoji: '★',  wrap: (t) => `★ ${t} ★` },
  { key: 'star_empty',   name: '☆ Estrela Vazia',    category: 'Estrelas', emoji: '☆',  wrap: (t) => `☆ ${t} ☆` },
  { key: 'star_sparkle', name: '✦ Estrela Brilho',   category: 'Estrelas', emoji: '✦',  wrap: (t) => `✦ ${t} ✦` },
  { key: 'star_glitter', name: '✧ Estrela Glitter',  category: 'Estrelas', emoji: '✧',  wrap: (t) => `✧ ${t} ✧` },
  { key: 'star_dot',     name: '⋆ Estrela Pequena',  category: 'Estrelas', emoji: '⋆',  wrap: (t) => `⋆ ${t} ⋆` },
  { key: 'star_shine',   name: '✩ Estrela Brilho 2', category: 'Estrelas', emoji: '✩',  wrap: (t) => `✩ ${t} ✩` },

  // ── NATUREZA / FLORES ───────────────────────────────────────
  { key: 'flower_white', name: '✿ Flor Branca',     category: 'Flores',  emoji: '✿',  wrap: (t) => `✿ ${t} ✿` },
  { key: 'flower_black', name: '❀ Flor Preta',      category: 'Flores',  emoji: '❀',  wrap: (t) => `❀ ${t} ❀` },
  { key: 'flower_pink',  name: '🌸 Flor Pink',       category: 'Flores',  emoji: '🌸',  wrap: (t) => `🌸 ${t} 🌸` },
  { key: 'flower_hib',   name: '🌺 Hibisco',         category: 'Flores',  emoji: '🌺',  wrap: (t) => `🌺 ${t} 🌺` },
  { key: 'clover',       name: '🍀 Trevo',           category: 'Flores',  emoji: '🍀',  wrap: (t) => `🍀 ${t} 🍀` },

  // ── MÚSICA ──────────────────────────────────────────────────
  { key: 'music_note',   name: '♪ Nota Musical 1',   category: 'Música', emoji: '♪',  wrap: (t) => `♪ ${t} ♪` },
  { key: 'music_double', name: '♫ Notas Duplas',     category: 'Música', emoji: '♫',  wrap: (t) => `♫ ${t} ♫` },
  { key: 'music_wave',   name: '🎵 Nota Onda',       category: 'Música', emoji: '🎵',  wrap: (t) => `🎵 ${t} 🎵` },
  { key: 'music_sound',  name: '🎶 Notas Múltiplas', category: 'Música', emoji: '🎶',  wrap: (t) => `🎶 ${t} 🎶` },

  // ── SÍMBOLOS DIVERSOS ──────────────────────────────────────
  { key: 'sun',          name: '☼ Sol',              category: 'Símbolos', emoji: '☼',  wrap: (t) => `☼ ${t} ☼` },
  { key: 'moon_cres',    name: '☽ Lua Crescente',    category: 'Símbolos', emoji: '☽',  wrap: (t) => `☽ ${t} ☽` },
  { key: 'moon_dec',     name: '☾ Lua Decrescente',  category: 'Símbolos', emoji: '☾',  wrap: (t) => `☾ ${t} ☾` },
  { key: 'lightning',    name: '⚡ Raio',            category: 'Símbolos', emoji: '⚡',  wrap: (t) => `⚡ ${t} ⚡` },
  { key: 'smile',        name: '☺ Sorriso',          category: 'Símbolos', emoji: '☺',  wrap: (t) => `☺ ${t} ☺` },
  { key: 'smile_black',  name: '☻ Sorriso Preto',    category: 'Símbolos', emoji: '☻',  wrap: (t) => `☻ ${t} ☻` },

  // ── SETAS / DECORAÇÃO ──────────────────────────────────────
  { key: 'arrow_r',      name: '→ Seta Direita',     category: 'Setas', emoji: '→',  wrap: (t) => `→ ${t} ←` },
  { key: 'arrow_double', name: '» Seta Dupla',       category: 'Setas', emoji: '»',  wrap: (t) => `» ${t} «` },
  { key: 'play_tri',     name: '▶ Play',             category: 'Setas', emoji: '▶',  wrap: (t) => `▶ ${t} ◀` },
];

// ── Utilitários ────────────────────────────────────────────────
function aplicarEmoji(texto, emojiKey) {
  if (!texto || !emojiKey) return texto || '';
  const emoji = EMOJI_CATALOG.find(e => e.key === emojiKey);
  if (!emoji) return texto;
  return emoji.wrap(texto);
}

function getEmojiByKey(key) {
  return EMOJI_CATALOG.find(e => e.key === key);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EMOJI_CATALOG, aplicarEmoji, getEmojiByKey };
}
