import { ImageResponse } from 'next/og';

export const runtime = 'edge';

/**
 * Dynamic OG images. Kept to system-available fonts and flat colour so the
 * route stays fast and never blocks a page render.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') ?? 'Decibyl').slice(0, 120);
  const subtitle = (searchParams.get('subtitle') ?? '').slice(0, 160);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F1F5F9',
          padding: '72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '10px',
            background: 'linear-gradient(96deg, #e15b53 0%, #ee9086 55%, #ee9086 100%)',
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
          <div style={{ fontSize: 32, fontWeight: 700, color: '#111827', display: 'flex' }}>
            Decibyl
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: title.length > 64 ? 54 : 66,
              lineHeight: 1.08,
              fontWeight: 700,
              color: '#111827',
              letterSpacing: '-0.03em',
              display: 'flex',
              maxWidth: '960px',
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                marginTop: '22px',
                fontSize: 30,
                color: '#3F4654',
                display: 'flex',
                maxWidth: '900px',
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', fontSize: 22, color: '#6B7589' }}>
          Indian languages + beyond · India, US & EU infra · GST invoicing
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
