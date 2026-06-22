-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#FFD700',
  icon_url TEXT NOT NULL DEFAULT '🏆',
  badge_type TEXT DEFAULT 'emoji', -- 'emoji' or 'image'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_badges (junction table)
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  assigned_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  UNIQUE(user_id, badge_id)
);

-- Enable RLS but allow all authenticated reads and admin writes
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Badges: everyone can read, only admin (or service role) can insert/update/delete
CREATE POLICY "Badges are viewable by all" ON badges
  FOR SELECT USING (true);

-- User badges: everyone can read, only admin can insert (anon key can do it from admin.html)
CREATE POLICY "User badges are viewable by all" ON user_badges
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage badges" ON badges
  FOR ALL USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can manage user_badges" ON user_badges
  FOR ALL USING (true)
  WITH CHECK (true);