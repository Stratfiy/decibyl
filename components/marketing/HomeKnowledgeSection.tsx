import { Section } from '@/components/ui/Section';

export function HomeKnowledgeSection() {
  return (
    <Section surface="canvas" ariaLabel="Knowledge and documents">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="t-eyebrow text-sindoor">Give it your knowledge</p>
          <h2 className="t-h2 mt-4">Your documents become working context.</h2>
          <p className="t-body-lg mt-5 text-slate">Let agents search files, answer from your knowledge, extract useful fields and use that context while doing the job.</p>
          <div className="mt-6 flex flex-wrap gap-2">{['PDFs','Drive','Knowledge base','OCR','Extraction','Search','Important dates'].map((x)=><span key={x} className="rounded-full border border-ink/10 bg-white px-3 py-2 text-xs font-bold text-ink/70">{x}</span>)}</div>
        </div>
        <div className="rounded-card border border-ink/10 bg-white p-6">
          <div className="rounded-2xl bg-canvas p-4"><strong className="text-sm">Vendor-contract.pdf</strong><p className="mt-1 text-xs text-slate">Uploaded to workspace knowledge</p></div>
          <div className="my-3 text-center text-slate">↓</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-lilac p-4"><p className="text-xs font-black text-slate">EXTRACTED</p><strong className="mt-2 block text-sm">Renewal · 12 Nov</strong></div>
            <div className="rounded-2xl bg-sage p-4"><p className="text-xs font-black text-slate">READY TO USE</p><strong className="mt-2 block text-sm">Available to your agents</strong></div>
          </div>
        </div>
      </div>
    </Section>
  );
}
