import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { HomeHero } from '@/components/marketing/HomeHero';
import { LiveTranscript } from '@/components/marketing/LiveTranscript';
import { LanguageChips } from '@/components/marketing/Languages';
import { PricingPreview } from '@/components/marketing/Blocks';
import { getVertical } from '@/data/verticals';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'AI Agents That Get Work Done',
  description:
    'Decibyl gives you AI agents that can talk, remember, use your apps and take action across calls, messages, documents and workflows.',
  path: '/',
  keywords: [
    'AI agents',
    'AI agents for work',
    'AI personal assistant',
    'AI automation agents',
    'AI voice agents',
    'AI calling agent',
    'AI workflow automation',
    'AI agents India',
    'AI business automation',
    'autonomous AI agents',
    'AI agent platform',
    'multilingual AI agent',
  ],
  ogTitle: 'AI that gets work done',
  ogSubtitle: 'Give Decibyl a job. It can talk, remember, use your apps and take action.',
});

const capabilities = [
  {
    label: 'TALK',
    title: 'Works through conversations',
    body: 'Call, answer, chat, email and message. Voice is a built-in skill, not a separate product.',
    className: 'bg-peach',
  },
  {
    label: 'REMEMBER',
    title: 'Builds useful context over time',
    body: 'Remember decisions, preferences, documents, people and what happened before — with controls over what is kept.',
    className: 'bg-lavender',
  },
  {
    label: 'ACT',
    title: 'Uses the tools you already use',
    body: 'Read connected apps, run tools and workflows, update systems and ask for approval when an action needs you.',
    className: 'bg-sage',
  },
  {
    label: 'KEEP WORKING',
    title: 'Runs when the work shows up',
    body: 'Start from a message, email, webhook, call or schedule. Agents can keep working even after you close the tab.',
    className: 'bg-sand',
  },
];

const jobs = [
  { title: 'Research Agent', body: 'Research a topic, track changes, summarize what matters and deliver it on schedule.' },
  { title: 'Personal Assistant', body: 'Keep track of tasks, documents, reminders, follow-ups and the context behind them.' },
  { title: 'Sales Agent', body: 'Research leads, qualify them, follow up, update your CRM and bring you in when needed.' },
  { title: 'Voice Receptionist', body: 'Answer calls, understand intent, book appointments, resolve questions and escalate.' },
  { title: 'Customer Support', body: 'Handle common requests across chat, email and voice with your company knowledge.' },
  { title: 'E-commerce Ops', body: 'Confirm COD orders, recover NDRs, follow up on failed payments and update systems.' },
  { title: 'Recruiting Agent', body: 'Screen profiles, coordinate candidates, prepare notes and keep the process moving.' },
  { title: 'Operations Agent', body: 'Run repetitive back-office work across documents, inboxes, APIs and internal tools.' },
];

const memoryItems = [
  ['Decisions', 'Why you chose a supplier, plan or approach — and what changed later.'],
  ['People', 'Who is involved, how they relate and the context that matters when they come up again.'],
  ['Preferences', 'How you like work done, the formats you use and the things an agent should stop asking twice.'],
  ['Documents', 'Important facts from files and dates worth remembering, with confirmation before they become trusted context.'],
];

