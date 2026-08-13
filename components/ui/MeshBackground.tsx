/**
 * Decorative low-poly mesh, fanned from a corner and faded out — the same
 * spirit as a network/wave backdrop, built from a single tiled SVG pattern
 * rather than hand-authored path data. Purely decorative: aria-hidden,
 * pointer-events-none, and never the only carrier of information on the page.
 */
export function MeshBackground({
  className = '',
  origin = 'bottom-left',
}: {
  className?: string;
  origin?: 'bottom-left' | 'top';
}) {
  const gradientId = `decibyl-mesh-fade-${origin}`;
  const center = origin === 'bottom-left' ? { cx: '12%', cy: '105%' } : { cx: '50%', cy: '0%' };

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="decibyl-mesh" width="64" height="64" patternUnits="userSpaceOnUse">
          <path
            d="M0 0 L64 64 M64 0 L0 64 M32 0 L32 64 M0 32 L64 32"
            fill="none"
            stroke="var(--color-vermilion)"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id={gradientId} cx={center.cx} cy={center.cy} r="75%">
          <stop offset="0%" stopColor="white" stopOpacity="0.55" />
          <stop offset="55%" stopColor="white" stopOpacity="0.22" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`${gradientId}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#decibyl-mesh)"
        mask={`url(#${gradientId}-mask)`}
      />
    </svg>
  );
}
