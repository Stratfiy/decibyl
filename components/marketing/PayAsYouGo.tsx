'use client';

import { useMemo, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { USD_RATE, payAsYouGo, payAsYouGoRateInr } from '@/data/pricing';

const inr = (n: number) => '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
const usd = (n: number) => '$' + n.toLocaleString('en-US');

export function PayAsYouGo() {
  const { minSpendUsd, maxSpendUsd, minRateInr } = payAsYouGo;
  const [spendUsd, setSpendUsd] = useState(minSpendUsd);

  const { rate, minutes, savingsPct, fill } = useMemo(() => {
    const spendInr = spendUsd * USD_RATE;
    const r = payAsYouGoRateInr(spendUsd);
    return {
      rate: r,
      minutes: Math.round(spendInr / r),
      savingsPct: Math.round((1 - r / minRateInr) * 100),
      fill: ((spendUsd - minSpendUsd) / (maxSpendUsd - minSpendUsd)) * 100,
    };
  }, [spendUsd, minSpendUsd, maxSpendUsd, minRateInr]);

  return (
    <div className="rounded-panel bg-snow p-6 shadow-[var(--shadow-card)] sm:p-9">
      <p className="t-eyebrow text-sindoor">{payAsYouGo.headline}</p>
      <h3 className="t-h2 mt-3">
        Starting at {inr(minRateInr)}
        <span className="t-data ml-1 font-normal text-slate">/min</span>
      </h3>
      <p className="mt-3 max-w-xl text-slate">{payAsYouGo.body}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(260px,340px)] lg:gap-12">
        <div>
          <label htmlFor="payg-spend" className="flex items-baseline justify-between gap-4">
            <span className="text-[0.9375rem] font-medium text-ink">Top-up amount</span>
            <span className="t-data text-sindoor tabular-nums">{usd(spendUsd)}</span>
          </label>
          <input
            id="payg-spend"
            type="range"
            className="slider mt-3"
            min={minSpendUsd}
            max={maxSpendUsd}
            step={5}
            value={spendUsd}
            onChange={(e) => setSpendUsd(Number(e.target.value))}
            style={{ ['--fill' as string]: `${fill}%` }}
          />
          <div className="t-caption mt-2 flex justify-between text-iron">
            <span>{usd(minSpendUsd)}</span>
            <span>{usd(maxSpendUsd)}</span>
          </div>
        </div>

        <div className="rounded-card bg-canvas p-6">
          <dl className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[0.9375rem] text-slate">Rate</dt>
              <dd className="t-data font-semibold text-ink tabular-nums">{inr(rate)}/min</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[0.9375rem] text-slate">Minutes</dt>
              <dd className="t-data font-semibold text-ink tabular-nums">
                {minutes.toLocaleString('en-IN')}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[0.9375rem] text-slate">Savings vs. entry rate</dt>
              <dd className="t-data font-semibold text-forest tabular-nums">{savingsPct}%</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8">
        <ButtonLink href="/book-a-demo?tier=payg" variant="secondary">
          Top up and start calling
        </ButtonLink>
      </div>
    </div>
  );
}
