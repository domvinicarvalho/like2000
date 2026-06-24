-- Migration: Create seasons table and season_snapshots table for season management
-- This ensures the seasons infrastructure is properly defined.

-- 1. Create seasons table if not exists
CREATE TABLE IF NOT EXISTS seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create season_snapshots table if not exists (for ranking snapshots)
CREATE TABLE IF NOT EXISTS season_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id UUID NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  color TEXT,
  avatar_url TEXT,
  xp INTEGER NOT NULL DEFAULT 0,
  level TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Enable RLS
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE season_snapshots ENABLE ROW LEVEL SECURITY;

-- 4. RLS policies - allow all authenticated reads, admin writes
CREATE POLICY "Seasons are viewable by all" ON seasons
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage seasons" ON seasons
  FOR ALL USING (true)
  WITH CHECK (true);

CREATE POLICY "Season snapshots are viewable by all" ON season_snapshots
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage season snapshots" ON season_snapshots
  FOR ALL USING (true)
  WITH CHECK (true);

-- 5. Create indexes
CREATE INDEX IF NOT EXISTS idx_seasons_status ON seasons(status);
CREATE INDEX IF NOT EXISTS idx_season_snapshots_season_id ON season_snapshots(season_id);
CREATE INDEX IF NOT EXISTS idx_season_snapshots_xp ON season_snapshots(season_id, xp DESC);