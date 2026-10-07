/**
 * Skills catalog — single source of truth for the marketplace.
 *
 * Static TS on purpose: pages are SSG, the catalog is typed at build, and it
 * versions with the rest of the content in git. Supabase only holds what must
 * be dynamic (products/Stripe mapping, entitlements, install counts).
 *
 * Premium SKILL.md content is NOT in this repo. It lives in the private
 * `gtm-skills/premium` repo and is fetched server-side (src/lib/skill-content.ts)
 * only for entitled users. Everything in this public repo is MIT.
 */

export type Agent =
  | 'claude-code'
  | 'claude-desktop'
  | 'cursor'
  | 'codex'
  | 'gemini-cli'
  | 'openclaw'
  | 'windsurf';

export type SkillCategory =
  | 'prospecting'
  | 'outreach'
  | 'discovery'
  | 'closing'
  | 'revops'
  | 'founder'
  | 'agents'
  | 'tonality'
  | 'tools';

export type Role = 'sdr' | 'ae' | 'manager' | 'revops' | 'csm' | 'founder' | 'all';

export type KitId = 'sdr-kit' | 'ae-kit' | 'revops-kit' | 'founder-kit';
export type ProductId = KitId | 'full-bundle' | 'pro';

export type Tier = 'free' | 'premium';

export interface Skill {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: SkillCategory;
  role: Role[];
  tier: Tier;
  /** Kits this skill ships in. Empty for free skills. Bundle implies all. */
  kits: KitId[];
  version: string;
  agents: Agent[];
  /** ISO date the skill was last run end-to-end against the listed agents. */
  lastTested: string;
  whatYouGet: string[];
  goodFit: string[];
  notFor: string[];
  /** Paths under /public, e.g. /skills/scout-pro/1.png. Empty until captured. */
  previewImages: string[];
  icon: { lucide: string; hue: number };
  /** Path inside the content repo (private for premium, public for free). */
  contentPath: string;
  /** File manifest relative to contentPath. First entry must be SKILL.md. */
  files: string[];
  relatedSlugs: string[];
  featured?: boolean;
  seo: { title: string; description: string; keywords: string[] };
}

