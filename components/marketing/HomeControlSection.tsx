import { Section } from '@/components/ui/Section';

export function HomeControlSection() {
  return (
    <Section surface="white" ariaLabel="Human control">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">You stay in control</p>
          <h2 className="t-h2 mt-4">Let AI act. Set the limits.</h2>
          <p className="t-body-lg mt-5 text-slate">Agents can do the routine work while sensitive actions, memory and access stay visible and controllable.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-card bg-sage p-6"><h3 className="t-h3">Approve important actions</h3><p className="mt-2 text-sm text-ink/65">Let reads run and review writes before they happen.</p></div>
          <div className="rounded-card bg-mistblue p-6"><h3 className="t-h3">See what agents did</h3><p className="mt-2 text-sm text-ink/65">Keep calls, tasks and actions visible.</p></div>
          <div className="rounded-card bg-lilac p-6"><h3 className="t-h3">Control memory</h3><p className="mt-2 text-sm text-ink/65">Correct context and choose what should be remembered.</p></div>
          <div className="rounded-card bg-sand p-6"><h3 className="t-h3">Control access</h3><p className="mt-2 text-sm text-ink/65">Give each agent only the tools its job needs.</p></div>
        </div>
      </div>
    </Section>
  );
}
