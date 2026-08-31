# Story plates

Rendered dioramas used by the home-page scroll story (`components/story/ScrollStory.tsx`).

## Shipping plates

| Filename | Chapter |
|---|---|
| `decibyl-room-01-the-answer.webp` | The answer |
| `decibyl-room-02-the-clinic.webp` | Clinics |

Both are web-sized derivatives. The 2K masters belong in R2 / the creative artifact store, not in the website repository.

## Deliberately code-drawn chapters

Street, Language, Property, Commerce and Receipt currently use the animated miniature scenes in `components/story/IsoDistrict.tsx`. They are not broken-image placeholders: they are the shipping fallback artwork and remain complete without a network asset.

Commerce is intentionally **not** wired to a missing render. The earlier generated commerce attempt was repeatedly rejected and an older parcel reference contained a third-party trademark. Do not reuse that reference image. A future render must be reviewed for logos/marks before it is added.

## Adding a future rendered plate

1. Review the character continuity: same Decibyl operator, cream blazer, coral shirt, charcoal trousers, white trainers.
2. Check every object for accidental third-party logos, labels, barcodes or invented readable text.
3. Resize the approved derivative to roughly 1600px wide and save as WebP. Soft 3D plates compress dramatically better as WebP than PNG.
4. Add the file here and explicitly wire its path in `ScrollStory.tsx`. Keep the drawn scene as the per-chapter error fallback.

The page should never request a known-missing image merely to discover at runtime that it needs the fallback.