export interface Kit {
  id: ProductId;
  name: string;
  tagline: string;
  description: string;
  kind: 'kit' | 'bundle' | 'subscription';
  priceCents: number;
  /** Billing interval for subscriptions. */
  interval?: 'month' | 'year';
  /** Launch price while seats remain. */
  launchPriceCents?: number;
  launchSeatLimit?: number;
  skillSlugs: string[];
  highlight?: boolean;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const CATEGORIES: Record<SkillCategory, { name: string; description: string; hue: number }> = {
  prospecting: { name: 'Prospecting', description: 'Find and qualify the right accounts.', hue: 28 },
  outreach: { name: 'Outreach', description: 'Cold email, LinkedIn, sequences that get replies.', hue: 350 },
  discovery: { name: 'Discovery', description: 'Run calls that surface pain and build urgency.', hue: 210 },
  closing: { name: 'Closing', description: 'Multi-thread, negotiate, and get to signature.', hue: 150 },
  revops: { name: 'RevOps', description: 'Pipeline hygiene, forecasting, CRM operations.', hue: 260 },
  founder: { name: 'Founder-led', description: 'First customers, design partners, selling before a sales team.', hue: 45 },
  agents: { name: 'Agent Fleet', description: 'Autonomous teammates that run the motion end to end.', hue: 190 },
  tonality: { name: 'Tonality', description: 'Write in a specific voice.', hue: 320 },
  tools: { name: 'Tools', description: 'MCP servers, integrations, infrastructure.', hue: 95 },
};

export const AGENTS: Record<Agent, { name: string; installDir: string }> = {
  'claude-code': { name: 'Claude Code', installDir: '.claude/skills/<slug>/' },
  'claude-desktop': { name: 'Claude Desktop', installDir: 'Project knowledge' },
  cursor: { name: 'Cursor', installDir: '.cursor/rules/<slug>.mdc' },
  codex: { name: 'Codex', installDir: 'AGENTS.md (section)' },
  'gemini-cli': { name: 'Gemini CLI', installDir: '.gemini/skills/<slug>/' },
  openclaw: { name: 'OpenClaw', installDir: '~/.openclaw/skills/<slug>/' },
  windsurf: { name: 'Windsurf', installDir: '.windsurf/rules/<slug>.md' },
};

const CORE_AGENTS: Agent[] = ['claude-code', 'cursor', 'codex', 'gemini-cli', 'openclaw'];
const TESTED = '2026-10-06';

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skills: Skill[] = [
  // ------------------------------------------------------------- FREE (5)
  {
    id: 'scout',
    slug: 'scout',
    name: 'Scout',
    tagline: 'Research agent that finds prospects and spots timing signals.',
    description:
      'Scout is the research teammate from the open-source OpenClaw fleet. Give it a company or a list and it returns an account brief: who to talk to, what changed recently, and why now. It never ends a turn without a next step.',
    category: 'prospecting',
    role: ['sdr', 'ae', 'founder'],
    tier: 'free',
    kits: [],
    version: '1.2.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: ['SKILL.md persona with research workflow', 'Account brief template', 'Signal checklist (hiring, funding, leadership change)'],
    goodFit: ['SDRs doing account research before outreach', 'Founders qualifying inbound', 'Anyone trying the fleet before buying Pro'],
    notFor: ['Teams needing CRM write-back (see HubSpot CRM Ops)', 'Deep intent-data enrichment at scale'],
    previewImages: [],
    icon: { lucide: 'Radar', hue: 28 },
    contentPath: 'openclaw-skills/scout',
    files: ['SKILL.md'],
    relatedSlugs: ['scout-pro', 'signal-based-prospecting', 'gtm-mcp-server'],
    featured: false,
    seo: {
      title: 'Scout — Free Sales Research Agent Skill for Claude Code',
      description: 'Open-source prospect research agent. Account briefs, buyer mapping, timing signals. Install in Claude Code, Cursor, Codex or OpenClaw.',
      keywords: ['sales research agent', 'claude code skill', 'account research'],
    },
  },
  {
    id: 'gtm-mcp-server',
    slug: 'gtm-mcp-server',
    name: 'GTM MCP Server',
    tagline: '18 sales tools for Claude, including live HubSpot CRM.',
    description:
      'The open-source MCP server behind gtm-skills.com. Company research, cold email drafting, objection handling, call prep, plus 8 HubSpot tools and 6 interactive UIs. One npx command.',
    category: 'tools',
    role: ['all'],
    tier: 'free',
    kits: [],
    version: '0.9.0',
    agents: ['claude-code', 'claude-desktop', 'cursor'],
    lastTested: TESTED,
    whatYouGet: ['npx gtm-mcp-server', '18 tools, 6 agentic workflows', 'HubSpot CRM read/write (API key)'],
    goodFit: ['Claude Desktop and Claude Code users who want sales tools in-chat', 'HubSpot shops'],
    notFor: ['Salesforce-only teams (coming)', 'Non-MCP agents'],
    previewImages: [],
    icon: { lucide: 'Plug', hue: 95 },
    contentPath: 'mcp-server',
    files: ['README.md'],
    relatedSlugs: ['hubspot-crm-ops', 'scout', 'pipeline-inspector'],
    featured: false,
    seo: {
      title: 'GTM MCP Server for Claude — 18 Sales Tools + HubSpot CRM (Free)',
      description: 'Install with npx gtm-mcp-server. Company research, email drafting, objection handling, HubSpot CRM tools and interactive UIs inside Claude.',
      keywords: ['gtm mcp', 'gtm mcp server', 'claude mcp sales', 'hubspot mcp'],
    },
  },
  {
    id: 'cold-email-fundamentals',
    slug: 'cold-email-fundamentals',
    name: 'Cold Email Fundamentals',
    tagline: 'The one-email skill. Observation, relevance, ask.',
    description:
      'A tight skill that writes a single cold email the way top SDRs do: one observation about the account, one line of relevance, one low-friction ask. Under 80 words. No fluff, no "I hope this finds you well."',
    category: 'outreach',
    role: ['sdr', 'founder'],
    tier: 'free',
    kits: [],
    version: '1.0.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: ['SKILL.md with the 3-beat structure', '12 worked examples by industry', 'Subject line rules'],
    goodFit: ['First cold emails', 'Founders doing their own outbound'],
    notFor: ['Multi-step sequences (see Cold Email Sequences)'],
    previewImages: [],
    icon: { lucide: 'Mail', hue: 350 },
    contentPath: 'skills/cold-email-fundamentals',
    files: ['SKILL.md', 'references/examples.md'],
    relatedSlugs: ['cold-email-sequences', 'hemingway-tonality', 'scout'],
    seo: {
      title: 'Cold Email Fundamentals — Free Claude Code Skill',
      description: 'Write a cold email that gets replies: one observation, one relevance line, one ask. Free skill for Claude Code, Cursor and Codex.',
      keywords: ['cold email prompt', 'cold email skill', 'sdr claude'],
    },
  },
  {
    id: 'hemingway-tonality',
    slug: 'hemingway-tonality',
    name: 'Hemingway Tonality',
    tagline: 'Short sentences. Plain words. No adjectives you don’t need.',
    description:
      'Rewrites any sales copy in a declarative, stripped-down register. Kills hedges, filler and stacked modifiers. Useful as a final pass on emails, LinkedIn posts and proposals.',
    category: 'tonality',
    role: ['all'],
    tier: 'free',
    kits: [],
    version: '1.0.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: ['SKILL.md rewrite rules', 'Before/after examples'],
    goodFit: ['Anyone whose emails run long', 'Executive-facing copy'],
    notFor: ['Warm, narrative-heavy nurture content'],
    previewImages: [],
    icon: { lucide: 'Type', hue: 320 },
    contentPath: 'skills/hemingway-tonality',
    files: ['SKILL.md'],
    relatedSlugs: ['cold-email-fundamentals', 'cold-email-sequences'],
    seo: {
      title: 'Write Sales Emails Like Hemingway — Free Claude Skill',
      description: 'A tonality skill that cuts your sales copy to the bone. Free for Claude Code, Cursor, Codex, Gemini CLI.',
      keywords: ['hemingway writing style prompt', 'sales email tone'],
    },
  },
  {
    id: 'meddic-discovery-lite',
    slug: 'meddic-discovery-lite',
    name: 'MEDDIC Discovery Lite',
    tagline: 'Six questions per letter. Score the deal in two minutes.',
    description:
      'The core of MEDDIC as a skill: a question bank per element and a quick scorecard. Paste your call notes and get gaps flagged. The free version covers MEDDIC; the Pro qualifier adds Paper process, Competition, and CRM write-back.',
    category: 'discovery',
    role: ['ae', 'manager'],
    tier: 'free',
    kits: [],
    version: '1.0.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: ['SKILL.md with question bank', 'Scorecard template'],
    goodFit: ['AEs new to MEDDIC', 'Managers running deal reviews'],
    notFor: ['Teams needing MEDDPICC + CRM automation (see MEDDPICC Qualifier)'],
    previewImages: [],
    icon: { lucide: 'ListChecks', hue: 210 },
    contentPath: 'skills/meddic-discovery-lite',
    files: ['SKILL.md'],
    relatedSlugs: ['meddpicc-qualifier', 'gap-selling-discovery'],
    seo: {
      title: 'MEDDIC Discovery Questions — Free Claude Code Skill',
      description: 'Question bank and scorecard for every MEDDIC element. Paste call notes, get gaps flagged. Free skill.',
      keywords: ['meddic questions', 'meddic discovery questions', 'meddic framework'],
    },
  },

  // --------------------------------------------------------- SDR KIT ($79)
  {
    id: 'scout-pro',
    slug: 'scout-pro',
    name: 'Scout Pro',
    tagline: 'Research that ends in a ranked list and a reason to reach out today.',
    description:
      'Scout Pro turns a territory or ICP into a prioritized account list with per-account briefs, buyer maps, and a timing trigger for each. Includes the signal taxonomy, source checklist, and output schemas Scout (free) only hints at. Wired for Claude Code, Cursor, Codex, Gemini CLI and OpenClaw.',
    category: 'prospecting',
    role: ['sdr', 'ae'],
    tier: 'premium',
    kits: ['sdr-kit'],
    version: '1.0.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: [
      'SKILL.md with full research workflow and output schemas',
      'references/signals.md — 40+ timing signals ranked by conversion',
      'references/sources.md — where to look, in order, per signal',
      'references/icp-template.md — fill-in ICP that drives the ranking',
      'Per-agent wiring: Claude Code, Cursor .mdc, Codex AGENTS.md, Gemini, OpenClaw heartbeat',
      'Eval checklist to verify the skill is firing correctly',
    ],
    goodFit: ['SDR teams working named accounts', 'AEs self-sourcing', 'RevOps building a repeatable research step'],
    notFor: ['Pure inbound teams', 'Anyone who already has Clay-grade enrichment and just needs copy'],
    previewImages: [],
    icon: { lucide: 'Radar', hue: 28 },
    contentPath: 'skills/scout-pro',
    files: ['SKILL.md', 'references/signals.md', 'references/sources.md', 'references/icp-template.md', 'agents/cursor.mdc', 'agents/AGENTS.md', 'agents/openclaw-heartbeat.md', 'EVAL.md'],
    relatedSlugs: ['signal-based-prospecting', 'cold-email-sequences', 'scout'],
    featured: true,
    seo: {
      title: 'Scout Pro — Account Research Agent Skill for Claude Code & Cursor',
      description: 'Territory in, ranked accounts with briefs and timing triggers out. 40+ signals, source checklist, output schemas. SDR Kit.',
      keywords: ['account research agent', 'sdr claude code skill', 'prospecting skill'],
    },
  },
  {
    id: 'signal-based-prospecting',
    slug: 'signal-based-prospecting',
    name: 'Signal-Based Prospecting',
    tagline: 'Turn a job post, funding round or exec hire into a sequence-ready reason.',
    description:
      'Feed it a signal (hiring spike, new VP, funding, tech change, bad reviews of a competitor) and it returns the hypothesis, the persona to target, the angle, and the first-touch copy. Codifies the "why now" step most SDRs skip.',
    category: 'prospecting',
    role: ['sdr'],
    tier: 'premium',
    kits: ['sdr-kit'],
    version: '1.0.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: ['SKILL.md signal → angle → copy workflow', 'references/signal-playbook.md — 25 signals with proven angles', 'references/persona-map.md', 'Per-agent wiring + EVAL.md'],
    goodFit: ['SDRs using intent/signal tools', 'Teams running trigger-based outbound'],
    notFor: ['Static list blasting'],
    previewImages: [],
    icon: { lucide: 'Activity', hue: 28 },
    contentPath: 'skills/signal-based-prospecting',
    files: ['SKILL.md', 'references/signal-playbook.md', 'references/persona-map.md', 'agents/cursor.mdc', 'agents/AGENTS.md', 'EVAL.md'],
    relatedSlugs: ['scout-pro', 'cold-email-sequences'],
    seo: {
      title: 'Signal-Based Prospecting Skill — Claude Code, Cursor, Codex',
      description: 'Signal in, angle and first-touch copy out. 25 signals with proven angles. SDR Kit.',
      keywords: ['signal based selling', 'trigger based outreach', 'intent signals prompt'],
    },
  },
  {
    id: 'cold-email-sequences',
    slug: 'cold-email-sequences',
    name: 'Cold Email Sequences',
    tagline: 'Five-touch sequences with a different job for every step.',
    description:
      'Builds a full sequence: opener, value add, social proof, breakup, and the LinkedIn touch in between. Each step has a role, a length cap, and a rule for what it may and may not repeat. Outputs ready to paste into Outreach, Salesloft, Apollo or lemlist.',
    category: 'outreach',
    role: ['sdr', 'founder'],
    tier: 'premium',
    kits: ['sdr-kit'],
    version: '1.0.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: ['SKILL.md sequence architecture', 'references/step-rules.md', 'references/examples/ — 8 full sequences by industry', 'Export formats for Outreach/Salesloft/Apollo', 'Per-agent wiring + EVAL.md'],
    goodFit: ['SDRs owning their own sequences', 'Founders setting up first outbound'],
    notFor: ['Single-email use (free Cold Email Fundamentals covers it)'],
    previewImages: [],
    icon: { lucide: 'Send', hue: 350 },
    contentPath: 'skills/cold-email-sequences',
    files: ['SKILL.md', 'references/step-rules.md', 'references/examples/saas.md', 'references/examples/fintech.md', 'agents/cursor.mdc', 'agents/AGENTS.md', 'EVAL.md'],
    relatedSlugs: ['cold-email-fundamentals', 'signal-based-prospecting', 'hemingway-tonality'],
    featured: true,
    seo: {
      title: 'Cold Email Sequence Skill — 5-Touch Sequences for Claude Code',
      description: 'Opener, value, proof, breakup, LinkedIn touch. Rules per step. Export-ready for Outreach, Salesloft, Apollo. SDR Kit.',
      keywords: ['cold email sequence', 'outbound sequence prompt', 'sdr sequence'],
    },
  },

