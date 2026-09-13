import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Section';
import { site } from '@/lib/site';

/**
 * ⚠️ These policies are a careful, India-specific draft written to match what
 * the product actually does. They are not legal advice and have not been
 * reviewed by counsel — see OPEN-ITEMS.md before launch, and fill in the
 * registered address in lib/site.ts (a GST-registered entity needs a visible
 * one, and it helps local SEO).
 */

export const LEGAL_UPDATED = '12 August 2026';

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="bg-canvas" aria-label={title}>
      <Container>
        <div className="max-w-3xl py-14 sm:py-20">
          <p className="t-eyebrow text-sindoor">Legal</p>
          <h1 className="t-h2 mt-4">{title}</h1>
          <p className="t-body-lg mt-5 text-slate text-pretty">{intro}</p>
          <p className="t-data mt-6 text-iron">
            Last updated {LEGAL_UPDATED} · {site.legalName}
          </p>

          <div className="legal-body mt-12 space-y-10">{children}</div>

          <p className="t-caption mt-14 border-t border-line pt-6 text-iron">
            Questions about any of this? Email{' '}
            <a className="text-sindoor underline-offset-4 hover:underline" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

/**
 * A clause you can point somebody at. Legal pages get read in disputes and in
 * diligence, where "see the acceptable use section" is far weaker than a link
 * that lands on it. The id is derived from the heading rather than passed in,
 * so a section cannot be published without one.
 */
function slugify(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  const id = slugify(heading);
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="t-h3">{heading}</h2>
      <div className="mt-3 space-y-3 text-slate [&_a]:text-sindoor [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}
