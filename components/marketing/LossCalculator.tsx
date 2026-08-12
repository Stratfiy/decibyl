'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { starterPriceLabel } from '@/data/pricing';

/**
 * The conversion engine.
 *
 * We supply ZERO numbers — the visitor supplies their own and watches the loss
 * add up. A figure they calculated themselves is one they believe, and we've
 * claimed nothing we can't defend.
 */

export type CalcVariant = 'clinic' | 'd2c' | 'realestate';

type Field = {
  key: string;
  label: string;
  default: number;
  min: number;
  max: number;
  step: number;
  kind: 'slider' | 'number';
  unit?: '%' | '₹';
};

type Config = {
  id: CalcVariant;
  tab: string;
  fields: Field[];
  compute: (v: Record<string, number>) => { rows: { value: string; label: string }[]; monthly: number };
  monthlyLabel: string;
};

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

export const configs: Record<CalcVariant, Config> = {
  clinic: {
    id: 'clinic',
    tab: 'Clinic',
    fields: [
      { key: 'calls', label: 'Calls received per day', default: 40, min: 5, max: 300, step: 1, kind: 'slider' },
      { key: 'miss', label: "Share you miss or can't answer", default: 25, min: 0, max: 60, step: 1, kind: 'slider', unit: '%' },
      { key: 'book', label: 'Of those who reach you, share that books', default: 40, min: 10, max: 90, step: 1, kind: 'slider', unit: '%' },
      { key: 'value', label: 'Average value of one appointment', default: 800, min: 100, max: 25000, step: 50, kind: 'number', unit: '₹' },
    ],
    compute: (v) => {
      const missed = (v.calls * v.miss) / 100;
      const lost = (missed * v.book) / 100;
      return {
        rows: [
          { value: missed.toFixed(missed % 1 === 0 ? 0 : 1), label: 'calls missed per day' },
          { value: lost.toFixed(lost % 1 === 0 ? 0 : 1), label: 'appointments lost per day' },
        ],
        monthly: lost * v.value * 30,
      };
    },
    monthlyLabel: 'lost per month',
  },

  d2c: {
    id: 'd2c',
    tab: 'D2C · COD',
    fields: [
      { key: 'orders', label: 'Orders per day', default: 200, min: 10, max: 5000, step: 10, kind: 'slider' },
      { key: 'cod', label: 'Share paid cash on delivery', default: 60, min: 0, max: 100, step: 1, kind: 'slider', unit: '%' },
      { key: 'rto', label: 'Share of COD orders that come back (RTO)', default: 25, min: 0, max: 60, step: 1, kind: 'slider', unit: '%' },
      { key: 'cost', label: 'Cost of one failed delivery', default: 250, min: 50, max: 3000, step: 10, kind: 'number', unit: '₹' },
    ],
    compute: (v) => {
      const cod = (v.orders * v.cod) / 100;
      const failed = (cod * v.rto) / 100;
      return {
        rows: [
          { value: Math.round(cod).toLocaleString('en-IN'), label: 'COD orders per day' },
          { value: Math.round(failed).toLocaleString('en-IN'), label: 'come back undelivered per day' },
        ],
        monthly: failed * v.cost * 30,
      };
    },
    monthlyLabel: 'RTO cost per month',
  },

  realestate: {
    id: 'realestate',
    tab: 'Real estate',
    fields: [
      { key: 'leads', label: 'Portal leads per month', default: 300, min: 20, max: 5000, step: 10, kind: 'slider' },
      { key: 'cpl', label: 'What you pay for one lead', default: 900, min: 50, max: 10000, step: 50, kind: 'number', unit: '₹' },
      { key: 'cold', label: 'Share never contacted within an hour', default: 55, min: 0, max: 100, step: 1, kind: 'slider', unit: '%' },
    ],
    compute: (v) => {
      const cold = (v.leads * v.cold) / 100;
      return {
        rows: [
          { value: Math.round(cold).toLocaleString('en-IN'), label: 'leads that went cold' },
          { value: inr(v.leads * v.cpl), label: 'spent on leads per month' },
        ],
        monthly: cold * v.cpl,
      };
    },
    monthlyLabel: 'wasted lead spend per month',
  },
};

function useCountUp(target: number) {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      fromRef.current = target;
      setDisplay(target);
      return;
    }

    const from = fromRef.current;
    const start = performance.now();
    const DURATION = 250;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (target - from) * eased);
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      fromRef.current = target;
    };
  }, [target]);

  return display;
}

