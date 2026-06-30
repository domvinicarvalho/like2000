var FRAME_CATALOG = [
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
{
    key: 'none', name: 'Sem Moldura', category: 'Nenhuma', description: 'texto puro',
    apply: (texto) => texto
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
  },
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
  }
];

function aplicarMoldura(texto, frameKey) {
  if (!texto || !frameKey || frameKey === "none") return texto || "";
  for (var i = 0; i < FRAME_CATALOG.length; i++) {
    if (FRAME_CATALOG[i].key === frameKey) {
      return FRAME_CATALOG[i].apply(texto);
    }
  }
  return texto;
}

function getFrameByKey(key) {
  for (var i = 0; i < FRAME_CATALOG.length; i++) {
    if (FRAME_CATALOG[i].key === key) return FRAME_CATALOG[i];
  }
  return null;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { FRAME_CATALOG: FRAME_CATALOG, aplicarMoldura: aplicarMoldura, getFrameByKey: getFrameByKey };
}
