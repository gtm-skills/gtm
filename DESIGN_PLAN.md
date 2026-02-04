# GTM Skills Design Improvement Plan

> Goal: 10x the design quality, usability, and conversion rate

## Executive Summary

Transform GTM Skills from a functional MVP to a polished, conversion-optimized platform that builds trust, drives GitHub stars, and converts visitors to Prospeda customers.

---

## Phase 1: Foundation (Critical Fixes)

### 1.1 Design System Cleanup
**Problem:** 100+ lines of `!important` CSS overrides fighting Tailwind
**Solution:**
- [ ] Refactor components to be theme-aware from the start
- [ ] Use CSS variables consistently (`--surface-1`, `--text-primary`, etc.)
- [ ] Remove all `!important` overrides in globals.css
- [ ] Use Tailwind's `dark:` variant properly throughout

### 1.2 Typography Hierarchy
**Problem:** Inconsistent font sizes, weights, and spacing
**Solution:**
- [ ] Define 5 heading levels with clear visual hierarchy
- [ ] Standardize body text (16px), small text (14px), micro text (12px)
- [ ] Add proper line heights (1.5 for body, 1.2 for headings)
- [ ] Use Inter or Geist consistently

### 1.3 Spacing System
**Problem:** Inconsistent padding/margins across components
**Solution:**
- [ ] Define spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96
- [ ] Standardize section padding (96px desktop, 48px mobile)
- [ ] Standardize card padding (24px)
- [ ] Consistent gap between elements

---

## Phase 2: Homepage Redesign

### 2.1 Hero Section
**Current:** Dense, overwhelming, unclear value prop
**Target:** Clean, focused, single CTA

```
Improvements:
- [ ] One headline, one subhead, one CTA
- [ ] Remove feature cards from hero (move to features section)
- [ ] Add subtle animated gradient or particles (tasteful)
- [ ] Social proof right in hero ("2,500+ sales teams use GTM Skills")
- [ ] "Star on GitHub" as primary CTA (drives our core metric)
```

### 2.2 Social Proof Section (NEW)
```
Add immediately after hero:
- [ ] GitHub stars count (live badge)
- [ ] Company logos ("Used by teams at...")
- [ ] Quick testimonial carousel (3 max)
```

### 2.3 Features Section
```
Improvements:
- [ ] 3-column grid: Prompts | Agents | Tools
- [ ] Icon + title + 2-line description
- [ ] Clear CTAs to each section
- [ ] Subtle hover animations
```

### 2.4 Interactive Demo (NEW)
```
Add engaging element:
- [ ] Embedded prompt playground OR
- [ ] Live terminal showing agent in action OR
- [ ] Before/after comparison (generic outreach vs GTM Skills outreach)
```

### 2.5 Email Capture (NEW)
```
Purpose: Build owned audience for launches
- [ ] Newsletter signup above footer
- [ ] Value prop: "Weekly GTM AI tips. No spam."
- [ ] Optional: Exit-intent popup (test)
```

---

## Phase 3: Navigation & Information Architecture

### 3.1 Header Improvements
- [ ] Add search (Cmd+K) with fuzzy prompt search
- [ ] Active state for current section
- [ ] Sticky header with subtle shadow on scroll
- [ ] Mobile: Full-screen menu with search

### 3.2 Footer Improvements
- [ ] Add newsletter signup form
- [ ] Add legal links (Privacy, Terms, License)
- [ ] Reduce link density (group related items)
- [ ] Add "Built by Prospeda" with clear CTA

### 3.3 Breadcrumbs
- [ ] Add to all detail pages (prompts, tonalities, tutorials)
- [ ] Improve back-navigation on mobile

---

## Phase 4: Key Page Improvements

### 4.1 Prompts Page
- [ ] Add search/filter bar (pinned)
- [ ] Category chips for quick filtering
- [ ] "Popular" or "Trending" section
- [ ] Prompt preview cards with copy button

