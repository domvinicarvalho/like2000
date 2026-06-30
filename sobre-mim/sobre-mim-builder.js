// ════════════════════════════════════════════════════════════════
// SOBRE MIM BUILDER — Construtor de "Sobre mim" decorado
// Substitui o textarea simples por campos guiados com preview
// ════════════════════════════════════════════════════════════════

/**
 * Estrutura padrão dos campos do "Sobre mim"
 */
const SM_CAMPOS_PADRAO = [
  { key: 'nome_profissao', label: 'Nome / Profissão', tipo: 'input', placeholder: 'Ex: bad_idea — fundador/desenvolvedor', padrao: { font:'leet_classic', frame:'stars_classic', emoji:'', kaomoji:'' } },
  { key: 'oque_faz',       label: 'O que você faz / criou', tipo: 'input', placeholder: 'Ex: crio sites nostálgicos e alternativos', padrao: { font:'leet_classic', frame:'none', emoji:'', kaomoji:'' } },
  { key: 'frase',          label: 'Frase, citação ou trecho de música', tipo: 'textarea', placeholder: 'Ex: "O futuro é nostálgico" — alguém aí', padrao: { font:'none', frame:'quotes_curly', emoji:'', kaomoji:'' } },
  { key: 'status',         label: 'Status / vibe atual', tipo: 'input', placeholder: 'Ex: vivendo um dia de cada vez ✨', padrao: { font:'none', frame:'none', emoji:'', kaomoji:'' }, opcional: true },
  { key: 'hobbies',        label: 'Hobbies / interesses', tipo: 'input', placeholder: 'Ex: música, fotografia, programação', padrao: { font:'cursive_math', frame:'none', emoji:'', kaomoji:'' }, opcional: true },
  { key: 'links',          label: 'Links / redes', tipo: 'input', placeholder: 'Ex: @bad_idea no instagram', padrao: { font:'none', frame:'none', emoji:'', kaomoji:'' }, opcional: true },
];

// Estado do builder
let smEstado = {
  campos: SM_CAMPOS_PADRAO.map(c => ({
    ...c,
    texto: '',
    config: { ...c.padrao }
  })),
  separador: 'dash_simple',
  focusedCampo: null,
};


// ════════════════════════════════════════════════════════════════
// RENDERIZAÇÃO DO FORMULÁRIO
// ════════════════════════════════════════════════════════════════

