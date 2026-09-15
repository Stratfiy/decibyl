'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  additionalNumberInr,
  formatInr,
  includedCallingCaption,
  outOfCreditCopy,
  tiers,
  type Tier,
} from '@/data/pricing';

const rows: { label: string; value: (t: Tier) => string }[] = [
  { label: 'Credits / month', value: (t) => t.id === 'free' ? 'Up to 1,000 to earn' : t.credits.toLocaleString('en-IN') },
  { label: 'Bots', value: (t) => t.bots },
  { label: 'Team members', value: (t) => t.teamMembers },
  { label: 'Routines', value: (t) => t.routines },
  { label: 'Knowledge pages', value: (t) => t.knowledgePages },
  { label: 'Builder messages', value: (t) => t.builderMessages },
  { label: 'Voice calls', value: (t) => t.voiceAllowed ? `${t.voiceCreditsPerMinute} credits/min` : '—' },
  { label: 'Phone numbers included', value: (t) => t.includedNumbers ? String(t.includedNumbers) : '—' },
  { label: 'Concurrent calls', value: (t) => t.concurrentCalls },
  { label: 'Campaign dials / day', value: (t) => t.campaignDials },
  { label: 'Knowledge storage', value: (t) => t.knowledgeStorage },
  { label: 'Max upload', value: (t) => t.maxUpload },
];

export function PricingTable() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">One shared credit balance for the work your bots do.</p>
          <p className="t-caption mt-1 text-iron">₹0.50 per credit · no seat licence · no separate per-minute platform fee.</p>
        </div>
        <div role="group" aria-label="Billing period" className="flex gap-1 rounded-button border border-line bg-snow p-1">
          <button type="button" onClick={() => setAnnual(false)} aria-pressed={!annual} className={`rounded-button px-4 py-1.5 text-[0.875rem] font-medium ${!annual ? 'bg-ink text-white' : 'text-slate'}`}>Monthly</button>
          <button type="button" onClick={() => setAnnual(true)} aria-pressed={annual} className={`rounded-button px-4 py-1.5 text-[0.875rem] font-medium ${annual ? 'bg-ink text-white' : 'text-slate'}`}>Yearly · 2 months free</button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {tiers.map((tier) => {
          const price = annual && tier.annualPriceInr != null ? tier.annualPriceInr : tier.priceInr;
          const suffix = annual && tier.annualPriceInr != null ? '/yr' : '/mo';
          return (
            <article key={tier.id} className={`flex flex-col rounded-card p-6 ${tier.featured ? 'bg-ink text-white' : 'border border-line bg-snow'}`}>
              <p className={`t-eyebrow ${tier.featured ? 'text-white/55' : 'text-iron'}`}>{tier.name}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">
                {formatInr(price)}<span className={`ml-1 text-xs font-normal ${tier.featured ? 'text-white/55' : 'text-iron'}`}>{suffix}</span>
              </p>
              {tier.id === 'everyday' ? <p className={`mt-1 text-xs ${tier.featured ? 'text-white/55' : 'text-iron'}`}>$10/month outside India</p> : null}
              <p className={`mt-4 min-h-16 text-sm leading-relaxed ${tier.featured ? 'text-white/70' : 'text-slate'}`}>{tier.tagline}</p>
              <ul className={`mt-5 space-y-2 text-sm ${tier.featured ? 'text-white/75' : 'text-slate'}`}>
                {(tier.bullets ?? []).slice(0, 6).map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
              <div className="mt-auto pt-6">
                <Link href={tier.cta.href} className={`inline-flex h-11 w-full items-center justify-center rounded-button px-4 text-sm font-semibold ${tier.featured ? 'bg-white text-ink' : 'bg-ink text-white'}`}>{tier.cta.label}</Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left">
          <caption className="sr-only">Decibyl plan comparison</caption>
          <thead>
            <tr className="border-b border-line">
              <th className="t-eyebrow py-4 pr-5 text-iron">Included</th>
              {tiers.map((tier) => <th key={tier.id} className="py-4 pr-5 text-base font-semibold">{tier.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-line">
                <th className="py-3.5 pr-5 text-sm font-medium text-slate">{row.label}</th>
                {tiers.map((tier) => <td key={tier.id} className="t-data py-3.5 pr-5 text-ink">{row.value(tier)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate md:grid-cols-2">
        <p>{includedCallingCaption}</p>
        <p>{outOfCreditCopy}</p>
        <p>Plan credits expire at the end of the cycle. Top-up credits do not expire.</p>
        <p>Numbers beyond your included allowance are {formatInr(additionalNumberInr)}/month each, drawn from credit.</p>
      </div>
      <p className="t-caption mt-5 text-iron">Prices exclude 18% GST. Business and above require billing details/GSTIN for the business invoice.</p>
    </div>
  );
}
