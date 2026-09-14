/**
 * Integration pages for `/integrations/[tool]`.
 *
 * Only tools whose status in data/integrations.ts is live, beta or on-request
 * get a page. A page for something marked "coming" would be a doorway for a
 * feature that does not exist, and the honesty rule in that file applies here
 * with more force, because a search result is a promise made to a stranger.
 *
 * Status is read from data/integrations.ts at render time, never copied, so
 * the two files cannot disagree.
 */

import type { Faq } from './faqs';
import { integrations, statusLabel, type IntegrationStatus } from './integrations';

export type IntegrationPage = {
  slug: string;
  /** Must match `name` in data/integrations.ts exactly. */
  name: string;
  h1: string;
  eyebrow: string;
  /** One paragraph on what this connection is for, written for this tool. */
  intro: string;
  /** What moves, in which direction. */
  flows: { title: string; body: string }[];
  /** Three setup steps as the user does them. */
  steps: { title: string; body: string }[];
  /** Job slugs from data/jobs.ts this integration serves. */
  jobs: string[];
  faqs: Faq[];
  seo: { title: string; description: string; keywords: string[] };
};

export const integrationPages: IntegrationPage[] = [
  {
    slug: 'webhooks',
    name: 'Webhooks',
    h1: 'Decibyl webhooks: every call outcome, posted to your system the moment the call ends',
    eyebrow: 'Data and automation',
    intro:
      'A webhook is the plainest integration there is and the one every other integration is built on. When a call ends, Decibyl posts a JSON body with the outcome, the structured fields the agent collected, the transcript and a link to the recording, to a URL you own. If your CRM, panel or backend can receive an HTTP request, it is integrated today, with no connector to wait for.',
    flows: [
      { title: 'Call ended', body: 'Outcome, duration, direction, the caller number, every field the agent captured, transcript and recording link.' },
      { title: 'Call started and transferred', body: 'Optional events for systems that show live status or need to prepare a screen for the human taking the transfer.' },
      { title: 'Signed and retried', body: 'Each post carries a signature you verify, and a failed delivery retries with backoff so a five-minute outage on your side does not lose a call.' },
    ],
    steps: [
      { title: 'Add the URL', body: 'Paste your endpoint into the agent’s webhook node and choose which events you want.' },
      { title: 'Map the fields', body: 'The agent’s captured fields arrive under the names you gave them, so a promise-to-pay date is `promise_date`, not a blob of text.' },
      { title: 'Send a test call', body: 'Place a browser test call and watch the payload arrive; the request log shows every delivery and its response code.' },
    ],
    jobs: ['collections-telecaller', 'order-confirmation-executive', 'customer-support-executive', 'lead-qualification-telecaller'],
    faqs: [
      { q: 'What format is the payload?', a: 'JSON, documented in the developer docs with an example for every event. Field names for captured data are the ones you set in the agent.' },
      { q: 'Can I use it with n8n or Zapier?', a: 'Yes. Both accept a webhook as a trigger; n8n is the one we test against and document, and it has its own page here.' },
      { q: 'Is the recording in the payload?', a: 'A signed link to it, valid for a period you choose. Audio stays in the India region unless you copy it elsewhere.' },
    ],
    seo: {
      title: 'Decibyl Webhooks: Call Outcomes to Any System',
      description: 'Post every call outcome, captured fields, transcript and recording link to your own URL when the call ends. Signed, retried, JSON. The base of every integration.',
      keywords: ['voice AI webhook', 'call outcome webhook', 'Decibyl webhooks', 'post call data to CRM', 'AI calling webhook India'],
    },
  },
  {
    slug: 'rest-api',
    name: 'REST API',
    h1: 'The Decibyl REST API: start calls, read results, and build agents from your own code',
    eyebrow: 'Data and automation',
    intro:
      'Everything the dashboard does, the API does, with an API key scoped to your organisation. Trigger an outbound call from an order event, fetch a run with its transcript, create an agent from a definition, upload a contact list for a campaign. It is the surface the Python and TypeScript SDKs wrap and the one the MCP server uses when a coding assistant builds an agent for you.',
    flows: [
      { title: 'Your system to Decibyl', body: 'Start a call, create or update an agent, upload contacts, pause a campaign, all from a request with your key.' },
      { title: 'Decibyl to your system', body: 'Read any run, its outcome fields, transcript and recording, or subscribe by webhook and never poll.' },
      { title: 'Inside a call', body: 'The agent’s HTTP API tool calls your endpoints mid-conversation to look up an order, check an OTP or book a slot.' },
    ],
    steps: [
      { title: 'Create a key', body: 'API keys live under settings, scoped to the organisation, revocable at any time and never shown twice.' },
      { title: 'Read the reference', body: 'The API reference is generated from the running service, so every path and field is current; the SDKs carry the same names.' },
      { title: 'Make one call', body: 'The developer docs open with a request that places a test call to your own phone; that is the whole hello world.' },
    ],
    jobs: ['customer-support-executive', 'collections-telecaller', 'order-confirmation-executive', 'procurement-follow-up-executive'],
    faqs: [
      { q: 'Is there an SDK?', a: 'Python and TypeScript, generated from the same specification as the reference, so a method exists in both or neither.' },
      { q: 'Can the agent call my API during a conversation?', a: 'Yes, that is the HTTP API tool. You define the endpoint, the fields it needs and what to say with the answer, and the agent decides when to use it.' },
      { q: 'What about rate limits?', a: 'Per key, documented, and generous for anything below campaign scale. Campaign dialling has its own concurrency control you set per campaign.' },
    ],
    seo: {
      title: 'Decibyl REST API for Voice Agents and Calls',
      description: 'Start calls, read transcripts and outcomes, create agents and upload contact lists from your own code, with a scoped API key and Python and TypeScript SDKs.',
      keywords: ['voice AI API', 'AI calling API India', 'Decibyl API', 'programmatic phone calls API', 'voice agent SDK'],
    },
  },
  {
    slug: 'google-calendar',
    name: 'Google Calendar',
    h1: 'Decibyl and Google Calendar: the agent reads free slots and books them on the call',
    eyebrow: 'Calendar and comms',
    intro:
      'A caller asking for an appointment wants a time, not a callback. With Google Calendar connected, the agent checks the calendar you point it at during the conversation, offers the slots that are actually free, books the one the caller picks, and the invite lands before the call ends. Multiple calendars work too, so a clinic with three doctors books the right one.',
    flows: [
      { title: 'Read', body: 'Free and busy across one or several calendars, honouring working hours you set, so the agent never offers a slot that is taken or after closing.' },
      { title: 'Write', body: 'Creates the event with the caller’s name and number, and a note with what they asked for, on the calendar you chose.' },
      { title: 'Update', body: 'Reschedules and cancels when the caller rings back, and marks the change on the original event.' },
    ],
    steps: [
      { title: 'Connect the account', body: 'Sign in with the Google account that owns the calendar; the credential is stored encrypted and scoped to your organisation.' },
      { title: 'Pick calendars and hours', body: 'Choose which calendars the agent may book into and the working hours per day.' },
      { title: 'Add the booking tool', body: 'Drop the calendar tool into the agent and say when to use it; a test call books into a test calendar first.' },
    ],
    jobs: ['clinic-receptionist', 'real-estate-telecaller', 'admissions-counsellor-caller'],
    faqs: [
      { q: 'Can it book for different doctors or reps?', a: 'Yes. Each is a calendar, and the agent picks by what the caller asks for or by a rule you set.' },
      { q: 'What if two callers want the same slot at once?', a: 'The second write fails because the slot is now busy, and the agent offers the next one. It reads the calendar at booking time, not at the start of the call.' },
      { q: 'Does the patient get an invite?', a: 'If you want them to. The event can include the caller’s email when captured, or the confirmation goes by WhatsApp or SMS instead.' },
    ],
    seo: {
      title: 'Google Calendar Integration for AI Phone Booking',
      description: 'Connect Google Calendar and the Decibyl agent reads free slots during the call, books the one the caller picks, and reschedules on the next call.',
      keywords: ['AI appointment booking Google Calendar', 'voice bot calendar booking', 'phone booking automation India', 'Decibyl Google Calendar'],
    },
  },
  {
    slug: 'gmail',
    name: 'Gmail',
    h1: 'Decibyl and Gmail: call summaries and follow-ups sent from the inbox your customers know',
    eyebrow: 'Calendar and comms',
    intro:
      'Some outcomes belong in an email: a quote the caller asked for, a document list, a summary for the account manager. With Gmail connected, the agent sends from a mailbox you own rather than a noreply address, so replies come back to a person. It also lets a support agent email the ticket summary to the customer while the call is still being wrapped up.',
    flows: [
      { title: 'Send', body: 'A templated email with fields from the call, from the connected mailbox, to the caller or to your team.' },
      { title: 'Attach', body: 'Documents you have uploaded to the agent, such as a brochure or a fee sheet, sent on request during the call.' },
      { title: 'Log', body: 'The sent message is linked from the call record, so the transcript and the email sit together.' },
    ],
    steps: [
      { title: 'Connect the mailbox', body: 'Sign in with the Google account to send from; consent is scoped to sending, and the credential is stored encrypted.' },
      { title: 'Write the templates', body: 'One per outcome, with the call fields you want merged in; plain text or simple HTML.' },
      { title: 'Choose the trigger', body: 'On request, on a specific outcome, or always after a call of a given type.' },
    ],
    jobs: ['customer-support-executive', 'procurement-follow-up-executive'],
    faqs: [
      { q: 'Can it read my inbox?', a: 'No. The connection is for sending. If you want the agent to act on incoming mail, that is an n8n or webhook flow, and it is deliberate that they are separate permissions.' },
      { q: 'Will emails go to spam?', a: 'They are sent from your own Google Workspace mailbox with your domain’s authentication, which is the best deliverability an email can have.' },
      { q: 'Can it send to my team instead of the caller?', a: 'Yes. A common pattern is a summary to the account owner after every call that needs a human follow-up.' },
    ],
    seo: {
      title: 'Gmail Integration: Email Follow-ups from AI Calls',
      description: 'Send call summaries, quotes and document lists from your own Gmail mailbox during or after a Decibyl call, merged with the fields the agent captured.',
      keywords: ['voice AI email follow-up', 'Gmail integration voice bot', 'AI call summary email', 'Decibyl Gmail'],
    },
  },
  {
    slug: 'google-sheets',
    name: 'Google Sheets',
    h1: 'Decibyl and Google Sheets: a sheet as the contact list in, and the outcome log out',
    eyebrow: 'Data and automation',
    intro:
      'Most Indian businesses run on a sheet before they run on a CRM, and a bot that needs a CRM first never gets started. With Google Sheets connected, a sheet is the list the campaign dials, the tracker the follow-up bot reads each morning, and the log every call writes a row to. The owner keeps working in the tool they already open, and the bot works in it too.',
    flows: [
      { title: 'Read', body: 'Rows become contacts with the columns you map, so a PO tracker or a lead sheet drives the calls without an export.' },
      { title: 'Write', body: 'Each call appends or updates a row with the outcome, the captured fields and the recording link, in columns you named.' },
      { title: 'Poll', body: 'The sheet is re-read on a schedule, so a row added at 9am is called by 9:15 without anyone pressing anything.' },
    ],
    steps: [
      { title: 'Share the sheet', body: 'Connect the Google account and choose the spreadsheet and tab; read and write are separate permissions.' },
      { title: 'Map the columns', body: 'Tell the agent which column is the phone number, which are inputs to the call and which receive the outcome.' },
      { title: 'Run ten rows', body: 'Point a campaign at a ten-row test tab, listen to the calls, and check the columns fill the way you expect.' },
    ],
    jobs: ['procurement-follow-up-executive', 'collections-telecaller', 'clinic-receptionist', 'admissions-counsellor-caller', 'lead-qualification-telecaller'],
    faqs: [
      { q: 'This is marked beta. What does that mean here?', a: 'It is built and used, and not yet verified on every edge case a large sheet produces. Start with a tab under a few thousand rows and tell us what breaks.' },
      { q: 'Can the sheet be the only integration?', a: 'Yes. A sheet in, a sheet out, and a webhook if you later want the same data somewhere else.' },
      { q: 'Who can see the sheet?', a: 'Only the connected account. Decibyl stores the credential encrypted and never copies the sheet anywhere.' },
    ],
    seo: {
      title: 'Google Sheets Integration for AI Calling Campaigns',
      description: 'Use a Google Sheet as the contact list an AI calling campaign dials and the log every call writes to. Columns you map, rows re-read on a schedule, no CRM required.',
      keywords: ['AI calling from Google Sheets', 'voice bot Google Sheets integration', 'campaign calling spreadsheet', 'Decibyl Google Sheets'],
    },
  },
  {
    slug: 'n8n',
    name: 'n8n',
    h1: 'Decibyl and n8n: put a phone call inside any workflow, and a workflow behind any call',
    eyebrow: 'Data and automation',
    intro:
      'n8n is the automation tool a lot of Indian ops teams already run, self-hosted or cloud, because it is cheap and it connects to everything. Decibyl fits it in both directions. A workflow can start a call when an order, a ticket or a row appears, and a call can fire a workflow when it ends, so the outcome reaches Tally, a CRM or a WhatsApp group without a custom connector for each. The founder built his first twenty-five workflows in n8n, and it is the path we test first.',
    flows: [
      { title: 'n8n starts the call', body: 'An HTTP Request node hits the Decibyl API with the number and the fields; the call runs and the run id comes back.' },
      { title: 'The call fires the workflow', body: 'A Decibyl webhook node in n8n receives the outcome and branches on it: confirmed, unreachable, dispute, booked.' },
      { title: 'Mid-call lookups', body: 'The agent’s HTTP API tool can call an n8n webhook that assembles an answer from three systems and returns it in one response.' },
    ],
    steps: [
      { title: 'Import the template', body: 'Start from the published n8n templates for order confirmation, follow-up calls and lead qualification, or from a blank HTTP Request node.' },
      { title: 'Add your key', body: 'One credential in n8n holds the Decibyl API key; every node reuses it.' },
      { title: 'Wire the webhook', body: 'Paste the n8n webhook URL into the agent and run a test call end to end.' },
    ],
    jobs: ['procurement-follow-up-executive', 'customer-support-executive', 'order-confirmation-executive'],
    faqs: [
      { q: 'Is there a native Decibyl node?', a: 'Not yet; the HTTP Request node and the generic webhook node cover everything, and the templates are built on them. A native node is planned once the API settles.' },
      { q: 'Can I self-host n8n and keep data in India?', a: 'Yes. Self-hosted n8n in your own cloud plus Decibyl in the India region keeps every hop domestic.' },
      { q: 'What about Zapier and Make?', a: 'Both work through the same webhook and HTTP pattern; n8n is the one we document and test.' },
    ],
    seo: {
      title: 'n8n Integration: AI Phone Calls in Any Workflow',
      description: 'Start Decibyl calls from n8n and fire n8n workflows from call outcomes, with mid-call lookups through webhooks. Templates for confirmations and follow-ups.',
      keywords: ['n8n voice AI', 'n8n AI calling', 'n8n phone call automation', 'Decibyl n8n', 'automation voice bot India'],
    },
  },
  {
    slug: 'whatsapp-business',
    name: 'WhatsApp Business',
    h1: 'Decibyl and WhatsApp Business: the call books it, the message confirms it',
    eyebrow: 'Calendar and comms',
    intro:
      'In India the confirmation lives on WhatsApp. A caller who booked an appointment expects the address and the time in a message; a vendor who gave a date expects a note of it; a lead who asked for the brochure expects a link. With WhatsApp Business connected, the agent sends the approved template during or after the call, from your business number, and the reply thread is yours.',
    flows: [
      { title: 'Send during the call', body: 'A payment link, a map pin, a document list or a brochure, sent while the caller is still on the line so they can confirm it arrived.' },
      { title: 'Send after the call', body: 'The confirmation of what was agreed, from an approved template with the call’s fields merged in.' },
      { title: 'Reminders', body: 'Day-before reminders for bookings the agent made, on the number the caller gave.' },
    ],
    steps: [
      { title: 'Connect the number', body: 'Link your WhatsApp Business API number and the approved templates you already have; new templates go through Meta’s approval as usual.' },
      { title: 'Map templates to outcomes', body: 'Booked sends the confirmation template, promise-to-pay sends the link template, and so on.' },
      { title: 'Test with your own phone', body: 'Place a test call, receive the message, and check the merged fields read correctly in the customer’s language.' },
    ],
    jobs: ['clinic-receptionist', 'order-confirmation-executive', 'real-estate-telecaller', 'admissions-counsellor-caller'],
    faqs: [
      { q: 'This is marked beta. Should I rely on it?', a: 'Sending approved templates is built and in use. Two-way conversation on WhatsApp, where the bot answers messages as it answers calls, is the channels work in progress, and it is not on this page until it ships.' },
      { q: 'Do I need a WhatsApp Business API account?', a: 'Yes, through Meta or a business solution provider. The ordinary WhatsApp Business app on a phone cannot be connected to anything.' },
      { q: 'Are messages charged?', a: 'By Meta, per conversation, on your WhatsApp account, at the rates for your template category. Decibyl does not mark those up.' },
    ],
    seo: {
      title: 'WhatsApp Business Integration for AI Voice Calls',
      description: 'Send approved WhatsApp templates during or after a Decibyl call: confirmations, payment links, map pins, document lists and reminders, from your own number.',
      keywords: ['WhatsApp confirmation after call', 'voice bot WhatsApp integration', 'AI calling WhatsApp India', 'Decibyl WhatsApp Business'],
    },
  },
  {
    slug: 'zoho-crm',
    name: 'Zoho CRM',
    h1: 'Decibyl and Zoho CRM: the lead is called, qualified and updated before a rep opens it',
    eyebrow: 'CRM',
    intro:
      'Zoho CRM is where a large share of Indian sales teams keep their leads, and the gap between a lead arriving and a human calling it is where deals go. Connected to Decibyl, a new lead triggers a call, the agent’s questions fill the fields the rep would have asked, and the record shows the outcome, the recording and the next step before the rep’s morning starts.',
    flows: [
      { title: 'Lead to call', body: 'A new or updated lead matching your rule starts a call with the record’s fields available to the agent.' },
      { title: 'Call to record', body: 'Qualification answers land in the fields you map, the call is logged as an activity with the transcript, and the lead status moves.' },
      { title: 'Hot to human', body: 'A qualified lead is assigned to the owner and, if they are free, transferred live with a summary.' },
    ],
    steps: [
      { title: 'Ask for the connection', body: 'Zoho is on request: we set up the connection with you on a call, because every Zoho instance has its own custom fields.' },
      { title: 'Map the fields', body: 'Each question the agent asks maps to a Zoho field; the status transitions are yours.' },
      { title: 'Run on one pipeline', body: 'Start with one lead source and one owner, listen to a week of calls, then widen.' },
    ],
    jobs: ['real-estate-telecaller', 'lead-qualification-telecaller', 'admissions-counsellor-caller'],
    faqs: [
      { q: 'Why is this on request rather than self-serve?', a: 'Field mapping in Zoho varies too much between accounts to guess at. A thirty-minute call with your Zoho admin gets it right the first time, and it is not charged.' },
      { q: 'Does it work with Zoho Bigin or Zoho Desk?', a: 'Bigin shares the CRM API, so yes on request. Desk is a support product; that path runs through the REST API and webhooks today.' },
      { q: 'Can the rep hear the call from inside Zoho?', a: 'The activity carries the transcript and a link to the recording, so yes, without leaving the record.' },
    ],
    seo: {
      title: 'Zoho CRM Integration for AI Lead Calling',
      description: 'Call every new Zoho CRM lead in minutes, fill the qualification fields from the call, log the activity with the transcript, hand hot leads to the owner live.',
      keywords: ['Zoho CRM AI calling', 'Zoho lead follow-up bot', 'voice AI Zoho integration', 'Decibyl Zoho CRM'],
    },
  },
  {
    slug: 'hubspot',
    name: 'HubSpot',
    h1: 'Decibyl and HubSpot: a call on every new contact, logged as an engagement with the transcript',
    eyebrow: 'CRM',
    intro:
      'HubSpot teams already automate the email and the task; the call is the step that still waits for a person. Decibyl makes it a workflow action. A contact enters a list or a stage, the agent calls, asks what the rep would ask, and the engagement is logged with the transcript and the fields, so the sequence continues on real information rather than on a timer.',
    flows: [
      { title: 'Contact to call', body: 'A list membership, a lifecycle stage or a form submission triggers the call with the contact’s properties in hand.' },
      { title: 'Call to engagement', body: 'The call is logged on the contact as an engagement with outcome, duration, transcript and recording link, and properties you map are updated.' },
      { title: 'Route', body: 'Qualified contacts change stage and are assigned; a live transfer to the owner is available on a rule.' },
    ],
    steps: [
      { title: 'Ask for the connection', body: 'HubSpot is on request today; we connect the private app with you and confirm the property names.' },
      { title: 'Choose the trigger', body: 'Pick the list or stage that should start a call and the hours it may run.' },
      { title: 'Map properties', body: 'Each captured field writes to a contact or deal property you name; the engagement logs itself.' },
    ],
    jobs: ['real-estate-telecaller', 'lead-qualification-telecaller'],
    faqs: [
      { q: 'Does it need a paid HubSpot tier?', a: 'A private app with contacts and engagements scopes, which is available on Starter and above. Workflow-triggered calls need HubSpot workflows, which is a Professional feature; on lower tiers a list poll does the same job.' },
      { q: 'Will it duplicate contacts?', a: 'No. Calls attach to the existing contact by id; a new number the agent learns updates the property rather than creating a record.' },
      { q: 'Can I see call outcomes in HubSpot reports?', a: 'Outcome and the mapped properties are ordinary properties, so they report and segment like any other field.' },
    ],
    seo: {
      title: 'HubSpot Integration for AI Calling and Logging',
      description: 'Trigger a Decibyl call from a HubSpot list or stage, log it as an engagement with the transcript, update properties from the call, route qualified contacts.',
      keywords: ['HubSpot AI calling', 'HubSpot voice bot integration', 'log AI calls in HubSpot', 'Decibyl HubSpot'],
    },
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    h1: 'Decibyl and Shopify: confirm the cash-on-delivery order by phone before it ships',
    eyebrow: 'Commerce and logistics',
    intro:
      'For a Shopify store in India, cash on delivery is most of the orders and most of the returns. Connected to Decibyl, a new COD order triggers a call within minutes, the agent confirms the items and the address, offers a prepaid link, and tags the order so your fulfilment rule can hold or release it. The store keeps working as it does; one tag changes what ships.',
    flows: [
      { title: 'Order to call', body: 'A new order matching your rule, typically COD above a value, starts a call with the items, amount and address available to the agent.' },
      { title: 'Call to order', body: 'The order is tagged confirmed, cancelled, rescheduled or unreachable, the address is corrected on the order, and a note carries the recording link.' },
      { title: 'Prepaid conversion', body: 'A payment link sent on the call marks the order paid when it clears, so COD becomes prepaid without a second conversation.' },
    ],
    steps: [
      { title: 'Ask for the connection', body: 'Shopify is on request: we install the app on your store with you and agree the tag names your fulfilment already uses.' },
      { title: 'Set the rule', body: 'Which orders get a call, how soon, in which hours, and how many retries before unreachable.' },
      { title: 'Run a day of orders', body: 'Listen to the first day’s calls, check the tags, then let the fulfilment rule take over.' },
    ],
    jobs: ['order-confirmation-executive'],
    faqs: [
      { q: 'Does it work with Shiprocket or Delhivery for NDR calls?', a: 'The NDR event comes from the courier, not from Shopify. Today that is a webhook from your courier panel into the same agent; native courier connections are listed as coming on the integrations page and stay unmarked until built.' },
      { q: 'Which languages does the confirmation call use?', a: 'It follows the customer, starting from the language implied by the address and switching if they answer in another. Hindi, English and the regional languages listed on the languages page.' },
      { q: 'Can the call upsell?', a: 'It can offer one thing you configure, such as prepaid with a discount. It is deliberately not a sales call; a customer who wanted to cancel is let go, which is the point.' },
    ],
    seo: {
      title: 'Shopify Integration for COD Confirmation Calls',
      description: 'Call every cash-on-delivery Shopify order within minutes, confirm items and address, offer prepaid, and tag the order so fulfilment holds or ships on a rule.',
      keywords: ['Shopify COD confirmation call', 'Shopify voice bot India', 'AI order confirmation Shopify', 'Decibyl Shopify'],
    },
  },
];

export function getIntegrationPage(slug: string): IntegrationPage | undefined {
  return integrationPages.find((p) => p.slug === slug);
}

/** The truthful status for a page, read from data/integrations.ts. */
export function integrationStatus(page: IntegrationPage): IntegrationStatus {
  return integrations.find((i) => i.name === page.name)?.status ?? 'coming';
}

export function integrationStatusLabel(page: IntegrationPage): string | null {
  return statusLabel[integrationStatus(page)];
}

export const integrationPagesUpdatedAt = '2026-09-14';
