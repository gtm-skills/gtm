-- GTM Skills Leaderboard Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leaderboard prompts table
CREATE TABLE IF NOT EXISTS leaderboard_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  author_id UUID,
  author_name VARCHAR(255),
  author_email VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Metrics
  copy_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  effectiveness_score DECIMAL(5,2) DEFAULT 0,

  -- Computed
  hot_score DECIMAL(10,4) DEFAULT 0,

  -- Metadata
  variables TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  use_cases TEXT[] DEFAULT '{}'
);

-- Votes table
CREATE TABLE IF NOT EXISTS prompt_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID REFERENCES leaderboard_prompts(id) ON DELETE CASCADE,
  user_id UUID,
  voter_fingerprint VARCHAR(255), -- For anonymous voting
  vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(prompt_id, voter_fingerprint)
);

-- Copies/Usage tracking
CREATE TABLE IF NOT EXISTS prompt_copies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID REFERENCES leaderboard_prompts(id) ON DELETE CASCADE,
  user_id UUID,
  source VARCHAR(100), -- 'website', 'extension', 'api', 'hubspot'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Outcome tracking (for effectiveness score)
CREATE TABLE IF NOT EXISTS prompt_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID REFERENCES leaderboard_prompts(id) ON DELETE CASCADE,
  user_id UUID,
  user_email VARCHAR(255),
  outcome_type VARCHAR(100) NOT NULL, -- 'meeting_booked', 'reply_received', 'deal_won'
  outcome_value DECIMAL(15,2), -- dollar value if applicable
  testimonial TEXT,
  is_public BOOLEAN DEFAULT false,
  verification_status VARCHAR(50) DEFAULT 'self_reported', -- self_reported, screenshot, crm_verified
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leaderboard_prompts_status ON leaderboard_prompts(status);
CREATE INDEX IF NOT EXISTS idx_leaderboard_prompts_category ON leaderboard_prompts(category);
CREATE INDEX IF NOT EXISTS idx_leaderboard_prompts_hot_score ON leaderboard_prompts(hot_score DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_prompts_upvotes ON leaderboard_prompts(upvotes DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_prompts_copy_count ON leaderboard_prompts(copy_count DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_prompts_created_at ON leaderboard_prompts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_prompt_votes_prompt ON prompt_votes(prompt_id);
CREATE INDEX IF NOT EXISTS idx_prompt_copies_prompt ON prompt_copies(prompt_id);
CREATE INDEX IF NOT EXISTS idx_prompt_outcomes_prompt ON prompt_outcomes(prompt_id);

-- Hot score calculation function (Reddit-style)
CREATE OR REPLACE FUNCTION calculate_hot_score(
  p_upvotes INTEGER,
  p_downvotes INTEGER,
  p_copy_count INTEGER,
  p_created_at TIMESTAMP WITH TIME ZONE
) RETURNS DECIMAL AS $$
DECLARE
  score DECIMAL;
  order_val DECIMAL;
  sign_val INTEGER;
  seconds DECIMAL;
BEGIN
  -- Score based on votes and copies
  score := p_upvotes - p_downvotes + (p_copy_count * 0.5);

  -- Logarithmic scaling
  order_val := LOG(GREATEST(ABS(score), 1));

  -- Sign of the score
  sign_val := SIGN(score);

  -- Seconds since epoch (Jan 1, 2024)
  seconds := EXTRACT(EPOCH FROM p_created_at) - 1704067200;

  -- Final hot score (newer items get boost)
  RETURN ROUND(sign_val * order_val + seconds / 45000, 7);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger to update hot_score on vote changes
CREATE OR REPLACE FUNCTION update_prompt_hot_score()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE leaderboard_prompts
  SET
    hot_score = calculate_hot_score(upvotes, downvotes, copy_count, created_at),
    updated_at = NOW()
  WHERE id = COALESCE(NEW.prompt_id, OLD.prompt_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for votes
DROP TRIGGER IF EXISTS trigger_update_hot_score_on_vote ON prompt_votes;
CREATE TRIGGER trigger_update_hot_score_on_vote
  AFTER INSERT OR DELETE ON prompt_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_prompt_hot_score();

-- Trigger to update vote counts
CREATE OR REPLACE FUNCTION update_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'up' THEN
      UPDATE leaderboard_prompts SET upvotes = upvotes + 1 WHERE id = NEW.prompt_id;
    ELSE
      UPDATE leaderboard_prompts SET downvotes = downvotes + 1 WHERE id = NEW.prompt_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'up' THEN
      UPDATE leaderboard_prompts SET upvotes = upvotes - 1 WHERE id = OLD.prompt_id;
    ELSE
      UPDATE leaderboard_prompts SET downvotes = downvotes - 1 WHERE id = OLD.prompt_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_vote_counts ON prompt_votes;
CREATE TRIGGER trigger_update_vote_counts
  AFTER INSERT OR DELETE ON prompt_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_vote_counts();

-- Trigger to update copy counts
CREATE OR REPLACE FUNCTION update_copy_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE leaderboard_prompts
  SET
    copy_count = copy_count + 1,
    hot_score = calculate_hot_score(upvotes, downvotes, copy_count + 1, created_at)
  WHERE id = NEW.prompt_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_copy_count ON prompt_copies;
CREATE TRIGGER trigger_update_copy_count
  AFTER INSERT ON prompt_copies
  FOR EACH ROW
  EXECUTE FUNCTION update_copy_count();

-- Row Level Security (RLS)
ALTER TABLE leaderboard_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_copies ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_outcomes ENABLE ROW LEVEL SECURITY;

-- Policies: Anyone can read approved prompts
CREATE POLICY "Anyone can view approved prompts"
  ON leaderboard_prompts FOR SELECT
  USING (status = 'approved');

-- Policies: Anyone can insert prompts (goes to moderation)
CREATE POLICY "Anyone can submit prompts"
  ON leaderboard_prompts FOR INSERT
  WITH CHECK (true);

-- Policies: Anyone can vote
CREATE POLICY "Anyone can vote"
  ON prompt_votes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view votes"
  ON prompt_votes FOR SELECT
  USING (true);

-- Policies: Anyone can track copies
CREATE POLICY "Anyone can track copies"
  ON prompt_copies FOR INSERT
  WITH CHECK (true);

-- Policies: Anyone can submit outcomes
CREATE POLICY "Anyone can submit outcomes"
  ON prompt_outcomes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view public outcomes"
  ON prompt_outcomes FOR SELECT
  USING (is_public = true);

-- Comments
COMMENT ON TABLE leaderboard_prompts IS 'User-submitted prompts for the leaderboard';
COMMENT ON TABLE prompt_votes IS 'Upvotes and downvotes on prompts';
COMMENT ON TABLE prompt_copies IS 'Tracks when prompts are copied';
COMMENT ON TABLE prompt_outcomes IS 'User-reported outcomes from using prompts';
