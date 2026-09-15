import Link from 'next/link';
import { credits } from '@/data/pricing';

export function PayAsYouGo() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="t-eyebrow text-iron">{credits.headline}</p>
        <h2 className="t-h2 mt-3 text-balance">{credits.tagline}</h2>
        <p className="t-body-lg mt-5 text-slate text-pretty">{credits.body}</p>
      </div>

      <div className="rounded-card border border-line bg-snow p-8">
        <ul className="flex flex-col gap-4">
          {credits.points.map((point) => (
            <li key={point} className="flex gap-3 text-[0.9375rem] text-slate">
              <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-ink" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="t-caption mt-7 border-t border-line pt-6 text-iron">
          {credits.committedNote}{' '}
          <Link href={credits.committedHref} className="font-semibold text-ink underline-offset-4 hover:underline">Compare plans</Link>.
        </p>
      </div>
    </div>
  );
}
