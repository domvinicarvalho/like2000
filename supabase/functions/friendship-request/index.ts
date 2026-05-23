import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const XP_FRIENDSHIP = 10;

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://like2000.vercel.app',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return new Response("Unauthorized", { status: 401, headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser(
    authHeader.replace("Bearer ", "")
  );
  if (authError || !user) return new Response("Unauthorized", { status: 401, headers: corsHeaders });

  const { target_user_id, action } = await req.json();
  if (!target_user_id || !action) {
    return new Response("target_user_id e action são obrigatórios", { status: 400, headers: corsHeaders });
  }
  if (target_user_id === user.id) {
    return new Response("Não pode adicionar a si mesmo", { status: 400, headers: corsHeaders });
  }

  if (action === "send") {
    const { error } = await supabase
      .from("friendships")
      .insert({ user_id: user.id, friend_id: target_user_id, status: "pending" });

    if (error) {
      if (error.code === "23505") {
        return new Response(
          JSON.stringify({ error: "Solicitação já existe" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (action === "accept") {
    const { data: friendship, error: fetchError } = await supabase
      .from("friendships")
      .select("id, xp_awarded")
      .eq("user_id", target_user_id)
      .eq("friend_id", user.id)
      .eq("status", "pending")
      .single();

    if (fetchError || !friendship) {
      return new Response(
        JSON.stringify({ error: "Solicitação não encontrada" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await supabase
      .from("friendships")
      .update({ status: "accepted", updated_at: new Date().toISOString() })
      .eq("id", friendship.id);

    if (!friendship.xp_awarded) {
      await supabase
        .from("friendships")
        .update({ xp_awarded: true })
        .eq("id", friendship.id);

      await supabase.rpc("increment_xp", {
        p_user_id: user.id,
        p_amount: XP_FRIENDSHIP,
        p_reason: "friendship_accepted",
      });
      await supabase.rpc("increment_xp", {
        p_user_id: target_user_id,
        p_amount: XP_FRIENDSHIP,
        p_reason: "friendship_accepted",
      });
    }

    return new Response(
      JSON.stringify({ success: true, xp_earned: friendship.xp_awarded ? 0 : XP_FRIENDSHIP }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (action === "remove") {
    await supabase
      .from("friendships")
      .update({ status: "removed", updated_at: new Date().toISOString() })
      .or(`and(user_id.eq.${user.id},friend_id.eq.${target_user_id}),and(user_id.eq.${target_user_id},friend_id.eq.${user.id})`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response("action inválida", { status: 400, headers: corsHeaders });
});
