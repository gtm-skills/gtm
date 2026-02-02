# GTM Skills Migration Plan

**Goal:** Move gtm-skills to standalone public GitHub repo + add hardcore intel commands

**Target:** `github.com/gtm-skills/gtm` (org: gtm-skills)

---

## Phase 1: Content Update (SKILL.md Intel Commands)

### Tasks

- [ ] Add Intel commands section to `openclaw-skills/gtm/SKILL.md`
- [ ] Add Intel examples (Reddit mining, Sitemap surveillance)
- [ ] Update metadata to remove `curl` requirement (not actually required)
- [ ] Verify all 12 skill files are production-ready

### Intel Commands to Add

```markdown
### Intel

Competitive surveillance. The stuff that makes money.

| Command | What it does |
|---------|--------------|
| `gtm sitemap [domain]` | Fetch sitemap.xml, diff against last check, surface new pages |
| `gtm sitemap --watch [domain]` | Monitor daily, alert on new URLs |
| `gtm pricing [domain]` | Snapshot /pricing page, alert on changes |
| `gtm jobs [company]` | Pull job postings → hiring SDRs = budget, hiring AI = pivot |
| `gtm techstack [domain]` | Detect stack via headers, scripts, DNS |
| `gtm reddit [subreddit] [query]` | Fetch threads as JSON, extract pain points + leads |
| `gtm hn [thread-id]` | Pull HN thread, identify buyers in comments |
| `gtm producthunt [launch]` | Commenters = early adopters with budget |
| `gtm g2 [product]` | Scrape reviews → pain points + reviewer companies |
| `gtm funding [industry]` | Recent raises in your ICP → money to spend |
| `gtm github [repo] --contributors` | Who's building with it = potential customers |
```

### Intel Examples to Add

```markdown
## Intel Examples

### Reddit Lead Mining

```
gtm reddit /r/salesforce "frustrated with"

Found 23 pain point threads (last 30 days):

1. "Frustrated with Salesforce reporting" - u/revops_mike
   Company: Likely mid-market (mentions 50 reps)
   Pain: Report builder, dashboard limitations

2. "Anyone else frustrated with CPQ?" - u/sales_ops_sarah
   Company: Mentions "Series B startup"
   Pain: Quote approval workflow

[Export CSV] [Enrich All] [Draft Outreach]
```

### Sitemap Surveillance

```
gtm sitemap --watch competitor.com

Changes detected (Jan 28):

NEW PAGES:
+ /products/enterprise-plan      ← moving upmarket
+ /integrations/snowflake        ← partnership incoming
+ /customers/fortune-500         ← case study prep
+ /careers/ai-engineer           ← building AI team

REMOVED:
- /pricing/startup-plan          ← killing lower tier?

[Slack alert] [Deep research] [Draft battlecard]
```

### Job Signal Analysis

```
gtm jobs Acme Corp

Acme Corp - 47 open roles

SIGNALS:
- 12 SDR roles posted this month → scaling outbound, has budget
- 3 "AI/ML Engineer" roles → building AI, potential buyer
- 1 "VP RevOps" role → leadership change, process overhaul coming
- 0 CS roles → not focused on retention

VERDICT: Hot prospect. New RevOps VP = 90-day mandate to buy tools.

[Research deeper] [Find VP RevOps] [Draft outreach]
```

### Funding Intel

```
gtm funding "sales tech" --raised "last 30 days"

12 companies raised in Sales Tech (last 30 days):

1. ScaleAI - $50M Series C
   What they do: AI training data
   Signal: Will need sales tools to spend that $$$

2. Ramp - $25M Series B
   What they do: Expense management
   Signal: Hiring 8 AEs right now

[Export list] [Enrich all] [Build sequence]
```
```

---

## Phase 2: GitHub Migration

### Option A: New Org (Recommended)

Create `github.com/gtm-skills` org with repo `gtm`

