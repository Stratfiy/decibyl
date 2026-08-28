import Link from 'next/link';
import { Container, SectionHead } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { advantages, howItWorks, indianOps } from '@/data/features';
import {
  additionalNumberInr,
  formatInr,
  includedCallingCaption,
  includedCallingLabel,
  tiers,
  tierPrice,
  managedTiersLive,
} from '@/data/pricing';

/* ───────────────────────────── Final CTA ───────────────────────────── */

export function FinalCta({
  title = 'Your customers are calling. Someone should answer.',
  sub = 'Book a demo and we’ll call you back with a live agent, in the language you pick.',
  primary = { label: 'Book a demo call', href: '/book-a-demo' },
  secondary = { label: 'See pricing', href: '/pricing' },
}: {
  title?: string;
  sub?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section
      aria-label="Get started"
      className="py-16 sm:py-20 lg:py-24"
      style={{ background: 'var(--gradient-panel)' }}
    >
      <Container>
        <div className="max-w-3xl">
          <h2 className="t-h2 text-white text-balance">{title}</h2>
          <p className="t-body-lg mt-4 text-white/85 text-pretty">{sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={primary.href} variant="onDark" size="lg">
              {primary.label}
            </ButtonLink>
            <Link
              href={secondary.href}
              className="inline-flex h-13 items-center rounded-button border border-white/40 px-7 font-medium text-white transition-colors hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────── Three structural advantages ─────────────────────── */

export function Advantages() {
  return (
    <div>
      <SectionHead
        eyebrow="Why the economics work"
        title="Three structural reasons, not three adjectives."
        sub="Every one of these is provable from our pricing page. That is the test we hold a claim to."
      />

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="t-eyebrow py-3 pr-6 text-iron">
                Advantage
              </th>
              <th scope="col" className="t-eyebrow py-3 pr-6 text-iron">
                The claim
              </th>
              <th scope="col" className="t-eyebrow py-3 text-iron">
                Why it holds
              </th>
            </tr>
          </thead>
          <tbody>
            {advantages.map((a) => (
              <tr key={a.advantage} className="border-b border-line align-top">
                <th scope="row" className="py-5 pr-6 text-[1.0625rem] font-semibold">
                  {a.advantage}
                </th>
                <td className="py-5 pr-6 text-slate">{a.claim}</td>
                <td className="t-data py-5 text-forest">{a.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ───────────────────────────── How it works ───────────────────────────── */

export function HowItWorks({ steps = howItWorks }: { steps?: { title: string; body: string }[] }) {
  return (
    <div>
      <SectionHead
        eyebrow="How it works"
        title="Three steps, and they genuinely are a sequence."
      />
      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="rounded-card border border-line bg-snow p-7">
            <span className="t-data flex h-9 w-9 items-center justify-center rounded-full bg-vermilion text-white">
              {i + 1}
            </span>
            <h3 className="t-h3 mt-5">{step.title}</h3>
            <p className="mt-2 text-slate">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ─────────────────────── Built for Indian operations ─────────────────────── */

export function IndianOps() {
  return (
    <div>
      <SectionHead
        eyebrow="Built for Indian operations"
        title="The unglamorous things that decide whether you can actually buy it."
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {indianOps.map((item) => (
          <li key={item.title} className="rounded-card border border-line bg-snow p-7">
            <h3 className="t-h3 text-[1.125rem]">{item.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-slate">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────────────────── Pricing preview ───────────────────────────── */

export function PricingPreview() {
  const preview = tiers.filter((t) => t.priceInr !== null);

  return (
    <div>
      <SectionHead
        eyebrow="Pricing"
        title="Published, in rupees, with the GST line stated."
        sub="Telephony and phone numbers included. No markup on model costs — we charge a platform fee and show the provider cost separately."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {preview.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 100} className="rounded-card border border-line bg-snow p-8">
            <p className="t-eyebrow text-sindoor">{tier.name}</p>
            <p className="t-h2 mt-3 text-[2.25rem]">
              {tierPrice(tier, 'inr')}
              <span className="t-data ml-1 font-normal text-slate">/month</span>
            </p>
            <p className="mt-2 text-slate">{tier.tagline}</p>
            <ul className="mt-6 space-y-2 text-[0.9375rem] text-slate">
              <li>{includedCallingLabel(tier)}</li>
              <li>{tier.phoneNumbers} · telephony included</li>
              <li>All Indian languages · {tier.concurrentCalls} concurrent calls</li>
              <li>{tier.qaScoring === 'full' ? 'QA scoring on 100% of calls' : 'Quality-sampled QA'}</li>
            </ul>
          </Reveal>
        ))}
      </div>

      <p className="t-caption mt-6 text-iron">
        All prices exclusive of 18% GST. Additional numbers {formatInr(additionalNumberInr)}/month
        each. {includedCallingCaption}
        {!managedTiersLive ? ' Managed plans are opening soon — join the waitlist.' : ''}
      </p>

      <div className="mt-8">
        <ButtonLink href="/pricing" variant="secondary" size="lg">
          See the full pricing table
        </ButtonLink>
      </div>
    </div>
  );
}
