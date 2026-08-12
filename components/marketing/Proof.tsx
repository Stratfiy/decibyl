import Image from 'next/image';
import { logos, anonymousProof, proofHeading, proofSub } from '@/data/proof';
import { SectionHead } from '@/components/ui/Section';

/**
 * Named logos when consent exists, anonymised-but-true cards when it doesn't.
 * Populating data/proof.ts `logos` swaps this over with no redesign.
 */
export function ProofStrip() {
  return (
    <div>
      <SectionHead title={proofHeading} sub={proofSub} />

      {logos.length > 0 ? (
        <ul className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-8">
          {logos.map((logo) => (
            <li key={logo.name}>
              <Image src={logo.src} alt={logo.alt} width={132} height={40} className="h-9 w-auto" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {anonymousProof.map((p) => (
            <li key={`${p.descriptor}-${p.location}`} className="rounded-card bg-snow p-7">
              <p className="t-h3 text-[1.125rem]">
                {p.descriptor}
                {p.location ? <span className="text-slate"> · {p.location}</span> : null}
              </p>
              <p className="t-data mt-4 text-forest">{p.status}</p>
              <p className="t-caption mt-1 text-iron">{p.languages}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
