# Frontend Implementation Plan

> **Status:** Ready for Implementation
> **Last Updated:** February 1, 2026
> **Mockup:** See `mockup.html` in repo root

---

## Terminology Guidelines

**IMPORTANT: Avoid "AI" in marketing copy. Use "Agentic" instead.**

| Avoid | Use Instead |
|-------|-------------|
| AI-powered | Agentic |
| AI voice agents | Agentic voice / Agentic calls |
| Voice AI | Voice Templates |
| AI sales | Agentic sales |
| AI assistant | Agent / Agentic workflow |

---

## NEW: Features to Showcase (Weeks 1-8)

| Feature | Status | Route | Priority |
|---------|--------|-------|----------|
| API + llms.txt | Live | `/developers`, `/openapi.json`, `/llms.txt` | HIGH |
| Browser Extension | Live | `/download` | HIGH |
| Leaderboard | Live | `/leaderboard` | HIGH |
| HubSpot Integration | Live | `/integrations/hubspot` | MEDIUM |
| Revenue Attribution | Live | `/leaderboard/impact` | MEDIUM |
| Voice Templates | Live | `/voice-templates` | HIGH |
| Contributors | Live | `/contributors` | MEDIUM |
| Certifications | Live | `/certifications` | HIGH |

---

## Phase 1: Homepage New Sections

### 1.1 Ecosystem Bar
**File:** `src/components/home/ecosystem-bar.tsx`

```tsx
// Thin bar below hero showing all features with colored icons
// Layout: flex-wrap justify-center gap-8
// Items: icon + label pairs
// Colors: orange (prompts), blue (extension), violet (voice),
//         amber (leaderboard), teal (CRM), emerald (API), purple (certifications)
```

**Tasks:**
- [ ] Create `ecosystem-bar.tsx` component
- [ ] Add icons from lucide-react
- [ ] Style with `py-4 bg-zinc-900/50 border-y border-zinc-800`
- [ ] Import and place in `src/app/page.tsx` below hero

---

### 1.2 Tools & Integrations Grid
**File:** `src/components/home/tools-grid.tsx`

**Cards:**
| Card | Gradient | Link |
|------|----------|------|
| Browser Extension | `blue-500 → cyan-500` | `/download` |
| Voice Templates | `violet-500 → purple-500` | `/voice-templates` |
| HubSpot Integration | `teal-500 → cyan-500` | `/integrations/hubspot` |
| REST API | `emerald-500 → teal-500` | `/developers` |

**Tasks:**
- [ ] Create `tools-grid.tsx` component
- [ ] Create individual `ToolCard` sub-component
- [ ] Add hover animations with `group-hover:scale-110`
- [ ] Import and place in `src/app/page.tsx`

---

### 1.3 Leaderboard Preview Section
**File:** `src/components/home/leaderboard-preview.tsx`

```tsx
// Two-column layout: left = description + stats, right = terminal mockup
// Stats: Total Votes, Prompts Submitted, Outcomes Reported
// Terminal: top 3 prompts with scores
```

**Tasks:**
- [ ] Create `leaderboard-preview.tsx` component
- [ ] Create terminal mockup with red/yellow/green dots
- [ ] Fetch top 3 prompts from `/api/v1/leaderboard?limit=3`
- [ ] Add stats boxes with `bg-zinc-900/50 border border-zinc-800`
- [ ] Style section with `bg-gradient-to-b from-amber-500/5`
- [ ] Import and place in `src/app/page.tsx`

---

### 1.4 Voice Showcase Section
**File:** `src/components/home/voice-showcase.tsx`

**Tasks:**
- [ ] Create `voice-showcase.tsx` component
- [ ] Create animated waveform with CSS keyframes
- [ ] Add script preview in monospace
- [ ] Add feature checklist with violet checkmarks
- [ ] CTA button with violet gradient
- [ ] Import and place in `src/app/page.tsx`

---

### 1.5 Developers Section
**File:** `src/components/home/developers-section.tsx`

**Tasks:**
- [ ] Create `developers-section.tsx` component
- [ ] Create code block with syntax highlighting (manual spans)
- [ ] Add copy button functionality
- [ ] Add resource buttons row (API Docs, OpenAPI, llms.txt, GitHub)
- [ ] Style section with `bg-gradient-to-b from-emerald-500/5`
- [ ] Import and place in `src/app/page.tsx`

---

### 1.6 NEW: Certification Promo Section
**File:** `src/components/home/certification-promo.tsx`

```tsx
// Highlight the certification program
// Show badge preview, key stats (free, 1hr, recognized)
// CTA to /certifications
```