  // ---------------------------------------------------------- AE KIT ($79)
  {
    id: 'closer-pro',
    slug: 'closer-pro',
    name: 'Closer Pro',
    tagline: 'Deal strategist that multi-threads, maps the paper process, and gets to signature.',
    description:
      'The deal-cycle counterpart to Scout Pro. Give it a deal and it produces a close plan: stakeholders missing, risks by stage, mutual action plan, and the next three moves. Includes negotiation guardrails and a procurement playbook.',
    category: 'closing',
    role: ['ae'],
    tier: 'premium',
    kits: ['ae-kit'],
    version: '1.0.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: ['SKILL.md deal-review workflow', 'references/mutual-action-plan.md', 'references/negotiation-guardrails.md', 'references/procurement-playbook.md', 'Per-agent wiring + EVAL.md'],
    goodFit: ['AEs running mid-market and enterprise cycles', 'Managers coaching deal reviews'],
    notFor: ['Transactional, one-call closes'],
    previewImages: [],
    icon: { lucide: 'Handshake', hue: 150 },
    contentPath: 'skills/closer-pro',
    files: ['SKILL.md', 'references/mutual-action-plan.md', 'references/negotiation-guardrails.md', 'references/procurement-playbook.md', 'agents/cursor.mdc', 'agents/AGENTS.md', 'EVAL.md'],
    relatedSlugs: ['meddpicc-qualifier', 'gap-selling-discovery', 'scout-pro'],
    featured: true,
    seo: {
      title: 'Closer Pro — Deal Strategy Agent Skill for AEs',
      description: 'Close plans, mutual action plans, negotiation guardrails, procurement playbook. For Claude Code, Cursor, Codex. AE Kit.',
      keywords: ['deal review prompt', 'mutual action plan template', 'ae claude skill'],
    },
  },
  {
    id: 'meddpicc-qualifier',
    slug: 'meddpicc-qualifier',
    name: 'MEDDPICC Qualifier',
    tagline: 'Call notes in. Scored MEDDPICC with gaps, next questions and CRM fields out.',
    description:
      'Full MEDDPICC with scoring rubric, question bank per element, red-flag detection and a CRM-ready field map (HubSpot and Salesforce). Pairs with GTM MCP Server to write scores back to the deal.',
    category: 'discovery',
    role: ['ae', 'manager'],
    tier: 'premium',
    kits: ['ae-kit'],
    version: '1.0.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: ['SKILL.md scoring workflow', 'references/question-bank.md — 60+ questions', 'references/red-flags.md', 'references/crm-field-map.md', 'Per-agent wiring + EVAL.md'],
    goodFit: ['Teams standardizing on MEDDPICC', 'Managers who want consistent deal reviews'],
    notFor: ['Teams on SPIN or Challenger only'],
    previewImages: [],
    icon: { lucide: 'ClipboardCheck', hue: 210 },
    contentPath: 'skills/meddpicc-qualifier',
    files: ['SKILL.md', 'references/question-bank.md', 'references/red-flags.md', 'references/crm-field-map.md', 'agents/cursor.mdc', 'agents/AGENTS.md', 'EVAL.md'],
    relatedSlugs: ['meddic-discovery-lite', 'closer-pro', 'hubspot-crm-ops'],
    seo: {
      title: 'MEDDPICC Qualifier Skill — Score Deals from Call Notes',
      description: '60+ questions, scoring rubric, red flags, CRM field map. Claude Code, Cursor, Codex. AE Kit.',
      keywords: ['meddpicc', 'meddpicc questions', 'meddpicc qualification framework'],
    },
  },
  {
    id: 'gap-selling-discovery',
    slug: 'gap-selling-discovery',
    name: 'Gap Selling Discovery',
    tagline: 'Current state, future state, the gap, and the cost of staying put.',
    description:
      'Runs discovery the Gap Selling way: problem identification before product, quantified impact, and a future-state picture the buyer describes in their own words. Produces the gap summary you send back after the call.',
    category: 'discovery',
    role: ['ae'],
    tier: 'premium',
    kits: ['ae-kit'],
    version: '1.0.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: ['SKILL.md discovery flow', 'references/problem-tree.md', 'references/impact-quantification.md', 'references/gap-summary-template.md', 'Per-agent wiring + EVAL.md'],
    goodFit: ['Consultative sellers', 'Complex, multi-stakeholder deals'],
    notFor: ['Inbound demos with pre-qualified buyers'],
    previewImages: [],
    icon: { lucide: 'GitCompareArrows', hue: 210 },
    contentPath: 'skills/gap-selling-discovery',
    files: ['SKILL.md', 'references/problem-tree.md', 'references/impact-quantification.md', 'references/gap-summary-template.md', 'agents/cursor.mdc', 'agents/AGENTS.md', 'EVAL.md'],
    relatedSlugs: ['meddpicc-qualifier', 'closer-pro'],
    seo: {
      title: 'Gap Selling Discovery Skill — Current State to Future State',
      description: 'Problem-first discovery, quantified impact, gap summary. For Claude Code, Cursor, Codex. AE Kit.',
      keywords: ['gap selling', 'gap selling current state future state', 'keenan gap selling'],
    },
  },

