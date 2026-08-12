'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * The signature component. ONE horizontal scroll-snap carousel, reused for use
 * cases, features, and integrations. Native CSS scroll-snap — no carousel
 * library, works without JS, and momentum/drag come free on touch.
 */

export type DeckItem = {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  /** language chips or metadata, set in --font-indic when `indic` is true */
  meta?: string;
  indic?: boolean;
  href?: string;
  linkLabel?: string;
  /** honesty chip — e.g. "Coming soon" on an unbuilt integration */
  chip?: string | null;
};

const pastels = [
  'bg-peach',
  'bg-sage',
  'bg-sand',
  'bg-mistblue',
  'bg-blush',
  'bg-lilac',
] as const;

export function SlideDeck({
  title,
  sub,
  items,
  idPrefix,
}: {
  title: string;
  sub?: string;
  items: DeckItem[];
  idPrefix: string;
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : rail.clientWidth;
    const max = rail.scrollWidth - rail.clientWidth;
    setAtStart(rail.scrollLeft <= 4);
    setAtEnd(rail.scrollLeft >= max - 4);
    setIndex(Math.min(items.length - 1, Math.round(rail.scrollLeft / step)));
  }, [items.length]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    measure();
    rail.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      rail.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const scrollBy = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : rail.clientWidth;
    rail.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  const headingId = `${idPrefix}-heading`;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 id={headingId} className="t-h2 text-balance">
            {title}
          </h2>
          {sub ? <p className="t-body-lg mt-3 text-slate text-pretty">{sub}</p> : null}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <span className="t-data text-iron" aria-hidden="true">
            {index + 1}/{items.length}
          </span>
          <ArrowButton
            direction="left"
            disabled={atStart}
            onClick={() => scrollBy(-1)}
            label={`Previous ${title}`}
          />
          <ArrowButton
            direction="right"
            disabled={atEnd}
            onClick={() => scrollBy(1)}
            label={`Next ${title}`}
          />
        </div>
      </div>

      <ul
        ref={railRef}
        aria-labelledby={headingId}
        className="deck-rail mt-9 -mx-5 px-5 sm:-mx-6 sm:px-6"
      >
        {items.map((item, i) => (
          <li key={item.id} className={`deck-card rounded-card p-7 ${pastels[i % pastels.length]}`}>
            <CardBody item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CardBody({ item }: { item: DeckItem }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        {item.eyebrow ? <p className="t-eyebrow text-ink/70">{item.eyebrow}</p> : <span />}
        {item.chip ? (
          <span className="t-caption rounded-badge border border-ink/15 bg-white/60 px-2 py-0.5 text-ink/70">
            {item.chip}
          </span>
        ) : null}
      </div>

      <h3 className="t-h3 mt-4 text-ink">{item.title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/80">{item.body}</p>

      <div className="mt-auto pt-8">
        {item.meta ? (
          <p className={`t-caption text-ink/75 ${item.indic ? 't-indic' : ''}`}>{item.meta}</p>
        ) : null}
        {item.href ? (
          <p className="mt-3 text-[0.9375rem] font-medium text-sindoor">
            {item.linkLabel ?? 'Explore'} <span aria-hidden="true">→</span>
          </p>
        ) : null}
      </div>
    </>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="flex h-full min-h-[280px] flex-col rounded-card">
        {inner}
      </Link>
    );
  }
  return <div className="flex h-full min-h-[280px] flex-col">{inner}</div>;
}

function ArrowButton({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-button border border-line bg-snow text-ink transition-colors hover:border-ink/25 disabled:opacity-35 disabled:hover:border-line"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={direction === 'left' ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
