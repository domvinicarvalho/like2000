-- Add XP per referral, XP per purchase and badge association to events table
ALTER TABLE events 
  ADD COLUMN IF NOT EXISTS xp_referral INTEGER NOT NULL DEFAULT 200,
  ADD COLUMN IF NOT EXISTS xp_purchase INTEGER NOT NULL DEFAULT 200,
  ADD COLUMN IF NOT EXISTS badge_id UUID REFERENCES badges(id) ON DELETE SET NULL;