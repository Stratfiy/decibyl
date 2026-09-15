import type { Metadata } from 'next';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'How Decibyl Works — From Job to Bot to Outcome',
  description: 'Tell Decibyl the job, add or build a bot, connect the knowledge and tools it needs, run it on demand or automatically, and review the result.',
  path: '/how-it-works',
  keywords: ['how AI agents work', 'AI bot workflow', 'AI task automation', 'AI agent platform'],
  ogTitle: 'Tell Decibyl the job. Give it an owner. See the result.',
});

const steps = [
  {
    n: '01',
    title: 'Tell Decibyl what needs doing.',
    body: 'Start with the responsibility in normal language. On Home, Decibyl can use workspace context, answer questions about the team and prepare bot changes or actions for review.',
  },
  {
    n: '02',
    title: 'Find a bot or build your own.',
    body: 'Add one of the live marketplace job packs, or describe a new bot from a brief. Give it only the channels, knowledge and tools that job needs.',
  },
  {
    n: '03',
    title: 'Test it before it works unattended.',
    body: 'Test the bot in-app. Routines require a successful test before they can be armed, so scheduled access is earned by a working configuration rather than assumed.',
  },
  {
    n: '04',
    title: 'Run now, on a channel, on a schedule or on an event.',
    body: 'Bots can work from tasks and messages, answer or place calls from Business onward, run routines, or start from matching email and webhook triggers.',
  },
  {
    n: '05',
    title: 'Bring people in at the right moment.',
    body: 'Supported reads can move quickly. Consequential writes can wait for confirmation. Tasks and call transfers keep a human close when judgment is needed.',
  },
  {
    n: '06',
    title: 'See the result and improve the bot.',
    body: 'Review tasks, runs, calls, outcomes and failures. Confirm useful memory, correct what changed and compare whether a newer bot version actually improved the result.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-canvas" aria-label="How Decibyl works">
        <Container>
          <div className="pt-16 pb-14 sm:pt-24 sm:pb-20">
            <p className="t-eyebrow text-iron">How it works</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">From “this keeps taking my time” to a bot that owns the job.</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">Decibyl is the manager. Bots own specific jobs. Apps, knowledge, channels and schedules are the tools around them—not separate products you have to stitch together first.</p>
          </div>
        </Container>
      </section>

      <Section surface="white" className="pt-0" ariaLabel="Six steps">
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="rounded-card border border-line bg-snow p-7">
              <span className="t-data text-iron">{step.n}</span>
              <h2 className="t-h3 mt-5">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="canvas" ariaLabel="Where work can happen">
        <SectionHead eyebrow="Where the job runs" title="The bot stays the same. The channel can change." sub="Use the path the job needs instead of rebuilding a new assistant for every surface." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Messages', 'Web chat, WhatsApp, email and Slack paths can put the bot where conversations already arrive.'],
            ['Tasks', 'Assign work to a bot or teammate and keep the owner and result visible on the shared board.'],
            ['Routines + triggers', 'Run tested work on a schedule or from matching email/webhook events.'],
            ['Voice', 'From Business onward, use the same bot for inbound/outbound calls, DTMF, transfers and campaigns.'],
          ].map(([title, body]) => <article key={title} className="rounded-card border border-line bg-white p-6"><h2 className="text-base font-semibold">{title}</h2><p className="mt-3 text-sm leading-relaxed text-slate">{body}</p></article>)}
        </div>
      </Section>

      <Section surface="white" ariaLabel="Memory and control">
        <SectionHead eyebrow="Gets smarter as it works" title="Context can compound without turning inference into fact." sub="Confirmed workspace facts can be reused. Learned facts stay reviewable until you confirm them, and you can correct, export or erase memory." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ['Remember', 'Confirmed people, decisions, reasons, promises, dates and document facts can be recalled later.'],
            ['Control', 'Choose bot access, confirm consequential writes and keep sensitive actions visible.'],
            ['Inspect', 'Runs, tasks, calls, failures and outcomes leave evidence so improvement is based on results.'],
          ].map(([title, body]) => <article key={title} className="rounded-card border border-line bg-snow p-7"><h2 className="t-h3">{title}</h2><p className="mt-3 text-slate">{body}</p></article>)}
        </div>
      </Section>

      <FinalCta title="What job would you give a bot first?" sub="Start free, add one useful bot and keep the configuration as simple as the job allows." secondary={{ label: 'Find a bot', href: '/use-cases' }} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'How it works', path: '/how-it-works' }])} />
    </>
  );
}
