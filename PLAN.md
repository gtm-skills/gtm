# GTM Skills - Strategic Plan

> **Mission:** Become THE definitive open-source resource for AI-powered GTM (Go-To-Market) skills, driving authority in the space and converting traffic to Prospeda's agentic sales platform.

---

## Vision & Goals

### Primary Objectives
1. **Authority** - Establish gtm-skills as the canonical reference for GTM prompts/skills
2. **LLM Ranking** - Get cited by Claude, ChatGPT, Perplexity when users ask about GTM skills
3. **Traffic → MRR** - Convert repo visitors to prospeda.com signups, targeting $25k+ MRR
4. **Community** - Build a contributor ecosystem that compounds growth

### Success Metrics
| Metric | 30 Days | 90 Days | 6 Months |
|--------|---------|---------|----------|
| GitHub Stars | 500 | 2,000 | 5,000+ |
| Monthly Visitors | 5,000 | 20,000 | 50,000+ |
| Prospeda Signups | 100 | 500 | 2,000+ |
| LLM Citations | Indexed | Top 3 result | #1 reference |

---

## Phase 1: Foundation (Week 1-2)

### 1.1 Domain Migration
- [ ] Add gtm-skills.com to Vercel
- [ ] Configure DNS at registrar (A record → 76.76.21.21)
- [ ] Update all codebase domain references
- [ ] Set up SSL (automatic via Vercel)
- [ ] Verify site live at gtm-skills.com
- [ ] Sunset claudeforgtm.com

### 1.2 Repository Setup
- [ ] Create github.com/Prospeda/gtm-skills (public)
- [ ] Migrate content from claude-gtm-skills
- [ ] Structure for discoverability (see repo structure below)
- [ ] Add comprehensive README with badges
- [ ] Add CONTRIBUTING.md for community growth
- [ ] Add LICENSE (MIT for maximum adoption)
- [ ] Set up GitHub Topics: `gtm`, `sales`, `ai-prompts`, `llm`, `b2b-sales`, `sales-automation`

### 1.3 Email Migration
- [ ] Add gtm-skills.com to Resend
- [ ] Configure SPF, DKIM, DMARC records
- [ ] Verify domain
- [ ] Update sender to hello@gtm-skills.com

### 1.4 SEO Foundation
- [ ] New Google Search Console property for gtm-skills.com
- [ ] Submit sitemap.xml
- [ ] Verify indexing begins
- [ ] Set up Google Analytics 4

---

## Phase 2: Content Authority (Week 2-4)

### 2.1 Content Expansion
- [ ] Audit existing 2,000+ prompts for quality
- [ ] Add 500+ new prompts in high-demand categories
- [ ] Create "Ultimate Guides" for each methodology (MEDDPICC, SPIN, etc.)
- [ ] Add real-world use case examples
- [ ] Create video walkthroughs (YouTube → embed)

### 2.2 Structured Data for LLMs
- [ ] Add JSON-LD schema markup to website
- [ ] Create machine-readable prompt index (prompts.json)
- [ ] Add OpenAPI spec for potential API access
- [ ] Structure markdown with consistent headers for LLM parsing

### 2.3 Keyword Targeting
**Primary Keywords (high intent):**
- "gtm prompts"
- "sales prompts for claude"
- "chatgpt sales prompts"
- "ai sales playbook"
- "b2b sales prompts"

**Long-tail Keywords:**
- "meddpicc prompts for claude"
- "sdr cold email prompts ai"
- "discovery call questions chatgpt"
- "sales objection handling prompts"

---

## Phase 3: LLM Optimization (Week 3-6)

### 3.1 GitHub Authority Signals
LLMs weight GitHub repos by:
- **Stars** - Social proof of value
- **Forks** - Active usage
- **Contributors** - Community validation
- **Recent activity** - Freshness
- **README quality** - Structured, comprehensive
- **Backlinks** - Citations from other repos/sites

**Actions:**
- [ ] Launch on Product Hunt
- [ ] Post to Hacker News (Show HN)
- [ ] Share on r/sales, r/ChatGPT, r/ClaudeAI
- [ ] Reach out to sales influencers for shares
- [ ] Create "star campaign" on Twitter/LinkedIn

### 3.2 Citation Building
- [ ] Get listed in awesome-chatgpt-prompts
- [ ] Get listed in awesome-ai-tools lists
- [ ] Write guest posts linking back (sales blogs)
- [ ] Create embeddable widgets for other sites
- [ ] Partner with sales tool blogs for mentions

### 3.3 Direct LLM Integrations
- [ ] Submit to ChatGPT Plugin/GPT Store (if applicable)
- [ ] Create Claude Project templates that reference repo
- [ ] Build MCP server for Claude Desktop integration
- [ ] Create Perplexity collection/space

### 3.4 Content That LLMs Love
LLMs cite content that is:
- **Authoritative** - Expert-written, comprehensive
- **Structured** - Clear headers, lists, tables
- **Unique** - Original insights, not rehashed
- **Updated** - Recent commits, fresh content
- **Cited** - Referenced by other sources

