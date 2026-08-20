import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { HowToJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Clock,
  CheckCircle2,
  ExternalLink,
  ListChecks,
} from 'lucide-react';
import type { Metadata } from 'next';
import { getAllTutorialSlugs, getTutorialBySlug, tutorials } from '@/data/tutorials';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    return { title: 'Not Found' };
  }

  const title = `${tutorial.title} | GTM Skills Tutorials`;

  return {
    title,
    description: tutorial.description,
    keywords: `${tutorial.tags.join(', ').toLowerCase()}, gtm skills tutorial, ai sales automation`,
    openGraph: {
      title,
      description: tutorial.description,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllTutorialSlugs();
  return slugs.map((slug) => ({ slug }));
}

function getAdjacentTutorials(currentSlug: string) {
  const index = tutorials.findIndex((t) => t.slug === currentSlug);
  const others = tutorials.filter((t) => t.slug !== currentSlug);
  const next = tutorials[(index + 1) % tutorials.length];
  const nextTutorial = next.slug === currentSlug ? others[0] : next;
  return { others, next: nextTutorial };
}

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    notFound();
  }

  const { others, next } = getAdjacentTutorials(slug);

  return (
    <>
      <HowToJsonLd
        name={tutorial.title}
        description={tutorial.description}
        steps={tutorial.steps.map((step) => ({
          name: step.title,
          text: step.body,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gtm-skills.com' },
          { name: 'Tutorials', url: 'https://gtm-skills.com/tutorials' },
          { name: tutorial.title, url: `https://gtm-skills.com/tutorials/${slug}` },
        ]}
      />
      <div className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/tutorials" className="hover:text-foreground transition-colors">
              Tutorials
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{tutorial.title}</span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline" className="border-green-500/30 text-green-400">
                <BookOpen className="h-3 w-3 mr-1" />
                Tutorial
              </Badge>
              <Badge variant="outline">{tutorial.difficulty}</Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {tutorial.time}
              </span>
              {tutorial.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {tutorial.title}
            </h1>
            <p className="text-lg text-muted-foreground">{tutorial.description}</p>
          </div>

          {/* Intro */}
          <div className="mb-12 p-6 rounded-xl bg-card border border-border">
            <p className="text-sm text-foreground leading-relaxed">{tutorial.intro}</p>
          </div>

          {/* Prerequisites */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-cyan-400" />
              Prerequisites
            </h2>
            <ul className="space-y-2">
              {tutorial.prerequisites.map((prereq, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 p-3 rounded-lg bg-card border border-border"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{prereq}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-400" />
              Step-by-Step
            </h2>
            <div className="space-y-8">
              {tutorial.steps.map((step, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border hover:border-border transition-colors"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold pt-1">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 ml-12">
                    {step.body}
                  </p>
                  {step.code && step.code.length > 0 && (
                    <div className="space-y-4 ml-12">
                      {step.code.map((block, blockIndex) => (
                        <div key={blockIndex}>
                          <div className="flex items-center justify-between gap-4 mb-2">
                            {block.label && (
                              <div className="text-xs text-muted-foreground font-medium">
                                {block.label}
                              </div>
                            )}
                            <CopyButton
                              text={block.code}
                              label={`${tutorial.title} - Step ${index + 1} - ${block.label ?? 'code'}`}
                              className="ml-auto"
                            />
                          </div>
                          <pre className="whitespace-pre-wrap text-sm text-foreground font-mono bg-card/50 p-4 rounded-lg overflow-x-auto">
                            {block.code}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Wrap up */}
          <div className="mb-12 p-6 rounded-xl bg-card border border-border">
            <h2 className="text-lg font-semibold mb-2">Wrap-Up</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{tutorial.wrapUp}</p>
          </div>

          {/* Related tutorials */}
          {others.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4">More Tutorials</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {others.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/tutorials/${related.slug}`}
                    className="p-4 rounded-lg border border-border bg-card hover:border-green-500/30 transition-colors"
                  >
                    <div className="font-semibold text-sm mb-1">{related.title}</div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 via-cyan-500/5 to-transparent border border-green-500/20 text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Want a Done-For-You Solution?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              This tutorial shows you the DIY approach. Prospeda handles everything—research,
              personalization, and outbound—so you can focus on closing.
            </p>
            <a
              href={`https://prospeda.com?utm_source=gtm-skills&utm_content=tutorial-${slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gap-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600">
                Explore Prospeda
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link href="/tutorials">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Tutorials
              </Button>
            </Link>
            <Link href={`/tutorials/${next.slug}`}>
              <Button variant="outline" className="gap-2">
                Next: {next.title}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
