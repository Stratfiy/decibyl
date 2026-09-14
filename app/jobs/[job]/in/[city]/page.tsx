import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { FaqList } from '@/components/marketing/Faq';
import { getJob } from '@/data/jobs';
import { cityLanguages, getCity } from '@/data/cities';
import { languageHref } from '@/data/languagePages';
import { getIntegrationPage } from '@/data/integrationPages';
import {
  assertPairsAreConsistent,
  cityPairsForCity,
  cityPairsForJob,
  getJobCityPair,
  integrationPairsForJob,
  jobCityPairs,
} from '@/data/jobPairs';
import { firstVoiceTier, formatInr, tiers, tierPrice } from '@/data/pricing';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

/**
 * A job crossed with a city: `/jobs/[job]/in/[city]`.
 *
 * Only pairs written in data/jobPairs.ts build. The city's languages come
 * from data/cities.ts, so a page never claims a language the city page does
 * not; the job's tasks come from data/jobs.ts, so the two never drift.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  assertPairsAreConsistent();
  return jobCityPairs.map((p) => ({ job: p.job, city: p.city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ job: string; city: string }>;
}): Promise<Metadata> {
  const { job: jobSlug, city: citySlug } = await params;
  const pair = getJobCityPair(jobSlug, citySlug);
  const job = getJob(jobSlug);
  const city = getCity(citySlug);
  if (!pair || !job || !city) return {};
  const langs = cityLanguages(city).map((l) => l.name);
  const tier = tiers.find((t) => t.name.toLowerCase() === job.recommendedTier) ?? firstVoiceTier;
  return pageMetadata({
    title: `AI ${job.title} in ${city.name}`,
    description: `The ${job.title.toLowerCase()} job in ${city.name}, done by a voice bot that answers in ${langs.join(', ')}. What the post asks for, what the bot does, and the price beside the salary, from ${tierPrice(tier, 'inr')}/month.`,
    path: `/jobs/${job.slug}/in/${city.slug}`,
    keywords: [
      `${job.title.toLowerCase()} ${city.name}`,
      `AI ${job.title.toLowerCase()} ${city.name}`,
      `${langs[0]} voice bot ${city.name}`,
      ...job.seo.keywords.slice(0, 2),
    ],
    ogTitle: `${job.title} in ${city.name}`,
    ogSubtitle: langs.join(' · '),
  });
}

export default async function JobInCityPage({
  params,
}: {
  params: Promise<{ job: string; city: string }>;
}) {
  const { job: jobSlug, city: citySlug } = await params;
  const pair = getJobCityPair(jobSlug, citySlug);
  const job = getJob(jobSlug);
  const city = getCity(citySlug);
  if (!pair || !job || !city) notFound();

  const langs = cityLanguages(city);
  const tier = tiers.find((t) => t.name.toLowerCase() === job.recommendedTier) ?? firstVoiceTier;
  const monthly = tier.priceInr ?? 0;
  const ratio = monthly > 0 ? Math.round((job.humanSalary.low / monthly) * 10) / 10 : null;
  const otherCities = cityPairsForJob(job.slug)
    .filter((p) => p.city !== city.slug)
    .map((p) => getCity(p.city))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const otherJobs = cityPairsForCity(city.slug)
    .filter((p) => p.job !== job.slug)
    .map((p) => getJob(p.job))
    .filter((j): j is NonNullable<typeof j> => Boolean(j));
  const tools = integrationPairsForJob(job.slug)
    .map((p) => getIntegrationPage(p.tool))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <section className="bg-canvas" aria-label={`${job.title} in ${city.name}`}>
        <Container>
          <div className="pt-14 pb-12 sm:pt-20">
            <nav aria-label="Breadcrumb">
              <ol className="t-data flex flex-wrap gap-2 text-iron">
                <li><Link href="/" className="hover:text-ink">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/jobs" className="hover:text-ink">Jobs</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href={`/jobs/${job.slug}`} className="hover:text-ink">{job.title}</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-slate">{city.name}</li>
              </ol>
            </nav>
            <p className="t-eyebrow mt-6 text-sindoor">{job.eyebrow} · {city.name}, {city.state}</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">
              The {job.title.toLowerCase()} job in {city.name}, done by a bot in the language the caller opens with
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">{pair.intro}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {langs.map((l) => {
                const href = languageHref(l.code);
                const body = (
                  <>
                    <span className="font-indic">{l.native}</span>
                    <span className="text-iron"> · {l.name}</span>
                  </>
                );
                const className = 'rounded-full border border-line bg-snow px-3 py-1 text-[0.9375rem]';
                return href ? (
                  <Link key={l.code} href={href} className={`${className} hover:border-vermilion`}>{body}</Link>
                ) : (
                  <span key={l.code} className={className}>{body}</span>
                );
              })}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl">
              <div className="rounded-card border border-line bg-snow p-6">
                <p className="t-eyebrow text-iron">The {city.name} post offers a person</p>
                <p className="mt-2 font-display text-[1.6rem] font-bold">
                  {formatInr(job.humanSalary.low)}–{formatInr(job.humanSalary.high)}
                </p>
                <p className="t-caption mt-1 text-iron">a month, commonly advertised in Indian metros, before leave, training and attrition</p>
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

      <Section surface="white" ariaLabel={`What is different in ${city.name}`}>
        <SectionHead
          eyebrow={`In ${city.name}`}
          title={`What changes about this job in ${city.name}`}
          sub="The languages, the businesses that run the volume, and the one thing a caller here expects that a generic bot gets wrong."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {pair.notes.map((n) => (
            <div key={n.title} className="rounded-card border border-line bg-canvas p-6">
              <p className="font-display font-bold">{n.title}</p>
              <p className="mt-2 text-[0.9375rem] text-slate">{n.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="The job, line by line">
        <SectionHead
          eyebrow="Line by line"
          title="What the post asks for, and what the bot does with each line"
          sub={`Read the left column as the ${city.name} job description you would have written.`}
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
        <div className="mt-8 rounded-card border border-line bg-snow p-6 max-w-3xl">
          <p className="t-eyebrow text-iron">What it does not do</p>
          <p className="mt-2 text-slate">{job.doesNot}</p>
        </div>
      </Section>

      <Section surface="white" ariaLabel="Related pages">
        <SectionHead
          eyebrow="Also"
          title="The same job elsewhere, other jobs here, and where the outcome goes"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div>
            <p className="t-eyebrow text-iron">{job.title}, in other cities</p>
            <ul className="mt-3 space-y-2">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/jobs/${job.slug}/in/${c.slug}`} className="text-sindoor hover:underline">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-iron">Other jobs in {city.name}</p>
            <ul className="mt-3 space-y-2">
              {otherJobs.map((j) => (
                <li key={j.slug}>
                  <Link href={`/jobs/${j.slug}/in/${city.slug}`} className="text-sindoor hover:underline">{j.title}</Link>
                </li>
              ))}
              <li>
                <Link href={`/ai-receptionist/${city.slug}`} className="text-sindoor hover:underline">AI receptionist in {city.name}</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-iron">Where the outcome goes</p>
            <ul className="mt-3 space-y-2">
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/jobs/${job.slug}/for/${t.slug}`} className="text-sindoor hover:underline">{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Questions">
        <SectionHead eyebrow="Questions" title={`${job.title} calls in ${city.name}`} />
        <div className="mt-8"><FaqList faqs={pair.faqs} /></div>
        <p className="t-caption mt-6 text-iron">
          Hear it first: call {site.demoPhone.display}. The agent picks up and you choose the language.
        </p>
      </Section>

      <FinalCta
        title={`Send us the ${job.title.toLowerCase()} post for ${city.name}.`}
        sub="We will tell you which lines a bot takes, which stay with a person, and what it costs beside the salary."
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jobs', path: '/jobs' },
            { name: job.title, path: `/jobs/${job.slug}` },
            { name: city.name, path: `/jobs/${job.slug}/in/${city.slug}` },
          ]),
          faqSchema(pair.faqs),
        ]}
      />
    </>
  );
}
