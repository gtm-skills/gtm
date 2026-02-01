# GTM Skills - Progress Tracker

> Weekly progress log tracking execution against [PLAN.md](./PLAN.md)

> **IMPORTANT:** Detailed build plans, PRDs, and implementation strategies should ALWAYS be kept in a private repo (prospeda-backend/docs/). This public progress file tracks high-level milestones only. Never expose competitive strategy publicly.

---

## Current Sprint: Week 1 (Jan 27 - Feb 2, 2025)

### Focus: Foundation & Migration

| Task | Status | Owner | Notes |
|------|--------|-------|-------|
| Create gtm-skills repo | ✅ Done | Caleb | github.com/Prospeda/gtm-skills |
| Domain migration planning | ✅ Done | Caleb | Plan documented |
| Update codebase domain refs | ✅ Done | Caleb | 20 files updated |
| Migrate content from claude-gtm-skills | ✅ Done | Caleb | All prompts migrated |
| Merge web app into gtm-skills | ✅ Done | Caleb | Single unified repo |
| Create comprehensive README | ✅ Done | Caleb | With badges, CTAs |
| Push repo to GitHub | ✅ Done | Caleb | Initial commit pushed |
| Add gtm-skills.com to Vercel | 🔄 In Progress | | |
| Configure DNS (Spaceship) | 🔲 Todo | | |
| Email domain setup (Resend) | 🔲 Todo | | |
| GSC property creation | 🔲 Todo | | |

### Blockers
- None currently

### Decisions Made
- Repo name: `gtm-skills` (matches domain)
- Branding: Community-first, maintained by Prospeda
- License: MIT for maximum adoption
- Old domain: Sunset (minimal traffic)
- **Single repo strategy**: All code + content in gtm-skills (not separate repos)
- Domain registrar: Spaceship
- **Client docs stay private**: Prospeda Pro onboarding in prospeda-backend, not public repo

---

## Metrics Dashboard

### Week 1 Baseline
| Metric | Current | Target (30d) |
|--------|---------|--------------|
| GitHub Stars | 0 | 500 |
| Website Visitors | ~0 | 5,000 |
| Email Subscribers | TBD | 500 |
| Prospeda Signups | TBD | 100 |

### LLM Ranking Status
| Platform | Status | Query Test |
|----------|--------|------------|
| Claude | Not indexed | "gtm skills prompts" |
| ChatGPT | Not indexed | "sales prompts github" |
| Perplexity | Not indexed | "best gtm prompt library" |

*Test queries weekly to track LLM citation progress*

---

## Week-by-Week Log

### Week 1 - January 27, 2025

**Completed:**
- [x] Strategic plan created (PLAN.md)
- [x] Progress tracker created (PROGRESS.md)
- [x] Local repo initialized
- [x] GitHub repo created (github.com/Prospeda/gtm-skills)
- [x] All codebase domain refs updated (claudeforgtm.com → gtm-skills.com)
- [x] Branding updated (Claude for GTM → GTM Skills)
- [x] Web app merged into gtm-skills repo (single source of truth)
- [x] Build verified successful
- [x] CLAUDE.md created with persistent notes

**In Progress:**
- [ ] Vercel domain configuration
- [ ] DNS setup at Spaceship

**Learnings:**
- Site only 1-2 days old = ideal migration timing
- LLM ranking requires: stars, citations, structured content, freshness

**Next Week Preview:**
- Complete domain migration
- Launch GitHub repo publicly
- Begin content audit and expansion

---

### Week 2 - January 30, 2026

**Completed:**
- [x] pSEO Tier 8: Agentic BDR pages (24 pages)
- [x] Distribution system created (`/poasting` slash command)
- [x] Content drafts: 5 Twitter, 6 LinkedIn, 4 Reddit
- [x] Swipe file system for viral content analysis
- [x] Content machine CLI (`scripts/content-machine.js`)
- [x] Moltbot deployed on Hetzner (5.78.152.110)
- [x] Telegram channel connected (@gtmskills_bot)
- [x] Server security hardened (UFW, fail2ban, SSH keys only)
- [x] POASTING.md workflow on server (screenshot → post)
- [x] `/moltbot` slash command for server management
- [x] Prospeda Pro onboarding guide created
- [x] Moltbot quickstart guide created
- [x] Moltbot explainer page on gtm-skills.com

