import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

  // Buscar o evento para obter o nome e start_time
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, name, start_time")
    .eq("id", event_id)
    .single();

  if (eventError || !event) {
    return new Response(JSON.stringify({ error: "Evento não encontrado" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Ao gerar o QR, se o evento não tiver start_time, define como agora
  if (!event.start_time) {
    await supabase
      .from("events")
      .update({ start_time: new Date().toISOString() })
      .eq("id", event.id);
  }

  // URL base do site (dominio principal)
  const siteUrl = Deno.env.get("SITE_URL") || "https://like2000.com.br";

  // Gera a URL de check-in para este evento — página estática no dominio principal
  const checkinUrl = `${siteUrl}/checkin.html?evento=${event.id}`;

  // URL para gerar QR Code via API pública (api.qrserver.com)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(checkinUrl)}`;

  return new Response(
    JSON.stringify({
      event_id: event.id,
      event_name: event.name,
      checkin_url: checkinUrl,
      qr_image_url: qrImageUrl,
    }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});