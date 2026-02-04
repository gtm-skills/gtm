import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { industries } from '@/lib/prompts';
import {
  ArrowRight,
  Laptop,
  Banknote,
  HeartPulse,
  Factory,
  Briefcase,
  ShoppingCart,
  Building,
  GraduationCap,
  Truck,
  Zap,
  Landmark,
  RadioTower,
  PlayCircle,
  Hotel,
  HardHat,
  Shield,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industry Prompts | GTM Skills',
  description: '1600+ prompts tailored to 16 industries. SaaS, Financial Services, Healthcare, Manufacturing, Logistics, Energy, and more.',
};

const iconMap: Record<string, React.ElementType> = {
  laptop: Laptop,
  banknote: Banknote,
  'heart-pulse': HeartPulse,
  factory: Factory,
  briefcase: Briefcase,
  'shopping-cart': ShoppingCart,
  building: Building,
  'graduation-cap': GraduationCap,
  truck: Truck,
  zap: Zap,
  landmark: Landmark,
  'radio-tower': RadioTower,
  'play-circle': PlayCircle,
  hotel: Hotel,
  'hard-hat': HardHat,
  shield: Shield,
};

export default function IndustryPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400">
            1600+ Prompts
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Industry Packs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prompts tailored to your buyers across 16 industries. Each pack includes outreach, discovery,
            objection handling, proposals, and follow-up templates.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry) => {
            const Icon = iconMap[industry.icon] || Laptop;
            return (
              <Link
                key={industry.slug}
                href={`/industry/${industry.slug}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-blue-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                    {industry.name}
                  </h2>
                  <Badge variant="secondary" className="text-xs">
                    {industry.count}+
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {industry.description}
                </p>
                {industry.subcategories && (
                  <div className="flex flex-wrap gap-1">
                    {industry.subcategories.slice(0, 3).map((sub) => (
                      <span
                        key={sub.slug}
                        className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {industry.subcategories.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{industry.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                )}
                <ArrowRight className="h-4 w-4 text-muted-foreground mt-4 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Want all 1600+ industry prompts in one download?
          </p>
          <Link
            href="/download"
            className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-2"
          >
            Download the complete pack
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
