import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Building2,
  Users,
  BookOpen,
  Workflow,
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
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
            <Search className="h-3 w-3 mr-1" />
            2,500+ Prompts
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Find the Perfect Prompt
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse prompts by industry, role, methodology, or workflow.
            Every combination has tailored templates ready to copy.
          </p>
        </div>

        {/* Industry × Role Grid */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold">By Industry + Role</h2>
            <Badge variant="secondary">{industries.length * roles.length} pages</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Prompts tailored for specific roles selling into specific industries.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Industry</th>
                  {roles.map((role) => (
                    <th key={role.slug} className="text-center py-3 px-2 font-medium text-muted-foreground">
                      {role.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {industries.map((industry) => (
                  <tr key={industry.slug} className="border-b border-border/50 hover:bg-zinc-900/30">
                    <td className="py-3 px-4 font-medium">{industry.shortName}</td>
                    {roles.map((role) => (
                      <td key={role.slug} className="text-center py-3 px-2">
                        <Link
                          href={`/prompts/${industry.slug}/${role.slug}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                        >
                          →
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Industry × Methodology Grid */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold">By Industry + Methodology</h2>
            <Badge variant="secondary">{industries.length * methodologies.length} pages</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Apply proven sales methodologies to specific industries.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Industry</th>
                  {methodologies.map((method) => (
                    <th key={method.slug} className="text-center py-3 px-2 font-medium text-muted-foreground">
                      {method.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {industries.map((industry) => (
                  <tr key={industry.slug} className="border-b border-border/50 hover:bg-zinc-900/30">
                    <td className="py-3 px-4 font-medium">{industry.shortName}</td>
                    {methodologies.map((method) => (
                      <td key={method.slug} className="text-center py-3 px-2">
                        <Link
                          href={`/prompts/${industry.slug}/${method.slug}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors"
                        >
                          →
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Role × Workflow Grid */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Workflow className="h-6 w-6 text-purple-400" />
            <h2 className="text-2xl font-bold">By Role + Workflow</h2>
            <Badge variant="secondary">{roles.length * workflows.length} pages</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Workflow-specific prompts for each sales role.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                  {workflows.map((workflow) => (
                    <th key={workflow.slug} className="text-center py-3 px-2 font-medium text-muted-foreground">
                      {workflow.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.slug} className="border-b border-border/50 hover:bg-zinc-900/30">
                    <td className="py-3 px-4 font-medium">{role.shortName}</td>
                    {workflows.map((workflow) => (
                      <td key={workflow.slug} className="text-center py-3 px-2">
                        <Link
                          href={`/prompts/${role.slug}/${workflow.slug}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-colors"
                        >
                          →
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tier 2: Triple Combinations */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 rounded bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <h2 className="text-2xl font-bold">Industry + Role + Workflow</h2>
            <Badge variant="secondary">{industries.length * roles.length * workflows.length} pages</Badge>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Tier 2</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            The most specific prompts—tailored for a specific role doing a specific workflow in a specific industry.
          </p>

          {/* Show a sample of popular triple combinations */}
          <div className="grid md:grid-cols-4 gap-3 mb-6">
            {[
              { href: '/prompts/saas/sdr/cold-outreach', label: 'SaaS SDR Cold Outreach' },
              { href: '/prompts/saas/ae/discovery', label: 'SaaS AE Discovery' },
              { href: '/prompts/fintech/sdr/cold-outreach', label: 'FinTech SDR Cold Outreach' },
              { href: '/prompts/healthcare/ae/objection-handling', label: 'Healthcare AE Objections' },
              { href: '/prompts/saas/ae/negotiation', label: 'SaaS AE Negotiation' },
              { href: '/prompts/manufacturing/sdr/follow-up', label: 'Manufacturing SDR Follow-up' },
              { href: '/prompts/fintech/ae/demo', label: 'FinTech AE Demo' },
              { href: '/prompts/ecommerce/sdr/cold-outreach', label: 'E-commerce SDR Outreach' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-3 rounded-lg border border-border bg-card hover:border-orange-500/30 transition-colors text-center text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Expandable industry selector */}
          <details className="group">
            <summary className="cursor-pointer text-sm text-orange-400 hover:text-orange-300 flex items-center gap-2">
              Browse all {industries.length * roles.length * workflows.length} combinations →
            </summary>
            <div className="mt-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <p className="text-sm text-muted-foreground mb-4">Select an industry to see all role + workflow combinations:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {industries.map((industry) => (
                  <div key={industry.slug} className="p-3 rounded border border-border bg-card">
                    <div className="font-medium text-sm mb-2">{industry.shortName}</div>
                    <div className="flex flex-wrap gap-1">
                      {roles.slice(0, 3).map((role) => (
                        <Link
                          key={role.slug}
                          href={`/prompts/${industry.slug}/${role.slug}/cold-outreach`}
                          className="text-xs px-2 py-1 rounded bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"
                        >
                          {role.shortName}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </section>

        {/* Stats */}
        <section className="mb-16 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">{industries.length * roles.length}</div>
              <div className="text-sm text-muted-foreground">Industry + Role</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">{industries.length * methodologies.length}</div>
              <div className="text-sm text-muted-foreground">Industry + Method</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">{roles.length * workflows.length}</div>
              <div className="text-sm text-muted-foreground">Role + Workflow</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">{industries.length * roles.length * workflows.length}</div>
              <div className="text-sm text-muted-foreground">Triple Combos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {(industries.length * roles.length) + (industries.length * methodologies.length) + (roles.length * workflows.length) + (industries.length * roles.length * workflows.length)}
              </div>
              <div className="text-sm text-muted-foreground">Total Pages</div>
            </div>
          </div>
        </section>

        {/* Popular Combinations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Popular Combinations</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: '/prompts/saas/sdr/cold-outreach', label: 'SaaS SDR Cold Outreach', desc: 'Cold emails for software sales' },
              { href: '/prompts/saas/meddpicc', label: 'MEDDPICC for SaaS', desc: 'Enterprise qualification' },
              { href: '/prompts/sdr/cold-outreach', label: 'SDR Cold Outreach', desc: 'Email and LinkedIn templates' },
              { href: '/prompts/fintech/ae', label: 'FinTech AE Prompts', desc: 'Discovery and closing' },
              { href: '/prompts/healthcare/meddpicc', label: 'MEDDPICC for Healthcare', desc: 'Complex sale qualification' },
              { href: '/prompts/ae/objection-handling', label: 'AE Objection Handling', desc: 'Common pushback responses' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-4 rounded-xl border border-border bg-card hover:border-orange-500/30 transition-colors"
              >
                <div className="font-semibold mb-1">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Can't Find What You Need?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Our library is constantly growing. Check out our other collections
            or let us know what prompts you'd like to see.
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
