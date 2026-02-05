'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search,
  X,
  Building2,
  Users,
  BookOpen,
  Workflow,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface FilterableItem {
  slug: string;
  name: string;
  shortName: string;
}

interface PromptsFilterProps {
  industries: FilterableItem[];
  roles: FilterableItem[];
  methodologies: FilterableItem[];
  workflows: FilterableItem[];
}

type FilterDimension = 'all' | 'industry' | 'role' | 'methodology' | 'workflow';

const popularCombinations = [
  { href: '/prompts/saas/sdr/cold-outreach', label: 'SaaS SDR Cold Outreach', tags: ['saas', 'sdr', 'outreach'] },
  { href: '/prompts/saas/ae/discovery', label: 'SaaS AE Discovery', tags: ['saas', 'ae', 'discovery'] },
  { href: '/prompts/saas/meddpicc', label: 'MEDDPICC for SaaS', tags: ['saas', 'meddpicc'] },
  { href: '/prompts/fintech/sdr/cold-outreach', label: 'FinTech SDR Outreach', tags: ['fintech', 'sdr', 'outreach'] },
  { href: '/prompts/healthcare/ae/objection-handling', label: 'Healthcare AE Objections', tags: ['healthcare', 'ae'] },
  { href: '/prompts/saas/ae/negotiation', label: 'SaaS AE Negotiation', tags: ['saas', 'ae', 'negotiation'] },
  { href: '/prompts/sdr/cold-outreach', label: 'SDR Cold Outreach', tags: ['sdr', 'outreach'] },
  { href: '/prompts/ae/objection-handling', label: 'AE Objection Handling', tags: ['ae', 'objections'] },
  { href: '/prompts/fintech/ae', label: 'FinTech AE Prompts', tags: ['fintech', 'ae'] },
  { href: '/prompts/manufacturing/sdr/follow-up', label: 'Manufacturing SDR Follow-up', tags: ['manufacturing', 'sdr'] },
  { href: '/prompts/saas/challenger', label: 'Challenger Sale for SaaS', tags: ['saas', 'challenger'] },
  { href: '/prompts/ecommerce/sdr/cold-outreach', label: 'E-commerce SDR Outreach', tags: ['ecommerce', 'sdr'] },
];

