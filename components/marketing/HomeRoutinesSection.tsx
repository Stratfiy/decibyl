import { Section } from '@/components/ui/Section';

export function HomeRoutinesSection() {
  return (
    <Section surface="white" ariaLabel="Routines">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">Runs without you</p>
          <h2 className="t-h2 mt-4">Turn repeat work into routines.</h2>
          <p className="t-body-lg mt-5 text-slate">Start work on a schedule or when something happens. No need to remember to prompt it again.</p>
        </div>
        <div className="space-y-3 rounded-card border border-ink/10 bg-canvas p-5 sm:p-7">
          <div className="rounded-2xl bg-white p-4"><strong className="text-sm">Every morning</strong><p className="mt-1 text-xs text-slate">Research competitors → summarize changes → send on WhatsApp</p></div>
          <div className="rounded-2xl bg-white p-4"><strong className="text-sm">When a lead arrives</strong><p className="mt-1 text-xs text-slate">Research → qualify → follow up → update CRM</p></div>
          <div className="rounded-2xl bg-white p-4"><strong className="text-sm">Every Friday</strong><p className="mt-1 text-xs text-slate">Collect updates → prepare weekly report</p></div>
        </div>
      </div>
    </Section>
  );
}
