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
  title: 'AI That Gets Work Done | Decibyl',
  description:
    'Decibyl gives you persistent AI agents with memory, voice, WhatsApp, email, apps, documents, routines, workflows, approvals and multi-agent collaboration.',
  path: '/',
  keywords: [
    'AI agents',
    'AI agents for work',
    'AI personal assistant',
    'AI automation agents',
    'AI voice agents',
    'AI calling agent',
    'AI workflow automation',
    'AI agent memory',
    'AI agents WhatsApp',
    'AI business automation',
    'AI agent platform',
    'multilingual AI agent',
  ],
  ogTitle: 'AI that gets work done',
  ogSubtitle: 'Agents that talk, remember, use your apps, run routines and take action.',
});

const capabilityGroups = [
  {
    eyebrow: 'COMMUNICATE',
    title: 'Talk wherever the work happens.',
    body: 'One agent can move between the channels people actually use instead of living in one chat box.',
    surface: 'bg-peach',
    items: ['Voice calls', 'WhatsApp', 'Email', 'Web chat', 'Website widget', 'Inbound & outbound'],
  },
  {
    eyebrow: 'UNDERSTAND',
    title: 'Give agents the context they need.',
    body: 'Connect documents and knowledge so an agent can answer from your information, not only from a model.',
    surface: 'bg-mistblue',
    items: ['Knowledge base', 'Documents', 'Google Drive', 'OCR & extraction', 'Structured fields', 'Multilingual knowledge'],
  },
  {
    eyebrow: 'ACT',
    title: 'Use apps instead of stopping at answers.',
    body: 'Agents can read connected tools, execute workflows, call APIs and move work into the systems where it belongs.',
    surface: 'bg-sage',
    items: ['Connected apps', 'CRM actions', 'API tools', 'Workflow actions', 'Tool calls', 'Human approvals'],
  },
  {
    eyebrow: 'KEEP WORKING',
    title: 'Run without waiting for another prompt.',
    body: 'Turn repeatable responsibilities into work that starts on a schedule or when something happens.',
    surface: 'bg-sand',
    items: ['Routines', 'Schedules', 'Webhooks', 'Email triggers', 'Event triggers', 'Campaigns'],
  },
];

const memoryFeatures = [
  ['Conversation memory', 'Bring back useful context from previous chats, calls and work instead of starting from zero.'],
  ['Decision journal', 'Remember what was decided, what was chosen, why, who was involved and when.'],
  ['Confirmed vs inferred', 'Keep model-inferred context separate from facts a person has explicitly confirmed.'],
  ['Teach it back', 'Correct memory in plain language and let the newer fact supersede the old one.'],
  ['People & connections', 'Surface recurring relationships and relevant context across people, accounts and events.'],
  ['Spaced recall', 'Bring information back when a related task or event makes it useful, not as constant noise.'],
  ['Document memory', 'Extract important dates and fields from documents, ask for confirmation and remember the result.'],
  ['Memory controls', 'Choose whether proactive memory messages are enabled and keep the human in control.'],
];

const agentWork = [
  { title: 'Research', body: 'Track topics, companies, competitors or markets and bring back what changed.' },
  { title: 'Personal assistant', body: 'Handle reminders, files, follow-ups and everyday administrative work.' },
  { title: 'Sales', body: 'Research leads, qualify them, follow up and keep CRM context updated.' },
  { title: 'Voice receptionist', body: 'Answer calls, understand intent, book, verify, resolve and escalate.' },
  { title: 'Customer support', body: 'Work across knowledge, chat, email and voice to resolve repetitive requests.' },
  { title: 'E-commerce ops', body: 'Confirm COD, recover NDRs, follow up on orders and move updates into your systems.' },
  { title: 'Recruiting', body: 'Screen candidates, coordinate next steps and keep interview context together.' },
  { title: 'Operations', body: 'Handle repetitive back-office work across inboxes, documents, apps and APIs.' },
  { title: 'Finance follow-up', body: 'Track invoices, send reminders and coordinate routine payment follow-ups.' },
  { title: 'Content', body: 'Research, draft, repurpose and prepare content with the context of previous work.' },
  { title: 'Account management', body: 'Keep customer context, follow up on commitments and flag stalled work.' },
  { title: 'Custom job', body: 'Describe the responsibility in your own words and build an agent around it.' },
];

