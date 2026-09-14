import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { FaqList } from '@/components/marketing/Faq';
import { getJob } from '@/data/jobs';
import { getIntegrationPage, integrationStatusLabel } from '@/data/integrationPages';
import {
  assertPairsAreConsistent,
  cityPairsForJob,
  getJobIntegrationPair,
  integrationPairsForJob,
  integrationPairsForTool,
  jobIntegrationPairs,
} from '@/data/jobPairs';
import { getCity } from '@/data/cities';
import { formatInr, tiers, tierPrice } from '@/data/pricing';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';

/**
 * A job crossed with the tool its outcome lands in: `/jobs/[job]/for/[tool]`.
 *
 * Only pairs written in data/jobPairs.ts build. There is no fallback, so a
 * pair with no copy is a 404 at build time, never a doorway page in the index.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  assertPairsAreConsistent();
  return jobIntegrationPairs.map((p) => ({ job: p.job, tool: p.tool }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ job: string; tool: string }>;
}): Promise<Metadata> {
  const { job: jobSlug, tool: toolSlug } = await params;
  const pair = getJobIntegrationPair(jobSlug, toolSlug);
  const job = getJob(jobSlug);
  const tool = getIntegrationPage(toolSlug);
  if (!pair || !job || !tool) return {};
  const tier = tiers.find((t) => t.name.toLowerCase() === job.recommendedTier) ?? tiers[0];
  return pageMetadata({
    title: `${job.title} bot for ${tool.name}`,
    description: `${job.title} calls, done by a Decibyl voice bot, with every outcome written to ${tool.name}: ${pair.moves.map((m) => m.title.toLowerCase()).join(', ')}. Priced beside the salary, from ${tierPrice(tier, 'inr')}/month.`,
    path: `/jobs/${job.slug}/for/${tool.slug}`,
    keywords: [
      `${job.title.toLowerCase()} ${tool.name}`,
      `${tool.name} voice bot`,
      `AI ${job.title.toLowerCase()} ${tool.name} integration`,
      ...job.seo.keywords.slice(0, 2),
    ],
    ogTitle: `${job.title} → ${tool.name}`,
    ogSubtitle: `Done by a bot, from ${tierPrice(tier, 'inr')}/month`,
  });
}

export default async function JobForToolPage({
  params,
}: {
  params: Promise<{ job: string; tool: string }>;
}) {
  const { job: jobSlug, tool: toolSlug } = await params;
  const pair = getJobIntegrationPair(jobSlug, toolSlug);
  const job = getJob(jobSlug);
  const tool = getIntegrationPage(toolSlug);
  if (!pair || !job || !tool) notFound();

  const tier = tiers.find((t) => t.name.toLowerCase() === job.recommendedTier) ?? tiers[0];
  const status = integrationStatusLabel(tool);
  const otherTools = integrationPairsForJob(job.slug)
    .filter((p) => p.tool !== tool.slug)
    .map((p) => getIntegrationPage(p.tool))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const otherJobs = integrationPairsForTool(tool.slug)
    .filter((p) => p.job !== job.slug)
    .map((p) => getJob(p.job))
    .filter((j): j is NonNullable<typeof j> => Boolean(j));
  const cities = cityPairsForJob(job.slug)
    .map((p) => getCity(p.city))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <section className="bg-canvas" aria-label={`${job.title} for ${tool.name}`}>
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
                <li className="text-slate">{tool.name}</li>
              </ol>
            </nav>
            <p className="t-eyebrow mt-6 text-sindoor">
              {job.eyebrow} · {tool.eyebrow}
              {status ? ` · ${status}` : ''}
            </p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">
              The {job.title.toLowerCase()} job, done by a bot that writes to {tool.name}
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">{pair.intro}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl">
              <div className="rounded-card border border-line bg-snow p-6">
                <p className="t-eyebrow text-iron">The post offers a person</p>
                <p className="mt-2 font-display text-[1.6rem] font-bold">
                  {formatInr(job.humanSalary.low)}–{formatInr(job.humanSalary.high)}
                </p>
                <p className="t-caption mt-1 text-iron">a month, commonly advertised, and the {tool.name} update still done by hand</p>
              </div>
              <div className="rounded-card border border-sindoor bg-snow p-6">
                <p className="t-eyebrow text-sindoor">The bot runs on {tier.name}</p>
                <p className="mt-2 font-display text-[1.6rem] font-bold">{tierPrice(tier, 'inr')}</p>
                <p className="t-caption mt-1 text-iron">
                  a month excl. GST, {tier.phoneNumbers.toLowerCase()} and calling credit included; the {tool.name} connection is part of the plan
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel="What moves">
        <SectionHead
          eyebrow="What moves"
          title={`For this job, in ${tool.name}`}
          sub={`${tool.flows[0].body} This is what that means when the job is ${job.title.toLowerCase()} calls.`}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pair.moves.map((m) => (
            <div key={m.title} className="rounded-card border border-line bg-canvas p-6">
              <p className="font-display font-bold">{m.title}</p>
              <p className="mt-2 text-[0.9375rem] text-slate">{m.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="The job, line by line">
        <SectionHead
          eyebrow="Line by line"
          title="What the post asks for, and what the bot does with each line"
          sub={`The same job description, with ${tool.name} at the end of every line that produces an outcome.`}
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

      <Section surface="white" ariaLabel="Set it up">
        <SectionHead
          eyebrow="Set it up"
          title={`Connecting ${tool.name} takes three steps`}
          sub={`The full ${tool.name} page covers each step and what it looks like in the dashboard.`}
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {tool.steps.map((s, i) => (
            <li key={s.title} className="rounded-card border border-line bg-canvas p-6">
              <p className="t-eyebrow text-sindoor">Step {i + 1}</p>
              <p className="mt-2 font-display font-bold">{s.title}</p>
              <p className="mt-2 text-[0.9375rem] text-slate">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="t-caption mt-6 text-iron">
          <Link href={`/integrations/${tool.slug}`} className="text-sindoor hover:underline">Everything about the {tool.name} connection</Link>
          {' · '}
          <Link href={`/jobs/${job.slug}`} className="text-sindoor hover:underline">The {job.title.toLowerCase()} job on its own</Link>
        </p>
      </Section>

      <Section surface="canvas" ariaLabel="Related pages">
        <SectionHead
          eyebrow="Also"
          title="The same job in other tools, and the same tool for other jobs"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div>
            <p className="t-eyebrow text-iron">{job.title}, written to</p>
            <ul className="mt-3 space-y-2">
              {otherTools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/jobs/${job.slug}/for/${t.slug}`} className="text-sindoor hover:underline">{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-iron">{tool.name}, for other jobs</p>
            <ul className="mt-3 space-y-2">
              {otherJobs.map((j) => (
                <li key={j.slug}>
                  <Link href={`/jobs/${j.slug}/for/${tool.slug}`} className="text-sindoor hover:underline">{j.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-iron">{job.title}, by city</p>
            <ul className="mt-3 space-y-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/jobs/${job.slug}/in/${c.slug}`} className="text-sindoor hover:underline">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section surface="white" ariaLabel="Questions">
        <SectionHead eyebrow="Questions" title={`${job.title} calls and ${tool.name}`} />
        <div className="mt-8"><FaqList faqs={pair.faqs} /></div>
        <p className="t-caption mt-6 text-iron">
          Hear it first: call {site.demoPhone.display}. The agent picks up and you choose the language.
        </p>
      </Section>

      <FinalCta
        title={`Send us the ${job.title.toLowerCase()} post and your ${tool.name} setup.`}
        sub="We will tell you which lines a bot takes, what lands in your tool, and what it costs beside the salary."
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jobs', path: '/jobs' },
            { name: job.title, path: `/jobs/${job.slug}` },
            { name: tool.name, path: `/jobs/${job.slug}/for/${tool.slug}` },
          ]),
          faqSchema(pair.faqs),
        ]}
      />
    </>
  );
}
