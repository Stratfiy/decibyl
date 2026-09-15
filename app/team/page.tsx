import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { LeadForm } from '@/components/forms/LeadForm';
import { briefFields, teamOnDecibyl, teamRoles } from '@/data/teamPack';
import { shelf } from '@/data/shelf';
import { freeTier, textTier, tierPrice } from '@/data/pricing';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

/**
 * The seven-role team. The page is the whole guide, ungated: seven prompts
 * that work in any chat today, and the same seven as a Decibyl pack. The
 * email capture is for the pack, which is honest about being next, not live.
 */

export const metadata: Metadata = pageMetadata({
  title: 'The Seven-Role AI Team: Free Guide and Pack',
  description:
    'Seven AI roles that work as one small team: research, product, leads, content, ads, sales and operations. Copy the prompts and use them today, or run the team on Decibyl where it executes, remembers and runs on a schedule.',
  path: '/team',
  keywords: [
    'AI team for small business',
    'AI agents for solopreneurs',
    'AI marketing team prompts',
    'AI sales agent prompts',
    'run a business with AI agents',
    'AI operations manager',
  ],
  ogTitle: 'Seven roles. One team. Yours.',
  ogSubtitle: 'Free prompts today, a pack on Decibyl next',
});

const liveSlugs = new Set(shelf.filter((r) => r.status === 'live').map((r) => r.slug));

export default function TeamPage() {
  return (
    <>
      <section className="bg-canvas" aria-label="The seven-role team">
        <Container>
          <div className="pt-14 pb-12 sm:pt-20">
            <nav aria-label="Breadcrumb">
              <ol className="t-data flex gap-2 text-iron">
                <li><Link href="/" className="hover:text-ink">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-slate">Team</li>
              </ol>
            </nav>
            <p className="t-eyebrow mt-6 text-sindoor">Free guide</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">Seven AI roles that work as one small team</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Research, product, leads, content, ads, sales, and an operations role that runs the other six. One brief feeds all of them. Each role&rsquo;s output is the next one&rsquo;s input, and you approve every step. The prompts below work in any chat assistant today. On Decibyl the same seven become workers that do the searching, keep one memory, and run on a schedule.
            </p>
            <p className="t-caption mt-4 text-iron">
              This is a planning tool, not a promise. Nothing here guarantees income. The roles only know what you tell them and never invent customers, numbers or facts.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="white" ariaLabel="The brief">
        <SectionHead eyebrow="Step one" title="Write the brief once" sub="Six lines. Every role reads it. Be honest; a vague brief produces vague work." />
        <ol className="mt-8 max-w-2xl space-y-3">
          {briefFields.map((f, i) => (
            <li key={f.label} className="rounded-card border border-line bg-canvas p-4">
              <p className="font-display font-bold">{i + 1}. {f.label}</p>
              <p className="t-caption mt-1 text-iron">{f.hint}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="canvas" ariaLabel="The workflow">
        <SectionHead eyebrow="Step two" title="Run the chain" sub="Each role hands to the next. Operations sits at the end and keeps everything organised." />
        <ol className="mt-8 flex flex-wrap items-center gap-3">
          {teamRoles.map((r, i) => (
            <li key={r.slug} className="flex items-center gap-3">
              <a href={`#${r.slug}`} className="rounded-full border border-line bg-white px-4 py-2 font-display font-bold hover:border-vermilion">{r.name}</a>
              {i < teamRoles.length - 1 ? <span aria-hidden="true" className="text-iron">→</span> : null}
            </li>
          ))}
        </ol>
      </Section>

      {teamRoles.map((r, i) => (
        <Section key={r.slug} surface={i % 2 === 0 ? 'white' : 'canvas'} ariaLabel={r.name} id={r.slug}>
          <SectionHead eyebrow={`Role ${r.order}`} title={r.name} sub={r.job} />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <p><span className="font-display font-bold">Needs.</span> {r.needs}</p>
              <p><span className="font-display font-bold">Gives you.</span> {r.gives}</p>
              <p><span className="font-display font-bold">On Decibyl.</span> {r.onDecibyl}</p>
              {r.routine ? <p className="t-data text-iron">Routine: {r.routine}</p> : null}
              <p className="t-data text-iron">
                Shelf roles:{' '}
                {r.shelf.map((s, j) => {
                  const role = shelf.find((x) => x.slug === s);
                  return (
                    <span key={s}>
                      {j > 0 ? ', ' : ''}
                      <Link href="/shelf" className="hover:text-ink">{role?.name ?? s}</Link>
                      {liveSlugs.has(s) ? ' (live)' : ''}
                    </span>
                  );
                })}
              </p>
            </div>
            <pre className="lg:col-span-2 whitespace-pre-wrap rounded-card border border-line bg-white p-5 font-mono text-[0.875rem] leading-relaxed text-ink">{r.prompt}</pre>
          </div>
        </Section>
      ))}

      <Section surface="white" ariaLabel="What changes on Decibyl">
        <SectionHead eyebrow="Step three" title="Same seven roles, without the pasting" sub={`The prompts are yours either way. The pack runs them on the ${textTier.name} plan at ${tierPrice(textTier, 'inr')} a month, or on ${freeTier.name} to start; no phone number, no voice needed.`} />
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-[0.9375rem]">
            <thead><tr className="border-b border-line"><th className="py-2 pr-4 font-display">In a chat</th><th className="py-2 font-display">On Decibyl</th></tr></thead>
            <tbody>
              {teamOnDecibyl.map((row) => (
                <tr key={row.chat} className="border-b border-line/60"><td className="py-2 pr-4 text-slate">{row.chat}</td><td className="py-2">{row.decibyl}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="t-caption mt-4 text-iron">The pack is being built from roles already on the shelf; the ones marked live above work today. Leave your email and you get the pack the day it ships. The prompts are on this page; nothing is gated.</p>
        <div className="mt-8 max-w-md">
          <LeadForm variant="waitlist" vertical="team" compact />
        </div>
      </Section>

      <FinalCta title="Start with the brief. Six lines." sub="Then paste the research prompt. If the market is weak, you find out in ten minutes instead of ten weeks." secondary={{ label: 'See every role on the shelf', href: '/shelf' }} />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Team', path: '/team' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Run a seven-role AI team',
            step: teamRoles.map((r) => ({ '@type': 'HowToStep', position: r.order, name: r.name, text: r.job })),
          },
        ]}
      />
    </>
  );
}
