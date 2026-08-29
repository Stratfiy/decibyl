import Link from 'next/link';
import { Container } from '@/components/ui/Section';
import { site } from '@/lib/site';
import { topLevelVerticals, clinicSubVerticals, verticalHref } from '@/data/verticals';
import { competitors } from '@/data/competitors';
import { useCases } from '@/data/useCases';

const company = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Developers', href: '/developers' },
  { label: 'Partners', href: '/partners' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Book a demo', href: '/book-a-demo' },
  { label: 'Join the waitlist', href: '/waitlist' },
  { label: 'Contact', href: '/contact' },
];

const legal = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'DPDP & data', href: '/legal/dpdp' },
  { label: 'Refunds', href: '/legal/refund' },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <Container>
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-bold text-white">Decibyl</p>
            <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed">
              {site.tagline} {site.subline}
            </p>
            <p className="t-data mt-6 text-white/60">
              {site.legalName}
              {site.registeredAddress ? (
                <>
                  <br />
                  {[
                    site.registeredAddress.street,
                    site.registeredAddress.locality,
                    site.registeredAddress.region,
                    site.registeredAddress.postalCode,
                    site.registeredAddress.country,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </>
              ) : null}
              <br />
              GST-registered
              <br />
              <a href={`mailto:${site.supportEmail}`} className="hover:text-white">
                {site.supportEmail}
              </a>
            </p>
            <a
              href={`mailto:${site.supportEmail}`}
              className="t-data mt-3 inline-block text-white/70 underline-offset-4 hover:text-white hover:underline"
            >
              {site.supportEmail}
            </a>
          </div>

          <FooterCol title="Solutions">
            {topLevelVerticals.map((v) => (
              <FooterLink key={v.slug} href={verticalHref(v)}>
                AI voice agents for {v.slug === 'd2c-ndr-recovery' ? 'D2C' : v.slug === 'lending-collections' ? 'collections' : v.name.toLowerCase()}
              </FooterLink>
            ))}
            {clinicSubVerticals.map((v) => (
              <FooterLink key={v.slug} href={verticalHref(v)}>
                {v.name}
              </FooterLink>
            ))}
            <FooterLink href="/voice-ai">Multilingual AI voice agents</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink href="/use-cases">AI voice agent use cases</FooterLink>
            {useCases.map((item) => <FooterLink key={item.slug} href={`/use-cases/${item.slug}`}>{item.name}</FooterLink>)}
            {company.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <a
              href={site.external.app}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1 text-[0.9375rem] transition-colors hover:text-white"
            >
              Log in
            </a>
            <a
              href={site.external.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-1 text-[0.9375rem] transition-colors hover:text-white"
            >
              Docs
            </a>
          </FooterCol>

          <FooterCol title="Compare & legal">
            <FooterLink href="/compare">All platforms compared</FooterLink>
            {competitors.map((c) => (
              <FooterLink key={c.slug} href={`/compare/${c.slug}`}>
                vs {c.name}
              </FooterLink>
            ))}
            <FooterLink href="/security">Security & trust</FooterLink>
            {legal.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-7">
          <p className="t-data text-white/60">
            © {new Date().getFullYear()} {site.legalName}. All prices exclusive of 18% GST.
          </p>
          <p className="t-data text-white/60">
            Data resident in India by default · AWS Mumbai (ap-south-1) · also available in the US
            &amp; EU
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="t-eyebrow mb-4 text-white/60">{title}</p>
      <nav aria-label={title} className="grid">
        {children}
      </nav>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block py-1 text-[0.9375rem] transition-colors hover:text-white">
      {children}
    </Link>
  );
}