  // ------------------------------------------------------ REVOPS KIT ($79)
  {
    id: 'pipeline-inspector',
    slug: 'pipeline-inspector',
    name: 'Pipeline Inspector',
    tagline: 'Pipeline export in. Slipped deals, stale stages and a forecast call out.',
    description:
      'Paste or pipe a CRM export and get the inspection a good RevOps lead would run: stage-age outliers, deals missing next steps, close-date drift, coverage by rep, and a commit/best-case call with the reasoning. Includes the weekly pipeline-review agenda.',
    category: 'revops',
    role: ['revops', 'manager'],
    tier: 'premium',
    kits: ['revops-kit'],
    version: '1.0.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: ['SKILL.md inspection workflow', 'references/hygiene-rules.md', 'references/forecast-method.md', 'references/pipeline-review-agenda.md', 'Per-agent wiring + EVAL.md'],
    goodFit: ['RevOps and sales managers running weekly pipeline reviews', 'Founders doing their own forecasting'],
    notFor: ['Teams without a CRM export'],
    previewImages: [],
    icon: { lucide: 'ScanSearch', hue: 260 },
    contentPath: 'skills/pipeline-inspector',
    files: ['SKILL.md', 'references/hygiene-rules.md', 'references/forecast-method.md', 'references/pipeline-review-agenda.md', 'agents/cursor.mdc', 'agents/AGENTS.md', 'EVAL.md'],
    relatedSlugs: ['hubspot-crm-ops', 'meddpicc-qualifier'],
    featured: true,
    seo: {
      title: 'Pipeline Inspector Skill — Forecast and Hygiene from a CRM Export',
      description: 'Slipped deals, stale stages, coverage, commit call with reasoning. Claude Code, Cursor, Codex. RevOps Kit.',
      keywords: ['pipeline review', 'sales forecast prompt', 'revops claude'],
    },
  },
  {
    id: 'hubspot-crm-ops',
    slug: 'hubspot-crm-ops',
    name: 'HubSpot CRM Ops',
    tagline: 'Run HubSpot from your agent: dedupe, enrich, log, update — with guardrails.',
    description:
      'A skill plus MCP configuration for operating HubSpot from Claude Code or Claude Desktop. Covers safe bulk updates, property mapping, deal-stage automation and the review step before any write. Built on the open-source GTM MCP Server’s HubSpot tools.',
    category: 'revops',
    role: ['revops'],
    tier: 'premium',
    kits: ['revops-kit'],
    version: '1.0.0',
    agents: ['claude-code', 'claude-desktop', 'cursor'],
    lastTested: TESTED,
    whatYouGet: ['SKILL.md with write guardrails', 'references/property-map.md', 'references/bulk-ops-playbook.md', 'mcp/hubspot-config.json', 'EVAL.md'],
    goodFit: ['HubSpot admins and RevOps', 'Teams already running GTM MCP Server'],
    notFor: ['Salesforce shops (coming)'],
    previewImages: [],
    icon: { lucide: 'Database', hue: 260 },
    contentPath: 'skills/hubspot-crm-ops',
    files: ['SKILL.md', 'references/property-map.md', 'references/bulk-ops-playbook.md', 'mcp/hubspot-config.json', 'EVAL.md'],
    relatedSlugs: ['gtm-mcp-server', 'pipeline-inspector'],
    seo: {
      title: 'HubSpot CRM Ops Skill — Operate HubSpot from Claude with Guardrails',
      description: 'Bulk updates, property mapping, deal automation, review-before-write. Uses GTM MCP Server. RevOps Kit.',
      keywords: ['hubspot mcp', 'hubspot claude', 'crm automation claude'],
    },
  },

