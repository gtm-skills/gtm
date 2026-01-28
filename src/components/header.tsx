'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Download } from 'lucide-react';

const navigation = [
  { name: 'Agentic BDR', href: '/agentic-bdr', highlight: true },
  { name: 'Tutorials', href: '/tutorials', highlight: false },
  { name: 'Industry', href: '/industry' },
  { name: 'Role', href: '/role' },
  { name: 'Methodology', href: '/methodology' },
  { name: 'Tonality', href: '/free-tools/tonalities' },
  { name: 'Tools', href: '/free-tools' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
            <span className="text-sm font-bold text-white">G</span>
          </div>
          <span className="font-semibold text-foreground">GTM Skills</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm transition-colors ${
                item.highlight
                  ? 'text-cyan-400 hover:text-cyan-300 font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <a
            href="https://github.com/Prospeda/gtm-skills"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-2">
              <Github className="h-4 w-4" />
              Star on GitHub
            </Button>
          </a>
          <Link href="/download">
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download All
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-6 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <a
                href="https://github.com/Prospeda/gtm-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </Button>
              </a>
              <Link href="/download" className="block">
                <Button size="sm" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download All
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
