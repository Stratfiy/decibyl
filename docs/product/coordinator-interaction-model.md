# One office, named colleagues: the Decibyl interaction model

**Version:** v1, 2026-09-15
**Status:** founder direction for the app agent (KAN-129). Product owns the how and the order.
**Question answered:** how does an owner build a bot, test it, and put it to work without ever wondering which chat they are in?

## 1. The problem in one paragraph

Today a person can talk to three different things that all look like a chat: the builder assistant (which changes a bot), the bot itself in the tester (which pretends to be a customer conversation), and the bot in a live channel (which is a customer conversation). Add voice-first building and the three sound the same too. Jef Raskin's rule from *The Humane Interface* applies exactly: modes cause errors not because users are careless but because the interface let them hold a false belief about system state and then acted on it. A "build mode / work mode" switch is a mode. It moves the problem; it does not remove it.

## 2. What the rest of the market does

| Product | How build, test and work are separated | What we take | What we avoid |
|---|---|---|---|
| Slack with Agentforce agents | Agents are teammates. You add one to a channel and @mention it. Same grammar as addressing a person. | Addressing by name is the mode. Nobody needs a switch to talk to a colleague. | Nothing here about building the agent; that lives in a separate builder. |
| Salesforce Agentforce Builder | Two preview modes: Simulate (mock data, full trace) and Live Test (real data). Escalation only testable after publish. | Test runs carry a trace and a label. | Two named modes inside a builder, with rules about what each can and cannot test. Too much to hold for a clinic owner. |
| Lindy | Describe the agent in English, blocks on a canvas, free tasks to test, Autopilot computer for the agent. | "Describe it, it builds" as the entry. | A canvas. Our owner will never open one. |
| Zapier Agents | Agents can call other agents like teammates. | Delegation is a first-class verb. | Agents live in a list, not a room. |
| Dust | People and agents share one workspace, knowledge and tools. | The shared room and shared memory. | Enterprise-shaped; no phone. |
| Grok Bot | Persistent cloud agents per department, demoed by building a company live. | Roles named by job. | No unit price, no voice, developer audience. |
| Sarvam Samvaad | Multi-agent orchestration, cross-channel memory, voice, WhatsApp, web. | Coordination and memory are table stakes by 2027. | Infrastructure for builders, not a product for owners. |

The pattern that survives every one of these: **the thing you address decides what happens**. The pattern that fails: a hidden state that decides what happens.

## 3. The model: one office, named colleagues

- **Decibyl** is the manager. It is not a bot. It has no number and no customer. It knows the whole workspace, it builds bots, edits them, tests them, and hands work between them. It already exists as the workspace assistant behind the Home box.
- **Bots** are colleagues with handles: `@reception`, `@collections`, `@frontdesk`. They do the job on their channels. They already exist, and bots in a channel already @mention each other.
- **Customers are never in this room.** The Home thread is the office. Customer conversations are on the bot's channels and appear here only as cards and reports.

Three grammar rules, and nothing else to learn:

1. **A message to nobody is a message to Decibyl.** "Create a receptionist for my clinic." "Why did we miss three calls yesterday?"
2. **A message to a handle is work.** "@reception, book Mrs Lakshmi for Tuesday 5 pm." The bot does it and answers here.
3. **Decibyl never acts on a sentence alone.** Anything that changes a bot, spends money or reaches a customer arrives as a card, and the card is confirmed. Undo exists for ten seconds after.

This is modeless. Every message means the same thing whatever happened before it, because the addressee is written in the message and shown on the reply.

## 4. The screen (CPO view)

- **Left: the roster.** Decibyl pinned at the top. Each bot below with a status pill: Draft, Live on +91 …, Paused. Status is the only "state" and it is always visible.
- **Centre: the thread.** One conversation. Every reply carries the avatar and name of who answered. Decibyl and the bots have different colours; the difference is visible at a glance and also spoken in voice.
- **Cards, inline.** Decibyl's actions are cards, never prose:
  - **Build card**: what changed, in plain words and as a diff, Confirm or Discard.
  - **Try card**: a phone-shaped frame labelled TEST, with you as the caller. Text or voice inside the frame. Nothing in the frame is a customer.
  - **Result card**: after a Hear it or a Check it: what the bot did, what it got wrong, one-tap "Fix it" that opens a Build card.
  - **Task card**: when one bot hands work to another: who, what, by when, status.
- **First run stays three steps**: pick a template, name it, hear it. The third step is the Try card, so the first thing a new owner sees after building is the test, not a settings page.
- **Copy rules.** Never "mode". Never "agent" to a customer-facing owner; "bot" or the handle. Verbs: ask Decibyl, tell @reception, hear it, try it, check it.
- **Mobile.** Same thread, roster becomes a top row of avatars. Works because there is one surface.

