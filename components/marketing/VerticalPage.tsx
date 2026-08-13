import Link from 'next/link';
import { Container, Section, SectionHead } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { LiveTranscript } from './LiveTranscript';
import { LossCalculator } from './LossCalculator';
import { FaqList } from './Faq';
import { FinalCta, HowItWorks } from './Blocks';
import { MeshBackground } from '@/components/ui/MeshBackground';
import { findAnyVertical, verticalHref, type Vertical } from '@/data/verticals';
import { tiers, tierPrice } from '@/data/pricing';

/**
 * The shared template. Ten blocks, same order every time — that consistency is
 * what lets a new vertical ship as a data-file edit rather than a new component.
 */
export function VerticalPage({ vertical }: { vertical: Vertical }) {
  const tier = tiers.find((t) => t.id === vertical.recommendedTier)!;
  const demoHref = `/book-a-demo?vertical=${vertical.slug}`;
  const siblings = vertical.siblings
    .map((slug) => findAnyVertical(slug))
    .filter((v): v is Vertical => Boolean(v));

  return (
    <>
      {/* 1 · Hero — name their loss, not the product */}
      <section className="relative overflow-hidden bg-canvas" aria-label="Introduction">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
          style={{ background: 'var(--gradient-glow)' }}
        />
        <MeshBackground className="h-[560px] opacity-60" origin="top" />
        <Container className="relative">
          <div className="pt-12 pb-14 sm:pt-16 lg:pt-20 lg:pb-20">
            <Breadcrumbs vertical={vertical} />
            <p className="t-eyebrow mt-6 text-sindoor">{vertical.eyebrow}</p>
            <h1 className="t-display mt-4 max-w-4xl text-balance">{vertical.h1}</h1>
            <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">{vertical.sub}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={demoHref} size="lg">
                Book a demo call
              </ButtonLink>
              <ButtonLink href="#sample-call" variant="secondary" size="lg">
                Hear a sample call
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 · Where the money leaks */}
      <Section surface="canvas" ariaLabel="Where the money leaks">
        <SectionHead title="Where the money leaks" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {vertical.leaks.map((leak, i) => (
            <li
              key={leak.title}
              className={`rounded-card p-7 ${['bg-peach', 'bg-sage', 'bg-sand', 'bg-mistblue'][i % 4]}`}
            >
              <h3 className="t-h3">{leak.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/75">{leak.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3 · Loss calculator */}
      {vertical.calculator ? (
        <Section surface="canvas" ariaLabel="Loss calculator" id="calculator">
          <SectionHead
            eyebrow="Your numbers, not ours"
            title="Put your own figures in."
            sub="We supply nothing here. Move the sliders to match your business and the arithmetic does the rest."
          />
          <div className="mt-10">
            <LossCalculator variant={vertical.calculator} vertical={vertical.slug} />
          </div>
        </Section>
      ) : null}

      {/* 4 · What the agent does */}
      <Section surface="white" ariaLabel="What the agent does">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHead title="What the agent does" />
          <div>
            <ul className="space-y-4">
              {vertical.capabilities.map((cap) => (
                <li key={cap} className="flex gap-3 border-b border-line pb-4 last:border-0">
                  <span aria-hidden="true" className="mt-1 text-vermilion">
                    →
                  </span>
                  <span className="text-[1.0625rem] text-ink">{cap}</span>
                </li>
              ))}
            </ul>

            {vertical.doesNotDo ? (
              <p className="mt-8 rounded-card bg-canvas p-6 text-[0.9375rem] text-ink">
                <span className="t-eyebrow block text-iron">And what it does not do</span>
                <span className="mt-2 block">{vertical.doesNotDo}</span>
              </p>
            ) : null}
          </div>
        </div>
      </Section>

      {/* 5 · Sample call */}
      <Section surface="canvas" ariaLabel="Sample call" id="sample-call">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="t-eyebrow text-sindoor">Sample call</p>
            <h2 className="t-h2 mt-4 text-balance">
              {vertical.sampleCall.tag === 'after hours'
                ? 'This call would have been a voicemail.'
                : 'One call, one outcome.'}
            </h2>
            <p className="t-body-lg mt-4 text-slate text-pretty">
              {vertical.sampleCall.language}. {vertical.sampleCall.duration}. QA score{' '}
              {vertical.sampleCall.qaScore}.
              {vertical.sampleCall.tag ? ` Tagged “${vertical.sampleCall.tag}”.` : ''}
            </p>
            <p className="t-caption mt-4 text-iron">
              An illustration of the agent’s script and outcome format, not a recording of a
              customer’s call.
            </p>
          </div>
          <LiveTranscript
            lines={vertical.sampleCall.lines}
            outcome={vertical.sampleCall.outcome}
            qaScore={vertical.sampleCall.qaScore}
            duration={vertical.sampleCall.duration}
            language={vertical.sampleCall.language}
            tag={vertical.sampleCall.tag}
          />
        </div>
      </Section>

      {/* 6 · How it fits their day */}
      <Section surface="white" ariaLabel="How it fits your day">
        <HowItWorks steps={vertical.steps} />
      </Section>

      {/* 7 · What you can see */}
      <Section surface="canvas" ariaLabel="What you can see">
        <SectionHead
          eyebrow="What you can see"
          title="Every call, on the record."
          sub="Sampled QA finds a bad call after it has already cost you something. We score all of them."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {vertical.visibility.map((item) => (
            <li key={item} className="rounded-card border border-line bg-snow p-6">
              <p className="text-[0.9375rem] text-ink">{item}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 8 · Objections — this block does the closing */}
      <Section surface="white" ariaLabel="Objections">
        <SectionHead title="The questions you’re about to ask." />
        <div className="mt-10">
          <FaqList faqs={vertical.objections} />
        </div>
      </Section>

      {/* 9 · Pricing pointer */}
      <Section surface="canvas" ariaLabel="Pricing">
        <div className="rounded-panel bg-snow p-8 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="t-eyebrow text-sindoor">Where most {vertical.name} start</p>
              <h2 className="t-h2 mt-3">
                {tier.name} — {tierPrice(tier, 'inr')}
                <span className="t-data ml-1 font-normal text-slate">/month</span>
              </h2>
              <p className="mt-3 text-slate">
                {tier.minutes} minutes, {tier.phoneNumbers.toLowerCase()}, telephony included, all
                Indian languages, and QA on 100% of calls. Exclusive of 18% GST.
              </p>
            </div>
            <ButtonLink href="/pricing" variant="secondary" size="lg">
              See the full table
            </ButtonLink>
          </div>
        </div>

        {siblings.length ? (
          <div className="mt-10">
            <p className="t-eyebrow text-iron">Also worth reading</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={verticalHref(s)}
                  className="rounded-button border border-line bg-snow px-5 py-2.5 text-[0.9375rem] transition-colors hover:border-vermilion"
                >
                  {s.name} <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </Section>

      {/* 10 · CTA, vertical pre-filled */}
      <FinalCta
        title={`Book a demo. We’ll call you back with a live agent.`}
        sub="Pick the language. You’ll hear exactly what your customers would hear."
        primary={{ label: 'Book a demo call', href: demoHref }}
      />
    </>
  );
}

function Breadcrumbs({ vertical }: { vertical: Vertical }) {
  const parent = vertical.parent ? findAnyVertical(vertical.parent) : undefined;
  return (
    <nav aria-label="Breadcrumb">
      <ol className="t-data flex flex-wrap items-center gap-2 text-iron">
        <li>
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        {parent ? (
          <>
            <li>
              <Link href={`/solutions/${parent.slug}`} className="hover:text-ink">
                {parent.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
          </>
        ) : null}
        <li className="text-slate">{vertical.name}</li>
      </ol>
    </nav>
  );
}
