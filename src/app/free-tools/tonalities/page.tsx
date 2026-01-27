import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Target, MessageSquare, FileText, Flame, Swords, DollarSign, Users, Search, ClipboardCheck, HelpCircle, Lightbulb, Scale, TrendingUp, Compass, PenTool, RotateCcw, GitCompare, ShieldOff, Crosshair, Repeat, Building2, RotateCw, Lock, Github } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'GTM Tonality Skills | 24 Sales Writing Styles & Methodologies',
  description: 'Master 24 battle-tested writing styles for sales. Jobs, Bezos, Voss, Hormozi, Naval, Ogilvy plus SPIN, Gap, Sandler, and more. Free + Premium prompts.',
  keywords: 'sales writing styles, steve jobs communication, bezos memo format, chris voss negotiation, alex hormozi sales, naval ravikant, david ogilvy, spin selling, gap selling, sandler selling',
  openGraph: {
    title: 'GTM Tonality Skills | 24 Sales Writing Styles & Methodologies',
    description: 'Master 24 battle-tested writing styles for sales. Free + Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const freeTonalities = [
  {
    slug: 'steve-jobs',
    name: 'Steve Jobs',
    icon: <Zap className="h-6 w-6" />,
    tagline: 'Brutally Direct',
    category: 'Writing Style',
    description: 'Command attention with short, declarative sentences. No corporate jargon. High emotional intensity.',
    keywords: ['high-stakes deals', 'premium positioning', 'urgency'],
  },
  {
    slug: 'jeff-bezos',
    name: 'Jeff Bezos',
    icon: <FileText className="h-6 w-6" />,
    tagline: 'Customer-Obsessed',
    category: 'Writing Style',
    description: 'The six-pager philosophy. Working backwards from the customer. Data woven into compelling stories.',
    keywords: ['enterprise proposals', 'strategic partnerships', 'champion enablement'],
  },
  {
    slug: 'chris-voss',
    name: 'Chris Voss',
    icon: <MessageSquare className="h-6 w-6" />,
    tagline: 'Tactical Empathy',
    category: 'Writing Style',
    description: 'Labeling emotions, mirroring, no-oriented questions. Psychology-driven communication.',
    keywords: ['negotiations', 'objection handling', 're-engagement'],
  },
  {
    slug: 'seth-godin',
    name: 'Seth Godin',
    icon: <Lightbulb className="h-6 w-6" />,
    tagline: 'Remarkable & Purple',
    category: 'Writing Style',
    description: 'Be remarkable or be invisible. Short, punchy insights. Ideas that spread. Permission marketing.',
    keywords: ['thought leadership', 'differentiation', 'storytelling'],
  },
  {
    slug: 'hemingway',
    name: 'Hemingway',
    icon: <Target className="h-6 w-6" />,
    tagline: 'Radically Brief',
    category: 'Writing Style',
    description: 'One idea per sentence. Show, don\'t tell. The Iceberg Theory—90% below the surface.',
    keywords: ['technical audiences', 'C-level brevity', 'clarity'],
  },
  {
    slug: 'cormac-mccarthy',
    name: 'Cormac McCarthy',
    icon: <Flame className="h-6 w-6" />,
    tagline: 'Sparse & Powerful',
    category: 'Writing Style',
    description: 'Poetic rhythm. Sparse punctuation. Framing as destiny, not opinion. Unforgettable.',
    keywords: ['transformational deals', 'visionary founders', 'market disruption'],
  },
  {
    slug: 'challenger',
    name: 'Challenger Sale',
    icon: <Swords className="h-6 w-6" />,
    tagline: 'Teach & Reframe',
    category: 'Methodology',
    description: 'Lead with commercial insight. Challenge assumptions. Create constructive tension.',
    keywords: ['complex B2B', 'insight selling', 'reframing'],
  },
  {
    slug: 'value-based',
    name: 'Value-Based',
    icon: <DollarSign className="h-6 w-6" />,
    tagline: 'ROI-Focused',
    category: 'Methodology',
    description: 'Quantify everything. Build business cases. Make the ROI so obvious that price becomes irrelevant.',
    keywords: ['enterprise deals', 'CFO conversations', 'business case'],
  },
  {
    slug: 'trusted-advisor',
    name: 'Trusted Advisor',
    icon: <Users className="h-6 w-6" />,
    tagline: 'Relationship-First',
    category: 'Methodology',
    description: 'Build trust through credibility, reliability, and low self-orientation. Long-term over short-term.',
    keywords: ['strategic accounts', 'consultative', 'referrals'],
  },
  {
    slug: 'pain-point-research',
    name: 'Pain Point Research',
    icon: <Search className="h-6 w-6" />,
    tagline: 'Deep Discovery',
    category: 'Skill',
    description: 'Go beyond surface symptoms. Uncover root causes, business impact, and personal stakes.',
    keywords: ['discovery', 'research', 'qualification'],
  },
  {
    slug: 'meddic',
    name: 'MEDDIC/MEDDPICC',
    icon: <ClipboardCheck className="h-6 w-6" />,
    tagline: 'Qualification Framework',
    category: 'Framework',
    description: 'Metrics, Economic Buyer, Decision Criteria, Decision Process, Champion, Competition.',
    keywords: ['enterprise sales', 'qualification', 'forecasting'],
  },
  {
    slug: 'socratic',
    name: 'Socratic Selling',
    icon: <HelpCircle className="h-6 w-6" />,
    tagline: 'Question-Led',
    category: 'Methodology',
    description: 'Lead with questions, not pitches. Guide prospects to discover insights themselves.',
    keywords: ['discovery calls', 'consultative', 'C-level'],
  },
];

