import Link from 'next/link';
import { Container, SectionHead } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { advantages, howItWorks, indianOps } from '@/data/features';
import { site } from '@/lib/site';
import { formatInr, tiers } from '@/data/pricing';

export function FinalCta({
  title = 'What do you want Decibyl to get done?',
  sub = 'Start with one useful job. Add the bot, context, apps or channel it needs — and keep control of important actions.',
  primary = { label: 'Get started free', href: site.external.signup },
  secondary = { label: 'See how it works', href: '/how-it-works' },
}: {
  title?: string;
  sub?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section aria-label="Get started" className="bg-ink py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-3xl">
          <h2 className="t-h2 text-balance text-white">{title}</h2>
          <p className="t-body-lg mt-4 text-pretty text-white/70">{sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={primary.href} variant="onDark" size="lg">{primary.label}</ButtonLink>
            <Link href={secondary.href} className="inline-flex h-13 items-center rounded-button border border-white/30 px-7 font-medium text-white transition-colors hover:bg-white/10">{secondary.label}</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Advantages() {
  return (
    <div>
      <SectionHead eyebrow="Why Decibyl" title="Built around completed work, not another chat window." />
      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead><tr className="border-b border-line"><th className="t-eyebrow py-3 pr-6 text-iron">Advantage</th><th className="t-eyebrow py-3 pr-6 text-iron">What it means</th><th className="t-eyebrow py-3 text-iron">In the product</th></tr></thead>
          <tbody>
            {advantages.map((a) => (
              <tr key={a.advantage} className="border-b border-line align-top">
                <th className="py-5 pr-6 text-[1.0625rem] font-semibold">{a.advantage}</th>
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

export function HowItWorks({ steps = howItWorks }: { steps?: { title: string; body: string }[] }) {
  return (
    <div>
      <SectionHead eyebrow="How it works" title="Start with the job. Decibyl handles the setup underneath." />
      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="rounded-card border border-line bg-snow p-7">
            <span className="t-data flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">{i + 1}</span>
            <h3 className="t-h3 mt-5">{step.title}</h3>
            <p className="mt-2 text-slate">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function IndianOps() {
  return (
    <div>
      <SectionHead eyebrow="Operations" title="The practical details that make the work usable." />
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

export function PricingPreview() {
  const preview = tiers.slice(0, 4);
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {preview.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 70} className={`rounded-card p-7 ${tier.featured ? 'bg-ink text-white' : 'border border-line bg-snow'}`}>
            <p className={`t-eyebrow ${tier.featured ? 'text-white/50' : 'text-iron'}`}>{tier.name}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{formatInr(tier.priceInr)}<span className={`ml-1 text-xs font-normal ${tier.featured ? 'text-white/50' : 'text-iron'}`}>/month</span></p>
            <p className={`mt-3 text-sm leading-relaxed ${tier.featured ? 'text-white/70' : 'text-slate'}`}>{tier.tagline}</p>
            <ul className={`mt-5 space-y-2 text-sm ${tier.featured ? 'text-white/75' : 'text-slate'}`}>
              <li>{tier.id === 'free' ? 'Up to 1,000 credits to earn' : `${tier.credits.toLocaleString('en-IN')} credits`}</li>
              <li>{tier.bots} bot{tier.bots === '1' ? '' : 's'} · {tier.routines} routines</li>
              <li>{tier.voiceAllowed ? `${tier.includedNumbers} number${tier.includedNumbers === 1 ? '' : 's'} · voice included` : 'Messaging + knowledge · no phone line'}</li>
            </ul>
          </Reveal>
        ))}
      </div>
      <p className="t-caption mt-6 text-iron">One credit = ₹0.50. No seat licence. Voice starts on Business. Prices exclude 18% GST.</p>
      <div className="mt-7"><ButtonLink href="/pricing" variant="secondary" size="lg">See all plans</ButtonLink></div>
    </div>
  );
}
