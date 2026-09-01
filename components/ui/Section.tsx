import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 ${className}`}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  /** canvas is the default page floor; white is a raised band */
  surface?: 'canvas' | 'white' | 'none';
  className?: string;
  id?: string;
  ariaLabel?: string;
};

export function Section({
  children,
  surface = 'canvas',
  className = '',
  id,
  ariaLabel,
}: SectionProps) {
  const bg = surface === 'white' ? 'bg-snow' : surface === 'canvas' ? 'bg-canvas' : '';
  return (
    <section id={id} aria-label={ariaLabel} className={`${bg} py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/**
 * Every section heading on the site, and the one place worth spending motion.
 *
 * Outside the scroll story the site did not move at all: `Reveal` existed and
 * was wired into three marketing components, so pricing, developers, compare
 * and every solutions and use-case page rendered as flat as a print-out. This
 * puts the eyebrow, heading and standfirst on a single staggered reveal, which
 * reaches 47 section heads across 21 files from here.
 *
 * The stagger is deliberately small — 0/70/140ms. A section head is three lines
 * of the same thought, not three items in a list, and a long cascade makes the
 * reader wait for a sentence they can already see.
 *
 * `reveal={false}` exists for anything that lands above the fold. Nothing does
 * today (heroes carry their own `h1` rather than a `SectionHead`), but an
 * element that starts at `opacity: 0` cannot be the largest contentful paint
 * until it is hydrated, so the escape hatch belongs here rather than in a
 * later scramble.
 */
export function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'left',
  className = '',
  reveal = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  reveal?: boolean;
}) {
  const eyebrowEl = eyebrow ? <p className="t-eyebrow mb-3 text-sindoor">{eyebrow}</p> : null;
  const titleEl = <h2 className="t-h2 text-balance">{title}</h2>;
  const subEl = sub ? <p className="t-body-lg mt-4 text-slate text-pretty">{sub}</p> : null;

  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {reveal ? (
        <>
          {eyebrowEl ? <Reveal>{eyebrowEl}</Reveal> : null}
          <Reveal delay={eyebrowEl ? 70 : 0}>{titleEl}</Reveal>
          {subEl ? <Reveal delay={eyebrowEl ? 140 : 70}>{subEl}</Reveal> : null}
        </>
      ) : (
        <>
          {eyebrowEl}
          {titleEl}
          {subEl}
        </>
      )}
    </div>
  );
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`t-eyebrow text-sindoor ${className}`}>{children}</p>;
}

export function Chip({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'forest' | 'iron';
}) {
  const tones = {
    neutral: 'bg-canvas text-slate border border-line',
    forest: 'bg-forest text-white',
    iron: 'bg-canvas text-iron border border-line',
  };
  return (
    <span
      className={`t-caption inline-flex items-center rounded-badge px-2 py-0.5 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
