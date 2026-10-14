# ChatGPT plugin submission — GTM Skills

## Prerequisites (Caleb)
- [ ] OpenAI Platform org, identity verified (platform.openai.com → Settings → Organization → Verification)
- [ ] `OPENAI_APPS_CHALLENGE_TOKEN` from the submission flow set on Vercel → verify `https://gtm-skills.com/.well-known/openai-apps-challenge`
- [ ] Supabase: enable **OAuth 2.1 Server** (Auth → OAuth Server), allow dynamic client registration; confirm `https://<project>.supabase.co/auth/v1/.well-known/oauth-authorization-server` resolves
- [ ] Supabase Auth: GitHub provider + SMTP (Resend) configured; site URL `https://gtm-skills.com`, redirect allowlist includes `https://gtm-skills.com/auth/callback`
- [ ] Stripe products created, ids written to `products` table (`stripe_price_id`, `stripe_launch_price_id`)
- [ ] Private repo `gtm-skills/premium` with the 10 premium skills; PAT in `GITHUB_PREMIUM_TOKEN`
- [ ] Reviewer account: create `reviewer@gtm-skills.com` with a Pro grant (`entitlements` source='grant'); magic-link only — reviewers must not hit MFA/SMS

## Package
`node scripts/build-plugin.mjs` → `dist/gtm-skills-plugin.zip`

Assets still needed in `plugin/assets/`: `logo.png` (512×512), `icon.png` (64×64 monochrome), three screenshots of the cards captured in ChatGPT dev mode, 30–60s demo video (prep → debrief → follow-up).

## Metadata limits
- displayName ≤30 ✔ "GTM Skills"
- shortDescription ≤30 ✔ "Prep, debrief, follow up on sales calls" (37 — **trim to** "Prep, debrief, follow up calls")
- longDescription ≤4,000 ✔; no pricing, no comparisons, no "MCP"/"Plugin" in name ✔

## Golden prompt set

### Positive (must trigger the right tool)
1. "Prep me for a discovery call tomorrow with the Head of RevOps at Brex. We met at SaaStr." → `call.prep`
2. "Here are my notes from the Notion call: [notes]. How qualified is this deal?" → `call.debrief`
3. "Write the follow-up email and next steps for the Figma call we just had." → `followup.draft`
4. "The CFO said they have no budget until next fiscal year. What do I say?" → `objection.handle`
5. "Install the scout-pro skill into Claude Code." → `skill.install`

### Negative (must NOT trigger)
1. "Write a LinkedIn post about our product launch." (marketing copy)
2. "Update the Acme deal stage to Closed Won in HubSpot." (CRM write — point to HubSpot plugin)
3. "What is Google Tag Manager?" ("GTM" collision — general knowledge)

### Indirect (should trigger)
- "I have a call in an hour with a VP I've never spoken to. Help." → `call.prep`
- "Did I miss anything on that call?" + pasted notes → `call.debrief`

## Review notes to include
- All tools are read-only (`readOnlyHint: true`). No destructive actions.
- No digital goods are sold in or from the plugin. Locked features link to an informational plans page (`/pricing`). Checkout happens on the website only.
- Anonymous use is metered by hashed client key; no conversation content is stored.
- Server instructions and tool descriptions carry explicit "Do not use for…" clauses.

## Local testing
- `npx next dev` then in ChatGPT → Plugins → "Add custom MCP server" with a tunnel URL, or MCP Inspector against `http://localhost:3000/api/mcp`.
- `curl -X POST localhost:3000/api/mcp -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'`
