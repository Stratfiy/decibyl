import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { hasText, hasVoice, shelf, shelfBySector, shelfSectors, type ShelfRole } from '@/data/shelf';
import { getJob } from '@/data/jobs';
import { tiers, tierPrice } from '@/data/pricing';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'The Shelf: Every Role a Decibyl Worker Can Be',
  description: `${shelf.length} roles across ${shelfSectors.length} sectors, from clinic front desk to vendor follow-up: what each does, on which channels, writing to which tools, and whether it is live today or next.`,
  path: '/shelf',
  keywords: ['AI worker roles India', 'AI agent marketplace India', 'AI telecaller roles', 'AI receptionist roles by industry', 'hire AI employee India'],
  ogTitle: 'The shelf',
  ogSubtitle: `${shelf.length} roles, by industry`,
});

const statusLabel: Record<ShelfRole['status'], string> = { live: 'Live', next: 'Next', later: '2027' };
const statusClass: Record<ShelfRole['status'], string> = {
  live: 'bg-forest/10 text-forest',
  next: 'bg-peach text-sindoor',
  later: 'bg-canvas text-iron',
};
const kindLabel: Record<ShelfRole['kind'], string> = {
  inbound: 'Answers',
  outbound: 'Calls',
  both: 'Answers and calls',
  routine: 'Runs on a schedule',
  text: 'Text only',
};

const price = (id: string): string => {
  const tier = tiers.find((t) => t.id === id);
  return tier ? `${tierPrice(tier, 'inr')}/mo` : '';
};

function planLabel(role: ShelfRole): string {
  const voice = hasVoice(role);
  const text = hasText(role);
  if (voice && text) return `Text on any plan from ${price('everyday')} · voice from ${price('business')}`;
  if (voice) return `Voice only · Business and above, from ${price('business')}`;
  return `Any plan, from ${price('everyday')}`;
}

export default function ShelfPage() {
  const live = shelf.filter((r) => r.status === 'live').length;
  const next = shelf.filter((r) => r.status === 'next').length;
  return (
    <>
      <section className="bg-canvas" aria-label="The shelf">
        <Container>
          <div className="pt-14 pb-12 sm:pt-20">
            <nav aria-label="Breadcrumb">
              <ol className="t-data flex gap-2 text-iron">
                <li><Link href="/" className="hover:text-ink">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-slate">Shelf</li>
              </ol>
            </nav>
            <p className="t-eyebrow mt-6 text-sindoor">The shelf</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">Every role a Decibyl worker can be, by industry</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              {shelf.length} roles across {shelfSectors.length} sectors. Each is a job a business posts or a task it does by hand every week. {live} are on the shelf today, {next} are being built for this quarter, and the rest are marked for 2027. Pick one, tell Decibyl the specifics, hear it, put it on your number.
            </p>
            <p className="t-caption mt-4 text-iron">Live means you can hire it now. Next and 2027 are stated so you can plan; nothing here is sold before it works.</p>
            <p className="t-caption mt-2 text-iron">Every plan gets every role. The only gate is voice: the phone half of a role needs Business or above; the WhatsApp, web chat and email half runs on Everyday. Roles are global unless marked India, where they depend on an Indian rule or portal.</p>
          </div>
        </Container>
      </section>

      {shelfSectors.map((sector, i) => (
        <Section key={sector} surface={i % 2 === 0 ? 'white' : 'canvas'} ariaLabel={sector}>
          <SectionHead eyebrow="Sector" title={sector} />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {shelfBySector(sector).map((r) => {
              const job = r.jobs ? getJob(r.jobs) : undefined;
              return (
                <div key={r.slug} className="flex flex-col rounded-card border border-line bg-snow p-6">
                  <div className="flex items-start justify-between gap-3">
                    <p className="t-eyebrow text-iron">{r.industry}</p>
                    <span className={`t-data rounded-full px-2.5 py-0.5 text-[0.75rem] ${statusClass[r.status]}`}>{statusLabel[r.status]}</span>
                  </div>
                  <p className="mt-2 font-display text-[1.15rem] font-bold">{r.name}</p>
                  <p className="t-caption mt-1 text-iron">Posted as: {r.posted} · {kindLabel[r.kind]}{r.reach === 'india' ? ' · India' : ''}</p>
                  <ul className="mt-4 space-y-1.5 text-[0.9375rem] text-slate">
                    {r.does.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                  <p className="t-data mt-4 text-iron">{r.channels.join(' · ')} → {r.tools.join(', ')}</p>
                  <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                    <span className="t-data text-ink">{planLabel(r)}</span>
                    {job ? (
                      <Link href={`/jobs/${job.slug}`} className="t-data text-sindoor hover:underline">The job, priced beside the salary</Link>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      ))}

      <FinalCta title="Do not see the job you were about to post?" sub="Send us the post. If a worker can do the phone half of it, we will say so, and if it cannot, we will say that too." />

      <JsonLd data={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Shelf', path: '/shelf' }])]} />
    </>
  );
}