const builderFeatures = [
  ['Start from a ready agent', 'Use a marketplace template for a known job and change only what matters.'],
  ['Build from a brief', 'Describe the work in chat or attach a document and let Decibyl turn it into an agent.'],
  ['Agent skills', 'Give each agent the tools, knowledge, channels and abilities required for its job.'],
  ['Self-edit with approval', 'Tell an agent how its behavior should change; review the proposed change before it becomes live.'],
  ['Teams of agents', 'Put specialists in the same workspace or group chat so they can hand work to one another.'],
  ['Human + agent task board', 'Bots and people can share visible tasks, ownership and results instead of hiding work in black-box chains.'],
];

const voiceFeatures = [
  'Inbound calling',
  'Outbound calling',
  '40+ languages',
  'Code-mixed speech',
  'Call transfer',
  'DTMF / keypad input',
  'Campaigns',
  'Call recordings & transcripts',
  'Structured outcomes',
  'Multiple telephony providers',
  'Managed providers or BYOK',
  'Knowledge during calls',
];

const controlFeatures = [
  ['Approval before writes', 'Read-only work can happen immediately; consequential changes can come back as a confirmation card.'],
  ['Visible work history', 'Calls, messages, tool actions and agent activity can be traced instead of disappearing behind the agent.'],
  ['Prompt-injection protections', 'Information read from documents, webpages, tool results and messages is treated as data rather than authority.'],
  ['Privacy-aware channels', 'Sensitive documents can be restricted to verified destinations and masked where appropriate.'],
  ['Workspace controls', 'Keep personal, team and organisation context separated while giving agents only the access their role needs.'],
  ['Usage & billing visibility', 'Track the work agents perform and how credits are consumed across calls, tools, knowledge and messages.'],
];

