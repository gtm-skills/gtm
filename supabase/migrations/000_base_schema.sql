-- GTM Skills - Supabase Schema
-- Run this in your Supabase SQL Editor

-- Subscribers table for email newsletter
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Index for analytics by source
CREATE INDEX IF NOT EXISTS idx_subscribers_source ON subscribers(source);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Allow insert from API (service role)
CREATE POLICY "Allow service role insert" ON subscribers
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Allow service role select
CREATE POLICY "Allow service role select" ON subscribers
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Allow service role update
CREATE POLICY "Allow service role update" ON subscribers
  FOR UPDATE
  TO service_role
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
DROP TRIGGER IF EXISTS subscribers_updated_at ON subscribers;
CREATE TRIGGER subscribers_updated_at
  BEFORE UPDATE ON subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Optional: Download tracking table
CREATE TABLE IF NOT EXISTS downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  resource TEXT NOT NULL,
  downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for downloads
CREATE INDEX IF NOT EXISTS idx_downloads_resource ON downloads(resource);
