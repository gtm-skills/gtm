-- GTM Skills Newsletter + Certification System Schema
-- Week 8: Newsletter automation, certification program

-- ============================================
-- NEWSLETTER SYSTEM
-- ============================================

-- Enhanced subscribers table (extends existing)
ALTER TABLE subscribers
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS referred_by TEXT REFERENCES subscribers(referral_code),
ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_email_at TIMESTAMPTZ;

-- Newsletter issues
CREATE TABLE IF NOT EXISTS newsletter_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_number INTEGER UNIQUE NOT NULL,

  -- Content
  subject TEXT NOT NULL,
  preview_text TEXT,

  -- Featured content IDs
  prompt_of_week_id UUID REFERENCES leaderboard_prompts(id),
  win_of_week_outcome_id UUID REFERENCES prompt_outcomes(id),
  tool_spotlight TEXT, -- Tool name/slug

  -- Dynamic content (JSON for flexibility)
  top_prompts JSONB, -- Array of prompt summaries
  new_prompts JSONB, -- Array of new prompt summaries
  custom_sections JSONB, -- Additional custom content

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'failed')),

  -- Schedule
  scheduled_for TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,

  -- Stats
  recipients_count INTEGER DEFAULT 0,
  opens_count INTEGER DEFAULT 0,
  clicks_count INTEGER DEFAULT 0,
  unsubscribes_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter send log (for tracking individual sends)
CREATE TABLE IF NOT EXISTS newsletter_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL REFERENCES newsletter_issues(id) ON DELETE CASCADE,
  subscriber_id UUID NOT NULL REFERENCES subscribers(id) ON DELETE CASCADE,

  -- Tracking
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,

  -- Resend tracking
  resend_id TEXT,

  UNIQUE(issue_id, subscriber_id)
);

-- Newsletter archive (public-facing)
CREATE TABLE IF NOT EXISTS newsletter_archive (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID UNIQUE NOT NULL REFERENCES newsletter_issues(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  html_content TEXT NOT NULL,
  published_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CERTIFICATION SYSTEM
-- ============================================

-- Certification levels
CREATE TABLE IF NOT EXISTS certification_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level INTEGER UNIQUE NOT NULL, -- 1, 2, 3
  name TEXT NOT NULL, -- "Practitioner", "Professional", "Expert"
  slug TEXT UNIQUE NOT NULL,
  description TEXT,

  -- Requirements
  modules_required INTEGER NOT NULL,
  assessment_pass_score DECIMAL(5,2) DEFAULT 80.00,
  github_star_required BOOLEAN DEFAULT FALSE,
  prompts_required INTEGER DEFAULT 0,
  votes_required INTEGER DEFAULT 0,

  -- Display
  badge_image_url TEXT,
  badge_color TEXT, -- hex color

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certification modules (lessons)
CREATE TABLE IF NOT EXISTS certification_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level_id UUID NOT NULL REFERENCES certification_levels(id) ON DELETE CASCADE,
  module_number INTEGER NOT NULL,

  -- Content
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,

  -- Content types
  content_type TEXT DEFAULT 'lesson' CHECK (content_type IN ('lesson', 'quiz', 'practical')),
  content JSONB NOT NULL, -- Markdown content, quiz questions, etc.

  -- Duration
  estimated_minutes INTEGER DEFAULT 10,

  -- Resources
  resources JSONB, -- Links, downloads, etc.

  -- Order
  sort_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(level_id, module_number)
);

-- User certifications (enrollment + progress)
CREATE TABLE IF NOT EXISTS user_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL, -- Use email as user identifier (no auth system yet)
  level_id UUID NOT NULL REFERENCES certification_levels(id) ON DELETE CASCADE,

  -- Status
  status TEXT DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'in_progress', 'assessment', 'completed', 'expired')),

  -- Progress
  modules_completed INTEGER DEFAULT 0,
  current_module_id UUID REFERENCES certification_modules(id),

  -- Assessment
  assessment_score DECIMAL(5,2),
  assessment_attempts INTEGER DEFAULT 0,
  assessment_passed_at TIMESTAMPTZ,

  -- Requirements tracking
  github_starred BOOLEAN DEFAULT FALSE,
  github_username TEXT,
  prompts_submitted INTEGER DEFAULT 0,
  votes_received INTEGER DEFAULT 0,

  -- Completion
  completed_at TIMESTAMPTZ,
  certificate_id TEXT UNIQUE, -- For public verification
  certificate_url TEXT,
  credly_badge_id TEXT,

  -- Timestamps
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- Optional expiration

  UNIQUE(user_email, level_id)
);

