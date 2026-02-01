-- GTM Skills Contributor System Schema
-- Week 7: Recognition-based contributor profiles

-- Contributors table
CREATE TABLE IF NOT EXISTS contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- URL-friendly username
  avatar_url TEXT,
  bio TEXT,

  -- Social links
  twitter_handle TEXT,
  linkedin_url TEXT,
  github_handle TEXT,
  website_url TEXT,

  -- Stats (denormalized for performance)
  total_prompts INTEGER DEFAULT 0,
  total_copies INTEGER DEFAULT 0,
  total_outcomes INTEGER DEFAULT 0,
  total_votes INTEGER DEFAULT 0,

  -- Rank & Recognition
  rank INTEGER, -- Leaderboard position
  badge TEXT, -- 'top10', 'top50', 'rising', 'verified'

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'suspended')),
  verified BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attribution tracking
CREATE TABLE IF NOT EXISTS attributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Who gets credit
  contributor_id UUID REFERENCES contributors(id) ON DELETE SET NULL,
  prompt_id UUID REFERENCES leaderboard_prompts(id) ON DELETE SET NULL,

  -- Tracking
  visitor_fingerprint TEXT NOT NULL,
  referrer_url TEXT,
  landing_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  -- What happened
  event_type TEXT NOT NULL CHECK (event_type IN (
    'visit', 'prompt_view', 'prompt_copy', 'outcome_logged', 'signup', 'upgrade'
  )),

  -- Value
  event_value DECIMAL(12,2), -- Dollar value if applicable

  -- Context
  ip_hash TEXT, -- Hashed IP for fraud detection
  user_agent TEXT,
  country_code TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days' -- 30-day cookie window
);


-- Link prompts to contributors
ALTER TABLE leaderboard_prompts
ADD COLUMN IF NOT EXISTS contributor_id UUID REFERENCES contributors(id) ON DELETE SET NULL;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contributors_slug ON contributors(slug);
CREATE INDEX IF NOT EXISTS idx_contributors_status ON contributors(status);
CREATE INDEX IF NOT EXISTS idx_contributors_featured ON contributors(featured) WHERE featured = TRUE;

CREATE INDEX IF NOT EXISTS idx_attributions_contributor ON attributions(contributor_id);
CREATE INDEX IF NOT EXISTS idx_attributions_fingerprint ON attributions(visitor_fingerprint);
CREATE INDEX IF NOT EXISTS idx_attributions_created ON attributions(created_at);
CREATE INDEX IF NOT EXISTS idx_attributions_expires ON attributions(expires_at);


-- Function to update contributor stats
CREATE OR REPLACE FUNCTION update_contributor_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update stats when a prompt is approved
  IF TG_TABLE_NAME = 'leaderboard_prompts' AND NEW.contributor_id IS NOT NULL THEN
    UPDATE contributors SET
      total_prompts = (
        SELECT COUNT(*) FROM leaderboard_prompts
        WHERE contributor_id = NEW.contributor_id AND status = 'approved'
      ),
      updated_at = NOW()
    WHERE id = NEW.contributor_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for prompt stats
DROP TRIGGER IF EXISTS trigger_update_contributor_stats ON leaderboard_prompts;
CREATE TRIGGER trigger_update_contributor_stats
AFTER INSERT OR UPDATE ON leaderboard_prompts
FOR EACH ROW
EXECUTE FUNCTION update_contributor_stats();

-- Function to update contributor stats from outcomes
CREATE OR REPLACE FUNCTION update_contributor_outcome_stats()
RETURNS TRIGGER AS $$
DECLARE
  v_contributor_id UUID;
BEGIN
  -- Get contributor for this prompt
  SELECT lp.contributor_id INTO v_contributor_id
  FROM leaderboard_prompts lp
  WHERE lp.id = NEW.prompt_id;

  IF v_contributor_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Update contributor outcome count
  UPDATE contributors SET
    total_outcomes = total_outcomes + 1,
    updated_at = NOW()
  WHERE id = v_contributor_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for outcome stats
DROP TRIGGER IF EXISTS trigger_update_contributor_outcome_stats ON prompt_outcomes;
CREATE TRIGGER trigger_update_contributor_outcome_stats
AFTER INSERT ON prompt_outcomes
FOR EACH ROW
EXECUTE FUNCTION update_contributor_outcome_stats();
