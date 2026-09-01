# Story plates

The rendered dioramas behind the home-page scroll story
(`components/story/ScrollStory.tsx`) and the hero (`components/story/CinematicIntro.tsx`).

## What ships

| File | Chapter | Notes |
|---|---|---|
| `../scene-one/decibyl-hero-front-desk.webp` | Hero — "Meet Decibyl" | Also the canonical character reference |
| `decibyl-room-01-the-answer.webp` | After hours | |
| `decibyl-room-02-the-clinic.webp` | Clinics | |
| `decibyl-room-03-property-leads.webp` | Property | |
| `decibyl-room-04-commerce-support.webp` | Commerce · COD & NDR | Restored from git history, not generated |
| `decibyl-room-06-call-floor.webp` | At scale | |
| `decibyl-room-05-call-receipt.webp` | The receipt | |
| `../home/living-operations-world.webp` | "One agent. Many worlds." | Four rooms as a 2×2 square |

Web-sized derivatives only. The 2K masters live in the creative artifact store,
never in this repository.

## The one rule that matters

**Every future room render must pass
`public/media/reference/decibyl-operator-reference.png` as `image_input`.**

The set drifted badly without it. Renders were conditioned on whichever plate
was to hand, and for several runs that was the commerce floor — which contains
no cream-blazer operator at all. With nothing to copy, each generation invented
her again: the clinic came back with her as a doctor in a white coat, and two
rooms dropped her entirely. Describing her in the prompt has never been enough.
The reference is what the model actually follows.

She is: cream blazer, coral shirt, charcoal trousers, white trainers, dark wavy
shoulder-length hair.

## Every plate is flattened before it ships

The plates arrive with a studio gradient in the background — the clinic spanned
eighteen points across its corners — and the page sets one `--ground` per
chapter to match. A single colour cannot match a gradient, so a rectangle always
showed. Each plate is therefore composited onto a flat field of its own median
border colour behind an elliptical alpha falloff, and the chapter's `--ground`
is sampled from the **delivered WebP**, not the source: lossy encoding shifts a
flat field by a point or two, and against cream that is visible.

Knocking the backdrop out entirely was tried and abandoned — these are cream
dioramas on cream, and every threshold that reached the gradient also walked
through the walls and furniture.

## Decisions worth not relitigating

**The operator is absent from commerce and the call floor, deliberately.** Those
two rooms are floors of human agents. She is the AI; putting her in a crowd of
people doing the same job muddles exactly the distinction every other room
exists to draw. Her absence there is the point, not an oversight.

**`decibyl-world.webp` is deleted.** It was a paid render that nothing ever
used: six islands of generic furniture — a sofa, a park bench, two workbenches —
with no people and no phone. It cannot serve the "One agent. Many worlds."
section, whose own copy promises a front desk, a sales desk and a support desk.
It is in git history if it is ever wanted; an unused asset sitting in the folder
only invites someone to use it wrongly.

**Do not commission generated video from an automated session.** Five 5-second
dive clips were generated for 620 credits and have never been watched by anyone,
because they cannot be played back in that environment: the available ffmpeg is
Playwright's screencast build with no H.264 decoder, and its Chromium is the
open-source build without proprietary codecs. Buying media you cannot review is
how 620 credits became nothing.

## Adding a plate

1. Render at 2K 16:9 with the operator reference as `image_input`.
2. Flatten it onto its own ground and sample `--ground` from the delivered WebP.
3. Add the chapter in `buildChapters`, and update
   `components/story/acts.ts` so the intro's "01 / N" still agrees — ScrollStory
   warns in development if the two disagree.
