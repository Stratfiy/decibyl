import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { developerFeesCheckedNote, developerPlatformFees } from '@/data/pricing';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Developers — Build and Extend Decibyl AI Agents',
  description:
    'Build Decibyl agents with APIs, MCP, webhooks, custom tools, workflows, BYOK and telephony. Start simple and take control of the stack when you need it.',
  path: '/developers',
  keywords: ['AI agent API', 'MCP AI agents', 'agent webhooks', 'custom AI agent tools', 'voice agent API'],
  ogTitle: 'Build agents your way.',
});

const capabilities = [
  ['REST API', 'Create, configure and run agent capabilities from your own product or backend.'],
  ['MCP', 'Work with Decibyl from compatible AI coding and agent environments.'],
  ['Webhooks', 'Start work from events and send outcomes back to the systems that need them.'],
  ['Custom tools', 'Expose your own business actions to an agent with the permissions you choose.'],
  ['BYOK', 'Use your own provider credentials where supported instead of being locked to one stack.'],
  ['Voice + telephony', 'Add calling when the job needs a conversation, without making voice the whole architecture.'],
];

export default function DevelopersPage() {
  const sorted = [...developerPlatformFees].sort((a, b) => a.feeUsd - b.feeUsd);

  return (
    <>
      <section className="relative overflow-hidden bg-canvas" aria-label="Developers">
        <Container className="relative">
          <div className="pt-16 pb-14 sm:pt-24 sm:pb-20">
            <p className="t-eyebrow">Developers</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">Build agents your way.</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Start with Decibyl’s self-serve product, then go deeper with APIs, MCP, webhooks, custom tools, provider keys and telephony when your product needs more control.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={site.external.signup} size="lg">Get started</ButtonLink>
              <ButtonLink href={site.external.docs} variant="secondary" size="lg">Read the docs</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel="Developer capabilities">
        <SectionHead
          title="Use the simple path until you need the powerful one."
          sub="The product stays approachable for everyday users. These controls are here when you want Decibyl inside your own stack."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(([title, body]) => (
            <article key={title} className="rounded-card border border-line bg-white p-6">
              <h2 className="t-h3">{title}</h2>
              <p className="mt-3 text-sm text-slate">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="MCP and agent configuration">
        <SectionHead
          eyebrow="MCP + APIs"
          title="Describe the change. Keep the configuration reviewable."
          sub="Use natural-language tooling where it helps, or call the platform directly from code."
        />
        <div className="mt-10 overflow-hidden rounded-card bg-ink">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="t-data ml-2 text-white/40">agent setup</span>
          </div>
          <pre className="overflow-x-auto p-6 text-[0.8125rem] leading-relaxed text-white/90">
            <code>{`> Create a supplier research agent.
  Every weekday at 8 AM, check our approved sources,
  compare changes with what we already know,
  and send the summary to the procurement channel.

  Tools: web research, documents, messaging
  Memory: supplier context + previous decisions
  Schedule: weekdays 08:00
  Approval: required before any external write

  ✓ Agent plan ready for review.`}</code>
          </pre>
        </div>
        <p className="mt-6 text-slate">
          See the current API and tool reference at{' '}
          <Link href={site.external.docs} className="text-ink underline underline-offset-4">docs.decibyl.ai</Link>.
        </p>
      </Section>

      <Section surface="white" ariaLabel="Voice developer economics">
        <SectionHead
          eyebrow="When the job needs voice"
          title="Voice stays composable too."
          sub="Choose the speech and model stack where supported, and keep platform cost visible rather than hiding it inside a blended minute rate."
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="t-eyebrow py-3 pr-6 text-iron">Platform</th>
                <th scope="col" className="t-eyebrow py-3 text-iron">Published platform fee</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.name} className="border-b border-line">
                  <th scope="row" className={`py-4 pr-6 text-[0.9375rem] font-medium ${row.isDecibyl ? 'text-ink' : 'text-slate'}`}>
                    {row.isDecibyl ? <strong>{row.name}</strong> : row.name}
                  </th>
                  <td className={`t-data py-4 ${row.isDecibyl ? 'font-semibold text-ink' : 'text-slate'}`}>${row.feeUsd.toFixed(2)}/min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="t-caption mt-5 text-iron">{developerFeesCheckedNote}</p>
      </Section>

      <section className="bg-ink py-20 text-white">
        <Container>
          <div className="max-w-3xl">
            <p className="t-eyebrow text-white/50">Build on Decibyl</p>
            <h2 className="t-h2 mt-4 text-white">Start self-serve. Extend when the job demands it.</h2>
            <p className="mt-5 text-white/65">You should not need developer tooling to get value. It is there when you want to make Decibyl part of your own product or operations stack.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.external.signup} size="lg">Get started</ButtonLink>
              <ButtonLink href={site.external.docs} variant="secondary" size="lg">Read the docs</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Developers', path: '/developers' }])} />
    </>
  );
}
