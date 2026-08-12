import type { Metadata } from 'next';
import Link from 'next/link';
import { VerticalPage } from '@/components/marketing/VerticalPage';
import { clinicSubVerticals, getVertical } from '@/data/verticals';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';
import { Section, SectionHead } from '@/components/ui/Section';

/**
 * The flagship. Lives at its own route rather than under [vertical] because the
 * static `clinics` segment already exists for the sub-vertical pages, and a
 * static segment takes precedence over its dynamic sibling.
 */

const clinics = getVertical('clinics')!;

export const metadata: Metadata = pageMetadata({
  title: clinics.seo.title,
  description: clinics.seo.description,
  path: '/solutions/clinics',
  keywords: clinics.seo.keywords,
  ogTitle: clinics.h1,
  ogSubtitle: clinics.eyebrow,
});

export default function ClinicsPage() {
  return (
    <>
      <VerticalPage vertical={clinics} />

      <Section surface="canvas" ariaLabel="Clinic specialisms">
        <SectionHead
          eyebrow="By specialism"
          title="Written for your kind of clinic."
          sub="Same agent, different specifics — the calls a dental practice gets are not the calls a lab gets."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {clinicSubVerticals.map((sub) => (
            <li key={sub.slug}>
              <Link
                href={`/solutions/clinics/${sub.slug}`}
                className="block h-full rounded-card border border-line bg-snow p-7 transition-colors hover:border-vermilion"
              >
                <h3 className="t-h3">{sub.name}</h3>
                <p className="mt-2 text-[0.9375rem] text-slate">{sub.cardPain}</p>
                <p className="mt-4 text-[0.9375rem] font-medium text-sindoor">
                  Read more <span aria-hidden="true">→</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <JsonLd
        data={[
          faqSchema(clinics.objections),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Clinics', path: '/solutions/clinics' },
          ]),
        ]}
      />
    </>
  );
}
