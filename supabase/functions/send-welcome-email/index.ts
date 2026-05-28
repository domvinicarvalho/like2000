const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // Validação de Segurança: Garante que apenas o sistema (via service_role) dispare o e-mail
    const authHeader = req.headers.get("Authorization");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!authHeader || !authHeader.includes(serviceRoleKey!)) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), { 
        status: 401, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    if (!BREVO_API_KEY) {
      return new Response(JSON.stringify({ error: "Configuração BREVO_API_KEY ausente" }), { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const payload = await req.json();
    
    // O payload do webhook do Supabase contém os dados do novo usuário no campo 'record'
    const { record } = payload;
    const email = record?.email;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email não encontrado no registro" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const emailPayload = {
      sender: {
        name: "Like 2000",
        email: "timemachine@like2000.com.br"
      },
      to: [{ email: email }],
      subject: "Bem-vinde à LIKE 2000! 🕹️",
      textContent: `Viagem no tempo concluída. Bem-vinde à Like 2000!

Sua conta está pronta. Acesse agora e reviva os anos 2000:
https://like2000.com.br

— Equipe Like 2000`
    };

    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(emailPayload)
    });

    const result = await response.json();

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