import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const XP_SHARE = 50;
const XP_TASK_DEFAULT = 50;

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

  const now = new Date();
  const cutoff = new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString();

  try {
    const results = { shares: 0, tasks: 0 };

    // 1. Processar Compartilhamentos de Eventos (share_claims)
    // Pega os aprovados manualmente OU os pendentes com mais de 18h
    const { data: shareClaims, error: shareError } = await supabase
      .from("share_claims")
      .select("id, user_id, event_id")
      .or(`status.eq.approved,and(status.eq.pending,created_at.lt.${cutoff})`);

    if (shareError) throw shareError;

    for (const claim of shareClaims || []) {
      const { error: xpError } = await supabase.rpc("increment_xp", {
        p_user_id: claim.user_id,
        p_amount: XP_SHARE,
        p_reason: `share_event_${claim.event_id}`,
      });
      if (!xpError) {
        await supabase.from("share_claims").update({ status: "credited" }).eq("id", claim.id);
        results.shares++;
      }
    }

    // 2. Processar Tarefas Diárias (task_claims)
    // Pega os aprovados manualmente OU os pendentes com mais de 18h
    const { data: taskClaims, error: taskError } = await supabase
      .from("task_claims")
      .select(`
        id, 
        user_id, 
        task_id,
        daily_tasks ( xp_reward )
      `)
      .or(`status.eq.approved,and(status.eq.pending,created_at.lt.${cutoff})`);

    if (taskError) throw taskError;

    for (const claim of taskClaims || []) {
      const xpAmount = claim.daily_tasks?.xp_reward || XP_TASK_DEFAULT;
      const { error: xpError } = await supabase.rpc("increment_xp", {
        p_user_id: claim.user_id,
        p_amount: xpAmount,
        p_reason: `task_credit_${claim.task_id}`,
      });
      if (!xpError) {
        await supabase.from("task_claims").update({ status: "credited" }).eq("id", claim.id);
        results.tasks++;
      }
    }

    return new Response(JSON.stringify({ success: true, processed: results }), {
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