**Pros:**
- Clean namespace: `gtm-skills/gtm`
- Matches install command: `npx clawdhub install gtm-skills/gtm`
- Professional, product-focused
- Separate from Prospeda corp identity

**Cons:**
- Need to set up new org
- Transfer/redirect from old repo

### Option B: Keep Prospeda Org

Keep at `github.com/Prospeda/gtm-skills`

**Pros:**
- Already exists
- No migration needed

**Cons:**
- Install command would be `prospeda/gtm-skills` (less clean)
- Tied to company vs product brand

### Migration Tasks

- [ ] Create GitHub org: `gtm-skills`
- [ ] Create repo: `gtm-skills/gtm`
- [ ] Extract `openclaw-skills/` contents to new repo root
- [ ] Set up repo with:
  - [ ] MIT License
  - [ ] README.md (install instructions + quick start)
  - [ ] CONTRIBUTING.md
  - [ ] GitHub Actions for linting markdown
  - [ ] Issue templates
- [ ] Update all references:
  - [ ] SKILL.md GitHub links
  - [ ] gtm-skills.com links
  - [ ] clawdhub registry (if needed)
- [ ] Set up redirect from old Prospeda repo (if keeping)
- [ ] Verify `npx clawdhub install gtm-skills/gtm` works

---

## Phase 3: Verification

### Checklist

- [ ] `npx clawdhub install gtm-skills/gtm` installs successfully
- [ ] Installed package is <100KB (lean, no bloat)
- [ ] All commands documented in SKILL.md
- [ ] GitHub repo is public
- [ ] README has quick start that works
- [ ] gtm-skills.com/openclaw links to correct repo
- [ ] API docs at gtm-skills.com/developers accurate

### Size Verification

```bash
# After install, verify size
du -sh ~/.openclaw/skills/gtm-skills/gtm
# Should be <10KB (just SKILL.md)
```

---

## New Repo Structure

```
gtm-skills/gtm/
├── README.md           # Quick start, install, examples
├── LICENSE             # MIT
├── CONTRIBUTING.md     # How to contribute
├── SKILL.md            # Main skill file (what gets installed)
├── skills/             # Individual skill modules
│   ├── gtm-cold-email/SKILL.md
│   ├── gtm-discovery/SKILL.md
│   ├── gtm-linkedin/SKILL.md
│   ├── gtm-meeting-prep/SKILL.md
│   ├── gtm-objections/SKILL.md
│   ├── gtm-research/SKILL.md
│   ├── gtm-sequences/SKILL.md
│   ├── gtm-voice/SKILL.md
│   ├── gtm-battlecards/SKILL.md
│   └── gtm-prompts/SKILL.md
└── .github/
    ├── workflows/
    │   └── lint.yml
    └── ISSUE_TEMPLATE/
        ├── bug.md
        └── feature.md
```

---

## Timeline

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Content Update | COMPLETE | Added intel commands + examples to SKILL.md |
| Phase 2: GitHub Migration | COMPLETE | Live at github.com/gtm-skills/gtm |
| Phase 3: Verification | NOT STARTED | Test install, verify size |

---

## Commands to Execute

### Phase 1
```bash
# Update SKILL.md (manual edit or script)
# Verify size stays under 10KB
wc -c openclaw-skills/gtm/SKILL.md
```

### Phase 2
```bash
# Create new repo structure
mkdir -p gtm-repo-new
cp openclaw-skills/gtm/SKILL.md gtm-repo-new/
cp openclaw-skills/README.md gtm-repo-new/
cp -r openclaw-skills/gtm-* gtm-repo-new/skills/

# Init git
cd gtm-repo-new
git init
git remote add origin git@github.com:gtm-skills/gtm.git
git add .
git commit -m "Initial commit: GTM Skills for OpenClaw"
git push -u origin main
```

### Phase 3
```bash
# Test install
npx clawdhub install gtm-skills/gtm

# Verify size
du -sh ~/.openclaw/skills/gtm-skills/
```

---

**Last Updated:** 2025-02-01
**Owner:** @calebwinston
