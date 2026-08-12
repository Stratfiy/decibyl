import type { Metadata } from 'next';
import { Container, Section } from '@/components/ui/Section';
import { CaseStudiesSection } from '@/components/marketing/CaseStudies';
import { FinalCta } from '@/components/marketing/Blocks';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Case Studies',
  description:
    'Real pilots, real outcomes — named case studies as they complete, and the honest status of what is running right now.',
  path: '/case-studies',
  keywords: ['voice AI case studies', 'AI calling results India'],
  ogTitle: 'What is actually running right now',
});

export default function CaseStudiesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-canvas" aria-label="Case studies">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
          style={{ background: 'var(--gradient-glow)' }}
        />
        <Container className="relative">
          <div className="pt-14 pb-12 sm:pt-20">
            <p className="t-eyebrow text-sindoor">Case studies</p>
            <h1 className="t-display mt-4 max-w-3xl text-balance">
              What&rsquo;s actually running, not what we hope is.
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              We only publish a case study once it&rsquo;s real: a named customer, a measurable
              result, and their sign-off. Until then, here&rsquo;s the honest status of every
              pilot in progress.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="white" className="pt-0" ariaLabel="Case studies list">
        <CaseStudiesSection />
      </Section>

      <FinalCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Case studies', path: '/case-studies' },
        ])}
      />
    </>
  );
}
