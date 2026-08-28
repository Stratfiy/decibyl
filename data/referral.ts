/**
 * Referral program. Revised 13 Aug 2026: 20% of a referred account's first
 * recharge/payment, published. Ongoing commission is NOT published — it's
 * agreed directly, per partner, and lives in the agency/reseller
 * conversation rather than on the page.
 *
 * Why the split: a published one-time number is a bounded, honest promise
 * anyone can act on immediately. An ongoing rate depends on volume, language
 * mix (the regional stack's ₹3.28/min cost floor in OPEN-ITEMS.md changes
 * the margin materially), and whether the partner is reselling or just
 * referring — so it's a conversation, not a number on a page.
 *
 * Do not publish an ongoing % here until it's actually decided.
 */
export const referralProgram = {
  firstTopUpPct: 20,
  headline: 'Refer a business. Get paid when they pay us.',
  sub: '20% of their first recharge, paid the same billing cycle. Ongoing commission is agreed directly with you — it depends on volume and how you want to work with us.',
  howItWorks: [
    {
      title: 'Send them your link',
      body: 'Every referral gets a unique link. No forms to fill out on their end — they sign up the normal way, and it’s tracked automatically.',
    },
    {
      title: 'They recharge, you earn 20%',
      body: 'The moment their first payment clears — a managed plan’s first month, or a credit top-up — you get 20% of it, paid out the same billing cycle.',
    },
    {
      title: 'Sending more than one? Let’s talk',
      body: 'Ongoing commission on what your referrals keep spending is set with you directly, based on volume and how you want to work. Agencies and resellers get a different structure — see below.',
    },
  ],
  whoFor: [
    {
      title: 'Agencies',
      body: 'One agency with 20 clinic or D2C clients compounds fast. If you’re bringing that kind of volume, the reseller conversation below is the better fit than a per-referral link.',
    },
    {
      title: 'Consultants & freelancers',
      body: 'If you’re already advising a business on ops or marketing, this is a way to get paid for a recommendation you’d make anyway.',
    },
    {
      title: 'Existing customers',
      body: 'Know another business losing calls the way you used to? Send them your link from your account dashboard.',
    },
  ],
  applyCta: {
    label: 'Apply to the referral programme',
    href: '/contact?topic=referral',
    prompt: 'Tell us your name (or agency name), roughly how many businesses you can realistically refer, and how you plan to reach them — that’s all we need to set you up.',
  },
};
