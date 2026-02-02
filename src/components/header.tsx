'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Github,
  Download,
  ChevronDown,
  Globe,
  Mic,
  Link2,
  Bot,
  BookOpen,
  Code,
  FileCode,
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
  { name: 'Prompts', href: '/prompts' },
  {
    name: 'Tools',
    href: '/free-tools',
    children: [
      { name: 'Browser Extension', href: '/download', icon: Globe, description: 'LinkedIn & Gmail integration' },
      { name: 'Voice Templates', href: '/voice-templates', icon: Mic, description: 'Agentic voice calls' },
      { name: 'HubSpot', href: '/integrations/hubspot', icon: Link2, description: 'CRM integration' },
      { name: 'MCP Server', href: '/free-tools/mcp-server', icon: Bot, description: 'Claude Desktop tools' },
    ],
  },
  {
    name: 'Learn',
    href: '/tutorials',
    children: [
      { name: 'Tutorials', href: '/tutorials', icon: BookOpen, description: 'Step-by-step guides' },
      { name: 'Agentic BDR', href: '/agentic-bdr', icon: Bot, description: 'Future of outbound' },
    ],
  },
  {
    name: 'Developers',
    href: '/developers',
    children: [
      { name: 'API Docs', href: '/developers', icon: Code, description: 'REST API reference' },
      { name: 'OpenAPI Spec', href: '/openapi.json', icon: FileCode, description: 'Download spec' },
      { name: 'llms.txt', href: '/llms.txt', icon: Bot, description: 'Agent discovery' },
      { name: 'GitHub', href: 'https://github.com/Prospeda/gtm-skills', icon: Github, description: 'Source code' },
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
        className={`text-sm transition-colors ${
          item.highlight
            ? 'text-cyan-400 hover:text-cyan-300 font-medium'
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
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {item.name}
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="p-2">
            {item.children.map((child) => (
              <Link
                key={child.name}
                href={child.href}
                target={child.href.startsWith('http') ? '_blank' : undefined}
                rel={child.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors group"
              >
                <child.icon className="h-5 w-5 text-zinc-500 group-hover:text-orange-400 transition-colors mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors">
                    {child.name}
                  </div>
                  {child.description && (
                    <div className="text-xs text-zinc-500">{child.description}</div>
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
            <NavDropdown key={item.name} item={item} />
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
              Star
            </Button>
          </a>
          <Link href="/download">
            <Button size="sm" className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Download className="h-4 w-4" />
              Get Extension
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
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setExpandedMobileItem(
                        expandedMobileItem === item.name ? null : item.name
                      )}
                      className="flex items-center justify-between w-full py-2 text-sm text-muted-foreground"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedMobileItem === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedMobileItem === item.name && (
                      <div className="pl-4 space-y-1 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-center gap-2 py-2 text-sm text-zinc-500 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <child.icon className="h-4 w-4" />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-3 border-t border-border mt-4">
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
                <Button size="sm" className="w-full gap-2 bg-gradient-to-r from-orange-500 to-red-500">
                  <Download className="h-4 w-4" />
                  Get Extension
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
