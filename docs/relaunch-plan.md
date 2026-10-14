# gtm-skills.com — Free → Paid Relaunch Plan

## Context

gtm-skills.com is a free, MIT-licensed Next.js 16 site (repo `gtm-skills/gtm`, cloned read-only at `/home/claude/gtm-skills/gtm`) with 244 prompts, 24 tonality pages, an MCP server, a Chrome extension and 5 OpenClaw agent personas. Every CTA is "Star on GitHub." No pricing, auth, or payments exist. Goal (Project): convert it into a converting marketplace with paid skill packages and scale to $7,500 MRR.

**Decisions made (Caleb):**
- Pricing: one-time kits. **$79 per role kit; Full Bundle $149 for first 50 buyers, then $249.** Subscription is roadmap only; schema must allow it.
- Stack: **Stripe Checkout + Supabase Auth**, entitlements table, server-side gating.
- Free tier: **~10% free sample** (Skillry model). Preview visible on premium; SKILL.md + install gated.
- Content: **write 10 premium skills in-plan** (5 free + 10 premium at launch), add weekly.
- Theme: **dark default, new palette** (Skillry-inspired layout, not Skillry's colors).

**Search Console (last 3 mo, web):** 808 clicks / 14.3K impr. Homepage = 667 clicks (83%), all brand queries ("gtm skills", "gtm claude skills", pos 2–3). Non-brand is near zero: `/free-tools/mcp-server` 3,399 impr / 61 clicks / 1.8% CTR / pos 7; tonalities hormozi 558 impr/8 clicks, meddic 598/2, gap-selling 561/0, chris-voss 479/1; `/agentic-bdr` 707/4 at pos 29. pSEO `/prompts/*` ≈ 0 clicks. Trend: ~22 clicks/day mid-Aug → ~5/day now. Desktop 87%. US 4.6K impr at 2.5% CTR.

**Competitive reference:** Skillry (386 skills, ~34 free, $9.99/mo–$169 lifetime, preview-before-buy, install counts, Learn hub, 40% affiliate). AgentsKit ($49/kit, $89→$149 after 50 seats, Polar, private repo + one-line npx, 14-day refund, revenue badge, free browser tools).

**Hard constraint:** `LICENSE` is MIT. All existing content (prompts.ts, 24 tonality pages, `openclaw-skills/*/SKILL.md`) is irrevocably free. Premium must be new or materially upgraded material stored outside the public repo. Do not gate existing content.

---

## 1. Catalog & packaging

**Catalog = static TS** `src/data/skills.ts` (SSG, typed, git-versioned). Supabase holds only dynamic bits: `products`, `product_skills`, `skill_installs`. Build-time check `scripts/check-catalog.ts` asserts every `product_skills.skill_slug` exists in TS.

```ts
export interface Skill {
  id; slug; name; tagline; description;
  category: 'prospecting'|'outreach'|'discovery'|'closing'|'revops'|'founder'|'agents'|'tonality'|'tools';
  role: ('sdr'|'ae'|'manager'|'revops'|'csm'|'founder'|'all')[];
  tier: 'free'|'premium'; kits: KitId[]; version: string;
  agents: ('claude-code'|'cursor'|'codex'|'gemini-cli'|'openclaw'|'claude-desktop'|'windsurf')[]; lastTested: string;
  whatYouGet: string[]; goodFit: string[]; notFor: string[];
  previewImages: string[]; icon: { lucide?: string; hue: number };
  contentPath: string; files: string[]; freeSource?: string; relatedSlugs: string[];
  seo: { title; description; keywords[] };
}
export interface Kit { id: KitId|'full-bundle'; name; tagline; priceCents; launchPriceCents?; launchSeatLimit?; skillSlugs[] }
export const STATS = { prompts: 244, skills: 15, freeSkills: 5, tonalities: 24, industries: 16, mcpTools: 18 }; // single source of truth
```

**Launch catalog (15 skills):**

| Kit | Price | Launch skills | Source |
|---|---|---|---|
| Free (5) | $0 | `scout`, `gtm-mcp-server`, `cold-email-fundamentals`, `hemingway-tonality`, `meddic-discovery-lite` | public repo as-is (already rank) |
| SDR Kit | $79 | `scout-pro`, `signal-based-prospecting`, `cold-email-sequences` | `sdrPrompts` + scout SKILL.md expanded w/ `references/`, agent wiring |
| AE Kit | $79 | `closer-pro`, `meddpicc-qualifier`, `gap-selling-discovery` | `aePrompts`, methodology prompts, closer SKILL.md |
| RevOps Kit | $79 | `pipeline-inspector`, `hubspot-crm-ops` | `revopsPrompts`, mcp-server HubSpot tools |
| Founder Kit | $79 | `mission-control-pro`, `founder-led-sales-os` | `founderPrompts`, mission-control SKILL.md, `deployment/` |
| Full Bundle | $149 → $249 after 50 | all kits + `agent-fleet-pro` (writer-pro, rep-pro, heartbeat/MEMORY templates) | `openclaw-skills/deployment/` |

Each "Pro" skill must add: `references/` files, worked examples, per-agent wiring (`.claude/skills` frontmatter, Cursor `.mdc`, OpenClaw heartbeat config), eval checklist. Target 8–10 skills per kit by month 2 (weekly drops = marketing content).

**Premium storage:** private repo `gtm-skills/premium`; fine-grained PAT (Contents: read) in `GITHUB_PREMIUM_TOKEN`. `src/lib/skill-content.ts` → `getSkillFiles(slug, version)` fetches via GitHub Contents API (`Accept: application/vnd.github.raw+json`, `next: { revalidate: 3600, tags: ['skill:<slug>'] }`). Push webhook → `POST /api/revalidate?secret=` → `revalidateTag`. Free skills read from public repo at build. Watermark line in delivered SKILL.md: `<!-- licensed to {email} · gtm-skills.com -->`. Never route premium through existing public CORS routes `src/app/api/v1/openclaw/skills/route.ts` or `api/v1/agents/[id]/skill/route.ts`.

## 2. Auth + payments

**Packages:** `@supabase/ssr`, `stripe`; Phase 2 `fflate`.

**Supabase Auth:** email magic link (SMTP via Resend, already configured) + GitHub OAuth.
- `src/lib/supabase/client.ts` (browser), `server.ts` (cookies getAll/setAll, async `cookies()`), `admin.ts` (move service-role helper; keep `src/lib/supabase.ts` re-exporting for 4 existing callers).
- `src/proxy.ts` (Next 16 name, not middleware.ts): session refresh only, matcher `/account/*, /login, /auth/*, /api/skills/*, /api/checkout, /api/account/*`. Gate in server components/route handlers via `getUser()`.
- `src/app/auth/callback/route.ts` → `exchangeCodeForSession` → `rpc('claim_purchases')` → redirect `?next=`.
- `src/app/login/page.tsx`, `src/app/account/page.tsx` (purchases, entitled skills, API keys, install instructions, receipt links).

**Stripe:** Products `sdr-kit, ae-kit, revops-kit, founder-kit, full-bundle`; Prices 4×$79, bundle $149 launch + $249 regular. IDs in `products` table.
- `POST /api/checkout` — picks launch price if `paid_count < launch_seat_limit`; `mode:'payment'`, `allow_promotion_codes`, metadata `{product_id,user_id}`, **guest checkout allowed** (claim by email on first login). success → `/account?purchased=<id>&session_id={CHECKOUT_SESSION_ID}`.
- `POST /api/stripe/webhook` — raw body, `constructEvent`; handles `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `charge.refunded`. Idempotency: insert `stripe_events(id)` first. Upsert `purchases` on `stripe_checkout_session_id`; `entitlements` if user known. Purchase email via `src/lib/resend.ts` (`sendPurchaseEmail`).
- Seat counter: `count(purchases where product_id='full-bundle' and status='paid')`, pricing page `revalidate=60`, re-checked at session creation; honor price at creation.

**Migration `supabase/migrations/004_commerce.sql`:** `profiles` (trigger on auth.users → claim_purchases), `products` (kind: kit|bundle|skill|subscription; stripe ids; launch_price_cents; launch_seat_limit), `product_skills`, `stripe_events`, `purchases` (status paid|refunded|disputed), `entitlements` (source purchase|subscription|grant, expires_at nullable, revoked_at), `api_keys` (prefix, sha256 key_hash), `skill_installs` + view `skill_install_counts`, fn `has_skill_access(uid, slug)`, fn `claim_purchases(email)`. RLS: own-row select; writes service-role only; products/counts public read. Subscription later = `subscriptions` table + `entitlements(source='subscription', expires_at=period_end)`; `has_skill_access` unchanged.

**Install API:** `GET /api/skills/[slug]/install` — cookie session or `Authorization: Bearer gsk_live_…`. Free → 200. Premium → `has_skill_access` → 200 `{slug, version, files[]}` else `402 {error:'payment_required', kit, checkoutUrl}`. Logs `skill_installs`. `?format=zip` Phase 2. `GET /api/skills/[slug]/manifest` public.

**Env (add to `.env.example`):** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `GITHUB_PREMIUM_REPO`, `GITHUB_PREMIUM_TOKEN`, `REVALIDATE_SECRET`.

## 3. Install mechanics

- **v1:** copy "install prompt" per agent tab (Claude Code `.claude/skills/`, Cursor `.cursor/rules/`, Codex `AGENTS.md`, Gemini CLI, OpenClaw `~/.openclaw/skills/`) — the agent fetches `/install` with the user's key and writes files. Zero tooling.
- **Phase 2:** `cli/` workspace → `npx gtm-skills add <slug> --agent <x>` (check npm name; fallback `@gtm-skills/cli`); ZIP endpoint.
- OpenClaw: free skills stay on clawdhub; premium not published there. `/openclaw` keeps command + adds "Agent Fleet Pro" CTA.

## 4. Homepage relaunch + IA (Skillry layout, new dark palette)

**Theme (`src/app/globals.css`, `layout.tsx`):** `defaultTheme="dark"`, keep `enableSystem`. New palette replaces emerald `--brand-primary`: pick a warm accent on near-black (e.g. amber/coral family — Skillry uses yellow banner + cream; differentiate with e.g. electric violet or warm orange; finalize with `frontend-design` skill during Phase 2). Update tokens in one place; `.brand-gradient`, `.label-mono`, 4px radius kept so the ~85 dependent files don't break. Add per-category tile hues (9 CSS vars), `@keyframes marquee`, `.marquee-track`, display type `text-6xl md:text-7xl tracking-tighter`. Light mode remains supported.

**Nav (`src/components/header.tsx`):** `Skills · Categories ▾ · Tools ▾ · Pricing · Learn ▾` | `SearchButton · ThemeToggle · Sign In/avatar (<AuthButton/>) · Get the Bundle (primary → /pricing)`. GitHub star → footer + skill pages.

**Homepage `src/app/page.tsx`, top → bottom** (delete `home/social-proof, product-surface-grid, voice-showcase, proof-in-action, developers-section, final-cta`; keep `animated-chat-demo` for the MCP skill page):
1. `home/premium-banner.tsx` — "Full Bundle $149 for the first 50, then $249 →" live seats; dismissable.
2. `home/hero.tsx` — eyebrow "Installable GTM skills for Claude Code, Cursor, Codex" · H1 "Agent skills that sell." · CTAs `Browse Skills` / `Get the Bundle` · `home/skill-marquee.tsx` two rows opposite directions, `prefers-reduced-motion` static.
3. `home/works-with.tsx` — mono logos: Claude Code, Cursor, Codex, Gemini CLI, OpenClaw, Windsurf (`public/agents/*.svg`).
4. `home/featured-premium.tsx` — 3×2 `SkillGrid`.
5. `home/free-skills-row.tsx` — "Try before you buy."
6. `home/trending.tsx` — top 6 by `skill_install_counts` (server, revalidate 300).
7. `home/install-steps.tsx` — Pick → Copy install prompt → Agent runs it.
8. `home/pricing-cards.tsx` — 4 kits + highlighted bundle w/ seat counter + strikethrough $249; 14-day refund; `<CheckoutButton/>`.
9. `home/faq.tsx` — rewritten, keeps FAQPage JSON-LD.
10. Footer — add Pricing, Account, Privacy, Terms; MIT note scoped to "open-source core."

**`src/components/skills/`:** `skill-card`, `skill-grid`, `skill-filters` (URL-synced), `skill-gallery` (reuse `ui/dialog`), `install-block` (reuse `ui/tabs`, `copy-button`), `paywall-gate` (replaces `gtm/tonality-gate.tsx`; renders only first ~40 lines blurred server-side, never full file), `agents-row`, `related-skills`, `product-json-ld`. Reuse as-is: `copy-button`, `command-menu` (index skills), `github-stars`, `theme-toggle`, `json-ld`, `tracked-link`, `ui/*`.

**Routes:**

| Route | Action |
|---|---|
| `/skills`, `/skills/[slug]`, `/skills/category/[cat]` | new, SSG; detail = `getUser()` → `has_skill_access` → full markdown or `PaywallGate`; `generateMetadata`, `opengraph-image.tsx` (`@vercel/og` installed), Product JSON-LD |
| `/pricing`, `/account`, `/login`, `/auth/callback`, `/privacy`, `/terms` | new |
| `/download` → `/pricing`, `/agents` → `/skills/category/agents` | redirects in `next.config.ts` |
| `/search` | don't build; remove `SearchAction` JSON-LD from `layout.tsx` |
| `/free-tools/*`, `/prompts/*`, `/guides`, `/tutorials`, `/agentic-bdr`, `/openclaw`, `/industry|role|methodology|workflow` | keep for SEO + `<InlineUpsell kit=…/>` |
| `/templates /projects /signals /voice-templates /certifications /leaderboard /community /contributors` | keep, footer-only |
| `sitemap.ts` | add `/skills/*`, `/pricing`; drop `/download` |

## 5. Copy & claims cleanup

`grep -rn "100% free\|no paywalls\|MIT licensed\|Free & Open Source\|No email required" src/` (6 hits) + `README.md`, `public/llms.txt`, `public/manifest.json`, `layout.tsx` metadata. New line: "Open-source core (MIT). Premium skill kits for teams that want the finished playbooks." All counts from `STATS`; retire "2,500+" and "8 industries." Remove fabricated testimonials in `social-proof.tsx` → real numbers only (stars, npm downloads, install counts). FAQ: what's free vs paid · agents · install · 14-day refund · not a subscription, 12 months of updates · 1 buyer = 1 seat, team pricing coming · open source. Fix misdirected CTAs ("Try Prospeda Free" → GitHub on `/role/sdr`, guides; "Get Extension" → `/download`). Remove `TonalityGate` from tonality pages (content is MIT; gate hurts CTR).

## 6. SEO / conversion quick wins (from GSC)

- `/free-tools/mcp-server`: title `GTM MCP Server for Claude — 18 Sales Tools + HubSpot CRM (Free)`; desc leads with install command; `SoftwareApplication` JSON-LD; `InlineUpsell kit="revops-kit"`; FAQ targeting "best claude code mcp for gtm", "how to connect claude to my sales stack".
- Tonality pages (2.2K impr, <1.5% CTR): title pattern `Write Sales Emails Like Alex Hormozi — Claude Prompt (Free)`; outcome-led meta; `InlineUpsell` → matching Pro skill.
- `/agentic-bdr` (pos 29): internal links from homepage Learn + skill pages.
- `/skills` title: `GTM Skills for Claude Code, Cursor & Codex — Installable Sales Workflows` (owns "gtm skill claude", "installable gtm workflows").
- Per-page OG for skills; Product/Offer JSON-LD; noindex `/account /login /auth /embed`; `sitemap.ts` lastmod from `scripts/gen-lastmod.ts` → `src/data/lastmod.json`.

## 7. Analytics

Extend existing `@vercel/analytics` `track()` (already in 7 files) via typed `src/lib/analytics.ts`: `view_skill, paywall_hit, view_pricing, select_kit, begin_checkout, purchase, install_copied, install_api (server), signup, banner_click`. Funnel targets: paywall→pricing >25%, pricing→checkout >8%, checkout→purchase >60%, purchase→install in 24h >70%. PostHog only in Phase 3 if replay needed. `/api/admin/stats` (service-role) for a public revenue badge later.

## 8. $7.5K MRR math & launch

~270 organic clicks/mo today. At 2% × $149 AOV ≈ 8 sales ≈ $1.2K/mo. **$7.5K needs ~50 sales/mo at $149 AOV → 2,500–5,000 qualified visits/mo (10–20× today).** Organic can't carry it; brand clicks are decaying.

| Channel | Assumption | Sales/mo |
|---|---|---|
| Product Hunt (relaunch week) | 3–8K visits, 1% | 30–80 once |
| Show HN | 2–5K visits, 0.5% | 10–25 once |
| X @prospeda + Caleb LinkedIn, 3×/wk GIF demos + weekly skill drop | 1.5K/mo, 1.5% | ~20 |
| GitHub README → pricing banner + free skills | 500/mo, 2% | ~10 |
| skills.sh / awesome-claude-skills / clawdhub (free skills) | 800/mo, 1% | ~8 |
| Organic after title rewrites | 600/mo, 1.5% | ~9 |
| Email list (`subscribers` table) 3-email launch sequence | 2% of list | ? |
| Affiliate 40% (Phase 4) | 5 × 4 | ~20 |

Realistic month-3 steady state: 35–50 sales/mo ($5–7.5K) with launch spikes above. Sequence: Phase 0–1 ship quietly → 10 beta buyers via DMs at launch price for real testimonials → PH + HN the week the new homepage ships → weekly skill drops. Decide subscription/team tier ($399 5-seat) from month-2 data.

## 9. Phasing (one dev + AI tooling, ~16–19 days)

- **Phase 0 — prep (1.5 d):** claims grep/rewrite, `STATS`, remove fake testimonials, remove `SearchAction`, `/privacy` `/terms`, `/download`→`/pricing` stub, `@supabase/ssr` + Next 16 `proxy.ts` spike, create `gtm-skills/premium` repo, Stripe products/prices, Vercel env.
- **Phase 1 — MVP paid (7–9 d):** `004_commerce.sql` + seed; `skills.ts` (5 free + 10 premium); `skill-content.ts`; auth; checkout + webhook + claim; `/skills*`, `/pricing`; `PaywallGate`, `InstallBlock`, API keys; install API; purchase email. **Content for 10 premium skills ≈ 3 of these days (long pole).**
- **Phase 2 — Skillry homepage + CLI (4–5 d):** new palette via `frontend-design` skill, `home/*`, marquee, header/footer, dark default, per-skill OG, ZIP, `cli/` publish, `/openclaw` upsell, PH/HN assets.
- **Phase 3 — SEO + Learn + analytics (3–4 d):** title/meta rewrites, `InlineUpsell`, JSON-LD, sitemap lastmod, typed events, `/learn` hub with per-agent install guides.
- **Phase 4 — roadmap:** team seats, affiliate, free browser tools (email scorer, ICP builder), CLI `npx gtm-skills add` + `update`, **Claude connector** (same `/api/mcp` server listed in the Claude.ai connector directory — OAuth already in place; adds Claude Desktop/Claude.ai users with zero new backend), Cursor/Codex marketplace listings.

## 10. Verification

- `supabase start && supabase db reset` applies 001–004; seed products.
- `stripe listen --forward-to localhost:3000/api/stripe/webhook`; `stripe trigger checkout.session.completed` → rows in `purchases`/`entitlements`; replay → no dup; `charge.refunded` → revoked.
- Guest purchase then magic-link login same email → `claim_purchases` grants access.
- `curl -i /api/skills/scout-pro/install` → 402; with Bearer key → 200 + files; free slug → 200 unauth. `grep -r "<premium phrase>" .next/static` → no hits.
- Playwright `e2e/purchase.spec.ts`: `/pricing` → bundle → 4242 card → `/account` shows kit → `/skills/scout-pro` full content → copy fires `install_copied`.
- `npm run build && npx tsc --noEmit && npm run lint`; Lighthouse ≥90 on `/`, `/skills/[slug]`, `/pricing` (marquee: fixed heights, `will-change: transform`); dark + light both render; mobile nav.

## Risks

MIT content is permanently free → premium must be new. Delivered files are copyable → compete on updates, price, watermark. Next 16 `proxy.ts` + async `cookies()` with `@supabase/ssr` → spike first. Webhook ordering/idempotency → `stripe_events` PK + unique session id. Seat-counter race → honor creation price. Traffic gap → launch channels and later subscription/team tier are the real lever, not the site alone.

## Immediate next step on approval

Attach repo with push access (`add_repo` access:"push"), branch `relaunch/paid`, start Phase 0.

---

## 11. ChatGPT plugin — primary distribution channel (added 2026-10-06)

**Platform facts (verified Oct 2026):** OpenAI merged "apps" into **plugins** on Jul 9 2026: a ZIP of `plugin.json` + `skills/*/SKILL.md` + optional `mcp.json` (Streamable HTTP MCP) + optional UI (MCP Apps spec, `text/html;profile=mcp-app`). One directory for ChatGPT + Codex at chatgpt.com/plugins. Custom GPTs retire **Dec 11 2026**. Ranking is retention-weighted (Aug 21). 1.2B WAU. Submission needs a **verified OpenAI Platform org**, domain token at `/.well-known/openai-apps-challenge`, privacy/ToS/support URLs, 5 positive + 3 negative test prompts, demo video, reviewer creds (no MFA).

**Monetization rule:** no selling digital goods/subscriptions/credits in or from a plugin; no checkout links. Allowed: OAuth sign-in to our account, premium unlocked for existing paid accounts, link to an *informational* plans page. → Upgrade happens on gtm-skills.com. This is why Stripe + Supabase Auth was the right call.

**Category read:** directory GTM plugins are incumbents exposing data (OpenAI Sales, HubSpot, Salesforce, Gong, Clay, Apollo, Outreach, Hunter, ZoomInfo, Explorium). Nobody sells methodology. Individual reps on Plus have none of those connected.

**Wedge: the rep's call loop.** `prep → debrief/score → follow-up`. Daily for every role, visual, methodology-scored, retention engine.

- **Name:** GTM Skills. **Category:** Business & Operations. Capabilities: Read, Analyze, Create.
- **Tools (domain.action, "Use this when… / Do not use for…"):**
  - `call.prep` — company/person/meeting context in → brief card (who, what changed, 3 hypotheses, 5 questions, likely objections). Free, 3/day anon-free; unlimited Pro.
  - `call.debrief` — notes/transcript in → MEDDPICC-lite scorecard card, gaps, next questions, risks. Free capped; full MEDDPICC + CRM field map = Pro.
  - `followup.draft` — debrief in → recap email + mutual action plan. Free capped; Pro adds Closer Pro close plan.
  - `objection.handle` — objection + context → reframe, proof, question. Free.
  - `skill.install` — returns a skill's files for entitled users (mirrors `/api/skills/[slug]/install`). Pro / kit owners.
  - Negative triggers: generic "write an email", marketing copy, CRM record edits (point to HubSpot/Salesforce plugins).
- **Skills folder:** the 5 free SKILL.md files ship inside the plugin ZIP (skills-only works even if MCP is down).
- **UI:** 3 cards — Brief, Scorecard, Action Plan. Inline card rules: ≤ mobile viewport, no inner scroll, ≤2 primary actions, no custom fonts/gradients. Built with `@openai/apps-sdk-ui`; CSP `connectDomains: ['gtm-skills.com']`.
- **Auth:** OAuth 2.1 against Supabase Auth (PKCE S256, CIMD client `https://chatgpt.com/oauth/client.json`, redirect `https://chatgpt.com/connector_platform_oauth_redirect`), protected-resource metadata at `/.well-known/oauth-protected-resource`. Per-tool `securitySchemes`: `noauth` for capped free calls, `oauth2` for Pro.
- **Server:** reuse `mcp-server/` logic; new HTTP entry `src/app/api/mcp/route.ts` (Streamable HTTP on the Vercel app) so one deploy serves site + plugin. Mandatory annotations `readOnlyHint/destructiveHint/openWorldHint`. Server `instructions` ≤512 chars.
- **Pricing change:** add **Pro $19/mo** (`products.kind='subscription'`, Stripe Billing) = unlimited plugin + all premium skills + weekly drops. Kits ($79) and Bundle ($149→$249) remain for one-time buyers; any purchase unlocks the plugin's premium tools for the skills it covers. `entitlements(source='subscription', expires_at=current_period_end)`.
- **Plans page:** `/pricing` must read as informational when linked from the plugin (no "Buy now" in the plugin itself; the page may have checkout).
- **Launch:** submit by **early Nov**; GPT-retirement window (Nov–Dec 11) = "Sales GPT" users migrating. X: build-in-public thread + demo GIFs of the three cards. No LinkedIn. Paid traffic held in reserve. HN/PH secondary.
- **Caleb's tasks (blocking):** create OpenAI Platform org + identity verification (days); create private `gtm-skills/premium` repo; install Claude GitHub App on gtm-skills org; Stripe account.

**Build order (revised):** Phase 0 → Phase 1 (auth, Stripe incl. Pro, migration, catalog, skill pages, `/pricing`, `/account`) → **Phase 1.5 plugin** (HTTP MCP route, OAuth server metadata, 5 tools, 3 cards, plugin.json + skills ZIP, golden prompt set, test cases, demo video) → Phase 2 homepage → Phase 3 SEO.
