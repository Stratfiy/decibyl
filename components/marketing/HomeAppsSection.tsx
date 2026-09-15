import { Section } from '@/components/ui/Section';

export function HomeAppsSection() {
  return (
    <Section surface="white" ariaLabel="Connected apps">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">Uses your apps</p>
          <h2 className="t-h2 mt-4">It doesn’t stop at an answer.</h2>
          <p className="t-body-lg mt-5 text-slate">Agents can read the tools you already use, gather context, use workflows and ask before important actions.</p>
          <div className="mt-6 flex flex-wrap gap-2">{['CRM','Calendar','Email','Drive','WhatsApp','APIs','Webhooks'].map((x)=><span key={x} className="rounded-full border border-ink/10 bg-canvas px-3 py-2 text-xs font-bold text-ink/70">{x}</span>)}</div>
        </div>
        <div className="rounded-card bg-ink p-6 text-white">
          <p className="text-xs font-black tracking-[0.15em] text-white/45">ONE REQUEST</p>
          <p className="mt-3 text-xl font-bold">“Check Acme, follow up and update me.”</p>
          <div className="mt-6 space-y-3">
            <div className="rounded-2xl bg-white/5 p-4"><strong>✓ Read CRM</strong><p className="text-xs text-white/50">Latest deal + activity</p></div>
            <div className="rounded-2xl bg-white/5 p-4"><strong>✓ Recall memory</strong><p className="text-xs text-white/50">Dana approves annual plans</p></div>
            <div className="rounded-2xl bg-white/5 p-4"><strong>→ Send follow-up</strong><p className="text-xs text-white/50">Waiting for your approval</p></div>
          </div>
        </div>
      </div>
    </Section>
  );
}
