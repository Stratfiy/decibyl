import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { FinalCta } from '@/components/marketing/Blocks';
import { MeshBackground } from '@/components/ui/MeshBackground';
import { pillars, notCertified } from '@/data/security';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { RelatedPosts } from '@/components/marketing/RelatedPosts';

export const metadata: Metadata = pageMetadata({
  title: 'Security & Trust',
  description:
    'Data residency, encryption, DPDP roles, consent controls, and GST-compliant billing — the straight answer, and what we are honestly not certified for yet.',
  path: '/security',
  keywords: ['voice AI data security India', 'DPDP compliant AI calling', 'AI calling data residency'],
  ogTitle: 'The straight answer on where your data lives',
});

/** The infrastructure answers, kept as data so the page stays a layout.
 *
 *  Written from what the system actually does rather than from what sounds
 *  reassuring. Capacity in particular is described as it works — per account,
 *  raised on request — and NOT as a concurrency number, because the figure the
 *  sizing model uses has never been measured and a number on this page is a
 *  commitment. */
const infrastructure = [
  {
    t: 'One region, chosen deliberately',
    b: 'AWS ap-south-1 (Mumbai). Recordings and transcripts are conversations with people in India, and the region holding them is where that personal data comes to rest under the DPDP Act. Nothing is split across regions — recordings in Mumbai and a database elsewhere would undo the point.',
  },
  {
    t: 'Encryption, including from us',
    b: 'TLS to the application and to every provider. Storage encrypted at rest. Provider keys are encrypted in the database, and API keys are stored as hashes — not recoverable by anyone, including us.',
  },
  {
    t: 'Backups that are actually tested',
    b: 'Automatic, encrypted, kept 30 days, with an alert if one goes stale past 36 hours — so a backup job that quietly stops is noticed rather than discovered during a restore. Restores are rehearsed into a scratch database and the ledger is reconciled, because an untested backup is a hypothesis.',
  },
  {
    t: 'Deploys that do not drop calls',
    b: 'An update drains active calls first: a worker finishes the conversations it is holding before it is replaced. Nobody on a call hears a release.',
  },
  {
    t: 'Capacity, set per account',
    b: 'Concurrency is configured per customer and raised on request. Campaigns are rate-limited and circuit-broken — a failure-rate spike pauses a campaign automatically rather than burning through a contact list.',
  },
  {
    t: 'Failures that fail fast',
    b: 'A call that cannot get a resource fails immediately rather than leaving a caller in silence. Every notable moment of a call is written to a timeline as it happens, so a dispute starts from a record rather than from a database query.',
  },
];

export default function SecurityPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-canvas" aria-label="Security and trust">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
          style={{ background: 'var(--gradient-glow)' }}
        />
        <MeshBackground className="h-[520px] opacity-60" origin="top" />
        <Container className="relative">
          <div className="pt-14 pb-12 sm:pt-20">
            <p className="t-eyebrow text-sindoor">Security & trust</p>
            <h1 className="t-display mt-4 max-w-3xl text-balance">
              Where your data lives, and who can touch it.
            </h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              The short version, for the person on your team who has to sign off before this goes
              live. Full legal language is in the DPDP and privacy pages linked below.
            </p>
          </div>
        </Container>
      </section>

      <Section surface="white" className="pt-0" ariaLabel="Security pillars">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.title} className="rounded-card border border-line p-7">
              <h3 className="t-h3 text-[1.0625rem]">{p.title}</h3>
              <p className="mt-3 text-slate">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="white" ariaLabel="Infrastructure">
        <SectionHead
          eyebrow="Infrastructure"
          title="Where it runs, and what happens when something breaks."
          sub="The three questions a security review actually asks, answered before you have to ask them."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {infrastructure.map((item) => (
            <div key={item.t} className="rounded-card border border-line bg-canvas p-6">
              <p className="font-display font-bold">{item.t}</p>
              <p className="mt-2 text-[0.9375rem] text-slate">{item.b}</p>
            </div>
          ))}
        </div>
        <p className="t-caption mt-6 text-iron">
          The database, cache, and object storage are moving to managed AWS services this quarter.
          That takes the recovery point from the last backup to any second inside the retention
          window, and makes the application servers replaceable without touching customer data. We
          would rather tell you that is in progress than describe it as finished.
        </p>
      </Section>

      <Section surface="canvas" ariaLabel="What we are not">
        <SectionHead
          eyebrow="Honest gaps"
          title="What we are not certified for."
          sub="We would rather list what we don't have than have you find out during procurement."
        />
        <ul className="mt-8 flex flex-wrap gap-3">
          {notCertified.map((c) => (
            <li key={c} className="rounded-button border border-line bg-snow px-5 py-3 text-slate">
              {c}
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="white" ariaLabel="Read the legal pages">
        <SectionHead title="The full legal language" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          <li>
            <Link
              href="/legal/dpdp"
              className="block rounded-card border border-line p-6 transition-colors hover:border-vermilion"
            >
              <p className="t-h3 text-[1.0625rem]">DPDP & call data handling</p>
              <p className="mt-2 text-slate">
                Roles, disclosure, consent, retention, deletion, and erasure requests.
              </p>
            </Link>
          </li>
          <li>
            <Link
              href="/legal/privacy"
              className="block rounded-card border border-line p-6 transition-colors hover:border-vermilion"
            >
              <p className="t-h3 text-[1.0625rem]">Privacy policy</p>
              <p className="mt-2 text-slate">What we collect on this site and why.</p>
            </Link>
          </li>
        </ul>
      </Section>

      <Container>
        <RelatedPosts path="/security" />
      </Container>
      <FinalCta
        title="Security team has more questions?"
        sub="Ask for the DPA before you sign, not after. We'll send it directly."
        secondary={{ label: 'Contact us', href: '/contact?topic=security' }}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Security & trust', path: '/security' },
        ])}
      />
    </>
  );
}
