import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { workflows, getWorkflowPrompts } from '@/lib/prompts';
import { ArrowLeft, Download, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const workflow = workflows.find((w) => w.slug === slug);

  if (!workflow) {
    return { title: 'Not Found' };
  }

  return {
    title: `${workflow.name} Prompts | GTM Skills`,
    description: `${workflow.count}+ AI prompts for ${workflow.name.toLowerCase()}. ${workflow.description}`,
  };
}

export async function generateStaticParams() {
  return workflows.map((workflow) => ({
    slug: workflow.slug,
  }));
}

export default async function WorkflowDetailPage({ params }: Props) {
  const { slug } = await params;
  const workflow = workflows.find((w) => w.slug === slug);

  if (!workflow) {
    notFound();
  }

  const prompts = getWorkflowPrompts(slug);

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/workflow" className="hover:text-foreground transition-colors">
            Workflow
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{workflow.name}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <div>
            <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400">
              {workflow.count}+ Prompts
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {workflow.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {workflow.description}. Copy any prompt, customize the [BRACKETS], and paste into Claude or ChatGPT.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/workflow">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Workflows
              </Button>
            </Link>
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download Pack
            </Button>
          </div>
        </div>

        {/* Prompts */}
        {prompts.length > 0 ? (
          <div className="space-y-6">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {prompt.description}
                    </p>
                  </div>
                  <CopyButton text={prompt.prompt} />
                </div>
                <div className="bg-zinc-900 rounded-lg p-4 font-mono text-sm">
                  <pre className="text-zinc-300 whitespace-pre-wrap overflow-x-auto">
                    {prompt.prompt}
                  </pre>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-secondary px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {prompt.difficulty && (
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        prompt.difficulty === 'beginner'
                          ? 'bg-green-500/10 text-green-400'
                          : prompt.difficulty === 'intermediate'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {prompt.difficulty}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-xl border border-dashed border-border text-center">
            <p className="text-muted-foreground mb-4">
              {workflow.count} prompts coming soon for {workflow.name}
            </p>
            <Button variant="outline" size="sm">
              Get notified when ready
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-xl bg-zinc-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want AI That Handles This Workflow Automatically?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Prospeda automates {workflow.name.toLowerCase()} with AI agents that
            research, write, and execute at scale.
          </p>
          <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Try Prospeda Free
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
