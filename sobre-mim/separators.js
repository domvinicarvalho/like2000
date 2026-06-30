// ════════════════════════════════════════════════════════════════
// CATÁLOGO DE SEPARADORES — "Sobre mim" Decorator
// Linhas decorativas entre seções — mínimo 15 opções
// ════════════════════════════════════════════════════════════════

const SEPARATOR_CATALOG = [
  { key: 'dash_simple',  name: 'Traço Simples',  sepHtml: '<hr style="border: none; border-top: 1px dashed #999; margin: 8px 0;">', sep: '\n─────────────────────\n' },
  { key: 'dash_double',  name: 'Traço Duplo',    sepHtml: '<hr style="border: none; border-top: 2px solid #999; margin: 8px 0;">', sep: '\n═════════════════════\n' },
  { key: 'dash_thick',   name: 'Traço Grosso',   sepHtml: '<hr style="border: none; border-top: 3px solid #666; margin: 10px 0;">', sep: '\n━━━━━━━━━━━━━━━━━━━\n' },
  { key: 'dash_dotted',  name: 'Pontilhado',     sepHtml: '<hr style="border: none; border-top: 1px dotted #999; margin: 8px 0;">', sep: '\n- - - - - - - - - - -\n' },
  { key: 'star_line',    name: 'Linha Estrelada', sepHtml: '<div style="text-align:center; font-size:14px; margin:4px 0;">★ ★ ★ ★ ★ ★</div>', sep: '\n★ ★ ★ ★ ★ ★\n' },
  { key: 'heart_line',   name: 'Linha Corações', sepHtml: '<div style="text-align:center; font-size:14px; margin:4px 0;">♥ ♥ ♥ ♥ ♥ ♥</div>', sep: '\n♥ ♥ ♥ ♥ ♥ ♥\n' },
  { key: 'wave_line',    name: 'Linha Ondas',    sepHtml: '<div style="text-align:center; font-size:14px; margin:4px 0;">∼ ∼ ∼ ∼ ∼ ∼</div>', sep: '\n∼ ∼ ∼ ∼ ∼ ∼\n' },
  { key: 'diamond_line', name: 'Losangos',       sepHtml: '<div style="text-align:center; font-size:12px; margin:4px 0;">◇ ◇ ◇ ◇ ◇ ◇</div>', sep: '\n◇ ◇ ◇ ◇ ◇ ◇\n' },
  { key: 'flower_line',  name: 'Flores',         sepHtml: '<div style="text-align:center; font-size:12px; margin:4px 0;">✿ ❀ ✿ ❀ ✿ ❀</div>', sep: '\n✿ ❀ ✿ ❀ ✿ ❀\n' },
  { key: 'tilde_line',   name: 'Tils Duplos',    sepHtml: '<hr style="border: none; border-top: 1px solid #999; margin: 6px 0; border-image: repeating-linear-gradient(90deg, #999, #999 5px, transparent 5px, transparent 10px) 1;">', sep: '\n〰〰〰〰〰〰〰〰〰〰〰\n' },
  { key: 'arrow_line',   name: 'Setas',          sepHtml: '<div style="text-align:center; font-size:12px; margin:4px 0;">→ → → → → →</div>', sep: '\n→ → → → → →\n' },
  { key: 'dot_line',     name: 'Pontinhos',      sepHtml: '<div style="text-align:center; font-size:16px; margin:4px 0;">· · · · · ·</div>', sep: '\n· · · · · ·\n' },
  { key: 'zigzag',       name: 'Ziguezague',     sepHtml: '<hr style="border: none; border-top: 3px solid #999; margin: 8px 0; clip-path: polygon(0 0, 10px 100%, 20px 0, 30px 100%, 40px 0, 50px 100%, 60px 0, 70px 100%, 80px 0, 90px 100%, 100% 0);">', sep: '\n/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\\n' },
  { key: 'star_dot',     name: 'Estrela+Ponto',  sepHtml: '<div style="text-align:center; font-size:12px; margin:4px 0;">★ · ★ · ★ · ★</div>', sep: '\n★ · ★ · ★ · ★\n' },
  { key: 'equal_line',   name: 'Igualdade',      sepHtml: '<hr style="border: none; border-top: 2px double #999; margin: 8px 0;">', sep: '\n═════════════════════\n' },
  { key: 'star_heart',   name: 'Estrela+❤️',     sepHtml: '<div style="text-align:center; font-size:12px; margin:4px 0;">★ ♥ ★ ♥ ★ ♥</div>', sep: '\n★ ♥ ★ ♥ ★ ♥\n' },
  { key: 'none',         name: 'Sem Separador',  sepHtml: '', sep: '\n' },
];

function getSeparatorByKey(key) {
  return SEPARATOR_CATALOG.find(s => s.key === key);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SEPARATOR_CATALOG, getSeparatorByKey };
}
