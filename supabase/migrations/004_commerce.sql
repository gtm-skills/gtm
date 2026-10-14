-- GTM Skills Commerce Schema
-- Relaunch: accounts, products, purchases, subscriptions, entitlements, API keys,
-- install tracking, plugin usage metering.
--
-- Design notes
-- * The catalog (skills, kits, prices) lives in src/data/skills.ts. This schema
--   holds only what must be dynamic: Stripe mapping, who bought what, who may
--   access what, and counters.
-- * has_skill_access() is the single access check used by the site, the install
--   API and the ChatGPT plugin. Kits, bundle and Pro all resolve through it.
-- * Subscriptions write entitlements with expires_at = current_period_end, so
--   access logic never special-cases Pro.

-- ============================================
-- PROFILES
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  github_username TEXT,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- PRODUCTS (mirror of src/data/skills.ts kits[], plus Stripe ids)
-- ============================================

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,                                   -- 'sdr-kit' | 'full-bundle' | 'pro'
  name TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('kit', 'bundle', 'subscription', 'skill')),
  price_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  interval TEXT CHECK (interval IN ('month', 'year')),  -- subscriptions only
  stripe_product_id TEXT,
  stripe_price_id TEXT,                                  -- regular price
  stripe_launch_price_id TEXT,                           -- launch price while seats remain
  launch_price_cents INTEGER,
  launch_seat_limit INTEGER,
  active BOOLEAN NOT NULL DEFAULT true,
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Which skills a product grants. Bundle/Pro rows are generated from the catalog
-- by scripts/sync-products.ts so this never drifts from skills.ts.
CREATE TABLE IF NOT EXISTS product_skills (
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  skill_slug TEXT NOT NULL,
  PRIMARY KEY (product_id, skill_slug)
);
CREATE INDEX IF NOT EXISTS idx_product_skills_slug ON product_skills(skill_slug);

-- ============================================
-- STRIPE EVENTS (idempotency)
-- ============================================

CREATE TABLE IF NOT EXISTS stripe_events (
  id TEXT PRIMARY KEY,                                   -- evt_...
  type TEXT NOT NULL,
  payload JSONB,
  received_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ,
  error TEXT
);

-- ============================================
-- PURCHASES (one-time)
-- ============================================

CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,                                   -- always set; claim key for guest checkout
  product_id TEXT NOT NULL REFERENCES products(id),
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  stripe_customer_id TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  was_launch_price BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'refunded', 'disputed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  refunded_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(lower(email));
CREATE INDEX IF NOT EXISTS idx_purchases_user ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_status ON purchases(product_id, status);

-- ============================================
-- SUBSCRIPTIONS (Pro)
-- ============================================

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  product_id TEXT NOT NULL REFERENCES products(id),
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  status TEXT NOT NULL,                                  -- Stripe status verbatim
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  canceled_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(lower(email));
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);

-- ============================================
-- ENTITLEMENTS (what a user may access, regardless of how it was granted)
-- ============================================

CREATE TABLE IF NOT EXISTS entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id),
  source TEXT NOT NULL CHECK (source IN ('purchase', 'subscription', 'grant')),
  source_id UUID,                                        -- purchases.id | subscriptions.id | null for grants
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,                                -- null = perpetual; subscriptions set period end
  revoked_at TIMESTAMPTZ,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, product_id, source, source_id)
);
CREATE INDEX IF NOT EXISTS idx_entitlements_user_active ON entitlements(user_id) WHERE revoked_at IS NULL;

-- ============================================
-- API KEYS (CLI + agent install prompts)
-- ============================================

CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prefix TEXT NOT NULL,                                  -- 'gsk_live_ab12' shown in UI
  key_hash TEXT NOT NULL UNIQUE,                         -- sha256 of full key
  label TEXT,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  revoked_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_api_keys_user ON api_keys(user_id);

-- ============================================
-- SKILL INSTALLS (counters shown on cards; retention signal)
-- ============================================

