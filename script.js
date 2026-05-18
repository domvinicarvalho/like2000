const { createClient } = supabase;
const supabaseClient = createClient(
  'https://hjglujffcjbrmugoprjh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ2x1amZmY2picm11Z29wcmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NTQ5NjUsImV4cCI6MjA5NDUzMDk2NX0.hbeP1zWBYvsH9BCsoyaBOkoZfIvY9U1uXdSSwxmuvos'
);

let currentUser     = null;
let currentProfile  = null;
let realtimeChannel = null;
let fotologRealtime = null;
let corSelecionada  = '#0000cc';
let fotoFile        = null;
let menuAberto      = false;
let zTop            = 100;
let unreadMessages  = 0;
let docTitleBase    = 'LIKE 2000';
let titleFlashInterval = null;
let fotologPostFile = null;

// ── NÍVEIS ───────────────────────────────────────────────────
const LEVELS = [
  { name:'Rookie',         min:0    },
  { name:'Insider',        min:100  },
  { name:'Cult Member',    min:300  },
  { name:'Legend',         min:700  },
  { name:'Bad Idea Elite', min:1500 },
];
function calcLevel(xp) {
  let l = LEVELS[0].name;
  for (const v of LEVELS) { if (xp >= v.min) l = v.name; }
  return l;
}

// ── SONS — URLs diretas do Archive.org (sem baixar nada) ─────
const SOM_MSN_NOTIFY = 'https://archive.org/download/MSNMessengerSounds/type.wav';
const SOM_MSN_ONLINE = 'https://archive.org/download/MSNMessengerSounds/online.wav';
const SOM_XP_ERRO    = 'https://archive.org/download/WindowsXPSounds/Windows%20XP%20Error.wav';

function tocarSom(url, volume = 0.7) {
  try {
    const a = new Audio(url);
    a.volume = volume;
    a.play().catch(() => {});
  } catch(e) {}
}

function tocarSomMSN()    { tocarSom(SOM_MSN_NOTIFY, 0.7); }
function tocarSomOnline() { tocarSom(SOM_MSN_ONLINE, 0.6); }
function tocarSomErro()   { tocarSom(SOM_XP_ERRO,    0.8); }

// ── NOTIFICAÇÃO NA ABA ───────────────────────────────────────
function iniciarFlashAba(count) {
  if (titleFlashInterval) return;
  titleFlashInterval = setInterval(() => {
    document.title = document.title === docTitleBase
      ? `(${count}) Nova mensagem!`
      : docTitleBase;
  }, 1000);
}
function pararFlashAba() {
  if (titleFlashInterval) { clearInterval(titleFlashInterval); titleFlashInterval = null; }
  document.title = docTitleBase;
  unreadMessages = 0;
}
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) pararFlashAba();
});

// ── ÍCONES — SVG INLINE FIEL AOS ORIGINAIS ───────────────────
// Usando SVG embutido diretamente — sem depender de URLs externas
// que podem bloquear por hotlink/CORS. Cada ícone é desenhado
// o mais fiel possível ao visual original dos anos 2000.

const ICONS_SVG = {

  // MSN Messenger 7 — borboleta laranja com bolinha verde
  msn: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <!-- corpo borboleta -->
    <ellipse cx="24" cy="26" rx="4" ry="7" fill="#FF6600"/>
    <!-- asa superior esquerda -->
    <path d="M24,22 Q10,8 8,18 Q6,26 20,26 Z" fill="#FF8C00"/>
    <!-- asa superior direita -->
    <path d="M24,22 Q38,8 40,18 Q42,26 28,26 Z" fill="#FF6600"/>
    <!-- asa inferior esquerda -->
    <path d="M24,28 Q8,28 10,38 Q14,44 22,32 Z" fill="#FFAA00"/>
    <!-- asa inferior direita -->
    <path d="M24,28 Q40,28 38,38 Q34,44 26,32 Z" fill="#FF8C00"/>
    <!-- bolinha status verde -->
    <circle cx="36" cy="12" r="9" fill="#00A000"/>
    <circle cx="36" cy="12" r="6" fill="#00CC00"/>
    <circle cx="33" cy="9" r="2" fill="rgba(255,255,255,0.6)"/>
  </svg>`,

  // Fotolog — câmera laranja estilo anos 2000
  fotolog: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="6" fill="#FF6600"/>
    <!-- corpo da câmera -->
    <rect x="6" y="15" width="36" height="24" rx="3" fill="white"/>
    <!-- lente -->
    <circle cx="24" cy="27" r="8" fill="#222"/>
    <circle cx="24" cy="27" r="6" fill="#444"/>
    <circle cx="24" cy="27" r="4" fill="#111"/>
    <circle cx="21" cy="24" r="1.5" fill="rgba(255,255,255,0.4)"/>
    <!-- visor -->
    <rect x="10" y="10" width="10" height="6" rx="1.5" fill="white"/>
    <!-- flash -->
    <rect x="32" y="11" width="8" height="5" rx="1" fill="#ffdd00"/>
  </svg>`,

  // Winamp — logo W clássico verde sobre fundo escuro
  winamp: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="4" fill="#1a1a1a"/>
    <rect x="2" y="2" width="44" height="44" rx="3" fill="none" stroke="#333" stroke-width="1"/>
    <!-- W grande estilo Winamp -->
    <text x="24" y="32" text-anchor="middle" font-size="30" fill="#00FF00"
      font-family="Arial Black, sans-serif" font-weight="900">W</text>
    <!-- brilho no topo -->
    <rect x="2" y="2" width="44" height="10" rx="3" fill="rgba(255,255,255,0.04)"/>
  </svg>`,

  // Internet Explorer — e azul com anel orbital amarelo
  ie: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <!-- anel orbital inclinado (amarelo/dourado) -->
    <ellipse cx="24" cy="24" rx="22" ry="9" fill="none"
      stroke="#E8A000" stroke-width="3.5"
      transform="rotate(-35 24 24)"/>
    <!-- globo azul -->
    <circle cx="24" cy="24" r="16" fill="#1E6FD9"/>
    <!-- meridianos brancos -->
    <ellipse cx="24" cy="24" rx="7" ry="16" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/>
    <line x1="8" y1="24" x2="40" y2="24" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/>
    <line x1="10" y1="17" x2="38" y2="17" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
    <line x1="10" y1="31" x2="38" y2="31" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
    <!-- reflexo -->
    <ellipse cx="20" cy="18" rx="5" ry="3" fill="rgba(255,255,255,0.2)" transform="rotate(-20 20 18)"/>
  </svg>`,
};

