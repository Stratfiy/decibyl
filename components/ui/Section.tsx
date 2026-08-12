import type { ReactNode } from 'react';

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

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow ? <p className="t-eyebrow mb-3 text-sindoor">{eyebrow}</p> : null}
      <h2 className="t-h2 text-balance">{title}</h2>
      {sub ? <p className="t-body-lg mt-4 text-slate text-pretty">{sub}</p> : null}
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