export function PromptsFilter({ industries, roles, methodologies, workflows }: PromptsFilterProps) {
  const [search, setSearch] = useState('');
  const [activeDimension, setActiveDimension] = useState<FilterDimension>('all');

  const searchLower = search.toLowerCase();

  const filteredIndustries = useMemo(() => {
    if (!searchLower) return industries;
    return industries.filter(
      (i) => i.name.toLowerCase().includes(searchLower) || i.shortName.toLowerCase().includes(searchLower) || i.slug.includes(searchLower)
    );
  }, [industries, searchLower]);

  const filteredRoles = useMemo(() => {
    if (!searchLower) return roles;
    return roles.filter(
      (r) => r.name.toLowerCase().includes(searchLower) || r.shortName.toLowerCase().includes(searchLower) || r.slug.includes(searchLower)
    );
  }, [roles, searchLower]);

  const filteredMethodologies = useMemo(() => {
    if (!searchLower) return methodologies;
    return methodologies.filter(
      (m) => m.name.toLowerCase().includes(searchLower) || m.shortName.toLowerCase().includes(searchLower) || m.slug.includes(searchLower)
    );
  }, [methodologies, searchLower]);

  const filteredWorkflows = useMemo(() => {
    if (!searchLower) return workflows;
    return workflows.filter(
      (w) => w.name.toLowerCase().includes(searchLower) || w.shortName.toLowerCase().includes(searchLower) || w.slug.includes(searchLower)
    );
  }, [workflows, searchLower]);

  const filteredPopular = useMemo(() => {
    if (!searchLower) return popularCombinations;
    return popularCombinations.filter(
      (c) => c.label.toLowerCase().includes(searchLower) || c.tags.some((t) => t.includes(searchLower))
    );
  }, [searchLower]);

  const showIndustryRole = activeDimension === 'all' || activeDimension === 'industry' || activeDimension === 'role';
  const showIndustryMethod = activeDimension === 'all' || activeDimension === 'industry' || activeDimension === 'methodology';
  const showRoleWorkflow = activeDimension === 'all' || activeDimension === 'role' || activeDimension === 'workflow';

  const hasResults = filteredIndustries.length > 0 || filteredRoles.length > 0 || filteredMethodologies.length > 0 || filteredWorkflows.length > 0;

  const dimensionChips: { key: FilterDimension; label: string; icon: React.ElementType; count: number }[] = [
    { key: 'all', label: 'All', icon: Search, count: industries.length + roles.length + methodologies.length + workflows.length },
    { key: 'industry', label: 'Industry', icon: Building2, count: industries.length },
    { key: 'role', label: 'Role', icon: Users, count: roles.length },
    { key: 'methodology', label: 'Methodology', icon: BookOpen, count: methodologies.length },
    { key: 'workflow', label: 'Workflow', icon: Workflow, count: workflows.length },
  ];

  return (
    <div>
      {/* Sticky search + filter bar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border -mx-6 px-6 py-4 mb-8">
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search prompts... (e.g. &quot;saas sdr&quot;, &quot;meddpicc&quot;, &quot;cold outreach&quot;)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {dimensionChips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setActiveDimension(chip.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeDimension === chip.key
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-zinc-600'
              }`}
            >
              <chip.icon className="h-3 w-3" />
              {chip.label}
              <span className="text-[10px] opacity-70">{chip.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Combinations */}
      {(activeDimension === 'all' && !search) && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="h-5 w-5 text-orange-400" />
            <h2 className="text-lg font-semibold">Popular Combinations</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {popularCombinations.slice(0, 8).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-3 rounded-lg border border-border bg-card hover:border-orange-500/30 hover:bg-orange-500/5 transition-colors text-sm group"
              >
                <span className="text-foreground group-hover:text-orange-400 transition-colors">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Search results for popular */}
      {search && filteredPopular.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="h-4 w-4 text-orange-400" />
            <h3 className="text-sm font-medium text-muted-foreground">Quick Links</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {filteredPopular.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-2.5 rounded-lg border border-border bg-card hover:border-orange-500/30 transition-colors text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Industry × Role Grid */}
      {showIndustryRole && filteredIndustries.length > 0 && filteredRoles.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-bold">By Industry + Role</h2>
            <Badge variant="secondary" className="text-xs">{filteredIndustries.length * filteredRoles.length} pages</Badge>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Industry</th>
                  {filteredRoles.map((role) => (
                    <th key={role.slug} className="text-center py-3 px-2 font-medium text-muted-foreground">
                      {role.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredIndustries.map((industry) => (
                  <tr key={industry.slug} className="border-t border-border/50 hover:bg-blue-500/5 transition-colors">
                    <td className="py-3 px-4 font-medium">{industry.shortName}</td>
                    {filteredRoles.map((role) => (
                      <td key={role.slug} className="text-center py-3 px-2">
                        <Link
                          href={`/prompts/${industry.slug}/${role.slug}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                          title={`${industry.shortName} ${role.shortName} Prompts`}
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Industry × Methodology Grid */}
      {showIndustryMethod && filteredIndustries.length > 0 && filteredMethodologies.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-5 w-5 text-green-400" />
            <h2 className="text-xl font-bold">By Industry + Methodology</h2>
            <Badge variant="secondary" className="text-xs">{filteredIndustries.length * filteredMethodologies.length} pages</Badge>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Industry</th>
                  {filteredMethodologies.map((method) => (
                    <th key={method.slug} className="text-center py-3 px-2 font-medium text-muted-foreground">
                      {method.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredIndustries.map((industry) => (
                  <tr key={industry.slug} className="border-t border-border/50 hover:bg-green-500/5 transition-colors">
                    <td className="py-3 px-4 font-medium">{industry.shortName}</td>
                    {filteredMethodologies.map((method) => (
                      <td key={method.slug} className="text-center py-3 px-2">
                        <Link
                          href={`/prompts/${industry.slug}/${method.slug}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors"
                          title={`${method.shortName} for ${industry.shortName}`}
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Role × Workflow Grid */}
      {showRoleWorkflow && filteredRoles.length > 0 && filteredWorkflows.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Workflow className="h-5 w-5 text-purple-400" />
            <h2 className="text-xl font-bold">By Role + Workflow</h2>
            <Badge variant="secondary" className="text-xs">{filteredRoles.length * filteredWorkflows.length} pages</Badge>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                  {filteredWorkflows.map((workflow) => (
                    <th key={workflow.slug} className="text-center py-3 px-2 font-medium text-muted-foreground">
                      {workflow.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role) => (
                  <tr key={role.slug} className="border-t border-border/50 hover:bg-purple-500/5 transition-colors">
                    <td className="py-3 px-4 font-medium">{role.shortName}</td>
                    {filteredWorkflows.map((workflow) => (
                      <td key={workflow.slug} className="text-center py-3 px-2">
                        <Link
                          href={`/prompts/${role.slug}/${workflow.slug}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-colors"
                          title={`${role.shortName} ${workflow.shortName} Prompts`}
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* No results */}
      {search && !hasResults && filteredPopular.length === 0 && (
        <div className="text-center py-16">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No prompts found for &ldquo;{search}&rdquo;</h3>
          <p className="text-sm text-muted-foreground mb-4">Try a different search term or browse by category.</p>
          <Button variant="outline" size="sm" onClick={() => { setSearch(''); setActiveDimension('all'); }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Triple Combinations - only when no search active */}
      {!search && activeDimension === 'all' && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-5 rounded bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">3</span>
            </div>
            <h2 className="text-xl font-bold">Industry + Role + Workflow</h2>
            <Badge variant="secondary" className="text-xs">{industries.length * roles.length * workflows.length} pages</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            The most specific prompts — tailored for a specific role doing a specific workflow in a specific industry.
          </p>
          <div className="grid md:grid-cols-4 gap-2 mb-4">
            {popularCombinations.slice(0, 8).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-2.5 rounded-lg border border-border bg-card hover:border-orange-500/30 transition-colors text-center text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <details className="group">
            <summary className="cursor-pointer text-sm text-orange-400 hover:text-orange-300 flex items-center gap-2">
              Browse all {industries.length * roles.length * workflows.length} combinations
              <ArrowRight className="h-3 w-3 group-open:rotate-90 transition-transform" />
            </summary>
            <div className="mt-4 p-4 rounded-lg bg-card/50 border border-border">
              <p className="text-sm text-muted-foreground mb-4">Select an industry to see all role + workflow combinations:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {industries.map((industry) => (
                  <div key={industry.slug} className="p-3 rounded-lg border border-border bg-card">
                    <div className="font-medium text-sm mb-2">{industry.shortName}</div>
                    <div className="flex flex-wrap gap-1">
                      {roles.slice(0, 3).map((role) => (
                        <Link
                          key={role.slug}
                          href={`/prompts/${industry.slug}/${role.slug}/cold-outreach`}
                          className="text-xs px-2 py-1 rounded bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors"
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
      )}

      {/* Stats */}
      {!search && activeDimension === 'all' && (
        <section className="mb-12 p-6 rounded-xl bg-card/50 border border-border">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">{industries.length * roles.length}</div>
              <div className="text-xs text-muted-foreground">Industry + Role</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{industries.length * methodologies.length}</div>
              <div className="text-xs text-muted-foreground">Industry + Method</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{roles.length * workflows.length}</div>
              <div className="text-xs text-muted-foreground">Role + Workflow</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">{industries.length * roles.length * workflows.length}</div>
              <div className="text-xs text-muted-foreground">Triple Combos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {(industries.length * roles.length) + (industries.length * methodologies.length) + (roles.length * workflows.length) + (industries.length * roles.length * workflows.length)}
              </div>
              <div className="text-xs text-muted-foreground">Total Pages</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