// Converte SVG para data URI usável em <img src="...">
function svgToDataUri(svgStr) {
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
}

// Retorna uma tag <img> com o SVG inline como source
function iconTag(key, size = 48) {
  const svg = ICONS_SVG[key];
  if (!svg) return '';
  return `<img src="${svgToDataUri(svg)}" style="width:${size}px;height:${size}px;object-fit:contain" alt="${key}">`;
}

// ── INIT ─────────────────────────────────────────────────────
window.addEventListener('load', async () => {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) { currentUser = session.user; await verificarPerfil(); }
});

// ── TABS ─────────────────────────────────────────────────────
function alternarTab(tab) {
  document.getElementById('tab-entrar').style.display    = tab==='entrar'    ? 'flex' : 'none';
  document.getElementById('tab-cadastrar').style.display = tab==='cadastrar' ? 'flex' : 'none';
  document.querySelectorAll('.tab-btn').forEach((b,i) => {
    b.classList.toggle('active',(i===0&&tab==='entrar')||(i===1&&tab==='cadastrar'));
  });
}

// ── LOGIN ────────────────────────────────────────────────────
async function fazerLogin() {
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value;
  const msg   = document.getElementById('msg-login');
  if (!email||!senha) { msg.textContent='Preencha e-mail e senha.'; return; }
  msg.style.color='#ffddaa'; msg.textContent='Entrando...';
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: senha });
  if (error) { msg.style.color='#ffaaaa'; msg.textContent='E-mail ou senha incorretos.'; return; }
  currentUser = data.user;
  await verificarPerfil();
}

// ── CADASTRO ─────────────────────────────────────────────────
async function fazerCadastro() {
  const email = document.getElementById('cad-email').value.trim();
  const senha = document.getElementById('cad-senha').value;
  const msg   = document.getElementById('msg-cadastro');
  if (!email||!senha) { msg.textContent='Preencha todos os campos.'; return; }
  if (senha.length<6) { msg.textContent='Senha precisa ter pelo menos 6 caracteres.'; return; }
  msg.style.color='#ffddaa'; msg.textContent='Criando conta...';
  const { data, error } = await supabaseClient.auth.signUp({ email, password: senha });
  if (error) { msg.style.color='#ffaaaa'; msg.textContent='Erro: '+error.message; return; }
  currentUser = data.user;
  msg.style.color='#aaffaa'; msg.textContent='✅ Conta criada! Vá para "Entrar" e faça login.';
}

// ── VERIFICAR PERFIL ──────────────────────────────────────────
async function verificarPerfil() {
  const { data } = await supabaseClient.from('profiles').select('*').eq('id',currentUser.id).single();
  if (data&&data.nickname) { currentProfile=data; mostrarBoot(); }
  else mostrarTelaPerfil();
}

