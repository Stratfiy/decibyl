import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { FinalCta } from '@/components/marketing/Blocks';
import { advancedStack, developerFeesCheckedNote, developerPlatformFees } from '@/data/pricing';
import { site } from '@/lib/site';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Developers — MCP-Native Voice Agents, $0.02/min Platform Fee',
  description:
    'Define and change voice agents from Claude Code over MCP. Choose your own STT, LLM and TTS vendors on the Advanced tab, on our provider keys, with every component itemised on each call receipt — over the lowest published platform fee in voice AI.',
  path: '/developers',
  keywords: [
    'MCP voice agent building',
    'Claude Code voice agent',
    'voice AI platform fee',
    'choose your own STT LLM TTS',
  ],
  ogTitle: 'Define your voice agents from Claude Code.',
});

export default function DevelopersPage() {
  const sorted = [...developerPlatformFees].sort((a, b) => a.feeUsd - b.feeUsd);

  return (
    <>
      <section className="relative overflow-hidden bg-canvas" aria-label="Developers">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
          style={{ background: 'var(--gradient-glow)' }}
        />
        <Container className="relative">
          <div className="pt-14 pb-12 sm:pt-20">
            <p className="t-eyebrow text-sindoor">Developers</p>
            <h1 className="t-display mt-4 max-w-3xl text-balance">
              Define your voice agents from Claude Code.
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Agents are MCP tools, not a dashboard form. Pick the STT, LLM and TTS vendors
              yourself, on our provider keys, and read what every component cost on each call&rsquo;s
              receipt — over the lowest published platform fee in voice AI.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`${site.external.app}/signup`} size="lg">
                Sign up
              </ButtonLink>
              <ButtonLink href={site.external.docs} variant="secondary" size="lg">
                Read the docs
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Rate comparison */}
      <Section surface="white" className="pt-0" ariaLabel="Platform fee comparison">
        <SectionHead
          title="Published platform fees, side by side."
          sub="Every figure below is what that vendor states on their own pricing page — not a blended rate, not our estimate. This is the orchestration fee only; on every platform here, ours included, model and telephony cost sits alongside it."
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="t-eyebrow py-3 pr-6 text-iron">
                  Platform
                </th>
                <th scope="col" className="t-eyebrow py-3 text-iron">
                  Published platform fee
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.name} className="border-b border-line">
                  <th
                    scope="row"
                    className={`py-4 pr-6 text-[0.9375rem] font-medium ${
                      row.isDecibyl ? 'text-vermilion' : 'text-slate'
                    }`}
                  >
                    {row.isDecibyl ? <strong>{row.name}</strong> : row.name}
                  </th>
                  <td
                    className={`t-data py-4 ${row.isDecibyl ? 'font-semibold text-vermilion' : 'text-ink'}`}
                  >
                    ${row.feeUsd.toFixed(2)}/min
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="t-caption mt-5 text-iron">{developerFeesCheckedNote}</p>
      </Section>

      {/* MCP-native — the single most distinctive technical fact, above the fold here */}
      <Section surface="canvas" ariaLabel="MCP-native agent building">
        <SectionHead
          eyebrow="MCP-native"
          title="Define and change agents from Claude Code."
          sub="As far as we know, Decibyl is the first voice agent platform in India built this way. No dashboard form to fill out — the agent is defined the same way the rest of your infrastructure is."
        />
        <div className="mt-10 overflow-hidden rounded-card bg-ink">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="t-data ml-2 text-white/40">claude code</span>
          </div>
          <pre className="overflow-x-auto p-6 text-[0.8125rem] leading-relaxed text-white/90">
            <code>{`> Update the clinic reminder agent: add a Gujarati opening line
  and transfer to +91XXXXXXXXXX on any mention of "emergency".

  Calling decibyl.update_agent(
    agent_id="clinic-reminders",
    languages=["hi", "gu", "en"],
    transfer_rules=[
      { trigger: "emergency", transfer_to: "+91XXXXXXXXXX" }
    ]
  )

  ✓ Agent updated. Live on the next call.`}</code>
          </pre>
        </div>
        <p className="mt-6 text-slate">
          Full setup, transfer rules, and campaign definitions are available as MCP tools — see{' '}
          <Link
            href={site.external.docs}
            className="text-sindoor underline-offset-4 hover:underline"
          >
            docs.decibyl.ai
          </Link>{' '}
          for the full tool reference.
        </p>
      </Section>

      {/* Advanced detail */}
      <Section surface="white" ariaLabel="Choose your own stack">
        <div className="rounded-panel bg-ink p-8 text-white sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="t-eyebrow text-ember">{advancedStack.headline}</p>
              <h2 className="t-h2 mt-4">
                Pick the stack, not just the bundle.
              </h2>
              <p className="t-body-lg mt-4 max-w-xl text-white/75">{advancedStack.body}</p>
              <p className="t-data mt-6 text-white/50">
                {advancedStack.providers.join(' · ')}
              </p>
            </div>
            <div className="rounded-card bg-white/5 p-7">
              <p className="t-eyebrow text-white/50">Who this is for</p>
              <p className="mt-3 text-[0.9375rem] text-white/80">
                Teams with an opinion about which model should answer the phone. If you would
                rather pick one card and get on with it, the three bundles on{' '}
                <Link href="/pricing" className="underline underline-offset-4">/pricing</Link> do the
                choosing for you.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <FinalCta
        title="Ready to build one from your terminal?"
        sub="Sign up and ship your first agent today — this is a self-serve path, no sales call required."
        primary={{ label: 'Sign up', href: `${site.external.app}/signup` }}
        secondary={{ label: 'See managed pricing', href: '/pricing' }}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Developers', path: '/developers' },
        ])}
      />
    </>
  );
}
