-- Add XP per referral and badge association to events table
ALTER TABLE events 
  ADD COLUMN IF NOT EXISTS xp_referral INTEGER NOT NULL DEFAULT 200,
  ADD COLUMN IF NOT EXISTS badge_id UUID REFERENCES badges(id) ON DELETE SET NULL;