// ── TELA DE PERFIL ────────────────────────────────────────────
function mostrarTelaPerfil() {
  document.getElementById('tela-login').style.display  = 'none';
  document.getElementById('tela-perfil').style.display = 'flex';
}
function previewFoto(event) {
  fotoFile = event.target.files[0]; if (!fotoFile) return;
  const r = new FileReader();
  r.onload = e => {
    const img = document.getElementById('avatar-preview');
    img.src=e.target.result; img.style.display='block';
    document.getElementById('avatar-placeholder').style.display='none';
  }; r.readAsDataURL(fotoFile);
}
function selecionarCor(cor, el) {
  corSelecionada=cor;
  document.querySelectorAll('.cor').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
}
async function salvarPerfil() {
  const nick = document.getElementById('perfil-nick').value.trim();
  const msg  = document.getElementById('msg-perfil');
  if (!nick) { msg.textContent='Escolha um nickname!'; return; }
  msg.style.color='#ffddaa'; msg.textContent='Salvando...';
  let avatarUrl = null;
  if (fotoFile) {
    msg.textContent='Enviando foto...';
    const c = await comprimirImagem(fotoFile, 200);
    const nome = currentUser.id+'_avatar.jpg';
    const { error:ue } = await supabaseClient.storage.from('avatars').upload(nome,c,{upsert:true,contentType:'image/jpeg'});
    if (ue) { msg.style.color='#ffaaaa'; msg.textContent='Erro no upload.'; return; }
    const { data:ud } = supabaseClient.storage.from('avatars').getPublicUrl(nome);
    avatarUrl = ud.publicUrl;
  }
  const ref = nick.toUpperCase().replace(/\s+/g,'').slice(0,8)+Math.floor(Math.random()*900+100);
  const { error } = await supabaseClient.from('profiles').upsert({
    id:currentUser.id, nickname:nick, color:corSelecionada,
    avatar_url:avatarUrl, xp:0, level:'Rookie', referral_code:ref
  });
  if (error) { msg.style.color='#ffaaaa'; msg.textContent='Erro ao salvar.'; return; }
  currentProfile = { nickname:nick, color:corSelecionada, avatar_url:avatarUrl, xp:0, level:'Rookie', referral_code:ref };
  mostrarBoot();
}

// ── COMPRIMIR IMAGEM ──────────────────────────────────────────
function comprimirImagem(file, maxSize=800) {
  return new Promise(resolve => {
    const r = new FileReader();
    r.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w=img.width, h=img.height;
        if (w>h) { h=h*maxSize/w; w=maxSize; } else { w=w*maxSize/h; h=maxSize; }
        canvas.width=w; canvas.height=h;
        canvas.getContext('2d').drawImage(img,0,0,w,h);
        canvas.toBlob(b=>resolve(b),'image/jpeg',0.85);
      }; img.src=e.target.result;
    }; r.readAsDataURL(file);
  });
}

// ── ANIMAÇÃO DE BOOT XP ───────────────────────────────────────
function mostrarBoot() {
  document.body.innerHTML = `
    <div class="boot-screen" id="boot-screen">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Windows_XP_bliss_%28trimmed%29.jpg/1200px-Windows_XP_bliss_%28trimmed%29.jpg"
        class="boot-logo" alt="XP" onerror="this.style.display='none'">
      <div class="boot-titulo">Microsoft Windows XP</div>
      <div class="boot-sub">Professional</div>
      <div class="boot-barra-container">
        <div class="boot-barra" id="boot-barra"></div>
      </div>
      <div class="boot-copy">Copyright © Bad Idea / LIKE 2000</div>
    </div>`;

  const barra = document.getElementById('boot-barra');
  let progresso = 0;
  const intervalo = setInterval(() => {
    progresso += Math.random() * 18 + 4;
    barra.style.width = Math.min(progresso, 100) + '%';
    if (progresso >= 100) {
      clearInterval(intervalo);
      setTimeout(mostrarDesktop, 600);
    }
  }, 200);
}

// ── XP ────────────────────────────────────────────────────────
async function adicionarXP(qtd, motivo) {
  const novoXP    = (currentProfile.xp||0) + qtd;
  const novoLevel = calcLevel(novoXP);
  await supabaseClient.from('profiles').update({xp:novoXP,level:novoLevel}).eq('id',currentUser.id);
  const lvAntes = currentProfile.level;
  currentProfile.xp=novoXP; currentProfile.level=novoLevel;
  const el = document.getElementById('taskbar-xp');
  if (el) el.textContent = `⭐ ${novoXP} XP · ${novoLevel}`;
  if (novoLevel!==lvAntes) mostrarNotificacao(`🎉 Subiu para ${novoLevel}!`);
  else mostrarNotificacao(`+${qtd} XP — ${motivo}`);
}
function mostrarNotificacao(txt) {
  const n = document.createElement('div');
  n.className='notificacao'; n.textContent=txt;
  document.body.appendChild(n);
  setTimeout(()=>n.classList.add('visivel'),50);
  setTimeout(()=>{ n.classList.remove('visivel'); setTimeout(()=>n.remove(),400); },3000);
}

