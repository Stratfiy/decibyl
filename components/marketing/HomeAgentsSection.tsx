import { Section } from '@/components/ui/Section';

export function HomeAgentsSection() {
  return (
    <Section surface="canvas" ariaLabel="Ready agents">
      <div className="text-center">
        <p className="t-eyebrow text-sindoor">Give each agent a job</p>
        <h2 className="t-h2 mt-4">Start with the work you want off your plate.</h2>
        <p className="mt-4 text-slate">Pick a ready agent or describe your own job.</p>
      </div>
    </Section>
  );
}
