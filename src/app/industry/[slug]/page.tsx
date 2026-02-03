import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { SoftwareSourceCodeJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';
import { industries, getPromptsByCategory, getPromptsBySubcategory } from '@/lib/prompts';
import { ArrowLeft, Download, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    return { title: 'Not Found' };
  }

  return {
    title: `${industry.name} Prompts | GTM Skills`,
    description: `${industry.count}+ AI prompts for ${industry.name}. ${industry.description}`,
  };
}

export async function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const prompts = getPromptsByCategory(slug);

  return (
    <>
      <SoftwareSourceCodeJsonLd
        name={`${industry.name} AI Prompts - GTM Skills`}
        description={industry.description}
        url={`https://gtm-skills.com/industry/${slug}`}
        category={industry.name}
        promptCount={industry.count}
        keywords={['sales prompts', industry.name.toLowerCase(), 'AI prompts', 'B2B']}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gtm-skills.com' },
          { name: 'Industries', url: 'https://gtm-skills.com/industry' },
          { name: industry.name, url: `https://gtm-skills.com/industry/${slug}` },
        ]}
      />
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/industry" className="hover:text-foreground transition-colors">
              Industry
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{industry.name}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <div>
            <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400">
              {industry.count}+ Prompts
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {industry.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {industry.description}. Copy any prompt, customize the [BRACKETS], and paste into Claude or ChatGPT.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/industry">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Industries
              </Button>
            </Link>
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download Pack
            </Button>
          </div>
        </div>

        {/* Subcategories */}
        {industry.subcategories && (
          <div className="flex flex-wrap gap-2 mb-12">
            {industry.subcategories.map((sub) => (
              <a
                key={sub.slug}
                href={`#${sub.slug}`}
                className="px-4 py-2 rounded-full border border-border bg-card hover:border-blue-500/50 text-sm transition-colors"
              >
                {sub.name}
                <span className="ml-2 text-muted-foreground">({sub.count})</span>
              </a>
            ))}
          </div>
        )}

        {/* Prompts by Subcategory */}
        {industry.subcategories?.map((sub) => {
          const subPrompts = getPromptsBySubcategory(slug, sub.slug);

          return (
            <section key={sub.slug} id={sub.slug} className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                {sub.name}
                <Badge variant="secondary">{subPrompts.length || sub.count}</Badge>
              </h2>

              {subPrompts.length > 0 ? (
                <div className="space-y-6">
                  {subPrompts.map((prompt) => (
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
                <div className="p-8 rounded-xl border border-dashed border-border text-center">
                  <p className="text-muted-foreground mb-4">
                    {sub.count} prompts coming soon for {sub.name}
                  </p>
                  <Button variant="outline" size="sm">
                    Get notified when ready
                  </Button>
                </div>
              )}
            </section>
          );
        })}

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-xl bg-zinc-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want AI That Runs These Prompts Automatically?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Prospeda is an AI sales team that finds leads in {industry.name.toLowerCase()},
            researches them, and writes personalized outreach.
          </p>
          <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Try Prospeda Free
            </Button>
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