// ── DESKTOP ───────────────────────────────────────────────────
function mostrarDesktop() {
  const audio = document.getElementById('startup');
  if (audio) audio.play().catch(()=>{});

  document.body.innerHTML = `
    <div class="desktop" onclick="fecharMenuSeAberto(event)">
      <div class="icons">
        <div class="icon" onclick="trazerFrente('janela-msn');abrirMSN()">${iconTag('msn')}<span>MSN Messenger</span></div>
        <div class="icon" onclick="trazerFrente('janela-fotolog');abrirFotolog()">${iconTag('fotolog')}<span>Fotolog</span></div>
        <div class="icon" onclick="trazerFrente('janela-winamp');abrirWinamp()">${iconTag('winamp')}<span>Winamp</span></div>
        <div class="icon" onclick="trazerFrente('janela-ie');abrirIE()">${iconTag('ie')}<span>Internet Explorer</span></div>
      </div>

      <div class="start-menu" id="start-menu">
        <div class="start-menu-header">
          <div class="start-menu-avatar">
            ${currentProfile.avatar_url
              ? `<img src="${currentProfile.avatar_url}" alt="">`
              : `<div class="start-menu-inicial">${currentProfile.nickname.charAt(0).toUpperCase()}</div>`}
          </div>
          <div>
            <div class="start-menu-nick" style="color:${currentProfile.color}">${escapeHtml(currentProfile.nickname)}</div>
            <div style="font-size:11px;color:#aac4ff">⭐ ${currentProfile.xp||0} XP · ${currentProfile.level||'Rookie'}</div>
          </div>
        </div>
        <div class="start-menu-body">
          <div class="start-menu-col left">
            <div class="menu-item" onclick="trazerFrente('janela-msn');abrirMSN();fecharMenu()">
              ${iconTag('msn',32)}<div><div class="menu-item-title">MSN Messenger</div><div class="menu-item-sub">chat ao vivo</div></div>
            </div>
            <div class="menu-item" onclick="trazerFrente('janela-fotolog');abrirFotolog();fecharMenu()">
              ${iconTag('fotolog',32)}<div><div class="menu-item-title">Fotolog</div><div class="menu-item-sub">feed de fotos</div></div>
            </div>
            <div class="menu-item" onclick="trazerFrente('janela-winamp');abrirWinamp();fecharMenu()">
              ${iconTag('winamp',32)}<div><div class="menu-item-title">Winamp</div><div class="menu-item-sub">rádio online</div></div>
            </div>
            <div class="menu-item" onclick="trazerFrente('janela-ie');abrirIE();fecharMenu()">
              ${iconTag('ie',32)}<div><div class="menu-item-title">Internet Explorer</div><div class="menu-item-sub">ingressos</div></div>
            </div>
          </div>
          <div class="start-menu-divider"></div>
          <div class="start-menu-col right">
            <div class="menu-item-right">📁 Meu Perfil</div>
            <div class="menu-item-right">🏆 Ranking</div>
            <div class="menu-item-right">🎟️ ${escapeHtml(currentProfile.referral_code||'')}</div>
            <div class="menu-item-right" style="margin-top:auto;border-top:1px solid #7090c0;padding-top:8px" onclick="fazerLogout()">🔴 Sair</div>
          </div>
        </div>
      </div>

      <div class="taskbar">
        <div class="start" onclick="toggleMenu(event)">iniciar</div>
        <div class="taskbar-xp" id="taskbar-xp">⭐ ${currentProfile.xp||0} XP · ${currentProfile.level||'Rookie'}</div>
        <div class="taskbar-right"><div class="clock" id="clock">00:00</div></div>
      </div>
    </div>`;

  atualizarRelogio();
  setInterval(atualizarRelogio, 1000);
}
function atualizarRelogio() {
  const el=document.getElementById('clock'); if(!el)return;
  const d=new Date();
  el.textContent=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
}

// ── MENU ─────────────────────────────────────────────────────
function toggleMenu(e) { e.stopPropagation(); const m=document.getElementById('start-menu'); if(!m)return; menuAberto=!menuAberto; m.classList.toggle('aberto',menuAberto); }
function fecharMenu()   { const m=document.getElementById('start-menu'); if(m)m.classList.remove('aberto'); menuAberto=false; }
function fecharMenuSeAberto(e) { if(menuAberto)fecharMenu(); }
async function fazerLogout() { await supabaseClient.auth.signOut(); location.reload(); }

