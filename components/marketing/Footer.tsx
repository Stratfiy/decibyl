import Link from 'next/link';
import { Container } from '@/components/ui/Section';
import { site } from '@/lib/site';
import { competitors } from '@/data/competitors';

const product = [
  { label: 'Product overview', href: '/platform' },
  { label: 'Use cases', href: '/use-cases' },
  { label: 'Knowledge & memory', href: '/knowledge' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Voice agents', href: '/voice-agents' },
  { label: 'Developers', href: '/developers' },
];

const jobs = [
  { label: 'AI agents for work', href: '/ai-agents-for-work' },
  { label: 'Customer support', href: '/ai-agents-for-customer-support' },
  { label: 'Operations', href: '/ai-agents-for-operations' },
  { label: 'Procurement', href: '/ai-agents-for-procurement' },
  { label: 'Documents & analysis', href: '/ai-document-analysis' },
  { label: 'Connect n8n', href: '/integrations/n8n' },
];

const company = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Security', href: '/security' },
  { label: 'Blog', href: '/blog' },
  { label: 'Partners', href: '/partners' },
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
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-bold text-white">Decibyl</p>
            <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed">
              AI that gets work done. Give it a job, connect what it needs, and let it get better with context over time.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Talk', 'Remember', 'Use apps', 'Run routines'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">{item}</span>
              ))}
            </div>
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
              <a href={`mailto:${site.supportEmail}`} className="hover:text-white">{site.supportEmail}</a>
            </p>
          </div>

          <FooterCol title="Product">
            {product.map((item) => <FooterLink key={item.href} href={item.href}>{item.label}</FooterLink>)}
          </FooterCol>

          <FooterCol title="Jobs">
            {jobs.map((item) => <FooterLink key={item.href} href={item.href}>{item.label}</FooterLink>)}
          </FooterCol>

          <FooterCol title="Company">
            {company.map((item) => <FooterLink key={item.href} href={item.href}>{item.label}</FooterLink>)}
            <a href={site.external.app} target="_blank" rel="noopener noreferrer" className="block py-1 text-[0.9375rem] transition-colors hover:text-white">Open Decibyl ↗</a>
            <a href={site.external.docs} target="_blank" rel="noopener noreferrer" className="block py-1 text-[0.9375rem] transition-colors hover:text-white">Docs ↗</a>
          </FooterCol>
        </div>

        <div className="grid gap-6 border-t border-white/10 py-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <FooterLink href="/compare">Compare platforms</FooterLink>
            {competitors.slice(0, 3).map((c) => <FooterLink key={c.slug} href={`/compare/${c.slug}`}>vs {c.name}</FooterLink>)}
            {legal.map((item) => <FooterLink key={item.href} href={item.href}>{item.label}</FooterLink>)}
          </div>
          <p className="t-data text-white/50">© {new Date().getFullYear()} {site.legalName}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="t-eyebrow mb-4 text-white/60">{title}</p>
      <nav aria-label={title} className="grid">{children}</nav>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="block py-1 text-[0.9375rem] transition-colors hover:text-white">{children}</Link>;
}
