# Decibyl — website aligned with the simplified product UI

## Reference lock
Primary: the supplied Decibyl simplified-screens artifact, including the signup screen and My Decibyl home. Supporting Refero references: ChatGPT `667cf5b9-5940-4db5-a972-fb6bd51d5783` and OpenAI `f640473b-520c-4f56-bac6-e6811a1f0535`.

| Decision | Source | Application |
| --- | --- | --- |
| White canvas and neutral panels | ChatGPT and Decibyl artifact | #fff main surface, #f9f9f9 supporting panels, #0d0d0d text |
| Restrained sans serif | ChatGPT/OpenAI | Existing Inter, weights 400–600; proprietary OpenAI Sans is not copied |
| Centred conversational hero | Artifact home and ChatGPT | One invitation action; task suggestion chips select an illustrative example |
| Colour only in identity and imagery | Decibyl screenshot | Pink, yellow and lime avatars; retained original 3D miniature assets |
| Rounded controls and thin borders | Artifact and ChatGPT | 28px hero panel; black pill CTA; #e5e5e5 dividers |
| Free invite-only launch | Founder instruction | Pricing routes redirect to waitlist; remove plan offers from structured data and llms.txt |

## Behaviour
The hero is a marketing invitation, not a fake live chat. Suggestion links select personal/business examples and scroll to the existing interactive demo. The demo starts on entry, supports pause and replay, and displays the finished state under reduced motion. Existing lead submission, attribution, rate limiting and notifications are preserved.

The existing draft PR is updated; no application runtime or billing implementation is changed. Historical research articles are separate from the retired pricing offer page.

## Visual correction
The founder rejected the miniature robots and neon-green treatment as inconsistent with the current product. Removed the two miniature scenes from the homepage and replaced them with clearly labelled personal/business workspace examples. All bot marks now use circular pastel avatars with small dot eyes; grey replaces lime accents, and the rest of the UI stays neutral.
