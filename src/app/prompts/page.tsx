import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PromptsFilter } from '@/components/prompts-filter';
import {
  ArrowRight,
  Search,
} from 'lucide-react';
import type { Metadata } from 'next';
import { industries, roles, methodologies, workflows } from '@/data/pseo';

export const metadata: Metadata = {
  title: 'Browse All Prompts | 2,500+ GTM Prompts | GTM Skills',
  description: 'Browse 2,500+ sales and marketing prompts organized by industry, role, methodology, and workflow. Find the perfect prompt for any GTM scenario.',
  keywords: 'sales prompts, marketing prompts, cold email templates, discovery questions, meddpicc questions, spin selling questions, sdr prompts, ae prompts',
};

export default function PromptsIndexPage() {
  // Serialize data for client component
  const industriesData = industries.map(({ slug, name, shortName }) => ({ slug, name, shortName }));
  const rolesData = roles.map(({ slug, name, shortName }) => ({ slug, name, shortName }));
  const methodologiesData = methodologies.map(({ slug, name, shortName }) => ({ slug, name, shortName }));
  const workflowsData = workflows.map(({ slug, name, shortName }) => ({ slug, name, shortName }));

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
            <Search className="h-3 w-3 mr-1" />
            2,500+ Prompts
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Find the Perfect Prompt
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse prompts by industry, role, methodology, or workflow.
            Every combination has tailored templates ready to copy.
          </p>
        </div>

        {/* Interactive filter + grids */}
        <PromptsFilter
          industries={industriesData}
          roles={rolesData}
          methodologies={methodologiesData}
          workflows={workflowsData}
        />

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Can&apos;t Find What You Need?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Our ecosystem is constantly growing. Check out our other collections
            or let us know what prompts you&apos;d like to see.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-tools/tonalities">
              <Button variant="outline" className="gap-2">
                24 Writing Tonalities
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a
              href="https://github.com/gtm-skills/gtm/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                Request Prompts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
