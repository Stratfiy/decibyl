import Link from 'next/link';
import { Container } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
 title: 'Decibyl Intelligence — Personalized Open-Weight Model Research',
 description: 'Discover Decibyl Intelligence: our roadmap for specialized open-weight AI models that improve through user-approved feedback, work context and verified outcomes. In development.',
 path: '/intelligence',
 keywords: ['personalized AI models','self-learning AI agents','open-weight language models','fine-tuned AI models','continual learning agents','AI model personalization'],
 ogTitle: 'Decibyl Intelligence — Intelligence that learns your work',
});

export default function IntelligencePage() {
 return <><section className="bg-[#faf9fc] py-20 sm:py-32"><Container><div className="max-w-4xl">
  <p className="t-eyebrow text-neutral-600">DECIBYL INTELLIGENCE · IN DEVELOPMENT</p>
  <h1 className="mt-6 font-[var(--font-newsreader)] text-5xl font-normal leading-[1.05] tracking-[-.035em] text-neutral-950 sm:text-7xl">Intelligence that learns how you work.</h1>
  <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600">General-purpose models are powerful. But your workflows, decisions and preferences are uniquely yours. We are developing a personalized learning layer and specialized open-weight models that can improve through consented, verified experience.</p>
  <div className="mt-9 flex flex-wrap gap-3"><Link href="/waitlist" className="rounded-xl bg-neutral-900 px-6 py-3 font-medium text-white">Join early access →</Link><Link href="/platform" className="rounded-xl border border-neutral-300 bg-white px-6 py-3 font-medium text-neutral-900">See Decibyl Cloud</Link></div>
 </div></Container></section>
 <section className="py-20"><Container><div className="grid gap-12 lg:grid-cols-2"><div><p className="t-eyebrow">THE LEARNING LOOP</p><h2 className="t-h2 mt-4">Feedback should improve the next task.</h2><p className="mt-5 leading-8 text-neutral-600">We plan to capture explicitly approved actions, corrections and measured outcomes; validate what they teach; update memory or specialized skills; and train model adapters only when enough reliable data exists.</p></div>
 <div className="space-y-3">{['01 · Execute useful work with permission','02 · Capture corrections and verified outcomes','03 · Curate learning data and run evaluations','04 · Update versioned memory, skills or model adapters','05 · Deploy improvements with rollback safeguards'].map(x=><div className="rounded-xl border border-neutral-200 bg-[#f8f8f7] p-5 text-sm font-medium" key={x}>{x}</div>)}</div></div></Container></section>
 <section className="border-y border-neutral-200 bg-[#f6f3f8] py-20"><Container><h2 className="t-h2">What are we building—and what is still research?</h2><div className="mt-9 grid gap-4 sm:grid-cols-3">{[{h:'Cloud product today',t:'Context-aware work autopilots, tool use, voice and workflows. Actual feature availability depends on the deployed MVP.'},{h:'Next: specialized models',t:'Fine-tuning open-weight models and adapters using appropriately authorized, validated examples, with objective benchmarks.'},{h:'Longer term: continual learning',t:'Customer-specific models that safely improve over time while guarding against forgetting, unsafe updates and privacy leaks.'}].map(x=><article key={x.h} className="rounded-xl bg-white p-6"><h3 className="font-semibold">{x.h}</h3><p className="mt-3 text-sm leading-7 text-neutral-600">{x.t}</p></article>)}</div></Container></section>
 <section id="future" className="py-20"><Container><h2 className="t-h2">Designed for portability—not one model vendor.</h2><p className="mt-5 max-w-3xl leading-8 text-neutral-600">Our goal is for customer-owned memories, authorized training records and specialized work patterns to remain useful as models evolve. We aim to support cloud inference, private enterprise environments and, if demand warrants it, a future Decibyl Node device. These are roadmap ambitions, not currently released hardware or trained-model claims.</p><Link className="mt-6 inline-block font-semibold underline underline-offset-4" href="/managed">Explore Decibyl Managed →</Link></Container></section></>;
}
