import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const XP_CHECKIN = 100;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Authenticate the user
  const { data: { user }, error: authError } = await supabase.auth.getUser(
    authHeader.replace("Bearer ", "")
  );
  if (authError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { event_id } = await req.json();
  if (!event_id) {
    return new Response(JSON.stringify({ error: "event_id é obrigatório" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Usa RPC process_checkin para evitar schema cache do PostgREST
  // A função SQL faz toda a lógica no banco: valida evento, janela, antifarm, credita XP
  const { data: result, error: rpcError } = await supabase.rpc("process_checkin", {
    p_event_id: event_id,
    p_user_id: user.id,
    p_xp_amount: XP_CHECKIN,
  });

  if (rpcError) {
    console.error("[checkin] RPC error:", rpcError);
    return new Response(JSON.stringify({ error: rpcError.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // result é um JSONB retornado pela função SQL
  if (result && result.error) {
    // Erros de negócio: evento não encontrado, já checkin, expirado, etc.
    if (result.already_checked) {
      return new Response(
        JSON.stringify({ error: result.error, already_checked: true }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Erros 403 (checkin inativo, janela expirada) ou 404
    const status = result.error.includes("expirou") || result.error.includes("não está ativo")
      ? 403
      : result.error.includes("não encontrado")
        ? 404
        : 400;

    return new Response(
      JSON.stringify({ error: result.error }),
      { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Sucesso
  return new Response(
    JSON.stringify({
      success: true,
      xp_earned: result.xp_earned || XP_CHECKIN,
      event_name: result.event_name || "",
      message: result.message || `+${XP_CHECKIN} XP por check-in no evento!`,
    }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});