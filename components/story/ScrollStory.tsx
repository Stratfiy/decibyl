'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { type StoryNeed, storyActTotal } from './acts';
import type { CSSProperties } from 'react';
import { IsoDistrict } from './IsoDistrict';
import { SplitText } from './SplitText';
import styles from './story.module.css';

export type { StoryNeed } from './acts';

type Props = {
  needs: StoryNeed[];
  call: { language: string; outcome: string; duration: string };
  phone: { tel: string; display: string };
};

type Chapter = {
  id: string;
  nav: string;
  eyebrow: string;
  title: string;
  highlight?: number;
  lead: string;
  chips: string[];
  art?: string;
  /* Kept because it is a real property of a plate, but every plate in the World
     of Decibyl set is cut the same way and sits on its own matched ground, so
     none of them currently needs the heavier wash. */
  blend?: 'strong' | 'soft';
  /* The exact backdrop the plate was rendered against, sampled from the median
     of its own border ring. The stage was one hardcoded cream that matched the
     first two plates and sat 20 points away from the three rendered later, so
     those three showed as a visible rectangle on the page however much their
     edges were feathered. Matching the ground to the plate removes the seam by
     construction rather than by approximation.

     Knocking the backdrop out instead was tried first and abandoned: these are
     cream dioramas on cream, and every threshold that reached the gradient also
     walked through the walls and furniture. */
  ground?: string;
  drawn: string;
  href?: string;
  linkLabel?: string;
  audio?: string;
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const LANGUAGE_STRIP = [
  { label: 'हिन्दी', indic: true },
  { label: 'Hindi' },
  { label: 'தமிழ்', indic: true },
  { label: 'Tamil' },
  { label: 'తెలుగు', indic: true },
  { label: 'Telugu' },
  { label: 'ಕನ್ನಡ', indic: true },
  { label: 'Kannada' },
  { label: 'मराठी', indic: true },
  { label: 'Marathi' },
  { label: 'ગુજરાતી', indic: true },
  { label: 'Gujarati' },
  { label: 'English' },
  { label: 'Hinglish · Tanglish' },
];

/* This is travel, not section height. The first implementation made the section
   ACTS × 88svh tall and then subtracted the sticky 100svh viewport when reading
   progress. That made the real chapter length shorter than the snap-marker
   spacing, so chapter centres drifted farther out of alignment as you scrolled.

   74svh keeps the total experience almost exactly as long as the previous seven
   chapter build, while the section below explicitly adds the sticky viewport.
   One chapter now really is one equal slice of travel. */
const CHAPTER_TRAVEL_VH = 74;

export function ScrollStory({ needs, call }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [act, setAct] = useState(0);
  const [narrating, setNarrating] = useState(false);
  const [artFailed, setArtFailed] = useState<Record<string, true>>({});

  const chapters = useMemo(() => buildChapters(needs, call), [needs, call]);

  /* The intro renders "01 / N" from `storyActTotal` before this component
     mounts, so a chapter added here without updating that file would leave the
     two counters disagreeing on screen. Cheap to check, and silent in
     production. */
  if (process.env.NODE_ENV !== 'production' && chapters.length + 1 !== storyActTotal(needs)) {
    console.warn(
      `[ScrollStory] act count drift: built ${chapters.length + 1} acts, storyActTotal says ${storyActTotal(needs)}. Update components/story/acts.ts.`,
    );
  }
  const acts = chapters.length;
  const hasNarration = chapters.some((chapter) => Boolean(chapter.audio));

  const markArtFailed = useCallback((id: string) => {
    setArtFailed((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    /* Cached once. The scene list is fixed for the life of this effect, and
       re-querying it inside a scroll frame is work done 60 times a second for
       an answer that never changes. */
    const scenes = Array.from(
      stage.querySelectorAll<HTMLElement>('[data-story-scene]'),
    );

    const read = () => {
      frame = 0;
      const travel = section.offsetHeight - stage.offsetHeight;
      if (travel <= 0) return;

      const rect = section.getBoundingClientRect();
      const p = clamp(-rect.top / travel, 0, 1);
      stage.style.setProperty('--sp', p.toFixed(4));

      const ownsViewport = rect.top <= 0 && rect.bottom > stage.offsetHeight * 0.5;
      document.documentElement.dataset.storyHero = ownsViewport ? 'true' : 'false';

      const raw = p * acts;
      const index = clamp(Math.floor(raw), 0, acts - 1);
      stage.style.setProperty('--drift', (raw - index - 0.5).toFixed(3));

      /* The camera, not a slide projector.

         `--d` is each scene's signed distance from the lens in chapter units:
         negative behind us, 0 dead centre, positive still ahead. Because it is
         written every frame from raw scroll position, the transition between
         two chapters is scrubbable and reversible — drag the scrollbar back up
         and the world runs backwards, which a timed cross-fade cannot do.

         `--ad` is the same distance unsigned. CSS `abs()` is too new to rely on
         here, and computing it once in JS is cheaper than the nested
         `max(x, -x)` it would otherwise take in three separate declarations. */
      for (let i = 0; i < scenes.length; i += 1) {
        const scene = scenes[i];
        const d = i - (raw - 0.5);
        const ad = Math.abs(d);
        scene.style.setProperty('--d', d.toFixed(3));
        scene.style.setProperty('--ad', ad.toFixed(3));

        /* Custom properties are cheap to write every frame; attributes are not,
           because each change invalidates selector matching for that element.
           So the near/far flag is only written when it actually flips. */
        const near = ad < 1.5 ? 'true' : 'false';
        if (scene.dataset.near !== near) scene.dataset.near = near;
      }

      setAct(index);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      delete document.documentElement.dataset.storyHero;
    };
  }, [acts]);

  /* The plates were rendered as dioramas — objects with depth, photographed from
     a fixed angle. Flat on a page they lose exactly the quality they were made
     for. Offsetting the plate against the cursor gives that depth back for the
     cost of two custom properties.

     Fine pointers only: on a touch screen there is no hover position to read,
     and firing this off touch events would make the world lurch on every tap. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let nx = 0;
    let ny = 0;

    const apply = () => {
      frame = 0;
      stage.style.setProperty('--mx', nx.toFixed(3));
      stage.style.setProperty('--my', ny.toFixed(3));
    };

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      /* −1 → 1 across each axis, so the CSS reads as a direction and the
         magnitude of the shift stays a decision for the stylesheet. */
      nx = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      ny = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      nx = 0;
      ny = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const src = chapters[act]?.audio;
    if (!narrating || !src) {
      el.pause();
      return;
    }
    if (!el.src.endsWith(src)) el.src = src;
    void el.play().catch(() => setNarrating(false));
  }, [act, narrating, chapters]);

  const goTo = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;
      const travel = section.offsetHeight - stage.offsetHeight;
      const top = window.scrollY + section.getBoundingClientRect().top;
      window.scrollTo({
        top: top + ((index + 0.5) / acts) * travel,
        behavior: 'smooth',
      });
    },
    [acts],
  );

  const state = (index: number) => (index === act ? 'active' : index < act ? 'past' : 'future');

  /* The camera's resting position at scroll top, computed the same way the
     scroll loop computes it (progress 0 ⇒ raw 0 ⇒ d = index + 0.5). Emitting it
     on the server means the first paint already shows the world in the right
     place. Without it every scene inherits the far-away fallback and the story
     is blank until hydration — and stays blank forever with JS disabled. */
  const restingD = (index: number) => index + 0.5;

  return (
    <section
      ref={sectionRef}
      className={styles.story}
      style={{ '--story-h': `${100 + acts * CHAPTER_TRAVEL_VH}svh` } as CSSProperties}
      aria-label="The Decibyl story"
    >
      {chapters.map((chapter, index) => (
        <span
          key={`snap-${chapter.id}`}
          className={styles.snapPoint}
          style={{ top: `${(index + 0.5) * CHAPTER_TRAVEL_VH}svh` }}
          aria-hidden="true"
        />
      ))}

      <div ref={stageRef} className={styles.stage} data-story-stage>
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={styles.scene}
            data-story-scene
            data-scene={chapter.id}
            data-state={state(index)}
            data-near={restingD(index) < 1.5 ? 'true' : 'false'}
            style={
              {
                '--d': restingD(index).toFixed(3),
                '--ad': Math.abs(restingD(index)).toFixed(3),
                '--ground': chapter.ground ?? DEFAULT_GROUND,
              } as CSSProperties
            }
          >
            <div className={styles.artCol}>
              <div className={styles.plate}>
                {chapter.art && !artFailed[chapter.id] ? (
                  <div
                    className={styles.mediaFrame}
                    data-blend={chapter.blend ?? 'soft'}
                  >
                    <img
                      src={chapter.art}
                      alt=""
                      className={styles.plateMedia}
                      fetchPriority={index === 0 ? 'high' : undefined}
                      loading={index === 0 ? undefined : 'lazy'}
                      decoding="async"
                      onError={() => markArtFailed(chapter.id)}
                      ref={(node) => {
                        if (node?.complete && node.naturalWidth === 0) markArtFailed(chapter.id);
                      }}
                    />
                    {chapter.id === 'clinics' && <ClinicMotion />}
                  </div>
                ) : (
                  <IsoDistrict variant={chapter.drawn} className={styles.plateDrawn} />
                )}
              </div>
            </div>

            <div className={`${styles.copyCol} ${styles.cascade}`}>
              <p className={styles.count}>
                {String(index + 2).padStart(2, '0')} / {String(acts + 1).padStart(2, '0')}
              </p>
              <p className={styles.eyebrow}>{chapter.eyebrow}</p>
              <h2 className={styles.title}>
                <SplitText text={chapter.title} highlight={chapter.highlight} />
              </h2>
              <p className={styles.lead}>{chapter.lead}</p>

              {chapter.chips.length > 0 && (
                <div className={styles.chips}>
                  {chapter.chips.map((chip, chipIndex) => (
                    <span
                      key={chip}
                      className={styles.chip}
                      style={{ '--i': chipIndex } as CSSProperties}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              {chapter.href && (
                <Link href={chapter.href} className={styles.chapterLink}>
                  {chapter.linkLabel ?? 'See the workflow'} →
                </Link>
              )}
            </div>
          </div>
        ))}

        {hasNarration && (
          <button
            type="button"
            className={styles.voice}
            data-on={narrating}
            aria-pressed={narrating}
            onClick={() => setNarrating((value) => !value)}
          >
            <span className={styles.orb} aria-hidden="true">
              <span className={styles.orbRing} />
              <span className={styles.orbRing} />
              <span className={styles.orbCore} />
            </span>
            {narrating ? 'Stop narration' : 'Hear the story'}
          </button>
        )}
        <audio ref={audioRef} preload="none" />

        <div className={styles.rail} aria-hidden="true">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              tabIndex={-1}
              className={styles.railTick}
              data-active={index === act}
              data-done={index < act}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <a href="#story-end" className={styles.skip}>
          Skip story <span aria-hidden="true">↘</span>
        </a>

        <p className={styles.cue} aria-hidden="true">
          Scroll to enter the world
        </p>

        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[...LANGUAGE_STRIP, ...LANGUAGE_STRIP].map((item, index) => (
              <span
                key={`${item.label}-${index}`}
                className={styles.marqueeItem}
                data-indic={item.indic || undefined}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressFill} />
        </div>
      </div>
    </section>
  );
}

function ClinicMotion() {
  return (
    <div className={styles.clinicMotion} aria-hidden="true">
      <span className={styles.phoneVibration}>
        <span />
        <span />
        <span />
      </span>

      <span className={styles.receptionPulse}>
        <span />
        <span />
      </span>

      <svg className={styles.callRoute} viewBox="0 0 1000 563" preserveAspectRatio="none">
        <path
          className={styles.callRouteGlow}
          pathLength="1"
          d="M287 305 C 320 300, 328 280, 352 270 C 380 259, 388 276, 407 273"
        />
        <path
          className={styles.callRouteCore}
          pathLength="1"
          d="M287 305 C 320 300, 328 280, 352 270 C 380 259, 388 276, 407 273"
        />
      </svg>

      <span className={styles.queuePulse} />
      <span className={styles.callStatus}>
        <i />
        Call answered
      </span>
    </div>
  );
}

const VERTICAL_PLATE: Record<string, { src: string; blend: 'strong' | 'soft'; ground: string }> = {
  clinics: { src: '/media/story/decibyl-room-02-the-clinic.webp', blend: 'soft', ground: '#edd7b5' },
  'real-estate': { src: '/media/story/decibyl-room-03-property-leads.webp', blend: 'soft', ground: '#f0cfad' },
  'd2c-ndr-recovery': { src: '/media/story/decibyl-room-04-commerce-support.webp', blend: 'soft', ground: '#fcdabc' },
};

/* What the stage paints where a chapter draws its scene in code instead of
   loading a plate, and before the first plate arrives. */
const DEFAULT_GROUND = '#ead8cb';

const VERTICAL_CHAPTER: Record<string, { nav: string; title: string; chips: string[] }> = {
  clinics: {
    nav: 'Clinics',
    title: 'The patient who rang while the desk was busy.',
    chips: ['Reminders', 'Rescheduling', 'No-show recovery'],
  },
  'real-estate': {
    nav: 'Property',
    title: 'The portal lead that went cold in eleven minutes.',
    chips: ['Instant callback', 'Qualification', 'Site visits booked'],
  },
  'd2c-ndr-recovery': {
    nav: 'Commerce',
    title: 'The delivery that failed for want of one phone call.',
    chips: ['NDR recovery', 'COD confirmation', 'Order support'],
  },
};

function buildChapters(
  needs: StoryNeed[],
  call: { language: string; outcome: string; duration: string },
): Chapter[] {
  const verticalChapters: Chapter[] = needs.map((need) => {
    const told = VERTICAL_CHAPTER[need.id];
    return {
      id: need.id,
      nav: told?.nav ?? need.label,
      eyebrow: need.label,
      title: told?.title ?? need.label,
      lead: need.pain,
      chips: told?.chips ?? [],
      art: VERTICAL_PLATE[need.id]?.src,
      blend: VERTICAL_PLATE[need.id]?.blend,
      ground: VERTICAL_PLATE[need.id]?.ground,
      drawn: need.id,
      href: need.href,
    };
  });

  const clinic = verticalChapters.find((chapter) => chapter.id === 'clinics');
  if (clinic) {
    clinic.eyebrow = '10:26 AM · three patients waiting';
    clinic.lead =
      'The receptionist is already helping someone when the desk phone rings. Decibyl answers beside her, understands the patient, reschedules the visit and writes the outcome back—without asking the room to wait.';
    clinic.linkLabel = 'See the clinic workflow';
  }
  const remainingVerticals = verticalChapters.filter((chapter) => chapter.id !== 'clinics');

  return [
    ...(clinic ? [clinic] : []),
    {
      id: 'switchboard',
      nav: 'After hours',
      eyebrow: '9:47 PM · nobody left to pick up',
      title: 'The call you didn’t answer was the sale.',
      lead: 'Two lines, one receptionist, and a customer who decided to buy at nine at night. Decibyl picks up on the first ring instead — not a menu, but a voice that asks what they need and does the next thing about it.',
      chips: ['Answers on ring one', 'Books and confirms', 'Calls back too'],
      art: '/media/story/decibyl-room-01-the-answer.webp',
      blend: 'soft',
      ground: '#e3c39e',
      drawn: 'switchboard',
      href: '/how-it-works',
      linkLabel: 'How it works',
    },
    ...remainingVerticals,
    {
      id: 'call-floor',
      nav: 'At scale',
      eyebrow: '2:15 PM · every line out at once',
      title: 'One call is a demo. A hundred at once is the business.',
      lead:
        'Every room so far shows one call. The reason this replaces a floor rather than a phone is that it does not queue: the whole list goes out together, each conversation held on its own, and the ones worth a human arrive transferred and already qualified.',
      chips: ['Up to 100 concurrent', 'Whole list in one window', 'Warm transfer on intent'],
      art: '/media/story/decibyl-room-06-call-floor.webp',
      blend: 'soft',
      ground: '#fbd6bc',
      drawn: 'switchboard',
      href: '/use-cases/outbound-sales-calling',
      linkLabel: 'See outbound calling',
    },
    {
      id: 'receipt',
      nav: 'The receipt',
      eyebrow: `${call.duration} · ${call.language}`,
      title: 'Every call leaves a receipt.',
      lead: 'The point was never that it can talk. At the end there is a booked appointment, a confirmed order or a qualified lead — with the transcript, the recording and a QA score on every single call, not on a sample. You are billed for what the call actually cost, in credits, not in rounded-up minutes.',
      chips: [call.outcome, '100% QA-scored', 'Credits, not minutes'],
      art: '/media/story/decibyl-room-05-call-receipt.webp',
      blend: 'soft',
      ground: '#ead1b3',
      drawn: 'outcome',
      href: '/book-a-demo',
      linkLabel: 'Book a demo call',
    },
  ];
}
