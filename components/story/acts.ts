/**
 * How many acts the reader is told the story has, the intro included.
 *
 * `CinematicIntro` numbers itself "01 / N" and `ScrollStory`'s chapters
 * continue that sequence, so the two have to agree. They did not: the intro
 * had "06" hard-coded while the chapters counted to 07 as soon as the call
 * floor was added. The comment on `storyVerticalSlugs` in app/page.tsx
 * promises that nothing is hard-coded to a count, and this file is what makes
 * that promise true.
 *
 * It lives here rather than in ScrollStory because that module is `'use
 * client'`, and the page is a server component — a server render cannot call
 * into a client module, so the shared number has to sit outside both.
 *
 * The arithmetic: the clinic, the switchboard, the verticals that are not the
 * clinic, the call floor and the receipt, then the intro in front of them.
 * ScrollStory checks this against the chapters it actually built and warns in
 * development if they disagree, so adding a chapter without updating this is
 * noisy rather than silent.
 */
export type StoryNeed = { id: string; label: string; pain: string; href: string };

const FIXED_CHAPTERS = 3; // switchboard, call floor, receipt
const INTRO = 1;

export function storyActTotal(needs: StoryNeed[]): number {
  return needs.length + FIXED_CHAPTERS + INTRO;
}
