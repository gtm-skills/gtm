import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'GTM Skills - 24 Writing Tonalities';
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
          <span style={{ fontSize: '20px' }}>✨</span>
          <span style={{ color: '#c084fc', fontSize: '20px', fontWeight: 500 }}>
            Writing Styles
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
            Write Like the Masters
          </span>
          <span
            style={{
              fontSize: '32px',
              color: '#a1a1aa',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            24 legendary voices to transform your sales copy
          </span>
        </div>

        {/* Names row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '48px',
            maxWidth: '900px',
          }}
        >
          {['Jobs', 'Bezos', 'Voss', 'Hormozi', 'Hemingway', 'Ogilvy', 'Buffett', 'Naval'].map(
            (name) => (
              <div
                key={name}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(168, 85, 247, 0.1)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  color: '#e4e4e7',
                  fontSize: '20px',
                }}
              >
                {name}
              </div>
            )
          )}
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