function renderSobreMimBuilder(containerEl, dadosExistentes) {
  if (dadosExistentes) {
    carregarDadosExistentes(dadosExistentes);
  }

  containerEl.innerHTML = `
    <div class="sm-builder">
      <style>
        .sm-builder { font-family:Tahoma,sans-serif; font-size:11px; }
        .sm-campo { background:#f8f9fc; border:1px solid #d5dde8; border-radius:4px; padding:8px; margin-bottom:8px; position:relative; }
        .sm-campo-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; }
        .sm-campo-label { font-weight:bold; color:#1F4E89; font-size:11px; }
        .sm-btn-personalizar { font-size:9px; cursor:pointer; background:#e8ecf2; border:1px solid #b0bfd0; padding:2px 8px; border-radius:3px; color:#3B5998; }
        .sm-btn-personalizar:hover { background:#d5dde8; }
        .sm-btn-personalizar.ativo { background:#6D84B4; color:#fff; }
        .sm-painel-personalizar { display:none; background:#f0f2f5; border:1px solid #c5d0db; border-radius:3px; padding:8px; margin-top:6px; max-height:250px; overflow-y:auto; }
        .sm-painel-personalizar.aberto { display:block; }
        .sm-painel-personalizar select { width:100%; padding:3px; margin-bottom:5px; font-size:10px; border:1px solid #b0bfd0; }
        .sm-painel-personalizar .sm-select-label { font-size:9px; color:#666; margin-bottom:2px; }
        .sm-painel-personalizar .sm-preview-mini { background:#fff; border:1px solid #ddd; padding:4px; margin-top:4px; font-size:10px; word-break:break-all; font-family:monospace; }
        .sm-campo-opcional { font-size:9px; color:#999; }
        .sm-sugestoes { display:flex; gap:4px; margin-top:4px; flex-wrap:wrap; }
        .sm-sugestao-btn { font-size:9px; cursor:pointer; background:#fff; border:1px solid #b0bfd0; padding:3px 6px; border-radius:3px; color:#3B5998; max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .sm-sugestao-btn:hover { background:#d5dde8; }
        .sm-preview-box { background:#fffdf5; border:2px dashed #6B90C0; border-radius:6px; padding:12px; margin-top:8px; min-height:60px; font-size:11px; line-height:1.5; }
        .sm-preview-box .sm-preview-titulo { font-size:10px; font-weight:bold; color:#6B90C0; margin-bottom:6px; border-bottom:1px solid #d5dde8; padding-bottom:3px; }
        .sm-actions { display:flex; gap:8px; margin-top:8px; }
        .sm-actions button { flex:1; padding:6px; font-size:11px; cursor:pointer; border:1px solid #7f9db9; border-radius:3px; font-weight:bold; }
        .sm-btn-salvar { background:#316ac5; color:white; border-color:#0831a0; }
        .sm-btn-reset { background:#ece9d8; color:#333; }
      </style>

      <div style="font-weight:bold; color:#1F4E89; margin-bottom:8px; border-bottom:1px solid #C5D5E8; padding-bottom:4px; font-size:12px;">✨ Construtor "Sobre mim"</div>
      <div style="font-size:10px; color:#666; margin-bottom:10px;">Preencha os campos abaixo. Cada um pode ser personalizado com fonte, moldura, emoji e kaomoji!</div>

      <div id="sm-campos-container"></div>

      <div style="margin:8px 0;">
        <label>Separador entre seções:</label>
        <select class="sm-separador-select" id="sm-separador" onchange="smAtualizarSeparador(this.value)">
          ${SEPARATOR_CATALOG.map(s => '<option value="'+s.key+'" '+(s.key===smEstado.separador?'selected':'')+'>'+s.name+'</option>').join('')}
        </select>
      </div>

      <div class="sm-preview-box" id="sm-preview">
        <div class="sm-preview-titulo">👁️ Preview do "Sobre mim"</div>
        <div id="sm-preview-conteudo"><div style="color:#999;font-style:italic;text-align:center;padding:20px;">Preencha os campos acima para ver o preview ✨</div></div>
      </div>

      <div class="sm-actions">
        <button class="sm-btn-salvar" onclick="smSalvar()">💾 Salvar "Sobre mim"</button>
        <button class="sm-btn-reset" onclick="smResetar()">↺ Limpar campos</button>
      </div>
    </div>
  `;

  renderizarCampos();
}


// ════════════════════════════════════════════════════════════════
// RENDERIZAR CAMPOS INDIVIDUAIS
// ════════════════════════════════════════════════════════════════

function renderizarCampos() {
  const container = document.getElementById('sm-campos-container');
  if (!container) return;

  container.innerHTML = smEstado.campos.map((campo, idx) => {
    const fontOpts = FONT_CATALOG.map(f =>
      '<option value="'+f.key+'" '+(campo.config.font===f.key?'selected':'')+'>'+f.name+'</option>'
    ).join('');

    const frameOpts = FRAME_CATALOG.map(f =>
      '<option value="'+f.key+'" '+(campo.config.frame===f.key?'selected':'')+'>'+f.name+'</option>'
    ).join('');

    const emojiOpts = '<option value="">Nenhum</option>' + EMOJI_CATALOG.map(e =>
      '<option value="'+e.key+'" '+(campo.config.emoji===e.key?'selected':'')+'>'+e.emoji+' '+e.name+'</option>'
    ).join('');

    const kaomojiOpts = '<option value="">Nenhum</option>' + KAOMOJI_CATALOG.map(k =>
      '<option value="'+k.key+'" '+(campo.config.kaomoji===k.key?'selected':'')+'>'+k.kaomoji+' — '+k.name+'</option>'
    ).join('');

    const inputHtml = campo.tipo === 'textarea'
      ? '<textarea id="sm-input-'+idx+'" placeholder="'+campo.placeholder+'" oninput="smOnInput('+idx+')">'+escapeHtml(campo.texto)+'</textarea>'
      : '<input type="text" id="sm-input-'+idx+'" placeholder="'+campo.placeholder+'" value="'+escapeHtml(campo.texto)+'" oninput="smOnInput('+idx+')">';

    return '<div class="sm-campo">' +
      '<div class="sm-campo-header">' +
        '<span class="sm-campo-label">'+campo.label+' '+(campo.opcional?'<span class="sm-campo-opcional">(opcional)</span>':'')+'</span>' +
        '<button class="sm-btn-personalizar" id="sm-btn-pers-'+idx+'" onclick="smTogglePersonalizar('+idx+')">🎨 Personalizar</button>' +
      '</div>' +
      inputHtml +
      '<div id="sm-sugestoes-'+idx+'" class="sm-sugestoes"></div>' +
      '<div class="sm-painel-personalizar" id="sm-painel-'+idx+'">' +
        '<div class="sm-select-label">Fonte ('+FONT_CATALOG.length+' opções):</div>' +
        '<select id="sm-font-'+idx+'" onchange="smOnConfigChange('+idx+')">'+fontOpts+'</select>' +
        '<div class="sm-select-label">Moldura ('+FRAME_CATALOG.length+' opções):</div>' +
        '<select id="sm-frame-'+idx+'" onchange="smOnConfigChange('+idx+')">'+frameOpts+'</select>' +
        '<div class="sm-select-label">Emoji ao redor ('+EMOJI_CATALOG.length+' opções):</div>' +
        '<select id="sm-emoji-'+idx+'" onchange="smOnConfigChange('+idx+')">'+emojiOpts+'</select>' +
        '<div class="sm-select-label">Kaomoji ('+KAOMOJI_CATALOG.length+' opções):</div>' +
        '<select id="sm-kaomoji-'+idx+'" onchange="smOnConfigChange('+idx+')">'+kaomojiOpts+'</select>' +
      '</div>' +
    '</div>';
  }).join('');
}

