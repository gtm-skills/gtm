import { FeedbackWidget } from '@/components/feedback-widget';
import { PremiumBanner } from '@/components/home/premium-banner';
import { Hero } from '@/components/home/hero';
import { FeaturedPremium } from '@/components/home/featured-premium';
import { FreeSkillsRow } from '@/components/home/free-skills-row';
import { Trending } from '@/components/home/trending';
import { InstallSteps } from '@/components/home/install-steps';
import { PricingCards } from '@/components/pricing/pricing-cards';
import { Faq, homeFaqs } from '@/components/home/faq';
import { getLaunchState } from '@/lib/entitlements';
import { getInstallCounts } from '@/lib/installs';
import { kits, formatPrice } from '@/data/skills';

export const revalidate = 300;

export default async function Home() {
  const [launch, installs] = await Promise.all([getLaunchState('full-bundle'), getInstallCounts()]);
  const bundle = kits.find((k) => k.id === 'full-bundle')!;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PremiumBanner
        seatsLeft={launch.left}
        launchPrice={formatPrice(bundle.launchPriceCents ?? bundle.priceCents)}
        regularPrice={formatPrice(bundle.priceCents)}
      />

      <Hero />
      <FeaturedPremium installs={installs} />
      <FreeSkillsRow />
      <Trending installs={installs} />
      <InstallSteps />

      <section id="pricing" className="border-t border-border bg-card/40">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Buy the kit. Or take everything.</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">Pay once per kit, grab the Bundle while the launch price holds, or go monthly with Pro.</p>
          </div>
          <PricingCards launch={launch} compact />
        </div>
      </section>

      <Faq />
      <FeedbackWidget />
    </div>
  );
}
