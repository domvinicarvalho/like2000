import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

Deno.serve(async (req: Request) => {
  // Tratamento de CORS para requisições de pré-vôo
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    // Usamos .trim() para evitar que espaços invisíveis causem erro 401
    const expectedKey = Deno.env.get("APP_SERVICE_ROLE_KEY")?.trim();
    const brevoKey = Deno.env.get("BREVO_API_KEY")?.trim();
    const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim();
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim();

    console.log("--- Request recebido na Edge Function ---");
    console.log("--- [DEBUG] Início da Execução ---");

    // Validação de Segurança robusta
    if (authHeader?.includes("cole-sua-chave") || authHeader?.includes("sua-chave-aqui")) {
      console.error("❌ ERRO: O Webhook está enviando o placeholder 'cole-sua-chave'.");
      return new Response(JSON.stringify({ error: "Configuração de Webhook viciada no Dashboard" }), { status: 400 });
    }

    // Validação de Segurança (Gatilho -> Function)
    if (!authHeader || !expectedKey || !authHeader.includes(expectedKey)) {
      console.error("ERRO 401: Falha na autenticação (Gatilho -> Function).");
      return new Response(JSON.stringify({ error: "Não autorizado" }), { 
        status: 401, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    if (!brevoKey) {
      console.error("ERRO 500: BREVO_API_KEY ausente.");
      return new Response(JSON.stringify({ error: "Configuração BREVO_API_KEY ausente" }), { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const payload = await req.json();
    console.log("1. Payload recebido.");
    
    const record = payload.record || {};
    const userId = record.id;

    // Só prosseguimos se houver um nickname real (ignora o INSERT inicial do Auth)
    if (!record.nickname || record.nickname === "Novo Usuário") {
      console.log("2. Nickname ainda genérico. Ignorando.");
      return new Response(JSON.stringify({ message: "Cadastro incompleto" }), { status: 200 });
    }

    let email = record.email || payload.email;
    
    if (!email && userId && supabaseUrl && serviceRoleKey) {
      console.log("3. Buscando e-mail no Auth para ID:", userId);
      const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
      const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
      
      if (!userError && userData?.user) {
        email = userData.user.email;
      }
    }

    if (!email) {
      console.error("ERRO: E-mail não localizado.");
      return new Response(JSON.stringify({ error: "Email não encontrado" }), { status: 400 });
    }

    const nickname = record.nickname;
    const referral_code = record.referral_code || "OFFICIAL";

    console.log(`4. Preparando envio para: ${nickname} <${email}>`);

    const htmlTemplate = `
<div style="font-family: 'Tahoma', 'Geneva', sans-serif; background-color: #dce9f7; padding: 20px; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #7ab3e0; box-shadow: 4px 4px 0px rgba(0,0,0,0.1);">
    
    <!-- Header Estilo Hotmail 2003 -->
    <div style="background: linear-gradient(to bottom, #1b3f7e 0%, #2563c8 100%); padding: 10px 15px; border-bottom: 1px solid #0c2d7e;">
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <span style="color: white; font-weight: bold; font-size: 14px; text-shadow: 1px 1px 0px rgba(0,0,0,0.5);">Like 2000 - Inbox</span>
          </td>
          <td align="right">
            <span style="color: #aac4ff; font-size: 11px;">msn messenger active</span>
          </td>
        </tr>
      </table>
    </div>

    <div style="padding: 25px;">
      <div style="margin-bottom: 20px;">
        <h2 style="margin: 0; color: #1b3f7e; font-size: 18px;">Olá, ${nickname}!</h2>
        <p style="font-size: 13px; margin-top: 10px; color: #555;">Sua máquina do tempo está pronta. Bem-vinde à Like 2000!</p>
      </div>

      <!-- Grid de Dicas -->
      <table width="100%" cellspacing="0" cellpadding="10" style="background-color: #f0f6ff; border: 1px solid #dce9f7; margin-bottom: 25px;">
        <tr>
          <td width="33%" align="center" style="border-right: 1px solid #dce9f7;">
            <div style="font-weight: bold; color: #2563c8; font-size: 12px;">MSN</div>
            <div style="font-size: 10px; color: #666;">Chat em tempo real</div>
          </td>
          <td width="33%" align="center" style="border-right: 1px solid #dce9f7;">
            <div style="font-weight: bold; color: #2563c8; font-size: 12px;">FOTOLOG</div>
            <div style="font-size: 10px; color: #666;">Sua foto diária</div>
          </td>
          <td width="33%" align="center">
            <div style="font-weight: bold; color: #2563c8; font-size: 12px;">ORKUT</div>
            <div style="font-size: 10px; color: #666;">Perfil Público</div>
          </td>
        </tr>
      </table>

      <!-- Link Rastreável -->
      <div style="background-color: #fffdf5; border: 1px dashed #ffaa66; padding: 15px; border-radius: 4px; text-align: center; margin-bottom: 25px;">
        <div style="font-size: 12px; font-weight: bold; color: #cc4400; margin-bottom: 8px;">🚀 Ganhe +100 XP por amigo indicado!</div>
        <div style="background: #f0f0e8; padding: 8px; border: 1px solid #ccc; font-family: monospace; font-size: 11px; word-break: break-all; color: #333;">
          https://like2000.com.br?utm_source=email&utm_medium=welcome&utm_campaign=${referral_code}
        </div>
        <div style="margin-top: 10px;">
          <span style="font-size: 10px; color: #888;">Compartilhe seu link exclusivo e suba no ranking da temporada.</span>
        </div>
      </div>

      <!-- Botão CTA -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://like2000.com.br" style="background: linear-gradient(to bottom, #5aad5a 0%, #3a8c3a 100%); color: white; padding: 12px 30px; text-decoration: none; font-weight: bold; font-size: 14px; border-radius: 3px; border: 1px solid #2d8f2d; box-shadow: 0px 2px 4px rgba(0,0,0,0.2); display: inline-block;">
          Acessar a Like 2000
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f0f6ff; padding: 15px; text-align: center; border-top: 1px solid #dce9f7; font-size: 10px; color: #999;">
      © 2026 Like 2000 · Bad Idea<br>
      <a href="#" style="color: #999; text-decoration: underline;">cancelar inscrição</a>
    </div>
  </div>
</div>
`;

    const emailPayload = {
      sender: {
        name: "Like 2000",
        email: "timemachine@like2000.com.br"
      },
      to: [{ email: email }],
      subject: "Bem-vinde à LIKE 2000! 🕹️",
      htmlContent: htmlTemplate
    };

    console.log(`4. Chamando Brevo para: ${email}`);
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": brevoKey,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(emailPayload)
    });

    const result = await response.json();
    console.log("5. Resposta final do Brevo:", JSON.stringify(result));

    if (!response.ok) {
      console.error("Erro na API do Brevo:", result);
      return new Response(JSON.stringify({ error: "Erro ao enviar e-mail via Brevo", details: result }), { 
        status: response.status,
        headers: { "Content-Type": "application/json" } 
      });
    }

    return new Response(JSON.stringify({ success: true, messageId: result.messageId }), { 
      status: 200,
      headers: { "Content-Type": "application/json" } 
    });

  } catch (err) {
    console.error("Erro na Edge Function send-welcome-email:", err);
    const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500,
      headers: { "Content-Type": "application/json" } 
    });
  }
});