// ════════════════════════════════════════════════════════════════
// EVENT HANDLERS
// ════════════════════════════════════════════════════════════════

function smOnInput(idx) {
  const campo = smEstado.campos[idx];
  const el = document.getElementById('sm-input-'+idx);
  if (!el) return;
  campo.texto = el.value;
  smAtualizarSugestoes(idx);
  smAtualizarPreview();
}

function smOnConfigChange(idx) {
  const campo = smEstado.campos[idx];
  campo.config.font = document.getElementById('sm-font-'+idx)?.value || campo.config.font;
  campo.config.frame = document.getElementById('sm-frame-'+idx)?.value || campo.config.frame;
  campo.config.emoji = document.getElementById('sm-emoji-'+idx)?.value || campo.config.emoji;
  campo.config.kaomoji = document.getElementById('sm-kaomoji-'+idx)?.value || campo.config.kaomoji;
  smAtualizarPreview();
}

function smTogglePersonalizar(idx) {
  const painel = document.getElementById('sm-painel-'+idx);
  const btn = document.getElementById('sm-btn-pers-'+idx);
  if (!painel || !btn) return;
  painel.classList.toggle('aberto');
  btn.classList.toggle('ativo');
}

function smAtualizarSeparador(val) {
  smEstado.separador = val;
  smAtualizarPreview();
}



// ════════════════════════════════════════════════════════════════
// SUGESTÕES AUTOMÁTICAS
// ════════════════════════════════════════════════════════════════

function smAtualizarSugestoes(idx) {
  const container = document.getElementById('sm-sugestoes-'+idx);
  const campo = smEstado.campos[idx];
  if (!container || !campo || !campo.texto.trim()) {
    if (container) container.innerHTML = '';
    return;
  }

  const sugestoes = gerarSugestoes(campo.texto, 3);
  container.innerHTML = sugestoes.map(s => {
    const r = escapeHtml(s.resultado).substring(0,50)+(s.resultado.length>50?'...':'');
    return '<button class="sm-sugestao-btn" onclick="smAplicarSugestao('+idx+',\''+s.font+'\',\''+s.frame+'\',\''+s.emoji+'\',\''+s.kaomoji+'\')" title="'+r+'">' +
      '<span class="sm-sug-label">'+s.label+'</span> '+r+'</button>';
  }).join('');
}

function smAplicarSugestao(idx, font, frame, emoji, kaomoji) {
  const campo = smEstado.campos[idx];
  campo.config.font=font; campo.config.frame=frame;
  campo.config.emoji=emoji; campo.config.kaomoji=kaomoji;
  const fEl=document.getElementById('sm-font-'+idx);
  const frEl=document.getElementById('sm-frame-'+idx);
  const eEl=document.getElementById('sm-emoji-'+idx);
  const kEl=document.getElementById('sm-kaomoji-'+idx);
  if(fEl) fEl.value=font; if(frEl) frEl.value=frame;
  if(eEl) eEl.value=emoji; if(kEl) kEl.value=kaomoji;
  smAtualizarPreview();
}

