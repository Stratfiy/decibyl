# Decibyl early-access homepage

Reading this as a personal-and-business AI launch with a bright, human, playful design language. Design variance 8, motion 6, density 3. Wajo is the founder's primary mood reference. Light canvas and black actions are intentional brand choices.

## Reference lock

- Refero Winamp `4749df75-133f-4f2c-b583-18cbffb4ca92`: Poppins 400/500/600/700, tight typography, rotated lifestyle photography, flat surfaces. The font is delivered through next/font with swap; no proprietary font files copied.
- Refero Qatchup `3b41db61-34e3-40cb-b9ee-292683029b53`: generous whitespace and dark pill actions.
- Refero Tedy `e1d852f1-d8d6-4735-bb8d-cd041b80676f`: large, tight display typography and human imagery. Its proprietary Montreal font and berry CTA token are not imported.
- Taste: https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md. Applied audit-first redesign, actual photography, differentiated section layouts, restrained labels, responsive collapse and motivated motion. User-specified bright Wajo direction takes precedence over generic skill theme defaults.
- Brag: https://github.com/latent-spaces/brag/blob/main/skills/brag/SKILL.md. This is a launch-video workflow; only hook/reveal/proof story principles are adapted to the on-page demonstration. No standalone video is claimed.

## Art and motion

Original generated editorial photography depicts both individual and business use; it does not depict customers or testimonials. One 174KB WebP serves both compositions with responsive crop windows. Hero images are priority loaded with reserved dimensions.

Hero entrance stages copy, personal photograph, business photograph and greeting. Native CSS and IntersectionObserver keep the existing dependency footprint. Section reveals run once. The illustrative task demonstration begins on entry, proceeds from request through actions to result, holds its result and stops. Pause/replay controls remain available. Reduced motion shows the completed example immediately. No continuous floating, scroll hijacking, pointer tracking or fake live metrics.

## Launch contract

Both personal and business use already exist. Free during early access, invite only. Waitlist → request review → invitation → activate account. Existing /api/leads persistence, rate limits, attribution and notification wiring are retained. Audience uses the existing optional vertical field. No live lead submissions during verification.

## Verification boundary

Production build, TypeScript and diff whitespace checks are run locally. The Vercel preview is access-protected. Browser visual verification remains pending authorized access; a successful build does not establish visual correctness.