CREATE TABLE IF NOT EXISTS skill_installs (
  id BIGSERIAL PRIMARY KEY,
  skill_slug TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  method TEXT NOT NULL CHECK (method IN ('copy', 'cli', 'zip', 'prompt', 'plugin')),
  agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_skill_installs_slug ON skill_installs(skill_slug);

CREATE OR REPLACE VIEW skill_install_counts AS
  SELECT skill_slug, count(*)::INTEGER AS installs, max(created_at) AS last_install_at
  FROM skill_installs GROUP BY skill_slug;

-- ============================================
-- PLUGIN USAGE (free-tier metering for ChatGPT plugin tools)
-- ============================================

CREATE TABLE IF NOT EXISTS plugin_usage (
  id BIGSERIAL PRIMARY KEY,
  -- One of user_id or anon_key is set. anon_key = sha256(ChatGPT subject or IP) for unauthenticated calls.
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  anon_key TEXT,
  tool TEXT NOT NULL,                                    -- 'call.prep' etc.
  used_on DATE NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  count INTEGER NOT NULL DEFAULT 1,
  UNIQUE (user_id, anon_key, tool, used_on)
);
CREATE INDEX IF NOT EXISTS idx_plugin_usage_day ON plugin_usage(used_on);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Access check. Resolves kits, bundle and Pro uniformly through entitlements.
CREATE OR REPLACE FUNCTION has_skill_access(uid UUID, slug TEXT)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1
    FROM entitlements e
    JOIN product_skills ps ON ps.product_id = e.product_id
    WHERE e.user_id = uid
      AND ps.skill_slug = slug
      AND e.revoked_at IS NULL
      AND e.starts_at <= now()
      AND (e.expires_at IS NULL OR e.expires_at > now())
  );
$$;

-- Does the user hold any active all-access product (bundle or Pro)?
CREATE OR REPLACE FUNCTION has_all_access(uid UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM entitlements e
    JOIN products p ON p.id = e.product_id
    WHERE e.user_id = uid
      AND p.kind IN ('bundle', 'subscription')
      AND e.revoked_at IS NULL
      AND (e.expires_at IS NULL OR e.expires_at > now())
  );
$$;

-- Attach guest purchases/subscriptions to a user by email and mint entitlements.
-- Called on every sign-in (auth callback) and by the handle_new_user trigger.
CREATE OR REPLACE FUNCTION claim_purchases(p_user_id UUID, p_email TEXT)
RETURNS INTEGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  claimed INTEGER := 0;
  r RECORD;
BEGIN
  -- one-time purchases
  FOR r IN
    UPDATE purchases SET user_id = p_user_id
    WHERE user_id IS NULL AND lower(email) = lower(p_email) AND status = 'paid'
    RETURNING id, product_id
  LOOP
    INSERT INTO entitlements (user_id, product_id, source, source_id)
    VALUES (p_user_id, r.product_id, 'purchase', r.id)
    ON CONFLICT DO NOTHING;
    claimed := claimed + 1;
  END LOOP;

  -- subscriptions
  FOR r IN
    UPDATE subscriptions SET user_id = p_user_id
    WHERE user_id IS NULL AND lower(email) = lower(p_email)
      AND status IN ('active', 'trialing', 'past_due')
    RETURNING id, product_id, current_period_end
  LOOP
    INSERT INTO entitlements (user_id, product_id, source, source_id, expires_at)
    VALUES (p_user_id, r.product_id, 'subscription', r.id, r.current_period_end)
    ON CONFLICT (user_id, product_id, source, source_id)
    DO UPDATE SET expires_at = EXCLUDED.expires_at, revoked_at = NULL;
    claimed := claimed + 1;
  END LOOP;

  RETURN claimed;
END;
$$;

