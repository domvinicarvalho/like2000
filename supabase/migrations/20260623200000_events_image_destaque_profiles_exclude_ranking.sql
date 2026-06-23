-- Add image_url and destaque columns to events table
ALTER TABLE events 
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS destaque BOOLEAN NOT NULL DEFAULT FALSE;

-- Add exclude_from_season_ranking column to profiles table
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS exclude_from_season_ranking BOOLEAN NOT NULL DEFAULT FALSE;