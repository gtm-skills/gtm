import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GitHubStarGate } from '@/components/github-star-gate';
import {
  FileText,
  Package,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download All Prompts | GTM Skills',
  description: 'Download 2,500+ AI prompts for sales and marketing. Industry packs, role playbooks, methodology guides, and more.',
};

const downloadPacks = [
  {
    name: 'Complete Library',
    description: 'All 2,500+ prompts in one download',
    prompts: '2,500+',
    format: 'Notion + Markdown',
    popular: true,
  },
  {
    name: 'Industry Packs',
    description: '8 industries × 100+ prompts each',
    prompts: '800+',
    format: 'Notion + Markdown',
    popular: false,
  },
  {
    name: 'Role Playbooks',
    description: 'SDR, AE, Manager, RevOps, CSM, Founder',
    prompts: '300+',
    format: 'Notion + Markdown',
    popular: false,
  },
  {
    name: 'Methodology Guides',
    description: 'MEDDPICC, SPIN, Challenger, Sandler, and more',
    prompts: '100+',
    format: 'Notion + Markdown',
    popular: false,
  },
];

const whatsIncluded = [
  'Copy-paste prompts with [BRACKET] variables',
  'Organized by category and use case',
  'Works with Claude, ChatGPT, and any LLM',
  'Notion template for easy browsing',
  'Markdown files for technical users',
  'Weekly updates with new prompts',
];

export default function DownloadPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
            Free Download
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Download the Complete Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            2,500+ AI prompts for sales and marketing. Organized, searchable,
            and ready to use. No signup required for individual prompts - but
            subscribe for the full download and weekly updates.
          </p>
        </div>

        {/* Download Packs */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {downloadPacks.map((pack) => (
            <div
              key={pack.name}
              className={`p-6 rounded-xl border bg-card relative ${
                pack.popular
                  ? 'border-orange-500/50 ring-1 ring-orange-500/20'
                  : 'border-border'
              }`}
            >
              {pack.popular && (
                <Badge className="absolute -top-2 left-4 bg-orange-500">
                  Most Popular
                </Badge>
              )}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Package className="h-5 w-5 text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{pack.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {pack.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {pack.prompts} prompts
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {pack.format}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What's Included */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {whatsIncluded.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Star Gate */}
        <div className="p-8 rounded-xl bg-zinc-900 text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Get the Full Download
          </h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
            Star us on GitHub to unlock the complete library. Help us build the
            biggest GTM prompt resource on the internet.
          </p>
          <GitHubStarGate variant="hero" />
        </div>

        {/* Preview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Preview the Library</h2>
          <p className="text-center text-muted-foreground mb-6">
            Browse and copy individual prompts right now - no download needed.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/industry"
              className="p-4 rounded-lg border border-border bg-card hover:border-orange-500/50 transition-colors text-center"
            >
              <h3 className="font-semibold mb-1">Industry Packs</h3>
              <p className="text-sm text-muted-foreground">8 industries</p>
            </Link>
            <Link
              href="/role"
              className="p-4 rounded-lg border border-border bg-card hover:border-orange-500/50 transition-colors text-center"
            >
              <h3 className="font-semibold mb-1">Role Playbooks</h3>
              <p className="text-sm text-muted-foreground">6 roles</p>
            </Link>
            <Link
              href="/methodology"
              className="p-4 rounded-lg border border-border bg-card hover:border-orange-500/50 transition-colors text-center"
            >
              <h3 className="font-semibold mb-1">Methodologies</h3>
              <p className="text-sm text-muted-foreground">6 frameworks</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Looking for a Complete Agentic Solution?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Prospeda turns these prompts into autonomous workflows—research,
            personalization, and outbound execution with human oversight.
          </p>
          <a href="https://prospeda.com" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Explore Prospeda
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