// ── DRAG MOUSE + TOUCH ────────────────────────────────────────
function trazerFrente(id) {
  const el=document.getElementById(id); if(el){zTop++;el.style.zIndex=zTop;}
}
function tornarArrastavel(janela) {
  const titlebar=janela.querySelector('.xp-titlebar'); if(!titlebar)return;

  function iniciarDrag(startX, startY) {
    const ox=janela.offsetLeft, oy=janela.offsetTop;
    function onMove(cx,cy) {
      janela.style.left=Math.max(0,ox+cx-startX)+'px';
      janela.style.top=Math.max(0,oy+cy-startY)+'px';
    }
    function onMouseMove(e) { onMove(e.clientX,e.clientY); }
    function onMouseUp()    { document.removeEventListener('mousemove',onMouseMove); document.removeEventListener('mouseup',onMouseUp); }
    document.addEventListener('mousemove',onMouseMove);
    document.addEventListener('mouseup',onMouseUp);
    function onTouchMove(e) { e.preventDefault(); onMove(e.touches[0].clientX,e.touches[0].clientY); }
    function onTouchEnd()   { titlebar.removeEventListener('touchmove',onTouchMove); titlebar.removeEventListener('touchend',onTouchEnd); }
    titlebar.addEventListener('touchmove',onTouchMove,{passive:false});
    titlebar.addEventListener('touchend',onTouchEnd);
  }

  titlebar.addEventListener('mousedown', e => {
    if(e.target.classList.contains('tbtn'))return;
    trazerFrente(janela.id); iniciarDrag(e.clientX,e.clientY);
  });
  titlebar.addEventListener('touchstart', e => {
    if(e.target.classList.contains('tbtn'))return;
    trazerFrente(janela.id); iniciarDrag(e.touches[0].clientX,e.touches[0].clientY);
  },{passive:true});

  janela.addEventListener('mousedown',()=>trazerFrente(janela.id));
  janela.addEventListener('touchstart',()=>trazerFrente(janela.id),{passive:true});
}

// ── JANELA GENÉRICA ───────────────────────────────────────────
function criarJanela(id,titulo,iconKey,largura,altura,top,left,conteudo) {
  if(document.getElementById(id)){trazerFrente(id);return null;}
  zTop++;
  const j=document.createElement('div');
  j.className='xp-window'; j.id=id;
  j.style.cssText=`width:${largura}px;height:${altura}px;top:${top}px;left:${left}px;z-index:${zTop}`;
  j.innerHTML=`
    <div class="xp-titlebar">
      <div class="xp-title-left">${iconTag(iconKey,16)} ${titulo}</div>
      <div class="title-btns">
        <div class="tbtn">_</div><div class="tbtn">□</div>
        <div class="tbtn fechar" onclick="fecharJanela('${id}')">✕</div>
      </div>
    </div>
    <div class="xp-body">${conteudo}</div>`;
  document.querySelector('.desktop').appendChild(j);
  tornarArrastavel(j);
  return j;
}
function fecharJanela(id) {
  const j=document.getElementById(id); if(j)j.remove();
  if(id==='janela-fotolog'&&fotologRealtime){supabaseClient.removeChannel(fotologRealtime);fotologRealtime=null;}
  if(id==='janela-msn'&&realtimeChannel){supabaseClient.removeChannel(realtimeChannel);realtimeChannel=null;}
}

// ══════════════════════════════════════════
//  MSN
// ══════════════════════════════════════════
function abrirMSN() {
  fecharMenu();
  if(document.getElementById('janela-msn')){trazerFrente('janela-msn');return;}
  const avatarHtml=currentProfile.avatar_url
    ?`<img src="${currentProfile.avatar_url}" class="avatar-img" alt="">`
    :`<div class="avatar">${currentProfile.nickname.charAt(0).toUpperCase()}</div>`;
  zTop++;
  const j=document.createElement('div');
  j.className='xp-window'; j.id='janela-msn';
  j.style.cssText=`width:680px;height:520px;top:40px;left:60px;z-index:${zTop}`;
  j.innerHTML=`
    <div class="xp-titlebar">
      <div class="xp-title-left">${iconTag('msn',16)} MSN Messenger</div>
      <div class="title-btns">
        <div class="tbtn">_</div><div class="tbtn">□</div>
        <div class="tbtn fechar" onclick="fecharJanela('janela-msn')">✕</div>
      </div>
    </div>
    <div class="msn-userbar">
      ${avatarHtml}
      <div class="msn-userinfo">
        <h3 style="color:${currentProfile.color}">${escapeHtml(currentProfile.nickname)}</h3>
        <span>● online — LIKE 2000</span>
      </div>
    </div>
    <div class="msn-toolbar">
      <button class="tool-btn">📁 Arquivo</button>
      <div class="toolbar-sep"></div>
      <button class="tool-btn">😊 Emoticons</button>
    </div>
    <div class="msn-body">
      <div id="messages" class="messages">
        <div class="msg-system">— Bem-vindo ao LIKE 2000 —</div>
        <div class="msg-system">${escapeHtml(currentProfile.nickname)} entrou na sala</div>
      </div>
      <div class="send-area">
        <div class="send-toolbar">
          <button class="emote-btn" onclick="inserirEmote(':)')">😊</button>
          <button class="emote-btn" onclick="inserirEmote(':D')">😄</button>
          <button class="emote-btn" onclick="inserirEmote(';)')">😉</button>
          <button class="emote-btn" onclick="inserirEmote(':P')">😛</button>
          <button class="emote-btn" onclick="inserirEmote(':(')" >😢</button>
          <button class="emote-btn" onclick="inserirEmote('xD')">🤣</button>
          <button class="emote-btn" onclick="inserirEmote('&lt;3')">❤️</button>
        </div>
        <div class="send-box">
          <input id="messageInput" type="text" placeholder="escreva uma mensagem..." maxlength="300">
          <button onclick="sendMessage()">Enviar</button>
        </div>
      </div>
    </div>`;
  document.querySelector('.desktop').appendChild(j);
  tornarArrastavel(j);
  document.getElementById('messageInput').addEventListener('keydown',e=>{if(e.key==='Enter')sendMessage();});
  loadMessages(); iniciarRealtime();
}

