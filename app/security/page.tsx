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
