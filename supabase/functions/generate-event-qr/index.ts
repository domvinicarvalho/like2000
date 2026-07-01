import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser(
    authHeader.replace("Bearer ", "")
  );
  if (authError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { event_id } = await req.json();
  if (!event_id) {
    return new Response(JSON.stringify({ error: "event_id é obrigatório" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Buscar o evento para obter o nome
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, name")
    .eq("id", event_id)
    .single();

  if (eventError || !event) {
    return new Response(JSON.stringify({ error: "Evento não encontrado" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // URL base do projeto para o check-in
  const projectUrl = Deno.env.get("SUPABASE_URL") || "";
  const siteBaseUrl = projectUrl.replace(/\/$/, "");

  // Gera a URL de check-in para este evento
  // Será something like: https://XXXXX.supabase.co/functions/v1/checkin-page?evento=EVENT_ID
  const checkinUrl = `${siteBaseUrl}/functions/v1/checkin-page?evento=${event.id}`;

  // URL para gerar QR Code via API pública (goqr.me — sem necessidade de chave)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(checkinUrl)}`;

  return new Response(
    JSON.stringify({
      event_id: event.id,
      event_name: event.name,
      checkin_url: checkinUrl,
      qr_image_url: qrImageUrl,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});