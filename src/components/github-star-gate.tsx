'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Star, Download, ExternalLink, Check } from 'lucide-react';
import { track } from '@vercel/analytics';

interface GitHubStarGateProps {
  onUnlock?: () => void;
  variant?: 'default' | 'compact' | 'hero';
  downloadUrl?: string;
}

export function GitHubStarGate({
  onUnlock,
  variant = 'default',
  downloadUrl = 'https://github.com/gtm-skills/gtm'
}: GitHubStarGateProps) {
  const [hasStarred, setHasStarred] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const handleStarClick = () => {
    track('github_star_clicked', { variant, location: 'star_gate' });
    window.open('https://github.com/gtm-skills/gtm', '_blank');

    // After a short delay, show the "I've starred" option
    setTimeout(() => {
      setHasStarred(true);
    }, 2000);
  };

  const handleConfirmStar = () => {
    track('github_star_confirmed', { variant });
    setShowDownload(true);
    onUnlock?.();
  };

  if (showDownload) {
    return (
      <div className={`text-center ${variant === 'compact' ? 'py-2' : 'py-4'}`}>
        <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
          <Check className="h-5 w-5" />
          <span className="font-medium">Thanks for your support!</span>
        </div>
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
          <Button className="gap-2 brand-gradient">
            <Download className="h-4 w-4" />
            Download Full Library
            <ExternalLink className="h-3 w-3" />
          </Button>
        </a>
        <p className="text-xs text-muted-foreground mt-3">
          Clone or download from GitHub
        </p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {!hasStarred ? (
          <Button onClick={handleStarClick} variant="outline" className="gap-2">
            <Github className="h-4 w-4" />
            <Star className="h-4 w-4" />
            Star to Download
          </Button>
        ) : (
          <Button onClick={handleConfirmStar} className="gap-2 brand-gradient">
            <Check className="h-4 w-4" />
            I've Starred - Unlock Download
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="max-w-md mx-auto">
        {!hasStarred ? (
          <>
            <Button
              onClick={handleStarClick}
              size="lg"
              className="w-full gap-2 h-12 bg-muted hover:bg-accent border border-border"
            >
              <Github className="h-5 w-5" />
              <Star className="h-4 w-4 text-yellow-400" />
              Star on GitHub to Unlock Downloads
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Support the open source project • Takes 2 seconds
            </p>
          </>
        ) : (
          <>
            <Button
              onClick={handleConfirmStar}
              size="lg"
              className="w-full gap-2 h-12 brand-gradient"
            >
              <Check className="h-5 w-5" />
              I've Starred - Unlock Downloads
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Click above to access the full library
            </p>
          </>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className="p-6 rounded-xl bg-card/50 border border-border text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Github className="h-6 w-6" />
        <Star className="h-5 w-5 text-yellow-400" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Support the Project</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Star us on GitHub to unlock the full download. Help us reach more sales professionals!
      </p>
      {!hasStarred ? (
        <Button onClick={handleStarClick} className="gap-2">
          <Github className="h-4 w-4" />
          Star on GitHub
        </Button>
      ) : (
        <Button
          onClick={handleConfirmStar}
          className="gap-2 brand-gradient"
        >
          <Check className="h-4 w-4" />
          I've Starred - Unlock
        </Button>
      )}
      <p className="text-xs text-muted-foreground mt-4">
        Open-source core • MIT licensed
      </p>
    </div>
  );
}
