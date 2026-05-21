import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { name, event_date } = await req.json();

  const { data: event, error } = await supabase
    .from("events")
    .insert({ name, event_date })
    .select("id, qr_token")
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const checkinUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/checkin-event?token=${event.qr_token}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(checkinUrl)}`;

  return new Response(
    JSON.stringify({
      event_id: event.id,
      qr_token: event.qr_token,
      checkin_url: checkinUrl,
      qr_image_url: qrImageUrl,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
