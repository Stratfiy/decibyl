import { Section } from '@/components/ui/Section';

export function HomeMemorySection() {
  return (
    <Section surface="canvas" ariaLabel="Memory">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="t-eyebrow text-sindoor">Gets smarter as it works</p>
          <h2 className="t-h2 mt-4">It remembers what matters.</h2>
          <p className="t-body-lg mt-5 text-slate">Useful context from conversations, calls, documents and completed work can come back when it helps with the next task.</p>
          <p className="mt-4 text-sm text-slate">Correct it anytime. What Decibyl inferred can stay separate from facts you explicitly confirmed.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-card border border-ink/10 bg-white p-6"><h3 className="t-h3">People</h3><p className="mt-2 text-sm text-slate">Who matters and the context around them.</p></article>
          <article className="rounded-card border border-ink/10 bg-white p-6"><h3 className="t-h3">Decisions</h3><p className="mt-2 text-sm text-slate">What was decided, why and what changed later.</p></article>
          <article className="rounded-card border border-ink/10 bg-white p-6"><h3 className="t-h3">Preferences</h3><p className="mt-2 text-sm text-slate">How you like work done so it stops asking twice.</p></article>
          <article className="rounded-card border border-ink/10 bg-white p-6"><h3 className="t-h3">Documents</h3><p className="mt-2 text-sm text-slate">Important facts and dates from the files you use.</p></article>
        </div>
      </div>
    </Section>
  );
}
