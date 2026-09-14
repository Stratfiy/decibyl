import Link from 'next/link';
import { credits, formatInr, topUpPacks, topUpPacksUsd } from '@/data/pricing';

/**
 * Top-up packs: the three rupee packs and their dollar twins, verbatim from
 * the product's pack ladder. Credits never expire and are spent after the
 * month's plan credits.
 */
export function PayAsYouGo() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      <div>
        <p className="t-eyebrow text-sindoor">{credits.headline}</p>
        <h2 className="t-h2 mt-3 text-balance">{credits.tagline}</h2>
        <p className="t-body-lg mt-5 text-slate text-pretty">{credits.body}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {credits.points.map((point) => (
            <li key={point} className="flex gap-3 text-[0.9375rem] text-slate">
              <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-vermilion" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-card border border-line bg-snow p-8">
        <table className="w-full text-left text-[0.9375rem]">
          <caption className="sr-only">Top-up packs</caption>
          <thead>
            <tr className="border-b border-line text-iron">
              <th className="py-2 pr-4 font-medium">Pack</th>
              <th className="py-2 pr-4 font-medium">Credits</th>
              <th className="py-2 font-medium">Bonus</th>
            </tr>
          </thead>
          <tbody>
            {topUpPacks.map((p, i) => {
              const usd = topUpPacksUsd[i];
              return (
                <tr key={p.priceInr} className="border-b border-line">
                  <td className="py-3 pr-4 font-display font-bold">
                    {formatInr(p.priceInr as number)}
                    <span className="t-data ml-2 font-normal text-slate">or ${usd.priceUsd}</span>
                  </td>
                  <td className="t-data py-3 pr-4">{p.credits.toLocaleString('en-IN')}</td>
                  <td className="t-data py-3 text-slate">
                    {p.bonusCredits ? `+${p.bonusCredits.toLocaleString('en-IN')}` : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="t-caption mt-4 text-iron">
          Rupee packs are for accounts billed in India, exclusive of GST. Dollar packs are for accounts billed outside India, invoiced as a zero-rated export.
        </p>
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
