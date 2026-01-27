'use client';

import { track } from '@vercel/analytics';
import Link from 'next/link';

interface TrackedLinkProps {
  href: string;
  children: React.ReactNode;
  eventName?: string;
  eventData?: Record<string, string | number | boolean>;
  className?: string;
  target?: string;
  rel?: string;
}

export function TrackedLink({
  href,
  children,
  eventName,
  eventData = {},
  className,
  target,
  rel,
}: TrackedLinkProps) {
  const handleClick = () => {
    track(eventName || 'link_clicked', {
      href,
      ...eventData,
    });
  };

  // External links
  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
      >
        {children}
      </a>
    );
  }

  // Internal links
  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