// ════════════════════════════════════════════════════════════════
// PREVIEW EM TEMPO REAL
// ════════════════════════════════════════════════════════════════

function smAtualizarPreview() {
  const container = document.getElementById('sm-preview-conteudo');
  if (!container) return;
  const val = smEstado.campos.filter(c => c.texto && c.texto.trim());
  if (val.length===0) {
    container.innerHTML = '<div style="color:#999;font-style:italic;text-align:center;padding:20px;">Preencha os campos acima para ver o preview ✨</div>';
    return;
  }
  container.innerHTML = gerarPreviewSobreMim(smEstado.campos, smEstado.separador);
}

// ════════════════════════════════════════════════════════════════
// SALVAR E RESETAR
// ════════════════════════════════════════════════════════════════

function smSalvar() {
  const textoFinal = gerarSobreMim(smEstado.campos, smEstado.separador);
  const configSalvar = {
    campos: smEstado.campos.map(c => ({ key:c.key, texto:c.texto, config:{...c.config} })),
    separador: smEstado.separador
  };
  if (typeof window.smOnSalvar === 'function') {
    window.smOnSalvar(textoFinal, configSalvar);
  } else {
    smSalvarNoPerfil(textoFinal, configSalvar);
  }
}

async function smSalvarNoPerfil(textoDecorado, configRaw) {
  try {
    const { supabaseClient, currentUser, mostrarNotificacao } = window;
    
    // SEGURANCA: nunca salvar bio vazia se o perfil ja tinha conteudo
    var _bioOrig = (window.currentProfile && window.currentProfile.bio) || '';
    if (!textoDecorado && _bioOrig) {
      mostrarNotificacao('Nada para salvar - pelo menos um campo precisa ter texto.');
      return;
    }
    
    const payload = {
      bio: textoDecorado,
      sobre_mim_config: JSON.stringify(configRaw)
    };
    const { error } = await supabaseClient.from('profiles').update(payload).eq('id', currentUser.id);
    if (error) throw error;
    if (window.currentProfile) {
      window.currentProfile.bio = textoDecorado;
      window.currentProfile.sobre_mim_config = JSON.stringify(configRaw);
    }
    mostrarNotificacao('✅ "Sobre mim" salvo com decoração!');
  } catch(e) {
    console.error('Erro ao salvar sobre_mim:', e);
    if(window.mostrarNotificacao) window.mostrarNotificacao('❌ Erro: '+e.message);
  }
}

function smResetar() {
  smEstado.campos.forEach((c, idx) => {
    c.texto=''; c.config={...c.padrao};
    const el=document.getElementById('sm-input-'+idx);
    if(el) el.value='';
    const sel=document.getElementById('sm-sugestoes-'+idx);
    if(sel) sel.innerHTML='';
  });
  smAtualizarPreview();
}

// ════════════════════════════════════════════════════════════════
// CARREGAR DADOS EXISTENTES
// ════════════════════════════════════════════════════════════════

function carregarDadosExistentes(dados) {
  try {
    if (dados.sobre_mim_config) {
      const config = typeof dados.sobre_mim_config === 'string'
        ? JSON.parse(dados.sobre_mim_config) : dados.sobre_mim_config;
      if (config.campos && Array.isArray(config.campos)) {
        config.campos.forEach(dc => {
          const idx = smEstado.campos.findIndex(c => c.key === dc.key);
          if (idx >= 0) {
            smEstado.campos[idx].texto = dc.texto || '';
            if (dc.config) smEstado.campos[idx].config = {...smEstado.campos[idx].padrao, ...dc.config};
          }
        });
      }
      if (config.separador) smEstado.separador = config.separador;
    } else if (dados.bio) {
      const f = smEstado.campos.find(c => c.key === 'frase');
      if (f) {
        f.texto = dados.bio;
        // SEGURANCA: forcar frame=none para NAO decorar texto original
        f.config.frame = 'none';
      }
    }
  } catch(e) { console.warn('Erro ao carregar dados:', e); }
}
