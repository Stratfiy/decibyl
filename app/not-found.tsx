import Link from 'next/link';
import { Container } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { topLevelVerticals, verticalHref } from '@/data/verticals';

export default function NotFound() {
  return (
    <section className="bg-canvas" aria-label="Page not found">
      <Container>
        <div className="max-w-2xl py-24 sm:py-32">
          <p className="t-eyebrow text-sindoor">404</p>
          <h1 className="t-display mt-4">This page didn’t pick up.</h1>
          <p className="t-body-lg mt-5 text-slate">
            The link is dead, but the rest of the site isn’t. Try one of these.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg">
              See pricing
            </ButtonLink>
          </div>
          <div className="mt-12">
            <p className="t-eyebrow text-iron">Solutions</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {topLevelVerticals.map((v) => (
                <Link
                  key={v.slug}
                  href={verticalHref(v)}
                  className="rounded-button border border-line bg-snow px-4 py-2 text-[0.9375rem] transition-colors hover:border-vermilion"
                >
                  {v.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
