'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  additionalNumberInr,
  allTiers,
  formatCredits,
  formatInr,
  fromRateNote,
  includedCallingCaption,
  includedCallingLabel,
  managedTiersLive,
  outOfCreditCopy,
  publishedComparisonCallout,
  tierPrice,
  tiers,
  voiceRateInr,
  type Tier,
} from '@/data/pricing';

/** All numbers come from data/pricing.ts. Never hardcode a price here. */

type Currency = 'inr' | 'usd';

function minutesLabel(minutes: number): string {
  if (minutes >= 24 * 60) return `${minutes / (24 * 60)} day`;
  if (minutes >= 60) return `${minutes / 60} hour`;
  return `${minutes} min`;
}

const rows: { label: string; value: (t: Tier) => string }[] = [
  { label: 'Credits a month', value: (t) => (t.id === 'free' ? '1,000 once' : t.credits.toLocaleString('en-IN')) },
  { label: 'What that is', value: (t) => includedCallingLabel(t) },
  { label: 'Phone line', value: (t) => (t.voice ? t.phoneNumbers : 'Text channels only') },
  {
    label: 'Voice minute, Everyday voice',
    value: (t) => (t.voiceCreditsPerMinute ? `${t.voiceCreditsPerMinute} credits · ₹${voiceRateInr(t)?.toFixed(2)}` : '—'),
  },
  { label: 'Past plan credits', value: (t) => (t.id === 'scale' ? 'Same rate' : t.voice ? 'One credit more a minute' : 'Top-up rates') },
  { label: 'Additional number', value: (t) => (t.voice ? `${formatInr(additionalNumberInr)}/mo each` : '—') },
  { label: 'Bots', value: (t) => formatCredits(t.caps.bots) },
  { label: 'Team members', value: (t) => formatCredits(t.caps.teamMembers) },
  { label: 'Concurrent calls', value: (t) => (t.voice ? String(t.caps.concurrentCalls) : '—') },
  { label: 'Campaign dials a day', value: (t) => (t.voice ? t.caps.campaignDialsPerDay.toLocaleString('en-IN') : '—') },
  { label: 'Routines', value: (t) => `${formatCredits(t.caps.routines)} · every ${minutesLabel(t.caps.routineMinIntervalMinutes)}` },
  { label: 'Knowledge pages', value: (t) => t.caps.knowledgePages.toLocaleString('en-IN') },
  { label: 'Single upload', value: (t) => (t.caps.singleUploadMb >= 1024 ? '1 GB' : `${t.caps.singleUploadMb} MB`) },
  { label: 'Builder messages a month', value: (t) => formatCredits(t.caps.builderMessages) },
  { label: 'Builder voice minutes a month', value: (t) => formatCredits(t.caps.builderVoiceMinutes) },
  { label: 'Desktop companion', value: (t) => (t.caps.desktopStepsPerTask ? `${t.caps.desktopStepsPerTask} steps a task` : '—') },
  { label: 'Recording retention', value: (t) => `${t.caps.recordingRetentionDays} days` },
  { label: 'API rate limit', value: (t) => `${t.caps.apiRequestsPerMinute.toLocaleString('en-IN')}/min` },
  { label: 'Languages', value: () => 'All Indian, +' },
  { label: 'Human handoff', value: () => '✓' },
  { label: 'DPDP consent + India residency', value: () => '✓' },
  { label: 'Annual, 10 for 12', value: (t) => (t.annualPriceInr ? `${formatInr(t.annualPriceInr)}/yr` : '—') },
  { label: 'Support', value: (t) => t.support },
];

