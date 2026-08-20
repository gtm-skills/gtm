import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Mail, MessageSquare, Phone, Presentation } from 'lucide-react';

export const metadata = {
  title: 'Email Templates | GTM Skills',
  description: 'Copy-paste email templates for cold outreach, follow-ups, proposals, and more. Works with any email client or AI assistant.',
};

const templateCategories = [
  {
    name: 'Cold Outreach',
    description: 'First-touch emails that get responses',
    icon: Mail,
    count: '50+',
    examples: ['Pattern interrupt openers', 'Signal-based hooks', 'Problem-focused intros'],
  },
  {
    name: 'Follow-Up Sequences',
    description: 'Multi-touch sequences that convert',
    icon: MessageSquare,
    count: '40+',
    examples: ['3-email nurture', 'Post-demo follow-up', 'Re-engagement'],
  },
  {
    name: 'Meeting Requests',
    description: 'Get on their calendar',
    icon: Phone,
    count: '30+',
    examples: ['Discovery call asks', 'Demo scheduling', 'Executive briefings'],
  },
  {
    name: 'Proposals & Quotes',
    description: 'Close the deal',
    icon: Presentation,
    count: '25+',
    examples: ['Proposal cover emails', 'Pricing discussions', 'Contract sends'],
  },
];

export default function TemplatesPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-yellow-500/30 text-yellow-400">
            <FileText className="h-3 w-3 mr-1" />
            200+ Templates
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Email Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Copy-paste templates for every sales scenario. Works with Gmail, Outlook, or paste into Claude/ChatGPT for customization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {templateCategories.map((category) => (
            <div
              key={category.name}
              className="p-6 rounded-xl border border-border bg-card hover:border-yellow-500/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <category.icon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example) => (
                      <span key={example} className="text-xs bg-muted px-2 py-1 rounded">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-card/50 rounded-xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-3">Templates Are Embedded in Role Playbooks</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            All email templates are organized within our role-based playbooks. Browse by your role to find the most relevant templates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/role/sdr">
              <Button variant="outline" className="gap-2">
                SDR Templates
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/role/ae">
              <Button variant="outline" className="gap-2">
                AE Templates
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/workflow">
              <Button className="gap-2">
                Browse All Workflows
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
