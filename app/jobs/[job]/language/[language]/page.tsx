import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { FaqList } from '@/components/marketing/Faq';
import { getJob } from '@/data/jobs';
import { getLanguagePageBySlug, languageHref, languagePages, languageRecord, languageSlug } from '@/data/languagePages';
import { assertLanguagePairsAreConsistent, getJobLanguagePair, jobLanguagePairs, languagePairsForJob, languagePairsForLanguage } from '@/data/jobLanguagePairs';
import { cityPairsForJob } from '@/data/jobPairs';
import { getCity } from '@/data/cities';
import { firstVoiceTier, formatInr, tiers, tierPrice, voiceRateInr } from '@/data/pricing';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

/** A job crossed with a language: `/jobs/[job]/language/[language]`. Only written pairs build. */

export const dynamicParams = false;

function slugFor(code: string): string {
  const page = languagePages.find((l) => l.code === code);
  return page ? languageSlug(page) : code;
}

export function generateStaticParams() {
  assertLanguagePairsAreConsistent();
  return jobLanguagePairs.map((p) => ({ job: p.job, language: slugFor(p.language) }));
}

export async function generateMetadata({ params }: { params: Promise<{ job: string; language: string }> }): Promise<Metadata> {
  const { job: jobSlug, language: langSlug } = await params;
  const page = getLanguagePageBySlug(langSlug);
  const job = getJob(jobSlug);
  const pair = page ? getJobLanguagePair(jobSlug, page.code) : undefined;
  if (!pair || !job || !page) return {};
  const record = languageRecord(page)!;
  const tier = tiers.find((t) => t.name.toLowerCase() === job.recommendedTier) ?? firstVoiceTier;
  return pageMetadata({
    title: `AI ${job.title} in ${record.name}`,
    description: `The ${job.title.toLowerCase()} job done by a bot that speaks ${record.name}: what ${record.name} makes hard, how numbers and dates arrive, and the price beside the salary, from ${tierPrice(tier, 'inr')}/month.`,
    path: `/jobs/${job.slug}/language/${langSlug}`,
    keywords: [`${record.name} ${job.title.toLowerCase()} bot`, `AI ${job.title.toLowerCase()} ${record.name}`, `${record.name} voice bot`, ...job.seo.keywords.slice(0, 2)],
    ogTitle: `${job.title} in ${record.name}`,
    ogSubtitle: `${record.native} · from ${tierPrice(tier, 'inr')}/month`,
  });
}

