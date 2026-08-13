'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { callVolumeOptions, type FormType } from '@/lib/schema';
import { topLevelVerticals } from '@/data/verticals';

/**
 * One form component, three variants. Attribution (UTMs, referrer, source page)
 * is read from the URL on mount — you'll want the cohorts in three months.
 *
 * Reading location in an effect rather than useSearchParams keeps every page
 * that embeds this form statically rendered.
 */

type Props = {
  variant: FormType;
  /** pre-tag the lead, e.g. from /solutions/clinics */
  vertical?: string;
  compact?: boolean;
};

const promises: Record<FormType, string> = {
  demo: 'We’ll call you back with a live agent — usually within the hour.',
  waitlist: 'Early access when self-serve opens. No other email from us.',
  contact: 'We’ll reply within one business day.',
};

/** ?topic= values used in CTAs across the site — keep in sync with every
 *  `/contact?topic=...` link. */
const topicLabels: Record<string, string> = {
  managed: 'Managed tier',
  security: 'Security question',
  referral: 'Referral program application',
  reseller: 'White-label reseller enquiry',
};

export function LeadForm({ variant, vertical, compact = false }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});
  const [attribution, setAttribution] = useState<Record<string, string>>({});
  const [prefill, setPrefill] = useState<{ vertical?: string; note?: string }>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const attr: Record<string, string> = {
      source_page: window.location.pathname,
      referrer: document.referrer || '',
    };
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const value = params.get(key);
      if (value) attr[key] = value;
    }
    setAttribution(attr);

    // Calculator hand-off: the visitor's own numbers arrive as query params, so
    // the lead lands pre-qualified with their volume estimate.
    const loss = params.get('monthly_loss');
    const calc = params.get('calc');
    const lossNote = loss
      ? `Estimated monthly loss from the ${calc ?? ''} calculator: ₹${Number(loss).toLocaleString('en-IN')}.`
      : undefined;

    // ?topic= hand-off from CTAs like /contact?topic=referral — starts the
    // message field with context instead of a blank box, same idea as the
    // calculator hand-off above.
    const topic = params.get('topic');
    const topicLabel = topic ? topicLabels[topic] : undefined;
    const topicNote = topicLabel ? `Re: ${topicLabel} — ` : undefined;

    setPrefill({ vertical: params.get('vertical') ?? vertical, note: topicNote ?? lossNote });
  }, [vertical]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError(null);
    setFieldErrors({});

    const form = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = { form_type: variant, ...attribution };
    form.forEach((value, key) => {
      if (typeof value === 'string' && value.length > 0) payload[key] = value;
    });
    if (!payload.company_website) payload.company_website = '';

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setFieldErrors(json.fieldErrors ?? {});
        setError(json.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('done');
    } catch {
      setError('Network error. Please try again, or email us directly.');
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-card border border-line bg-snow p-8">
        <p className="t-h3">Got it.</p>
        <p className="mt-2 text-slate">{promises[variant]}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? '' : 'rounded-card border border-line bg-snow p-6 sm:p-8'}>
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`company_website-${variant}`}>Company website</label>
        <input
          id={`company_website-${variant}`}
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5">
        {variant !== 'waitlist' ? (
          <Field
            label="Your name"
            name="name"
            autoComplete="name"
            required
            errors={fieldErrors.name}
          />
        ) : null}

        <Field
          label={variant === 'demo' ? 'Work email' : 'Email'}
          name="email"
          type="email"
          autoComplete="email"
          required
          errors={fieldErrors.email}
        />

        {variant === 'demo' ? (
          <>
            <Field
              label="Phone number we can call"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              errors={fieldErrors.phone}
            />
            <Field
              label="Company"
              name="company"
              autoComplete="organization"
              required
              errors={fieldErrors.company}
            />
          </>
        ) : null}

        {variant !== 'contact' ? (
          <SelectField
            label={variant === 'waitlist' ? 'What would you use it for? (optional)' : 'What do you need calls for?'}
            name="vertical"
            defaultValue={prefill.vertical}
            options={topLevelVerticals.map((v) => ({ value: v.slug, label: v.name }))}
            placeholder="Choose one"
          />
        ) : null}

        {variant === 'demo' ? (
          <SelectField
            label="Roughly how many calls a month?"
            name="call_volume"
            options={callVolumeOptions.map((v) => ({ value: v, label: v }))}
            placeholder="Choose one"
          />
        ) : null}

        {variant !== 'waitlist' ? (
          <div>
            <label htmlFor={`message-${variant}`} className="mb-1.5 block text-[0.9375rem] font-medium">
              {variant === 'contact' ? 'What can we help with?' : 'Anything we should know? (optional)'}
            </label>
            <textarea
              id={`message-${variant}`}
              name="message"
              rows={variant === 'contact' ? 5 : 3}
              required={variant === 'contact'}
              defaultValue={prefill.note}
              className="w-full rounded-input border border-line bg-canvas px-3 py-2.5 text-[0.9375rem] outline-none focus:border-vermilion"
            />
            {fieldErrors.message ? <FieldError>{fieldErrors.message[0]}</FieldError> : null}
          </div>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="mt-5 rounded-input bg-blush px-4 py-3 text-[0.9375rem] text-sindoor">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-button bg-vermilion px-6 font-medium text-white transition-colors hover:bg-sindoor disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending'
          ? 'Sending…'
          : variant === 'demo'
            ? 'Book a demo call'
            : variant === 'waitlist'
              ? 'Join the waitlist'
              : 'Send message'}
      </button>

      <p className="t-caption mt-4 text-iron">{promises[variant]}</p>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  errors?: string[];
}) {
  const id = `${name}-field`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.9375rem] font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={errors ? true : undefined}
        className="w-full rounded-input border border-line bg-canvas px-3 py-2.5 text-[0.9375rem] outline-none focus:border-vermilion"
      />
      {errors ? <FieldError>{errors[0]}</FieldError> : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder: string;
  defaultValue?: string;
}) {
  const id = `${name}-field`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.9375rem] font-medium">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue ?? ''}
        key={defaultValue ?? 'empty'}
        className="w-full rounded-input border border-line bg-canvas px-3 py-2.5 text-[0.9375rem] outline-none focus:border-vermilion"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p className="t-caption mt-1.5 text-sindoor">{children}</p>;
}
