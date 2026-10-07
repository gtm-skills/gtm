# Launch runbook — gtm-skills.com relaunch

Branch `relaunch/paid`, 6 commits on top of `bdb4780`. Build and typecheck pass. Nothing premium is in this repo.

## What is built
- Catalog `src/data/skills.ts`: 5 free + 10 premium skills; kits $79, Full Bundle $149 (first 50) → $249, Pro $19/mo. `STATS` drives every count on the site.
- Commerce: `supabase/migrations/004_commerce.sql`; `/api/checkout`, `/api/stripe/webhook`, `/api/skills/[slug]/install` (402 gating), `/api/account/*`, `/auth/*`.
- Pages: `/`, `/skills`, `/skills/[slug]`, `/skills/category/[cat]`, `/pricing`, `/login`, `/account`, `/plugin`, `/privacy`, `/terms`.
- ChatGPT plugin: `/api/mcp` (5 tools, 3 cards), `/.well-known/oauth-protected-resource`, `/.well-known/openai-apps-challenge`, `plugin/` manifest, `node scripts/build-plugin.mjs`.
- Premium content: separate private repo (staged at `/home/claude/premium`, tarball delivered).

## Deploy order
1. **GitHub**: install the Claude GitHub App on `gtm-skills` (or push this branch yourself), open PR `relaunch/paid` → `main`.
2. **Supabase** (existing project): run `004_commerce.sql` in the SQL editor. Auth → Providers: enable GitHub (OAuth app callback `https://<project>.supabase.co/auth/v1/callback`); enable Email with magic link; SMTP via Resend. Auth → URL config: site `https://gtm-skills.com`, redirect `https://gtm-skills.com/auth/callback`. Auth → OAuth Server: enable, allow dynamic client registration (for ChatGPT).
3. **Stripe**: create products `sdr-kit`, `ae-kit`, `revops-kit`, `founder-kit` ($79 one-time), `full-bundle` ($249 one-time + a second $149 price), `pro` ($19/mo recurring). Write the price ids into `products` (`stripe_price_id`, `stripe_launch_price_id`). Webhook → `https://gtm-skills.com/api/stripe/webhook`, events: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `customer.subscription.updated`, `customer.subscription.deleted`, `charge.refunded`. Customer portal enabled.
4. **Premium repo**: create private `gtm-skills/premium`, push the tarball contents, add webhook `https://gtm-skills.com/api/revalidate?secret=<REVALIDATE_SECRET>`, create fine-grained PAT (Contents: read).
5. **Vercel env**: everything in `.env.example` — `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `GITHUB_PREMIUM_REPO`, `GITHUB_PREMIUM_TOKEN`, `REVALIDATE_SECRET`, `OPENAI_APPS_CHALLENGE_TOKEN` (later), plus existing Supabase/Resend vars.
6. **Merge + deploy.** Smoke: `/pricing` → buy bundle with card 4242 → `/account` shows Full Bundle → `/skills/scout-pro` shows full SKILL.md → copy install prompt → run in Claude Code.
7. **Plugin** (see `docs/plugin-submission.md`): OpenAI org verified → challenge token → `node scripts/build-plugin.mjs` → add assets → submit with the golden prompt set. Target: live before Dec 11 (GPT retirement).
8. **Announce on X**: thread with the three cards as GIFs; "Sales GPT users: here is where to go" angle in the retirement window.

## Known gaps / follow-ups
- Free skills `cold-email-fundamentals`, `hemingway-tonality`, `meddic-discovery-lite` live in `skills/` here; their pages fetch from GitHub `main`, so they render fully only after this branch merges.
- `plugin/assets/` is empty: logo 512, icon 64, three card screenshots, demo video needed before submission.
- `pro` row has no Stripe ids until step 3; `CheckoutButton` shows a friendly "not live yet" message meanwhile.
- Reviewer account for OpenAI: create a user, then `insert into entitlements (user_id, product_id, source) values ('<uuid>', 'pro', 'grant')`.
- Trending section hides until ≥3 skills have installs.
- Phase 4 (roadmap): Claude connector (list `/api/mcp` in the Claude.ai connector directory — same server, same OAuth), CLI `npx gtm-skills add`, ZIP endpoint, team seats, affiliate, Learn hub.
