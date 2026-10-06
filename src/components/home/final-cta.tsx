/**
 * Final CTA Section
 * Single closing call-to-action asking visitors to star the repo on GitHub.
 * Merges the former "Support the Project" and "GitHub CTA" sections into one.
 */

import { Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GitHubStars } from '@/components/github-stars';

export function FinalCta() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-transparent border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative max-w-2xl mx-auto">
            <Badge variant="outline" className="label-mono mb-4 text-[11px] border-border text-muted-foreground">
              <Star className="h-3 w-3 mr-1 text-yellow-400" />
              Support Open Source
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Help Us Reach More Sales Teams
            </h2>
            <p className="text-muted-foreground mb-8">
              Star us on GitHub to help other sales professionals discover these resources.
            </p>
            <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-12 px-8 gap-2 brand-gradient">
                <Github className="h-5 w-5" />
                Star on GitHub
                <GitHubStars repo="gtm-skills/gtm" className="text-sm text-white/80 ml-1" />
              </Button>
            </a>
            <p className="text-xs text-muted-foreground mt-4">
              Open-source core (MIT) • Premium kits for finished playbooks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
