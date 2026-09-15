# Prompt pack: seed prompts for shelf roles

One file per shelf role, each the first draft of the worker's system prompt as the app agent would load it into a pack template. Source personas come from [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) (MIT, licence in `.claude/agents/LICENSE-agency-agents`), cut to what a Decibyl worker needs and rewritten in the brand voice (`.agents/product-marketing.md`). The role's channels, tools, plan and status come from `data/shelf.ts` and are not repeated here.

## Format

Every file follows the same headings so the app agent can parse them into a template:

```
---
role: <shelf slug from data/shelf.ts>
name: <shelf role name>
source: <agency-agents path>, MIT
---
# <Name>
## Who you are            2 to 3 sentences. Job title, who you work for, what you never pretend to be.
## What you do            Numbered. The shelf "does" list, expanded to how, in order.
## Rules                  Numbered hard rules. Always includes: never invent a fact, confirm-before-believe
                          for anything learned on a call, the handoff rule, the refusal line for
                          medical/legal/financial advice where relevant, and what to do when unsure.
## On the phone           How a call opens, how long a turn is, what to repeat back, how to end.
## On WhatsApp, web chat and email   Reply length, when to send a document or a link, when to move to a call.
## Language               Open in the caller's language; the languages this role must handle; no mixing scripts.
## What you write down    The fields, in order, and which tool row they go to. One line per field.
## Handoff                Exact triggers, what is said to the caller, what the human receives.
## Openings               Three example opening lines (phone, WhatsApp, after-hours).
## Tests                  Three scenarios for Hear it / Try it / Check it: caller's situation, what a pass
                          looks like, what a fail looks like. One should be adversarial.
```

Rules for writing one: under 1,000 words (the example legal-intake-desk.md is 976); no code blocks, JSON or scripts from the source; no US-only assumptions unless the shelf role is US-specific; numbers only where the role needs them; every rule must be testable by the Check it judge. Words to avoid are listed in `.agents/product-marketing.md`.

## Index

| Role | Source persona |
|---|---|
| legal-intake-desk, injury-intake-desk | specialized/legal-client-intake |
| front-desk-clinic | specialized/healthcare-customer-service |
| hotel-reservations, pre-arrival-messenger | specialized/hospitality-guest-services |
| loan-enquiry-qualifier, kyc-document-collector | specialized/loan-officer-assistant |
| returns-desk | specialized/retail-customer-returns |
| website-whatsapp-enquiry-desk | specialized/customer-service |
| ticket-triage | support/support-support-responder |
| candidate-screening-caller, reference-check-caller | specialized/recruitment-specialist |
| candidate-document-collector | specialized/hr-onboarding |
| expense-bill-capture, supplier-invoice-clerk | specialized/accounts-payable-agent |
| listing-enquiry-responder, showing-scheduler | specialized/real-estate-buyer-seller |
| document-drafter | specialized/specialized-document-generator |
| report-generator | specialized/report-distribution-agent, support/support-analytics-reporter |
| data-entry-clerk | specialized/data-consolidation-agent |
| lead-crm-updater | specialized/sales-data-extraction-agent |
| agency-lead-qualifier | specialized/sales-outreach, sales/sales-discovery-coach |
| owner-voice-note-clerk, approval-router | specialized/specialized-chief-of-staff |
| daily-wellness-checkin | specialized/healthcare-aging-parent-care-companion |
| supplier-eta-checker, procurement-follow-up | specialized/supply-chain-strategist |
| insurance-eligibility-caller, prior-auth-chaser | specialized/medical-billing-coding-specialist |
| telecaller-call-coach | sales/sales-coach |
| bookkeeping-query-resolver | finance/finance-bookkeeper-controller |
| membership-winback-caller | specialized/customer-success-manager |
| review-request-caller | product/product-feedback-synthesizer |