export default function HomePage() {
  const ndr = getVertical('d2c-ndr-recovery')!;

  return (
    <>
      <HomeHero />

      <Section surface="white" ariaLabel="Decibyl capabilities">
        <SectionHead
          eyebrow="One agent system"
          title="Not another chatbot. Not only voice."
          sub="Decibyl combines communication, memory, knowledge, tools and automation so an agent can carry a job further instead of handing the unfinished work back to you."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {capabilityGroups.map((group) => (
            <article key={group.title} className={`rounded-card p-7 sm:p-8 ${group.surface}`}>
              <p className="t-eyebrow text-ink/55">{group.eyebrow}</p>
              <h3 className="t-h3 mt-3">{group.title}</h3>
              <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ink/72">{group.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-ink/10 bg-white/70 px-3 py-2 text-xs font-bold text-ink/70">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Memory">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="t-eyebrow text-sindoor">Memory that compounds</p>
            <h2 className="t-h2 mt-4 text-balance">It gets smarter the more you work together.</h2>
            <p className="t-body-lg mt-5 max-w-xl text-slate text-pretty">
              Most assistants remember a transcript. Decibyl is being built to remember the useful parts of work: decisions, people, preferences, documents, corrections and what matters next.
            </p>
            <p className="mt-4 max-w-xl text-slate">
              Memory is not automatically treated as truth. Inferred information remains distinguishable from confirmed facts, and you can teach Decibyl when something changed.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {memoryFeatures.map(([title, body]) => (
              <article key={title} className="rounded-card border border-ink/10 bg-white p-6">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-lilac text-sm font-black text-ink shadow-sm">✦</div>
                <h3 className="t-h3">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section surface="white" ariaLabel="Connected apps and actions">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="t-eyebrow text-sindoor">Works inside your stack</p>
            <h2 className="t-h2 mt-4 text-balance">Ask for the outcome. Let the agent use the tools.</h2>
            <p className="t-body-lg mt-5 max-w-2xl text-slate text-pretty">
              Decibyl can read from connected apps, chain multiple reads when it needs context, use APIs and workflows, and turn a write into an approval when human judgment should stay in the loop.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['CRM', 'Calendar', 'Email', 'Drive', 'WhatsApp', 'HTTP APIs', 'Webhooks', 'Internal tools', 'Documents', 'Workflows'].map((item) => (
                <span key={item} className="rounded-full border border-ink/10 bg-canvas px-3 py-2 text-xs font-bold text-ink/70">{item}</span>
              ))}
            </div>
          </div>
          <div className="rounded-card border border-ink/10 bg-ink p-6 text-white sm:p-8">
            <p className="text-xs font-black tracking-[0.15em] text-white/45">ONE REQUEST</p>
            <p className="mt-3 text-xl font-bold">“Find the latest conversation with Acme, check their CRM status and prepare the follow-up.”</p>
            <div className="mt-7 space-y-3">
              {[
                ['1', 'Search connected CRM', 'Read runs immediately'],
                ['2', 'Recall account memory', 'Annual plan · Dana approves'],
                ['3', 'Read latest email thread', 'Context added'],
                ['4', 'Prepare follow-up', 'Draft ready'],
                ['5', 'Send email', 'Approval requested'],
              ].map(([n, title, status]) => (
                <div key={n} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-ink">{n}</span>
                  <div className="min-w-0 flex-1"><strong className="block text-sm">{title}</strong><span className="text-xs text-white/50">{status}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Routines and triggers">
        <SectionHead
          eyebrow="Always-on work"
          title="The work can start without you."
          sub="Give an agent a standing responsibility and decide what starts it: time, an incoming message, an email, a webhook, a call or another event."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Schedules', 'Daily briefings, weekly reports, recurring research and timed follow-ups.'],
            ['Email triggers', 'Forward an email to an agent and let that message become the work request.'],
            ['Webhooks', 'Start an agent from Shopify, your CRM, your product or any system that can send an event.'],
            ['Calls', 'Inbound and outbound voice work can launch workflows, gather fields and take the next action.'],
            ['Campaigns', 'Run the same voice job over a contact list with calling windows, outcomes and controls.'],
            ['Reminders & events', 'Documents, dates and task events can bring work back when it becomes relevant.'],
          ].map(([title, body]) => (
            <article key={title} className="rounded-card border border-ink/10 bg-white p-6">
              <h3 className="t-h3">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="white" ariaLabel="Voice agents">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="t-eyebrow text-sindoor">Voice is a first-class skill</p>
            <h2 className="t-h2 mt-4 text-balance">Agents that can actually pick up the phone.</h2>
            <p className="t-body-lg mt-5 text-slate text-pretty">
              Voice is not a separate product inside Decibyl. The same agent can answer or place a call, use knowledge, collect information, invoke tools, transfer when needed and keep the result for the next step.
            </p>
            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {voiceFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-canvas px-3 py-2.5 text-sm font-bold text-ink/75">
                  <span className="text-sindoor">✓</span>{feature}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-sm font-bold text-ink">Languages your customers actually speak</p>
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

      <Section surface="canvas" ariaLabel="Documents and knowledge">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-card bg-mistblue p-8 lg:col-span-2">
            <p className="t-eyebrow text-ink/55">DOCUMENTS BECOME USEFUL CONTEXT</p>
            <h2 className="t-h2 mt-4 max-w-3xl text-balance">Send a file. Ask about it. Let the important parts become work.</h2>
            <p className="t-body-lg mt-5 max-w-3xl text-slate">
              Decibyl can ingest documents, OCR and extract fields, connect files to agent knowledge, find documents later and use dates such as expiries to create reminders.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {['OCR & extraction', 'Knowledge search', 'Drive files', 'Document reminders'].map((item) => (
                <div key={item} className="rounded-2xl bg-white/80 p-4 text-sm font-bold text-ink shadow-sm">{item}</div>
              ))}
            </div>
          </article>
          <article className="rounded-card bg-sage p-8">
            <p className="t-eyebrow text-ink/55">VERIFY BEFORE BELIEVING</p>
            <h3 className="t-h3 mt-4">Important extracted facts can ask you first.</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              For important fields, Decibyl can show what it read and ask for confirmation before storing it as trusted context.
            </p>
          </article>
        </div>
      </Section>

      <Section surface="white" ariaLabel="Build agents">
        <SectionHead
          eyebrow="Easy first, powerful when you need it"
          title="You should not need to understand agent infrastructure to use an agent."
          sub="Start from a ready job, describe what you need, or go deeper into skills, knowledge, tools and workflows when the use case demands it."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {builderFeatures.map(([title, body]) => (
            <article key={title} className="rounded-card border border-ink/10 bg-canvas p-6">
              <h3 className="t-h3">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Multi-agent collaboration">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-card bg-lilac p-8 lg:col-span-2">
            <p className="t-eyebrow text-ink/55">MULTI-AGENT WORK</p>
            <h2 className="t-h2 mt-4 max-w-3xl text-balance">One agent does not need to pretend it is good at every job.</h2>
            <p className="t-body-lg mt-5 max-w-3xl text-slate">
              Add specialists, put them in the same conversation and let visible hand-offs happen when a task needs a different role. Each agent can keep the context that belongs to its job.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['Research → Sales', 'Support → Operations', 'Coordinator → Specialist'].map((flow) => (
                <div key={flow} className="rounded-2xl bg-white/80 p-4 text-sm font-bold text-ink shadow-sm">{flow}</div>
              ))}
            </div>
          </article>
          <article className="rounded-card bg-sand p-8">
            <p className="t-eyebrow text-ink/55">PEOPLE STAY IN THE LOOP</p>
            <h3 className="t-h3 mt-4">Shared tasks, visible ownership.</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              Agents can file tasks for people, people can return the result, and the requesting agent can pick the work back up.
            </p>
          </article>
        </div>
      </Section>

      <Section surface="white" ariaLabel="Jobs for agents">
        <SectionHead
          eyebrow="Give each agent a job"
          title="Start with the work you want off your plate."
          sub="The marketplace is organized around jobs, not model names. Pick something useful and adapt it to how you work."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agentWork.map((job, index) => (
            <article key={job.title} className="group rounded-card border border-ink/10 bg-canvas p-6 transition hover:-translate-y-1 hover:border-ink/20 hover:shadow-lg">
              <div className="mb-7 flex items-center justify-between">
                <span className="t-data text-slate">{String(index + 1).padStart(2, '0')}</span>
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

      <Section surface="canvas" ariaLabel="Safety and control">
        <SectionHead
          eyebrow="Control without micromanaging"
          title="Give agents freedom where it is safe — and a checkpoint where it is not."
          sub="Decibyl is designed around traceable work, explicit approvals and separate trusted facts rather than pretending autonomy means removing the human."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {controlFeatures.map(([title, body]) => (
            <article key={title} className="rounded-card border border-ink/10 bg-white p-6">
              <h3 className="t-h3">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="white" ariaLabel="Developers and advanced teams">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="t-eyebrow text-sindoor">When you need the deeper layer</p>
            <h2 className="t-h2 mt-4 text-balance">Simple for a first agent. Extensible for serious automation.</h2>
            <p className="t-body-lg mt-5 max-w-2xl text-slate">
              Teams can go beyond the guided experience with APIs, webhooks, custom tools, provider configuration, knowledge, campaigns, analytics and workflow controls.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['REST API', 'SDKs', 'Webhooks', 'Custom tools', 'BYOK', 'Telephony providers', 'Analytics', 'Workflow builder', 'Knowledge APIs'].map((item) => (
                <span key={item} className="rounded-full border border-ink/10 bg-canvas px-3 py-2 text-xs font-bold text-ink/70">{item}</span>
              ))}
            </div>
          </div>
          <div className="rounded-card bg-ink p-8 text-white">
            <p className="text-xs font-black tracking-[0.15em] text-white/45">THE SAME PRODUCT, MORE CONTROL</p>
            <div className="mt-6 space-y-4 text-sm">
              {[
                'Use managed AI providers or bring selected provider keys.',
                'Connect telephony and run inbound or outbound calling.',
                'Trigger work from your own backend or external events.',
                'Inspect agent runs, transcripts, outcomes and usage.',
                'Build multi-step flows for jobs that need deterministic structure.',
              ].map((item) => (
                <div key={item} className="flex gap-3"><span className="text-white/40">→</span><span className="text-white/75">{item}</span></div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Pricing preview">
        <SectionHead
          eyebrow="Start small"
          title="Use Decibyl for yourself. Scale it to a team or business."
          sub="Personal agents, team workflows and business voice automation all sit on the same underlying agent system."
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
              Give an agent a job. Add the context, tools and channels it needs. Let it keep working — and get smarter as it works with you.
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
