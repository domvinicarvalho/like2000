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

  // Buscar evento
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, name, qr_checkin_active, start_time")
    .eq("id", event_id)
    .single();

  if (eventError || !event) {
    return new Response(JSON.stringify({ error: "Evento não encontrado" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Verificar se check-in via QR está ativo para este evento
  if (!event.qr_checkin_active) {
    return new Response(
      JSON.stringify({ error: "Check-in por QR não está ativo para este evento" }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Validar janela de validade: desde a geração do QR (start_time) até 24h após start_time
  const now = new Date();

  if (event.start_time) {
    const windowEnd = new Date(new Date(event.start_time).getTime() + 24 * 60 * 60 * 1000);
    if (now > windowEnd) {
      return new Response(
        JSON.stringify({ error: "O período de check-in para este evento expirou (24h após o início)" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  // Verificar antifarm: único check-in por usuário por evento
  const { data: existingCheckin } = await supabase
    .from("event_checkins")
    .select("id")
    .eq("event_id", event_id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingCheckin) {
    return new Response(
      JSON.stringify({ error: "Você já fez check-in neste evento!", already_checked: true }),
      { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Inserir check-in
  const { error: checkinError } = await supabase
    .from("event_checkins")
    .insert({ event_id: event.id, user_id: user.id, xp_earned: XP_CHECKIN });

  if (checkinError) {
    if (checkinError.code === "23505") {
      return new Response(
        JSON.stringify({ error: "Check-in já realizado para este evento", already_checked: true }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ error: checkinError.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Creditar XP via RPC increment_xp
  const { error: xpError } = await supabase.rpc("increment_xp", {
    p_user_id: user.id,
    p_amount: XP_CHECKIN,
    p_reason: `event_checkin_${event.id}`,
  });

  if (xpError) {
    console.error("Erro ao creditar XP:", xpError.message);
  }

  return new Response(
    JSON.stringify({
      success: true,
      xp_earned: XP_CHECKIN,
      event_name: event.name,
      message: `+${XP_CHECKIN} XP por check-in no evento!`,
    }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});