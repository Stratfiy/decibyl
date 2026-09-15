import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { FaqList } from '@/components/marketing/Faq';
import { getJob, jobs } from '@/data/jobs';
import { getCity } from '@/data/cities';
import { getIntegrationPage } from '@/data/integrationPages';
import { languagePages, languageRecord, languageSlug } from '@/data/languagePages';
import { findAnyVertical } from '@/data/verticals';
import { firstVoiceTier, formatInr, tiers, tierPrice } from '@/data/pricing';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((j) => ({ job: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ job: string }> }): Promise<Metadata> {
  const { job: slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return pageMetadata({
    title: job.seo.title,
    description: job.seo.description,
    path: `/jobs/${job.slug}`,
    keywords: job.seo.keywords,
    ogTitle: job.title,
    ogSubtitle: `Done by a bot, from ${tierPrice(tiers.find((t) => t.name.toLowerCase() === job.recommendedTier) ?? firstVoiceTier, 'inr')}/month`,
  });
}

const directionLabel = { inbound: 'Answers calls', outbound: 'Makes calls', both: 'Answers and makes calls' } as const;

export default async function JobPage({ params }: { params: Promise<{ job: string }> }) {
  const { job: slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const tier = tiers.find((t) => t.name.toLowerCase() === job.recommendedTier) ?? firstVoiceTier;
  const cityRecords = job.cities.map((c) => getCity(c)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const integrationRecords = job.integrations
    .map((s) => getIntegrationPage(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const languageRecords = job.languages.map((c) => languagePages.find((l) => l.code === c)).filter((l): l is NonNullable<typeof l> => Boolean(l));
  const verticalRecords = job.verticals.map((v) => findAnyVertical(v)).filter((v): v is NonNullable<typeof v> => Boolean(v));
  const siblings = jobs.filter((j) => j.slug !== job.slug && j.direction === job.direction).slice(0, 3);
  const monthly = tier.priceInr ?? 0;
  const ratio = monthly > 0 ? Math.round((job.humanSalary.low / monthly) * 10) / 10 : null;

  return (
    <>
      <section className="bg-canvas" aria-label={job.title}>
        <Container>
          <div className="pt-14 pb-12 sm:pt-20">
            <nav aria-label="Breadcrumb">
              <ol className="t-data flex flex-wrap gap-2 text-iron">
                <li><Link href="/" className="hover:text-ink">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/jobs" className="hover:text-ink">Jobs</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-slate">{job.title}</li>
              </ol>
            </nav>
            <p className="t-eyebrow mt-6 text-sindoor">{job.eyebrow} · {directionLabel[job.direction]}</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">{job.h1}</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">{job.intro}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl">
              <div className="rounded-card border border-line bg-snow p-6">
                <p className="t-eyebrow text-iron">The post offers a person</p>
                <p className="mt-2 font-display text-[1.6rem] font-bold">
                  {formatInr(job.humanSalary.low)}–{formatInr(job.humanSalary.high)}
                </p>
                <p className="t-caption mt-1 text-iron">a month, commonly advertised, before leave, training and attrition</p>
              </div>
              <div className="rounded-card border border-sindoor bg-snow p-6">
                <p className="t-eyebrow text-sindoor">The bot runs on {tier.name}</p>
                <p className="mt-2 font-display text-[1.6rem] font-bold">{tierPrice(tier, 'inr')}</p>
                <p className="t-caption mt-1 text-iron">
                  a month excl. GST, {tier.phoneNumbers.toLowerCase()} and calling credit included
                  {ratio ? `; about ${ratio}× less than the lower salary` : ''}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel="The job, line by line">
        <SectionHead
          eyebrow="Line by line"
          title="What the post asks for, and what the bot does with each line"
          sub="Read the left column as the job description you would have written. The right column is what changes when a bot holds the phone."
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-[0.9375rem]">
            <thead>
              <tr className="border-b border-line text-iron">
                <th className="py-3 pr-6 font-medium">The job post says</th>
                <th className="py-3 font-medium">Decibyl does</th>
              </tr>
            </thead>
            <tbody>
              {job.tasks.map((task, i) => (
                <tr key={task} className="border-b border-line align-top">
                  <td className="py-4 pr-6 font-display font-bold">{task}</td>
                  <td className="py-4 text-slate">{job.botDoes[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 rounded-card border border-line bg-canvas p-6 max-w-3xl">
          <p className="t-eyebrow text-iron">What it does not do</p>
          <p className="mt-2 text-slate">{job.doesNot}</p>
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Where the outcome goes">
        <SectionHead
          eyebrow="Where the outcome goes"
          title="The call ends and your system already knows"
          sub="Each of these has a page on what moves, in which direction, and how to connect it."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {integrationRecords.map((p) => (
            <Link
              key={p.slug}
              href={`/jobs/${job.slug}/for/${p.slug}`}
              className="group rounded-card border border-line bg-snow p-6 transition-colors hover:border-vermilion"
            >
              <p className="t-eyebrow text-sindoor">{p.eyebrow}</p>
              <p className="mt-2 font-display font-bold">{p.name}</p>
              <p className="mt-2 text-[0.9375rem] text-slate">{p.flows[0].body}</p>
              <span className="t-data mt-3 inline-block text-sindoor group-hover:underline">{job.title} → {p.name}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section surface="white" ariaLabel="Go deeper">
        <SectionHead
          eyebrow="Go deeper"
          title="The economics, worked through with your numbers"
          sub="These pages take the same job into a specific business and a specific city."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="t-eyebrow text-iron">By industry</p>
            <ul className="mt-3 space-y-2">
              {verticalRecords.map((v) => (
                <li key={v.slug}>
                  <Link href={`/jobs/${job.slug}/industry/${v.slug}`} className="text-sindoor hover:underline">{job.title} for {v.name.toLowerCase()}</Link>
                </li>
              ))}
              {job.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-sindoor hover:underline">{r.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-iron">By language</p>
            <ul className="mt-3 space-y-2">
              {languageRecords.map((l) => (
                <li key={l.code}>
                  <Link href={`/jobs/${job.slug}/language/${languageSlug(l)}`} className="text-sindoor hover:underline">{job.title} in {languageRecord(l)?.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-iron">By city</p>
            <ul className="mt-3 space-y-2">
              {cityRecords.map((c) => (
                <li key={c.slug}>
                  <Link href={`/jobs/${job.slug}/in/${c.slug}`} className="text-sindoor hover:underline">
                    {job.title} calls in {c.name}, in {c.languages.length} languages
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {siblings.length > 0 && (
          <p className="t-caption mt-8 text-iron">
            Similar jobs:{' '}
            {siblings.map((s, i) => (
              <span key={s.slug}>
                <Link href={`/jobs/${s.slug}`} className="text-sindoor hover:underline">{s.title}</Link>
                {i < siblings.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        )}
      </Section>

      <Section surface="canvas" ariaLabel="Questions">
        <SectionHead eyebrow="Questions" title={`Before you hand over the ${job.title.toLowerCase()} job`} />
        <div className="mt-8"><FaqList faqs={job.faqs} /></div>
        <p className="t-caption mt-6 text-iron">
          Hear it first: call {site.demoPhone.display}. The agent picks up and you choose the language.
        </p>
      </Section>

      <FinalCta
        title={`Send us the ${job.title.toLowerCase()} post.`}
        sub="We will tell you which lines a bot takes, which stay with a person, and what it costs beside the salary."
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jobs', path: '/jobs' },
            { name: job.title, path: `/jobs/${job.slug}` },
          ]),
          faqSchema(job.faqs),
        ]}
      />
    </>
  );
}