### 4.2 Tonalities Page
- [ ] Clear "Premium vs Free" visual distinction
- [ ] Star gate should feel rewarding, not blocking
- [ ] Add preview snippets for premium tonalities
- [ ] Comparison table between tonalities

### 4.3 Agents Page
- [ ] Card-based layout instead of accordion
- [ ] Visual flow showing how agents work together
- [ ] "Try it" buttons linking to playground
- [ ] Mobile-optimized code snippets

### 4.4 Developers Page
- [ ] Complete API documentation
- [ ] Interactive API playground (Swagger UI or custom)
- [ ] Code examples in multiple languages
- [ ] Authentication guide

### 4.5 OpenClaw Page
- [ ] Prerequisites checklist
- [ ] Installation wizard/guide
- [ ] Troubleshooting FAQ
- [ ] Video walkthrough

---

## Phase 5: Conversion Optimization

### 5.1 GitHub Star Optimization
```
Current: Star gate on tonalities
Expand to:
- [ ] Star prompt on first prompt copy
- [ ] Star reminder in header (subtle)
- [ ] Star milestone celebrations ("You helped us hit 1,000!")
- [ ] "Star to bookmark" framing
```

### 5.2 Prospeda Conversion Funnel
```
Current: Weak/hidden
Target: Clear path to paid product
- [ ] "Powered by Prospeda" in footer
- [ ] "Want this built into your CRM?" CTAs
- [ ] Case studies showing Prospeda integration
- [ ] "Book a demo" button in header (for enterprise)
```

### 5.3 User Input Collection
```
Purpose: Qualify leads, improve product
- [ ] "Which role are you?" on first visit (optional)
- [ ] Feedback widget on every page
- [ ] "Request a prompt" feature
- [ ] Quick surveys after key actions
```

---

## Phase 6: Polish & Delight

### 6.1 Micro-interactions
- [ ] Button hover states (lift + shadow)
- [ ] Card hover (subtle scale + glow)
- [ ] Copy button feedback (checkmark animation)
- [ ] Page transitions (fade)

### 6.2 Loading States
- [ ] Skeleton screens instead of spinners
- [ ] Progressive image loading
- [ ] Optimistic UI updates

### 6.3 Empty States
- [ ] Custom illustrations for no-results
- [ ] Helpful suggestions when search fails
- [ ] Encouraging copy

### 6.4 Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation for all interactions
- [ ] Screen reader testing
- [ ] Reduced motion support

---

## Implementation Priority

### Immediate (This Week)
1. Hero section simplification
2. GitHub star count in header
3. Newsletter signup in footer
4. Fix light mode properly (no !important hacks)

### Short-term (Next 2 Weeks)
1. Search functionality (Cmd+K)
2. Prompts page filtering
3. Social proof section
4. Mobile navigation improvements

### Medium-term (This Month)
1. Interactive demo/playground
2. Developer docs completion
3. Conversion funnel optimization
4. Micro-interactions

### Long-term (Ongoing)
1. A/B testing framework
2. Analytics-driven improvements
3. User research
4. Accessibility audit

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| GitHub Stars | ~50 | 1,000 |
| Monthly Visitors | TBD | 10,000 |
| Prompt Copies/Month | TBD | 5,000 |
| Newsletter Subscribers | 0 | 500 |
| Prospeda Demo Requests | TBD | 50/month |

---

## Design References

Modern SaaS sites to reference:
- **Linear** - Clean, minimal, great animations
- **Vercel** - Developer-focused, excellent docs
- **Raycast** - Command palette, keyboard-first
- **Clerk** - Auth UI patterns, great onboarding
- **Resend** - Email-focused, beautiful typography

---

## Notes

- All changes should be mobile-first
- Performance budget: LCP < 2.5s, CLS < 0.1
- Test in both light and dark modes
- Get user feedback before major changes