**New Files:**
- `DISTRIBUTION.md` - Content drafts and distribution workflow
- `SWIPE_FILE.md` - Viral content collection and analysis
- `MOLTBOT_POASTING_PROMPT.md` - Moltbot system prompt for content
- `scripts/content-machine.js` - CLI for content workflow
- `docs/MOLTBOT_QUICKSTART.md` - 15-minute quick start (public)
- `prospeda-backend/docs/PROSPEDA_PRO_ONBOARDING.md` - Client deployment guide (private repo)

**Infrastructure:**
- Hetzner VPS: ubuntu-2gb-hil-1 (5.78.152.110)
- Moltbot gateway running via systemd
- Telegram bot: @gtmskills_bot
- Firewall: UFW active (SSH only)
- Fail2ban: Running

**Workflows Created:**
1. `/poasting` - Review, tweak, schedule content
2. `/moltbot` - Server management
3. `cop this [platform]` - Screenshot → adapted post via Telegram

**Platform Style Rules:**
- Twitter: lowercase, no caps, raw energy
- LinkedIn: Proper punctuation, caps, polished
- Word choice: Never "AI" → use LLM, Claude, agentic

---

### Week 3 - February 3, 2025

---

### Week 3 - February 10, 2025
*[To be filled]*

---

### Week 4 - February 17, 2025
*[To be filled]*

---

## Monthly Reviews

### January 2025 Review
*[End of month review - to be filled]*

**Highlights:**
-

**Misses:**
-

**Key Learnings:**
-

**Adjustments for Next Month:**
-

---

## Launch Checklist

### Pre-Launch (Before going public)
- [ ] README polished with badges, screenshots
- [ ] All prompts reviewed for quality
- [ ] CTAs tested and working
- [ ] Analytics configured (GA4, GSC)
- [ ] Social sharing images created
- [ ] Launch posts drafted (Twitter, LinkedIn, Reddit)

### Launch Day
- [ ] Push final changes to GitHub
- [ ] Make repo public
- [ ] Post to Twitter/X
- [ ] Post to LinkedIn
- [ ] Submit to Hacker News (Show HN)
- [ ] Submit to Product Hunt
- [ ] Post to r/sales, r/ChatGPT, r/ClaudeAI
- [ ] Email existing subscribers

### Post-Launch (Week 1)
- [ ] Monitor and respond to issues/PRs
- [ ] Engage with comments on launch posts
- [ ] Track star velocity
- [ ] A/B test README CTAs
- [ ] Reach out to influencers who engaged

---

## Content Pipeline

### Queued for Creation
| Content | Priority | Est. Impact | Status |
|---------|----------|-------------|--------|
| Ultimate MEDDPICC Guide | High | SEO + Authority | 🔲 |
| Video: "GTM Skills in 5 min" | High | Engagement | 🔲 |
| prompts.json index | High | LLM parsing | 🔲 |
| Industry deep-dives (x8) | Medium | SEO long-tail | 🔲 |
| Case study: Real user | Medium | Social proof | 🔲 |

### Recently Published
*[Track new content here]*

---

## Outreach Log

### Link Building
| Target | Contact | Status | Result |
|--------|---------|--------|--------|
| awesome-chatgpt-prompts | [maintainer] | 🔲 Not started | |
| awesome-ai-tools | [maintainer] | 🔲 Not started | |
| Sales Hacker blog | [editor] | 🔲 Not started | |

### Influencer Outreach
| Name | Platform | Followers | Status | Result |
|------|----------|-----------|--------|--------|
| | | | | |

---

## Technical Debt

| Item | Priority | Notes |
|------|----------|-------|
| | | |

---

## Ideas Backlog

*Capture ideas here for future consideration*

- [ ] GTM Skills API (paid tier)
- [ ] Chrome extension for quick prompt access
- [ ] Slack bot integration
- [ ] Prompt effectiveness scoring
- [ ] User-submitted prompts with voting
- [ ] Enterprise/team features
- [ ] Localization (non-English markets)
- [ ] Integration with CRM tools

---

## Notes & Scratchpad

*Temporary notes, links, observations*

**LLM Ranking Research:**
- GitHub repos with 1k+ stars frequently cited by Claude/ChatGPT
- Structured markdown with clear headers improves LLM parsing
- Recent commits signal "freshness" to LLMs
- Backlinks from authoritative sources boost credibility

**Competitive Intel:**
- awesome-chatgpt-prompts: 120k+ stars, but generic
- No dominant GTM-specific prompt repo exists = opportunity

---

*Last Updated: January 31, 2026*
