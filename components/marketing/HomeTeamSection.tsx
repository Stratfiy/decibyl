import { Section } from '@/components/ui/Section';

export function HomeTeamSection() {
  return (
    <Section surface="canvas" ariaLabel="Agent teamwork">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">Agents can work together</p>
          <h2 className="t-h2 mt-4">Bigger jobs can use specialists.</h2>
          <p className="t-body-lg mt-5 text-slate">One agent can hand part of a job to another while you keep the work visible.</p>
        </div>
        <div className="rounded-card bg-mistblue p-6 sm:p-8">
          <p className="text-sm font-bold text-ink">“Prepare me for tomorrow’s sales meeting.”</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4"><p className="text-xs font-black text-slate">RESEARCHER</p><strong className="mt-2 block text-sm">Finds account updates</strong></div>
            <div className="rounded-2xl bg-white p-4"><p className="text-xs font-black text-slate">ACCOUNT AGENT</p><strong className="mt-2 block text-sm">Pulls relationship history</strong></div>
            <div className="rounded-2xl bg-white p-4"><p className="text-xs font-black text-slate">SALES AGENT</p><strong className="mt-2 block text-sm">Builds the meeting brief</strong></div>
          </div>
          <div className="mt-4 rounded-2xl bg-ink p-4 text-sm font-bold text-white">Finished briefing → ready for you</div>
        </div>
      </div>
    </Section>
  );
}
