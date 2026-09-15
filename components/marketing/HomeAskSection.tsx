import { Section } from '@/components/ui/Section';
import styles from './home-product.module.css';

export function HomeAskSection() {
  return (
    <Section surface="white" ariaLabel="Tell Decibyl what to do">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="t-eyebrow text-iron">Just ask</p>
          <h2 className="t-h2 mt-4 text-balance">Tell Decibyl what needs doing.</h2>
          <p className="t-body-lg mt-5 max-w-xl text-slate text-pretty">
            Start with the job, not model settings. Decibyl can use the workspace context, hand the work to a bot, and prepare the setup or action for review when confirmation is needed.
          </p>
        </div>
        <div className={`${styles.stage} p-5 sm:p-7`}>
          <div className="rounded-[18px] border border-ink/10 bg-ink px-5 py-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
            Every morning, review the open follow-up tasks and send me the exceptions on WhatsApp.
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ['01 · OWNER', '@operations'],
              ['02 · ROUTINE', 'Every morning'],
              ['03 · DELIVER', 'WhatsApp'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[18px] border border-ink/10 bg-white p-4 shadow-[0_20px_35px_-32px_rgba(0,0,0,.5)]">
                <p className="text-[10px] font-black tracking-[0.12em] text-slate">{label}</p>
                <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-[18px] border border-ink/10 bg-white p-4">
            <div><strong className="block text-sm">Routine ready to test</strong><span className="text-xs text-ink/60">A successful test is required before it runs unattended.</span></div>
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">Review</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
