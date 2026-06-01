import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const XP_SHARE = 50;

Deno.serve(async (req) => {
  // Validação de Segurança: Garante que apenas o sistema (via cron/service_role) dispare o crédito
  const authHeader = req.headers.get("Authorization");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!authHeader || !authHeader.includes(serviceRoleKey!)) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), { 
      status: 401, 
      headers: { "Content-Type": "application/json" } 
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    serviceRoleKey!
  );

  try {
    // 1. Busca claims que foram aprovados manualmente mas ainda não receberam XP
    const { data: claims, error: fetchError } = await supabase
      .from("share_claims")
      .select("id, user_id, event_id")
      .eq("status", "approved");

    if (fetchError) throw fetchError;

    const processed = [];

    for (const claim of claims) {
      // 2. Incrementa o XP do usuário via RPC (função do banco que já usamos)
      const { error: xpError } = await supabase.rpc("increment_xp", {
        p_user_id: claim.user_id,
        p_amount: XP_SHARE,
        p_reason: `share_event_${claim.event_id}`,
      });

      if (!xpError) {
        // 3. Marca como creditado para não processar de novo no próximo ciclo do cron
        await supabase
          .from("share_claims")
          .update({ status: "credited" })
          .eq("id", claim.id);
        
        processed.push(claim.id);
      }
    }

    return new Response(JSON.stringify({ success: true, credited_claims: processed }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
});