import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { roles } from '@/lib/prompts';
import {
  ArrowRight,
  PhoneOutgoing,
  Handshake,
  Users,
  Settings,
  HeartHandshake,
  Rocket,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Role Playbooks | GTM Skills',
  description: '200+ prompts organized by sales role. SDR, AE, Sales Manager, RevOps, CSM, and Founder playbooks.',
};

const iconMap: Record<string, React.ElementType> = {
  'phone-outgoing': PhoneOutgoing,
  handshake: Handshake,
  users: Users,
  settings: Settings,
  'heart-handshake': HeartHandshake,
  rocket: Rocket,
};

export default function RolePage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-green-500/30 text-green-400">
            200+ Prompts
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Role Playbooks
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prompts tailored to your role. Whether you're booking meetings, closing deals,
            or managing a team - we've got you covered.
          </p>
        </div>

        {/* Role Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = iconMap[role.icon] || PhoneOutgoing;
            return (
              <Link
                key={role.slug}
                href={`/role/${role.slug}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-green-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                  <Icon className="h-6 w-6 text-green-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-semibold text-foreground group-hover:text-green-400 transition-colors">
                    {role.name}
                  </h2>
                  <Badge variant="secondary" className="text-xs">
                    {role.count}+
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {role.description}
                </p>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* Role Comparison */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Which Playbook Is Right for You?</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Primary Focus</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Key Prompts</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm font-medium">SDR / BDR</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Booking meetings</td>
                  <td className="py-3 px-4 text-sm text-green-400">Cold emails, sequences, LinkedIn</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm font-medium">Account Executive</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Closing deals</td>
                  <td className="py-3 px-4 text-sm text-green-400">Discovery, demos, proposals, negotiation</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm font-medium">Sales Manager</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Team performance</td>
                  <td className="py-3 px-4 text-sm text-green-400">Pipeline reviews, coaching, forecasting</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm font-medium">RevOps</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Systems & process</td>
                  <td className="py-3 px-4 text-sm text-green-400">Metrics, automation, territory planning</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm font-medium">CSM / AM</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Retention & expansion</td>
                  <td className="py-3 px-4 text-sm text-green-400">QBRs, health scores, upsell</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm font-medium">Founder</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">Everything</td>
                  <td className="py-3 px-4 text-sm text-green-400">Founder-led sales, hiring, process</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Want all role playbooks in one download?
          </p>
          <Link
            href="/download"
            className="text-green-400 hover:text-green-300 font-medium inline-flex items-center gap-2"
          >
            Download the complete pack
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
