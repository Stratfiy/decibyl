/**
 * The shelf catalogue: every role a Decibyl worker could be, by sector and
 * industry, with what it does, the channels, the tools and the plan it fits.
 *
 * Every plan gets every role. The only gate is voice: the phone half of a role
 * needs Business or above; its WhatsApp, web chat and email half runs on
 * Everyday at ₹999. `minimumPlan` states that rule once: only a phone-only
 * role starts at Business.
 *
 * `status` is honest: `live` is on the product shelf today, `next` is being
 * built for Q4 2026, `later` is 2027. The /shelf page shows all three with the
 * status stated, and only links to a /jobs page where one exists. Demand
 * signals are named per role so the order can be argued with. Regenerated
 * with docs/product/marketplace-catalogue.md from the same source.
 */

export type ShelfStatus = 'live' | 'next' | 'later';
export type ShelfReach = 'global' | 'india';
export type ShelfKind = 'inbound' | 'outbound' | 'both' | 'routine' | 'text';

export type ShelfRole = {
  sector: string;
  industry: string;
  slug: string;
  name: string;
  /** The job title as a business would post it. */
  posted: string;
  kind: ShelfKind;
  channels: string[];
  does: string[];
  tools: string[];
  status: ShelfStatus;
  /** Where the job exists. Global is the default; India-only roles depend on an Indian rule or portal. */
  reach: ShelfReach;
  signal: string;
  /** A /jobs slug when a job page exists. */
  jobs: string | null;
  note: string | null;
};

