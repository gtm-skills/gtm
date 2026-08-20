'use client';

import { useState, useEffect } from 'react';
import { Star, Check, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics';

interface TonalityGateProps {
  children: React.ReactNode;
  tonalityName: string;
}

const STORAGE_KEY = 'gtm-starred';

export function TonalityGate({ children, tonalityName }: TonalityGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const starred = localStorage.getItem(STORAGE_KEY);
    if (starred === 'true') {
      setUnlocked(true);
    }
  }, []);

  const handleStarClick = () => {
    track('github_star_clicked', { tonality: tonalityName, location: 'tonality_gate' });
    window.open('https://github.com/gtm-skills/gtm', '_blank');

    // Show confirm button after delay
    setTimeout(() => {
      setHasClicked(true);
    }, 1500);
  };

  const handleConfirm = () => {
    track('github_star_confirmed', { tonality: tonalityName });
    localStorage.setItem(STORAGE_KEY, 'true');
    setUnlocked(true);
  };

  // During SSR, show nothing to prevent flash
  if (!isClient) {
    return null;
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Blurred content preview */}
      <div className="blur-sm pointer-events-none select-none opacity-50" aria-hidden="true">
        {children}
      </div>

      {/* Star gate overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background flex items-center justify-center">
        <div className="max-w-sm w-full mx-4">
          <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-2xl">
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2">
              Unlock {tonalityName}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Star our repo to unlock all premium tonalities. Takes 2 seconds.
            </p>

            {/* Action */}
            {!hasClicked ? (
              <Button
                onClick={handleStarClick}
                size="lg"
                className="w-full gap-2 bg-card hover:bg-accent"
              >
                <Github className="h-5 w-5" />
                <Star className="h-4 w-4 text-yellow-400" />
                Star on GitHub
                <ExternalLink className="h-3 w-3 ml-1 opacity-50" />
              </Button>
            ) : (
              <Button
                onClick={handleConfirm}
                size="lg"
                className="w-full gap-2 brand-gradient"
              >
                <Check className="h-5 w-5" />
                I've Starred – Unlock Content
              </Button>
            )}

            {/* What you unlock */}
            <div className="mt-6 pt-5 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">
                Unlocks all 12 premium tonalities:
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 text-xs">
                {['Hormozi', 'Buffett', 'Naval', 'Ogilvy', 'SPIN', 'Gap', 'Sandler', '+5 more'].map((name) => (
                  <span key={name} className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust signals */}
            <p className="text-xs text-muted-foreground mt-4">
              No email required • 100% free • MIT licensed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
