import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Building2,
  Workflow,
  CheckCircle2,
  Zap,
  Target,
  ExternalLink,
  Wrench,
  AlertCircle,
} from 'lucide-react';
import type { Metadata } from 'next';
import {
  getAgentPageBySlug,
  getAllAgentSlugs,
  agentTypes,
  industryAgents,
  workflowAgents,
} from '@/data/agentic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getAgentPageBySlug(slug);

  if (!page) {
    return { title: 'Not Found' };
  }

  const title = page.type === 'agent-type'
    ? page.data.name
    : page.type === 'industry-agent'
    ? page.data.name
    : page.data.name;

  const description = page.type === 'agent-type'
    ? page.data.description
    : page.type === 'industry-agent'
    ? page.data.description
    : page.data.description;

  return {
    title: `${title} | GTM Skills`,
    description,
    keywords: `agentic bdr, ${slug.replace(/-/g, ' ')}, ai sales agent, autonomous sales, sales automation`,
    openGraph: {
      title: `${title} | GTM Skills`,
      description,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllAgentSlugs();
  return slugs.map((slug) => ({ slug }));
}

function getRelatedPages(currentSlug: string): { href: string; label: string }[] {
  const related: { href: string; label: string }[] = [];

  // Get 2 random agent types, 2 industry agents, 2 workflow agents (excluding current)
  const otherAgentTypes = agentTypes.filter(a => a.slug !== currentSlug).slice(0, 2);
  const otherIndustryAgents = industryAgents.filter(a => a.slug !== currentSlug).slice(0, 2);
  const otherWorkflowAgents = workflowAgents.filter(a => a.slug !== currentSlug).slice(0, 2);

  otherAgentTypes.forEach(a => {
    related.push({ href: `/agentic-bdr/${a.slug}`, label: a.shortName });
  });
  otherIndustryAgents.forEach(a => {
    related.push({ href: `/agentic-bdr/${a.slug}`, label: `${a.industry} Agents` });
  });
  otherWorkflowAgents.forEach(a => {
    related.push({ href: `/agentic-bdr/${a.slug}`, label: `${a.workflow} Agent` });
  });

  return related.slice(0, 6);
}

export default async function AgentPage({ params }: Props) {
  const { slug } = await params;
  const page = getAgentPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const relatedPages = getRelatedPages(slug);

  // Render based on page type
  if (page.type === 'agent-type') {
    const agent = page.data;
    return (
      <div className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/agentic-bdr" className="hover:text-foreground transition-colors">
              Agentic BDR
            </Link>
            <span>/</span>
            <span className="text-foreground">{agent.shortName}</span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                <Bot className="h-3 w-3 mr-1" />
                Agent Type
              </Badge>
              <Badge variant="secondary">{agent.prompts.length} Prompts</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {agent.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {agent.description}
            </p>
          </div>

          {/* Use Cases */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-cyan-400" />
              Use Cases
            </h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {agent.useCases.map((useCase, i) => (
                <li key={i} className="flex items-start gap-2 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-purple-400" />
              Recommended Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {agent.tools.map((tool, i) => (
                <Badge key={i} variant="secondary" className="px-3 py-1">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          {/* Prompts */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-400" />
              Ready-to-Use Prompts
            </h2>
            <div className="space-y-6">
              {agent.prompts.map((prompt, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="text-sm text-muted-foreground">
                      Prompt {index + 1}
                    </div>
                    <CopyButton text={prompt} label={`${agent.name} - Prompt ${index + 1}`} />
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-foreground font-mono bg-zinc-900/50 p-4 rounded-lg overflow-x-auto">
                    {prompt}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          {relatedPages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4">Related Agent Guides</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {relatedPages.map((related) => (
                  <Link
                    key={related.href}
                    href={related.href}
                    className="p-3 rounded-lg border border-border bg-card hover:border-cyan-500/30 transition-colors text-center text-sm"
                  >
                    {related.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20 text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Want This Agent Running in Production?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Prospeda builds agentic sales infrastructure. See how teams are deploying
              autonomous BDRs with human oversight.
            </p>
            <a
              href={`https://prospeda.com?utm_source=gtm-skills&utm_content=agentic-${slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                Explore Prospeda
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link href="/agentic-bdr">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Agentic BDR Guide
              </Button>
            </Link>
            <Link href="/prompts">
              <Button variant="outline" className="gap-2">
                Browse All Prompts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (page.type === 'industry-agent') {
    const agent = page.data;
    return (
      <div className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/agentic-bdr" className="hover:text-foreground transition-colors">
              Agentic BDR
            </Link>
            <span>/</span>
            <span className="text-foreground">{agent.industry}</span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                <Building2 className="h-3 w-3 mr-1" />
                Industry Agent
              </Badge>
              <Badge variant="secondary">{agent.prompts.length} Prompts</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {agent.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {agent.description}
            </p>
          </div>

          {/* Challenges */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-400" />
              {agent.industry} Sales Challenges
            </h2>
            <ul className="space-y-3">
              {agent.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                  <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Signals */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-green-400" />
              Buying Signals to Monitor
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {agent.signals.map((signal, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{signal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prompts */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              {agent.industry} Agent Prompts
            </h2>
            <div className="space-y-6">
              {agent.prompts.map((prompt, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="text-sm text-muted-foreground">
                      Prompt {index + 1}
                    </div>
                    <CopyButton text={prompt} label={`${agent.name} - Prompt ${index + 1}`} />
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-foreground font-mono bg-zinc-900/50 p-4 rounded-lg overflow-x-auto">
                    {prompt}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          {relatedPages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4">Related Agent Guides</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {relatedPages.map((related) => (
                  <Link
                    key={related.href}
                    href={related.href}
                    className="p-3 rounded-lg border border-border bg-card hover:border-blue-500/30 transition-colors text-center text-sm"
                  >
                    {related.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent border border-blue-500/20 text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Need {agent.industry}-Specific Agentic Workflows?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Prospeda helps teams build autonomous BDRs with industry-specific
              research and personalization.
            </p>
            <a
              href={`https://prospeda.com?utm_source=gtm-skills&utm_content=agentic-${slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                Explore Prospeda
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link href="/agentic-bdr">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Agentic BDR Guide
              </Button>
            </Link>
            <Link href={`/industry/${slug}`}>
              <Button variant="outline" className="gap-2">
                {agent.industry} Prompts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Workflow Agent
  const agent = page.data;
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/agentic-bdr" className="hover:text-foreground transition-colors">
            Agentic BDR
          </Link>
          <span>/</span>
          <span className="text-foreground">{agent.workflow}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="border-purple-500/30 text-purple-400">
              <Workflow className="h-3 w-3 mr-1" />
              Workflow Agent
            </Badge>
            <Badge variant="secondary">{agent.prompts.length} Prompts</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {agent.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {agent.description}
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Workflow className="h-5 w-5 text-purple-400" />
            How This Agent Works
          </h2>
          <div className="space-y-3">
            {agent.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm pt-1">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prompts */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-400" />
            {agent.workflow} Agent Prompts
          </h2>
          <div className="space-y-6">
            {agent.prompts.map((prompt, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="text-sm text-muted-foreground">
                    Prompt {index + 1}
                  </div>
                  <CopyButton text={prompt} label={`${agent.name} - Prompt ${index + 1}`} />
                </div>
                <pre className="whitespace-pre-wrap text-sm text-foreground font-mono bg-zinc-900/50 p-4 rounded-lg overflow-x-auto">
                  {prompt}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {relatedPages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">Related Agent Guides</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {relatedPages.map((related) => (
                <Link
                  key={related.href}
                  href={related.href}
                  className="p-3 rounded-lg border border-border bg-card hover:border-purple-500/30 transition-colors text-center text-sm"
                >
                  {related.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border border-purple-500/20 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Automate Your {agent.workflow} Workflow
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Prospeda turns these prompts into production-ready agents with
            human oversight and continuous learning.
          </p>
          <a
            href={`https://prospeda.com?utm_source=gtm-skills&utm_content=agentic-${slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Explore Prospeda
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/agentic-bdr">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Agentic BDR Guide
            </Button>
          </Link>
          <Link href="/workflow">
            <Button variant="outline" className="gap-2">
              Workflow Prompts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
