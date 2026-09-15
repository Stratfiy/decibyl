import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeBuilderSection() {
  return (
    <Section surface="canvas" ariaLabel="Build and extend">
      <div className="grid gap-5 lg:grid-cols-2">
        <article className={styles.builderLight}>
          <p className="t-eyebrow text-ink/55">Build your way</p>
          <h2 className="t-h2 mt-4">Start ready. Customize when you need to.</h2>
          <p className="mt-4 text-slate">Use a ready agent, describe a job in your own words, add skills and knowledge, or let agents work together.</p>
          <div className={styles.builderToggle} aria-label="Ways to build"><span>Describe</span><span>Customize</span><span>Connect</span></div>
          <div className="mt-6 flex flex-wrap gap-2">{['Ready agents','Build from a brief','Skills','Agent teams','Shared tasks'].map((x)=><span key={x} className="rounded-full bg-white px-3 py-2 text-xs font-bold text-ink/70">{x}</span>)}</div>
        </article>
        <article className={styles.builderDark}>
          <div className="relative z-10">
            <p className="t-eyebrow text-white/45">For builders</p>
            <h2 className="t-h2 mt-4 text-white">Need more control?</h2>
            <p className="mt-4 text-white/65">Extend Decibyl with APIs, webhooks, workflows, custom tools, telephony and your own provider keys.</p>
            <div className="mt-6 flex flex-wrap gap-2">{['REST API','Webhooks','Workflow builder','Custom tools','BYOK','Telephony'].map((x)=><span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/70">{x}</span>)}</div>
            <Link href="/developers" className="mt-7 inline-flex text-sm font-bold text-white">Explore developer tools →</Link>
          </div>
        </article>
      </div>
    </Section>
  );
}
