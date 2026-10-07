import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STATS } from '@/data/skills';
import { SkillMarquee } from './skill-marquee';
import { WorksWith } from './works-with';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-10 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-[88px] font-semibold tracking-[-0.035em] leading-[0.95] text-balance">
          Agent skills that sell.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Installable playbooks for prospecting, discovery, closing and RevOps. Drop them into Claude Code, Cursor, Codex or ChatGPT and your agent sells the way your best rep does.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/skills">
            <Button size="lg" className="h-12 px-7 text-sm gap-2">
              Browse {STATS.skills} skills <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/plugin">
            <Button size="lg" variant="outline" className="h-12 px-7 text-sm">
              Use it in ChatGPT
            </Button>
          </Link>
        </div>
      </div>
      <div className="pb-14">
        <SkillMarquee />
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <WorksWith />
      </div>
    </section>
  );
}