export function LossCalculator({
  variant = 'clinic',
  variants,
  vertical,
}: {
  variant?: CalcVariant;
  /** pass 2+ to render the tabbed homepage version */
  variants?: CalcVariant[];
  /** slug passed through to /book-a-demo so the lead lands pre-qualified */
  vertical?: string;
}) {
  const tabList = variants ?? [variant];
  const [active, setActive] = useState<CalcVariant>(tabList[0]);
  const config = configs[active];

  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(config.fields.map((f) => [f.key, f.default])),
  );

  useEffect(() => {
    setValues(Object.fromEntries(configs[active].fields.map((f) => [f.key, f.default])));
  }, [active]);

  const result = useMemo(() => {
    const filled = Object.fromEntries(
      config.fields.map((f) => [f.key, values[f.key] ?? f.default]),
    );
    return config.compute(filled);
  }, [config, values]);

  const animated = useCountUp(result.monthly);

  const demoHref = useMemo(() => {
    const params = new URLSearchParams();
    if (vertical) params.set('vertical', vertical);
    params.set('calc', active);
    params.set('monthly_loss', String(Math.round(result.monthly)));
    for (const [k, v] of Object.entries(values)) params.set(k, String(v));
    return `/book-a-demo?${params.toString()}`;
  }, [active, values, result.monthly, vertical]);

  return (
    <div className="rounded-panel bg-snow p-6 shadow-[var(--shadow-card)] sm:p-9">
      {tabList.length > 1 ? (
        <div role="tablist" aria-label="Calculator type" className="mb-8 flex flex-wrap gap-2">
          {tabList.map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={active === t}
              onClick={() => setActive(t)}
              className={`rounded-button px-4 py-2 text-[0.9375rem] font-medium transition-colors ${
                active === t
                  ? 'bg-vermilion text-white'
                  : 'border border-line bg-canvas text-slate hover:text-ink'
              }`}
            >
              {configs[t].tab}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(280px,380px)] lg:gap-14">
        {/* Output first in the DOM on mobile — pinned above the fold of the card */}
        <div className="order-2 lg:order-1">
          <div className="space-y-7">
            {config.fields.map((field) => (
              <FieldControl
                key={field.key}
                field={field}
                value={values[field.key] ?? field.default}
                onChange={(v) => setValues((prev) => ({ ...prev, [field.key]: v }))}
              />
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="rounded-card bg-canvas p-6">
            <dl className="space-y-3">
              {result.rows.map((row) => (
                <div key={row.label} className="flex items-baseline gap-3">
                  <dt className="t-data min-w-[4.5rem] text-right text-lg font-semibold text-ink tabular-nums">
                    {row.value}
                  </dt>
                  <dd className="text-[0.9375rem] text-slate">{row.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 border-t border-line pt-6">
              <p
                className="t-data text-[clamp(2rem,5vw,2.75rem)] leading-none font-semibold text-saffron-deep tabular-nums"
                aria-live="polite"
              >
                {inr(animated)}
              </p>
              <p className="t-caption mt-2 text-slate">{config.monthlyLabel}</p>
            </div>

            <p className="mt-6 text-[0.9375rem] text-slate">
              Starter costs {starterPriceLabel}/month.
            </p>
          </div>

          <Link
            href={demoHref}
            className="mt-5 inline-flex h-11 items-center justify-center gap-1.5 rounded-button bg-vermilion px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-sindoor"
          >
            Book a demo <span aria-hidden="true">→</span>
          </Link>

          <p className="t-caption mt-4 text-iron">
            An estimate based on the numbers you entered.
          </p>
        </div>
      </div>
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: number;
  onChange: (v: number) => void;
}) {
  const id = `calc-${field.key}`;
  const display =
    field.unit === '₹'
      ? inr(value)
      : field.unit === '%'
        ? `${value}%`
        : value.toLocaleString('en-IN');

  if (field.kind === 'number') {
    return (
      <div>
        <label htmlFor={id} className="flex items-baseline justify-between gap-4">
          <span className="text-[0.9375rem] font-medium text-ink">{field.label}</span>
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-input border border-line bg-canvas px-3 focus-within:border-vermilion">
          <span className="t-data text-slate">₹</span>
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={field.min}
            max={field.max}
            step={field.step}
            value={value}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (Number.isFinite(next)) onChange(Math.max(0, Math.min(field.max, next)));
            }}
            className="t-data w-full bg-transparent py-2.5 text-base outline-none"
          />
        </div>
      </div>
    );
  }

  const fill = ((value - field.min) / (field.max - field.min)) * 100;

  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4">
        <span className="text-[0.9375rem] font-medium text-ink">{field.label}</span>
        <span className="t-data text-sindoor tabular-nums">{display}</span>
      </label>
      <input
        id={id}
        type="range"
        className="slider mt-3"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ['--fill' as string]: `${fill}%` }}
      />
    </div>
  );
}