export const shelf: ShelfRole[] = [
  {
    "sector": "Healthcare",
    "industry": "Clinics and doctors",
    "slug": "front-desk-clinic",
    "name": "Clinic front desk",
    "posted": "Receptionist / front office executive",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Answers every call in the caller’s language and books into the doctor’s calendar",
      "Confirms the day before and reschedules on request",
      "Answers timings, fees and directions from a knowledge base"
    ],
    "tools": [
      "google-calendar",
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "live",
    "signal": "Naukri and JobHai: receptionist among the most reposted SMB roles; our own jobs page",
    "jobs": "clinic-receptionist",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Diagnostic labs",
    "slug": "lab-home-collection",
    "name": "Home collection scheduler",
    "posted": "Lab front office / phlebotomy coordinator",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Books home-collection windows by area",
      "Reads preparation instructions test by test",
      "Says whether a report is ready without reading a value"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Diagnostics vertical page traffic; MyOperator deployment data lists booking capture as a top use",
    "jobs": "clinic-receptionist",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Hospitals",
    "slug": "hospital-appointment-desk",
    "name": "OPD appointment desk",
    "posted": "Hospital front office / PRO",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Routes to the right department and books OPD slots",
      "Answers admission, visiting hours and insurance-desk questions",
      "Hands emergencies to a person immediately"
    ],
    "tools": [
      "google-calendar",
      "rest-api"
    ],
    "status": "later",
    "signal": "Healthcare hiring up 5% YoY (Naukri JobSpeak Jan 2026); multi-department routing needs concurrency",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Pharmacies",
    "slug": "pharmacy-refill-reminder",
    "name": "Refill reminder caller",
    "posted": "Pharmacy counter staff",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Reminds chronic patients before a refill is due",
      "Takes the reorder and sends the payment link",
      "Flags a prescription that has expired to the pharmacist"
    ],
    "tools": [
      "google-sheets",
      "razorpay"
    ],
    "status": "later",
    "signal": "Repeat-purchase pattern; no clinical advice on the call",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Dental",
    "slug": "dental-recall",
    "name": "Dental recall and pain-call desk",
    "posted": "Dental receptionist",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Books by procedure length",
      "Quotes ranges the dentist set",
      "Treats a pain call as a same-day slot or a handoff"
    ],
    "tools": [
      "google-calendar",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Dental vertical page; six-month recall is a routine every practice skips",
    "jobs": "clinic-receptionist",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Fertility and IVF",
    "slug": "ivf-coordinator-desk",
    "name": "Fertility enquiry desk",
    "posted": "Patient coordinator",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Books first consultations and explains what to bring",
      "Answers process and cost ranges in the clinic’s words",
      "Hands cycle-in-progress calls to the coordinator with context"
    ],
    "tools": [
      "google-calendar",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "IVF vertical page; after-hours anxiety calls",
    "jobs": "clinic-receptionist",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Veterinary",
    "slug": "vet-appointments",
    "name": "Vet appointment desk",
    "posted": "Clinic assistant",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Books consultations and vaccination reminders",
      "Answers timings and what to bring",
      "Triages an emergency to the vet"
    ],
    "tools": [
      "google-calendar"
    ],
    "status": "later",
    "signal": "Same shape as clinic front desk; small but under-served",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Education",
    "industry": "Colleges and institutes",
    "slug": "admissions-desk",
    "name": "Admissions desk",
    "posted": "Admissions counsellor / telecaller",
    "kind": "both",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Answers fee, date, document and hostel questions",
      "Books counselling slots",
      "Calls back every enquiry within a minute in season"
    ],
    "tools": [
      "google-sheets",
      "google-calendar",
      "whatsapp-business"
    ],
    "status": "live",
    "signal": "Admissions counsellor caller job page; season bursts",
    "jobs": "admissions-counsellor-caller",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Education",
    "industry": "Coaching institutes",
    "slug": "coaching-enquiry-qualifier",
    "name": "Batch enquiry qualifier",
    "posted": "Counsellor / telecaller",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Asks class, board, target exam and batch timing",
      "Sends the brochure on WhatsApp",
      "Books the counsellor"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Result-day and ad-day bursts; lead-qualification job page",
    "jobs": "lead-qualification-telecaller",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Education",
    "industry": "Schools",
    "slug": "school-fee-reminder",
    "name": "Fee reminder caller",
    "posted": "Accounts / fee desk",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Reminds parents before instalments",
      "Sends the payment link and records the promise",
      "Never speaks to a student about money"
    ],
    "tools": [
      "google-sheets",
      "razorpay"
    ],
    "status": "next",
    "signal": "Collections × education pair page",
    "jobs": "collections-telecaller",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Education",
    "industry": "Schools",
    "slug": "school-absence-caller",
    "name": "Absence and circular caller",
    "posted": "Front office",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls parents of absent students by 10 am",
      "Reads the day’s circular on request",
      "Logs the reason given"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "Daily routine every school does by hand",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Education",
    "industry": "Ed-tech and online courses",
    "slug": "course-onboarding-caller",
    "name": "Course onboarding caller",
    "posted": "Learner success executive",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls new enrolments to set up the first session",
      "Answers login and schedule questions",
      "Flags a learner who has not logged in for a week"
    ],
    "tools": [
      "rest-api",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Retention routine; ed-tech activation calls are outsourced today",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Real estate and construction",
    "industry": "Builders and brokers",
    "slug": "property-lead-qualifier",
    "name": "Property lead qualifier",
    "posted": "Real-estate telecaller",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls back a portal enquiry within a minute",
      "Captures budget, locality, configuration and timeline as fields",
      "Books the site visit"
    ],
    "tools": [
      "google-sheets",
      "google-calendar",
      "whatsapp-business"
    ],
    "status": "live",
    "signal": "Real-estate telecaller job page; portal speed-to-lead",
    "jobs": "real-estate-telecaller",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Real estate and construction",
    "industry": "Builders and brokers",
    "slug": "site-visit-reminder",
    "name": "Site-visit reminder and no-show caller",
    "posted": "Telecaller",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Reminds the morning of the visit",
      "Reschedules a no-show the same day",
      "Reports the visit outcome to the closer"
    ],
    "tools": [
      "google-calendar",
      "google-sheets"
    ],
    "status": "next",
    "signal": "No-show rate is the number every sales head quotes",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Real estate and construction",
    "industry": "Property management",
    "slug": "society-helpdesk",
    "name": "Society and facility helpdesk",
    "posted": "Facility manager’s desk",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Logs complaints with flat number and category",
      "Answers maintenance dues and timings",
      "Escalates an outage to the supervisor"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "Housing societies and co-working spaces",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Real estate and construction",
    "industry": "Interiors and contractors",
    "slug": "contractor-quote-follow-up",
    "name": "Quote follow-up caller",
    "posted": "Sales coordinator",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Follows up every quote on day 3 and day 10",
      "Records objections as fields",
      "Books the site measurement"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "Quotes die in silence; a routine is the fix",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "Lending and NBFC",
    "slug": "payment-reminder",
    "name": "Payment reminder caller",
    "posted": "Collections telecaller",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Pre-due, due-day and post-due reminders inside the window",
      "Captures promise-to-pay as a field",
      "Hands disputes and hardship to a senior"
    ],
    "tools": [
      "google-sheets",
      "rest-api",
      "razorpay"
    ],
    "status": "live",
    "signal": "Collections telecaller job page; fair-practice window enforced",
    "jobs": "collections-telecaller",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "Lending and NBFC",
    "slug": "loan-enquiry-qualifier",
    "name": "Loan enquiry qualifier",
    "posted": "Lead generation executive",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Asks loan type, amount, income band and city",
      "Reads the disclosures",
      "Routes to the right product queue"
    ],
    "tools": [
      "google-sheets",
      "rest-api"
    ],
    "status": "next",
    "signal": "Insurance and lending lead-gen postings; DND checked before dial",
    "jobs": "lead-qualification-telecaller",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "Insurance agencies",
    "slug": "policy-renewal-caller",
    "name": "Policy renewal caller",
    "posted": "Renewal executive",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls 30, 15 and 3 days before expiry",
      "Sends the renewal link and confirms payment",
      "Flags a lapsed policy to the agent"
    ],
    "tools": [
      "google-sheets",
      "razorpay"
    ],
    "status": "next",
    "signal": "Insurance hiring up 7% YoY; renewal calls are the bulk of an agency’s phone work",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "CA and tax firms",
    "slug": "ca-document-chaser",
    "name": "Document and compliance chaser",
    "posted": "Article / junior accountant",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp",
      "email"
    ],
    "does": [
      "Chases clients for GST and TDS documents before the due date",
      "Reads what is missing from a checklist",
      "Confirms receipt and closes the item"
    ],
    "tools": [
      "google-sheets",
      "tally"
    ],
    "status": "next",
    "signal": "Compliance reminder pack exists; monthly deadline cycle",
    "jobs": null,
    "note": "Extends the existing Compliance Reminder Bot",
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "Chit funds and co-operatives",
    "slug": "chit-instalment-reminder",
    "name": "Instalment reminder caller",
    "posted": "Field collector’s desk",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Reminds members of the monthly instalment",
      "Records the payment mode promised",
      "Escalates repeated misses"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "Tamil Nadu and Kerala chit funds run on phone reminders",
    "jobs": null,
    "note": null,
    "reach": "india"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "D2C brands",
    "slug": "order-confirmation",
    "name": "Order confirmation caller",
    "posted": "Order confirmation executive",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Confirms COD orders minutes after checkout",
      "Reads back address, landmark and pincode",
      "Writes confirmed, cancelled or changed to the order"
    ],
    "tools": [
      "shopify",
      "woocommerce",
      "google-sheets"
    ],
    "status": "live",
    "signal": "Order-confirmation job page; RTO reduction",
    "jobs": "order-confirmation-executive",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "D2C brands",
    "slug": "ndr-recovery-caller",
    "name": "NDR recovery caller",
    "posted": "Ops executive",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls when a delivery attempt fails",
      "Books a reattempt slot",
      "Updates the shipment"
    ],
    "tools": [
      "shiprocket",
      "delhivery",
      "google-sheets"
    ],
    "status": "next",
    "signal": "D2C vertical page; NDR is the second-largest leak after RTO",
    "jobs": "order-confirmation-executive",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "D2C brands",
    "slug": "wismo-support",
    "name": "Where-is-my-order support",
    "posted": "Customer support executive",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp",
      "web"
    ],
    "does": [
      "Reads the tracking event to the customer",
      "Files wrong-item complaints with a photo request",
      "Starts a refund inside policy"
    ],
    "tools": [
      "shopify",
      "shiprocket",
      "freshdesk"
    ],
    "status": "live",
    "signal": "Support job page; MyOperator data: order status is a top-three use",
    "jobs": "customer-support-executive",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "D2C brands",
    "slug": "abandoned-cart-caller",
    "name": "Abandoned cart caller",
    "posted": "Sales executive",
    "kind": "routine",
    "channels": [
      "whatsapp",
      "phone"
    ],
    "does": [
      "Messages within an hour of an abandoned cart",
      "Answers the one question that stopped the purchase",
      "Sends a payment link"
    ],
    "tools": [
      "shopify",
      "razorpay"
    ],
    "status": "later",
    "signal": "WhatsApp automation guides list cart recovery first; keep it text-first",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "Local retail",
    "slug": "shop-enquiry-desk",
    "name": "Shop enquiry and stock desk",
    "posted": "Counter staff",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Answers timings, stock and price from a sheet",
      "Takes a reservation for pickup",
      "Sends directions"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "Kirana, electronics and furniture stores; text-first",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "Restaurants and cloud kitchens",
    "slug": "restaurant-reservations",
    "name": "Reservations and takeaway desk",
    "posted": "Reservation desk",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Takes table reservations by party size and time",
      "Takes a takeaway order from the menu",
      "Confirms and reminds"
    ],
    "tools": [
      "google-sheets",
      "razorpay"
    ],
    "status": "live",
    "signal": "Reservations Bot exists on the shelf; hospitality hiring up 15% YoY",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "Salons, spas and gyms",
    "slug": "salon-booking-desk",
    "name": "Salon and gym booking desk",
    "posted": "Front desk",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Books by service and stylist",
      "Reminds and fills cancellations from a waitlist",
      "Chases lapsed members"
    ],
    "tools": [
      "google-calendar",
      "google-sheets"
    ],
    "status": "next",
    "signal": "High no-show, high repeat; a clinic desk with different nouns",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Transporters",
    "slug": "delivery-confirmation-caller",
    "name": "Delivery confirmation caller",
    "posted": "Dispatch executive",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Confirms presence, gate and payment with the consignee",
      "Leaves a note for the driver",
      "Reschedules a failed attempt"
    ],
    "tools": [
      "google-sheets",
      "rest-api"
    ],
    "status": "live",
    "signal": "Order confirmation × logistics pair page",
    "jobs": "order-confirmation-executive",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Manufacturers",
    "slug": "procurement-follow-up",
    "name": "Vendor follow-up caller",
    "posted": "Procurement executive",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp",
      "email"
    ],
    "does": [
      "Chases every open PO for dispatch dates",
      "Records vehicle and invoice details",
      "Flags slips to accounts"
    ],
    "tools": [
      "tally",
      "google-sheets"
    ],
    "status": "live",
    "signal": "Procurement job page; Tally connector",
    "jobs": "procurement-follow-up-executive",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Manufacturers",
    "slug": "receivables-chaser",
    "name": "Receivables chaser (B2B)",
    "posted": "Accounts executive",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp",
      "email"
    ],
    "does": [
      "Chases invoices past due with the invoice number and amount",
      "Records the promised date",
      "Escalates 60-day items"
    ],
    "tools": [
      "tally",
      "zoho-books"
    ],
    "status": "next",
    "signal": "B2B collections is different from consumer collections: invoice-driven, accounts-desk to accounts-desk",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Manufacturers",
    "slug": "shift-attendance-caller",
    "name": "Shift attendance and absence caller",
    "posted": "HR executive",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls absent workers by 9 am",
      "Confirms the next shift roster",
      "Logs reasons"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "Factory HR; Hindi and regional languages",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Fleet and drivers",
    "slug": "driver-dispatch-desk",
    "name": "Driver dispatch desk",
    "posted": "Dispatch coordinator",
    "kind": "both",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Assigns trips and confirms pickup times with drivers",
      "Answers where-is-my-truck for shippers",
      "Raises exceptions to ops"
    ],
    "tools": [
      "google-sheets",
      "rest-api"
    ],
    "status": "later",
    "signal": "Support × logistics pair page",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Hospitality and travel",
    "industry": "Hotels and homestays",
    "slug": "hotel-reservations",
    "name": "Hotel reservations desk",
    "posted": "Reservation executive",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Quotes availability and rates from a sheet",
      "Takes the booking and sends the payment link",
      "Answers check-in, parking and cancellation"
    ],
    "tools": [
      "google-sheets",
      "razorpay"
    ],
    "status": "next",
    "signal": "Hospitality hiring up 15% YoY; Reservations Bot base",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Hospitality and travel",
    "industry": "Travel agencies",
    "slug": "travel-enquiry-qualifier",
    "name": "Travel enquiry qualifier",
    "posted": "Travel consultant",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Asks dates, destination, budget and group size",
      "Sends the itinerary options",
      "Books the consultant call"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Seasonal enquiry bursts; text-heavy",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Hospitality and travel",
    "industry": "Tour and pilgrimage operators",
    "slug": "pilgrimage-booking-desk",
    "name": "Pilgrimage and tour booking desk",
    "posted": "Booking executive",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Answers dates, seats and inclusions",
      "Takes the booking and advance",
      "Reminds before departure"
    ],
    "tools": [
      "google-sheets",
      "razorpay"
    ],
    "status": "later",
    "signal": "MyOperator lists spiritual organisations among deployments; regional languages matter",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Law firms and legal services",
    "slug": "legal-intake-desk",
    "name": "Client intake desk",
    "posted": "Office assistant",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Takes the matter type, urgency and contact",
      "Books the consultation",
      "Never gives legal advice"
    ],
    "tools": [
      "google-calendar",
      "google-sheets"
    ],
    "status": "later",
    "signal": "Intake without advice; handoff rule is the product",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Consultancies and agencies",
    "slug": "agency-lead-qualifier",
    "name": "Agency lead qualifier",
    "posted": "Business development executive",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp",
      "email"
    ],
    "does": [
      "Qualifies inbound enquiries on scope, budget and timeline",
      "Books the discovery call",
      "Sends the deck"
    ],
    "tools": [
      "google-calendar",
      "hubspot"
    ],
    "status": "next",
    "signal": "Lead qualification job page",
    "jobs": "lead-qualification-telecaller",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Home services (AC, plumbing, pest)",
    "slug": "service-booking-desk",
    "name": "Service booking and reminder desk",
    "posted": "Customer care executive",
    "kind": "both",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Books a technician slot by area",
      "Reminds the customer and confirms the technician",
      "Chases AMC renewals"
    ],
    "tools": [
      "google-sheets",
      "google-calendar"
    ],
    "status": "next",
    "signal": "High call volume, low ticket; AMC renewal is a routine",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Automotive dealers and garages",
    "slug": "service-due-reminder",
    "name": "Service-due reminder caller",
    "posted": "Service advisor",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls when a service is due by odometer or date",
      "Books the slot and pickup",
      "Confirms the day before"
    ],
    "tools": [
      "google-sheets",
      "google-calendar"
    ],
    "status": "next",
    "signal": "Dealer service desks post this job every quarter",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Automotive dealers",
    "slug": "test-drive-scheduler",
    "name": "Test-drive scheduler",
    "posted": "Sales consultant",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls back a web enquiry and books a test drive",
      "Captures model and finance interest",
      "Reminds and reports"
    ],
    "tools": [
      "google-sheets",
      "google-calendar"
    ],
    "status": "later",
    "signal": "Portal leads with fast decay",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Recruitment and HR",
    "industry": "Staffing and recruitment",
    "slug": "candidate-screening-caller",
    "name": "Candidate screening caller",
    "posted": "Recruiter / sourcer",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls applicants with five screening questions",
      "Confirms notice period, location and expected pay",
      "Books the interview slot"
    ],
    "tools": [
      "google-sheets",
      "google-calendar"
    ],
    "status": "next",
    "signal": "Grok Bot and Lindy both ship a recruiting coordinator; Indian volume hiring is phone-first",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Recruitment and HR",
    "industry": "Any employer",
    "slug": "interview-reminder-caller",
    "name": "Interview reminder and no-show caller",
    "posted": "HR coordinator",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Reminds the evening before",
      "Reschedules a no-show",
      "Reports attendance to the recruiter"
    ],
    "tools": [
      "google-calendar"
    ],
    "status": "later",
    "signal": "No-show is the recruiter’s biggest leak",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Recruitment and HR",
    "industry": "Any employer",
    "slug": "employee-helpdesk",
    "name": "Employee HR helpdesk",
    "posted": "HR executive",
    "kind": "text",
    "channels": [
      "whatsapp",
      "web"
    ],
    "does": [
      "Answers leave, payroll date and policy questions from the handbook",
      "Files a ticket for anything else",
      "Escalates grievances to a person"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "Internal Knowledge Bot base; text-only",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "internal-knowledge",
    "name": "Internal knowledge bot",
    "posted": "Office assistant",
    "kind": "text",
    "channels": [
      "whatsapp",
      "web"
    ],
    "does": [
      "Answers staff questions from the company’s documents",
      "Says when it does not know",
      "Records the gap for the owner"
    ],
    "tools": [
      "google-drive"
    ],
    "status": "live",
    "signal": "Internal Knowledge Bot on the shelf",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "compliance-reminder",
    "name": "Compliance reminder bot",
    "posted": "Accounts / admin",
    "kind": "routine",
    "channels": [
      "whatsapp",
      "email"
    ],
    "does": [
      "Reminds of GST, TDS, licence and renewal dates",
      "Chases the owner until it is marked done",
      "Logs what was filed when"
    ],
    "tools": [
      "google-sheets",
      "tally"
    ],
    "status": "live",
    "signal": "Compliance Reminder Bot on the shelf",
    "jobs": null,
    "note": null,
    "reach": "india"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "review-request-caller",
    "name": "Review and feedback caller",
    "posted": "Customer care",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls after a service and asks three questions",
      "Records consent and the transcript",
      "Sends the review link to happy customers"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "next",
    "signal": "Our own review caller in the plan; directories skill 10-in-30 protocol",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "missed-call-callback",
    "name": "Missed-call callback bot",
    "posted": "Front office",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls back every missed call within two minutes",
      "Takes the message or books",
      "Sends a WhatsApp if unanswered"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "next",
    "signal": "Missed-call service exists in the product; make it a role",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "vendor-quote-collector",
    "name": "Vendor quote collector",
    "posted": "Purchase assistant",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp",
      "email"
    ],
    "does": [
      "Calls three vendors for a quote on a list",
      "Records price, delivery and terms",
      "Tables them for the owner"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "Haggle Bot on Grok’s marketplace is the enterprise version",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "daily-summary-reporter",
    "name": "Daily summary reporter",
    "posted": "Owner’s assistant",
    "kind": "routine",
    "channels": [
      "whatsapp",
      "email"
    ],
    "does": [
      "Sends the owner a 9 pm summary of calls, bookings, dues and complaints",
      "Flags what needs a decision",
      "Reads it aloud on request"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "next",
    "signal": "Daily report service exists in the product",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Government, NGOs and community",
    "industry": "Temples and religious trusts",
    "slug": "darshan-booking-desk",
    "name": "Darshan and seva booking desk",
    "posted": "Office staff",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Answers timings, seva rates and dress code",
      "Takes seva bookings and donations by link",
      "Reminds before the date"
    ],
    "tools": [
      "google-sheets",
      "razorpay"
    ],
    "status": "later",
    "signal": "Spiritual organisations appear in SMB deployment data; regional languages",
    "jobs": null,
    "note": null,
    "reach": "india"
  },
  {
    "sector": "Government, NGOs and community",
    "industry": "NGOs and trusts",
    "slug": "donor-follow-up-caller",
    "name": "Donor follow-up caller",
    "posted": "Fundraising executive",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Thanks donors and confirms 80G receipts",
      "Reminds pledges",
      "Records preferences"
    ],
    "tools": [
      "google-sheets",
      "razorpay"
    ],
    "status": "later",
    "signal": "Pledge follow-up is manual everywhere",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Government, NGOs and community",
    "industry": "Panchayats and civic bodies",
    "slug": "grievance-intake-desk",
    "name": "Grievance intake desk",
    "posted": "Helpdesk operator",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Logs a complaint with location and category",
      "Gives a ticket number and status",
      "Escalates by rule"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "Sovereign tier fit; procurement-led sales",
    "jobs": null,
    "note": null,
    "reach": "india"
  },
  {
    "sector": "Agriculture and rural",
    "industry": "Agri-input dealers",
    "slug": "agri-order-reminder",
    "name": "Seasonal order and payment reminder",
    "posted": "Dealer’s counter staff",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Reminds farmers of seasonal inputs and credit dues",
      "Takes the order and delivery date",
      "Records the promise"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "Regional languages, seasonal peaks, credit cycles",
    "jobs": null,
    "note": null,
    "reach": "india"
  },
  {
    "sector": "Agriculture and rural",
    "industry": "Dairy and FPOs",
    "slug": "collection-schedule-caller",
    "name": "Collection schedule caller",
    "posted": "Field coordinator",
    "kind": "routine",
    "channels": [
      "phone"
    ],
    "does": [
      "Announces collection timings and rates",
      "Confirms quantities for the next day",
      "Logs no-shows"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "Daily routine over voice; low text literacy",
    "jobs": null,
    "note": null,
    "reach": "india"
  },
  {
    "sector": "Healthcare",
    "industry": "Diagnostic labs",
    "slug": "lab-report-delivery",
    "name": "Report delivery and query desk",
    "posted": "Lab customer care",
    "channels": [
      "whatsapp",
      "email"
    ],
    "does": [
      "Sends the report PDF on WhatsApp the moment it is signed off",
      "Answers when will my report be ready without reading a value",
      "Books a doctor call-back for questions about results"
    ],
    "tools": [
      "whatsapp-business",
      "rest-api",
      "google-sheets"
    ],
    "status": "next",
    "signal": "Labs answer 'is my report ready' hundreds of times a day; the WhatsApp guides list report delivery as the first lab automation",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Clinics and doctors",
    "slug": "pre-visit-messenger",
    "name": "Pre-visit and follow-up messenger",
    "posted": "Patient coordinator",
    "channels": [
      "whatsapp"
    ],
    "does": [
      "Sends preparation instructions and directions the evening before",
      "Asks how the patient is doing three days after the visit",
      "Logs a bad reply for the doctor to see"
    ],
    "tools": [
      "whatsapp-business",
      "google-calendar",
      "google-sheets"
    ],
    "status": "next",
    "signal": "Post-visit follow-up is the top retention message clinics send by hand",
    "jobs": "clinic-receptionist",
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Hospitals",
    "slug": "discharge-followup",
    "name": "Post-discharge follow-up messenger",
    "posted": "Patient relations executive",
    "channels": [
      "whatsapp"
    ],
    "does": [
      "Checks in on days 1, 3 and 7 after discharge",
      "Reminds of medicine timings and review dates",
      "Escalates a red-flag answer to the ward"
    ],
    "tools": [
      "whatsapp-business",
      "google-sheets"
    ],
    "status": "later",
    "signal": "Readmission calls are outsourced today; text is enough for the check-in",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Education",
    "industry": "Coaching institutes",
    "slug": "doubt-desk",
    "name": "Doubt desk from course material",
    "posted": "Academic support executive",
    "channels": [
      "whatsapp",
      "web"
    ],
    "does": [
      "Answers syllabus and timetable questions from uploaded notes",
      "Sends the right PDF or recording link",
      "Hands a subject doubt to the teacher on duty"
    ],
    "tools": [
      "google-drive",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Ed-tech support queues are mostly where-is-the-link questions",
    "jobs": "admissions-counsellor",
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Education",
    "industry": "Schools",
    "slug": "school-circular-broadcaster",
    "name": "Circular and homework broadcaster",
    "posted": "School office assistant",
    "channels": [
      "whatsapp",
      "email"
    ],
    "does": [
      "Sends circulars, homework and event notices by class",
      "Answers when is the PTM from the calendar",
      "Collects RSVPs and consent forms as fields"
    ],
    "tools": [
      "whatsapp-business",
      "google-sheets",
      "google-calendar"
    ],
    "status": "next",
    "signal": "Every school runs this by hand in class WhatsApp groups",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Education",
    "industry": "Colleges and institutes",
    "slug": "admissions-document-collector",
    "name": "Admissions document collector",
    "posted": "Admissions office assistant",
    "channels": [
      "whatsapp",
      "email"
    ],
    "does": [
      "Lists the documents pending for each applicant",
      "Receives uploads on WhatsApp and files them by applicant",
      "Reminds until the file is complete"
    ],
    "tools": [
      "whatsapp-business",
      "google-drive",
      "google-sheets"
    ],
    "status": "next",
    "signal": "Admissions season is a document chase; the desk role above books the slot, this one closes the file",
    "jobs": "admissions-counsellor",
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Real estate and construction",
    "industry": "Builders and brokers",
    "slug": "listing-enquiry-responder",
    "name": "Listing enquiry responder",
    "posted": "Pre-sales executive",
    "channels": [
      "whatsapp",
      "web",
      "email"
    ],
    "does": [
      "Replies to a portal or website enquiry within a minute with the brochure",
      "Asks budget, locality and configuration in chat",
      "Hands a hot lead to the qualifier or a person"
    ],
    "tools": [
      "whatsapp-business",
      "google-sheets",
      "google-drive"
    ],
    "status": "next",
    "signal": "Speed-to-lead on 99acres and MagicBricks enquiries; most first replies are brochure sends",
    "jobs": "real-estate-telecaller",
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Real estate and construction",
    "industry": "Property management",
    "slug": "tenant-notice-messenger",
    "name": "Rent and notice messenger",
    "posted": "Society office assistant",
    "channels": [
      "whatsapp",
      "email"
    ],
    "does": [
      "Sends maintenance bills and rent reminders by flat",
      "Broadcasts water, lift and power notices",
      "Records who paid from the bank statement upload"
    ],
    "tools": [
      "whatsapp-business",
      "google-sheets",
      "tally"
    ],
    "status": "later",
    "signal": "Society apps exist, but WhatsApp is where residents read",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "Lending and NBFC",
    "slug": "kyc-document-collector",
    "name": "KYC and document collector",
    "posted": "Loan processing executive",
    "channels": [
      "whatsapp",
      "email"
    ],
    "does": [
      "Asks for PAN, Aadhaar, bank statement and salary slips in order",
      "Files each upload against the application",
      "Reminds daily until the set is complete"
    ],
    "tools": [
      "whatsapp-business",
      "google-drive",
      "rest-api"
    ],
    "status": "next",
    "signal": "Loan files stall on documents, not decisions; Lindy and Zapier both ship document chasers",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "Insurance agencies",
    "slug": "policy-query-desk",
    "name": "Policy and claim query desk",
    "posted": "Customer service executive",
    "channels": [
      "whatsapp",
      "web"
    ],
    "does": [
      "Answers coverage, premium date and claim-status questions from the policy sheet",
      "Sends the policy PDF and claim form",
      "Hands a claim intimation to the agent with the details captured"
    ],
    "tools": [
      "google-sheets",
      "google-drive",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Agents field the same ten questions per policy year",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "CA and tax firms",
    "slug": "client-status-mailer",
    "name": "Client status and due-date mailer",
    "posted": "Office assistant",
    "channels": [
      "email",
      "whatsapp"
    ],
    "does": [
      "Sends each client a monthly status of filings done and pending",
      "Answers what do you need from me for this month",
      "Collects the missing invoices as uploads"
    ],
    "tools": [
      "google-sheets",
      "google-drive",
      "tally"
    ],
    "status": "next",
    "signal": "CA firms lose clients on silence, not on filings",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "D2C brands",
    "slug": "whatsapp-order-taker",
    "name": "WhatsApp catalogue and order taker",
    "posted": "Sales chat executive",
    "channels": [
      "whatsapp"
    ],
    "does": [
      "Sends the catalogue and answers size, colour and stock questions",
      "Takes the order and payment link in chat",
      "Writes the order to the store and confirms"
    ],
    "tools": [
      "whatsapp-business",
      "shopify",
      "razorpay"
    ],
    "status": "next",
    "signal": "WhatsApp commerce is the top use in every Indian automation guide",
    "jobs": "order-confirmation-executive",
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "D2C brands",
    "slug": "returns-desk",
    "name": "Returns and exchange desk",
    "posted": "Customer support executive",
    "channels": [
      "whatsapp",
      "web",
      "email"
    ],
    "does": [
      "Checks the order and the return window",
      "Raises the return or exchange and sends the pickup date",
      "Hands a damaged-goods claim to a person with photos attached"
    ],
    "tools": [
      "shopify",
      "rest-api",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Returns are a third of D2C support tickets",
    "jobs": "customer-support-executive",
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "D2C brands",
    "slug": "offer-broadcaster",
    "name": "Offer and restock broadcaster",
    "posted": "Marketing executive",
    "channels": [
      "whatsapp",
      "email"
    ],
    "does": [
      "Sends a launch or offer to a segment from the sheet",
      "Tells customers who asked when an item is back",
      "Records replies and opt-outs as fields"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business",
      "shopify"
    ],
    "status": "later",
    "signal": "Broadcast tools exist; the reply handling is what they lack",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "Local retail",
    "slug": "instagram-dm-responder",
    "name": "Instagram and website DM responder",
    "posted": "Social media executive",
    "channels": [
      "web",
      "whatsapp"
    ],
    "does": [
      "Answers price, availability and timings from the sheet",
      "Moves a serious buyer to WhatsApp with the details captured",
      "Flags a complaint to the owner"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Small shops sell through DMs; Instagram inbound needs a channel the platform does not have yet",
    "jobs": null,
    "note": "Needs an Instagram channel; web chat and WhatsApp halves work sooner",
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Transporters",
    "slug": "shipment-status-desk",
    "name": "Shipment status desk for shippers",
    "posted": "Customer service executive",
    "channels": [
      "whatsapp",
      "email",
      "web"
    ],
    "does": [
      "Answers where is my consignment from the tracking sheet",
      "Sends the proof of delivery on request",
      "Logs a complaint with the LR number"
    ],
    "tools": [
      "google-sheets",
      "rest-api",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Support × logistics pair page; the phone half is live as delivery confirmation",
    "jobs": "customer-support-executive",
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Manufacturers",
    "slug": "supplier-invoice-clerk",
    "name": "Supplier invoice and PO clerk",
    "posted": "Accounts assistant",
    "channels": [
      "email"
    ],
    "does": [
      "Reads supplier invoices from the inbox and matches them to the PO",
      "Enters the matched invoice in Tally for approval",
      "Writes back to the supplier on a mismatch"
    ],
    "tools": [
      "tally",
      "google-drive",
      "email"
    ],
    "status": "later",
    "signal": "n8n's most-imported finance workflow is supplier invoice extraction",
    "jobs": "procurement-follow-up",
    "note": "Needs inbound email and document extraction",
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Hospitality and travel",
    "industry": "Hotels and homestays",
    "slug": "pre-arrival-messenger",
    "name": "Pre-arrival and in-stay messenger",
    "posted": "Guest relations executive",
    "channels": [
      "whatsapp"
    ],
    "does": [
      "Sends check-in details, directions and ID requirements before arrival",
      "Takes room-service and housekeeping requests in chat",
      "Asks for a review at checkout"
    ],
    "tools": [
      "whatsapp-business",
      "google-sheets"
    ],
    "status": "next",
    "signal": "Hospitality hiring up 15% (Naukri JobSpeak); guest messaging is manual at small hotels",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Hospitality and travel",
    "industry": "Travel agencies",
    "slug": "itinerary-sender",
    "name": "Itinerary and document sender",
    "posted": "Travel desk executive",
    "channels": [
      "whatsapp",
      "email"
    ],
    "does": [
      "Sends the itinerary, tickets and vouchers by traveller",
      "Answers what time is my pickup from the plan",
      "Reminds of visa and passport dates"
    ],
    "tools": [
      "google-drive",
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Agencies resend the same documents on the phone all day",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Consultancies and agencies",
    "slug": "proposal-drafter",
    "name": "Proposal and quote drafter",
    "posted": "Pre-sales executive",
    "channels": [
      "email",
      "web"
    ],
    "does": [
      "Turns a qualified enquiry into a first-draft proposal from the rate sheet",
      "Sends it for a human to approve before it goes out",
      "Follows up on day 3 and day 10"
    ],
    "tools": [
      "google-drive",
      "google-sheets",
      "email"
    ],
    "status": "later",
    "signal": "Zapier and Lindy both ship proposal and meeting-prep agents",
    "jobs": "lead-qualification-executive",
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Home services (AC, plumbing, pest)",
    "slug": "technician-dispatch-messenger",
    "name": "Job card and technician messenger",
    "posted": "Service coordinator",
    "channels": [
      "whatsapp"
    ],
    "does": [
      "Sends the technician the job card and address",
      "Tells the customer the technician's name and arrival window",
      "Collects the completion photo and payment status"
    ],
    "tools": [
      "whatsapp-business",
      "google-sheets"
    ],
    "status": "next",
    "signal": "Urban Company-style coordination done by hand at local firms",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Recruitment and HR",
    "industry": "Staffing and recruitment",
    "slug": "candidate-document-collector",
    "name": "Candidate document and offer messenger",
    "posted": "HR executive",
    "channels": [
      "whatsapp",
      "email"
    ],
    "does": [
      "Sends the offer and collects acceptance and documents",
      "Reminds until the joining file is complete",
      "Answers joining-date and location questions"
    ],
    "tools": [
      "whatsapp-business",
      "google-drive",
      "google-sheets"
    ],
    "status": "next",
    "signal": "Offer-to-join drop-off is the number every recruiter quotes",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Recruitment and HR",
    "industry": "Any employer",
    "slug": "attendance-leave-collector",
    "name": "Attendance and leave collector",
    "posted": "HR assistant",
    "channels": [
      "whatsapp"
    ],
    "does": [
      "Takes leave requests in chat and writes them to the sheet",
      "Sends the manager an approve or reject card",
      "Publishes the month's attendance summary"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Small firms run leave on WhatsApp messages to the owner",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "website-whatsapp-enquiry-desk",
    "name": "Website and WhatsApp enquiry desk",
    "posted": "Customer care executive",
    "channels": [
      "web",
      "whatsapp"
    ],
    "does": [
      "Answers product, price and timing questions from the knowledge base",
      "Captures name, need and phone as a lead",
      "Hands a buying customer to a person or to the caller role"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "The text half of every front desk; the internal knowledge bot is the same engine facing staff",
    "jobs": "customer-support-executive",
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "email-inbox-triage",
    "name": "Email inbox triage and reply drafter",
    "posted": "Office assistant",
    "channels": [
      "email"
    ],
    "does": [
      "Sorts the shared inbox into enquiry, invoice, complaint and spam",
      "Drafts a reply for approval on enquiries and complaints",
      "Files attachments by sender"
    ],
    "tools": [
      "email",
      "google-drive",
      "google-sheets"
    ],
    "status": "later",
    "signal": "Lindy's first agent; needs inbound email on the platform",
    "jobs": null,
    "note": "Needs inbound email",
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "review-reply-writer",
    "name": "Google review reply writer",
    "posted": "Marketing executive",
    "channels": [
      "web"
    ],
    "does": [
      "Drafts a reply to every new Google review in the business's voice",
      "Sends a bad review to the owner before replying",
      "Posts approved replies"
    ],
    "tools": [
      "google-business-profile",
      "google-sheets"
    ],
    "status": "later",
    "signal": "Directories skill: reply rate is a ranking signal",
    "jobs": null,
    "note": "Needs a Google Business Profile connector",
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "lead-crm-updater",
    "name": "Lead enrichment and CRM updater",
    "posted": "Sales operations executive",
    "channels": [
      "web",
      "email"
    ],
    "does": [
      "Takes every new lead from the form or inbox and fills the CRM row",
      "Adds company and city from public sources",
      "Assigns by rule and tells the owner on WhatsApp"
    ],
    "tools": [
      "google-sheets",
      "zoho-crm",
      "hubspot"
    ],
    "status": "next",
    "signal": "The most-imported n8n workflow is lead capture to Sheets",
    "jobs": "lead-qualification-executive",
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "ticket-triage",
    "name": "Support ticket triage",
    "posted": "Support executive",
    "channels": [
      "web",
      "whatsapp",
      "email"
    ],
    "does": [
      "Answers the known questions and closes them",
      "Tags and routes the rest by category and urgency",
      "Reports the day's unanswered questions for the knowledge base"
    ],
    "tools": [
      "freshdesk",
      "zoho-desk",
      "google-sheets"
    ],
    "status": "next",
    "signal": "Grok Bot and Zapier both ship a support queue bot",
    "jobs": "customer-support-executive",
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Government, NGOs and community",
    "industry": "NGOs and trusts",
    "slug": "donation-receipt-sender",
    "name": "Donation receipt and update sender",
    "posted": "Donor relations executive",
    "channels": [
      "email",
      "whatsapp"
    ],
    "does": [
      "Sends the 80G receipt within a minute of a donation",
      "Sends quarterly impact updates by donor",
      "Answers where did my money go from the report"
    ],
    "tools": [
      "razorpay",
      "email",
      "google-sheets"
    ],
    "status": "later",
    "signal": "Receipts are the donor complaint every NGO has",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "global"
  },
  {
    "sector": "Agriculture and rural",
    "industry": "Agri-input dealers",
    "slug": "mandi-price-broadcaster",
    "name": "Price and weather broadcaster",
    "posted": "Field assistant",
    "channels": [
      "whatsapp"
    ],
    "does": [
      "Sends the day's mandi prices and weather to farmers by crop",
      "Answers stock and price questions in the local language",
      "Takes a pre-order as fields"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Agri WhatsApp groups are the channel; voice is dearer than the margin",
    "jobs": null,
    "note": null,
    "kind": "text",
    "reach": "india"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "renewal-negotiator",
    "name": "Renewal and quote negotiator",
    "posted": "Purchase executive",
    "kind": "routine",
    "channels": [
      "phone",
      "email"
    ],
    "does": [
      "Lists every AMC, insurance, software and internet renewal from the ledger 45 days out",
      "Calls two alternative vendors for a quote",
      "Calls the incumbent with the quotes and asks for a counter; the owner decides"
    ],
    "tools": [
      "tally",
      "quickbooks",
      "google-sheets",
      "email"
    ],
    "status": "next",
    "signal": "Grok Bot's Haggle Bot and Harvey Specter, translated: Indian SMB renewals are won on a phone call, not a portal",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "refund-recovery-chaser",
    "name": "Refund and deposit recovery chaser",
    "posted": "Accounts assistant",
    "channels": [
      "phone",
      "email",
      "whatsapp"
    ],
    "kind": "routine",
    "does": [
      "Finds money owed to the business: courier RTO refunds, security deposits, GST refunds, bank reversals, vendor advances",
      "Chases each one weekly with the reference number",
      "Reports what came back and what is stuck"
    ],
    "tools": [
      "tally",
      "quickbooks",
      "google-sheets",
      "email"
    ],
    "status": "next",
    "signal": "Grok Bot's Bounty Hunter and Fixer; every Indian SMB has lakhs sitting in refunds nobody chases",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "promise-chaser",
    "name": "Promise chaser",
    "posted": "Sales coordinator",
    "kind": "routine",
    "channels": [
      "whatsapp",
      "phone",
      "email"
    ],
    "does": [
      "Reads every call and chat for promises made by staff or customers: I will send it Friday, call me after 4",
      "Reminds the staff member before the promise is due",
      "Calls the customer if the promise was theirs"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Grok Bot's GTM Loop Closer; uses our own transcripts, nobody else has the phone half",
    "jobs": "lead-qualification-executive",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "unhappy-reviewer-callback",
    "name": "Unhappy reviewer call-back",
    "posted": "Customer care manager",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Watches Google, JustDial and Instagram for a review under four stars",
      "Calls the reviewer within the hour, listens, records the complaint as fields",
      "Tells the owner and drafts the public reply for approval"
    ],
    "tools": [
      "google-business-profile",
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Grok Bot's Overheard plus a phone; a call inside an hour is what turns a two-star into a deleted review",
    "jobs": null,
    "note": "Needs a Google Business Profile connector",
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "telecaller-call-coach",
    "name": "Human telecaller call coach",
    "posted": "Team lead / quality analyst",
    "kind": "routine",
    "channels": [
      "whatsapp",
      "email"
    ],
    "does": [
      "Listens to the human team's recorded calls on the same number",
      "Scores greeting, questions asked, close and register update",
      "Sends each caller a two-line note every evening and the owner a weekly board"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Grok Bot's Sales Call Coach; our judge already scores bot calls, pointing it at human calls is the same engine",
    "jobs": "collections-telecaller",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "mystery-caller",
    "name": "Mystery caller",
    "posted": "Quality auditor",
    "kind": "routine",
    "channels": [
      "phone"
    ],
    "does": [
      "Calls your own branches or desk twice a week as a customer with a scripted need",
      "Scores rings to pick up, greeting, accuracy of the answer, and whether the lead was captured",
      "Sends the owner a branch-by-branch scorecard"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Grok Bot's Scam Drill Coach inverted; our scripted caller and judge are already built for evals",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "owner-voice-note-clerk",
    "name": "Owner's voice-note clerk",
    "posted": "Personal assistant",
    "kind": "text",
    "channels": [
      "whatsapp"
    ],
    "does": [
      "Takes the owner's WhatsApp voice notes in any language and turns each into a task with an owner and a date",
      "Assigns it to the staff member on WhatsApp and chases until done",
      "Reads the open list back on request"
    ],
    "tools": [
      "whatsapp-business",
      "google-sheets"
    ],
    "status": "next",
    "signal": "Grok Bot's Todo and Chief of Staff; Indian owners run the business on voice notes",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "morning-brief-call",
    "name": "Morning brief by phone",
    "posted": "Chief of staff",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls the owner at a fixed time with yesterday's calls, bookings, collections and complaints",
      "Takes instructions on the call and turns them into tasks",
      "Sends the same brief as text for the record"
    ],
    "tools": [
      "google-sheets",
      "tally"
    ],
    "status": "next",
    "signal": "Grok Bot's Morning Newspaper and Exec CoS Digest, for an owner who does not read dashboards",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "festival-greeter",
    "name": "Holiday and birthday greeter",
    "posted": "Customer relations executive",
    "kind": "routine",
    "channels": [
      "whatsapp",
      "phone"
    ],
    "does": [
      "Greets top customers on Diwali, Christmas, Eid, Lunar New Year, Thanksgiving and their birthday, by name in their language",
      "Calls the top fifty personally with the owner's message",
      "Records replies and any order that comes out of it"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Grok Bot's Office Ops Desk tracks birthdays; for a local business the holiday greeting is where repeat business starts",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "balance-confirmation-caller",
    "name": "Year-end balance confirmation caller",
    "posted": "Audit assistant",
    "kind": "routine",
    "channels": [
      "phone",
      "email",
      "whatsapp"
    ],
    "does": [
      "Calls every debtor and creditor with the ledger balance at year end",
      "Records confirmed, disputed and the disputed amount",
      "Sends the auditor the confirmation list with recordings"
    ],
    "tools": [
      "tally",
      "quickbooks",
      "xero",
      "email"
    ],
    "status": "next",
    "signal": "Auditors everywhere send confirmation letters nobody returns; a call gets an answer",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Every business",
    "industry": "Any",
    "slug": "failed-payment-handler",
    "name": "Failed payment and refund handler",
    "posted": "Payments support executive",
    "kind": "routine",
    "channels": [
      "whatsapp",
      "phone"
    ],
    "does": [
      "Calls or messages a customer whose payment failed with a fresh link",
      "Handles a refund request by rule and raises it in Razorpay",
      "Tells the owner about a chargeback the same hour"
    ],
    "tools": [
      "razorpay",
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Grok Bot's Stripe Refund Handler, on Razorpay and UPI",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "FMCG distributors",
    "slug": "retailer-order-booker",
    "name": "Retailer order booker",
    "posted": "Order booker / salesman",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls every retailer on the beat on their day with this week's scheme",
      "Takes the order SKU by SKU and writes it to the distributor software",
      "Flags a shop that skipped two weeks"
    ],
    "tools": [
      "google-sheets",
      "tally",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "The order booker is the most common sales job in Indian distribution and it is a phone job on a fixed beat",
    "jobs": "order-confirmation-executive",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "Appliance and electronics dealers",
    "slug": "warranty-amc-caller",
    "name": "Warranty registration and AMC caller",
    "posted": "Service sales executive",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls a buyer a week after delivery to register the warranty and check installation",
      "Calls before the warranty ends with the AMC offer",
      "Books the service visit"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Dealers make more on AMC than on the appliance, and the call is never made",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Transporters",
    "slug": "eway-bill-expiry-caller",
    "name": "E-way bill expiry caller",
    "posted": "Dispatch executive",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Watches every e-way bill's validity against the vehicle's location update",
      "Calls the driver and the consignee four hours before expiry",
      "Extends or raises it to the office with the reason"
    ],
    "tools": [
      "google-sheets",
      "rest-api",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "An expired e-way bill is a fine and a detained truck; no logistics SaaS makes the call",
    "jobs": null,
    "note": null,
    "reach": "india"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Fleet and drivers",
    "slug": "driver-document-expiry",
    "name": "Driver and vehicle document caller",
    "posted": "Fleet coordinator",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Tracks licence, insurance, fitness, permit and PUC dates per vehicle and driver",
      "Calls the driver 15 days before and collects the renewed copy on WhatsApp",
      "Grounds a vehicle on the sheet if the date passes"
    ],
    "tools": [
      "google-sheets",
      "google-drive",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Grok Bot's Contracts Manager pattern; fleet fines in India are mostly expired documents",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Manufacturers",
    "slug": "tender-watcher",
    "name": "Tender and RFQ watcher",
    "posted": "Business development executive",
    "kind": "text",
    "channels": [
      "email",
      "whatsapp"
    ],
    "does": [
      "Watches GeM, state portals and the inbox for tenders matching the product list",
      "Summarises eligibility, EMD and due date in one card",
      "Chases the documents needed to bid"
    ],
    "tools": [
      "email",
      "google-drive",
      "google-sheets"
    ],
    "status": "later",
    "signal": "Grok Bot's Event Request Desk and Competitor Watch; MSMEs miss GeM bids because nobody reads the portal",
    "jobs": null,
    "note": null,
    "reach": "india"
  },
  {
    "sector": "Healthcare",
    "industry": "Diagnostic labs",
    "slug": "referring-doctor-caller",
    "name": "Referring doctor relationship caller",
    "posted": "Marketing executive (lab)",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls each referring doctor monthly with their patients' report turnaround and a thank you",
      "Asks what tests they want added",
      "Flags a doctor whose referrals dropped"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Labs and hospitals live on referrals; the visit is done by a field executive who never calls",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Education",
    "industry": "Coaching institutes",
    "slug": "parent-progress-caller",
    "name": "Parent progress caller",
    "posted": "Academic counsellor",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls each parent monthly with attendance, test marks and the teacher's one line",
      "Records the parent's concern as a field",
      "Flags a student at risk of dropping out"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Grok Bot's Canvas Student Assistant, aimed at the parent who pays; retention call every institute skips",
    "jobs": "admissions-counsellor",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Law firms and legal services",
    "slug": "hearing-date-caller",
    "name": "Hearing date and cause-list caller",
    "posted": "Law clerk",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Checks the eCourts cause list every evening for the firm's matters",
      "Calls the client with tomorrow's hearing, time and what to bring",
      "Records adjournments and the next date"
    ],
    "tools": [
      "rest-api",
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "The clerk's whole evening; no Indian legal SaaS makes the client call",
    "jobs": null,
    "note": null,
    "reach": "india"
  },
  {
    "sector": "Professional and home services",
    "industry": "Event planners and wedding vendors",
    "slug": "rsvp-caller",
    "name": "Guest RSVP and logistics caller",
    "posted": "Event coordinator",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls every guest on the list for RSVP, headcount and dietary needs",
      "Sends the venue map and pickup timing",
      "Reports the confirmed count to the caterer daily"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Indian weddings run on 500 phone calls made by cousins",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Field sales teams",
    "slug": "pre-visit-brief-caller",
    "name": "Pre-visit brief for field sales",
    "posted": "Sales coordinator",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls the salesman an hour before each visit with the account's history, dues and last promise",
      "Takes the visit outcome by voice after and writes it to the CRM",
      "Chases the next step"
    ],
    "tools": [
      "zoho-crm",
      "google-sheets"
    ],
    "status": "later",
    "signal": "Grok Bot's Market Memory and Witness; uses our organisation memory on a phone call",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Recruitment and HR",
    "industry": "Any employer",
    "slug": "old-candidate-reengager",
    "name": "Old candidate re-engager",
    "posted": "Recruiter",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls past applicants and ex-employees on the sheet when a role opens",
      "Checks availability, notice and expected pay",
      "Books the interview and updates the pool"
    ],
    "tools": [
      "google-sheets",
      "google-calendar",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Grok Bot's Talent Discovery; the cheapest candidate pool an SMB has is the one it already interviewed",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "Chit funds and co-operatives",
    "slug": "pdc-cheque-caller",
    "name": "Post-dated cheque and bounce caller",
    "posted": "Collections executive",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls two days before each post-dated cheque date to confirm funds",
      "Calls the same day on a bounce with the charges and the re-presentation date",
      "Records promise-to-pay"
    ],
    "tools": [
      "google-sheets",
      "tally"
    ],
    "status": "later",
    "signal": "PDCs still run NBFC and chit collections; the confirmation call is the job",
    "jobs": "collections-telecaller",
    "note": null,
    "reach": "india"
  },
  {
    "sector": "Government, NGOs and community",
    "industry": "Blood banks and hospitals",
    "slug": "blood-donor-caller",
    "name": "Blood donor caller",
    "posted": "Donor coordinator",
    "kind": "outbound",
    "channels": [
      "phone",
      "whatsapp"
    ],
    "does": [
      "Calls donors of the needed group who are past 90 days",
      "Books a slot and sends directions",
      "Thanks them after and records the next eligible date"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Blood banks call donor lists by hand in every shortage",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Agriculture and rural",
    "industry": "Dairy and FPOs",
    "slug": "harvest-aggregation-caller",
    "name": "Harvest quantity aggregation caller",
    "posted": "FPO field coordinator",
    "kind": "routine",
    "channels": [
      "phone"
    ],
    "does": [
      "Calls member farmers before harvest for expected quantity and date",
      "Totals it for the buyer and confirms the pickup plan",
      "Calls back with the price and the pickup slot"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "FPO coordinators aggregate by phone; voice only, because members do not type",
    "jobs": null,
    "note": null,
    "reach": "india"
  },
  {
    "sector": "Healthcare",
    "industry": "Medical and dental practices (US)",
    "slug": "insurance-eligibility-caller",
    "name": "Insurance eligibility and benefits caller",
    "posted": "Insurance verification specialist",
    "kind": "routine",
    "channels": [
      "phone",
      "email"
    ],
    "does": [
      "Calls the payer's provider line for every appointment two days out and sits through the IVR",
      "Records deductible, copay, coverage and authorisation need as fields",
      "Flags a patient whose plan lapsed before they arrive"
    ],
    "tools": [
      "rest-api",
      "google-sheets"
    ],
    "status": "later",
    "signal": "A full-time front-office job in every US practice; the hold time is the job",
    "jobs": null,
    "note": "Needs IVR navigation on outbound calls",
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Medical and dental practices (US)",
    "slug": "prior-auth-chaser",
    "name": "Prior authorisation chaser",
    "posted": "Authorisation coordinator",
    "kind": "routine",
    "channels": [
      "phone",
      "email"
    ],
    "does": [
      "Submits the request and calls the payer for status every two days",
      "Records the reference number and decision",
      "Tells the patient and the scheduler the moment it is approved"
    ],
    "tools": [
      "rest-api",
      "google-sheets",
      "email"
    ],
    "status": "later",
    "signal": "Practices lose procedures to auth delays; the chase is a phone job",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Dental",
    "slug": "unscheduled-treatment-caller",
    "name": "Unscheduled treatment plan caller",
    "posted": "Treatment coordinator",
    "kind": "routine",
    "channels": [
      "phone",
      "whatsapp",
      "sms"
    ],
    "does": [
      "Calls patients who accepted a treatment plan but never booked",
      "Answers cost and financing questions from the plan",
      "Books the appointment and tells the dentist what was said"
    ],
    "tools": [
      "google-calendar",
      "google-sheets"
    ],
    "status": "next",
    "signal": "Dental consultants call this the largest unbilled revenue in any practice",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Clinics and doctors",
    "slug": "waitlist-filler",
    "name": "Cancellation waitlist filler",
    "posted": "Scheduler",
    "kind": "routine",
    "channels": [
      "phone",
      "sms",
      "whatsapp"
    ],
    "does": [
      "When a slot opens, calls the waitlist in order until someone takes it",
      "Moves the booking and confirms by text",
      "Reports the fill rate"
    ],
    "tools": [
      "google-calendar",
      "google-sheets"
    ],
    "status": "next",
    "signal": "Every clinic keeps a paper waitlist and never has time to work it",
    "jobs": "clinic-receptionist",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Home care and senior care agencies",
    "slug": "caregiver-shift-filler",
    "name": "Caregiver shift filler",
    "posted": "Scheduling coordinator",
    "kind": "routine",
    "channels": [
      "phone",
      "sms",
      "whatsapp"
    ],
    "does": [
      "When a caregiver calls out, calls available caregivers by distance and skill until the shift is covered",
      "Confirms by text and updates the roster",
      "Tells the family who is coming"
    ],
    "tools": [
      "google-sheets",
      "google-calendar"
    ],
    "status": "next",
    "signal": "Home care agencies in the US and UK staff a person all night for this one task",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Healthcare",
    "industry": "Home care and senior care agencies",
    "slug": "daily-wellness-checkin",
    "name": "Daily wellness check-in caller",
    "posted": "Care coordinator",
    "kind": "routine",
    "channels": [
      "phone"
    ],
    "does": [
      "Calls each client at their chosen time, asks three questions, listens for distress",
      "Escalates a no-answer or a bad answer to the named contact within minutes",
      "Logs the call for the family"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Paid check-in call services exist in the US, UK and Japan; the call is the product",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Education",
    "industry": "Universities and colleges",
    "slug": "summer-melt-caller",
    "name": "Enrolment melt caller",
    "posted": "Admissions counsellor",
    "kind": "outbound",
    "channels": [
      "phone",
      "sms",
      "whatsapp"
    ],
    "does": [
      "Calls admitted students who have not completed the next step: deposit, housing, financial aid",
      "Answers from the checklist and books an advisor call",
      "Reports who is at risk of not showing in September"
    ],
    "tools": [
      "google-sheets",
      "google-calendar"
    ],
    "status": "next",
    "signal": "Summer melt is 10 to 20% of admitted students in the US; the fix is a phone call",
    "jobs": "admissions-counsellor",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Education",
    "industry": "Daycare and preschools",
    "slug": "daycare-waitlist-caller",
    "name": "Daycare waitlist and absence caller",
    "posted": "Centre administrator",
    "kind": "routine",
    "channels": [
      "phone",
      "sms",
      "whatsapp"
    ],
    "does": [
      "Offers an open place to the waitlist in order and records the answer",
      "Calls a parent when a child has not arrived by the cut-off",
      "Sends the day's notes to parents"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Childcare waitlists are worked by hand in every country",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Real estate and construction",
    "industry": "Rental agents and property managers",
    "slug": "showing-scheduler",
    "name": "Showing scheduler and applicant screener",
    "posted": "Leasing agent",
    "kind": "both",
    "channels": [
      "phone",
      "sms",
      "whatsapp",
      "email"
    ],
    "does": [
      "Answers every listing enquiry, asks move-in date, budget, pets and income band",
      "Books the showing and sends the address and lockbox time",
      "Chases the application after the showing"
    ],
    "tools": [
      "google-calendar",
      "google-sheets",
      "rest-api"
    ],
    "status": "next",
    "signal": "The Zillow and Rightmove enquiry flood; leasing agents answer the same ten questions all day",
    "jobs": "real-estate-telecaller",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Real estate and construction",
    "industry": "Rental agents and property managers",
    "slug": "lease-renewal-caller",
    "name": "Lease renewal and rent-change caller",
    "posted": "Property manager",
    "kind": "routine",
    "channels": [
      "phone",
      "email",
      "whatsapp"
    ],
    "does": [
      "Calls tenants 90 days before expiry with the renewal terms",
      "Records the answer and the reason for leaving",
      "Books the move-out inspection or sends the renewal for signature"
    ],
    "tools": [
      "google-sheets",
      "email"
    ],
    "status": "next",
    "signal": "Turnover is the biggest cost in rentals and renewal is a call nobody schedules",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Real estate and construction",
    "industry": "Builders and brokers",
    "slug": "showing-feedback-caller",
    "name": "Showing feedback caller",
    "posted": "Listing agent's assistant",
    "kind": "routine",
    "channels": [
      "phone",
      "sms",
      "email"
    ],
    "does": [
      "Calls the buyer's agent after every showing for feedback and interest level",
      "Records price objections as fields",
      "Sends the seller a weekly feedback summary"
    ],
    "tools": [
      "google-sheets",
      "email"
    ],
    "status": "later",
    "signal": "Listing agents in the US and UK chase this feedback by hand and sellers ask for it weekly",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Real estate and construction",
    "industry": "Contractors and trades",
    "slug": "estimate-followup-caller",
    "name": "Estimate follow-up caller",
    "posted": "Office manager (contractor)",
    "kind": "routine",
    "channels": [
      "phone",
      "sms",
      "email"
    ],
    "does": [
      "Follows up every open estimate on day 2, 7 and 14",
      "Answers scope and timing questions from the estimate",
      "Books the start date or records why it was lost"
    ],
    "tools": [
      "google-sheets",
      "google-calendar"
    ],
    "status": "next",
    "signal": "Roofing, HVAC and remodelling estimates die from silence; close rates double with follow-up",
    "jobs": "lead-qualification-executive",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Real estate and construction",
    "industry": "Contractors and trades",
    "slug": "subcontractor-availability-caller",
    "name": "Subcontractor and inspection scheduler",
    "posted": "Project coordinator",
    "kind": "routine",
    "channels": [
      "phone",
      "sms"
    ],
    "does": [
      "Calls subs for availability on each job's next phase and locks the date",
      "Calls the city inspection line to book the inspection",
      "Reschedules the chain when one slips"
    ],
    "tools": [
      "google-calendar",
      "google-sheets"
    ],
    "status": "later",
    "signal": "A general contractor's day is phone calls to subs and inspectors",
    "jobs": null,
    "note": "Needs IVR navigation for inspection lines",
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "Insurance agencies",
    "slug": "fnol-intake-desk",
    "name": "Claims first-notice intake desk",
    "posted": "Claims intake specialist",
    "kind": "inbound",
    "channels": [
      "phone",
      "whatsapp",
      "web"
    ],
    "does": [
      "Takes the first notice of loss at any hour: what, when, where, photos",
      "Gives the claim number and the next step",
      "Hands injury or total-loss calls to a person with the details captured"
    ],
    "tools": [
      "rest-api",
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Agencies and MGAs pay after-hours call centres for this alone",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "Accounting and bookkeeping firms",
    "slug": "bookkeeping-query-resolver",
    "name": "Bookkeeping query resolver",
    "posted": "Bookkeeper",
    "kind": "routine",
    "channels": [
      "whatsapp",
      "email",
      "phone"
    ],
    "does": [
      "Sends each client the month's uncategorised transactions as questions",
      "Takes the answers in chat or on a call and writes the category back",
      "Chases missing receipts"
    ],
    "tools": [
      "quickbooks",
      "xero",
      "tally",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "The monthly 'what was this $84 at Costco' email every bookkeeper sends",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Financial services",
    "industry": "Financial advisors",
    "slug": "annual-review-scheduler",
    "name": "Annual review scheduler",
    "posted": "Client service associate",
    "kind": "routine",
    "channels": [
      "phone",
      "email",
      "sms"
    ],
    "does": [
      "Calls each client in their review month to book the annual review",
      "Sends the pre-meeting checklist and collects updates",
      "Confirms the day before"
    ],
    "tools": [
      "google-calendar",
      "google-sheets",
      "email"
    ],
    "status": "later",
    "signal": "Advisors in the US, UK and Australia are required to offer reviews and staff a person to book them",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "D2C brands",
    "slug": "supplier-eta-checker",
    "name": "Supplier lead-time and backorder caller",
    "posted": "Purchasing assistant",
    "kind": "routine",
    "channels": [
      "email",
      "phone",
      "whatsapp"
    ],
    "does": [
      "Asks every supplier for the ETA on open purchase orders each week",
      "Updates the sheet and tells customers on backorder the new date",
      "Flags a supplier that slipped twice"
    ],
    "tools": [
      "google-sheets",
      "shopify",
      "email"
    ],
    "status": "next",
    "signal": "Brands buying from Alibaba and domestic wholesalers chase ETAs by hand; customers on backorder churn silently",
    "jobs": "procurement-follow-up",
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "Gyms and studios",
    "slug": "membership-winback-caller",
    "name": "Membership win-back and declined-card caller",
    "posted": "Membership executive",
    "kind": "routine",
    "channels": [
      "phone",
      "sms",
      "whatsapp"
    ],
    "does": [
      "Calls a member who has not visited in three weeks",
      "Calls the day a card declines with a new payment link",
      "Records the reason for leaving"
    ],
    "tools": [
      "google-sheets",
      "razorpay",
      "stripe"
    ],
    "status": "next",
    "signal": "Gym churn is a phone call away from being halved; declined cards are silent churn",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Retail, D2C and commerce",
    "industry": "Restaurants and cloud kitchens",
    "slug": "catering-quote-desk",
    "name": "Catering and large-party quote desk",
    "posted": "Events coordinator",
    "kind": "both",
    "channels": [
      "phone",
      "whatsapp",
      "email",
      "web"
    ],
    "does": [
      "Takes the date, headcount, budget and dietary needs",
      "Sends the menu and quote from the rate sheet",
      "Chases the deposit and confirms the day before"
    ],
    "tools": [
      "google-sheets",
      "email",
      "razorpay"
    ],
    "status": "later",
    "signal": "Catering is the highest-margin restaurant revenue and the enquiry comes by phone",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Freight brokers and 3PLs",
    "slug": "carrier-check-caller",
    "name": "Carrier check-call dispatcher",
    "posted": "Track-and-trace dispatcher",
    "kind": "routine",
    "channels": [
      "phone",
      "sms"
    ],
    "does": [
      "Calls every driver on a live load at the agreed times for location and ETA",
      "Updates the TMS and tells the customer",
      "Escalates a late or unreachable driver"
    ],
    "tools": [
      "rest-api",
      "google-sheets"
    ],
    "status": "next",
    "signal": "Check calls are a literal job title in US freight; brokerages staff rooms of them",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Logistics and manufacturing",
    "industry": "Freight brokers and 3PLs",
    "slug": "dock-appointment-scheduler",
    "name": "Dock appointment scheduler",
    "posted": "Appointment coordinator",
    "kind": "routine",
    "channels": [
      "phone",
      "email"
    ],
    "does": [
      "Calls or emails the warehouse for a pickup or delivery appointment",
      "Records the slot and the reference number",
      "Reschedules when the truck slips"
    ],
    "tools": [
      "email",
      "google-sheets",
      "rest-api"
    ],
    "status": "later",
    "signal": "Every load needs two appointments and each is a call to a warehouse desk",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Law firms and legal services",
    "slug": "injury-intake-desk",
    "name": "24-hour legal intake desk",
    "posted": "Intake specialist",
    "kind": "inbound",
    "channels": [
      "phone",
      "web",
      "whatsapp"
    ],
    "does": [
      "Answers at any hour, takes the matter type, date, injuries and other party",
      "Runs the conflict check questions and books the consultation",
      "Sends the retainer for e-signature when the attorney approves"
    ],
    "tools": [
      "google-calendar",
      "google-sheets",
      "email"
    ],
    "status": "next",
    "signal": "US personal-injury firms pay intake call centres per qualified lead",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Home services (AC, plumbing, pest)",
    "slug": "parts-availability-caller",
    "name": "Parts availability caller",
    "posted": "Parts runner",
    "kind": "routine",
    "channels": [
      "phone",
      "email"
    ],
    "does": [
      "Calls suppliers in order until the part is found in stock",
      "Records price and pickup time",
      "Tells the technician which counter to go to"
    ],
    "tools": [
      "google-sheets"
    ],
    "status": "later",
    "signal": "A technician's second hour on every job is calling suppliers",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Professional and home services",
    "industry": "Car rental and dealerships",
    "slug": "rental-return-caller",
    "name": "Rental return and damage follow-up caller",
    "posted": "Rental agent",
    "kind": "routine",
    "channels": [
      "phone",
      "sms",
      "whatsapp"
    ],
    "does": [
      "Reminds the renter the day before return with the time and fuel rule",
      "Calls after return about a damage or toll charge with the photo",
      "Takes the dispute and hands it to a person"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Rental desks worldwide spend the afternoon on return reminders and damage calls",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Recruitment and HR",
    "industry": "Staffing and recruitment",
    "slug": "reference-check-caller",
    "name": "Reference check caller",
    "posted": "Recruiter",
    "kind": "outbound",
    "channels": [
      "phone",
      "email"
    ],
    "does": [
      "Calls each reference with the agreed questions and records the answers verbatim",
      "Chases a reference who did not pick up, three attempts",
      "Sends the recruiter the summary with the recording"
    ],
    "tools": [
      "google-sheets",
      "email"
    ],
    "status": "next",
    "signal": "Reference checks are the recruiter task most often skipped for lack of time",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Recruitment and HR",
    "industry": "Staffing and recruitment",
    "slug": "temp-shift-confirmation",
    "name": "Temp worker shift confirmation caller",
    "posted": "Staffing coordinator",
    "kind": "routine",
    "channels": [
      "phone",
      "sms",
      "whatsapp"
    ],
    "does": [
      "Confirms every temp the evening before with the site, time and dress code",
      "Fills a dropout from the bench by calling in order",
      "Reports the confirmed roster to the client site by 9 pm"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "next",
    "signal": "Blue-collar staffing agencies in every country run this by hand nightly",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Government, NGOs and community",
    "industry": "NGOs and trusts",
    "slug": "volunteer-shift-caller",
    "name": "Volunteer shift confirmation caller",
    "posted": "Volunteer coordinator",
    "kind": "routine",
    "channels": [
      "phone",
      "sms",
      "whatsapp"
    ],
    "does": [
      "Confirms volunteers the day before an event",
      "Fills gaps from the list",
      "Thanks them after and asks for the next date"
    ],
    "tools": [
      "google-sheets",
      "whatsapp-business"
    ],
    "status": "later",
    "signal": "Volunteer no-show is the number every coordinator quotes",
    "jobs": null,
    "note": null,
    "reach": "global"
  },
  {
    "sector": "Government, NGOs and community",
    "industry": "Utilities and municipal services",
    "slug": "outage-notification-caller",
    "name": "Outage and service notification caller",
    "posted": "Customer communications officer",
    "kind": "routine",
    "channels": [
      "phone",
      "sms",
      "whatsapp"
    ],
    "does": [
      "Calls or texts affected customers with the outage, area and restoration time",
      "Takes a report of a new outage as fields",
      "Calls back when service is restored"
    ],
    "tools": [
      "google-sheets",
      "rest-api"
    ],
    "status": "later",
    "signal": "Small utilities and co-operatives worldwide still notify by hand",
    "jobs": null,
    "note": null,
    "reach": "global"
  }
];

export type MinimumPlan = 'everyday' | 'business';

export const TEXT_CHANNELS = ['whatsapp', 'web', 'email', 'sms'] as const;

export function hasVoice(role: Pick<ShelfRole, 'channels'>): boolean {
  return role.channels.includes('phone');
}

export function hasText(role: Pick<ShelfRole, 'channels'>): boolean {
  return role.channels.some((c) => (TEXT_CHANNELS as readonly string[]).includes(c));
}

/** Every plan gets every role; voice is the only gate. A role with a text channel runs on Everyday. */
export function minimumPlan(role: Pick<ShelfRole, 'channels'>): MinimumPlan {
  return hasText(role) ? 'everyday' : 'business';
}

export const shelfSectors: string[] = [...new Set(shelf.map((r) => r.sector))];

export function shelfBySector(sector: string): ShelfRole[] {
  return shelf.filter((r) => r.sector === sector);
}
