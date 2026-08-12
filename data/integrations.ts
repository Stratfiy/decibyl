/**
 * ⚠️ HONESTY RULE — read before editing.
 *
 * Every card carries a status and the status must be TRUE. Do not show a logo
 * for anything in the "coming" tier without the chip visible. A technical buyer
 * checks, and an unmarked logo you can't deliver costs you the deal AND the
 * referral.
 *
 * Defaults below are deliberately CONSERVATIVE: anything not provable from the
 * ground-truth brief is marked "coming". Nithish confirms each one before
 * deploy — see OPEN-ITEMS.md #1.
 *
 *   live       → built and tested (renders with no chip)
 *   beta       → built, not production-verified
 *   on-request → custom build for a paying customer
 *   coming     → not built
 */

export type IntegrationStatus = 'live' | 'beta' | 'on-request' | 'coming';

export type Integration = {
  name: string;
  category: 'CRM' | 'Commerce & logistics' | 'Calendar & comms' | 'Data & automation';
  /** one line on what actually flows */
  flow: string;
  status: IntegrationStatus;
};

export const statusLabel: Record<IntegrationStatus, string | null> = {
  live: null,
  beta: 'Beta',
  'on-request': 'On request',
  coming: 'Coming soon',
};

export const integrations: Integration[] = [
  // Data & automation — the honest core
  {
    name: 'Webhooks',
    category: 'Data & automation',
    flow: 'Every call outcome, transcript, and recording URL posted to your endpoint.',
    status: 'live',
  },
  {
    name: 'REST API',
    category: 'Data & automation',
    flow: 'Trigger outbound calls and pull call records programmatically.',
    status: 'live',
  },
  {
    name: 'Google Calendar',
    category: 'Calendar & comms',
    flow: 'Real slot booking, rescheduling, and cancellation on the calendar your team already opens.',
    status: 'live',
  },
  {
    name: 'Gmail',
    category: 'Calendar & comms',
    flow: 'Confirmation and follow-up email sent from your own domain after the call.',
    status: 'live',
  },
  {
    name: 'Google Sheets',
    category: 'Data & automation',
    flow: 'Call list in, outcomes out — the fastest way to run a campaign with no engineering.',
    status: 'beta',
  },
  {
    name: 'n8n',
    category: 'Data & automation',
    flow: 'Outcome events into your own automation graph.',
    status: 'beta',
  },
  {
    name: 'Zapier',
    category: 'Data & automation',
    flow: 'Route call outcomes to anything Zapier connects to.',
    status: 'coming',
  },
  {
    name: 'Notion',
    category: 'Data & automation',
    flow: 'Call outcomes written into a Notion database as rows.',
    status: 'coming',
  },

  // CRM
  {
    name: 'Zoho CRM',
    category: 'CRM',
    flow: 'Lead status, call outcome, transcript, and recording written to the record.',
    status: 'on-request',
  },
  {
    name: 'HubSpot',
    category: 'CRM',
    flow: 'Call logged against the contact with outcome and transcript.',
    status: 'on-request',
  },
  {
    name: 'Salesforce',
    category: 'CRM',
    flow: 'Task and call activity written back to the lead or opportunity.',
    status: 'coming',
  },
  {
    name: 'LeadSquared',
    category: 'CRM',
    flow: 'Lead qualification and call disposition written back.',
    status: 'coming',
  },
  {
    name: 'Freshsales',
    category: 'CRM',
    flow: 'Call activity and outcome on the contact timeline.',
    status: 'coming',
  },
  {
    name: 'Kylas',
    category: 'CRM',
    flow: 'Call outcome and recording on the lead record.',
    status: 'coming',
  },

  // Commerce & logistics
  {
    name: 'Shopify',
    category: 'Commerce & logistics',
    flow: 'Order and NDR events in; COD confirmation and reattempt status out.',
    status: 'on-request',
  },
  {
    name: 'WooCommerce',
    category: 'Commerce & logistics',
    flow: 'Order events in; confirmation outcome written back to the order.',
    status: 'coming',
  },
  {
    name: 'Shiprocket',
    category: 'Commerce & logistics',
    flow: 'NDR events in; confirmed reattempt and corrected address out.',
    status: 'coming',
  },
  {
    name: 'Delhivery',
    category: 'Commerce & logistics',
    flow: 'NDR events in; reattempt confirmation out.',
    status: 'coming',
  },

  // Comms
  {
    name: 'WhatsApp Business',
    category: 'Calendar & comms',
    flow: 'Confirmation, payment link, or appointment SMS/WhatsApp sent during the call.',
    status: 'beta',
  },
  {
    name: 'Slack',
    category: 'Calendar & comms',
    flow: 'Outcome alerts into the channel your ops team already watches.',
    status: 'coming',
  },
];

export const integrationCategories = [
  'CRM',
  'Commerce & logistics',
  'Calendar & comms',
  'Data & automation',
] as const;

/** Sorted so live and beta lead the deck — never bury the built ones. */
const rank: Record<IntegrationStatus, number> = { live: 0, beta: 1, 'on-request': 2, coming: 3 };
export const integrationsForDeck = [...integrations].sort(
  (a, b) => rank[a.status] - rank[b.status],
);
