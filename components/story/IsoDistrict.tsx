/* ============================================================================
   Isometric district art.

   A placeholder in position only — it occupies the exact slot the rendered
   diorama plates will fill (`decibyl-town-drafts-2026-08-31`, three 2K plates,
   two districts each). Swapping to the render is a one-line change in
   DistrictTour: pass `art` and this stops being used.

   Drawn rather than rendered so it is crisp at any size, costs nothing to
   download, and can be re-tinted per district from the brand tokens. Flat
   isometric on a 2:1 grid, one accent colour per district.
   ============================================================================ */

type Props = { variant: string; className?: string };

/* Per-district massing. Each entry is a small set of blocks placed on the
   isometric plate, plus the props that make the trade legible at a glance. */
const SHAPES: Record<
  string,
  {
    blocks: [number, number, number, number][];
    props: 'cross' | 'roof' | 'boxes' | 'coin' | 'van' | 'board' | 'phone' | 'orb' | 'handset' | 'speech';
  }
> = {
  /* x, y (plate coords), width, height-of-block */
  /* Brand-story chapters */
  street: { blocks: [[-56, 10, 44, 30], [-8, 2, 42, 40], [40, 14, 38, 26]], props: 'phone' },
  switchboard: { blocks: [[-30, 0, 78, 34]], props: 'orb' },
  language: { blocks: [[-52, 14, 40, 26], [26, 8, 44, 34]], props: 'speech' },
  outcome: { blocks: [], props: 'handset' },

  /* Vertical districts */
  clinics: { blocks: [[-46, 6, 60, 46], [30, 18, 40, 30]], props: 'cross' },
  'real-estate': { blocks: [[-50, 10, 46, 34], [8, -2, 54, 56]], props: 'roof' },
  'd2c-ndr-recovery': { blocks: [[-52, 8, 66, 40]], props: 'boxes' },
  'lending-collections': { blocks: [[-40, 2, 72, 52]], props: 'coin' },
  logistics: { blocks: [[-54, 12, 50, 30], [16, 6, 46, 38]], props: 'van' },
  education: { blocks: [[-44, 4, 68, 48]], props: 'board' },
};

const FALLBACK = SHAPES.clinics;

export function IsoDistrict({ variant, className }: Props) {
  const shape = SHAPES[variant] ?? FALLBACK;

  return (
    <svg
      viewBox="0 0 320 210"
      className={className}
      role="img"
      aria-label=""
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Isometric faces: one light top, two progressively darker sides. */}
        <linearGradient id={`top-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffdfa" />
          <stop offset="100%" stopColor="#f3ece2" />
        </linearGradient>
        <linearGradient id={`ground-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#efe7db" />
          <stop offset="100%" stopColor="#e3d8c9" />
        </linearGradient>
      </defs>

      <g transform="translate(160 122)">
        {/* The island plate. */}
        <path d="M0-58 116 6 0 70-116 6Z" fill={`url(#ground-${variant})`} />
        <path d="M-116 6 0 70 0 84-116 20Z" fill="#d3c5b2" />
        <path d="M116 6 0 70 0 84 116 20Z" fill="#c6b7a2" />

        {/* A road threading the plate, the way the reference island does. */}
        <path
          d="M-72 14 -20 44 24 20 74 48"
          fill="none"
          stroke="#f7f2ea"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {shape.blocks.map(([x, y, w, h], i) => (
          <Block key={i} x={x} y={y} w={w} h={h} variant={variant} />
        ))}

        <Props kind={shape.props} />
      </g>
    </svg>
  );
}

/** One isometric box on a 2:1 grid.
 *
 *  Base diamond: top (0,-d/2), right (d,0), bottom (0,d/2), left (-d,0).
 *  The lid is the same diamond lifted by `h`, and the two visible walls hang
 *  between the two. Getting this wrong is what makes CSS/SVG isometrics read
 *  as folded paper rather than as solid blocks. */
function Block({
  x,
  y,
  w,
  h,
  variant,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  variant: string;
}) {
  const d = w / 2;
  const k = d / 2; // half-depth on screen — the 2:1 isometric ratio

  return (
    <g transform={`translate(${x} ${y})`}>
      {/* left wall */}
      <path d={`M${-d} 0 L0 ${k} L0 ${k - h} L${-d} ${-h}Z`} fill="#d8cab6" />
      {/* right wall */}
      <path d={`M${d} 0 L0 ${k} L0 ${k - h} L${d} ${-h}Z`} fill="#c7b8a3" />
      {/* lid */}
      <path
        d={`M0 ${-k - h} L${d} ${-h} L0 ${k - h} L${-d} ${-h}Z`}
        fill={`url(#top-${variant})`}
      />
      {/* the coral band along the eaves — the single accent, as in the plates */}
      <path d={`M${-d} ${-h} L0 ${k - h} L0 ${k - h + 4} L${-d} ${-h + 4}Z`} fill="var(--color-vermilion)" />
      <path
        d={`M${d} ${-h} L0 ${k - h} L0 ${k - h + 4} L${d} ${-h + 4}Z`}
        fill="var(--color-vermilion)"
        opacity="0.72"
      />
    </g>
  );
}