-- Module progress tracking
CREATE TABLE IF NOT EXISTS user_module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certification_id UUID NOT NULL REFERENCES user_certifications(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES certification_modules(id) ON DELETE CASCADE,

  -- Progress
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percent INTEGER DEFAULT 0,

  -- Quiz/practical results
  quiz_score DECIMAL(5,2),
  quiz_attempts INTEGER DEFAULT 0,
  practical_submitted BOOLEAN DEFAULT FALSE,
  practical_approved BOOLEAN DEFAULT FALSE,

  -- Timestamps
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  UNIQUE(certification_id, module_id)
);

-- ============================================
-- INDEXES
-- ============================================

-- Newsletter indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_issues_status ON newsletter_issues(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_issues_scheduled ON newsletter_issues(scheduled_for) WHERE status = 'scheduled';
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_issue ON newsletter_sends(issue_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_subscriber ON newsletter_sends(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_referral ON subscribers(referral_code);
CREATE INDEX IF NOT EXISTS idx_subscribers_active ON subscribers(email) WHERE unsubscribed_at IS NULL;

-- Certification indexes
CREATE INDEX IF NOT EXISTS idx_cert_modules_level ON certification_modules(level_id);
CREATE INDEX IF NOT EXISTS idx_user_certs_email ON user_certifications(user_email);
CREATE INDEX IF NOT EXISTS idx_user_certs_status ON user_certifications(status);
CREATE INDEX IF NOT EXISTS idx_user_certs_certificate ON user_certifications(certificate_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_cert ON user_module_progress(certification_id);

-- ============================================
-- SEED DATA: Certification Levels
-- ============================================

INSERT INTO certification_levels (level, name, slug, description, modules_required, assessment_pass_score, github_star_required, prompts_required, votes_required, badge_color)
VALUES
  (1, 'GTM Skills Practitioner', 'practitioner', 'Master the fundamentals of agentic sales. Learn to use AI prompts effectively in your GTM workflow.', 5, 80.00, TRUE, 0, 0, '#f59e0b'),
  (2, 'GTM Skills Professional', 'professional', 'Advanced agentic sales techniques. Create and share effective prompts with the community.', 10, 85.00, TRUE, 5, 50, '#8b5cf6'),
  (3, 'GTM Skills Expert', 'expert', 'Industry-recognized expertise. Lead the community and shape best practices.', 0, 0, TRUE, 100, 0, '#10b981')
ON CONFLICT (level) DO NOTHING;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    SELECT EXISTS(SELECT 1 FROM subscribers WHERE referral_code = code) INTO exists_check;
    EXIT WHEN NOT exists_check;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Auto-generate referral code on subscriber insert
CREATE OR REPLACE FUNCTION set_subscriber_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_referral_code ON subscribers;
CREATE TRIGGER trigger_set_referral_code
BEFORE INSERT ON subscribers
FOR EACH ROW
EXECUTE FUNCTION set_subscriber_referral_code();

-- Update referral count when someone is referred
CREATE OR REPLACE FUNCTION update_referral_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE subscribers SET referral_count = referral_count + 1 WHERE referral_code = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_referral_count ON subscribers;
CREATE TRIGGER trigger_update_referral_count
AFTER INSERT ON subscribers
FOR EACH ROW
EXECUTE FUNCTION update_referral_count();

-- Generate certificate ID
CREATE OR REPLACE FUNCTION generate_certificate_id()
RETURNS TEXT AS $$
BEGIN
  RETURN 'GTM-' || TO_CHAR(NOW(), 'YYMM') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
END;
$$ LANGUAGE plpgsql;

-- Auto-generate certificate ID on completion
CREATE OR REPLACE FUNCTION set_certificate_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' AND NEW.certificate_id IS NULL THEN
    NEW.certificate_id := generate_certificate_id();
    NEW.completed_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_certificate_id ON user_certifications;
CREATE TRIGGER trigger_set_certificate_id
BEFORE UPDATE ON user_certifications
FOR EACH ROW
EXECUTE FUNCTION set_certificate_id();
