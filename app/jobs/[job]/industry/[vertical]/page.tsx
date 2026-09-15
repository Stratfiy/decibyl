import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { FaqList } from '@/components/marketing/Faq';
import { getJob } from '@/data/jobs';
import { findAnyVertical, verticalHref } from '@/data/verticals';
import { assertVerticalPairsAreConsistent, getJobVerticalPair, jobVerticalPairs, verticalPairsForJob, verticalPairsForVertical } from '@/data/jobVerticalPairs';
import { integrationPairsForJob } from '@/data/jobPairs';
import { getIntegrationPage } from '@/data/integrationPages';
import { firstVoiceTier, formatInr, tiers, tierPrice } from '@/data/pricing';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

/** A job crossed with an industry: `/jobs/[job]/industry/[vertical]`. Only written pairs build. */

export const dynamicParams = false;

export function generateStaticParams() {
  assertVerticalPairsAreConsistent();
  return jobVerticalPairs.map((p) => ({ job: p.job, vertical: p.vertical }));
}

export async function generateMetadata({ params }: { params: Promise<{ job: string; vertical: string }> }): Promise<Metadata> {
  const { job: jobSlug, vertical: vSlug } = await params;
  const pair = getJobVerticalPair(jobSlug, vSlug);
  const job = getJob(jobSlug);
  const vertical = findAnyVertical(vSlug);
  if (!pair || !job || !vertical) return {};
  const tier = tiers.find((t) => t.name.toLowerCase() === job.recommendedTier) ?? firstVoiceTier;
  return pageMetadata({
    title: `${job.title} for ${vertical.name}`,
    description: `The ${job.title.toLowerCase()} job in ${vertical.name.toLowerCase()}, done by a bot: what the job means there, what the bot does and does not, and the price beside the salary, from ${tierPrice(tier, 'inr')}/month.`,
    path: `/jobs/${job.slug}/industry/${vertical.slug}`,
    keywords: [`${job.title.toLowerCase()} ${vertical.name.toLowerCase()}`, `AI ${job.title.toLowerCase()} for ${vertical.name.toLowerCase()}`, ...job.seo.keywords.slice(0, 2)],
    ogTitle: `${job.title} for ${vertical.name}`,
    ogSubtitle: `Done by a bot, from ${tierPrice(tier, 'inr')}/month`,
  });
}

