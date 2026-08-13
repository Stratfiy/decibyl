/**
 * Referral program. Confirmed 13 Aug 2026: 25% of a referred account's
 * first top-up/payment (one-time — a bounded acquisition cost, not an
 * ongoing liability), plus 10% of what they go on to spend for as long as
 * they stay a customer (recurring, sustainable against the cost floor in
 * OPEN-ITEMS.md — Decibyl's overage rates run 22–67% gross margin
 * depending on language mix, so 10% ongoing leaves real margin at every
 * tier).
 *
 * Deliberately simpler than a white-label reseller program: commission is
 * calculated on the referred account's actual payment at the published
 * rates on /pricing — no separate wholesale rate to confirm, no branded
 * subdomain, no sub-accounts. The white-label reseller tier (P1-2 in the
 * pricing spec) is still gated on that wholesale-rate decision; this program
 * ships independently of it.
 */
export const referralProgram = {
  firstTopUpPct: 25,
  ongoingPct: 10,
  headline: 'Refer a business. Get paid when they pay us.',
  sub: '25% of their first payment, then 10% of what they spend for as long as they stay a customer. No wholesale rate to negotiate — commission is calculated on the same published prices every customer pays.',
  howItWorks: [
    {
      title: 'Send them your link',
      body: 'Every referral gets a unique link. No forms to fill out on their end — they sign up the normal way, and it’s tracked automatically.',
    },
    {
      title: 'They pay, you earn 25%',
      body: 'The moment their first payment clears — a managed plan’s first month, or a pay-as-you-go top-up — you get 25% of it, paid out the same billing cycle.',
    },
    {
      title: 'They stay, you keep earning',
      body: '10% of everything they pay after that, for as long as they’re a customer. No cap, no expiry — a client you referred two years ago still pays you today.',
    },
  ],
  whoFor: [
    {
      title: 'Agencies',
      body: 'One agency with 20 clinic or D2C clients compounds fast — the ongoing 10% alone can outpace what most referral programs pay as a headline rate, because it’s on 20 accounts, not one.',
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
    label: 'Apply to the referral program',
    href: '/contact?topic=referral',
    prompt: 'Tell us your name (or agency name), roughly how many businesses you can realistically refer, and how you plan to reach them — that’s all we need to set you up.',
  },
};