-- Create profile and claim anything bought as a guest.
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url, github_username)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url',
    NEW.raw_user_meta_data ->> 'user_name'
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, updated_at = now();
  PERFORM claim_purchases(NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Seats sold at launch price for a product (drives the "N of 50 left" counter).
CREATE OR REPLACE FUNCTION launch_seats_taken(p_product_id TEXT)
RETURNS INTEGER
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT count(*)::INTEGER FROM purchases
  WHERE product_id = p_product_id AND status = 'paid' AND was_launch_price = true;
$$;

-- Free-tier metering: increments and returns today's count for (user|anon, tool).
CREATE OR REPLACE FUNCTION bump_plugin_usage(p_user_id UUID, p_anon_key TEXT, p_tool TEXT)
RETURNS INTEGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  n INTEGER;
BEGIN
  INSERT INTO plugin_usage (user_id, anon_key, tool)
  VALUES (p_user_id, p_anon_key, p_tool)
  ON CONFLICT (user_id, anon_key, tool, used_on)
  DO UPDATE SET count = plugin_usage.count + 1
  RETURNING count INTO n;
  RETURN n;
END;
$$;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE products        ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_skills  ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_events   ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases       ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE entitlements    ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys        ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_installs  ENABLE ROW LEVEL SECURITY;
ALTER TABLE plugin_usage    ENABLE ROW LEVEL SECURITY;

-- Public catalog data
CREATE POLICY "products are public"        ON products       FOR SELECT USING (true);
CREATE POLICY "product_skills are public"  ON product_skills FOR SELECT USING (true);

-- Own rows
CREATE POLICY "read own profile"        ON profiles      FOR SELECT USING (auth.uid() = id);
CREATE POLICY "update own profile"      ON profiles      FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "read own purchases"      ON purchases     FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "read own subscriptions"  ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "read own entitlements"   ON entitlements  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "read own api keys"       ON api_keys      FOR SELECT USING (auth.uid() = user_id);

-- Everything else: service role only (no policies = denied to anon/authenticated).
-- skill_install_counts view is readable because views run as the owner; grant explicitly:
GRANT SELECT ON skill_install_counts TO anon, authenticated;

-- ============================================
-- SEED: products mirror src/data/skills.ts. Stripe ids are filled in by
-- scripts/sync-products.ts after products exist in the Stripe dashboard.
-- ============================================

INSERT INTO products (id, name, kind, price_cents, launch_price_cents, launch_seat_limit, interval, sort) VALUES
  ('sdr-kit',     'SDR Kit',     'kit',          7900,  NULL,  NULL, NULL,    1),
  ('ae-kit',      'AE Kit',      'kit',          7900,  NULL,  NULL, NULL,    2),
  ('revops-kit',  'RevOps Kit',  'kit',          7900,  NULL,  NULL, NULL,    3),
  ('founder-kit', 'Founder Kit', 'kit',          7900,  NULL,  NULL, NULL,    4),
  ('full-bundle', 'Full Bundle', 'bundle',      24900, 14900,    50, NULL,    5),
  ('pro',         'Pro',         'subscription', 1900,  NULL,  NULL, 'month', 6)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, kind = EXCLUDED.kind, price_cents = EXCLUDED.price_cents,
  launch_price_cents = EXCLUDED.launch_price_cents, launch_seat_limit = EXCLUDED.launch_seat_limit,
  interval = EXCLUDED.interval, sort = EXCLUDED.sort, updated_at = now();

INSERT INTO product_skills (product_id, skill_slug) VALUES
  ('sdr-kit', 'scout-pro'), ('sdr-kit', 'signal-based-prospecting'), ('sdr-kit', 'cold-email-sequences'),
  ('ae-kit', 'closer-pro'), ('ae-kit', 'meddpicc-qualifier'), ('ae-kit', 'gap-selling-discovery'),
  ('revops-kit', 'pipeline-inspector'), ('revops-kit', 'hubspot-crm-ops'),
  ('founder-kit', 'mission-control-pro'), ('founder-kit', 'founder-led-sales-os')
ON CONFLICT DO NOTHING;

-- Bundle and Pro grant every premium skill.
INSERT INTO product_skills (product_id, skill_slug)
  SELECT 'full-bundle', skill_slug FROM product_skills WHERE product_id LIKE '%-kit'
ON CONFLICT DO NOTHING;
INSERT INTO product_skills (product_id, skill_slug)
  SELECT 'pro', skill_slug FROM product_skills WHERE product_id LIKE '%-kit'
ON CONFLICT DO NOTHING;
