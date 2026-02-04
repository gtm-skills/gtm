/**
 * Community Hub Page
 * Central page for leaderboard, contributors, and community features
 */

import Link from 'next/link';
import { ArrowRight, Trophy, Users, Plus, Star, ThumbsUp, Copy, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Community | GTM Skills',
  description: 'Join the GTM Skills community. Vote on prompts, contribute your own, and earn recognition.',
};

const stats = [
  { label: 'Total Prompts', value: '2,500+', icon: Copy },
  { label: 'Community Votes', value: '12.4K', icon: ThumbsUp },
  { label: 'Contributors', value: '150+', icon: Users },
  { label: 'Outcomes Tracked', value: '847', icon: Target },
];

const features = [
  {
    title: 'Leaderboard',
    description: 'See the top prompts voted by the community. Track what works and learn from the best.',
    href: '/leaderboard',
    icon: Trophy,
    color: 'amber',
    cta: 'View Leaderboard',
  },
  {
    title: 'Contributors',
    description: 'Meet the sales pros building GTM Skills. Top contributors earn badges and recognition.',
    href: '/contributors',
    icon: Users,
    color: 'pink',
    cta: 'See Contributors',
  },
  {
    title: 'Submit a Prompt',
    description: 'Share your winning prompts with the community. Get votes, feedback, and attribution.',
    href: '/leaderboard/submit',
    icon: Plus,
    color: 'emerald',
    cta: 'Submit Prompt',
  },
  {
    title: 'Certifications',
    description: 'Get certified in agentic sales. Free courses, assessments, and badges you can share.',
    href: '/certifications',
    icon: Award,
    color: 'purple',
    cta: 'Get Certified',
  },
];

function getColorClasses(color: string) {
  const colors: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-400',
      gradient: 'from-amber-500 to-orange-500',
    },
    pink: {
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
      text: 'text-pink-400',
      gradient: 'from-pink-500 to-purple-500',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      gradient: 'from-emerald-500 to-teal-500',
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      text: 'text-purple-400',
      gradient: 'from-purple-500 to-violet-500',
    },
  };
  return colors[color] || colors.amber;
}

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-pink-500/30 text-pink-400">
              <Users className="h-3 w-3 mr-1" />
              Community
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Built by Sales Pros,<br />For Sales Pros
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              GTM Skills is community-driven. Vote on prompts, contribute your own,
              and help shape the future of agentic sales.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/leaderboard/submit">
                <Button className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  <Plus className="h-4 w-4" />
                  Submit a Prompt
                </Button>
              </Link>
              <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Star className="h-4 w-4" />
                  Star on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg"
              >
                <stat.icon className="h-5 w-5 text-pink-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const colors = getColorClasses(feature.color);
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className={`${colors.bg} border ${colors.border} rounded-xl p-6 hover:border-opacity-50 transition-colors group`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-opacity-90">
                        {feature.title}
                      </h2>
                      <p className="text-zinc-400 text-sm mb-4">{feature.description}</p>
                      <span className={`inline-flex items-center gap-1 text-sm ${colors.text}`}>
                        {feature.cta}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 border-t border-zinc-800 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Contribute</h2>
            <p className="text-muted-foreground">
              Three ways to help build the best agentic GTM ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Vote on Prompts</h3>
              <p className="text-sm text-muted-foreground">
                Upvote prompts that work. Help the community find the best content.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Submit Prompts</h3>
              <p className="text-sm text-muted-foreground">
                Share your winning prompts. Get votes, feedback, and attribution.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Report Outcomes</h3>
              <p className="text-sm text-muted-foreground">
                Track what works. Share wins to help others learn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border border-pink-500/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Start by browsing the leaderboard, then submit your first prompt.
              The community is waiting to vote on your best work.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/leaderboard">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  <Trophy className="h-4 w-4" />
                  View Leaderboard
                </Button>
              </Link>
              <Link href="/contributors">
                <Button size="lg" variant="outline" className="gap-2 border-pink-500/30 text-pink-400 hover:bg-pink-500/10">
                  <Users className="h-4 w-4" />
                  Meet Contributors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
