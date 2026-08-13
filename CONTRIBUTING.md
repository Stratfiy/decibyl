# Contributing

## Verticals: pages are cheap, integrations are not

A new vertical earns a landing page and a prompt template. It earns engineering time — custom
integrations, bespoke workflows, dedicated infrastructure — only after it has one paying customer
in that vertical. Pages cost hours; integrations cost weeks.

This is why `data/verticals.ts` has nine entries (six top-level verticals plus dental, IVF, and
diagnostics under clinics) but the primary nav (`components/marketing/Nav.tsx`) shows only three
(`featuredVerticalSlugs`). Every vertical page stays live and indexed — none of them get deleted
just because they're not in the nav — but the nav itself should read as "proven," not "we do
everything." `/solutions` lists all nine.

If you're adding a tenth vertical: write the page, don't wire up new integrations for it, and
don't add it to `featuredVerticalSlugs` until it has a real paying customer.