export default async function JobForIndustryPage({ params }: { params: Promise<{ job: string; vertical: string }> }) {
  const { job: jobSlug, vertical: vSlug } = await params;
  const pair = getJobVerticalPair(jobSlug, vSlug);
  const job = getJob(jobSlug);
  const vertical = findAnyVertical(vSlug);
  if (!pair || !job || !vertical) notFound();
  const tier = tiers.find((t) => t.name.toLowerCase() === job.recommendedTier) ?? firstVoiceTier;
  const monthly = tier.priceInr;
  const ratio = monthly > 0 ? Math.round((job.humanSalary.low / monthly) * 10) / 10 : null;
  const otherVerticals = verticalPairsForJob(job.slug).filter((p) => p.vertical !== vertical.slug).map((p) => findAnyVertical(p.vertical)).filter((v): v is NonNullable<typeof v> => Boolean(v));
  const otherJobs = verticalPairsForVertical(vertical.slug).filter((p) => p.job !== job.slug).map((p) => getJob(p.job)).filter((j): j is NonNullable<typeof j> => Boolean(j));
  const tools = integrationPairsForJob(job.slug).map((p) => getIntegrationPage(p.tool)).filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <section className="bg-canvas" aria-label={`${job.title} for ${vertical.name}`}>
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
                <li className="text-slate">{vertical.name}</li>
              </ol>
            </nav>
            <p className="t-eyebrow mt-6 text-sindoor">{job.eyebrow} · {vertical.name}</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">The {job.title.toLowerCase()} job in {vertical.name.toLowerCase()}, done by a bot</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">{pair.intro}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl">
              <div className="rounded-card border border-line bg-snow p-6">
                <p className="t-eyebrow text-iron">The post offers a person</p>
                <p className="mt-2 font-display text-[1.6rem] font-bold">{formatInr(job.humanSalary.low)}–{formatInr(job.humanSalary.high)}</p>
                <p className="t-caption mt-1 text-iron">a month, commonly advertised in {vertical.name.toLowerCase()}, before leave, training and attrition</p>
              </div>
              <div className="rounded-card border border-sindoor bg-snow p-6">
                <p className="t-eyebrow text-sindoor">The bot runs on {tier.name}</p>
                <p className="mt-2 font-display text-[1.6rem] font-bold">{tierPrice(tier, 'inr')}</p>
                <p className="t-caption mt-1 text-iron">a month excl. GST, {tier.phoneNumbers.toLowerCase()} and {tier.credits.toLocaleString('en-IN')} credits{ratio ? `; about ${ratio}× less than the lower salary` : ''}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel={`In ${vertical.name}`}>
        <SectionHead eyebrow={`In ${vertical.name.toLowerCase()}`} title={`What this job means in ${vertical.name.toLowerCase()}`} sub="The three things about this industry that change how the bot is set up." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pair.notes.map((n) => (
            <div key={n.title} className="rounded-card border border-line bg-canvas p-6">
              <p className="font-display font-bold">{n.title}</p>
              <p className="mt-2 text-[0.9375rem] text-slate">{n.body}</p>
            </div>
          ))}
        </div>
        <p className="t-caption mt-6 text-iron">
          <Link href={verticalHref(vertical)} className="text-sindoor hover:underline">Everything about calls in {vertical.name.toLowerCase()}, with a sample call</Link>
        </p>
      </Section>

      <Section surface="canvas" ariaLabel="The job, line by line">
        <SectionHead eyebrow="Line by line" title="What the post asks for, and what the bot does with each line" sub={`Read the left column as the ${vertical.name.toLowerCase()} job description you would have written.`} />
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
        <SectionHead eyebrow="Also" title="The same job in other industries, other jobs in this one, and where the outcome goes" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div>
            <p className="t-eyebrow text-iron">{job.title}, in other industries</p>
            <ul className="mt-3 space-y-2">
              {otherVerticals.map((v) => (<li key={v.slug}><Link href={`/jobs/${job.slug}/industry/${v.slug}`} className="text-sindoor hover:underline">{v.name}</Link></li>))}
              <li><Link href={`/jobs/${job.slug}`} className="text-sindoor hover:underline">The {job.title.toLowerCase()} job on its own</Link></li>
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-iron">Other jobs in {vertical.name.toLowerCase()}</p>
            <ul className="mt-3 space-y-2">
              {otherJobs.map((j) => (<li key={j.slug}><Link href={`/jobs/${j.slug}/industry/${vertical.slug}`} className="text-sindoor hover:underline">{j.title}</Link></li>))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-iron">Where the outcome goes</p>
            <ul className="mt-3 space-y-2">
              {tools.map((t) => (<li key={t.slug}><Link href={`/jobs/${job.slug}/for/${t.slug}`} className="text-sindoor hover:underline">{t.name}</Link></li>))}
            </ul>
          </div>
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Questions">
        <SectionHead eyebrow="Questions" title={`${job.title} calls in ${vertical.name.toLowerCase()}`} />
        <div className="mt-8"><FaqList faqs={pair.faqs} /></div>
        <p className="t-caption mt-6 text-iron">Hear it first: call {site.demoPhone.display}. The agent picks up and you choose the language.</p>
      </Section>

      <FinalCta title={`Send us the ${job.title.toLowerCase()} post from your ${vertical.name.toLowerCase()} business.`} sub="We will tell you which lines a bot takes, which stay with a person, and what it costs beside the salary." />

      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Jobs', path: '/jobs' }, { name: job.title, path: `/jobs/${job.slug}` }, { name: vertical.name, path: `/jobs/${job.slug}/industry/${vertical.slug}` }]),
        faqSchema(pair.faqs),
      ]} />
    </>
  );
}
