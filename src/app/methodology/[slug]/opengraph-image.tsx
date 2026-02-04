import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'GTM Skills Methodology';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const methodologies: Record<string, { name: string; description: string }> = {
  meddpicc: { name: 'MEDDPICC', description: 'Metrics, Economic Buyer, Decision Criteria & Process' },
  spin: { name: 'SPIN Selling', description: 'Situation, Problem, Implication, Need-Payoff' },
  challenger: { name: 'Challenger Sale', description: 'Teach, Tailor, Take Control' },
  sandler: { name: 'Sandler Selling', description: 'Pain, Budget, Decision framework' },
  'solution-selling': { name: 'Solution Selling', description: 'Pain-based, consultative approach' },
  'gap-selling': { name: 'Gap Selling', description: 'Current state to future state' },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const methodology = methodologies[slug];

  const title = methodology?.name || 'Sales Methodology';
  const description = methodology?.description || 'Prompts for proven sales frameworks';

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
            'radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
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
            border: '1px solid rgba(34, 197, 94, 0.3)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
          }}
        >
          <span style={{ color: '#4ade80', fontSize: '20px', fontWeight: 500 }}>
            Sales Methodology
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
              fontSize: '72px',
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

        {/* Tagline */}
        <div
          style={{
            marginTop: '48px',
            fontSize: '24px',
            color: '#4ade80',
          }}
        >
          Ready-to-use prompts for every stage
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
