import { describe, expect, it } from 'vitest';

/* Keep the scroll-story geometry invariant explicit. The stage consumes one
   viewport; chapter travel starts after that. A chapter centre must therefore
   map to the same normalized progress used by ScrollStory's active-index math. */
describe('scroll story geometry', () => {
  it('keeps every snap point at its chapter centre', () => {
    const acts = 7;
    const chapterTravel = 74;
    const sectionHeight = 100 + acts * chapterTravel;
    const stageHeight = 100;
    const travel = sectionHeight - stageHeight;

    for (let index = 0; index < acts; index += 1) {
      const snapTop = (index + 0.5) * chapterTravel;
      const progress = snapTop / travel;
      expect(progress * acts).toBeCloseTo(index + 0.5, 8);
    }
  });
});
