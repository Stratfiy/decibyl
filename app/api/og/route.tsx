import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') ?? 'AI that gets work done.').slice(0, 120);
  const subtitle = (searchParams.get('subtitle') ?? 'Talk. Remember. Use apps. Take action.').slice(0, 160);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FAFAF8',
          padding: '72px',
          position: 'relative',
          color: '#1D1D1F',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '78px',
            top: '60px',
            width: '180px',
            height: '70px',
            borderRadius: '999px',
            background: 'linear-gradient(145deg,#ffffff 0%,#c9c9c6 46%,#252525 100%)',
            transform: 'rotate(-9deg)',
            boxShadow: '0 28px 50px rgba(0,0,0,.18)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#e15b53',
              display: 'flex',
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 700, color: '#1D1D1F', display: 'flex' }}>Decibyl</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: title.length > 64 ? 54 : 66,
              lineHeight: 1.02,
              fontWeight: 700,
              color: '#1D1D1F',
              letterSpacing: '-0.04em',
              display: 'flex',
              maxWidth: '930px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: '22px',
              fontSize: 30,
              color: '#666668',
              display: 'flex',
              maxWidth: '900px',
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 22, color: '#777779' }}>
          Agents · Memory · Apps · Voice · Routines
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