**Tasks:**
- [ ] Create `certification-promo.tsx` component
- [ ] Show Level 1, 2, 3 badges preview
- [ ] Add "Free • 1 Hour • Recognized" badges
- [ ] CTA: "Get Certified Free"
- [ ] Style with violet gradient

---

### 1.7 NEW: Contributors Spotlight
**File:** `src/components/home/contributors-spotlight.tsx`

```tsx
// Show top 3 contributors with avatars and stats
// Link to /contributors
```

**Tasks:**
- [ ] Create `contributors-spotlight.tsx` component
- [ ] Fetch top 3 from `/api/v1/contributors/leaderboard`
- [ ] Display name, avatar, prompt count, vote count
- [ ] CTA: "Join the Community"

---

### 1.8 Update Hero Copy
**File:** `src/app/page.tsx`

**Changes:**
- [ ] Update headline to "The GTM Operating System for Agentic Sales"
- [ ] Update subheadline to mention all features
- [ ] Add GitHub star count badge (fetch from GitHub API)

---

## Phase 2: Navigation Updates

### 2.1 Add Navigation Dropdowns
**File:** `src/components/header.tsx`

**New Nav Items:**
```tsx
const navItems = [
  { label: 'Prompts', href: '/prompts' },
  {
    label: 'Tools',
    href: '/tools',
    children: [
      { label: 'Browser Extension', href: '/download', icon: Globe },
      { label: 'Voice Templates', href: '/voice-templates', icon: Mic },
      { label: 'HubSpot', href: '/integrations/hubspot', icon: Link },
      { label: 'MCP Server', href: '/free-tools/mcp-server', icon: Bot },
    ]
  },
  {
    label: 'Community',
    href: '/community',
    children: [
      { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
      { label: 'Contributors', href: '/contributors', icon: Users },
      { label: 'Submit Prompt', href: '/leaderboard/submit', icon: Plus },
    ]
  },
  {
    label: 'Learn',
    href: '/certifications',
    children: [
      { label: 'Certifications', href: '/certifications', icon: Award },
      { label: 'Tutorials', href: '/tutorials', icon: BookOpen },
      { label: 'Agentic BDR', href: '/agentic-bdr', icon: Bot },
    ]
  },
  {
    label: 'Developers',
    href: '/developers',
    children: [
      { label: 'API Docs', href: '/developers', icon: Code },
      { label: 'OpenAPI Spec', href: '/openapi.json', icon: FileCode },
      { label: 'llms.txt', href: '/llms.txt', icon: Bot },
      { label: 'GitHub', href: 'https://github.com/gtm-skills/gtm', icon: Github },
    ]
  },
];
```

**Tasks:**
- [ ] Create dropdown component or use Radix NavigationMenu
- [ ] Add Tools dropdown with 4 items
- [ ] Add Community dropdown with 3 items
- [ ] Add Learn dropdown with 3 items
- [ ] Add Developers dropdown with 4 items
- [ ] Add GitHub star count badge in nav
- [ ] Test mobile menu

---

## Phase 3: Footer Updates

### 3.1 Expand Footer Sections
**File:** `src/components/footer.tsx`

**New Sections:**
```tsx
const footerSections = [
  {
    title: 'Prompts',
    links: [
      { label: 'By Role', href: '/role' },
      { label: 'By Industry', href: '/industry' },
      { label: 'By Methodology', href: '/methodology' },
      { label: 'All Prompts', href: '/prompts' },
    ]
  },
  {
    title: 'Tools',
    links: [
      { label: 'Browser Extension', href: '/download' },
      { label: 'Voice Templates', href: '/voice-templates' },
      { label: 'HubSpot', href: '/integrations/hubspot' },
      { label: 'MCP Server', href: '/free-tools/mcp-server' },
    ]
  },
  {
    title: 'Community',
    links: [
      { label: 'Leaderboard', href: '/leaderboard' },
      { label: 'Contributors', href: '/contributors' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Submit Prompt', href: '/leaderboard/submit' },
    ]
  },
  {
    title: 'Developers',
    links: [
      { label: 'API Docs', href: '/developers' },
      { label: 'OpenAPI Spec', href: '/openapi.json' },
      { label: 'llms.txt', href: '/llms.txt' },
      { label: 'GitHub', href: 'https://github.com/gtm-skills/gtm' },
    ]
  },
];
```

**Tasks:**
- [ ] Update footer with 5-column grid (logo + 4 sections)
- [ ] Add social links (Twitter, LinkedIn, GitHub)
- [ ] Add "Made with ♥ by Prospeda" tagline

---

## Phase 4: New/Updated Pages

### 4.1 Tools Hub Page
**File:** `src/app/tools/page.tsx`

**Content:**
- Hero with "GTM Skills Tools" heading
- 4-card grid (same as homepage tools section but larger)
- Coming soon section for Salesforce, Slack, etc.

