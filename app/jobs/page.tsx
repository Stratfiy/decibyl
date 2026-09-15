import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { jobs } from '@/data/jobs';
import { formatInr, tiers } from '@/data/pricing';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Jobs a Decibyl Bot Does, Priced Against the Salary',
  description:
    'Eight phone jobs Indian businesses post every month, each done by a voice bot: what the post asks, what the bot does and does not, and the price beside the salary.',
  path: '/jobs',
  keywords: ['AI bot for telecaller job', 'replace receptionist with AI', 'voice bot jobs India', 'hire AI employee India'],
});

const tierBySlug = Object.fromEntries(tiers.map((t) => [t.name.toLowerCase(), t]));

export default function JobsIndexPage() {
  return (
    <>
      <section className="bg-canvas" aria-label="Jobs a bot does">
        <Container>
          <div className="pt-14 pb-12 sm:pt-20">
            <p className="t-eyebrow text-sindoor">The job you were about to post</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">
              Eight phone jobs, done by a bot, priced beside the salary
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Every page below starts from a real job description: what the post asks for, what a bot does
              with it, what it does not, and the monthly price next to what the post offers a person. Pick
              the job, hear the agent, and decide with both numbers in front of you.
            </p>
            <p className="t-caption mt-4 text-iron">These eight have full pages. <Link href="/shelf" className="text-sindoor hover:underline">The shelf lists every role by industry</Link>, live and planned.</p>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel="All jobs">
        <SectionHead
          eyebrow="Pick a job"
          title="What is on the post, and what the bot does with it"
          sub="Inbound jobs answer the phone that is already ringing. Outbound jobs make the calls a person never gets to."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {jobs.map((job) => {
            const tier = tierBySlug[job.recommendedTier];
            return (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="group rounded-card border border-line bg-canvas p-7 transition-colors hover:border-vermilion"
              >
                <p className="t-eyebrow text-sindoor">{job.eyebrow}</p>
                <p className="mt-3 font-display text-[1.15rem] font-bold">{job.title}</p>
                <p className="mt-3 text-[0.9375rem] text-slate">{job.tasks[0]}. {job.tasks[1]}.</p>
                <p className="t-data mt-4 text-iron">
                  Post offers {formatInr(job.humanSalary.low)}–{formatInr(job.humanSalary.high)} a month ·
                  bot from {tier?.priceInr ? formatInr(tier.priceInr) : 'custom'}
                </p>
                <span className="t-data mt-3 inline-block text-sindoor group-hover:underline">
                  See the job
                </span>
              </Link>
            );
          })}
        </div>
        <p className="t-caption mt-8 max-w-2xl text-iron">
          Salary ranges are what job posts for each role commonly advertise in Indian metros, read from
          live listings and re-checked before each update to this page. Bot prices are the plan each job
          usually runs on, exclusive of GST; the pricing page has the full ladder.
        </p>
      </Section>

      <FinalCta
        title="Your job post is the brief."
        sub="Send it to us and we will tell you which plan runs it and what changes."
      />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Jobs', path: '/jobs' }])} />
    </>
  );
}
