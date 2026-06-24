-- Migration: Create xp_transactions table to track XP changes over time
-- This enables seasonal ranking by filtering XP earned since the season start date.

CREATE TABLE IF NOT EXISTS xp_transactions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast seasonal queries
CREATE INDEX IF NOT EXISTS idx_xp_transactions_user_date ON xp_transactions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_xp_transactions_date ON xp_transactions(created_at);

-- Enable RLS
ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read
CREATE POLICY "Anyone can view XP transactions" ON xp_transactions
  FOR SELECT USING (true);

-- Allow the anon key (admin panel) to insert
CREATE POLICY "Anyone can insert XP transactions" ON xp_transactions
  FOR INSERT WITH CHECK (true);