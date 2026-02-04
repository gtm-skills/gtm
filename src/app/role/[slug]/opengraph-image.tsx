import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'GTM Skills Role Playbook';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const roles: Record<string, { name: string; description: string; count: number }> = {
  sdr: { name: 'SDR Playbook', description: 'Prospecting, outreach, and qualification prompts', count: 50 },
  ae: { name: 'Account Executive', description: 'Discovery, demos, negotiation, and closing prompts', count: 50 },
  'sales-manager': { name: 'Sales Manager', description: 'Coaching, forecasting, and team enablement', count: 30 },
  revops: { name: 'Revenue Operations', description: 'Process optimization and analytics prompts', count: 30 },
  csm: { name: 'Customer Success', description: 'Onboarding, expansion, and retention prompts', count: 40 },
  founder: { name: 'Founder-Led Sales', description: 'Early-stage selling and positioning prompts', count: 30 },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const role = roles[slug];

  const title = role?.name || 'Role Playbook';
  const description = role?.description || 'Prompts for your sales role';
  const count = role?.count || 30;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage:
            'radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
        }}
      >
        {/* Category badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            padding: '8px 16px',
            borderRadius: '9999px',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
          }}
        >
          <span style={{ color: '#c084fc', fontSize: '20px', fontWeight: 500 }}>
            Role Playbook
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#fafafa',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: '32px',
              color: '#a1a1aa',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            {description}
          </span>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '48px',
            padding: '12px 24px',
            borderRadius: '12px',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
          }}
        >
          <span style={{ fontSize: '32px', fontWeight: 700, color: '#c084fc' }}>
            {count}+
          </span>
          <span style={{ fontSize: '24px', color: '#a1a1aa' }}>
            Prompts
          </span>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '24px', fontWeight: 600, color: '#fafafa' }}>
            gtm-skills.com
          </span>
          <span style={{ fontSize: '24px', color: '#52525b' }}>•</span>
          <span style={{ fontSize: '20px', color: '#71717a' }}>
            Free & Open Source
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
