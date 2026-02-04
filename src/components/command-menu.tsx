'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  FileText,
  Building2,
  Users,
  Workflow,
  BookOpen,
  Zap,
  Bot,
  Palette,
  Download,
  Github,
  X,
  ArrowRight,
} from 'lucide-react';

interface SearchItem {
  title: string;
  description?: string;
  href: string;
  icon: React.ElementType;
  category: string;
}

const searchItems: SearchItem[] = [
  // Prompts
  { title: 'All Prompts', description: 'Browse the full library', href: '/prompts', icon: FileText, category: 'Prompts' },
  { title: 'Industry Packs', description: 'SaaS, FinTech, Healthcare...', href: '/industry', icon: Building2, category: 'Prompts' },
  { title: 'Role Playbooks', description: 'SDR, AE, CSM workflows', href: '/role', icon: Users, category: 'Prompts' },
  { title: 'Workflows', description: 'Prospecting to closing', href: '/workflow', icon: Workflow, category: 'Prompts' },
  { title: 'Methodologies', description: 'MEDDPICC, SPIN, Challenger', href: '/methodology', icon: BookOpen, category: 'Prompts' },

  // Tools
  { title: 'MCP Server', description: 'Claude Desktop integration', href: '/free-tools/mcp-server', icon: Bot, category: 'Tools' },
  { title: 'Browser Extension', description: 'LinkedIn & Gmail tools', href: '/download', icon: Download, category: 'Tools' },
  { title: 'Tonalities', description: '24 writing styles', href: '/free-tools/tonalities', icon: Palette, category: 'Tools' },

  // Learn
  { title: 'Tutorials', description: 'Step-by-step guides', href: '/tutorials', icon: BookOpen, category: 'Learn' },
  { title: 'Agentic BDR', description: 'Future of outbound', href: '/agentic-bdr', icon: Bot, category: 'Learn' },
  { title: 'OpenClaw Setup', description: 'Install the full agent team', href: '/openclaw', icon: Zap, category: 'Learn' },

  // Other
  { title: 'API Documentation', description: 'REST API reference', href: '/developers', icon: FileText, category: 'Developers' },
  { title: 'GitHub Repository', description: 'Source code & contribute', href: 'https://github.com/gtm-skills/gtm', icon: Github, category: 'External' },
];

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filteredItems = query === ''
    ? searchItems
    : searchItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  const flatItems = filteredItems;

  const handleSelect = useCallback((item: SearchItem) => {
    setIsOpen(false);
    setQuery('');
    if (item.href.startsWith('http')) {
      window.open(item.href, '_blank');
    } else {
      router.push(item.href);
    }
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }

      // Navigation
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, flatItems.length - 1));
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
        }
        if (e.key === 'Enter' && flatItems[selectedIndex]) {
          e.preventDefault();
          handleSelect(flatItems[selectedIndex]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, flatItems, selectedIndex, handleSelect]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false);
          setQuery('');
        }}
      />

      {/* Dialog */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl">
        <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search prompts, tools, docs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg"
              autoFocus
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="p-1 hover:bg-muted rounded"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto p-2">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="mb-4 last:mb-0">
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {category}
                </div>
                {items.map((item) => {
                  const globalIndex = flatItems.indexOf(item);
                  const isSelected = globalIndex === selectedIndex;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        isSelected ? 'bg-muted' : 'hover:bg-muted/50'
                      }`}
                    >
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground truncate">{item.title}</div>
                        {item.description && (
                          <div className="text-sm text-muted-foreground truncate">{item.description}</div>
                        )}
                      </div>
                      {isSelected && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                    </button>
                  );
                })}
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No results found for "{query}"
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↵</kbd>
                select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">esc</kbd>
                close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Button to trigger search (for header)
export function SearchButton() {
  const [, setForceUpdate] = useState(0);

  const handleClick = () => {
    // Dispatch a keyboard event to trigger the command menu
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
    setForceUpdate((n) => n + 1);
  };

  return (
    <button
      onClick={handleClick}
      className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 hover:bg-muted rounded-lg border border-border transition-colors"
    >
      <Search className="h-4 w-4" />
      <span>Search</span>
      <kbd className="ml-2 px-1.5 py-0.5 text-[10px] bg-background rounded border border-border">⌘K</kbd>
    </button>
  );
}