**Tasks:**
- [ ] Create `src/app/tools/page.tsx`
- [ ] Reuse ToolCard component from Phase 1
- [ ] Add "Coming Soon" cards for future integrations

---

### 4.2 Developers Hub Page
**File:** `src/app/developers/page.tsx`

**Content:**
- Hero with "Build With GTM Skills" heading
- Quick Start code example
- API endpoints table
- llms.txt explanation
- SDK coming soon section

**Tasks:**
- [ ] Create `src/app/developers/page.tsx`
- [ ] Add interactive code examples
- [ ] Add API endpoint reference table
- [ ] Add llms.txt section with explanation

---

### 4.3 Download/Extension Page (EXISTS - needs update)
**File:** `src/app/download/page.tsx`

**Updates:**
- [ ] Add extension screenshots/mockups
- [ ] Add feature descriptions for LinkedIn + Gmail
- [ ] Add installation steps
- [ ] Add Chrome Web Store link (when available)

---

### 4.4 Contributors Page (EXISTS)
**File:** `src/app/contributors/page.tsx`

**Status:** ✅ Complete

---

### 4.5 Certifications Page (EXISTS)
**File:** `src/app/certifications/page.tsx`

**Status:** ✅ Complete

---

### 4.6 Community Hub Page
**File:** `src/app/community/page.tsx`

**Content:**
- Links to Leaderboard, Contributors, Submit
- Community stats
- Call to join

**Tasks:**
- [ ] Create `src/app/community/page.tsx`
- [ ] Add stats from leaderboard
- [ ] Add contributor spotlight
- [ ] Add join CTA

---

## File Structure Summary

```
src/
├── app/
│   ├── page.tsx                    # UPDATE - add new sections
│   ├── tools/
│   │   └── page.tsx                # NEW
│   ├── developers/
│   │   └── page.tsx                # NEW
│   ├── community/
│   │   └── page.tsx                # NEW
│   ├── download/
│   │   └── page.tsx                # UPDATE
│   ├── contributors/
│   │   └── page.tsx                # EXISTS
│   └── certifications/
│       ├── page.tsx                # EXISTS
│       ├── [slug]/
│       │   └── page.tsx            # EXISTS
│       └── [slug]/[module]/
│           └── page.tsx            # EXISTS
├── components/
│   ├── header.tsx                  # UPDATE - add dropdowns
│   ├── footer.tsx                  # UPDATE - add sections
│   └── home/                       # NEW directory
│       ├── ecosystem-bar.tsx       # NEW
│       ├── tools-grid.tsx          # NEW
│       ├── leaderboard-preview.tsx # NEW
│       ├── voice-showcase.tsx      # NEW
│       ├── developers-section.tsx  # NEW
│       ├── certification-promo.tsx # NEW
│       └── contributors-spotlight.tsx # NEW
```

---

## Implementation Order

| Priority | Task | Files |
|----------|------|-------|
| 1 | Ecosystem bar | `ecosystem-bar.tsx`, `page.tsx` |
| 2 | Tools grid | `tools-grid.tsx`, `page.tsx` |
| 3 | Leaderboard preview | `leaderboard-preview.tsx`, `page.tsx` |
| 4 | Voice showcase | `voice-showcase.tsx`, `page.tsx` |
| 5 | Developers section | `developers-section.tsx`, `page.tsx` |
| 6 | Certification promo | `certification-promo.tsx`, `page.tsx` |
| 7 | Contributors spotlight | `contributors-spotlight.tsx`, `page.tsx` |
| 8 | Update hero copy | `page.tsx` |
| 9 | Navigation dropdowns | `header.tsx` |
| 10 | Footer updates | `footer.tsx` |
| 11 | Tools hub page | `tools/page.tsx` |
| 12 | Developers hub page | `developers/page.tsx` |
| 13 | Community hub page | `community/page.tsx` |
| 14 | Update download page | `download/page.tsx` |

---

## Testing Checklist

- [ ] All new sections render correctly
- [ ] All links work
- [ ] Mobile responsive
- [ ] Hover states work
- [ ] Animations smooth
- [ ] Leaderboard data fetches correctly
- [ ] GitHub star count updates
- [ ] Dark mode consistent
- [ ] No console errors
- [ ] All new routes accessible

---

## Dependencies

No new dependencies required. Uses existing:
- `lucide-react` for icons
- `tailwindcss` for styling
- `@/components/ui/*` for buttons, badges

Optional enhancement:
- `@radix-ui/react-navigation-menu` for nav dropdowns (if needed)

---

*Created: February 1, 2026*
*Updated: February 1, 2026 (Added Week 7-8 features)*
