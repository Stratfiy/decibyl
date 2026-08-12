'use client';

import Link from 'next/link';
import { useState } from 'react';
import { tiers, tierPrice, managedTiersLive, type Tier } from '@/data/pricing';

/** All numbers come from data/pricing.ts. Never hardcode a price here. */

type Currency = 'inr' | 'usd';

const rows: { label: string; value: (t: Tier) => string }[] = [
  { label: 'Minutes included', value: (t) => t.minutes },
  { label: 'Overage', value: (t) => (t.overageInr === null ? 'TBD' : `₹${t.overageInr}/min`) },
  { label: 'Telephony', value: () => 'Included' },
  { label: 'Phone number', value: (t) => t.phoneNumbers },
  { label: 'Languages', value: () => 'All 7' },
  { label: 'Models', value: (t) => t.models },
  { label: 'Concurrent calls', value: (t) => t.concurrentCalls },
  { label: 'Campaigns', value: (t) => (t.campaigns ? '✓' : '—') },
  { label: 'Human transfer', value: () => '✓' },
  { label: 'Calendar / email tools', value: () => '✓' },
  { label: 'QA scoring', value: () => '✓' },
  { label: 'Support', value: (t) => t.support },
];

export function PricingTable() {
  const [currency, setCurrency] = useState<Currency>('inr');

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="t-caption text-iron">
          All prices exclusive of 18% GST.
          {currency === 'usd' ? ' USD shown as an indicative conversion; billing is in INR.' : ''}
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

      {/* Cards — the mobile and scanning view */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => (
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
              {tier.priceInr !== null ? (
                <span
                  className={`t-data ml-1 font-normal ${tier.featured ? 'text-white/60' : 'text-slate'}`}
                >
                  /mo
                </span>
              ) : null}
            </p>
            <p className={`mt-2 text-[0.9375rem] ${tier.featured ? 'text-white/70' : 'text-slate'}`}>
              {tier.tagline}
            </p>

            <ul
              className={`mt-6 space-y-2 text-[0.9375rem] ${tier.featured ? 'text-white/75' : 'text-slate'}`}
            >
              <li>{tier.minutes} minutes included</li>
              <li>{tier.phoneNumbers}</li>
              <li>{tier.concurrentCalls} concurrent calls</li>
              <li>{tier.support} support</li>
            </ul>

            <div className="mt-auto pt-7">
              {managedTiersLive || tier.id === 'enterprise' ? (
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
        ))}
      </div>

      {/* Full comparison table */}
      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">Feature comparison across Decibyl plans</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="t-eyebrow py-4 pr-6 text-iron">
                Feature
              </th>
              {tiers.map((t) => (
                <th key={t.id} scope="col" className="py-4 pr-6 text-[1.0625rem] font-semibold">
                  {t.name}
                  <span className="t-data block font-normal text-slate">
                    {tierPrice(t, currency)}
                    {t.priceInr !== null ? '/mo' : ''}
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
                {tiers.map((t) => (
                  <td key={t.id} className="t-data py-3.5 pr-6 text-ink">
                    {row.value(t)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-caption mt-5 text-iron">
        Overage rates are marked TBD until they are final. We would rather show TBD than publish a
        price we have to walk back.
      </p>
    </div>
  );
}