export default function HomePage() {
  const ndr = getVertical('d2c-ndr-recovery')!;

  return (
    <>
      <HomeHero />

      <Section surface="canvas" ariaLabel="How Decibyl works">
        <SectionHead
          eyebrow="More than chat"
          title="Give it work, not just prompts."
          sub="Decibyl agents can understand the request, find context, use tools, take action and come back with the work moved forward."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {capabilities.map((item) => (
            <article key={item.title} className={`rounded-card p-7 sm:p-8 ${item.className}`}>
              <p className="t-eyebrow text-ink/55">{item.label}</p>
              <h3 className="t-h3 mt-3">{item.title}</h3>
              <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ink/72">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="white" ariaLabel="Memory">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="t-eyebrow text-sindoor">Memory that compounds</p>
            <h2 className="t-h2 mt-4 text-balance">It gets smarter the more you work together.</h2>
            <p className="t-body-lg mt-5 max-w-xl text-slate text-pretty">
              Decibyl does not have to treat every task like the first time you have met. It can retain
              useful context from conversations, calls, documents and completed work, then bring that
              context back when it is relevant.
            </p>
            <p className="mt-4 max-w-xl text-slate">
              Inferred information stays distinguishable from confirmed facts, and consequential actions
              can still come back to you for approval.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {memoryItems.map(([title, body]) => (
              <div key={title} className="rounded-card border border-ink/10 bg-canvas p-6">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black text-sindoor shadow-sm">✦</div>
                <h3 className="t-h3">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Agent jobs">
        <SectionHead
          eyebrow="Give each agent a job"
          title="Start with the work you want off your plate."
          sub="Use a ready agent or describe the job in your own words. You can keep one around or build a team of specialists."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job, index) => (
            <article key={job.title} className="group rounded-card border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:border-ink/20 hover:shadow-lg">
              <div className="mb-7 flex items-center justify-between">
                <span className="t-data text-slate">0{index + 1}</span>
                <span className="text-lg text-sindoor transition group-hover:translate-x-1">↗</span>
              </div>
              <h3 className="t-h3">{job.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{job.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="https://app.decibyl.ai" className="inline-flex min-h-11 items-center rounded-xl bg-ink px-5 text-sm font-bold text-white">
            Add your first agent →
          </Link>
          <Link href="/how-it-works" className="inline-flex min-h-11 items-center rounded-xl border border-ink/15 bg-white px-5 text-sm font-bold text-ink">
            Build your own
          </Link>
        </div>
      </Section>

      <Section surface="white" ariaLabel="Channels and voice">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="t-eyebrow text-sindoor">Works where work happens</p>
            <h2 className="t-h2 mt-4 text-balance">Chat is one interface. Decibyl can go further.</h2>
            <p className="t-body-lg mt-5 text-slate text-pretty">
              Agents can work across your connected apps and reach people through calls, WhatsApp,
              email, chat and scheduled routines. One job can move across several of them.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['Voice', 'WhatsApp', 'Email', 'Chat', 'Apps', 'APIs', 'Documents', 'Routines', 'Webhooks'].map((channel) => (
                <span key={channel} className="rounded-full border border-ink/10 bg-canvas px-3 py-2 text-xs font-bold text-ink/70">{channel}</span>
              ))}
            </div>
            <div className="mt-9">
              <p className="text-sm font-bold text-ink">40+ languages for voice</p>
              <div className="mt-4"><LanguageChips /></div>
            </div>
          </div>
          <LiveTranscript
            lines={ndr.sampleCall.lines}
            outcome={ndr.sampleCall.outcome}
            money="₹1,840 recovered"
            qaScore={ndr.sampleCall.qaScore}
            duration={ndr.sampleCall.duration}
            language={ndr.sampleCall.language}
          />
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Human control and agent collaboration">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-card bg-mistblue p-8 lg:col-span-2">
            <p className="t-eyebrow text-ink/55">MULTI-AGENT WORK</p>
            <h2 className="t-h2 mt-4 max-w-3xl text-balance">One agent can ask another when the job needs a specialist.</h2>
            <p className="t-body-lg mt-5 max-w-2xl text-slate">
              Put agents in the same workspace and let them hand off visible work instead of hiding an autonomous chain behind the scenes.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['Research → Sales', 'Support → Operations', 'Voice → CRM update'].map((flow) => (
                <div key={flow} className="rounded-2xl bg-white/80 p-4 text-sm font-bold text-ink shadow-sm">{flow}</div>
              ))}
            </div>
          </article>
          <article className="rounded-card bg-sage p-8">
            <p className="t-eyebrow text-ink/55">YOU STAY IN CONTROL</p>
            <h3 className="t-h3 mt-4">Reads can run. Writes can ask.</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              Let an agent fetch context freely while sensitive or consequential actions return as an approval before they happen.
            </p>
          </article>
        </div>
      </Section>

      <Section surface="white" ariaLabel="Pricing preview">
        <SectionHead
          eyebrow="Start small"
          title="Use Decibyl for yourself. Scale it to a team or business."
          sub="The same agent system can start with everyday work and grow into voice, operations and higher-volume automation."
        />
        <div className="mt-10">
          <PricingPreview />
        </div>
      </Section>

      <section className="bg-ink px-5 py-20 text-white sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="t-eyebrow text-white/55">DECIBYL</p>
            <h2 className="mt-4 font-[var(--font-bricolage)] text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              What do you want AI to get done?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              Give it a job. Add the context and tools it needs. Let your agents do the repetitive work and bring you in when judgment is required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="https://app.decibyl.ai" className="inline-flex min-h-12 items-center rounded-xl bg-white px-6 text-sm font-black text-ink">
                Get started free →
              </Link>
              <Link href="/book-a-demo" className="inline-flex min-h-12 items-center rounded-xl border border-white/20 px-6 text-sm font-bold text-white">
                Talk to us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
