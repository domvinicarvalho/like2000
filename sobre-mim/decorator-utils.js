// ════════════════════════════════════════════════════════════════
// DECORATOR UTILS — Funções puras para aplicar decoração
// Combina fonte + moldura + emoji + kaomoji em texto decorado
// ════════════════════════════════════════════════════════════════


function decorarCampo(texto, config) {
  if (!texto || !texto.trim()) return '';
  
  let result = texto.trim();
  
  // 1. Fonte
  if (config.font && config.font !== 'none') {
    result = aplicarFonte(result, config.font);
  }
  
  // 2. Emoji ao redor
  if (config.emoji) {
    result = aplicarEmoji(result, config.emoji);
  }
  
  // 3. Kaomoji ao final
  if (config.kaomoji) {
    result = aplicarKaomoji(result, config.kaomoji);
  }
  
  // 4. Moldura - ÚLTIMO para envolver tudo
  if (config.frame && config.frame !== 'none') {
    result = aplicarMoldura(result, config.frame);
  }
  
  return result;
}


function decorarCampoPreview(texto, config) {
  if (!texto || !texto.trim()) return '';
  
  let result = texto.trim();
  
  if (config.font && config.font !== 'none') {
    result = aplicarFonte(result, config.font);
  }
  if (config.emoji) {
    result = aplicarEmoji(result, config.emoji);
  }
  if (config.kaomoji) {
    result = aplicarKaomoji(result, config.kaomoji);
  }
  if (config.frame && config.frame !== 'none') {
    result = aplicarMoldura(result, config.frame);
  }
  
  return result;
}


function gerarSobreMim(campos, separadorKey) {
  const partes = [];
  
  for (const campo of campos) {
    if (campo.texto && campo.texto.trim()) {
      const decorado = decorarCampo(campo.texto, campo.config);
      if (decorado) {
        partes.push(decorado);
      }
    }
  }
  
  if (partes.length === 0) return '';
  
  const sep = separadorKey && separadorKey !== 'none'
    ? (getSeparatorByKey(separadorKey)?.sep || '\n')
    : '\n';
  
  return partes.join(sep);
}


function gerarSugestoes(texto, count = 3) {
  if (!texto || !texto.trim()) return [];
  
  const sugestoes = [];
  const usados = new Set();
  
  const combinacoes = [
    { font:'leet_classic', frame:'stars_classic', emoji:'star_filled', kaomoji:'happy_star', label:'Orkut Clássico' },
    { font:'cursive_math', frame:'hearts_classic', emoji:'heart_pink', kaomoji:'love_blush', label:'Romântico Fofo' },
    { font:'bubbles_white', frame:'box_rounded', emoji:'flower_white', kaomoji:'cute_uwu', label:'Fofo Bolhas' },
    { font:'bold_unicode', frame:'box_thick', emoji:'star_sparkle', kaomoji:'cool_shades', label:'Destaque Negrito' },
    { font:'fullwidth', frame:'dotted_dots', emoji:'music_note', kaomoji:'happy_beam', label:'Largo e Leve' },
    { font:'smallcaps', frame:'floral_vine', emoji:'flower_black', kaomoji:'shy_flower', label:'Vintage Floral' },
    { font:'cyrillic_light', frame:'box_double', emoji:'moon_cres', kaomoji:'neutral_look', label:'Mistério Cyrillic' },
    { font:'leet_soft', frame:'stars_pure', emoji:'heart_sparkle', kaomoji:'love_heart', label:'Leet Suave Amor' },
    { font:'italic_unicode', frame:'quotes_curly', emoji:'music_double', kaomoji:'happy_laugh', label:'Itálico Citação' },
    { font:'doublestruck', frame:'fancy_fleur', emoji:'sun', kaomoji:'cool_smirk', label:'Fancy Double' },
    { font:'cursive_script', frame:'wave_tilde', emoji:'star_glitter', kaomoji:'happy_sparkle', label:'Script Brilho' },
    { font:'fraktur', frame:'fancy_ornament', emoji:'smile_black', kaomoji:'drama_shrug', label:'Gótico Dramático' },
    { font:'runic', frame:'geo_blocks', emoji:'lightning', kaomoji:'cool_sunglass', label:'Runas Poder' },
    { font:'vaporwave', frame:'wave_squiggle', emoji:'moon_dec', kaomoji:'neutral_cool', label:'Vaporwave' },
    { font:'upsidedown', frame:'dotted_degree', emoji:'star_empty', kaomoji:'drama_tableflip', label:'Invertido Louco' },
  ];
  
  const shuffled = [...combinacoes].sort(() => Math.random() - 0.5);
  
  for (const combo of shuffled) {
    if (sugestoes.length >= count) break;
    const key = combo.font + combo.frame;
    if (usados.has(key)) continue;
    usados.add(key);
    
    const resultado = decorarCampo(texto, {
      font: combo.font, frame: combo.frame,
      emoji: combo.emoji, kaomoji: combo.kaomoji
    });
    
    sugestoes.push({
      label: combo.label, font: combo.font, frame: combo.frame,
      emoji: combo.emoji, kaomoji: combo.kaomoji, resultado
    });
  }
  
  return sugestoes;
}

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function gerarPreviewSobreMim(campos, separadorKey) {
  const partes = [];
  
  for (const campo of campos) {
    if (campo.texto && campo.texto.trim()) {
      const decorado = decorarCampoPreview(campo.texto, campo.config);
      if (decorado) {
        const html = decorado
          .replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>');
        partes.push(`<div class="sm-preview-campo">${html}</div>`);
      }
    }
  }
  
  if (partes.length === 0) {
    return '<div style="color:#999;font-style:italic;text-align:center;padding:20px;">Preencha os campos acima para ver o preview ✨</div>';
  }
  
  const sepHtml = separadorKey && separadorKey !== 'none'
    ? (getSeparatorByKey(separadorKey)?.sepHtml || '<br>')
    : '<br>';
  
  return partes.join(sepHtml);
}