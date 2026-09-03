import type { Faq } from './faqs';

export type UseCase = {
  slug: string; name: string; eyebrow: string; h1: string; description: string;
  problems: { title: string; body: string }[];
  workflow: { title: string; body: string }[];
  outcomes: string[];
  example: { caller: string; agent: string; result: string };
  industries: { label: string; href: string }[];
  faqs: Faq[];
  seo: { title: string; description: string; keywords: string[] };
};

export const useCases: UseCase[] = [
  {
    slug: 'outbound-sales-calling',
    name: 'Outbound sales and lead qualification',
    eyebrow: 'Call while intent is fresh',
    h1: 'Outbound AI calling agent for sales and lead qualification',
    description: 'Call new enquiries and approved prospect lists, ask the qualification questions your team controls, capture structured answers, and transfer or book only leads that meet your rules.',
    problems: [
      { title: 'Form fills wait in a spreadsheet', body: 'Intent decays while representatives work through yesterday’s list or handle higher-priority conversations.' },
      { title: 'Every rep qualifies differently', body: 'Budget, need, location, timeline and eligibility data arrive in different formats—or not at all.' },
      { title: 'Activity hides the outcome', body: 'A dial count does not show who is qualified, what they objected to, or what the next action should be.' },
    ],
    workflow: [
      { title: 'Trigger from the approved source', body: 'A form, CRM event, campaign or uploaded audience starts the correct call policy.' },
      { title: 'Ask controlled questions', body: 'The agent follows your qualification and branching rules while handling natural questions and interruptions.' },
      { title: 'Score and route', body: 'Answers become consistent fields, are scored against your rules, and route to the correct owner or nurture path.' },
      { title: 'Book or transfer', body: 'Qualified prospects transfer live or choose an available meeting slot; every outcome returns to the CRM.' },
    ],
    outcomes: ['Qualified lead', 'Not eligible', 'Meeting booked', 'Live transfer', 'Callback requested', 'Do not call'],
    example: { caller: 'I am looking for a two-bedroom flat in Bangalore.', agent: 'Which areas, possession timeline and budget range should I use?', result: 'Qualified buyer; Whitefield; ₹1.1–1.4 crore; site visit requested this weekend.' },
    industries: [
      { label: 'Real estate', href: '/solutions/real-estate' }, { label: 'Education admissions', href: '/solutions/education' },
      { label: 'Clinics', href: '/solutions/clinics' }, { label: 'Lending', href: '/solutions/lending-collections' },
    ],
    faqs: [
      { q: 'How quickly can the AI calling agent contact a new lead?', a: 'The workflow can trigger as soon as the lead event reaches Decibyl. Actual start time also follows your telephony, consent, business-hour and retry rules.' },
      { q: 'Can we control the qualification questions?', a: 'Yes. Your team defines required fields, branching rules, disqualifiers, escalation conditions and the structured output.' },
      { q: 'Can qualified prospects transfer immediately?', a: 'Yes. Live transfer can be configured by outcome, team availability, language, territory or other approved routing rules.' },
      { q: 'Is this an AI cold-calling dialler?', a: 'It supports approved outbound workflows, but the business must follow applicable consent, DND, telemarketing, time-window and opt-out requirements.' },
    ],
    seo: { title: 'Outbound AI Calling Agent for Sales', description: 'Qualify leads by phone, capture structured answers, book meetings and transfer high-intent prospects with a multilingual outbound AI calling agent for India.', keywords: ['outbound AI calling agent', 'AI lead qualification agent', 'AI sales calling agent India', 'automated lead calling', 'speed to lead AI'] },
  },
  {
    slug: 'customer-support',
    name: 'Customer support',
    eyebrow: 'Answer, resolve, or route',
    h1: 'AI voice agent for customer support calls',
    description: 'Answer routine inbound calls around the clock, retrieve approved business information, complete eligible requests, and transfer complex cases with the conversation already summarized.',
    problems: [
      { title: 'Queues punish simple questions', body: 'Order status, appointment details and policy questions wait beside cases that genuinely require an expert.' },
      { title: 'After-hours calls become tomorrow’s backlog', body: 'Customers call when something goes wrong, not only when the support shift is fully staffed.' },
      { title: 'Transfers restart the conversation', body: 'Customers repeat names, numbers and problems because the next person cannot see what was already captured.' },
    ],
    workflow: [
      { title: 'Identify the caller and intent', body: 'The agent collects only the fields required for the approved support path.' },
      { title: 'Retrieve approved information', body: 'It answers from connected business data and knowledge rather than guessing.' },
      { title: 'Complete or escalate', body: 'Eligible tasks are completed; exceptions transfer or create a ticket with transcript and summary attached.' },
      { title: 'Record resolution quality', body: 'Outcome, transfer reason, transcript and QA data remain visible for review and improvement.' },
    ],
    outcomes: ['Resolved automatically', 'Ticket created', 'Human transfer', 'Callback requested', 'Authentication failed', 'Unsupported request'],
    example: { caller: 'My diagnostic report is not showing in the portal.', agent: 'I found the test using your registered number. It is under review and expected by 6 pm.', result: 'Status explained; approved SMS link sent; no human queue required.' },
    industries: [
      { label: 'Diagnostic labs', href: '/solutions/clinics/diagnostics' }, { label: 'Logistics', href: '/solutions/logistics' },
      { label: 'D2C and ecommerce', href: '/solutions/d2c-ndr-recovery' }, { label: 'Education', href: '/solutions/education' },
    ],
    faqs: [
      { q: 'Can the agent access order, booking or account status?', a: 'Yes, when the source system is connected through a supported integration, API or webhook and the request is within the approved authentication and data-access policy.' },
      { q: 'What if the voice agent cannot resolve the request?', a: 'It can transfer the call or create a ticket or callback with the transcript, summary and required fields already captured.' },
      { q: 'Can it work after business hours?', a: 'Yes. You decide which requests can be completed after hours and which should create a priority callback.' },
      { q: 'How do we investigate a wrong answer?', a: 'Calls are recorded and transcribed, and QA makes failures traceable to the answer, source, model or workflow rule.' },
    ],
    seo: { title: 'AI Voice Agent for Customer Support Calls', description: 'Use a multilingual AI voice agent to answer customer-support calls, resolve routine requests, create tickets and transfer complex cases with context.', keywords: ['AI customer support voice agent', 'inbound AI voice agent', 'AI call center automation India', 'customer service voice bot', 'AI phone support'] },
  },
  {
    slug: 'follow-up-reminder-calls',
    name: 'Follow-up and reminder calls',
    eyebrow: 'The calls teams agree matter but rarely finish',
    h1: 'AI voice agent for follow-up, confirmation and reminder calls',
    description: 'Run approved follow-up calls after an enquiry, booking, order, visit or payment event; capture the answer; retry when permitted; and write the next action back to your system.',
    problems: [
      { title: 'The first conversation has no second step', body: 'A lead, patient, buyer or customer showed intent, but nobody made the call that moved it forward.' },
      { title: 'Reminders happen too late', body: 'No-shows, failed deliveries and missed payments become visible only after the cost has already occurred.' },
      { title: 'Teams cannot see what was confirmed', body: 'A verbal yes, callback request or reschedule is lost when it never becomes a structured outcome.' },
    ],
    workflow: [
      { title: 'Trigger from a business event', body: 'A booking, order, lead, visit, renewal or due-date event selects the approved reminder workflow.' },
      { title: 'Call in the customer’s language', body: 'The agent confirms details and handles code-mixed Indian conversations without a language menu.' },
      { title: 'Apply retry and escalation rules', body: 'Unanswered, uncertain or sensitive outcomes follow your permitted retry, handoff and suppression policy.' },
      { title: 'Write back the next action', body: 'Confirmation, cancellation, reschedule, promise date, callback and failure states return as consistent fields.' },
    ],
    outcomes: ['Confirmed', 'Rescheduled', 'Cancelled', 'Callback requested', 'Human follow-up required', 'Unreachable'],
    example: { caller: 'I will not be home for the delivery today.', agent: 'I can record tomorrow as the preferred reattempt day. Should I also confirm the cash amount?', result: 'Reattempt requested for tomorrow; COD amount confirmed; outcome returned to the order workflow.' },
    industries: [
      { label: 'Clinics and appointments', href: '/solutions/clinics' }, { label: 'D2C NDR and COD', href: '/solutions/d2c-ndr-recovery' },
      { label: 'Lending and payment reminders', href: '/solutions/lending-collections' }, { label: 'Education admissions', href: '/solutions/education' },
    ],
    faqs: [
      { q: 'What can trigger a reminder or follow-up call?', a: 'A connected CRM, calendar, order system, payment system, API, webhook or approved upload can trigger the workflow.' },
      { q: 'Can customers reschedule or request a callback?', a: 'Yes. The permitted alternatives and writeback fields are configured before calls go live.' },
      { q: 'How are unanswered calls retried?', a: 'You define retry count, spacing, calling windows, suppression rules and escalation. The agent does not improvise repeated contact.' },
      { q: 'Can one workflow use Hindi, Tamil and English?', a: 'Yes. Supported languages and code-mixed registers can share the workflow while producing the same structured outcome fields.' },
    ],
    seo: { title: 'AI Voice Agent for Follow-Up & Reminder Calls', description: 'Automate multilingual follow-up, confirmation and reminder calls for appointments, leads, deliveries and payments with structured outcomes and retries.', keywords: ['AI follow up calls', 'AI reminder calls', 'automated confirmation calls', 'voice agent for follow up', 'appointment reminder AI'] },
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((item) => item.slug === slug);
}
