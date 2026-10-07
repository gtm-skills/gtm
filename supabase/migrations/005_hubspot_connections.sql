-- HubSpot Connections Table
-- Stores OAuth tokens for connected HubSpot portals

CREATE TABLE IF NOT EXISTS hubspot_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  portal_id BIGINT UNIQUE NOT NULL,
  user_id BIGINT,
  portal_name TEXT,
  user_email TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_hubspot_portal_id ON hubspot_connections(portal_id);
CREATE INDEX IF NOT EXISTS idx_hubspot_active ON hubspot_connections(is_active) WHERE is_active = true;

-- Row Level Security
ALTER TABLE hubspot_connections ENABLE ROW LEVEL SECURITY;

-- Only allow service role to access tokens (for security)
CREATE POLICY "Service role only" ON hubspot_connections
  FOR ALL
  USING (auth.role() = 'service_role');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_hubspot_connections_updated_at
  BEFORE UPDATE ON hubspot_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE hubspot_connections IS 'Stores HubSpot OAuth tokens for connected portals';
COMMENT ON COLUMN hubspot_connections.portal_id IS 'HubSpot portal/hub ID';
COMMENT ON COLUMN hubspot_connections.access_token IS 'OAuth access token (encrypted in production)';
COMMENT ON COLUMN hubspot_connections.refresh_token IS 'OAuth refresh token for getting new access tokens';
COMMENT ON COLUMN hubspot_connections.expires_at IS 'When the access token expires';