function iniciarRealtime() {
  if(realtimeChannel)supabaseClient.removeChannel(realtimeChannel);
  realtimeChannel=supabaseClient.channel('chat-room')
    .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages'}, p => {
      addMessage(p.new);
      if(p.new.user_id !== currentUser.id) {
        tocarSomMSN();
        tocarSomOnline();
        if(document.hidden) {
          unreadMessages++;
          iniciarFlashAba(unreadMessages);
        }
      }
    })
    .subscribe();
}
async function sendMessage() {
  const input=document.getElementById('messageInput');
  const text=input.value.trim(); if(!text)return;
  input.value=''; input.focus();
  await supabaseClient.from('messages').insert([{
    nickname:currentProfile.nickname, message:text,
    color:currentProfile.color, avatar_url:currentProfile.avatar_url, user_id:currentUser.id
  }]);
}
async function loadMessages() {
  const {data}=await supabaseClient.from('messages').select('*').order('id',{ascending:true}).limit(100);
  const c=document.getElementById('messages'); if(!c||!data)return;
  c.innerHTML=`<div class="msg-system">— Bem-vindo ao LIKE 2000 —</div><div class="msg-system">${escapeHtml(currentProfile.nickname)} entrou na sala</div>`;
  data.forEach(m=>addMessage(m));
}
function addMessage(msg) {
  const c=document.getElementById('messages'); if(!c)return;
  const mine=msg.user_id===currentUser.id;
  const cor=msg.color||'#0000cc';
  const av=msg.avatar_url
    ?`<img src="${msg.avatar_url}" class="msg-avatar" alt="">`
    :`<div class="msg-avatar-inicial" style="background:${cor}">${msg.nickname.charAt(0).toUpperCase()}</div>`;
  const p=document.createElement('div');
  p.className=mine?'msg-bloco minha':'msg-bloco';
  p.innerHTML=`${av}<div class="msg-conteudo"><span class="nick" style="color:${cor}">${escapeHtml(msg.nickname)}</span><span class="msg-text">${escapeHtml(msg.message)}</span></div>`;
  c.appendChild(p); c.scrollTop=c.scrollHeight;
}
function inserirEmote(e){const i=document.getElementById('messageInput');if(!i)return;i.value+=e;i.focus();}

// ══════════════════════════════════════════
//  FOTOLOG
// ══════════════════════════════════════════
function abrirFotolog() {
  fecharMenu();
  if(document.getElementById('janela-fotolog')){trazerFrente('janela-fotolog');return;}
  zTop++;
  const j=document.createElement('div');
  j.className='xp-window'; j.id='janela-fotolog';
  j.style.cssText=`width:660px;height:540px;top:30px;left:160px;z-index:${zTop}`;
  const avHtml=currentProfile.avatar_url
    ?`<img src="${currentProfile.avatar_url}" class="fl-avatar" alt="">`
    :`<div class="fl-avatar-inicial" style="background:${currentProfile.color}">${currentProfile.nickname.charAt(0).toUpperCase()}</div>`;
  j.innerHTML=`
    <div class="xp-titlebar">
      <div class="xp-title-left">${iconTag('fotolog',16)} Fotolog</div>
      <div class="title-btns">
        <div class="tbtn">_</div><div class="tbtn">□</div>
        <div class="tbtn fechar" onclick="fecharJanela('janela-fotolog')">✕</div>
      </div>
    </div>
    <div class="fotolog-body">
      <div class="fotolog-sidebar">
        <div class="fotolog-meu-perfil">
          ${avHtml}
          <div class="fl-nick" style="color:${currentProfile.color}">${escapeHtml(currentProfile.nickname)}</div>
          <div class="fl-level" id="fl-xp-display">⭐ ${currentProfile.xp||0} XP · ${currentProfile.level||'Rookie'}</div>
          <div class="fl-cupom">🎟️ ${escapeHtml(currentProfile.referral_code||'')}</div>
        </div>
        <div class="fl-post-box">
          <div class="fl-post-foto" onclick="document.getElementById('fl-foto-input').click()">
            <img id="fl-foto-preview" src="" style="display:none;width:100%;height:100%;object-fit:contain;border-radius:4px">
            <span id="fl-foto-placeholder">📷<br><small>clique para escolher foto</small></span>
          </div>
          <input type="file" id="fl-foto-input" accept="image/*" style="display:none" onchange="previewFotolog(event)">
          <textarea id="fl-caption" placeholder="escreva algo..." maxlength="200" rows="3"></textarea>
          <button onclick="publicarPost()" class="fl-btn-postar">Publicar (+20 XP)</button>
        </div>
      </div>
      <div class="fotolog-feed" id="fotolog-feed">
        <div class="fl-loading">carregando posts...</div>
      </div>
    </div>`;
  document.querySelector('.desktop').appendChild(j);
  tornarArrastavel(j);
  j.addEventListener('mousedown',()=>trazerFrente('janela-fotolog'));
  j.addEventListener('touchstart',()=>trazerFrente('janela-fotolog'),{passive:true});
  carregarFeed();
  iniciarRealtimeFotolog();
}