const premiumTonalities = [
  {
    slug: 'warren-buffett',
    name: 'Warren Buffett',
    icon: <Scale className="h-6 w-6" />,
    tagline: 'Folksy Authority',
    category: 'Writing Style',
    description: 'Simple language, Midwestern humility, long-term thinking. Build trust with skeptical buyers.',
    keywords: ['CFO conversations', 'trust-building', 'long-term'],
  },
  {
    slug: 'alex-hormozi',
    name: 'Alex Hormozi',
    icon: <TrendingUp className="h-6 w-6" />,
    tagline: 'No-BS Value Stack',
    category: 'Writing Style',
    description: 'Direct, math-driven, value stacking. Make the offer so good saying no feels stupid.',
    keywords: ['pricing conversations', 'ROI math', 'bold claims'],
  },
  {
    slug: 'naval-ravikant',
    name: 'Naval Ravikant',
    icon: <Compass className="h-6 w-6" />,
    tagline: 'First Principles',
    category: 'Writing Style',
    description: 'Philosophical depth in few words. Reframe problems at their root. Leverage thinking.',
    keywords: ['technical founders', 'strategic reframing', 'leverage'],
  },
  {
    slug: 'david-ogilvy',
    name: 'David Ogilvy',
    icon: <PenTool className="h-6 w-6" />,
    tagline: 'Classic Persuasion',
    category: 'Writing Style',
    description: 'Research-backed, headline-driven, benefit-focused. The father of modern advertising.',
    keywords: ['email sequences', 'landing pages', 'copywriting'],
  },
  {
    slug: 'spin-selling',
    name: 'SPIN Selling',
    icon: <RotateCcw className="h-6 w-6" />,
    tagline: 'Situation to Need',
    category: 'Methodology',
    description: 'Structured discovery: Situation, Problem, Implication, Need-Payoff. Research-validated.',
    keywords: ['complex sales', 'discovery calls', 'consultative'],
  },
  {
    slug: 'gap-selling',
    name: 'Gap Selling',
    icon: <GitCompare className="h-6 w-6" />,
    tagline: 'Future State Focus',
    category: 'Methodology',
    description: 'Current state to future state. The gap IS the value. Quantify the cost of inaction.',
    keywords: ['urgency creation', 'problem-centric', 'B2B discovery'],
  },
  {
    slug: 'sandler',
    name: 'Sandler Selling',
    icon: <ShieldOff className="h-6 w-6" />,
    tagline: 'Reverse Selling',
    category: 'Methodology',
    description: 'Negative reverse, pattern interrupts, be okay with no. Let prospects convince themselves.',
    keywords: ['skeptical buyers', 'anti-sales', 'low-pressure'],
  },
  {
    slug: 'command-of-message',
    name: 'Command of Message',
    icon: <Crosshair className="h-6 w-6" />,
    tagline: 'Value Framework',
    category: 'Methodology',
    description: 'Required Capabilities, Positive Business Outcomes. Structured value articulation.',
    keywords: ['enterprise sales', 'value selling', 'messaging'],
  },
  {
    slug: 'competitive-displacement',
    name: 'Competitive Displacement',
    icon: <Repeat className="h-6 w-6" />,
    tagline: 'Wedge & Switch',
    category: 'Situation',
    description: 'Respectful but surgical. Unseat incumbents by finding the wedge and reducing switch friction.',
    keywords: ['rip-and-replace', 'competitive deals', 'contract renewal'],
  },
  {
    slug: 'executive-briefing',
    name: 'Executive Briefing',
    icon: <Building2 className="h-6 w-6" />,
    tagline: 'Boardroom Ready',
    category: 'Situation',
    description: 'Top-down structure, strategic framing, BLUF. Respect C-suite time and intelligence.',
    keywords: ['C-suite', 'board presentations', 'strategic'],
  },
  {
    slug: 'win-back',
    name: 'Win-Back Campaign',
    icon: <RotateCw className="h-6 w-6" />,
    tagline: 'Re-Engagement',
    category: 'Situation',
    description: 'Acknowledge the past, show what\'s changed, low-pressure return. For churned accounts.',
    keywords: ['churned customers', 'dormant opps', 're-engagement'],
  },
  {
    slug: 'expansion-upsell',
    name: 'Expansion & Upsell',
    icon: <TrendingUp className="h-6 w-6" />,
    tagline: 'Land & Expand',
    category: 'Situation',
    description: 'Leverage existing success to grow accounts. Frame expansion as the natural next step.',
    keywords: ['NRR', 'account growth', 'CSM/AM'],
  },
];

