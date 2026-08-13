'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import {
  payAsYouGo,
  payAsYouGoMaxPrepayInr,
  payAsYouGoMinPrepayInr,
  payAsYouGoRateInr,
} from '@/data/pricing';

const inr = (n: number) => '₹' + n.toLocaleString('en-IN');
/** Rates always show two decimals — ₹5.30, not ₹5.3 — to match the
 *  published tier-stop figures everywhere else on the site. */
const inrRate = (n: number) =>
  '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Log-scale slider: the prepay range spans ~₹3K to ~₹19L, a ~630× range —
 *  a linear slider would squeeze the SMB end (where most buyers actually
 *  are) into a sliver. Position 0–100 maps geometrically instead. */
const logMin = Math.log(payAsYouGoMinPrepayInr);
const logMax = Math.log(payAsYouGoMaxPrepayInr);
const posToPrepay = (pos: number) => Math.round(Math.exp(logMin + (pos / 100) * (logMax - logMin)));
const prepayToPos = (prepay: number) => ((Math.log(prepay) - logMin) / (logMax - logMin)) * 100;

export function PayAsYouGo() {
  // Defaults to the entry stop — ceiling-down framing, never pre-loaded at
  // the best rate.
  const [pos, setPos] = useState(0);

  const { prepay, rate, minutes } = useMemo(() => {
    const p = posToPrepay(pos);
    const r = payAsYouGoRateInr(p);
    return { prepay: p, rate: r, minutes: Math.round(p / r) };
  }, [pos]);

  return (
    <div className="rounded-panel bg-snow p-6 shadow-[var(--shadow-card)] sm:p-9">
      <p className="t-eyebrow text-sindoor">{payAsYouGo.headline}</p>
      <h3 className="t-h2 mt-3 max-w-2xl text-[1.5rem] leading-snug sm:text-[1.75rem]">
        {payAsYouGo.headlineCopy}
      </h3>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(260px,340px)] lg:gap-12">
        <div>
          <label htmlFor="payg-prepay" className="flex items-baseline justify-between gap-4">
            <span className="text-[0.9375rem] font-medium text-ink">Prepay amount</span>
            <span className="t-data text-sindoor tabular-nums">{inr(prepay)}</span>
          </label>
          <input
            id="payg-prepay"
            type="range"
            className="slider mt-3"
            min={0}
            max={100}
            step={0.5}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            style={{ ['--fill' as string]: `${pos}%` }}
          />
          <div className="t-caption mt-2 flex justify-between text-iron">
            {payAsYouGo.tierStops.map((stop) => (
              <span
                key={stop.prepayInr}
                className="cursor-pointer hover:text-sindoor"
                onClick={() => setPos(prepayToPos(stop.prepayInr))}
              >
                {inr(stop.prepayInr)}
              </span>
            ))}
          </div>
          <p className="t-caption mt-4 text-iron">{payAsYouGo.underSlider}</p>
        </div>

        <div className="rounded-card bg-canvas p-6">
          <dl className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[0.9375rem] text-slate">Rate at this prepay</dt>
              <dd className="t-data font-semibold text-ink tabular-nums">{inrRate(rate)}/min</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[0.9375rem] text-slate">Minutes</dt>
              <dd className="t-data font-semibold text-ink tabular-nums">
                {minutes.toLocaleString('en-IN')}
              </dd>
            </div>
          </dl>
          <p className="t-caption mt-4 border-t border-line pt-4 text-iron">
            {payAsYouGo.maxRateLabel}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ButtonLink href="/book-a-demo?tier=payg" variant="secondary">
          Prepay and start calling
        </ButtonLink>
        <p className="text-[0.9375rem] text-slate">
          {payAsYouGo.committedNote}{' '}
          <Link
            href={payAsYouGo.committedHref}
            className="text-sindoor underline-offset-4 hover:underline"
          >
            Talk to our team
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
