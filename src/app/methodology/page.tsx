import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { methodologies } from '@/lib/prompts';
import {
  ArrowRight,
  ClipboardCheck,
  MessageCircleQuestion,
  Swords,
  Target,
  DollarSign,
  GitCompare,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Methodologies | GTM Skills',
  description: 'Prompts for MEDDPICC, SPIN, Challenger, Sandler, Value Selling, and Gap Selling. Apply proven frameworks with agentic workflows.',
};

const iconMap: Record<string, React.ElementType> = {
  'clipboard-check': ClipboardCheck,
  'message-circle-question': MessageCircleQuestion,
  swords: Swords,
  target: Target,
  'dollar-sign': DollarSign,
  'git-compare': GitCompare,
};

const methodologyDetails = [
  {
    slug: 'meddpicc',
    name: 'MEDDPICC',
    fullName: 'Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion, Competition',
    bestFor: 'Enterprise deals with long sales cycles and multiple stakeholders',
    keyQuestion: 'Have you identified and validated each letter?',
  },
  {
    slug: 'spin',
    name: 'SPIN Selling',
    fullName: 'Situation, Problem, Implication, Need-Payoff Questions',
    bestFor: 'Discovery calls and consultative selling',
    keyQuestion: 'Are you asking questions that lead the buyer to their own conclusions?',
  },
  {
    slug: 'challenger',
    name: 'Challenger Sale',
    fullName: 'Teach, Tailor, Take Control',
    bestFor: 'Complex B2B sales where insight creates differentiation',
    keyQuestion: 'What commercial insight can you teach them?',
  },
  {
    slug: 'sandler',
    name: 'Sandler',
    fullName: 'Pain Funnel, Upfront Contracts, Budget Discussion',
    bestFor: 'Qualifying hard and disqualifying fast',
    keyQuestion: 'Is the pain compelling enough for them to act?',
  },
  {
    slug: 'value-selling',
    name: 'Value Selling',
    fullName: 'Business Value, Financial Justification, ROI',
    bestFor: 'Deals requiring CFO sign-off or business case',
    keyQuestion: 'Can you quantify the value in their language?',
  },
  {
    slug: 'gap-selling',
    name: 'Gap Selling',
    fullName: 'Current State, Future State, Gap Analysis',
    bestFor: 'Helping buyers see the cost of inaction',
    keyQuestion: 'How big is the gap between where they are and where they need to be?',
  },
];

export default function MethodologyPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-yellow-500/30 text-yellow-400">
            6 Frameworks
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sales Methodologies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proven sales frameworks powered by AI. Whether you run MEDDPICC, SPIN,
            Challenger, or your own blend - we've got prompts to help.
          </p>
        </div>

        {/* Methodology Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {methodologies.map((methodology) => {
            const Icon = iconMap[methodology.icon] || ClipboardCheck;
            const details = methodologyDetails.find(m => m.slug === methodology.slug);
            return (
              <Link
                key={methodology.slug}
                href={`/methodology/${methodology.slug}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-yellow-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
                  <Icon className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-semibold text-foreground group-hover:text-yellow-400 transition-colors">
                    {methodology.name}
                  </h2>
                  <Badge variant="secondary" className="text-xs">
                    {methodology.count}+
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {methodology.description}
                </p>
                {details && (
                  <p className="text-xs text-zinc-500 italic mb-4">
                    Best for: {details.bestFor}
                  </p>
                )}
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* Methodology Comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Which Methodology Should I Use?</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl mx-auto text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Methodology</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Best For</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Key Question</th>
                </tr>
              </thead>
              <tbody>
                {methodologyDetails.map((method) => (
                  <tr key={method.slug} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{method.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{method.bestFor}</td>
                    <td className="py-3 px-4 text-yellow-400 italic">{method.keyQuestion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mix & Match */}
        <div className="mb-16 p-8 rounded-xl border border-border bg-card">
          <h2 className="text-2xl font-bold mb-4 text-center">Mix & Match Frameworks</h2>
          <p className="text-muted-foreground text-center mb-6 max-w-2xl mx-auto">
            The best sellers blend methodologies based on the situation.
            Here are common combinations:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-zinc-900">
              <h3 className="font-semibold mb-2">Enterprise SaaS</h3>
              <p className="text-sm text-yellow-400 mb-2">MEDDPICC + Challenger</p>
              <p className="text-xs text-muted-foreground">
                Qualify with MEDDPICC, differentiate with Challenger insights
              </p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-900">
              <h3 className="font-semibold mb-2">SMB / Velocity Sales</h3>
              <p className="text-sm text-yellow-400 mb-2">Sandler + Gap Selling</p>
              <p className="text-xs text-muted-foreground">
                Disqualify fast with Sandler, create urgency with Gap
              </p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-900">
              <h3 className="font-semibold mb-2">Technical Sales</h3>
              <p className="text-sm text-yellow-400 mb-2">SPIN + Value Selling</p>
              <p className="text-xs text-muted-foreground">
                Discover with SPIN, justify with ROI business case
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Want prompts for all methodologies?
          </p>
          <Link
            href="/download"
            className="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center gap-2"
          >
            Download the complete library
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