function previewFotolog(e) {
  fotologPostFile=e.target.files[0]; if(!fotologPostFile)return;
  const r=new FileReader();
  r.onload=ev=>{
    const img=document.getElementById('fl-foto-preview');
    img.src=ev.target.result; img.style.display='block';
    document.getElementById('fl-foto-placeholder').style.display='none';
  }; r.readAsDataURL(fotologPostFile);
}

async function publicarPost() {
  const caption=document.getElementById('fl-caption').value.trim();
  const btn=document.querySelector('.fl-btn-postar');
  if(!fotologPostFile&&!caption){mostrarNotificacao('Adicione uma foto ou texto!');return;}
  btn.textContent='Publicando...'; btn.disabled=true;
  let imageUrl=null;
  if(fotologPostFile){
    const c=await comprimirImagem(fotologPostFile,800);
    const nome=currentUser.id+'_'+Date.now()+'.jpg';
    const {error:ue}=await supabaseClient.storage.from('posts').upload(nome,c,{contentType:'image/jpeg'});
    if(ue){mostrarNotificacao('Erro no upload.');btn.textContent='Publicar (+20 XP)';btn.disabled=false;return;}
    const {data:ud}=supabaseClient.storage.from('posts').getPublicUrl(nome);
    imageUrl=ud.publicUrl;
  }
  const {data:postData,error}=await supabaseClient.from('posts').insert([{
    user_id:currentUser.id, nickname:currentProfile.nickname,
    avatar_url:currentProfile.avatar_url, color:currentProfile.color,
    image_url:imageUrl, caption:caption, xp_awarded:true
  }]).select().single();
  if(!error&&postData){
    await adicionarXP(20,'post no Fotolog');
    const feed=document.getElementById('fotolog-feed');
    if(feed){
      const semPosts=feed.querySelector('.fl-loading'); if(semPosts)semPosts.remove();
      feed.insertBefore(criarCardPost(postData,0,false,[]),feed.firstChild);
    }
    fotologPostFile=null;
    document.getElementById('fl-foto-preview').style.display='none';
    document.getElementById('fl-foto-placeholder').style.display='block';
    document.getElementById('fl-caption').value='';
    document.getElementById('fl-foto-input').value='';
  }
  btn.textContent='Publicar (+20 XP)'; btn.disabled=false;
}

async function carregarFeed() {
  const feed=document.getElementById('fotolog-feed'); if(!feed)return;
  const {data,error}=await supabaseClient.from('posts').select('*').order('created_at',{ascending:false}).limit(30);
  if(error){feed.innerHTML='<div class="fl-loading">Erro ao carregar.</div>';return;}
  feed.innerHTML='';
  if(!data.length){feed.innerHTML='<div class="fl-loading">Nenhum post ainda. Seja o primeiro! 📸</div>';return;}
  for(const post of data){
    const {count}=await supabaseClient.from('likes').select('*',{count:'exact',head:true}).eq('post_id',post.id);
    const {data:jg}=await supabaseClient.from('likes').select('id').eq('post_id',post.id).eq('user_id',currentUser.id).maybeSingle();
    const {data:comms}=await supabaseClient.from('comments').select('*').eq('post_id',post.id).order('created_at',{ascending:true});
    feed.appendChild(criarCardPost(post,count||0,!!jg,comms||[]));
  }
}