export default async function JobInLanguagePage({ params }: { params: Promise<{ job: string; language: string }> }) {
  const { job: jobSlug, language: langSlug } = await params;
  const page = getLanguagePageBySlug(langSlug);
  const job = getJob(jobSlug);
  const pair = page ? getJobLanguagePair(jobSlug, page.code) : undefined;
  if (!pair || !job || !page) notFound();
  const record = languageRecord(page)!;
  const tier = tiers.find((t) => t.name.toLowerCase() === job.recommendedTier) ?? firstVoiceTier;
  const otherLanguages = languagePairsForJob(job.slug).filter((p) => p.language !== page.code).map((p) => languagePages.find((l) => l.code === p.language)).filter((l): l is NonNullable<typeof l> => Boolean(l));
  const otherJobs = languagePairsForLanguage(page.code).filter((p) => p.job !== job.slug).map((p) => getJob(p.job)).filter((j): j is NonNullable<typeof j> => Boolean(j));
  const cities = cityPairsForJob(job.slug).map((p) => getCity(p.city)).filter((c): c is NonNullable<typeof c> => Boolean(c)).filter((c) => page.cities.includes(c.slug));
  const rate = voiceRateInr(tier);

  return (
    <>
      <section className="bg-canvas" aria-label={`${job.title} in ${record.name}`}>
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
                <li className="text-slate">{record.name}</li>
              </ol>
            </nav>
            <p className="t-eyebrow mt-6 text-sindoor">{job.eyebrow} · <span className="font-indic">{record.native}</span></p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">
              The {job.title.toLowerCase()} job, done by a bot that speaks {record.name}
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">{pair.intro}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl">
              <div className="rounded-card border border-line bg-snow p-6">
                <p className="t-eyebrow text-iron">The post offers a {record.name}-speaking person</p>
                <p className="mt-2 font-display text-[1.6rem] font-bold">{formatInr(job.humanSalary.low)}–{formatInr(job.humanSalary.high)}</p>
                <p className="t-caption mt-1 text-iron">a month, commonly advertised, and the {record.name} requirement is the line that thins the applicant pool</p>
              </div>
              <div className="rounded-card border border-sindoor bg-snow p-6">
                <p className="t-eyebrow text-sindoor">The bot runs on {tier.name}</p>
                <p className="mt-2 font-display text-[1.6rem] font-bold">{tierPrice(tier, 'inr')}</p>
                <p className="t-caption mt-1 text-iron">a month excl. GST, {tier.credits.toLocaleString('en-IN')} credits and {tier.phoneNumbers.toLowerCase()}{rate ? `; a ${record.name} minute is the same ${tier.voiceCreditsPerMinute} credits as any language` : ''}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel={`${record.name} on this job`}>
        <SectionHead eyebrow={`In ${record.name}`} title={`What ${record.name} changes about this job`} sub={page.hardPart.title} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pair.points.map((n) => (
            <div key={n.title} className="rounded-card border border-line bg-canvas p-6">
              <p className="font-display font-bold">{n.title}</p>
              <p className="mt-2 text-[0.9375rem] text-slate">{n.body}</p>
            </div>
          ))}
        </div>
        <p className="t-caption mt-6 text-iron">
          <Link href={languageHref(page.code) ?? '/voice-ai'} className="text-sindoor hover:underline">Why {record.name} is hard for a voice bot, on its own page</Link>
        </p>
      </Section>

      <Section surface="canvas" ariaLabel="The job, line by line">
        <SectionHead eyebrow="Line by line" title="What the post asks for, and what the bot does with each line" sub={`Every line below runs in ${record.name} when the caller opens in it.`} />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-[0.9375rem]">
            <thead><tr className="border-b border-line text-iron"><th className="py-3 pr-6 font-medium">The job post says</th><th className="py-3 font-medium">Decibyl does</th></tr></thead>
            <tbody>
              {job.tasks.map((task, i) => (
                <tr key={task} className="border-b border-line align-top"><td className="py-4 pr-6 font-display font-bold">{task}</td><td className="py-4 text-slate">{job.botDoes[i]}</td></tr>
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
        <SectionHead eyebrow="Also" title="The same job in other languages, other jobs in this one, and where it leads" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div>
            <p className="t-eyebrow text-iron">{job.title}, in other languages</p>
            <ul className="mt-3 space-y-2">
              {otherLanguages.map((l) => (
                <li key={l.code}><Link href={`/jobs/${job.slug}/language/${languageSlug(l)}`} className="text-sindoor hover:underline">{languageRecord(l)?.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-iron">Other jobs in {record.name}</p>
            <ul className="mt-3 space-y-2">
              {otherJobs.map((j) => (
                <li key={j.slug}><Link href={`/jobs/${j.slug}/language/${langSlug}`} className="text-sindoor hover:underline">{j.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-iron">Where {record.name} leads</p>
            <ul className="mt-3 space-y-2">
              {cities.map((c) => (
                <li key={c.slug}><Link href={`/jobs/${job.slug}/in/${c.slug}`} className="text-sindoor hover:underline">{job.title} in {c.name}</Link></li>
              ))}
              <li><Link href={`/jobs/${job.slug}`} className="text-sindoor hover:underline">The {job.title.toLowerCase()} job on its own</Link></li>
            </ul>
          </div>
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Questions">
        <SectionHead eyebrow="Questions" title={`${job.title} calls in ${record.name}`} />
        <div className="mt-8"><FaqList faqs={pair.faqs} /></div>
        <p className="t-caption mt-6 text-iron">Hear it first: call {site.demoPhone.display} and open in {record.name}.</p>
      </Section>

      <FinalCta title={`Send us the ${job.title.toLowerCase()} post that asks for ${record.name}.`} sub="We will tell you which lines a bot takes, which stay with a person, and what it costs beside the salary." />

      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Jobs', path: '/jobs' }, { name: job.title, path: `/jobs/${job.slug}` }, { name: record.name, path: `/jobs/${job.slug}/language/${langSlug}` }]),
        faqSchema(pair.faqs),
      ]} />
    </>
  );
}