  // ----------------------------------------------------- FOUNDER KIT ($79)
  {
    id: 'mission-control-pro',
    slug: 'mission-control-pro',
    name: 'Mission Control Pro',
    tagline: 'The orchestrator. Runs Scout, Writer, Rep and Closer on a heartbeat.',
    description:
      'The upgraded coordinator for the agent fleet: daily heartbeat, working memory, escalation rules, and the handoff contracts between agents. Includes the deployment templates (config, MEMORY, WORKING, HEARTBEAT) tuned from live runs.',
    category: 'agents',
    role: ['founder', 'manager'],
    tier: 'premium',
    kits: ['founder-kit'],
    version: '1.0.0',
    agents: ['openclaw', 'claude-code'],
    lastTested: TESTED,
    whatYouGet: ['SKILL.md orchestrator', 'deployment/HEARTBEAT.md, MEMORY.md, WORKING.md (tuned)', 'deployment/config.json', 'references/handoff-contracts.md', 'references/escalation-rules.md', 'EVAL.md'],
    goodFit: ['Founders running a one-person outbound motion', 'Teams piloting autonomous SDR work'],
    notFor: ['Single-skill users'],
    previewImages: [],
    icon: { lucide: 'Orbit', hue: 190 },
    contentPath: 'skills/mission-control-pro',
    files: ['SKILL.md', 'deployment/HEARTBEAT.md', 'deployment/MEMORY.md', 'deployment/WORKING.md', 'deployment/config.json', 'references/handoff-contracts.md', 'references/escalation-rules.md', 'EVAL.md'],
    relatedSlugs: ['scout-pro', 'closer-pro', 'founder-led-sales-os'],
    featured: true,
    seo: {
      title: 'Mission Control Pro — Agent Fleet Orchestrator for OpenClaw & Claude Code',
      description: 'Heartbeat, memory, escalation and handoff contracts for Scout, Writer, Rep and Closer. Founder Kit.',
      keywords: ['openclaw gtm', 'agent orchestrator sales', 'autonomous sdr'],
    },
  },
  {
    id: 'founder-led-sales-os',
    slug: 'founder-led-sales-os',
    name: 'Founder-Led Sales OS',
    tagline: 'From first ten customers to first sales hire, as a skill.',
    description:
      'A weekly operating system for founders selling before a sales team: design-partner outreach, pricing conversations, the “are we ready to hire” test, and the handoff doc for your first AE. Opinionated and sequenced.',
    category: 'founder',
    role: ['founder'],
    tier: 'premium',
    kits: ['founder-kit'],
    version: '1.0.0',
    agents: CORE_AGENTS,
    lastTested: TESTED,
    whatYouGet: ['SKILL.md weekly OS', 'references/design-partner-outreach.md', 'references/pricing-conversation.md', 'references/first-ae-handoff.md', 'Per-agent wiring + EVAL.md'],
    goodFit: ['Pre-seed to Series A founders', 'Technical founders doing sales for the first time'],
    notFor: ['Teams with an established sales org'],
    previewImages: [],
    icon: { lucide: 'Rocket', hue: 45 },
    contentPath: 'skills/founder-led-sales-os',
    files: ['SKILL.md', 'references/design-partner-outreach.md', 'references/pricing-conversation.md', 'references/first-ae-handoff.md', 'agents/cursor.mdc', 'agents/AGENTS.md', 'EVAL.md'],
    relatedSlugs: ['mission-control-pro', 'cold-email-sequences', 'scout-pro'],
    seo: {
      title: 'Founder-Led Sales OS — Claude Code Skill for Founders Selling First',
      description: 'Design partners, pricing talks, first-AE handoff. A weekly operating system as a skill. Founder Kit.',
      keywords: ['founder led sales', 'first 10 customers', 'founder sales playbook'],
    },
  },
];

