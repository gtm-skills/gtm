import type { ReactNode } from 'react';

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="label-mono text-xs text-muted-foreground mb-3">Last updated {updated}</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">{title}</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-primary [&_a]:underline">
        {children}
      </div>
    </div>
  );
}
