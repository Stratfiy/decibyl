import type { Faq } from '@/data/faqs';

/** Native <details> — accessible and keyboard-navigable with no JS. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => (
        <details key={faq.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
            <span className="t-h3 text-[1.125rem] sm:text-[1.25rem]">{faq.q}</span>
            <span
              aria-hidden="true"
              className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-slate transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl pr-12 text-slate">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
