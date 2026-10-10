import Link from 'next/link';
import { Container } from '@/components/ui/Section';

const products = [
  { number: '01', name: 'Decibyl Cloud', status: 'Invite-only MVP', title: 'Your work, on autopilot.', body: 'Build personalized autopilots that use connected apps, voice and chat to handle recurring work with approvals when needed.', href: '/platform', action: 'Explore Cloud' },
  { number: '02', name: 'Decibyl Intelligence', status: 'In development', title: 'Intelligence that learns your work.', body: 'Our research roadmap: fine-tuned open-weight models and customer-specific adaptation from consented actions, corrections and verified outcomes.', href: '/intelligence', action: 'Explore the research' },
  { number: '03', name: 'Decibyl Managed', status: 'Planned enterprise offering', title: 'Private by design.', body: 'Bring autopilots to customer-controlled cloud or on-premises infrastructure, with deployment management, governance and enterprise support.', href: '/managed', action: 'Explore private deployment' },
  { number: '04', name: 'Decibyl Node', status: 'Long-term vision', title: 'Intelligence you can own.', body: 'We may eventually bring personalized intelligence to dedicated local hardware, subject to customer demand and technical feasibility.', href: '/intelligence#future', action: 'See our vision' },
];

export function ProductEcosystem() {
 return <section aria-labelledby="ecosystem-heading" className="border-y border-black/10 bg-[#fbfaf9] py-20 sm:py-28"><Container>
  <div className="mb-10 max-w-3xl">
   <p className="t-eyebrow text-neutral-500">THE DECIBYL ECOSYSTEM</p>
   <h2 id="ecosystem-heading" className="mt-4 font-[var(--font-newsreader)] text-4xl font-normal tracking-[-.035em] text-neutral-950 sm:text-6xl">From work autopilots to intelligence that grows with you.</h2>
   <p className="mt-5 text-base leading-relaxed text-neutral-600">One vision, developed in stages. Start with useful automation today, build customer-specific learning next, and bring intelligence closer to its owner over time.</p>
  </div>
  <div className="grid gap-4 md:grid-cols-2">
   {products.map((p,i)=><article key={p.number} className={`rounded-2xl border border-neutral-200 p-7 sm:p-9 ${i===1?'bg-[#eee8f3]':i===2?'bg-[#eaf3ef]':'bg-white'}`}>
    <div className="mb-8 flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-bold tracking-[.15em] text-neutral-500">{p.number} / {p.name.toUpperCase()}</span><span className="rounded-full border border-neutral-300/80 px-3 py-1 text-xs text-neutral-600">{p.status}</span></div>
    <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">{p.title}</h3>
    <p className="mt-3 max-w-lg text-sm leading-7 text-neutral-600">{p.body}</p>
    <Link href={p.href} className="mt-8 inline-flex items-center gap-2 border-b border-neutral-800 pb-1 text-sm font-semibold text-neutral-900">{p.action} <span aria-hidden="true">↗</span></Link>
   </article>)}
  </div>
 </Container></section>;
}