const situationTable = [
  { situation: 'Cold outreach to technical founder', tonality: 'Hemingway or Steve Jobs' },
  { situation: 'Complex enterprise proposal', tonality: 'Jeff Bezos or Value-Based' },
  { situation: 'Negotiating final terms', tonality: 'Chris Voss' },
  { situation: 'Re-engaging a cold lead', tonality: 'Chris Voss or Win-Back' },
  { situation: 'Transformational deal with visionary CEO', tonality: 'Cormac McCarthy' },
  { situation: 'Premium product positioning', tonality: 'Steve Jobs' },
  { situation: 'Thought leadership content', tonality: 'Seth Godin' },
  { situation: 'Differentiating from competitors', tonality: 'Seth Godin or Challenger' },
  { situation: 'Handling objections', tonality: 'Chris Voss or Socratic' },
  { situation: 'Cutting through bureaucracy', tonality: 'Steve Jobs or Hemingway' },
  { situation: 'Teaching prospects something new', tonality: 'Challenger Sale' },
  { situation: 'Building business case for CFO', tonality: 'Value-Based or Warren Buffett' },
  { situation: 'Long-term strategic accounts', tonality: 'Trusted Advisor' },
  { situation: 'Enterprise deal qualification', tonality: 'MEDDIC or SPIN Selling' },
  { situation: 'Pre-call research', tonality: 'Pain Point Research' },
  { situation: 'C-level discovery conversations', tonality: 'Socratic Selling or Executive Briefing' },
  { situation: 'Rip-and-replace deals', tonality: 'Competitive Displacement' },
  { situation: 'Growing existing accounts', tonality: 'Expansion & Upsell' },
  { situation: 'ROI-focused buyers', tonality: 'Alex Hormozi or Value-Based' },
  { situation: 'Skeptical/anti-sales buyers', tonality: 'Sandler or Warren Buffett' },
];

