import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { topLevelVerticals, clinicSubVerticals, verticalHref } from '@/data/verticals';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Solutions by Industry',
  description:
    'Voice agents for D2C and NDR recovery, clinics, real estate, lending and collections, logistics, and education — in Indian languages, and beyond.',
  path: '/solutions',
  keywords: ['voice AI use cases India', 'AI calling by industry India'],
  ogTitle: 'Same engine. Different conversation.',
});

const pastels = ['bg-peach', 'bg-sage', 'bg-sand', 'bg-mistblue', 'bg-blush', 'bg-lilac'];

export default function SolutionsIndex() {
  return (
    <>
      <section className="bg-canvas" aria-label="Solutions">
        <Container>
          <div className="pt-14 pb-10 sm:pt-20">
            <p className="t-eyebrow text-sindoor">Solutions</p>
            <h1 className="t-display mt-4 max-w-3xl text-balance">
              Same engine. Different conversation.
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              The agent is the same in every one of these. What changes is the script, the
              transfer rules, and the outcome we write back.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="canvas" className="pt-4" ariaLabel="Verticals">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topLevelVerticals.map((v, i) => (
            <li key={v.slug}>
              <Link
                href={verticalHref(v)}
                className={`flex h-full flex-col rounded-card p-7 transition-transform hover:-translate-y-1.5 ${pastels[i % pastels.length]}`}
              >
                <h2 className="t-h3">{v.name}</h2>
                <p className="mt-2 text-[0.9375rem] text-ink/75">{v.cardPain}</p>
                <div className="mt-auto pt-8">
                  <p className="t-caption t-indic text-ink/60">{v.cardLanguages}</p>
                  <p className="mt-3 text-[0.9375rem] font-medium text-sindoor">
                    Explore <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="white" ariaLabel="Clinic specialisms">
        <SectionHead eyebrow="Clinics, by specialism" title="Written for your kind of practice." />
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {clinicSubVerticals.map((v) => (
            <li key={v.slug}>
              <Link
                href={verticalHref(v)}
                className="block h-full rounded-card border border-line p-7 transition-colors hover:border-vermilion"
              >
                <h3 className="t-h3">{v.name}</h3>
                <p className="mt-2 text-[0.9375rem] text-slate">{v.cardPain}</p>
                <p className="mt-4 text-[0.9375rem] font-medium text-sindoor">
                  Read more <span aria-hidden="true">→</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions' },
        ])}
      />
    </>
  );
}
