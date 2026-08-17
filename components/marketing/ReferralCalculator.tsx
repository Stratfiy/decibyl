'use client';

import { useMemo, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { referralProgram } from '@/data/referral';

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

/**
 * Your numbers, not ours — same rule as the homepage loss calculator.
 * We supply zero example figures; the visitor moves the sliders.
 *
 * Only the published 20%-of-first-recharge is calculated here. Ongoing
 * commission is deliberately not modelled — it isn't published, and
 * inventing a number for a calculator would be exactly the kind of claim
 * the rest of this site refuses to make.
 */
export function ReferralCalculator() {
  const [clients, setClients] = useState(5);
  const [firstRecharge, setFirstRecharge] = useState(9999);

  const earned = useMemo(
    () => clients * firstRecharge * (referralProgram.firstTopUpPct / 100),
    [clients, firstRecharge],
  );

  return (
    <div className="rounded-panel bg-snow p-6 shadow-[var(--shadow-card)] sm:p-9">
      <p className="t-eyebrow text-sindoor">Your numbers, not ours</p>
      <h3 className="t-h2 mt-3 text-[1.5rem] sm:text-[1.75rem]">
        What {referralProgram.firstTopUpPct}% of first recharge adds up to.
      </h3>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(260px,340px)] lg:gap-12">
        <div className="space-y-7">
          <div>
            <label htmlFor="ref-clients" className="flex items-baseline justify-between gap-4">
              <span className="text-[0.9375rem] font-medium text-ink">
                Businesses you can realistically refer
              </span>
              <span className="t-data text-sindoor tabular-nums">{clients}</span>
            </label>
            <input
              id="ref-clients"
              type="range"
              className="slider mt-3"
              min={1}
              max={50}
              step={1}
              value={clients}
              onChange={(e) => setClients(Number(e.target.value))}
              style={{ ['--fill' as string]: `${((clients - 1) / 49) * 100}%` }}
            />
          </div>
          <div>
            <label htmlFor="ref-recharge" className="flex items-baseline justify-between gap-4">
              <span className="text-[0.9375rem] font-medium text-ink">
                What each one recharges first
              </span>
              <span className="t-data text-sindoor tabular-nums">{inr(firstRecharge)}</span>
            </label>
            <input
              id="ref-recharge"
              type="range"
              className="slider mt-3"
              min={2999}
              max={75000}
              step={500}
              value={firstRecharge}
              onChange={(e) => setFirstRecharge(Number(e.target.value))}
              style={{ ['--fill' as string]: `${((firstRecharge - 2999) / (75000 - 2999)) * 100}%` }}
            />
            <div className="t-caption mt-2 flex justify-between text-iron">
              <span>Starter</span>
              <span>Custom</span>
            </div>
          </div>
        </div>

        <div className="rounded-card bg-canvas p-6">
          <p className="t-caption text-iron">You earn, on first recharge</p>
          <p className="t-data mt-2 text-[2rem] leading-none font-semibold text-forest tabular-nums">
            {inr(earned)}
          </p>
          <p className="t-caption mt-5 border-t border-line pt-5 text-iron">
            Ongoing commission on what they keep spending is agreed with you directly — it isn’t a
            fixed published rate.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <ButtonLink href={referralProgram.applyCta.href} size="lg">
          {referralProgram.applyCta.label}
        </ButtonLink>
      </div>
    </div>
  );
}
