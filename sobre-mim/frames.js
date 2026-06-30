// ════════════════════════════════════════════════════════════════
// CATÁLOGO DE MOLDURAS / BORDAS ASCII — "Sobre mim" Decorator
// Mínimo 24 opções
// ════════════════════════════════════════════════════════════════

const FRAME_CATALOG = [
  // ── CAIXAS COM LINHAS ───────────────────────────────────────
  {
    key: 'box_thick', name: 'Caixa Grossa', category: 'Caixa', description: '╔══╗  ╚══╝',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '╔' + '═'.repeat(maxLen + 2) + '╗';
      const bottom = '╚' + '═'.repeat(maxLen + 2) + '╝';
      const middle = lines.map(l => '║ ' + l + ' '.repeat(maxLen - l.length) + ' ║');
      return [top, ...middle, bottom].join('\n');
    }
  },
  {
    key: 'box_rounded', name: 'Caixa Arredondada', category: 'Caixa', description: '╭──╮  ╰──╯',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '╭' + '─'.repeat(maxLen + 2) + '╮';
      const bottom = '╰' + '─'.repeat(maxLen + 2) + '╯';
      const middle = lines.map(l => '│ ' + l + ' '.repeat(maxLen - l.length) + ' │');
      return [top, ...middle, bottom].join('\n');
    }
  },
  {
    key: 'box_double', name: 'Caixa Dupla', category: 'Caixa', description: '╔══╗  ╚══╝',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '╔' + '═'.repeat(maxLen + 2) + '╗';
      const bottom = '╚' + '═'.repeat(maxLen + 2) + '╝';
      const middle = lines.map(l => '║ ' + l + ' '.repeat(maxLen - l.length) + ' ║');
      return [top, ...middle, bottom].join('\n');
    }
  },
  {
    key: 'box_light', name: 'Caixa Fina', category: 'Caixa', description: '┌──┐  └──┘',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '┌' + '─'.repeat(maxLen + 2) + '┐';
      const bottom = '└' + '─'.repeat(maxLen + 2) + '┘';
      const middle = lines.map(l => '│ ' + l + ' '.repeat(maxLen - l.length) + ' │');
      return [top, ...middle, bottom].join('\n');
    }
  },
  {
    key: 'box_heavy', name: 'Caixa Pesada', category: 'Caixa', description: '┏━━┓  ┗━━┛',
    apply: (texto) => {

  // ── PONTILHADAS ─────────────────────────────────────────────
  {
    key: 'dotted_dots', name: 'Pontinhos', category: 'Pontilhada', description: '·..·  :..:',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '·' + '.'.repeat(maxLen + 2) + '·';
      const bottom = '·' + '.'.repeat(maxLen + 2) + '·';
      const middle = lines.map(l => '· ' + l + ' '.repeat(maxLen - l.length) + ' ·');
      return [top, ...middle, bottom].join('\n');
    }
  },
  {
    key: 'dotted_degree', name: 'Graus Decorados', category: 'Pontilhada', description: '°•°•°  °•°•°',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const border = '°•°•°' + '•°•'.repeat(Math.ceil((maxLen + 6) / 3)) + '°•°•°';
      const top = border.substring(0, maxLen + 4);
      const bottom = border.substring(0, maxLen + 4);
      const middle = lines.map(l => '°• ' + l + ' '.repeat(maxLen - l.length) + ' •°');
      return [top, ...middle, bottom].join('\n');
    }
  },
  {
    key: 'dotted_wave', name: 'Ondas Pontilhadas', category: 'Pontilhada', description: '~~·~~·~~',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '~~·~~·~' + '·~~·~'.repeat(Math.ceil((maxLen + 4) / 5));
      const bottom = '~~·~~·~' + '·~~·~'.repeat(Math.ceil((maxLen + 4) / 5));
      const middle = lines.map(l => '~~ ' + l + ' '.repeat(maxLen - l.length) + ' ~~');
      return [top.substring(0, maxLen + 4), ...middle, bottom.substring(0, maxLen + 4)].join('\n');
    }
  },

  // ── ESTRELAS ────────────────────────────────────────────────
  {
    key: 'stars_classic', name: 'Estrelas Clássicas', category: 'Estrelas', description: '★·.·´¯`·.·★',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const pat = '·.·´¯`·.·';
      const top = '★' + pat.repeat(Math.ceil((maxLen + 4) / pat.length)) + '★';
      const bottom = '★' + pat.repeat(Math.ceil((maxLen + 4) / pat.length)) + '★';
      const middle = lines.map(l => '★ ' + l + ' '.repeat(maxLen - l.length) + ' ★');
      return [top.substring(0, maxLen + 4), ...middle, bottom.substring(0, maxLen + 4)].join('\n');
    }
  },
  {
    key: 'stars_pure', name: 'Estrelas Puras', category: 'Estrelas', description: '★☆★☆★  ★☆★☆★',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '★☆★☆★' + '☆★☆'.repeat(Math.ceil((maxLen + 6) / 3)) + '★☆★☆★';
      const bottom = '★☆★☆★' + '☆★☆'.repeat(Math.ceil((maxLen + 6) / 3)) + '★☆★☆★';
      const middle = lines.map(l => '★☆ ' + l + ' '.repeat(maxLen - l.length) + ' ☆★');
      return [top.substring(0, maxLen + 4), ...middle, bottom.substring(0, maxLen + 4)].join('\n');
    }
  },
  {

  // ── CORAÇÕES ────────────────────────────────────────────────
  {
    key: 'hearts_classic', name: 'Corações Clássicos', category: 'Corações', description: '♥‿♥  ♥‿♥',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '♥‿♥' + '‿♥‿'.repeat(Math.ceil((maxLen + 4) / 3)) + '♥‿♥';
      const bottom = '♥‿♥' + '‿♥‿'.repeat(Math.ceil((maxLen + 4) / 3)) + '♥‿♥';
      const middle = lines.map(l => '♥ ' + l + ' '.repeat(maxLen - l.length) + ' ♥');
      return [top.substring(0, maxLen + 4), ...middle, bottom.substring(0, maxLen + 4)].join('\n');
    }
  },
  {
    key: 'hearts_fill', name: 'Coração Preenchido', category: 'Corações', description: '💕💗💕  💕💗💕',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '💕💗💕' + '💗💕💗'.repeat(Math.ceil((maxLen + 4) / 3)) + '💕💗💕';
      const bottom = '💕💗💕' + '💗💕💗'.repeat(Math.ceil((maxLen + 4) / 3)) + '💕💗💕';
      const middle = lines.map(l => '💕 ' + l + ' '.repeat(maxLen - l.length) + ' 💕');
      return [top.substring(0, maxLen + 4), ...middle, bottom.substring(0, maxLen + 4)].join('\n');
    }
  },
  {
    key: 'hearts_beat', name: 'Batimento Coração', category: 'Corações', description: '💓💓💓  💓💓💓',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '💓' + '━'.repeat(maxLen + 2) + '💓';
      const bottom = '💓' + '━'.repeat(maxLen + 2) + '💓';
      const middle = lines.map(l => '💓 ' + l + ' '.repeat(maxLen - l.length) + ' 💓');
      return [top, ...middle, bottom].join('\n');
    }
  },

  // ── ASPAS DECORADAS ─────────────────────────────────────────
  {
    key: 'quotes_curly', name: 'Aspas Curvas', category: 'Aspas', description: '"texto"',
    apply: (texto) => texto.split('\n').map(l => '❝ ' + l + ' ❞').join('\n')
  },
  {
    key: 'quotes_angle', name: 'Aspas Angulares', category: 'Aspas', description: '«texto»',
    apply: (texto) => texto.split('\n').map(l => '« ' + l + ' »').join('\n')
  },
  {
    key: 'quotes_low', name: 'Aspas Baixas', category: 'Aspas', description: '„texto"',
    apply: (texto) => texto.split('\n').map(l => '„ ' + l + ' \"').join('\n')
  },
  {
    key: 'quotes_fancy', name: 'Aspas Fancy', category: 'Aspas', description: '❝❀❞',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '❝' + '❀❁✿'.repeat(Math.ceil((maxLen + 2) / 3)) + '❞';
      const middle = lines.map(l => '❝ ' + l + ' ❞');
      return [top.substring(0, maxLen + 4), ...middle, top.substring(0, maxLen + 4)].join('\n');
    }
  }
];

    key: 'stars_glitter', name: 'Brilho Estrelas', category: 'Estrelas', description: '✦⋆✧  ⋆✧⋆',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '✦⋆✧' + '⋆✧⋆'.repeat(Math.ceil((maxLen + 4) / 3)) + '✦⋆✧';
      const bottom = '✦⋆✧' + '⋆✧⋆'.repeat(Math.ceil((maxLen + 4) / 3)) + '✦⋆✧';
      const middle = lines.map(l => '✦ ' + l + ' '.repeat(maxLen - l.length) + ' ✦');
      return [top.substring(0, maxLen + 4), ...middle, bottom.substring(0, maxLen + 4)].join('\n');
    }
  }
];


  // ── GEOMÉTRICO / BLOCOS ─────────────────────────────────────
  {
    key: 'geo_blocks', name: 'Blocos Geométricos', category: 'Geométrico', description: '▓▒░  ░▒▓',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '▓▒░' + '▒░▓'.repeat(Math.ceil((maxLen + 4) / 3)) + '▓▒░';
      const bottom = '▓▒░' + '▒░▓'.repeat(Math.ceil((maxLen + 4) / 3)) + '▓▒░';
      const middle = lines.map(l => '▓ ' + l + ' '.repeat(maxLen - l.length) + ' ▓');
      return [top.substring(0, maxLen + 4), ...middle, bottom.substring(0, maxLen + 4)].join('\n');
    }
  },
  {
    key: 'geo_squares', name: 'Quadradinhos', category: 'Geométrico', description: '▰▱▰  ▱▰▱',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '▰▱▰' + '▱▰▱'.repeat(Math.ceil((maxLen + 4) / 3)) + '▰▱▰';
      const bottom = '▰▱▰' + '▱▰▱'.repeat(Math.ceil((maxLen + 4) / 3)) + '▰▱▰';
      const middle = lines.map(l => '▰ ' + l + ' '.repeat(maxLen - l.length) + ' ▰');
      return [top.substring(0, maxLen + 4), ...middle, bottom.substring(0, maxLen + 4)].join('\n');
    }
  },

  // ── ORNAMENTAL FANCY ────────────────────────────────────────
  {
    key: 'fancy_ornament', name: 'Ornamental Fancy', category: 'Ornamental', description: '꧁༺ ༻꧂',
    apply: (texto) => texto.split('\n').map(l => '꧁༺ ' + l + ' ༻꧂').join('\n')
  },
  {
    key: 'fancy_fleur', name: 'Flor-de-Lis', category: 'Ornamental', description: '⚜  ⚜',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '⚜' + '─'.repeat(maxLen + 4) + '⚜';
      const bottom = '⚜' + '─'.repeat(maxLen + 4) + '⚜';
      const middle = lines.map(l => '⚜ ' + l + ' '.repeat(maxLen - l.length) + ' ⚜');
      return [top, ...middle, bottom].join('\n');
    }
  },

  // ── ONDA / TIL ──────────────────────────────────────────────
  {

  // ── SETAS ───────────────────────────────────────────────────
  {
    key: 'arrows_side', name: 'Setas Laterais', category: 'Setas', description: '»»——««',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '»»' + '——'.repeat(Math.ceil((maxLen + 4) / 2)) + '««';
      const bottom = '««' + '——'.repeat(Math.ceil((maxLen + 4) / 2)) + '»»';
      const middle = lines.map(l => '» ' + l + ' '.repeat(maxLen - l.length) + ' «');
      return [top.substring(0, maxLen + 4), ...middle, bottom.substring(0, maxLen + 4)].join('\n');
    }
  },
  {
    key: 'arrows_point', name: 'Ponteiros', category: 'Setas', description: '→ ←  → ←',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '→→' + '—'.repeat(maxLen + 2) + '←←';
      const bottom = '←←' + '—'.repeat(maxLen + 2) + '→→';
      const middle = lines.map(l => '→ ' + l + ' '.repeat(maxLen - l.length) + ' ←');
      return [top, ...middle, bottom].join('\n');
    }
  },

  // ── SEM MOLDURA ─────────────────────────────────────────────
  {
    key: 'none', name: 'Sem Moldura', category: 'Nenhuma', description: 'texto puro',
    apply: (texto) => texto
  }
];

