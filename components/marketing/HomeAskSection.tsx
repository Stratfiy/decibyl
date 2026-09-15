import { Section } from '@/components/ui/Section';

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
        <div className="rounded-card border border-ink/10 bg-canvas p-5 sm:p-7">
          <div className="rounded-2xl bg-white p-4 text-sm font-semibold text-ink shadow-sm">
            Research our top competitors every morning and send me what changed on WhatsApp.
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-ink/10 bg-white p-4"><p className="text-xs font-black tracking-[0.12em] text-slate">RESEARCH</p><p className="mt-2 text-sm font-bold text-ink">Web + sources</p></div>
            <div className="rounded-2xl border border-ink/10 bg-white p-4"><p className="text-xs font-black tracking-[0.12em] text-slate">ROUTINE</p><p className="mt-2 text-sm font-bold text-ink">Every morning</p></div>
            <div className="rounded-2xl border border-ink/10 bg-white p-4"><p className="text-xs font-black tracking-[0.12em] text-slate">DELIVER</p><p className="mt-2 text-sm font-bold text-ink">WhatsApp</p></div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-sage p-4">
            <div><strong className="block text-sm">Research agent ready</strong><span className="text-xs text-ink/60">Runs tomorrow at 8:00 AM</span></div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink">Active</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
