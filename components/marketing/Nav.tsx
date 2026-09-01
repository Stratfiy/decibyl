'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { topLevelVerticals, verticalHref } from '@/data/verticals';
import { competitors } from '@/data/competitors';
import { useCases } from '@/data/useCases';

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

/** Kept top-level: the two pages in the primary buyer journey. */
const primaryLinks = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
];

const navItemClass = 'nav-morph-link rounded-button px-2.5 py-1.5 text-[0.8rem] font-medium text-slate';

/** 13 Aug 2026: consolidated into a "Company" dropdown — six top-level
 *  links plus two dropdowns had become too much for a horizontal nav.
 *  Security moves in here too, out of footer-only. */
const companyLinks = [
  { label: 'Developers', href: '/developers' },
  { label: 'Partners', href: '/partners' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Security', href: '/security' },
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
      className="sticky top-0 z-50 h-14 px-2 sm:px-3"
    >
      <Container>
        <div
          className="site-nav-shell mx-auto flex h-12 max-w-[940px] translate-y-1 items-center justify-between gap-3 px-2.5 sm:px-3"
          data-scrolled={scrolled || undefined}
        >
          <Link href="/" className="flex items-center gap-2" aria-label="Decibyl home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            <SolutionsMenu />
            <UseCasesMenu />
            {primaryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={navItemClass}
              >
                {l.label}
              </Link>
            ))}
            <CompanyMenu />
            <CompareMenu />
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href="/book-a-demo" variant="primary" className="nav-morph-cta hidden sm:inline-flex">
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
        <div id="mobile-nav" className="nav-morph-menu absolute inset-x-3 top-[3.75rem] overflow-hidden rounded-card border border-line shadow-[var(--shadow-lift)] lg:hidden">
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
              <p className="t-eyebrow mt-4 mb-1 text-iron">Use cases</p>
              {useCases.map((item) => (
                <Link key={item.slug} href={`/use-cases/${item.slug}`} onClick={() => setOpen(false)} className="py-2 text-[0.9375rem] text-ink">
                  {item.name}
                </Link>
              ))}
              <Link href="/use-cases" onClick={() => setOpen(false)} className="py-2 text-[0.9375rem] font-medium text-sindoor">All use cases →</Link>
              <p className="t-eyebrow mt-4 mb-1 text-iron">Company</p>
              {[...primaryLinks, ...companyLinks].map((l) => (
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

function UseCasesMenu() {
  return (
    <div className="group relative">
      <button type="button" className={navItemClass} aria-haspopup="true">Use cases</button>
      <div className="invisible absolute top-full left-0 w-72 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="nav-morph-menu rounded-card border border-line p-2 shadow-[var(--shadow-card)]">
          {useCases.map((item) => <Link key={item.slug} href={`/use-cases/${item.slug}`} className="block rounded-[10px] px-3 py-2 text-[0.9375rem] text-ink transition-colors hover:bg-canvas">{item.name}</Link>)}
          <div className="my-2 border-t border-line" />
          <Link href="/use-cases" className="block rounded-[10px] px-3 py-2 text-[0.9375rem] font-medium text-sindoor hover:bg-canvas">All use cases →</Link>
        </div>
      </div>
    </div>
  );
}

function SolutionsMenu() {
  return (
    <div className="group relative">
      <button
        type="button"
        className={navItemClass}
        aria-haspopup="true"
      >
        Solutions
      </button>
      <div className="invisible absolute top-full left-0 w-64 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="nav-morph-menu rounded-card border border-line p-2 shadow-[var(--shadow-card)]">
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

function CompanyMenu() {
  return (
    <div className="group relative">
      <button
        type="button"
        className={navItemClass}
        aria-haspopup="true"
      >
        Company
      </button>
      <div className="invisible absolute top-full left-0 w-56 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="nav-morph-menu rounded-card border border-line p-2 shadow-[var(--shadow-card)]">
          {companyLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-[10px] px-3 py-2 text-[0.9375rem] text-ink transition-colors hover:bg-canvas"
            >
              {l.label}
            </Link>
          ))}
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
        className={navItemClass}
        aria-haspopup="true"
      >
        Compare
      </button>
      <div className="invisible absolute top-full left-0 w-56 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="nav-morph-menu rounded-card border border-line p-2 shadow-[var(--shadow-card)]">
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
      <img src="/favicon-48.png" width="22" height="22" alt="" aria-hidden="true" />
      <span className="font-display text-[1rem] font-bold tracking-tight text-ink">Decibyl</span>
    </span>
  );
}
