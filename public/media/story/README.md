# Story plates

Rendered dioramas for the home-page scroll story (`components/story/ScrollStory.tsx`).

Drop a PNG in here with the exact filename below and that chapter switches from
its drawn isometric stand-in to the render. **No code change is needed** — the
paths are already wired, and a missing or unreadable file falls back to the
drawn art rather than showing a broken image.

| Filename | Chapter |
|---|---|
| `decibyl-room-01-the-answer.webp` | 03 · The answer |
| `decibyl-room-02-the-clinic.webp` | 04 · Clinics |
| `decibyl-room-03-the-commerce.webp` | 06 · Commerce |

Source: `decibyl-town-finals-2026-08-31` in `Stratfiy/decibyl-ai-ops`, rendered by
the guarded Kie workflow. The runner uploads a GitHub Actions artifact; download
it from the workflow run page and copy the PNGs here.

**Save as WebP, not PNG.** These render at 2K and go straight into a marketing
page. At 1600px the same plate is 1363 KB as PNG and 37 KB as WebP — a 37x
difference for no visible loss on a soft-shaded 3D render with no hard edges or
text. `sharp` is already a dependency; the resize is two lines.

Two things to do before committing a plate:

1. **Check the mascot.** Every plate references the Scene 2 master so the same
   woman appears throughout — cream blazer, coral shirt, charcoal trousers,
   white trainers. If a render has drifted to a different person, it is a reject,
   not a fix-in-CSS.
2. **Resize it.** These come out at 2K and go straight into the page. Anything
   much over ~1600px wide is wasted bytes on a marketing page; `sharp` is already
   a dependency, and the poster derivative pattern is in the git history.

Masters belong in the R2 bucket, not here — see `OPEN-ITEMS.md` and the storage
policy in `Stratfiy/decibyl-ai-ops`. Only the web-sized derivative belongs in Git.
