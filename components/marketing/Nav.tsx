'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { topLevelVerticals, verticalHref } from '@/data/verticals';
import { competitors } from '@/data/competitors';

/**
 * P1-1, 13 Aug 2026: the nav shows three verticals, not all nine — six
 * verticals plus three clinic sub-pages against three in-progress pilots
 * read as "we do everything, we've proven nothing." Every page still
 * exists and still earns organic traffic; /solutions lists all nine.
 * Standing rule for adding a fourth: see CONTRIBUTING.md.
 */
const featuredVerticalSlugs = ['clinics', 'real-estate', 'd2c-ndr-recovery'];
const featuredVerticals = featuredVerticalSlugs
  .map((slug) => topLevelVerticals.find((v) => v.slug === slug))
  .filter((v): v is NonNullable<typeof v> => Boolean(v));

const links = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Developers', href: '/developers' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
];

export function Nav() {
  // Glass appears only after 40px of scroll — content passing underneath is
  // what makes it read as glass.
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled ? 'glass border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Decibyl home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <SolutionsMenu />
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-button px-3 py-2 text-[0.9375rem] text-slate transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <CompareMenu />
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href="/book-a-demo" variant="primary" className="hidden sm:inline-flex">
              Book a demo
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex h-11 w-11 items-center justify-center rounded-button border border-line bg-snow lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                {open ? (
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                ) : (
                  <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-snow lg:hidden">
          <Container>
            <nav aria-label="Mobile" className="grid gap-1 py-5">
              <p className="t-eyebrow mt-2 mb-1 text-iron">Solutions</p>
              {featuredVerticals.map((v) => (
                <Link
                  key={v.slug}
                  href={verticalHref(v)}
                  onClick={() => setOpen(false)}
                  className="py-2 text-[0.9375rem] text-ink"
                >
                  {v.name}
                </Link>
              ))}
              <Link
                href="/solutions"
                onClick={() => setOpen(false)}
                className="py-2 text-[0.9375rem] font-medium text-sindoor"
              >
                All industries <span aria-hidden="true">→</span>
              </Link>
              <p className="t-eyebrow mt-4 mb-1 text-iron">Company</p>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-[0.9375rem] text-ink"
                >
                  {l.label}
                </Link>
              ))}
              {competitors.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="py-2 text-[0.9375rem] text-ink"
                >
                  Decibyl vs {c.name}
                </Link>
              ))}
              <ButtonLink href="/book-a-demo" className="mt-4" size="lg">
                Book a demo
              </ButtonLink>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function SolutionsMenu() {
  return (
    <div className="group relative">
      <button
        type="button"
        className="rounded-button px-3 py-2 text-[0.9375rem] text-slate transition-colors group-hover:text-ink"
        aria-haspopup="true"
      >
        Solutions
      </button>
      <div className="invisible absolute top-full left-0 w-64 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-card border border-line bg-snow p-2 shadow-[var(--shadow-card)]">
          {featuredVerticals.map((v) => (
            <Link
              key={v.slug}
              href={verticalHref(v)}
              className="block rounded-[10px] px-3 py-2 text-[0.9375rem] text-ink transition-colors hover:bg-canvas"
            >
              {v.name}
            </Link>
          ))}
          <div className="my-2 border-t border-line" />
          <Link
            href="/solutions"
            className="block rounded-[10px] px-3 py-2 text-[0.9375rem] font-medium text-sindoor transition-colors hover:bg-canvas"
          >
            All industries <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function CompareMenu() {
  return (
    <div className="group relative">
      <button
        type="button"
        className="rounded-button px-3 py-2 text-[0.9375rem] text-slate transition-colors group-hover:text-ink"
        aria-haspopup="true"
      >
        Compare
      </button>
      <div className="invisible absolute top-full left-0 w-56 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-card border border-line bg-snow p-2 shadow-[var(--shadow-card)]">
          {competitors.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="block rounded-[10px] px-3 py-2 text-[0.9375rem] text-ink transition-colors hover:bg-canvas"
            >
              Decibyl vs {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect width="26" height="26" rx="8" fill="#F0431C" />
        <rect x="6" y="11" width="2.5" height="4" rx="1.25" fill="white" />
        <rect x="10.5" y="7.5" width="2.5" height="11" rx="1.25" fill="white" />
        <rect x="15" y="9.5" width="2.5" height="7" rx="1.25" fill="white" />
        <rect x="19.5" y="12" width="2.5" height="2" rx="1" fill="white" opacity="0.75" />
      </svg>
      <span className="font-display text-[1.15rem] font-bold tracking-tight text-ink">Decibyl</span>
    </span>
  );
}
