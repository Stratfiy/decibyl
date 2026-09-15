import { Section } from '@/components/ui/Section';

export function HomeAgentsSection() {
  return (
    <Section surface="canvas" ariaLabel="Ready agents">
      <div className="text-center">
        <p className="t-eyebrow text-sindoor">Give each agent a job</p>
        <h2 className="t-h2 mt-4">Start with the work you want off your plate.</h2>
        <p className="mt-4 text-slate">Pick a ready agent or describe your own job.</p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="rounded-card border border-ink/10 bg-white p-6"><h3 className="t-h3">Personal Assistant</h3><p className="mt-3 text-sm text-slate">Reminders, files, follow-ups and everyday admin.</p></article>
        <article className="rounded-card border border-ink/10 bg-white p-6"><h3 className="t-h3">Researcher</h3><p className="mt-3 text-sm text-slate">Track topics, competitors and changes that matter.</p></article>
        <article className="rounded-card border border-ink/10 bg-white p-6"><h3 className="t-h3">Voice Receptionist</h3><p className="mt-3 text-sm text-slate">Answer, book, verify and escalate calls.</p></article>
      </div>
    </Section>
  );
}