/** The one prop that names the trade. Kept to a single readable silhouette. */
function Props({ kind }: { kind: string }) {
  switch (kind) {
    case 'cross':
      return (
        <g transform="translate(-46 -18)">
          <rect x="-4" y="-12" width="8" height="26" rx="2" fill="var(--color-vermilion)" />
          <rect x="-13" y="-3" width="26" height="8" rx="2" fill="var(--color-vermilion)" />
        </g>
      );
    case 'roof':
      return (
        <g transform="translate(8 -34)">
          <path d="M0-14 20 0 0 12-20 0Z" fill="var(--color-vermilion)" opacity="0.9" />
          <path d="M-20 0 0 12 0 20-20 8Z" fill="#b34a43" />
          <path d="M20 0 0 12 0 20 20 8Z" fill="#9d3f39" />
        </g>
      );
    case 'boxes':
      return (
        <g transform="translate(34 26)">
          {[
            [0, 0],
            [-20, 10],
            [-10, -12],
          ].map(([bx, by], i) => (
            <g key={i} transform={`translate(${bx} ${by})`}>
              <path d="M0-7 11 0 0 7-11 0Z" fill="#dcc7a8" />
              <path d="M-11 0 0 7 0 15-11 8Z" fill="#c4ac8c" />
              <path d="M11 0 0 7 0 15 11 8Z" fill="#b2996f" />
            </g>
          ))}
        </g>
      );
    case 'coin':
      return (
        <g transform="translate(40 8)">
          <ellipse cx="0" cy="6" rx="15" ry="8" fill="#c98f13" />
          <ellipse cx="0" cy="0" rx="15" ry="8" fill="var(--color-saffron)" />
        </g>
      );
    case 'van':
      return (
        <g transform="translate(-30 34)">
          <path d="M0-9 20 2 0 13-20 2Z" fill="var(--color-vermilion)" />
          <path d="M-20 2 0 13 0 23-20 12Z" fill="#b34a43" />
          <path d="M20 2 0 13 0 23 20 12Z" fill="#9d3f39" />
        </g>
      );
    case 'board':
      return (
        <g transform="translate(30 -20)">
          <path d="M-16-10 16-10 16 8-16 8Z" fill="#2f7f6c" />
          <path d="M-16 8 16 8 16 11-16 11Z" fill="#1f5f50" />
        </g>
      );
    /* Two bubbles mid-sentence: the mixed register, not a language menu. */
    case 'speech':
      return (
        <g transform="translate(-6 -44)">
          <g transform="translate(-24 6)">
            <path d="M-15-9 15-9 15 5 2 5 -4 11 -4 5 -15 5Z" fill="var(--color-vermilion)" opacity="0.92" />
          </g>
          <g transform="translate(22 -6)">
            <path d="M-13-8 13-8 13 4 4 10 4 4 -13 4Z" fill="#fffdfa" stroke="var(--color-ember)" strokeWidth="1.5" />
          </g>
        </g>
      );
    /* The one lit thing on a shut street. */
    case 'phone':
      return (
        <g transform="translate(-8 -46)">
          <circle cx="0" cy="0" r="16" fill="var(--color-vermilion)" opacity="0.14" />
          <circle cx="0" cy="0" r="10" fill="var(--color-vermilion)" opacity="0.24" />
          <rect x="-4" y="-7" width="8" height="14" rx="3" fill="var(--color-vermilion)" />
        </g>
      );
    /* The agent itself, hovering over the counter. */
    case 'orb':
      return (
        <g transform="translate(0 -40)">
          <circle cx="0" cy="0" r="21" fill="none" stroke="var(--color-ember)" strokeWidth="1.5" opacity="0.4" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="var(--color-ember)" strokeWidth="1.5" opacity="0.65" />
          <circle cx="0" cy="0" r="8" fill="var(--color-vermilion)" />
          <circle cx="-2.5" cy="-2.5" r="2.5" fill="#ffb3a8" />
        </g>
      );
    /* The closing hero: a handset with the day's work orbiting it. */
    case 'handset':
      return (
        <g transform="translate(0 -8)">
          <g transform="rotate(-8)">
            <rect x="-21" y="-38" width="42" height="76" rx="9" fill="#e9e0d3" />
            <rect x="-17" y="-33" width="34" height="66" rx="6" fill="#fffdfa" />
          </g>
          <circle cx="0" cy="-52" r="12" fill="none" stroke="var(--color-ember)" strokeWidth="1.5" opacity="0.5" />
          <circle cx="0" cy="-52" r="7" fill="var(--color-vermilion)" />
          {/* the orbiting clay objects, well spaced */}
          <g transform="translate(-52 -22)">
            <path d="M0-7 11 0 0 7-11 0Z" fill="#dcc7a8" />
            <path d="M-11 0 0 7 0 14-11 7Z" fill="#c4ac8c" />
            <path d="M11 0 0 7 0 14 11 7Z" fill="#b2996f" />
          </g>
          <g transform="translate(54 -30)">
            <rect x="-11" y="-9" width="22" height="18" rx="3" fill="#fffdfa" />
            <rect x="-11" y="-9" width="22" height="5" rx="2" fill="var(--color-vermilion)" />
          </g>
          <ellipse cx="-56" cy="30" rx="12" ry="6" fill="var(--color-saffron)" />
          <g transform="translate(52 26)">
            <path d="M-12-8 12-8 12 5 -2 5 -8 11 -8 5 -12 5Z" fill="var(--color-vermilion)" opacity="0.9" />
          </g>
        </g>
      );
    default:
      return null;
  }
}
