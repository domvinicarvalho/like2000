-- Migration: Create reports table and add banned column to profiles
-- This migration creates a dedicated reports table and adds the banned status.

-- 1. Add banned column to profiles (if not already exists)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS banned boolean NOT NULL DEFAULT false;

-- 2. Create reports table
CREATE TABLE IF NOT EXISTS public.reports (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reported_nickname TEXT NOT NULL,
    motivo TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Enable Row Level Security
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- 4. RLS policies for reports
-- Anyone authenticated can insert a report
CREATE POLICY "Anyone can insert reports" ON public.reports
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Only the admin (or authenticated users) can view reports (we'll rely on app-level filtering for now)
CREATE POLICY "Authenticated can view reports" ON public.reports
    FOR SELECT
    TO authenticated
    USING (true);

-- Admin can update report status
CREATE POLICY "Authenticated can update reports" ON public.reports
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_banned ON public.profiles(banned);