/**
 * The shelf catalogue: every role a Decibyl worker could be, by sector and
 * industry, with what it does, the channels, the tools and the plan it fits.
 *
 * `status` is honest: `live` is on the product shelf today, `next` is being
 * built for Q4 2026, `later` is 2027. The /shelf page shows all three with the
 * status stated, and only links to a /jobs page where one exists. Demand
 * signals are named per role so the order can be argued with. Regenerated
 * with docs/product/marketplace-catalogue.md from the same source.
 */

export type ShelfStatus = 'live' | 'next' | 'later';
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
  plan: 'everyday' | 'business' | 'growth';
  status: ShelfStatus;
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
    "plan": "business",
    "status": "live",
    "signal": "Naukri and JobHai: receptionist among the most reposted SMB roles; our own jobs page",
    "jobs": "clinic-receptionist",
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "Diagnostics vertical page traffic; MyOperator deployment data lists booking capture as a top use",
    "jobs": "clinic-receptionist",
    "note": null
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
    "plan": "growth",
    "status": "later",
    "signal": "Healthcare hiring up 5% YoY (Naukri JobSpeak Jan 2026); multi-department routing needs concurrency",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Repeat-purchase pattern; no clinical advice on the call",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "Dental vertical page; six-month recall is a routine every practice skips",
    "jobs": "clinic-receptionist",
    "note": null
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
    "plan": "growth",
    "status": "next",
    "signal": "IVF vertical page; after-hours anxiety calls",
    "jobs": "clinic-receptionist",
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Same shape as clinic front desk; small but under-served",
    "jobs": null,
    "note": null
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
    "plan": "growth",
    "status": "live",
    "signal": "Admissions counsellor caller job page; season bursts",
    "jobs": "admissions-counsellor-caller",
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "Result-day and ad-day bursts; lead-qualification job page",
    "jobs": "lead-qualification-telecaller",
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "Collections × education pair page",
    "jobs": "collections-telecaller",
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Daily routine every school does by hand",
    "jobs": null,
    "note": null
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
    "plan": "growth",
    "status": "later",
    "signal": "Retention routine; ed-tech activation calls are outsourced today",
    "jobs": null,
    "note": null
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
    "plan": "growth",
    "status": "live",
    "signal": "Real-estate telecaller job page; portal speed-to-lead",
    "jobs": "real-estate-telecaller",
    "note": null
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
    "plan": "growth",
    "status": "next",
    "signal": "No-show rate is the number every sales head quotes",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Housing societies and co-working spaces",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Quotes die in silence; a routine is the fix",
    "jobs": null,
    "note": null
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
    "plan": "growth",
    "status": "live",
    "signal": "Collections telecaller job page; fair-practice window enforced",
    "jobs": "collections-telecaller",
    "note": null
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
    "plan": "growth",
    "status": "next",
    "signal": "Insurance and lending lead-gen postings; DND checked before dial",
    "jobs": "lead-qualification-telecaller",
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "Insurance hiring up 7% YoY; renewal calls are the bulk of an agency’s phone work",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "Compliance reminder pack exists; monthly deadline cycle",
    "jobs": null,
    "note": "Extends the existing Compliance Reminder Bot"
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
    "plan": "business",
    "status": "later",
    "signal": "Tamil Nadu and Kerala chit funds run on phone reminders",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "live",
    "signal": "Order-confirmation job page; RTO reduction",
    "jobs": "order-confirmation-executive",
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "D2C vertical page; NDR is the second-largest leak after RTO",
    "jobs": "order-confirmation-executive",
    "note": null
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
    "plan": "business",
    "status": "live",
    "signal": "Support job page; MyOperator data: order status is a top-three use",
    "jobs": "customer-support-executive",
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "WhatsApp automation guides list cart recovery first; keep it text-first",
    "jobs": null,
    "note": null
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
    "plan": "everyday",
    "status": "later",
    "signal": "Kirana, electronics and furniture stores; text-first",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "live",
    "signal": "Reservations Bot exists on the shelf; hospitality hiring up 15% YoY",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "High no-show, high repeat; a clinic desk with different nouns",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "live",
    "signal": "Order confirmation × logistics pair page",
    "jobs": "order-confirmation-executive",
    "note": null
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
    "plan": "growth",
    "status": "live",
    "signal": "Procurement job page; Tally connector",
    "jobs": "procurement-follow-up-executive",
    "note": null
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
    "plan": "growth",
    "status": "next",
    "signal": "B2B collections is different from consumer collections: invoice-driven, accounts-desk to accounts-desk",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Factory HR; Hindi and regional languages",
    "jobs": null,
    "note": null
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
    "plan": "growth",
    "status": "later",
    "signal": "Support × logistics pair page",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "Hospitality hiring up 15% YoY; Reservations Bot base",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Seasonal enquiry bursts; text-heavy",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "MyOperator lists spiritual organisations among deployments; regional languages matter",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Intake without advice; handoff rule is the product",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "Lead qualification job page",
    "jobs": "lead-qualification-telecaller",
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "High call volume, low ticket; AMC renewal is a routine",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "next",
    "signal": "Dealer service desks post this job every quarter",
    "jobs": null,
    "note": null
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
    "plan": "growth",
    "status": "later",
    "signal": "Portal leads with fast decay",
    "jobs": null,
    "note": null
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
    "plan": "growth",
    "status": "next",
    "signal": "Grok Bot and Lindy both ship a recruiting coordinator; Indian volume hiring is phone-first",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "No-show is the recruiter’s biggest leak",
    "jobs": null,
    "note": null
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
    "plan": "everyday",
    "status": "later",
    "signal": "Internal Knowledge Bot base; text-only",
    "jobs": null,
    "note": null
  },
  {
    "sector": "Every business (internal)",
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
    "plan": "everyday",
    "status": "live",
    "signal": "Internal Knowledge Bot on the shelf",
    "jobs": null,
    "note": null
  },
  {
    "sector": "Every business (internal)",
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
    "plan": "everyday",
    "status": "live",
    "signal": "Compliance Reminder Bot on the shelf",
    "jobs": null,
    "note": null
  },
  {
    "sector": "Every business (internal)",
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
    "plan": "business",
    "status": "next",
    "signal": "Our own review caller in the plan; directories skill 10-in-30 protocol",
    "jobs": null,
    "note": null
  },
  {
    "sector": "Every business (internal)",
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
    "plan": "business",
    "status": "next",
    "signal": "Missed-call service exists in the product; make it a role",
    "jobs": null,
    "note": null
  },
  {
    "sector": "Every business (internal)",
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
    "plan": "business",
    "status": "later",
    "signal": "Haggle Bot on Grok’s marketplace is the enterprise version",
    "jobs": null,
    "note": null
  },
  {
    "sector": "Every business (internal)",
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
    "plan": "everyday",
    "status": "next",
    "signal": "Daily report service exists in the product",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Spiritual organisations appear in SMB deployment data; regional languages",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Pledge follow-up is manual everywhere",
    "jobs": null,
    "note": null
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
    "plan": "growth",
    "status": "later",
    "signal": "Sovereign tier fit; procurement-led sales",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Regional languages, seasonal peaks, credit cycles",
    "jobs": null,
    "note": null
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
    "plan": "business",
    "status": "later",
    "signal": "Daily routine over voice; low text literacy",
    "jobs": null,
    "note": null
  }
];

export const shelfSectors: string[] = [...new Set(shelf.map((r) => r.sector))];

export function shelfBySector(sector: string): ShelfRole[] {
  return shelf.filter((r) => r.sector === sector);
}
