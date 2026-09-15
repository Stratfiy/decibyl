import type { Metadata } from 'next';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { PricingTable } from '@/components/marketing/PricingTable';
import { PayAsYouGo } from '@/components/marketing/PayAsYouGo';
import { FinalCta } from '@/components/marketing/Blocks';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Pricing — Free, Everyday, Business, Growth & Scale',
  description:
    'Decibyl plans start free. One shared credit balance covers messages, knowledge, routines, tasks, tools and voice. Everyday is ₹999/month; voice starts on Business at ₹2,999/month.',
  path: '/pricing',
  keywords: ['AI agent pricing India', 'AI bot pricing', 'AI voice agent pricing India', 'AI automation pricing', 'Decibyl pricing'],
  ogTitle: 'Simple plans for AI that gets work done',
});

const creditExamples = [
  ['Text reply', '1 credit', 'A bot replies in chat or a connected messaging channel.'],
  ['Knowledge answer', '2 credits', 'The reply uses your uploaded documents; 1 credit when the documents have no answer.'],
  ['Routine run', '2 credits', 'A scheduled bot job runs without you prompting it again.'],
  ['Task run', '1 credit', 'A bot completes work from the shared task board.'],
  ['Tool call', '1–3 credits', '1 for most connected tools; 3 for systems of record such as CRM, ERP, accounting, commerce and helpdesk systems.'],
  ['WhatsApp message', '2 credits', 'A message sent through Decibyl’s platform sender.'],
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-canvas" aria-label="Pricing">
        <Container>
          <div className="pt-16 pb-12 sm:pt-24 sm:pb-16">
            <p className="t-eyebrow text-iron">Pricing</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">Plans for the work you want to hand off.</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
              Start free. Every plan gives your workspace a shared pool of credits that bots use across messages, knowledge, routines, tasks, tools and—on Business and above—voice calls. No seat licence and no separate per-minute platform fee.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate">
              <span>1 credit = ₹0.50</span>
              <span>Plan credits reset each cycle</span>
              <span>Top-up credits never expire</span>
              <span>18% GST added at checkout</span>
            </div>
          </div>
        </Container>
      </section>

      <Section surface="white" className="pt-0" ariaLabel="Plans">
        <PricingTable />
      </Section>

      <Section surface="canvas" ariaLabel="What credits buy">
        <SectionHead
          eyebrow="One balance"
          title="One credit system across the work."
          sub="You do not buy a separate product for every capability. The same workspace balance pays for the work your bots actually run."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {creditExamples.map(([title, cost, body]) => (
            <article key={title} className="rounded-card border border-line bg-snow p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-base font-semibold text-ink">{title}</h2>
                <span className="t-data shrink-0 text-iron">{cost}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface="white" ariaLabel="Voice pricing">
        <SectionHead
          eyebrow="Voice"
          title="Calling starts on Business."
          sub="Voice is metered only while a call is connected. Ringing, busy signals and unanswered calls cost nothing. Billing uses 15-second pulses rather than rounding every call to a full minute."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ['Business', '13 credits / min', '₹6.50 per connected minute · 1 number included · 5 concurrent calls'],
            ['Growth', '12 credits / min', '₹6.00 per connected minute · 2 numbers included · 15 concurrent calls'],
            ['Scale', '11 credits / min', '₹5.50 per connected minute · 4 numbers included · 40 concurrent calls'],
          ].map(([plan, rate, detail]) => (
            <article key={plan} className="rounded-card border border-line bg-snow p-7">
              <p className="t-eyebrow text-iron">{plan}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{rate}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">{detail}</p>
            </article>
          ))}
        </div>
        <p className="t-caption mt-6 text-iron">When plan credits are used up, Business and Growth voice draws from top-up credits at one additional credit per minute. Scale remains at 11 credits/min.</p>
      </Section>

      <Section surface="canvas" ariaLabel="Top up credits">
        <PayAsYouGo />
      </Section>

      <Section surface="white" ariaLabel="Provider keys">
        <SectionHead
          eyebrow="Models"
          title="Use ours, or your own keys when you need them."
          sub="Each model slot can use a Decibyl-managed provider. Accounts with BYOK enabled can instead supply their own provider key for that slot and pay that provider directly. Mixing managed and BYOK components is supported."
        />
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          <article className="rounded-card border border-line bg-snow p-7">
            <h2 className="text-lg font-semibold">Managed</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">Use Decibyl’s configured providers. The work is charged in Decibyl credits and you do not need a separate model-provider account.</p>
          </article>
          <article className="rounded-card border border-line bg-snow p-7">
            <h2 className="text-lg font-semibold">Your key</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">When BYOK is enabled for your account, connect your own provider credentials for individual model slots. Decibyl does not charge for the provider component you run on your own key.</p>
          </article>
        </div>
      </Section>

      <Section surface="canvas" ariaLabel="Billing details">
        <SectionHead eyebrow="Billing" title="Prepaid by design." sub="Your bots spend only credit you already have. Calling pauses before the balance can go negative, and resumes when you top up. Payments and GST documents are handled through the Billing area in the app." />
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={site.external.signup} className="inline-flex h-12 items-center rounded-button bg-ink px-6 text-sm font-semibold text-white">Start free</a>
          <a href="https://docs.decibyl.ai/account/billing" className="inline-flex h-12 items-center rounded-button border border-line px-6 text-sm font-semibold text-ink">Read billing docs</a>
        </div>
      </Section>

      <FinalCta title="Start with the plan that matches the work today." sub="You can move plans as the number of bots, routines, teammates, knowledge or calls grows." secondary={{ label: 'See how Decibyl works', href: '/how-it-works' }} />

      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }])} />
    </>
  );
}
