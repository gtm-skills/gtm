import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

const footerLinks = {
  Prompts: [
    { name: 'By Role', href: '/role' },
    { name: 'By Industry', href: '/industry' },
    { name: 'By Methodology', href: '/methodology' },
    { name: 'All Prompts', href: '/prompts' },
  ],
  Tools: [
    { name: 'Browser Extension', href: '/download' },
    { name: 'Voice Templates', href: '/voice-templates' },
    { name: 'HubSpot', href: '/integrations/hubspot' },
    { name: 'MCP Server', href: '/free-tools/mcp-server' },
  ],
  Learn: [
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Agentic BDR', href: '/agentic-bdr' },
    { name: 'OpenClaw Skills', href: '/openclaw' },
  ],
  Developers: [
    { name: 'API Docs', href: '/developers' },
    { name: 'OpenAPI Spec', href: '/openapi.json' },
    { name: 'llms.txt', href: '/llms.txt' },
    { name: 'GitHub', href: 'https://github.com/gtm-skills/gtm' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-lg font-bold text-foreground">GTM Skills</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              The GTM Operating System for Agentic Sales.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/gtm-skills/gtm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/prospeda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/prospeda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GTM Skills. MIT License.
          </p>
          <p className="text-sm text-muted-foreground">
            Made by{' '}
            <a
              href="https://prospeda.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              Prospeda
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
