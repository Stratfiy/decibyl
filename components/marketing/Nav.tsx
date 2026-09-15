'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/lib/site';

const primaryLinks = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Use cases', href: '/use-cases' },
  { label: 'Voice', href: '/voice-ai' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Developers', href: '/developers' },
];

const companyLinks = [
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Partners', href: '/partners' },
  { label: 'Security', href: '/security' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const navItemClass = 'nav-morph-link rounded-button px-2.5 py-1.5 text-[0.8rem] font-medium text-slate';

export function Nav() {
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
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 h-14 px-2 sm:px-3">
      <Container>
        <div
          className="site-nav-shell mx-auto flex h-12 max-w-[1200px] translate-y-1 items-center justify-between gap-3 px-2.5 sm:px-3"
          data-scrolled={scrolled || undefined}
        >
          <Link href="/" className="flex items-center gap-2" aria-label="Decibyl home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navItemClass}>{link.label}</Link>
            ))}
            <CompanyMenu />
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.external.login}
              className="hidden px-2 text-[0.8rem] font-semibold text-ink hover:text-sindoor sm:inline-flex"
            >
              Log in
            </a>
            <ButtonLink href={site.external.signup} variant="primary" className="nav-morph-cta hidden sm:inline-flex">
              Get started
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
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
              {primaryLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-2 text-[0.9375rem] text-ink">
                  {link.label}
                </Link>
              ))}
              <p className="t-eyebrow mt-4 mb-1 text-iron">Company</p>
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-2 text-[0.9375rem] text-ink">
                  {link.label}
                </Link>
              ))}
              <ButtonLink href={site.external.signup} className="mt-4" size="lg">
                Get started free
              </ButtonLink>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function CompanyMenu() {
  return (
    <div className="group relative">
      <button type="button" className={navItemClass} aria-haspopup="true">Company</button>
      <div className="invisible absolute top-full left-0 w-56 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="nav-morph-menu rounded-card border border-line p-2 shadow-[var(--shadow-card)]">
          {companyLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block rounded-[10px] px-3 py-2 text-[0.9375rem] text-ink transition-colors hover:bg-canvas">
              {link.label}
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
      <img src="/decibyl-mark.svg" width="24" height="24" alt="" aria-hidden="true" />
      <span className="font-display text-[1rem] font-bold tracking-tight text-ink">Decibyl</span>
    </span>
  );
}
