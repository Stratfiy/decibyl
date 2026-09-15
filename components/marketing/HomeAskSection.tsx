import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeAskSection() {
  return (
    <Section surface="white" ariaLabel="Tell Decibyl what to do">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">Just ask</p>
          <h2 className="t-h2 mt-4 text-balance">Tell it what needs doing.</h2>
          <p className="t-body-lg mt-5 max-w-xl text-slate text-pretty">
            Start with the job, not a workflow builder. Decibyl figures out the context, tools and next steps it needs, then brings you back the result.
          </p>
        </div>
        <div className={`${styles.stage} p-5 sm:p-7`}>
          <div className="rounded-[18px] border border-ink/10 bg-ink px-5 py-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
            Research our top competitors every morning and send me what changed on WhatsApp.
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ['01 · RESEARCH', 'Web + sources'],
              ['02 · ROUTINE', 'Every morning'],
              ['03 · DELIVER', 'WhatsApp'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[18px] border border-ink/10 bg-white p-4 shadow-[0_20px_35px_-32px_rgba(0,0,0,.5)]">
                <p className="text-[10px] font-black tracking-[0.12em] text-slate">{label}</p>
                <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-[18px] border border-vermilion/15 bg-[#fff3ef] p-4">
            <div><strong className="block text-sm">Research agent ready</strong><span className="text-xs text-ink/60">Runs tomorrow at 8:00 AM</span></div>
            <span className="rounded-full bg-vermilion px-3 py-1 text-xs font-bold text-white">Active</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
