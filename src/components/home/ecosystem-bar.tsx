/**
 * Ecosystem Bar Component
 * Thin bar below hero showing all features with colored icons
 */

import Link from 'next/link';
import {
  FileText,
  Globe,
  Mic,
  Trophy,
  Link2,
  Code,
  Award,
  Users,
} from 'lucide-react';

const ecosystemItems = [
  {
    label: 'Prompts',
    href: '/prompts',
    icon: FileText,
    color: 'text-orange-400',
  },
  {
    label: 'Extension',
    href: '/download',
    icon: Globe,
    color: 'text-blue-400',
  },
  {
    label: 'Voice Templates',
    href: '/voice-templates',
    icon: Mic,
    color: 'text-violet-400',
  },
  {
    label: 'Leaderboard',
    href: '/leaderboard',
    icon: Trophy,
    color: 'text-amber-400',
  },
  {
    label: 'HubSpot',
    href: '/integrations/hubspot',
    icon: Link2,
    color: 'text-teal-400',
  },
  {
    label: 'API',
    href: '/developers',
    icon: Code,
    color: 'text-emerald-400',
  },
  {
    label: 'Certifications',
    href: '/certifications',
    icon: Award,
    color: 'text-purple-400',
  },
  {
    label: 'Contributors',
    href: '/contributors',
    icon: Users,
    color: 'text-pink-400',
  },
];

export function EcosystemBar() {
  return (
    <section className="py-4 bg-card/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
          {ecosystemItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <item.icon className={`h-4 w-4 ${item.color} group-hover:scale-110 transition-transform`} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