// ---------------------------------------------------------------------------
// Kits / products
// ---------------------------------------------------------------------------

export const kits: Kit[] = [
  {
    id: 'sdr-kit',
    name: 'SDR Kit',
    tagline: 'Research, signals, sequences.',
    description: 'Everything an SDR needs to go from territory to booked meeting.',
    kind: 'kit',
    priceCents: 7900,
    skillSlugs: ['scout-pro', 'signal-based-prospecting', 'cold-email-sequences'],
  },
  {
    id: 'ae-kit',
    name: 'AE Kit',
    tagline: 'Discovery, qualification, close plans.',
    description: 'Run the deal cycle like your best rep, every time.',
    kind: 'kit',
    priceCents: 7900,
    skillSlugs: ['closer-pro', 'meddpicc-qualifier', 'gap-selling-discovery'],
  },
  {
    id: 'revops-kit',
    name: 'RevOps Kit',
    tagline: 'Pipeline, forecast, CRM operations.',
    description: 'Inspect pipeline and operate HubSpot from your agent.',
    kind: 'kit',
    priceCents: 7900,
    skillSlugs: ['pipeline-inspector', 'hubspot-crm-ops'],
  },
  {
    id: 'founder-kit',
    name: 'Founder Kit',
    tagline: 'Agent fleet orchestration and founder-led selling.',
    description: 'Sell before you have a sales team.',
    kind: 'kit',
    priceCents: 7900,
    skillSlugs: ['mission-control-pro', 'founder-led-sales-os'],
  },
  {
    id: 'full-bundle',
    name: 'Full Bundle',
    tagline: 'Every kit. Every future drop.',
    description: 'All premium skills, all agents, updates for 12 months.',
    kind: 'bundle',
    priceCents: 24900,
    launchPriceCents: 14900,
    launchSeatLimit: 50,
    skillSlugs: skills.filter((s) => s.tier === 'premium').map((s) => s.slug),
    highlight: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Everything, monthly. Unlimited in ChatGPT.',
    description: 'All premium skills, unlimited GTM Skills plugin use in ChatGPT, every weekly drop. Cancel anytime.',
    kind: 'subscription',
    priceCents: 1900,
    interval: 'month',
    skillSlugs: skills.filter((s) => s.tier === 'premium').map((s) => s.slug),
  },
];

