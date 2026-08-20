import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FeedbackWidget } from '@/components/feedback-widget';
import { GitHubStars } from '@/components/github-stars';
import { AnimatedChatDemo } from '@/components/animated-chat-demo';

// Homepage sections
import { SocialProof } from '@/components/home/social-proof';
import { ProductSurfaceGrid } from '@/components/home/product-surface-grid';
import { VoiceShowcase } from '@/components/home/voice-showcase';
import { ProofInAction } from '@/components/home/proof-in-action';
import { DevelopersSection } from '@/components/home/developers-section';
import { FinalCta } from '@/components/home/final-cta';

import {
  ArrowRight,
  Star,
  HelpCircle,
} from 'lucide-react';

// FAQ data for SEO and LLM optimization
const faqs = [
  {
    question: 'What is GTM Skills?',
    answer: 'GTM Skills is the open-source operating system for agentic GTM. It includes 2,500+ prompts, agent workflows, a browser extension, MCP server, voice templates, and a full API — organized by industry, role, workflow, and methodology. Everything you need to build agentic sales workflows.',
  },
  {
    question: 'How do I use GTM Skills?',
    answer: 'Browse prompts, use the browser extension on LinkedIn and Gmail, install the MCP Server for Claude Desktop, or deploy the full OpenClaw agent team. Everything works together as an integrated GTM workflow.',
  },
  {
    question: 'Is GTM Skills really free?',
    answer: 'Yes, GTM Skills is 100% free and open source under the MIT license. There are no paywalls, no signup required to copy prompts, and no usage limits. You can use it commercially or personally. The project is maintained by Prospeda.',
  },
  {
    question: 'What makes GTM Skills different?',
    answer: 'GTM Skills is purpose-built for B2B sales workflows, not generic prompts. Every tool, template, and agent is designed for real sales scenarios — prospecting, discovery, objection handling, proposals, and closing. The entire ecosystem works together: prompts feed agents, agents use tools, tools integrate with your stack.',
  },
  {
    question: 'Can I contribute my own prompts?',
    answer: 'Yes! Fork the GitHub repository, add your prompts following our template, and submit a pull request. We review contributions within 48 hours. Check our CONTRIBUTING.md guide for detailed instructions.',
  },
  {
    question: 'What is the MCP Server?',
    answer: 'The MCP (Model Context Protocol) Server is a tool that integrates GTM Skills directly into Claude Desktop. It provides 10 AI-powered tools and 6 interactive UIs for tasks like company research, email drafting, objection handling, and more—all accessible without leaving your Claude conversation.',
  },
];

// JSON-LD for FAQ structured data
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* FAQ JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* OpenClaw Announcement Banner - Above the fold */}
      <Link href="/openclaw" className="block">
        <div className="bg-gradient-to-r from-orange-500/20 via-red-500/10 to-orange-500/20 border-b border-orange-500/30 py-3 px-4 hover:from-orange-500/30 hover:via-red-500/20 hover:to-orange-500/30 transition-all cursor-pointer">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
            <span className="text-xl">🦞</span>
            <span className="text-foreground font-medium">
              <span className="hidden sm:inline">NEW: </span>OpenClaw GTM Skills
            </span>
            <span className="text-orange-400 hidden sm:inline">Research → Write → Send → Book → Track</span>
            <ArrowRight className="h-4 w-4 text-orange-400" />
          </div>
        </div>
      </Link>

      {/* Hero */}
      <section className="relative py-20 md:py-24 overflow-hidden border-b border-border">
        {/* Corner registration marks -- Blueprint's signature motif */}
        <span className="hidden md:block absolute top-6 left-6 w-3.5 h-3.5 border-t-[1.5px] border-l-[1.5px] border-primary/60" aria-hidden="true" />
        <span className="hidden md:block absolute top-6 right-6 w-3.5 h-3.5 border-t-[1.5px] border-r-[1.5px] border-primary/60" aria-hidden="true" />

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="label-mono flex items-center gap-2.5 text-xs text-primary mb-5">
            <span className="w-5 h-px bg-primary" aria-hidden="true" />
            Free &amp; Open Source · MIT Licensed
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl" style={{ textWrap: 'balance' }}>
            The GTM operating system for{' '}
            <span className="brand-gradient-text">Agentic Sales</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            2,500+ prompts, agent workflows, and tools for prospecting, outreach, discovery, and closing.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <a
              href="https://github.com/gtm-skills/gtm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="label-mono h-12 px-8 gap-2 text-xs brand-gradient">
                <Star className="h-4 w-4" />
                Star on GitHub
                <GitHubStars repo="gtm-skills/gtm" className="text-xs ml-1" />
              </Button>
            </a>
            <Link href="/prompts">
              <Button variant="outline" size="lg" className="label-mono h-12 px-8 gap-2 text-xs">
                Browse Prompts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Animated Command Demo */}
          <div className="mb-14 max-w-3xl">
            <AnimatedChatDemo />
          </div>

          {/* Spec table -- Blueprint's stat treatment */}
          <table className="w-full max-w-2xl border-collapse text-sm">
            <thead>
              <tr className="label-mono text-[10px] text-muted-foreground">
                <th className="text-left font-semibold pb-2 pr-6 border-b border-foreground/70">Spec</th>
                <th className="text-left font-semibold pb-2 pr-6 border-b border-foreground/70">Value</th>
                <th className="text-left font-semibold pb-2 pr-6 border-b border-foreground/70">Spec</th>
                <th className="text-left font-semibold pb-2 border-b border-foreground/70">Value</th>
              </tr>
            </thead>
            <tbody className="[&_td]:py-3 [&_td]:pr-6 [&_td]:border-b [&_td]:border-border [&_td]:tabular-nums">
              <tr>
                <td className="text-muted-foreground">Prompts</td>
                <td className="font-semibold text-primary">2,500+</td>
                <td className="text-muted-foreground">Writing styles</td>
                <td className="font-semibold text-primary">24</td>
              </tr>
              <tr>
                <td className="text-muted-foreground">Industries</td>
                <td className="font-semibold text-primary">8</td>
                <td className="text-muted-foreground">License</td>
                <td className="font-semibold text-primary">MIT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Unified product surface grid — replaces EcosystemBar, ToolsGrid, and the
          inline Categories Grid, which previously repeated the same
          "everything GTM Skills offers" message in 3 different visual treatments */}
      <ProductSurfaceGrid />

      {/* Voice Showcase */}
      <VoiceShowcase />

      {/* Proof in Action — merges the former MCP Apps Feature Highlight,
          How It Works, Sample Prompt, and Agentic BDR sections into one
          tabbed Prompt -> Copy -> Agent Runs It -> Result story */}
      <ProofInAction />

      {/* Developers Section */}
      <DevelopersSection />

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-border text-muted-foreground">
              <HelpCircle className="h-3 w-3 mr-1" />
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about GTM Skills
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card/50 border border-border rounded-xl p-6 hover:border-border transition-colors"
              >
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — merges the former "Support the Project" and "GitHub CTA"
          sections into one non-redundant call to action */}
      <FinalCta />

      {/* Feedback Widget */}
      <FeedbackWidget />
    </div>
  );
}
