import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { competitors, getCompetitor } from '@/data/competitors';
import { findAnyVertical, verticalHref } from '@/data/verticals';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return competitors.map((c) => ({ competitor: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor: slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};

  return pageMetadata({
    title: competitor.seo.title,
    description: competitor.seo.description,
    path: `/compare/${competitor.slug}`,
    keywords: competitor.seo.keywords,
    ogTitle: `Decibyl vs ${competitor.name}`,
    ogSubtitle: 'An honest comparison for Indian teams',
  });
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor: slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) notFound();

  const related = competitor.relatedVerticals
    .map((s) => findAnyVertical(s))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  return (
    <>
      <section className="bg-canvas" aria-label="Comparison">
        <Container>
          <div className="pt-14 pb-12 sm:pt-20">
            <nav aria-label="Breadcrumb">
              <ol className="t-data flex gap-2 text-iron">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-slate">vs {competitor.name}</li>
              </ol>
            </nav>

            <h1 className="t-display mt-6 max-w-4xl text-balance">
              Decibyl vs {competitor.name} — an honest comparison for Indian teams
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              We name what they do better. A comparison page that admits a weakness is believed;
              one that doesn’t, isn’t — and you can fact-check either of us in thirty seconds.
            </p>
          </div>
        </Container>
      </section>

      {/* Two-paragraph summary — who each is genuinely best for */}
      <Section surface="white" ariaLabel="Summary">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-card border border-line p-8">
            <p className="t-eyebrow text-slate">{competitor.name} is best for</p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink">
              {competitor.summaryThem}
            </p>
          </div>
          <div className="rounded-card bg-peach p-8">
            <p className="t-eyebrow text-ink/60">Decibyl is best for</p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink">{competitor.summaryUs}</p>
          </div>
        </div>
      </Section>

      {/* Feature table */}
      <Section surface="canvas" ariaLabel="Feature comparison">
        <SectionHead title="Side by side" sub="Where each of us actually stands today." />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="t-eyebrow py-4 pr-6 text-iron">
                  Feature
                </th>
                <th scope="col" className="py-4 pr-6 text-[1.0625rem] font-semibold">
                  {competitor.name}
                </th>
                <th scope="col" className="py-4 text-[1.0625rem] font-semibold text-vermilion">
                  Decibyl
                </th>
              </tr>
            </thead>
            <tbody>
              {competitor.table.map((row) => (
                <tr key={row.feature} className="border-b border-line align-top">
                  <th scope="row" className="py-4 pr-6 text-[0.9375rem] font-medium text-slate">
                    {row.feature}
                  </th>
                  <td className="py-4 pr-6 text-[0.9375rem] text-ink">{row.them}</td>
                  <td className="py-4 text-[0.9375rem] text-ink">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Where they're stronger — a real section */}
      <Section surface="white" ariaLabel={`Where ${competitor.name} is stronger`}>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="t-h2">Where {competitor.name} is stronger</h2>
            <ul className="mt-8 space-y-6">
              {competitor.strongerThem.map((item) => (
                <li key={item.title} className="border-l-2 border-line pl-5">
                  <h3 className="t-h3 text-[1.125rem]">{item.title}</h3>
                  <p className="mt-1.5 text-slate">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="t-h2">Where Decibyl is stronger</h2>
            <ul className="mt-8 space-y-6">
              {competitor.strongerUs.map((item) => (
                <li key={item.title} className="border-l-2 border-vermilion pl-5">
                  <h3 className="t-h3 text-[1.125rem]">{item.title}</h3>
                  <p className="mt-1.5 text-slate">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Verdict */}
      <Section surface="canvas" ariaLabel="Verdict">
        <div className="rounded-panel bg-snow p-8 sm:p-12">
          <p className="t-eyebrow text-sindoor">Verdict</p>
          <p className="t-body-lg mt-4 max-w-3xl text-ink text-pretty">{competitor.verdict}</p>

          {related.length ? (
            <div className="mt-9">
              <p className="t-eyebrow text-iron">If you’re here for a specific job</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {related.map((v) => (
                  <Link
                    key={v.slug}
                    href={verticalHref(v)}
                    className="rounded-button border border-line px-5 py-2.5 text-[0.9375rem] transition-colors hover:border-vermilion"
                  >
                    {v.name} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-9 flex flex-wrap gap-3">
            {competitors
              .filter((c) => c.slug !== competitor.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="t-data text-sindoor underline-offset-4 hover:underline"
                >
                  Compare with {c.name} →
                </Link>
              ))}
          </div>
        </div>
      </Section>

      <FinalCta
        title="The fastest way to compare is to hear both."
        sub="Book a demo and we’ll call you with a live agent in the language you pick."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: `vs ${competitor.name}`, path: `/compare/${competitor.slug}` },
        ])}
      />
    </>
  );
}
