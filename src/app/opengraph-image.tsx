import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'GTM Skills - 2,500+ AI Prompts for B2B Sales';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
            'radial-gradient(circle at 25% 25%, rgba(249, 115, 22, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)',
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            padding: '8px 16px',
            borderRadius: '9999px',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            backgroundColor: 'rgba(249, 115, 22, 0.1)',
          }}
        >
          <span style={{ color: '#fb923c', fontSize: '20px' }}>★</span>
          <span style={{ color: '#fb923c', fontSize: '20px', fontWeight: 500 }}>
            Free & Open Source
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
            }}
          >
            2,500+ GTM Prompts
          </span>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 700,
              background: 'linear-gradient(90deg, #f97316, #ef4444)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
            }}
          >
            for B2B Sales
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: '32px',
            fontSize: '28px',
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Industry packs • Role playbooks • Workflows • Methodologies
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '48px',
          }}
        >
          {[
            { label: 'Prompts', value: '2,500+' },
            { label: 'Industries', value: '8' },
            { label: 'MCP Tools', value: '10' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '36px', fontWeight: 700, color: '#fafafa' }}>
                {stat.value}
              </span>
              <span style={{ fontSize: '18px', color: '#71717a' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '24px', fontWeight: 600, color: '#fafafa' }}>
            gtm-skills.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
