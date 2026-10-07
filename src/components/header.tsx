'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchButton } from '@/components/command-menu';
import { AuthButton } from '@/components/auth/auth-button';
import {
  Menu,
  X,
  Github,
  ChevronDown,
  Globe,
  Bot,
  BookOpen,
  Code,
  FileCode,
  Palette,
  Radar,
  Send,
  Search,
  Handshake,
  BarChart3,
  Rocket,
  Orbit,
  Type,
  Plug,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  highlight?: boolean;
  children?: {
    name: string;
    href: string;
    icon: React.ElementType;
    description?: string;
  }[];
}

const navigation: NavItem[] = [
  { name: 'Skills', href: '/skills' },
  {
    name: 'Categories',
    href: '/skills',
    children: [
      { name: 'Prospecting', href: '/skills/category/prospecting', icon: Radar, description: 'Find and qualify accounts' },
      { name: 'Outreach', href: '/skills/category/outreach', icon: Send, description: 'Cold email, LinkedIn, sequences' },
      { name: 'Discovery', href: '/skills/category/discovery', icon: Search, description: 'Calls that surface pain' },
      { name: 'Closing', href: '/skills/category/closing', icon: Handshake, description: 'Multi-thread, negotiate, sign' },
      { name: 'RevOps', href: '/skills/category/revops', icon: BarChart3, description: 'Pipeline, forecast, CRM' },
      { name: 'Founder-led', href: '/skills/category/founder', icon: Rocket, description: 'Sell before a sales team' },
      { name: 'Agent Fleet', href: '/skills/category/agents', icon: Orbit, description: 'Autonomous teammates' },
      { name: 'Tonality', href: '/skills/category/tonality', icon: Type, description: 'Write in a voice' },
    ],
  },
  {
    name: 'Tools',
    href: '/free-tools',
    children: [
      { name: 'ChatGPT Plugin', href: '/plugin', icon: Sparkles, description: 'Call prep, debrief, follow-up in ChatGPT' },
      { name: 'MCP Server', href: '/free-tools/mcp-server', icon: Plug, description: '18 sales tools for Claude' },
      { name: 'Prompts', href: '/prompts', icon: FileCode, description: 'Free prompt library' },
      { name: 'Tonalities', href: '/free-tools/tonalities', icon: Palette, description: '24 writing styles' },
      { name: 'Browser Extension', href: '/free-tools', icon: Globe, description: 'LinkedIn & Gmail' },
      { name: 'API', href: '/developers', icon: Code, description: 'REST reference' },
    ],
  },
  { name: 'Pricing', href: '/pricing' },
  {
    name: 'Learn',
    href: '/guides',
    children: [
      { name: 'Guides', href: '/guides', icon: FileCode, description: 'In-depth agentic GTM guides' },
      { name: 'Tutorials', href: '/tutorials', icon: BookOpen, description: 'Step-by-step' },
      { name: 'Agentic BDR', href: '/agentic-bdr', icon: Bot, description: 'The future of outbound' },
      { name: 'GitHub', href: 'https://github.com/gtm-skills/gtm', icon: Github, description: 'Open-source core' },
    ],
  },
];

function NavDropdown({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={`label-mono text-xs transition-colors ${
          item.highlight
            ? 'text-cyan-400 hover:text-cyan-300'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="label-mono flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {item.name}
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-popover border border-border rounded-xl shadow-xl overflow-hidden z-50">
          <div className="p-2">
            {item.children.map((child) => (
              <Link
                key={child.name}
                href={child.href}
                target={child.href.startsWith('http') ? '_blank' : undefined}
                rel={child.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
              >
                <child.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {child.name}
                  </div>
                  {child.description && (
                    <div className="text-xs text-muted-foreground">{child.description}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="" width={28} height={28} className="h-7 w-7" priority unoptimized />
          <span className="text-lg font-bold text-foreground">GTM Skills</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navigation.map((item) => (
            <NavDropdown key={item.name} item={item} />
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <SearchButton />
          <ThemeToggle />
          <AuthButton />
          <Link href="/pricing">
            <Button size="sm" className="label-mono gap-2 text-xs brand-gradient">
              Get the Bundle
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu - full screen overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] z-50 bg-background/98 backdrop-blur-sm overflow-y-auto">
          <div className="px-6 py-6">
            {/* Mobile search */}
            <SearchButton variant="mobile" onOpen={() => setMobileMenuOpen(false)} />

            {/* Navigation */}
            <nav className="mt-6 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setExpandedMobileItem(
                          expandedMobileItem === item.name ? null : item.name
                        )}
                        className="flex items-center justify-between w-full py-3 px-3 rounded-lg text-base font-medium text-foreground hover:bg-accent transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                            expandedMobileItem === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ${
                          expandedMobileItem === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pl-3 pb-2 space-y-0.5">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="flex items-center gap-3 py-3 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <child.icon className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <div className="text-sm font-medium">{child.name}</div>
                                {child.description && (
                                  <div className="text-xs text-muted-foreground">{child.description}</div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3 px-3 rounded-lg text-base font-medium text-foreground hover:bg-accent transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile CTAs */}
            <div className="mt-8 pt-6 border-t border-border space-y-3">
              <AuthButton mobile onNavigate={() => setMobileMenuOpen(false)} />
              <Link href="/pricing" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full h-12 gap-2 text-base brand-gradient">
                  Get the Bundle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