export default function TonalitiesPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <Badge variant="accent" className="mb-4">GTM Tonality Skills</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Write Like the Masters
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            24 battle-tested communication styles, methodologies, and frameworks. 12 free, 12 premium.
            Copy the prompts into Claude or ChatGPT.
          </p>
        </div>

        {/* Free Tonality Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-foreground">Free Tonalities</h2>
            <Badge variant="secondary">12 Available</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTonalities.map((tonality) => (
              <Link key={tonality.slug} href={`/free-tools/tonalities/${tonality.slug}`} className="group">
                <div className="h-full p-6 rounded-xl border border-border bg-card hover:border-orange-500/50 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4 group-hover:bg-orange-500/20 transition-colors">
                    {tonality.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {tonality.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                      {tonality.tagline}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tonality.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tonality.keywords.map((kw) => (
                      <span key={kw} className="text-xs bg-secondary px-2 py-1 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Premium Tonality Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-foreground">Premium Tonalities</h2>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">12 Premium</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Unlock all 12 premium tonalities with your email. Includes advanced methodologies, situation-specific frameworks, and cult-favorite personalities.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumTonalities.map((tonality) => (
              <Link key={tonality.slug} href={`/free-tools/tonalities/${tonality.slug}`} className="group">
                <div className="h-full p-6 rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5 hover:border-orange-500/50 hover:shadow-lg transition-all relative">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-xs">
                      Premium
                    </Badge>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4 group-hover:bg-orange-500/20 transition-colors">
                    {tonality.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {tonality.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                      {tonality.tagline}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tonality.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tonality.keywords.map((kw) => (
                      <span key={kw} className="text-xs bg-secondary px-2 py-1 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* When to Use Which Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            When to Use Which Tonality
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Situation</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Recommended Tonality</th>
                </tr>
              </thead>
              <tbody>
                {situationTable.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 text-muted-foreground">{row.situation}</td>
                    <td className="px-6 py-4 text-orange-600 dark:text-orange-400 font-medium">{row.tonality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-8 mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6">How These Prompts Work</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-semibold text-sm">1</span>
              <div>
                <p className="font-medium text-foreground">Pick a tonality based on your situation</p>
                <p className="text-sm text-muted-foreground">Use the table above to match your scenario to a style</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-semibold text-sm">2</span>
              <div>
                <p className="font-medium text-foreground">Copy the prompt from that tonality page</p>
                <p className="text-sm text-muted-foreground">Each page has prompts for cold emails, discovery calls, objections, and LinkedIn</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-semibold text-sm">3</span>
              <div>
                <p className="font-medium text-foreground">Fill in the [BRACKETS] with your context</p>
                <p className="text-sm text-muted-foreground">Your product, prospect details, and situation specifics</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-semibold text-sm">4</span>
              <div>
                <p className="font-medium text-foreground">Paste into Claude or ChatGPT</p>
                <p className="text-sm text-muted-foreground">Get output that sounds like a master, not a template</p>
              </div>
            </li>
          </ol>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Love these tonalities?
          </h2>
          <p className="text-orange-100 mb-6 max-w-xl mx-auto">
            Star the repo to save it for later and help others discover GTM Skills.
          </p>
          <a href="https://github.com/Prospeda/gtm-skills" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100">
              <Github className="mr-2 h-4 w-4" />
              Star on GitHub
            </Button>
          </a>
        </div>
      </main>

    </div>
  );
}
