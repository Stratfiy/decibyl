# Scroll geometry invariant

For `N` chapters and `T` viewport-heights of travel per chapter:

- sticky stage height = `100svh`
- section height = `100svh + N × T`
- scrollable travel = `N × T`
- chapter `i` centre = `(i + 0.5) × T`
- normalized progress at that centre = `(i + 0.5) / N`

That is the same value used by `ScrollStory` to derive the active chapter and its centred `--drift` value. Keep these equations together if the story length changes.
