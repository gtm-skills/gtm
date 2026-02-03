import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { methodologies, getMethodologyPrompts } from '@/lib/prompts';
import { ArrowLeft, Download, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

const methodologyDetails: Record<string, { fullName: string; description: string; principles: string[] }> = {
  meddpicc: {
    fullName: 'Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion, Competition',
    description: 'MEDDPICC is the gold standard for enterprise deal qualification. Each letter represents a critical element that must be validated before you can confidently forecast a deal.',
    principles: [
      'Metrics: Quantified business outcomes the customer expects',
      'Economic Buyer: The person with budget authority',
      'Decision Criteria: How they will evaluate solutions',
      'Decision Process: Steps and timeline to purchase',
      'Identify Pain: The compelling business problem',
      'Champion: Your internal advocate',
      'Competition: Who else they are evaluating',
    ],
  },
  spin: {
    fullName: 'Situation, Problem, Implication, Need-Payoff',
    description: 'SPIN Selling uses a questioning sequence that guides prospects to discover their own needs. Instead of pitching, you ask questions that lead them to their own conclusions.',
    principles: [
      'Situation Questions: Gather facts about their current state',
      'Problem Questions: Explore difficulties and dissatisfactions',
      'Implication Questions: Develop the seriousness of the problem',
      'Need-Payoff Questions: Get them to state the benefits of solving',
    ],
  },
  challenger: {
    fullName: 'Teach, Tailor, Take Control',
    description: 'The Challenger Sale is based on research showing that the best reps teach customers something new, tailor their message, and take control of the sale.',
    principles: [
      'Teach: Bring insights that reframe how they think about their business',
      'Tailor: Customize your message to different stakeholders',
      'Take Control: Lead the sale, don\'t just react to the customer',
      'Commercial Teaching: Lead with insight, not product',
    ],
  },
  sandler: {
    fullName: 'Pain Funnel, Upfront Contracts, Reversing',
    description: 'Sandler methodology focuses on qualifying hard and disqualifying fast. The pain funnel digs deep into problems, while upfront contracts set clear expectations.',
    principles: [
      'Pain Funnel: Dig deeper into problems until you reach compelling pain',
      'Upfront Contracts: Agree on what happens next before every interaction',
      'Reversing: Answer questions with questions to maintain control',
      'Negative Reverse Selling: Make it safe to say no',
    ],
  },
  'value-selling': {
    fullName: 'Business Value Quantification',
    description: 'Value Selling focuses on building a financial business case that justifies the investment. It\'s about connecting your solution to hard dollar outcomes.',
    principles: [
      'Quantify Current State Cost: What is the problem costing them?',
      'Define Future State Value: What will success be worth?',
      'Calculate ROI: Payback period, NPV, IRR',
      'Build the Business Case: Document that justifies the purchase',
    ],
  },
  'gap-selling': {
    fullName: 'Current State → Future State Gap Analysis',
    description: 'Gap Selling focuses on the distance between where the customer is today and where they need to be. The bigger the gap, the more urgency to close it.',
    principles: [
      'Current State: Deep understanding of their situation today',
      'Future State: Clear vision of where they want to be',
      'The Gap: Quantified distance between current and future',
      'Cause and Impact: Why the gap exists and what it costs',
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const methodology = methodologies.find((m) => m.slug === slug);

  if (!methodology) {
    return { title: 'Not Found' };
  }

  return {
    title: `${methodology.name} Prompts | GTM Skills`,
    description: `AI prompts for ${methodology.name}. ${methodology.description}`,
  };
}

export async function generateStaticParams() {
  return methodologies.map((methodology) => ({
    slug: methodology.slug,
  }));
}

export default async function MethodologyDetailPage({ params }: Props) {
  const { slug } = await params;
  const methodology = methodologies.find((m) => m.slug === slug);

  if (!methodology) {
    notFound();
  }

  const prompts = getMethodologyPrompts(slug);
  const details = methodologyDetails[slug];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/methodology" className="hover:text-foreground transition-colors">
            Methodology
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{methodology.name}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <div>
            <Badge variant="outline" className="mb-4 border-yellow-500/30 text-yellow-400">
              {methodology.count}+ Prompts
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {methodology.name}
            </h1>
            {details && (
              <p className="text-sm text-yellow-400 mb-4 font-mono">
                {details.fullName}
              </p>
            )}
            <p className="text-lg text-muted-foreground max-w-2xl">
              {details?.description || methodology.description}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/methodology">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Methods
              </Button>
            </Link>
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download Pack
            </Button>
          </div>
        </div>

        {/* Key Principles */}
        {details?.principles && (
          <div className="mb-12 p-6 rounded-xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Key Principles</h2>
            <ul className="space-y-2">
              {details.principles.map((principle, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-yellow-400 font-bold">{i + 1}.</span>
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        )}

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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-xl border border-dashed border-border text-center">
            <p className="text-muted-foreground mb-4">
              {methodology.count} prompts coming soon for {methodology.name}
            </p>
            <Button variant="outline" size="sm">
              Get notified when ready
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-xl bg-zinc-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want AI That Applies {methodology.name} Automatically?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Prospeda uses {methodology.name} principles to qualify deals, ask the right questions,
            and build compelling business cases.
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
