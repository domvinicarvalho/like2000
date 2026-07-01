-- Migration: Função process_checkin para fazer check-in via RPC (evita schema cache do PostgREST)
-- Totalmente aditiva e idempotente

CREATE OR REPLACE FUNCTION process_checkin(
  p_event_id UUID,
  p_user_id UUID,
  p_xp_amount INTEGER DEFAULT 100
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_event RECORD;
  v_exists BIGINT;
  v_now TIMESTAMPTZ := now();
  v_window_end TIMESTAMPTZ;
BEGIN
  -- Buscar evento
  SELECT id, name, qr_checkin_active, start_time
  INTO v_event
  FROM events
  WHERE id = p_event_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Evento não encontrado');
  END IF;

  -- Verificar se check-in via QR está ativo
  IF NOT v_event.qr_checkin_active THEN
    RETURN jsonb_build_object('error', 'Check-in por QR não está ativo para este evento');
  END IF;

  -- Validar janela de validade (start_time + 24h)
  IF v_event.start_time IS NOT NULL THEN
    v_window_end := v_event.start_time + INTERVAL '24 hours';
    IF v_now > v_window_end THEN
      RETURN jsonb_build_object('error', 'O período de check-in para este evento expirou (24h após o início)');
    END IF;
  END IF;

  -- Verificar antifarm
  SELECT COUNT(*) INTO v_exists
  FROM event_checkins
  WHERE event_id = p_event_id AND user_id = p_user_id;

  IF v_exists > 0 THEN
    RETURN jsonb_build_object('error', 'Você já fez check-in neste evento!', 'already_checked', true);
  END IF;

  -- Inserir check-in
  INSERT INTO event_checkins (event_id, user_id, xp_earned)
  VALUES (p_event_id, p_user_id, p_xp_amount);

  -- Creditar XP
  UPDATE profiles SET xp = COALESCE(xp, 0) + p_xp_amount WHERE id = p_user_id;
  INSERT INTO xp_transactions (user_id, amount, reason)
  VALUES (p_user_id, p_xp_amount, 'event_checkin_' || p_event_id);

  RETURN jsonb_build_object(
    'success', true,
    'xp_earned', p_xp_amount,
    'event_name', v_event.name,
    'message', '+' || p_xp_amount || ' XP por check-in no evento!'
  );
END;
$$;