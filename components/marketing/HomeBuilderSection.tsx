import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeBuilderSection() {
  return (
    <Section surface="canvas" ariaLabel="Build and extend">
      <div className="grid gap-5 lg:grid-cols-2">
        <article className={styles.builderLight}>
          <p className="t-eyebrow text-ink/55">Build your way</p>
          <h2 className="t-h2 mt-4">Find a bot, or describe your own.</h2>
          <p className="mt-4 text-slate">Start from one of the live marketplace jobs or describe the responsibility in plain language. Add only the channels, knowledge and tools the job needs, test it, then publish it.</p>
          <div className={styles.builderToggle} aria-label="Ways to build"><span>Find</span><span>Describe</span><span>Test</span></div>
          <div className="mt-6 flex flex-wrap gap-2">{['Live job packs','Build from a brief','Knowledge','Connected tools','Tasks'].map((x)=><span key={x} className="rounded-full bg-white px-3 py-2 text-xs font-bold text-ink/70">{x}</span>)}</div>
        </article>
        <article className={styles.builderDark}>
          <div className="relative z-10">
            <p className="t-eyebrow text-white/45">For builders</p>
            <h2 className="t-h2 mt-4 text-white">Need more control?</h2>
            <p className="mt-4 text-white/65">Build on Decibyl with REST APIs, Python and TypeScript SDKs, MCP, webhooks, custom tools and Code Mode. BYOK can be enabled when your account needs it.</p>
            <div className="mt-6 flex flex-wrap gap-2">{['REST API','Python SDK','TypeScript SDK','MCP','Webhooks','Code Mode','BYOK'].map((x)=><span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/70">{x}</span>)}</div>
            <Link href="/developers" className="mt-7 inline-flex text-sm font-bold text-white">Explore developer tools →</Link>
          </div>
        </article>
      </div>
    </Section>
  );
}
