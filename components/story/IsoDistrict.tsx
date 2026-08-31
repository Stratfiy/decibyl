type Props = { variant: string; className?: string };

const C = {
  cream: '#fffaf3',
  cream2: '#f3e8dc',
  ground: '#ead8cb',
  side: '#cfb9a7',
  sideDark: '#bca18e',
  ink: '#382a25',
  charcoal: '#4a4544',
  coral: '#e15b53',
  coralDark: '#b8433d',
  coralSoft: '#f3a198',
  sage: '#bfcdb8',
  blue: '#b9cad0',
  kraft: '#c9a77c',
  kraftDark: '#a98660',
  white: '#fffdf9',
};

/*
 * These are not apology placeholders. The rendered Kie rooms are used where
 * they are genuinely better (Answer + Clinic); the remaining chapters get a
 * deliberately graphic miniature world that can move, stay razor sharp and
 * never invent logos or unreadable text. The visual language is the same in
 * every scene: warm clay, one coral signal, one recurring Decibyl operator.
 */
export function IsoDistrict({ variant, className }: Props) {
  const id = variant.replace(/[^a-z0-9]/gi, '-');

  return (
    <svg
      viewBox="0 0 720 440"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`floor-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.white} />
          <stop offset="1" stopColor={C.cream2} />
        </linearGradient>
        <linearGradient id={`wall-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffdf9" />
          <stop offset="1" stopColor="#efe1d4" />
        </linearGradient>
        <radialGradient id={`orb-${id}`} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffd2cb" />
          <stop offset="0.5" stopColor={C.coral} />
          <stop offset="1" stopColor={C.coralDark} />
        </radialGradient>
        <filter id={`shadow-${id}`} x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#6b4639" floodOpacity="0.18" />
        </filter>
        <filter id={`soft-${id}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={`tiny-shadow-${id}`} x="-40%" y="-40%" width="180%" height="200%">
          <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#6b4639" floodOpacity="0.18" />
        </filter>
      </defs>

      <style>{`
        .iso-signal { stroke-dasharray: 8 12; animation: iso-flow 3.2s linear infinite; }
        .iso-float { transform-box: fill-box; transform-origin: center; animation: iso-float 3.6s ease-in-out infinite; }
        .iso-pulse { transform-box: fill-box; transform-origin: center; animation: iso-pulse 2.5s ease-out infinite; }
        .iso-ring-b { animation-delay: 1.2s; }
        .iso-bob { transform-box: fill-box; transform-origin: center bottom; animation: iso-bob 3s ease-in-out infinite; }
        .iso-phone { transform-box: fill-box; transform-origin: center; animation: iso-phone 4.2s ease-in-out infinite; }
        @keyframes iso-flow { to { stroke-dashoffset: -40; } }
        @keyframes iso-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes iso-pulse { 0% { transform: scale(.45); opacity: .75; } 75%,100% { transform: scale(1.35); opacity: 0; } }
        @keyframes iso-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes iso-phone { 0%,86%,100% { transform: rotate(0); } 89% { transform: rotate(-5deg); } 92% { transform: rotate(5deg); } 95% { transform: rotate(-3deg); } }
        @media (prefers-reduced-motion: reduce) {
          .iso-signal,.iso-float,.iso-pulse,.iso-bob,.iso-phone { animation: none !important; }
        }
      `}</style>

      <ellipse cx="360" cy="390" rx="245" ry="24" fill="#8c6555" opacity="0.1" filter={`url(#soft-${id})`} />

      <g filter={`url(#shadow-${id})`}>
        {variant === 'street' ? (
          <Street id={id} />
        ) : variant === 'language' ? (
          <Language id={id} />
        ) : variant === 'real-estate' ? (
          <Property id={id} />
        ) : variant === 'd2c-ndr-recovery' ? (
          <Commerce id={id} />
        ) : variant === 'outcome' ? (
          <Outcome id={id} />
        ) : variant === 'switchboard' ? (
          <Switchboard id={id} />
        ) : variant === 'clinics' ? (
          <Clinic id={id} />
        ) : (
          <GenericRoom id={id} />
        )}
      </g>
    </svg>
  );
}

function Plinth() {
  return (
    <g>
      <rect x="82" y="315" width="556" height="62" rx="31" fill={C.sideDark} />
      <rect x="82" y="301" width="556" height="58" rx="29" fill={C.cream2} />
      <rect x="94" y="306" width="532" height="39" rx="20" fill={C.cream} opacity="0.9" />
      <path d="M112 342 H608" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
    </g>
  );
}

function RoomShell({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <g>
      <Plinth />
      <path d="M150 298 L360 346 L570 298 L570 129 L360 177 L150 129 Z" fill={`url(#wall-${id})`} />
      <path d="M150 129 L360 177 L360 346 L150 298 Z" fill="#f7eee6" />
      <path d="M570 129 L360 177 L360 346 L570 298 Z" fill="#eee0d4" />
      <path d="M150 298 L360 346 L570 298 L360 244 Z" fill={`url(#floor-${id})`} />
      <path d="M150 129 L360 177 L570 129" fill="none" stroke="#fff" strokeWidth="3" opacity="0.7" />
      {children}
    </g>
  );
}

function Street({ id }: { id: string }) {
  return (
    <g>
      <Plinth />
      <path d="M116 300 C210 280 262 292 354 306 C448 320 510 319 604 292 L604 328 C500 350 432 349 350 335 C258 320 196 313 116 335 Z" fill="#d6c8bb" />
      <path d="M119 309 C218 289 277 304 358 317 C442 330 511 326 600 303" fill="none" stroke="#f9f3ec" strokeWidth="13" strokeLinecap="round" />
      <Store x={142} y={145} w={120} h={140} accent={C.sage} />
      <Store x={278} y={126} w={132} h={166} accent={C.coralSoft} phone />
      <Store x={426} y={153} w={112} h={137} accent={C.blue} />
      <Tree x={126} y={286} />
      <Tree x={579} y={278} scale={0.9} />
      <Mascot x={505} y={290} scale={0.92} facing="left" />
      <path className="iso-signal" d="M386 194 C437 185 455 206 486 244 C503 265 518 272 534 277" fill="none" stroke={C.coral} strokeWidth="4" strokeLinecap="round" />
      <Orb x={385} y={193} id={id} scale={0.7} />
    </g>
  );
}

function Store({ x, y, w, h, accent, phone = false }: { x: number; y: number; w: number; h: number; accent: string; phone?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={C.white} />
      <rect x={x + 10} y={y + 48} width={w - 20} height={h - 58} rx="7" fill="#ded2c6" />
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={`M${x + 13} ${y + 60 + i * 13} H${x + w - 13}`} stroke="#b8a89b" strokeWidth="4" strokeLinecap="round" opacity="0.68" />
      ))}
      <path d={`M${x + 7} ${y + 38} H${x + w - 7}`} stroke={accent} strokeWidth="13" strokeLinecap="round" />
      <rect x={x + 17} y={y + 13} width={w * 0.33} height="11" rx="5.5" fill="#d7c8bc" />
      {phone && (
        <g className="iso-phone" transform={`translate(${x + w * 0.72} ${y + 22})`}>
          <rect x="-9" y="-6" width="18" height="14" rx="4" fill={C.coral} />
          <path d="M-5-6 C-5-13 5-13 5-6" fill="none" stroke={C.coralDark} strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

function Language({ id }: { id: string }) {
  return (
    <RoomShell id={id}>
      <Rug x={245} y={265} w={225} h={58} fill="#e8d5ca" />
      <Desk x={205} y={214} flip />
      <Desk x={429} y={214} />
      <Monitor x={235} y={184} />
      <Monitor x={459} y={184} />
      <Mascot x={349} y={286} scale={0.94} />
      <path className="iso-signal" d="M247 177 C285 125 324 144 350 188 C378 235 407 211 462 178" fill="none" stroke={C.coral} strokeWidth="5" strokeLinecap="round" />
      <Orb x={248} y={178} id={id} scale={0.56} />
      <Orb x={462} y={178} id={id} scale={0.56} />
      <Bubble x={292} y={150} coral />
      <Bubble x={408} y={139} />
      <Plant x={520} y={274} scale={0.85} />
    </RoomShell>
  );
}

function Property({ id }: { id: string }) {
  return (
    <RoomShell id={id}>
      <Rug x={256} y={268} w={220} h={58} fill="#ded8c8" />
      <Desk x={336} y={225} />
      <Chair x={282} y={278} />
      <Chair x={434} y={273} flip />
      <Shelf x={440} y={154} />
      <MiniHouse x={459} y={174} scale={0.8} />
      <MiniHouse x={502} y={182} scale={0.67} />
      <MiniHouse x={538} y={190} scale={0.58} />
      <Mascot x={244} y={267} scale={0.9} />
      <Orb x={364} y={188} id={id} scale={0.7} />
      <path className="iso-signal" d="M361 190 C398 170 429 172 465 188" fill="none" stroke={C.coral} strokeWidth="4" strokeLinecap="round" />
      <Plant x={179} y={274} scale={0.82} />
    </RoomShell>
  );
}

function Commerce({ id }: { id: string }) {
  return (
    <RoomShell id={id}>
      <Rug x={272} y={279} w={185} h={44} fill="#e7d6c5" />
      <PackingTable x={330} y={219} />
      <Box x={270} y={225} scale={0.9} />
      <Box x={413} y={245} scale={0.75} />
      <Box x={463} y={263} scale={0.62} />
      <Shelf x={462} y={151} />
      <Box x={481} y={174} scale={0.48} />
      <Box x={522} y={183} scale={0.45} />
      <Mascot x={230} y={286} scale={0.92} />
      <Scooter x={528} y={316} />
      <Orb x={357} y={190} id={id} scale={0.64} />
      <path className="iso-signal" d="M357 190 C384 206 406 221 428 245 C465 284 499 292 533 302" fill="none" stroke={C.coral} strokeWidth="5" strokeLinecap="round" />
      <Plant x={177} y={276} scale={0.76} />
    </RoomShell>
  );
}

function Outcome({ id }: { id: string }) {
  return (
    <g>
      <Plinth />
      <g className="iso-float">
        <ellipse cx="360" cy="270" rx="128" ry="48" fill="#d7c7b8" opacity="0.45" />
        <Handset x={360} y={232} scale={1.35} />
        <Orb x={360} y={229} id={id} scale={1.1} />
      </g>
      <Receipt x={192} y={181} label="QA" value="94" rotate={-8} />
      <Receipt x={490} y={163} label="CALL" value="REC" rotate={7} />
      <Receipt x={516} y={274} label="NEXT" value="✓" rotate={4} />
      <Receipt x={183} y={285} label="TIME" value="41s" rotate={-5} />
      <path className="iso-signal" d="M221 208 C280 117 438 113 500 192 C550 255 478 329 390 337 C295 347 220 300 201 248" fill="none" stroke={C.coral} strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <Mascot x={590} y={318} scale={0.74} facing="left" />
    </g>
  );
}

function Switchboard({ id }: { id: string }) {
  return (
    <RoomShell id={id}>
      <Desk x={344} y={232} />
      <Phone x={344} y={197} />
      <Orb x={407} y={184} id={id} scale={0.9} />
      <path className="iso-signal" d="M345 194 C372 163 391 160 407 183 C432 219 467 222 505 200" fill="none" stroke={C.coral} strokeWidth="5" strokeLinecap="round" />
      <Mascot x={256} y={280} scale={0.95} />
      <Plant x={513} y={275} scale={0.9} />
    </RoomShell>
  );
}

function Clinic({ id }: { id: string }) {
  return (
    <RoomShell id={id}>
      <Reception x={348} y={231} />
      <Cross x={498} y={160} />
      <Chair x={210} y={267} />
      <Chair x={260} y={280} />
      <Mascot x={378} y={258} scale={0.9} />
      <Orb x={331} y={186} id={id} scale={0.65} />
      <Plant x={516} y={276} scale={0.8} />
    </RoomShell>
  );
}

function GenericRoom({ id }: { id: string }) {
  return (
    <RoomShell id={id}>
      <Desk x={348} y={230} />
      <Mascot x={260} y={282} />
      <Orb x={405} y={184} id={id} />
      <Plant x={514} y={276} />
    </RoomShell>
  );
}

function Orb({ x, y, id, scale = 1 }: { x: number; y: number; id: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle className="iso-pulse" cx="0" cy="0" r="24" fill="none" stroke={C.coral} strokeWidth="2" opacity="0.48" />
      <circle className="iso-pulse iso-ring-b" cx="0" cy="0" r="24" fill="none" stroke={C.coral} strokeWidth="2" opacity="0.34" />
      <circle cx="0" cy="0" r="13" fill={`url(#orb-${id})`} />
      <circle cx="-4" cy="-5" r="3.5" fill="#fff" opacity="0.66" />
    </g>
  );
}

function Mascot({ x, y, scale = 1, facing = 'right' }: { x: number; y: number; scale?: number; facing?: 'left' | 'right' }) {
  const sx = facing === 'left' ? -scale : scale;
  return (
    <g className="iso-bob" transform={`translate(${x} ${y}) scale(${sx} ${scale})`}>
      <ellipse cx="0" cy="15" rx="20" ry="6" fill="#5b4339" opacity="0.11" />
      <path d="M-11-49 C-18-45-20-29-14-22 C-20-18-20-4-13 3 L16 3 C19-6 18-18 11-23 C17-31 13-46 4-50Z" fill="#332925" />
      <circle cx="0" cy="-41" r="12" fill="#dfb89f" />
      <path d="M-11-44 C-8-57 10-58 13-43 C7-49-1-50-11-44Z" fill="#2c2422" />
      <path d="M-14-25 L14-25 L20 4 L-20 4Z" fill={C.cream} />
      <path d="M-7-24 L8-24 L11 3 L-10 3Z" fill={C.coral} />
      <path d="M-18-20 L-31 2" stroke={C.cream} strokeWidth="8" strokeLinecap="round" />
      <path d="M17-20 L30-5" stroke={C.cream} strokeWidth="8" strokeLinecap="round" />
      <path d="M-12 3 L-8 35" stroke={C.charcoal} strokeWidth="9" strokeLinecap="round" />
      <path d="M11 3 L15 35" stroke={C.charcoal} strokeWidth="9" strokeLinecap="round" />
      <path d="M-12 36 L0 36" stroke={C.white} strokeWidth="7" strokeLinecap="round" />
      <path d="M12 36 L24 36" stroke={C.white} strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}

function Desk({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d="M-48-6 L20-22 L48-7 L-20 10Z" fill={C.white} />
      <path d="M-20 10 L48-7 L48 4 L-20 21Z" fill={C.side} />
      <path d="M-48-6 L-20 10 L-20 21 L-48 5Z" fill={C.sideDark} />
      <path d="M-35 6 V35 M34 0 V28" stroke="#a68e7c" strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}

function PackingTable({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-58-7 L25-27 L61-8 L-23 13Z" fill={C.white} />
      <path d="M-23 13 L61-8 L61 8 L-23 29Z" fill={C.side} />
      <path d="M-58-7 L-23 13 L-23 29 L-58 9Z" fill={C.sideDark} />
      <path d="M-43 13 V47 M47 8 V39" stroke="#9c8370" strokeWidth="8" strokeLinecap="round" />
      <Box x={-3} y={-19} scale={0.64} />
    </g>
  );
}

function Monitor({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-19" y="-15" width="38" height="25" rx="5" fill={C.ink} />
      <rect x="-15" y="-11" width="30" height="17" rx="3" fill="#dce7e8" />
      <path d="M0 10 V19 M-10 20 H10" stroke="#8e7a6b" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Chair({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <ellipse cx="0" cy="20" rx="20" ry="7" fill="#5d4339" opacity="0.09" />
      <path d="M-18-3 Q0-14 18-3 V17 Q0 27-18 17Z" fill="#b7aaa0" />
      <path d="M-10 17 L-13 34 M10 17 L14 34" stroke="#806d60" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Shelf({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="112" height="62" rx="8" fill="#d9cabd" />
      <rect x="9" y="9" width="94" height="44" rx="5" fill="#f7eee6" />
      <path d="M9 31 H103" stroke="#c1ad9c" strokeWidth="5" />
    </g>
  );
}

function MiniHouse({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-17 2 L0-12 L18 2 V19 H-17Z" fill={C.white} stroke="#c7b5a8" strokeWidth="2" />
      <path d="M-21 3 L0-16 L22 3" fill="none" stroke={C.coral} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="-5" y="7" width="10" height="12" rx="2" fill="#c9b8aa" />
    </g>
  );
}

function Box({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0-19 L30-4 L0 12 L-30-4Z" fill="#d8b88d" />
      <path d="M-30-4 L0 12 V42 L-30 25Z" fill={C.kraft} />
      <path d="M30-4 L0 12 V42 L30 25Z" fill={C.kraftDark} />
      <path d="M0-19 V12" stroke="#b38f66" strokeWidth="3" />
    </g>
  );
}

function Scooter({ x, y }: { x: number; y: number }) {
  return (
    <g className="iso-bob" transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="15" rx="44" ry="8" fill="#5d4339" opacity="0.1" />
      <circle cx="-24" cy="10" r="11" fill={C.ink} />
      <circle cx="27" cy="10" r="11" fill={C.ink} />
      <path d="M-25 4 C-9-17 13-18 28 4 H2 L-6-9" fill="none" stroke={C.coral} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14-11 L28-31 M27-31 H40" stroke={C.charcoal} strokeWidth="5" strokeLinecap="round" />
      <rect x="-31" y="-22" width="29" height="23" rx="5" fill={C.kraft} />
    </g>
  );
}

function Handset({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) rotate(-13)`}>
      <path d="M-62-10 C-50-34-31-45-10-51 C2-54 9-45 4-34 L-5-17 C8-4 23 5 40 8 L51-7 C58-17 71-14 75-3 C82 18 78 37 63 54 C45 74-1 60-34 34 C-61 13-72 8-62-10Z" fill={C.ink} />
      <path d="M-45-14 C-30 11 4 35 40 40" fill="none" stroke="#655a55" strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}

function Receipt({ x, y, label, value, rotate = 0 }: { x: number; y: number; label: string; value: string; rotate?: number }) {
  return (
    <g className="iso-float" transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect x="-43" y="-31" width="86" height="62" rx="14" fill={C.white} stroke="#dbcbbf" strokeWidth="2" />
      <text x="0" y="-7" textAnchor="middle" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="10" fontWeight="700" letterSpacing="2" fill="#8c7467">{label}</text>
      <text x="0" y="17" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="20" fontWeight="800" fill={value === '✓' ? C.coral : C.ink}>{value}</text>
    </g>
  );
}

function Phone({ x, y }: { x: number; y: number }) {
  return (
    <g className="iso-phone" transform={`translate(${x} ${y})`}>
      <rect x="-22" y="-10" width="44" height="27" rx="8" fill="#6b5a52" />
      <path d="M-15-10 C-13-28 13-28 15-10" fill="none" stroke={C.ink} strokeWidth="8" strokeLinecap="round" />
      <circle cx="0" cy="4" r="4" fill={C.coral} />
    </g>
  );
}

function Bubble({ x, y, coral = false }: { x: number; y: number; coral?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-36-19 H36 Q44-19 44-11 V12 Q44 20 36 20 H5 L-7 31 L-6 20 H-36 Q-44 20-44 12 V-11 Q-44-19-36-19Z" fill={coral ? C.coral : C.white} stroke={coral ? C.coralDark : '#ccb9ab'} strokeWidth="2" />
      <path d="M-24-4 H19 M-24 7 H8" stroke={coral ? '#fff4f1' : '#b6a298'} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
    </g>
  );
}

function Rug({ x, y, w, h, fill }: { x: number; y: number; w: number; h: number; fill: string }) {
  return <ellipse cx={x + w / 2} cy={y} rx={w / 2} ry={h / 2} fill={fill} opacity="0.74" />;
}

function Plant({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="23" rx="18" ry="6" fill="#5d4339" opacity="0.09" />
      <path d="M-12 4 H13 L8 28 H-7Z" fill="#b88b6d" />
      <path d="M0 4 C-25-10-22-31-5-25 C3-20 2-8 0 4Z" fill={C.sage} />
      <path d="M1 4 C20-19 33-15 27 0 C23 10 11 10 1 4Z" fill="#9db595" />
      <path d="M0 2 C-7-23 4-35 15-24 C24-13 13-3 0 2Z" fill="#b6c8ae" />
    </g>
  );
}

function Tree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="10" rx="19" ry="6" fill="#5d4339" opacity="0.08" />
      <rect x="-4" y="-15" width="8" height="28" rx="4" fill="#a78c74" />
      <circle cx="0" cy="-29" r="20" fill={C.sage} />
      <circle cx="-10" cy="-34" r="12" fill="#d1ddca" />
    </g>
  );
}

function Reception({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-66" y="-8" width="132" height="49" rx="14" fill={C.white} />
      <rect x="-66" y="20" width="132" height="21" rx="10" fill="#d6c6ba" />
      <path d="M-55 3 H55" stroke={C.coral} strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

function Cross({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-8" y="-27" width="16" height="54" rx="5" fill={C.coral} />
      <rect x="-27" y="-8" width="54" height="16" rx="5" fill={C.coral} />
    </g>
  );
}
