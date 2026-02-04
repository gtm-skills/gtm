import { ImageResponse } from 'next/og';
import { industries } from '@/lib/prompts';

export const runtime = 'edge';

export const alt = 'GTM Skills Industry Pack';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  const title = industry?.name || 'Industry Pack';
  const description = industry?.description || 'Prompts for B2B sales';
  const count = industry?.count || 100;

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
            'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
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
            border: '1px solid rgba(59, 130, 246, 0.3)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          }}
        >
          <span style={{ color: '#60a5fa', fontSize: '20px', fontWeight: 500 }}>
            Industry Pack
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
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <span style={{ fontSize: '32px', fontWeight: 700, color: '#60a5fa' }}>
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
