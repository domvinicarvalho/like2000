---
trigger: always_on
---

Like 2000 — Contexto do Projeto

O que é o projeto

Like 2000 é uma plataforma social retrô que recria a estética da internet dos anos 2000 (Windows XP, MSN Messenger, Orkut, Fotolog, Winamp). É o funil de comunidade e ticketing da Bad Idea, empresa de produção de eventos e vida noturna de São Paulo. Conceito central: "não é a rede social da festa — é a festa da rede social".

Vinicius (Vini) é o fundador da Bad Idea, DJ open format, não-técnico, e dirige o projeto estrategicamente. Toda implementação de código é feita por um agente de IA (atualmente Antigravity, antes Gemini Code Assist) dentro do VS Code/IDE.

Stack técnico


Frontend: HTML5 semântico, JavaScript Vanilla, CSS nativo
Backend/Banco: Supabase (auth, banco relacional, Realtime, Edge Functions) — Project ID: hjglujffcjbrmugoprjh
Hospedagem: Vercel, deploy via GitHub (repo: domvinicarvalho/like2000)
Domínio: like2000.com.br, DNS via Cloudflare (nameservers pola.ns.cloudflare.com / sullivan.ns.cloudflare.com) para habilitar Cloudflare Email Routing
Mídia: Cloudinary (Cloud Name: dhqnjfxny, Upload Preset: like2000_uploads)
E-mail transacional: Brevo (sender marty@like2000.com.br)
E-mail marketing: Sender.net (plano gratuito)
OAuth: Google, Discord, X
Tracking de ingressos: Shotgun via UTM (campo CAMPAIGN), crédito de XP ainda manual via planilha


Sistema de XP (economia de gamificação)


Compra de ingresso: +200 XP
Referral (indicação): +100 XP
Check-in no evento: +100 XP
Compartilhamento (story Instagram): +50 XP
Adicionar amigo: +10 XP
Post no Fotolog: +10 XP
Comentários: +5 XP (com teto)
Streak de login: +3 XP, dobrando a cada 10 dias
Temporada: ciclo de 45 dias, XP zera, badges permanecem
Regra de ouro: eventos da Bad Idea sempre dão mais XP (200) que eventos de parceiros (30-50)


Funcionalidades já implementadas e funcionando


Autenticação (OAuth + email/senha)
Perfil estilo Orkut (perfil.html) com depoimentos, caixa de amigos, avaliações confiável/legal/sexy
Janela Tarefas: tarefas diárias + compartilhamento de evento (upload de print pro Cloudinary, crédito automático de XP às 18h via pg_cron)
Painel Admin (admin.html): CRUD de tarefas, eventos, configurações do app, disparo de alertas
Ingressos Explorer: listagem dinâmica de eventos com links de compra com UTM
Sistema de referral completo (+100 XP via trigger)
E-mail de boas-vindas via Brevo (template HTML estilo Hotmail 2003)
Supabase Realtime otimizado (~180 usuários simultâneos)


Decisões importantes já tomadas (não reabrir sem alinhar com Vini)


Comunidades do Orkut V1 (lançamento): mostram apenas nome e foto na página de perfil, visível pra todos. V2 (membros, feed) é planejada pra ser implementada dias/semanas após o lançamento — não é bloqueador de lançamento.
Prêmios da temporada: não há janela dedicada. Aparecem dentro das janelas Ranking e Tarefas:

Janela Ranking: card com imagem em destaque pro prêmio do Top 1 (atualmente: SafePass — 1 ingresso pro show do Iron Maiden em São Paulo, 25/10/2026, Allianz Parque — com logo da SafePass). Top 2 (tatuagem com Carla Franskowiak) e Top 3-10 (a confirmar) aparecem só em texto, sem imagem.
Janela Tarefas: só um banner/destaque curto conectando "completar tarefas" a "subir no ranking pra ganhar prêmios" — sem repetir a lista completa.
Estrutura de dados deve ser fácil de atualizar a cada temporada (45 dias) via painel admin, sem precisar mexer em código a cada troca de parceiro.



Parceiros de festival (Não Era Só Uma Fase, Bloco Emo, Sad Baile, Trevoza, Ravens): recebem 2 alertas de sistema por evento, presença no hub, comunidade Orkut (V1: nome+foto) e badge de parceiro — sempre com XP menor que eventos Bad Idea.
O plano de marketing promete aos parceiros apenas "visibilidade dentro da plataforma" de forma genérica — não promete tratamento visual específico (imagem/card) por padrão. SafePass é o único com card de imagem confirmado, por ser o "prêmio âncora" da temporada.


Como trabalhar com o Vini


Vini é não-técnico — explicações devem ser em linguagem natural, sem jargão desnecessário, focando no resultado e no "porquê".
Prefere descrever o que quer em palavras e deixar que o agente decida a implementação técnica (estrutura de dados, nomes de tabela, etc.) — não espere brief com especificação técnica detalhada.
O projeto está em reta final de pré-lançamento — priorize bloqueadores de lançamento sobre polish/funcionalidades secundárias.
Antes de declarar uma tarefa "pronta", verifique se ela realmente atende ao que foi pedido (teste/revise antes de reportar como concluído) — Vini está usando cota limitada de agente (plano gratuito) e cada rodada de correção consome parte dela.