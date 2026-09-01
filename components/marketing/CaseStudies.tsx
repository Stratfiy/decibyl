import { caseStudies, caseStudiesHeading, caseStudiesSub } from '@/data/caseStudies';
import { anonymousProof } from '@/data/proof';
import { SectionHead } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Named case studies when they exist and are consented-to; the anonymised
 * pilot list (already true, already on the homepage as "Now onboarding")
 * reframed as short cards when they don't. See data/caseStudies.ts for why.
 */
export function CaseStudiesSection() {
  return (
    <div>
      <SectionHead title={caseStudiesHeading} sub={caseStudiesSub} />

      {caseStudies.length > 0 ? (
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} as="li" delay={i * 100} className="rounded-card bg-snow p-8">
              <p className="t-h3 text-[1.125rem]">{cs.customer}</p>
              <p className="t-caption mt-1 text-iron">{cs.descriptor}</p>
              <p className="mt-5 text-slate">{cs.challenge}</p>
              <p className="mt-3 text-slate">{cs.solution}</p>
              <ul className="mt-6 grid grid-cols-2 gap-4">
                {cs.results.map((r) => (
                  <li key={r.metric}>
                    <p className="t-data text-[1.25rem] font-semibold text-forest">{r.value}</p>
                    <p className="t-caption mt-1 text-iron">{r.metric}</p>
                  </li>
                ))}
              </ul>
              {cs.quote ? (
                <blockquote className="mt-6 border-l-2 border-vermilion pl-4 text-slate italic">
                  “{cs.quote.text}”
                  <footer className="t-caption mt-2 not-italic text-iron">
                    — {cs.quote.attribution}
                  </footer>
                </blockquote>
              ) : null}
            </Reveal>
          ))}
        </ul>
      ) : (
        <>
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
          <div className="mt-8">
            {/* This label is a sentence, not a label. The shared button sets
                whitespace-nowrap, which is right for "Book a demo" and wrong
                here: at 320px it held the line at 316px inside a 280px column,
                which was the page's last horizontal overflow. Allowed to wrap
                for this one call site rather than loosening every button. */}
            <ButtonLink
              href="/book-a-demo"
              variant="secondary"
              className="max-w-full whitespace-normal text-center"
            >
              Want to be the first named case study?
            </ButtonLink>
          </div>
        </>
      )}
    </div>
  );
}
