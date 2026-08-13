'use client';

import { useMemo, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { referralProgram } from '@/data/referral';

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

/**
 * Your numbers, not ours — same rule as the homepage loss calculator.
 * We supply zero example figures; the visitor moves the sliders.
 */
export function ReferralCalculator() {
  const [clients, setClients] = useState(5);
  const [avgSpend, setAvgSpend] = useState(9999);

  const { bonus, ongoingMonthly, roughAnnual } = useMemo(() => {
    const totalSpend = clients * avgSpend;
    const b = totalSpend * (referralProgram.firstTopUpPct / 100);
    const ongoing = totalSpend * (referralProgram.ongoingPct / 100);
    return { bonus: b, ongoingMonthly: ongoing, roughAnnual: b + ongoing * 12 };
  }, [clients, avgSpend]);

  return (
    <div className="rounded-panel bg-snow p-6 shadow-[var(--shadow-card)] sm:p-9">
      <p className="t-eyebrow text-sindoor">Your numbers, not ours</p>
      <h3 className="t-h2 mt-3 text-[1.5rem] sm:text-[1.75rem]">
        What {referralProgram.firstTopUpPct}% + {referralProgram.ongoingPct}% actually adds up to.
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
            <label htmlFor="ref-spend" className="flex items-baseline justify-between gap-4">
              <span className="text-[0.9375rem] font-medium text-ink">
                What each one pays Decibyl per month
              </span>
              <span className="t-data text-sindoor tabular-nums">{inr(avgSpend)}</span>
            </label>
            <input
              id="ref-spend"
              type="range"
              className="slider mt-3"
              min={2999}
              max={75000}
              step={500}
              value={avgSpend}
              onChange={(e) => setAvgSpend(Number(e.target.value))}
              style={{ ['--fill' as string]: `${((avgSpend - 2999) / (75000 - 2999)) * 100}%` }}
            />
            <div className="t-caption mt-2 flex justify-between text-iron">
              <span>Starter</span>
              <span>Managed</span>
            </div>
          </div>
        </div>

        <div className="rounded-card bg-canvas p-6">
          <dl className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[0.9375rem] text-slate">One-time bonus, this batch</dt>
              <dd className="t-data font-semibold text-ink tabular-nums">{inr(bonus)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[0.9375rem] text-slate">Every month after that</dt>
              <dd className="t-data font-semibold text-ink tabular-nums">{inr(ongoingMonthly)}</dd>
            </div>
          </dl>
          <div className="mt-5 border-t border-line pt-5">
            <p className="t-data text-[1.5rem] font-semibold text-forest tabular-nums">
              {inr(roughAnnual)}
            </p>
            <p className="t-caption mt-1 text-iron">rough first-year total, if none of them churn</p>
          </div>
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