// ── Utilitários ────────────────────────────────────────────────
function aplicarMoldura(texto, frameKey) {
  if (!texto || !frameKey || frameKey === 'none') return texto || '';
  const moldura = FRAME_CATALOG.find(f => f.key === frameKey);
  if (!moldura) return texto;
  return moldura.apply(texto);
}

function getFrameByKey(key) {
  return FRAME_CATALOG.find(f => f.key === key);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FRAME_CATALOG, aplicarMoldura, getFrameByKey };
}

    key: 'wave_tilde', name: 'Ondas (Til)', category: 'Onda', description: '~~~  ~~~',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '∼'.repeat(maxLen + 4);
      const bottom = '∼'.repeat(maxLen + 4);
      const middle = lines.map(l => '∼ ' + l + ' '.repeat(maxLen - l.length) + ' ∼');
      return [top, ...middle, bottom].join('\n');
    }
  },
  {
    key: 'wave_squiggle', name: 'Serpentina', category: 'Onda', description: '〰️〰️  〰️〰️',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '〰️'.repeat(Math.ceil((maxLen + 4) / 2));
      const bottom = '〰️'.repeat(Math.ceil((maxLen + 4) / 2));
      const middle = lines.map(l => '〰️ ' + l + ' '.repeat(maxLen - l.length) + ' 〰️');
      return [top.substring(0, maxLen + 4), ...middle, bottom.substring(0, maxLen + 4)].join('\n');
    }
  }
];

      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '┏' + '━'.repeat(maxLen + 2) + '┓';
      const bottom = '┗' + '━'.repeat(maxLen + 2) + '┛';
      const middle = lines.map(l => '┃ ' + l + ' '.repeat(maxLen - l.length) + ' ┃');
      return [top, ...middle, bottom].join('\n');
    }
  },
  {
    key: 'box_mixed', name: 'Caixa Mista', category: 'Caixa', description: '╒══╕  ╘══╛',
    apply: (texto) => {
      const lines = texto.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const top = '╒' + '═'.repeat(maxLen + 2) + '╕';
      const bottom = '╘' + '═'.repeat(maxLen + 2) + '╛';
      const middle = lines.map(l => '│ ' + l + ' '.repeat(maxLen - l.length) + ' │');
      return [top, ...middle, bottom].join('\n');
    }
  }
];
