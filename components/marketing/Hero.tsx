import { Container } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { trustStrip } from '@/data/features';

const stats = [
  { value: '<700ms', label: 'response, for select models' },
  { value: '10+ languages', label: '7 Indian, code-mixed by default' },
  { value: '100% of calls', label: 'QA-scored, not sampled' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas" aria-label="Introduction">
      {/* The glow the glass stat cards need something to blur against. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
        style={{ background: 'var(--gradient-glow)' }}
      />

      <Container className="relative">
        <div className="pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24">
          <p className="t-eyebrow text-sindoor">AI voice workers · Built in India, shipped for the world</p>

          <h1 className="t-display mt-5 max-w-4xl text-balance">
            Your customers don’t answer emails.{' '}
            <span className="gradient-text">They answer the phone.</span>
          </h1>

          <p className="t-body-lg mt-6 max-w-2xl text-slate text-pretty">
            Decibyl is an AI voice worker — it runs your confirmation, follow-up, and reminder
            calls end-to-end, not a tool that assists a human doing it. Hindi, Tamil, Telugu,
            Kannada, Marathi, Gujarati, English, and any language your voice stack supports. Every
            call transcribed, recorded, and scored.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/book-a-demo" size="lg">
              Book a demo call
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg">
              See pricing
            </ButtonLink>
          </div>

          {/* Glass stat cards, offset at slightly different heights. */}
          <ul className="mt-14 grid gap-4 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <li
                key={stat.value}
                className={`glass shadow-inset-top rounded-card px-6 py-5 ${
                  i === 1 ? 'sm:mt-6' : i === 2 ? 'sm:mt-3' : ''
                }`}
              >
                <p className="t-data text-[1.25rem] font-semibold text-ink">{stat.value}</p>
                <p className="t-caption mt-1 text-slate">{stat.label}</p>
              </li>
            ))}
          </ul>

          <p className="t-data mt-12 flex flex-wrap gap-x-3 gap-y-1 text-iron">
            {trustStrip.map((item, i) => (
              <span key={item}>
                {item}
                {i < trustStrip.length - 1 ? <span className="ml-3 text-line">·</span> : null}
              </span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
}
