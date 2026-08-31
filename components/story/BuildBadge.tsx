'use client';

import { useEffect, useState } from 'react';

/* ============================================================================
   Temporary diagnostic badge.

   Three rounds were spent asking "is this the new build?" and guessing at the
   answer from screenshots. The page can just say so. It reports the commit it
   was built from, the viewport the browser actually gave it — not the device's
   spec-sheet size, which is what caused the tablet bug — and whether the story
   is pinned or has fallen back to the stacked document.

   REMOVE THIS before the branch is merged. It is a debugging instrument, not
   a feature: `git rm components/story/BuildBadge.tsx` and drop the one usage
   in ScrollStory.
   ============================================================================ */

export function BuildBadge() {
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    const read = () => {
      const stage = document.querySelector('[data-story-stage]');
      const pinned = stage ? getComputedStyle(stage).position === 'sticky' : false;
      const cols = stage?.parentElement?.querySelector('[data-story-scene]');
      const twoCol = cols
        ? getComputedStyle(cols).gridTemplateColumns.split(' ').length > 1
        : false;
      setInfo(
        `${process.env.NEXT_PUBLIC_BUILD_SHA} · ${window.innerWidth}×${window.innerHeight} · ` +
          `${pinned ? 'pinned' : 'stacked'} · ${twoCol ? '2-col' : '1-col'}`,
      );
    };
    read();
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
  }, []);

  if (!info) return null;

  return (
    <p
      style={{
        position: 'fixed',
        left: 8,
        bottom: 8,
        zIndex: 9999,
        margin: 0,
        padding: '4px 9px',
        borderRadius: 999,
        background: 'rgba(20,12,9,0.82)',
        color: '#fff',
        font: '600 10px/1.4 ui-monospace, monospace',
        letterSpacing: '0.06em',
        pointerEvents: 'none',
      }}
    >
      {info}
    </p>
  );
}
