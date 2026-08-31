/* ============================================================================
   Split-text reveal.

   The technique the motion-site prompt library leans on hardest: a headline
   does not fade in as a block, it arrives word by word with a short stagger
   and a blur that resolves. Splitting is done here, in the markup, so the
   animation itself is pure CSS keyed off the parent scene's state — no
   per-word JavaScript and nothing to re-run on scroll.

   Accessibility: the words are wrapped in spans but the sentence is
   unbroken text, so screen readers and selection still read it as one line.
   The visual hidden state is opacity and blur, never `visibility`, so the
   text is present for search engines whatever the animation is doing.
   ============================================================================ */

import styles from './story.module.css';

type Props = {
  text: string;
  /** Words to render in the extruded brand treatment — matched from the start. */
  highlight?: number;
  /** Delay before the first word, so a headline can follow its eyebrow. */
  offset?: number;
};

export function SplitText({ text, highlight = 0, offset = 0 }: Props) {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span
            className={i < highlight ? `${styles.word} ${styles.extrude}` : styles.word}
            style={{ '--i': i + offset } as React.CSSProperties}
          >
            {word}
          </span>
          {/* The separator sits OUTSIDE the animated span on purpose. A word is
              `display: inline-block` so it can be transformed, and an
              inline-block strips its own trailing whitespace — putting the
              space inside gave "AIvoiceagents". As a sibling text node it
              survives, and it also gives the line a place to wrap. */}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}