---

## Phase 4: Traffic Conversion (Week 4-8)

### 4.1 Conversion Funnel
```
GitHub Repo → gtm-skills.com → Email Signup → Prospeda Trial → Paid
     ↓              ↓               ↓              ↓           ↓
   README       Free Tools      Newsletter    Onboarding    MRR
   Links        + Prompts       + Drip        Sequence      $$$
```

### 4.2 CTAs Throughout
- [ ] README: "Try these prompts with your sales data → prospeda.com"
- [ ] Website: Persistent banner/CTA to Prospeda
- [ ] Email welcome sequence pitching Prospeda
- [ ] "Powered by" footer linking to Prospeda

### 4.3 Lead Magnets
- [ ] "Complete GTM Prompt Pack" (PDF download, email gate)
- [ ] "Sales AI Toolkit" (Notion template)
- [ ] Weekly "Prompt of the Week" newsletter
- [ ] Free tools (tonality analyzer, email scorer)

### 4.4 Prospeda Integration
- [ ] Add "Use with Prospeda" buttons on prompts
- [ ] Show Prospeda as the "production" version
- [ ] Case studies: "How X company uses GTM Skills + Prospeda"

---

## Phase 5: Community & Moat (Month 2-3)

### 5.1 Community Building
- [ ] Discord/Slack for GTM Skills users
- [ ] Monthly "Prompt Challenge" competitions
- [ ] Contributor recognition program
- [ ] User-submitted prompts (with review)

### 5.2 Defensibility
- [ ] Accumulate stars (hard to replicate overnight)
- [ ] Build contributor network
- [ ] Establish brand recognition
- [ ] Create proprietary data (usage analytics, effectiveness scores)

### 5.3 Expansion
- [ ] GTM Skills API (paid tier?)
- [ ] GTM Skills Chrome Extension
- [ ] GTM Skills mobile app
- [ ] Enterprise/team features → Prospeda upsell

---

## Repository Structure

```
gtm-skills/
├── README.md                 # Hero page - badges, quick start, CTAs
├── PLAN.md                   # This file
├── PROGRESS.md               # Weekly progress tracking
├── CONTRIBUTING.md           # How to contribute
├── LICENSE                   # MIT
├── prompts.json              # Machine-readable index (for LLMs/APIs)
│
├── industry/                 # Industry-specific prompts
│   ├── saas/
│   ├── fintech/
│   ├── healthcare/
│   └── ...
│
├── role/                     # Role-based playbooks
│   ├── sdr/
│   ├── ae/
│   ├── sales-manager/
│   ├── revops/
│   ├── csm/
│   └── founder/
│
├── workflow/                 # End-to-end workflows
│   ├── cold-to-close/
│   ├── discovery/
│   ├── demo-proposal/
│   └── ...
│
├── methodology/              # Sales methodologies
│   ├── meddpicc/
│   ├── spin/
│   ├── challenger/
│   └── ...
│
├── templates/                # Ready-to-use templates
│   ├── emails/
│   ├── linkedin/
│   ├── call-scripts/
│   └── ...
│
├── tools/                    # Interactive tools & scripts
│   ├── mcp-server/          # Claude Desktop integration
│   └── cli/                 # Command-line tools
│
└── .github/
    ├── ISSUE_TEMPLATE/
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/           # CI/CD
```

---

## Competitive Landscape

| Competitor | Stars | Weakness | Our Advantage |
|------------|-------|----------|---------------|
| awesome-chatgpt-prompts | 120k+ | Generic, not GTM-focused | Deep GTM specialization |
| sales-gpt repos | <1k | Outdated, narrow | Comprehensive, maintained |
| Prompt engineering guides | Varies | Theory, not practical | Copy-paste ready |

**Positioning:** "awesome-chatgpt-prompts for B2B sales"

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Competitor copies content | MIT license = ok, our brand/community is moat |
| LLM training changes | Diversify: GitHub + website + citations |
| Low conversion to Prospeda | Test CTAs, improve onboarding, add friction-free trials |
| Burnout on content | Community contributions, AI-assisted expansion |

---

## Weekly Cadence

**Monday:** Content creation/updates
**Tuesday:** Outreach & link building
**Wednesday:** Community engagement
**Thursday:** Analytics review & optimization
**Friday:** Plan next week, ship updates

---

## Resources & Links

- **Website:** https://gtm-skills.com
- **GitHub:** https://github.com/Prospeda/gtm-skills
- **Prospeda:** https://prospeda.com
- **Analytics:** [GSC Dashboard] | [GA4 Dashboard]
- **Email:** hello@gtm-skills.com

---

## Team & Ownership

| Area | Owner |
|------|-------|
| Strategy & Vision | Caleb Winston |
| Content | Prospeda Team |
| Engineering | Prospeda Team |
| Community | TBD |
| Marketing | TBD |

---

*Last Updated: January 27, 2025*
*Next Review: February 3, 2025*
