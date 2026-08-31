# Homepage scroll story

The homepage opens as a pinned miniature-world tour rather than a conventional hero carousel.

## Creative rule

Rendered room plates are used only where they materially improve the scene. Missing chapters are not grey placeholders: `IsoDistrict.tsx` draws the same Decibyl world in code with a recurring operator, unbranded props and a moving coral voice signal. That keeps the experience complete while generated assets are still being reviewed.

## Scroll geometry

`CHAPTER_TRAVEL_VH` in `ScrollStory.tsx` is the amount of actual scroll travel allocated to each chapter. The section height is one sticky viewport plus that travel. Snap markers sit at the centre of each chapter, so clicking the chapter rail and browser proximity snapping land on the same neutral camera composition.

## Media

Web-sized generated derivatives live in `public/media/story/`. Masters belong in object storage, not Git. Do not reuse the old Scene 2 parcel reference: it contains a third-party trademark.

## Before adding narration

The narration control intentionally stays hidden until at least one chapter has an `audio` source. When voice clips are added, use a Decibyl agent voice, never autoplay, and keep chapter changes interruptible.
