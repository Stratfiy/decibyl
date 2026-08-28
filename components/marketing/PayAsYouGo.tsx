import Link from 'next/link';
import { credits } from '@/data/pricing';

/**
 * Credits, without a rate slider.
 *
 * This was a prepay ladder — drag a slider from ₹2,999 to ₹19,00,000 and watch
 * a per-minute rate fall from ₹5.30 to ₹4.20. It was persuasive and it
 * described a product that does not exist. There is no prepay rate card: an
 * account adds credit and each call is charged at the rate for the model it
 * ran on.
 *
 * Losing the slider loses an interaction, and that is the right trade. The
 * slider taught the customer that their per-minute price is a function of how
 * much they pay up front, when it is a function of which model they pick — so
 * anyone who learned from it optimised the wrong lever.
 */
export function PayAsYouGo() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      <div>
        <p className="t-eyebrow text-sindoor">{credits.headline}</p>
        <h2 className="t-h2 mt-3 text-balance">{credits.tagline}</h2>
        <p className="t-body-lg mt-5 text-slate text-pretty">{credits.body}</p>
      </div>

      <div className="rounded-card border border-line bg-snow p-8">
        <ul className="flex flex-col gap-4">
          {credits.points.map((point) => (
            <li key={point} className="flex gap-3 text-[0.9375rem] text-slate">
              <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-vermilion" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <p className="t-caption mt-7 border-t border-line pt-6 text-iron">
          {credits.committedNote}{' '}
          <Link href={credits.committedHref} className="text-sindoor hover:underline">
            Book a demo
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
