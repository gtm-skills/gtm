-- GTM Skills Contributor System Schema
-- Week 7: Revenue sharing, attribution, contributor profiles

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
  total_revenue_influenced DECIMAL(12,2) DEFAULT 0,

  -- Earnings
  total_earnings DECIMAL(10,2) DEFAULT 0,
  pending_payout DECIMAL(10,2) DEFAULT 0,
  lifetime_payouts DECIMAL(10,2) DEFAULT 0,

  -- Revenue share settings
  revenue_share_percent DECIMAL(4,2) DEFAULT 10.00, -- 10% default
  payout_threshold DECIMAL(10,2) DEFAULT 50.00, -- Min $50 to request payout
  payout_method TEXT, -- paypal, stripe, bank
  payout_details JSONB, -- Encrypted payout info

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

-- Contributor earnings ledger
CREATE TABLE IF NOT EXISTS contributor_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  contributor_id UUID NOT NULL REFERENCES contributors(id) ON DELETE CASCADE,

  -- Source of earning
  attribution_id UUID REFERENCES attributions(id) ON DELETE SET NULL,
  prompt_id UUID REFERENCES leaderboard_prompts(id) ON DELETE SET NULL,
  outcome_id UUID REFERENCES prompt_outcomes(id) ON DELETE SET NULL,

  -- Earning details
  earning_type TEXT NOT NULL CHECK (earning_type IN (
    'outcome_share', -- % of reported outcome value
    'referral_bonus', -- Bonus for referring new contributors
    'featured_bonus', -- Bonus for featured prompts
    'manual_adjustment' -- Admin adjustments
  )),

  gross_amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) DEFAULT 0,
  net_amount DECIMAL(10,2) NOT NULL,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'reversed')),

  -- Notes
  description TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ
);

-- Payouts table
CREATE TABLE IF NOT EXISTS contributor_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  contributor_id UUID NOT NULL REFERENCES contributors(id) ON DELETE CASCADE,

  -- Payout details
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payout_method TEXT NOT NULL,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'processing', 'completed', 'failed', 'cancelled'
  )),

  -- External reference
  external_id TEXT, -- PayPal/Stripe transaction ID

  -- Notes
  notes TEXT,
  failure_reason TEXT,

  -- Timestamps
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
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

CREATE INDEX IF NOT EXISTS idx_earnings_contributor ON contributor_earnings(contributor_id);
CREATE INDEX IF NOT EXISTS idx_earnings_status ON contributor_earnings(status);

CREATE INDEX IF NOT EXISTS idx_payouts_contributor ON contributor_payouts(contributor_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON contributor_payouts(status);

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

-- Function to calculate earnings from outcomes
CREATE OR REPLACE FUNCTION calculate_outcome_earning()
RETURNS TRIGGER AS $$
DECLARE
  v_contributor_id UUID;
  v_share_percent DECIMAL;
  v_gross_amount DECIMAL;
  v_net_amount DECIMAL;
BEGIN
  -- Only process if outcome has a value
  IF NEW.outcome_value IS NULL OR NEW.outcome_value <= 0 THEN
    RETURN NEW;
  END IF;

  -- Get contributor for this prompt
  SELECT lp.contributor_id INTO v_contributor_id
  FROM leaderboard_prompts lp
  WHERE lp.id = NEW.prompt_id;

  IF v_contributor_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Get contributor's revenue share percentage
  SELECT revenue_share_percent INTO v_share_percent
  FROM contributors
  WHERE id = v_contributor_id;

  -- Calculate earnings (default 10% of outcome value, capped at $1000 per outcome)
  v_gross_amount := LEAST(NEW.outcome_value * (COALESCE(v_share_percent, 10) / 100), 1000);
  v_net_amount := v_gross_amount; -- No platform fee for now

  -- Insert earning record
  INSERT INTO contributor_earnings (
    contributor_id,
    prompt_id,
    outcome_id,
    earning_type,
    gross_amount,
    net_amount,
    status,
    description
  ) VALUES (
    v_contributor_id,
    NEW.prompt_id,
    NEW.id,
    'outcome_share',
    v_gross_amount,
    v_net_amount,
    'pending',
    'Revenue share from outcome: ' || NEW.outcome_type
  );

  -- Update contributor pending payout
  UPDATE contributors SET
    pending_payout = pending_payout + v_net_amount,
    total_revenue_influenced = total_revenue_influenced + NEW.outcome_value,
    updated_at = NOW()
  WHERE id = v_contributor_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for outcome earnings
DROP TRIGGER IF EXISTS trigger_calculate_outcome_earning ON prompt_outcomes;
CREATE TRIGGER trigger_calculate_outcome_earning
AFTER INSERT ON prompt_outcomes
FOR EACH ROW
EXECUTE FUNCTION calculate_outcome_earning();