## 5. Testing without confusion (the part you asked about)

Three verbs, all from the same thread, all producing labelled runs:

| Verb | What it is | Who plays the caller | What it costs | When to use |
|---|---|---|---|---|
| **Hear it** | A real call, browser or your verified phone | You | Voice minute | Always, before going live. Latency and interruptions only show on audio. |
| **Try it** | Text conversation with the bot in the TEST frame | You, or a model in simulated mode | Text reply rate, inside the builder allowance | Checking the logic and the wording, cheaply, many times. |
| **Check it** | A scripted caller runs the scenario and a judge grades it | A model persona | Text rate per run | Before every edit is confirmed on a live bot; nightly on live bots. |

Rules: every test run is stamped TEST in the timeline and the receipt; test runs never enter customer analytics or the business memory; a Build card on a Live bot offers "Check it first" by default. "Text tries the logic. A call tests the job." is printed on the Try card.

## 6. Architecture (CTO view)

Reuse first. Every piece below exists except the router, the tools and delegation-with-wait.

- **Router.** Message arrives in the Home thread. Addressee resolved by the existing mention grammar; no mention means Decibyl. Bot messages go down the existing channel-reply path as TEXTCHAT runs (quota, billing, learning pass all included). Decibyl messages go to the Decibyl turn.
- **Decibyl tools**, each returning a proposed action rather than doing it: `create_bot(brief)`, `edit_bot(handle, instruction)` (a builder turn scoped to that bot; today the builder is unscoped), `try_bot(handle, persona?)`, `hear_bot(handle, to_number)`, `check_bot(handle, scenario)`, `place_call(handle, number, context)`, `delegate(from, to, task, deadline)`, `schedule(handle, routine)`. The proposal is the existing propose-action card with undo.
- **Confirm executes.** The confirm is the audit row: actor, card, timestamp, before and after (KAN-117). No tool executes on a bare sentence.
- **Delegation with wait.** A `task` row: from bot, to bot, goal, context, deadline, status, result. Delivery reuses the mention path; the new part is that the caller can wait for the result and continue. Hop limit stays at two, plus a credit budget per task and the same DND and consent checks as any call. Task cards render from this row.
- **Voice-first build.** Same router. The builder's voice is distinct from every bot voice, and a switch is spoken: "You are now talking to your receptionist as a caller." Test frames are audible as well as visible.
- **Billing.** Decibyl turns and edits count against the builder allowance; tries at text rates; hear-it at voice rates; a delegated task is a routine run. Nothing new in the ledger.
- **Safety.** Cards for anything irreversible, rate limits on Decibyl turns, Decibyl never impersonates a bot (it says "I asked @reception"), customers never addressable from the office thread.

## 7. Phasing

- **P0, before launch (gate):** router, create and edit cards, Try card in the TEST frame, Hear it from the thread, TEST stamping. This alone removes the confusion.
- **P1, launch month:** Check it from the thread, Result card with "Fix it", scoped edits with diff.
- **P2:** delegation with wait and Task cards, routines scheduled from the thread, desktop companion actions as cards.

## 8. How we will know it worked

- Time from signup to first Hear it, target under 15 minutes.
- Share of bots that were tried or checked before going live, target above 80%.
- Mis-addressed messages (an owner telling a bot to change itself, or asking Decibyl to book a customer), target under 5% after week two, measured by Decibyl's own "did you mean" replies.
- Build cards discarded or undone, as a proxy for the builder proposing the wrong thing.

## 9. Risks and the answer to each

- **The router misreads who a message is for.** Explicit handles win; when unsure, Decibyl asks one question instead of guessing.
- **A bot's live channel is web chat, so "chat" is also the customer's word.** Customers never appear in the office thread; the web-chat channel is a separate surface with the bot's name on it.
- **Tries cost money and owners spam them.** Tries sit inside the builder allowance; Check it is the cheap repeatable path.
- **A coordinator that acts on a rumour.** Cards, always. The clinic owner's fear is a bot doing something they did not say; the card is the answer they can see.

## 10. Decision

Adopt the office model. Do not build a build/work switch. Ask the app agent for P0 before the launch gate and for P1 and P2 in that order. The site and the demo line will describe it the same way: "Tell Decibyl the job. Hear it. Put it on your number."

Sources consulted: Slack Agentforce agents in channels; Salesforce Agentforce Builder preview modes; Lindy agent builder; Zapier agent-to-agent calling; Dust shared workspace; Raskin, *The Humane Interface*, on modes; NN/g on modes; xAI Grok Bot Galaxy coverage; Inc42 on Sarvam Samvaad self-serve; the echowave code for decibyl.py, channel_reply.py, agent_builder, text chat sessions, evals and the WebRTC test call.
