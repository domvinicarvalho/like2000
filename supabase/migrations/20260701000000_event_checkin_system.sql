-- Migration: Sistema de check-in por QR Code para eventos
-- Aditivo: não remove nem altera colunas existentes

-- 1. Adiciona colunas de horário aos eventos (para validar janela de check-in)
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS start_time TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS end_time   TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS qr_checkin_active BOOLEAN NOT NULL DEFAULT TRUE;

-- 2. Cria tabela event_checkins para registrar check-ins por evento por usuário
-- Único registro por par (event_id, user_id) → antifarm natural via UNIQUE
CREATE TABLE IF NOT EXISTS event_checkins (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  xp_earned INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- 3. Index para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_event_checkins_event ON event_checkins(event_id);
CREATE INDEX IF NOT EXISTS idx_event_checkins_user   ON event_checkins(user_id);

-- 4. RLS
ALTER TABLE event_checkins ENABLE ROW LEVEL SECURITY;

-- Permite leitura para todos (para UI verificar status)
CREATE POLICY "Anyone can view event checkins" ON event_checkins
  FOR SELECT USING (true);

-- Permite inserção para todos (anon key consegue inserir via Edge Function)
CREATE POLICY "Anyone can insert event checkins" ON event_checkins
  FOR INSERT WITH CHECK (true);

-- 5. Nova tabela para registrar XP ganho via check-in (se quiser tracking separado)
-- Mas como já usamos xp_transactions + increment_xp, não precisamos de outra.
-- O próprio event_checkins já serve como antifarm.