export function PricingTable() {
  const [currency, setCurrency] = useState<Currency>('inr');

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="t-caption text-iron">
          All prices exclusive of 18% GST.
          {currency === 'usd'
            ? ' Everyday has a published dollar price; other dollar figures are indicative and billed in INR.'
            : ''}
        </p>
        <div role="group" aria-label="Currency" className="flex gap-1 rounded-button border border-line bg-snow p-1">
          {(['inr', 'usd'] as Currency[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              aria-pressed={currency === c}
              className={`rounded-button px-4 py-1.5 text-[0.875rem] font-medium transition-colors ${
                currency === c ? 'bg-vermilion text-white' : 'text-slate hover:text-ink'
              }`}
            >
              {c === 'inr' ? '₹ INR' : '$ USD'}
            </button>
          ))}
        </div>
      </div>

      {/* Cards — the mobile and scanning view. The four plans on sale. */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => {
          const bullets =
            tier.bullets ?? [
              includedCallingLabel(tier),
              tier.phoneNumbers,
              `${formatCredits(tier.caps.bots)} bots · ${tier.caps.knowledgePages.toLocaleString('en-IN')} knowledge pages`,
              `${tier.caps.concurrentCalls} concurrent calls · ${tier.caps.campaignDialsPerDay.toLocaleString('en-IN')} dials a day`,
              `${tier.support} support`,
            ];

          return (
            <div
              key={tier.id}
              className={`flex flex-col rounded-card p-7 ${
                tier.featured ? 'bg-ink text-white' : 'border border-line bg-snow'
              }`}
            >
              <p className={`t-eyebrow ${tier.featured ? 'text-ember' : 'text-sindoor'}`}>
                {tier.name}
              </p>
              <p className="t-h2 mt-3 text-[2rem]">
                {tierPrice(tier, currency)}
                <span className={`t-data ml-1 font-normal ${tier.featured ? 'text-white/60' : 'text-slate'}`}>
                  /mo
                </span>
              </p>
              <p className={`mt-2 text-[0.9375rem] ${tier.featured ? 'text-white/70' : 'text-slate'}`}>
                {tier.tagline}
              </p>

              <ul className={`mt-6 space-y-2 text-[0.9375rem] ${tier.featured ? 'text-white/75' : 'text-slate'}`}>
                {bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              {tier.note ? (
                <p
                  className={`mt-5 border-t pt-4 text-[0.875rem] italic ${
                    tier.featured ? 'border-white/15 text-white/60' : 'border-line text-iron'
                  }`}
                >
                  {tier.note}
                </p>
              ) : null}

              <div className="mt-auto pt-7">
                {managedTiersLive || !tier.voice ? (
                  <Link
                    href={tier.cta.href}
                    className={`inline-flex h-11 w-full items-center justify-center rounded-button px-5 text-[0.9375rem] font-medium transition-colors ${
                      tier.featured
                        ? 'bg-snow text-sindoor hover:bg-peach'
                        : 'bg-vermilion text-white hover:bg-sindoor'
                    }`}
                  >
                    {tier.cta.label}
                  </Link>
                ) : (
                  <Link
                    href={`/waitlist?tier=${tier.id}`}
                    className="inline-flex h-11 w-full items-center justify-center rounded-button border border-line px-5 text-[0.9375rem] font-medium"
                  >
                    Opening soon — join waitlist
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Published-price comparison — verifiable, dated. Update or remove if the
          competitor's page changes; never leave a stale claim up. */}
      <div className="mt-6 rounded-card border border-line bg-snow p-6">
        <p className="text-[0.9375rem] text-ink">{publishedComparisonCallout.text}</p>
        <p className="t-caption mt-1 text-iron">{publishedComparisonCallout.source}</p>
      </div>

      {/* Full comparison table, Free included */}
      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[880px] border-collapse text-left">
          <caption className="sr-only">Every plan, every cap, side by side</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="t-eyebrow py-4 pr-6 text-iron">
                Plan
              </th>
              {allTiers.map((t) => (
                <th key={t.id} scope="col" className="py-4 pr-6 text-[1.0625rem] font-semibold">
                  {t.name}
                  <span className="t-data block font-normal text-slate">
                    {tierPrice(t, currency)}/mo
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-line">
                <th scope="row" className="py-3.5 pr-6 text-[0.9375rem] font-medium text-slate">
                  {row.label}
                </th>
                {allTiers.map((t) => (
                  <td key={t.id} className="t-data py-3.5 pr-6 text-ink">
                    {row.value(t)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-caption mt-5 text-iron">{includedCallingCaption}</p>
      <p className="t-caption mt-2 text-iron">{outOfCreditCopy}</p>
      <p className="t-caption mt-2 text-iron">{fromRateNote}</p>
      <p className="t-caption mt-2 text-iron">
        Concurrency, dial and rate caps are the figures we start on; they move up with capacity. A cap you hit shows the plan that lifts it.
      </p>
    </div>
  );
}
