import Link from 'next/link';
import { Container } from '@/components/ui/Section';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
 title: 'Decibyl Managed — Private & On-Premises AI Agent Deployment',
 description: 'Explore planned Decibyl Managed private-cloud and on-premises AI autopilot deployments, customer-controlled data, open-weight inference, security controls and enterprise support.',
 path: '/managed',
 keywords: ['on-premises AI agents','self-hosted AI agents enterprise','private AI deployment','enterprise AI agents India','private LLM deployment','managed open-weight models'],
 ogTitle: 'Decibyl Managed — Intelligence on your infrastructure',
});

export default function ManagedPage() {
 return <><section className="bg-[#f0f5f2] py-20 sm:py-32"><Container><div className="max-w-4xl">
 <p className="t-eyebrow">DECIBYL MANAGED · PLANNED ENTERPRISE OFFERING</p>
 <h1 className="mt-6 font-[var(--font-newsreader)] text-5xl font-normal leading-[1.05] tracking-[-.035em] sm:text-7xl">Your infrastructure. Your intelligence.</h1>
 <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600">For organizations that need greater control over data location, integrations and model execution, Decibyl Managed is our planned offering for customer-controlled infrastructure and dedicated enterprise operations.</p>
 <Link href="/contact" className="mt-9 inline-block rounded-xl bg-neutral-900 px-6 py-3 font-medium text-white">Discuss a private deployment →</Link>
 </div></Container></section>
 <section className="py-20"><Container><div className="grid gap-4 md:grid-cols-2">{[
 ['On-premises and private cloud','A deployment design for customer servers or a dedicated virtual private environment.'],
 ['Customer-controlled data','Configurable retention, access and isolation policies appropriate to the enterprise environment.'],
 ['Open-weight inference','A planned path for local inference and specialized model adaptations where hardware capacity allows.'],
 ['Operations and governance','Enterprise integrations, monitoring, maintenance, approval controls and agreed support procedures.']
 ].map(([h,t])=><article key={h} className="rounded-xl border border-neutral-200 bg-white p-7"><h2 className="text-xl font-semibold">{h}</h2><p className="mt-3 leading-7 text-neutral-600">{t}</p></article>)}</div>
 <div className="mt-10 max-w-3xl rounded-xl bg-[#f7f7f5] p-6"><h2 className="text-lg font-semibold">A practical deployment promise</h2><p className="mt-3 leading-7 text-neutral-600">Air-gapped execution would require all supporting components to run locally. We will not describe a deployment as fully offline if it depends on external model or telephony APIs. Cost and energy benefits will be measured rather than assumed.</p></div>
 </Container></section>
 <section className="bg-neutral-950 py-16 text-white"><Container><h2 className="text-3xl font-semibold">Help shape Decibyl Managed.</h2><p className="mt-4 max-w-xl text-white/70">We are discussing requirements with prospective design partners. Tell us about your data residency, hardware, security and integration needs.</p><Link href="/contact" className="mt-8 inline-block rounded-lg bg-white px-5 py-3 font-semibold text-neutral-950">Talk to our team →</Link></Container></section></>;
}
