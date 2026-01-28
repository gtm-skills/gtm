import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Agentic BDR Guide - The Future of Sales Development';
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
            'radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
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
            border: '1px solid rgba(6, 182, 212, 0.3)',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
          }}
        >
          <span style={{ fontSize: '20px' }}>🤖</span>
          <span style={{ color: '#22d3ee', fontSize: '20px', fontWeight: 500 }}>
            The Future of Outbound
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
            What is an Agentic BDR?
          </span>
          <span
            style={{
              fontSize: '28px',
              color: '#a1a1aa',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            Autonomous AI agents for research, personalization, and outbound execution
          </span>
        </div>

        {/* Agent types */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '48px',
          }}
        >
          {[
            { name: 'Research', color: '#22d3ee' },
            { name: 'Personalization', color: '#c084fc' },
            { name: 'Execution', color: '#4ade80' },
          ].map((agent) => (
            <div
              key={agent.name}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${agent.color}30`,
                color: agent.color,
                fontSize: '20px',
                fontWeight: 500,
              }}
            >
              {agent.name} Agent
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
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '24px', fontWeight: 600, color: '#fafafa' }}>
            gtm-skills.com/agentic-bdr
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
