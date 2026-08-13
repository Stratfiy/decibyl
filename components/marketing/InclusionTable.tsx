import { SectionHead } from '@/components/ui/Section';
import { inclusionComparison } from '@/data/features';

/**
 * Replaces the old per-minute "why the economics work" table on the
 * homepage (P0-5). The point of this table is the frame, not the row
 * content: an inclusion comparison, not a ₹/min comparison — the ₹/min
 * frame is the one a funded competitor with 200,000 calls/day wins.
 */
export function InclusionTable() {
  return (
    <div>
      <SectionHead
        title="What's actually included"
        sub="Most platforms quote a rate. Here's what the rate has to cover."
      />
      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="t-eyebrow py-3 pr-6 text-iron">
                &nbsp;
              </th>
              <th scope="col" className="t-eyebrow py-3 pr-6 text-vermilion">
                Decibyl
              </th>
              <th scope="col" className="t-eyebrow py-3 pr-6 text-iron">
                Typical developer platform
              </th>
              <th scope="col" className="t-eyebrow py-3 text-iron">
                Typical Indian bundle
              </th>
            </tr>
          </thead>
          <tbody>
            {inclusionComparison.map((row) => (
              <tr key={row.feature} className="border-b border-line align-top">
                <th scope="row" className="py-4 pr-6 text-[0.9375rem] font-medium text-slate">
                  {row.feature}
                </th>
                <td className="py-4 pr-6 font-semibold text-ink">{row.decibyl}</td>
                <td className="py-4 pr-6 text-slate">{row.developer}</td>
                <td className="py-4 text-slate">{row.bundle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
