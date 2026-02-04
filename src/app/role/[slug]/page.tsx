import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { SoftwareSourceCodeJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';
import { roles, getRolePrompts } from '@/lib/prompts';
import { ArrowLeft, Download, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);

  if (!role) {
    return { title: 'Not Found' };
  }

  return {
    title: `${role.name} Prompts | GTM Skills`,
    description: `${role.count}+ prompts for ${role.name}. ${role.description}`,
  };
}

export async function generateStaticParams() {
  return roles.map((role) => ({
    slug: role.slug,
  }));
}

export default async function RoleDetailPage({ params }: Props) {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);

  if (!role) {
    notFound();
  }

  const prompts = getRolePrompts(slug);

  return (
    <>
      <SoftwareSourceCodeJsonLd
        name={`${role.name} Prompts - GTM Skills`}
        description={role.description}
        url={`https://gtm-skills.com/role/${slug}`}
        category={role.name}
        promptCount={role.count}
        keywords={['sales prompts', role.name.toLowerCase(), 'GTM prompts']}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gtm-skills.com' },
          { name: 'Roles', url: 'https://gtm-skills.com/role' },
          { name: role.name, url: `https://gtm-skills.com/role/${slug}` },
        ]}
      />
      <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/role" className="hover:text-foreground transition-colors">
            Role
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{role.name}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <div>
            <Badge variant="outline" className="mb-4 border-green-500/30 text-green-400">
              {role.count}+ Prompts
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {role.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {role.description}. Copy any prompt, customize the [BRACKETS], and paste into Claude or ChatGPT.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/role">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Roles
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
              {role.count} prompts coming soon for {role.name}
            </p>
            <Button variant="outline" size="sm">
              Get notified when ready
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-xl bg-zinc-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want AI That Runs These Prompts Automatically?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Prospeda is an AI sales team that automates prospecting, research,
            and personalized outreach for {role.name.toLowerCase()}s.
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