function criarCardPost(post,likes,jaGostei,comments){
  const card=document.createElement('div');
  card.className='fl-card'; card.id='post-'+post.id;
  const av=post.avatar_url
    ?`<img src="${post.avatar_url}" class="fl-card-avatar" alt="">`
    :`<div class="fl-card-avatar-inicial" style="background:${post.color||'#0000cc'}">${post.nickname.charAt(0).toUpperCase()}</div>`;
  const dt=new Date(post.created_at).toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'2-digit',hour:'2-digit',minute:'2-digit'});
  const comHtml=comments.map(c=>`<div class="fl-comment"><span class="fl-comment-nick" style="color:${c.color||'#0000cc'}">${escapeHtml(c.nickname)}:</span> <span>${escapeHtml(c.content)}</span></div>`).join('');
  card.innerHTML=`
    <div class="fl-card-header">${av}<div><div class="fl-card-nick" style="color:${post.color||'#0000cc'}">${escapeHtml(post.nickname)}</div><div class="fl-card-data">${dt}</div></div></div>
    ${post.image_url?`<img src="${post.image_url}" class="fl-card-img" alt="">`:''}
    ${post.caption?`<div class="fl-card-caption">${escapeHtml(post.caption)}</div>`:''}
    <div class="fl-card-actions">
      <button class="fl-like-btn ${jaGostei?'liked':''}" onclick="toggleLike(${post.id},this)">${jaGostei?'❤️':'🤍'} <span class="like-count">${likes}</span></button>
      <button class="fl-comment-btn" onclick="toggleComentarios(${post.id})">💬 ${comments.length}</button>
    </div>
    <div class="fl-comments-area" id="comments-${post.id}">
      <div class="fl-comments-list" id="comments-list-${post.id}">${comHtml}</div>
      <div class="fl-comment-input-row">
        <input type="text" id="comment-input-${post.id}" placeholder="deixe um comentário... (+5 XP)" maxlength="200"
          onkeydown="if(event.key==='Enter')enviarComentario(${post.id})">
        <button onclick="enviarComentario(${post.id})">ok</button>
      </div>
    </div>`;
  return card;
}

async function toggleLike(postId,btn){
  const {data:jg}=await supabaseClient.from('likes').select('id').eq('post_id',postId).eq('user_id',currentUser.id).maybeSingle();
  const cnt=parseInt(btn.querySelector('.like-count').textContent);
  if(jg){
    await supabaseClient.from('likes').delete().eq('post_id',postId).eq('user_id',currentUser.id);
    btn.classList.remove('liked'); btn.innerHTML=`🤍 <span class="like-count">${cnt-1}</span>`;
  }else{
    await supabaseClient.from('likes').insert([{post_id:postId,user_id:currentUser.id}]);
    btn.classList.add('liked'); btn.innerHTML=`❤️ <span class="like-count">${cnt+1}</span>`;
    await adicionarXP(2,'curtiu um post');
  }
}
function toggleComentarios(postId){
  const a=document.getElementById('comments-'+postId); if(!a)return;
  a.classList.toggle('aberto');
  if(a.classList.contains('aberto')){const i=document.getElementById('comment-input-'+postId);if(i)i.focus();}
}
async function enviarComentario(postId){
  const input=document.getElementById('comment-input-'+postId);
  const text=input.value.trim(); if(!text)return; input.value='';
  const {error}=await supabaseClient.from('comments').insert([{
    post_id:postId, user_id:currentUser.id, nickname:currentProfile.nickname,
    avatar_url:currentProfile.avatar_url, color:currentProfile.color, content:text, xp_awarded:true
  }]);
  if(!error){
    await adicionarXP(5,'comentou no Fotolog');
    const lista=document.getElementById('comments-list-'+postId);
    if(lista){
      const d=document.createElement('div'); d.className='fl-comment';
      d.innerHTML=`<span class="fl-comment-nick" style="color:${currentProfile.color}">${escapeHtml(currentProfile.nickname)}:</span> <span>${escapeHtml(text)}</span>`;
      lista.appendChild(d);
      const btn=document.querySelector(`#post-${postId} .fl-comment-btn`);
      if(btn)btn.textContent=`💬 ${lista.children.length}`;
    }
  }
}

function iniciarRealtimeFotolog(){
  if(fotologRealtime)supabaseClient.removeChannel(fotologRealtime);
  fotologRealtime=supabaseClient.channel('fotolog-posts')
    .on('postgres_changes',{event:'INSERT',schema:'public',table:'posts'},async p=>{
      const feed=document.getElementById('fotolog-feed'); if(!feed)return;
      if(p.new.user_id===currentUser.id)return;
      const semPosts=feed.querySelector('.fl-loading'); if(semPosts)semPosts.remove();
      feed.insertBefore(criarCardPost(p.new,0,false,[]),feed.firstChild);
    }).subscribe();
}

// ══════════════════════════════════════════
//  WINAMP / IE placeholders
// ══════════════════════════════════════════
function abrirWinamp(){
  fecharMenu();
  tocarSomErro();
  criarJanela('janela-winamp','Winamp','winamp',320,100,200,300,`<div style="padding:20px;text-align:center;font-size:13px;color:#555">🎵 Rádio online — em breve!</div>`);
}
function abrirIE(){
  fecharMenu();
  tocarSomErro();
  criarJanela('janela-ie','Internet Explorer','ie',500,80,220,200,`<div style="padding:20px;text-align:center;font-size:13px;color:#555">🌐 Ingressos — em breve!</div>`);
}

// ── UTILS ────────────────────────────────────────────────────
function escapeHtml(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}