/** Products that grant access to every premium skill. */
export const ALL_ACCESS_PRODUCTS: ProductId[] = ['full-bundle', 'pro'];

// ---------------------------------------------------------------------------
// Stats — the one place counts come from. Reference these, never literals.
// ---------------------------------------------------------------------------

export const STATS = {
  skills: skills.length,
  freeSkills: skills.filter((s) => s.tier === 'free').length,
  premiumSkills: skills.filter((s) => s.tier === 'premium').length,
  kits: kits.filter((k) => k.kind === 'kit').length,
  prompts: 244,
  tonalities: 24,
  industries: 16,
  mcpTools: 18,
  agents: Object.keys(AGENTS).length,
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const getSkill = (slug: string) => skills.find((s) => s.slug === slug);
export const getAllSkillSlugs = () => skills.map((s) => s.slug);
export const getFreeSkills = () => skills.filter((s) => s.tier === 'free');
export const getPremiumSkills = () => skills.filter((s) => s.tier === 'premium');
export const getFeaturedSkills = () => skills.filter((s) => s.featured);
export const getSkillsByCategory = (cat: SkillCategory) => skills.filter((s) => s.category === cat);
export const getSkillsByRole = (role: Role) => skills.filter((s) => s.role.includes(role) || s.role.includes('all'));
export const getKit = (id: ProductId) => kits.find((k) => k.id === id);
export const getKitForSkill = (slug: string): Kit | undefined => {
  const s = getSkill(slug);
  if (!s || s.tier === 'free') return undefined;
  return kits.find((k) => k.id === s.kits[0]);
};
export const getRelated = (slug: string) =>
  (getSkill(slug)?.relatedSlugs ?? []).map(getSkill).filter((s): s is Skill => Boolean(s));

export const formatPrice = (cents: number) => `$${(cents / 100).toFixed(0)}`;
