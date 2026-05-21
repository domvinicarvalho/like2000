import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const XP_CHECKIN = 100;

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return new Response("Unauthorized", { status: 401 });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser(
    authHeader.replace("Bearer ", "")
  );
  if (authError || !user) return new Response("Unauthorized", { status: 401 });

  const { qr_token } = await req.json();
  if (!qr_token) return new Response("qr_token required", { status: 400 });

  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id")
    .eq("qr_token", qr_token)
    .single();

  if (eventError || !event) {
    return new Response(JSON.stringify({ error: "Evento não encontrado" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { error: checkinError } = await supabase
    .from("event_checkins")
    .insert({ event_id: event.id, user_id: user.id });

  if (checkinError) {
    if (checkinError.code === "23505") {
      return new Response(
        JSON.stringify({ error: "Check-in já realizado para este evento" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ error: checkinError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { error: xpError } = await supabase.rpc("increment_xp", {
    p_user_id: user.id,
    p_amount: XP_CHECKIN,
    p_reason: "event_checkin",
  });

  if (xpError) console.error("Erro ao creditar XP:", xpError.message);

  return new Response(
    JSON.stringify({ success: true, xp_earned: XP_CHECKIN }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
