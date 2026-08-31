'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { buttonClass } from '@/components/ui/Button';
import { BuildBadge } from './BuildBadge';
import { IsoDistrict } from './IsoDistrict';
import { SplitText } from './SplitText';
import styles from './story.module.css';

/* ============================================================================
   The Decibyl scroll story.

   Each chapter is its own miniature diorama on a light cream ground with its
   copy beside it. Chapter 01 carries the page H1 and the CTAs, so the story
   is the hero rather than something sitting above one.

   How many chapters there are is not a constant anywhere in this file. It is
   whatever `buildChapters` returns — a spine of arguments only Decibyl can
   make, plus one chapter per vertical the caller passes in. The counter, the
   nav, the rail and the total scroll length all derive from that array.

   Two plates per chapter slot: a rendered diorama when one exists
   (`decibyl-town-drafts-2026-08-31`), and a drawn isometric stand-in until
   then. Swapping is a one-line change to `art` in buildChapters.

   Narration is built in but never starts itself. Decibyl sells a voice, so
   the story can be told by one — on request, per chapter, and it stops the
   moment the reader scrolls to a different chapter.
   ============================================================================ */

export type StoryNeed = { id: string; label: string; pain: string; href: string };
export type StoryLine = { speaker: 'agent' | 'customer' | 'system'; text: string; indic?: boolean };

type Props = {
  needs: StoryNeed[];
  call: { language: string; outcome: string; duration: string };
  phone: { tel: string; display: string };
};

type Chapter = {
  id: string;
  nav: string;
  eyebrow: string;
  /** Plain text — it is split into words for the reveal, so it cannot be JSX. */
  title: string;
  /** How many leading words take the extruded brand treatment. */
  highlight?: number;
  lead: string;
  chips: string[];
  /** Rendered plate path, once the Kie drafts land. */
  art?: string;
  /** Which drawn isometric stands in until then. */
  drawn: string;
  href?: string;
  linkLabel?: string;
  /** Narration clip. Absent until the voice tracks are cut. */
  audio?: string;
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/* Each language in its own script, because writing "Tamil" in Latin letters is
   the same move as a language menu — it asks the reader to take our word for it.
   Latin labels are interleaved so the strip is still readable to everyone. */
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

/** Scroll length per chapter, in svh. */
const CHAPTER_SCROLL_VH = 88;

export function ScrollStory({ needs, call, phone }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [act, setAct] = useState(0);
  const [narrating, setNarrating] = useState(false);
  /* Chapters whose rendered plate is missing or failed to decode. They fall
     back to the drawn isometric, so a half-delivered set of renders degrades
     one chapter at a time instead of breaking the story. */
  const [artFailed, setArtFailed] = useState<Record<string, true>>({});

  const markArtFailed = useCallback((id: string) => {
    setArtFailed((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const chapters = buildChapters(needs, call);
  const ACTS = chapters.length;

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;

    const read = () => {
      frame = 0;
      const travel = section.offsetHeight - stage.offsetHeight;
      if (travel <= 0) return;

      const rect = section.getBoundingClientRect();
      const p = clamp(-rect.top / travel, 0, 1);
      stage.style.setProperty('--sp', p.toFixed(4));

      /* Tell the page the story currently owns the viewport, so the header can
         stay transparent over it and the cream reads edge to edge. Cleared the
         moment the story is behind us, so the rest of the page — and every
         other page — keeps the normal glass header. */
      const owns = rect.top <= 0 && rect.bottom > stage.offsetHeight * 0.5;
      document.documentElement.dataset.storyHero = owns ? 'true' : 'false';

      const raw = p * ACTS;
      const index = clamp(Math.floor(raw), 0, ACTS - 1);
      /* Position within the chapter, signed and centred: -0.5 entering, 0 at
         rest, +0.5 leaving. Centring it matters — an unsigned 0→1 makes the
         camera snap back to its start at every chapter boundary, which is
         exactly the jolt that made this read as a slideshow. */
      stage.style.setProperty('--drift', (raw - index - 0.5).toFixed(3));
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
  }, [ACTS]);

  /* Narration follows the reader: changing chapter swaps the clip, and a
     chapter with no clip yet simply plays nothing rather than erroring. */
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
      window.scrollTo({ top: top + ((index + 0.5) / ACTS) * travel, behavior: 'smooth' });
    },
    [ACTS],
  );

  const state = (i: number) => (i === act ? 'active' : i < act ? 'past' : 'future');

  return (
    <section
      ref={sectionRef}
      className={styles.story}
      /* A custom property, not an inline height: an inline height outranks the
         reduced-motion media query and would leave five empty screens under
         the stacked document. */
      style={{ '--story-h': `${ACTS * CHAPTER_SCROLL_VH}svh` } as React.CSSProperties}
      aria-label="The Decibyl story"
    >
      {/* One snap marker per chapter, so a flick lands on a chapter instead of
          sailing through three. See `.snapPoint`. */}
      {chapters.map((c, i) => (
        <span
          key={`snap-${c.id}`}
          className={styles.snapPoint}
          /* Half a chapter down, not at its start. Snapping to the start
             parks the camera at one end of its travel, so every chapter rests
             on the same slightly-pulled-back framing; landing mid-chapter
             rests it at the neutral composition and leaves room to move either
             way during a scroll. */
          style={{ top: `${(i + 0.5) * CHAPTER_SCROLL_VH}svh` }}
          aria-hidden="true"
        />
      ))}

      <div ref={stageRef} className={styles.stage} data-story-stage>
        {chapters.map((c, i) => (
          <div key={c.id} className={styles.scene} data-story-scene data-state={state(i)}>
            <div className={styles.artCol}>
              <div className={styles.plate}>
                {c.art && !artFailed[c.id] ? (
                  <img
                    src={c.art}
                    alt=""
                    className={styles.plateMedia}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    loading={i === 0 ? undefined : 'lazy'}
                    decoding="async"
                    onError={() => markArtFailed(c.id)}
                    /* `onError` alone is not enough: the browser starts
                       fetching the server-rendered <img> before React
                       hydrates, so a 404 fires its error event with no
                       handler attached yet and the broken image sticks.
                       Re-check the decoded state when the node mounts. */
                    ref={(node) => {
                      if (node?.complete && node.naturalWidth === 0) markArtFailed(c.id);
                    }}
                  />
                ) : (
                  <IsoDistrict variant={c.drawn} className={styles.plateDrawn} />
                )}
              </div>
            </div>

            <div className={`${styles.copyCol} ${styles.cascade}`}>
              <p className={styles.count}>
                {String(i + 1).padStart(2, '0')} / {String(ACTS).padStart(2, '0')}
              </p>
              <p className={styles.eyebrow}>{c.eyebrow}</p>
              {i === 0 ? (
                <h1 className={styles.title}>
                  <SplitText text={c.title} highlight={c.highlight} />
                </h1>
              ) : (
                <h2 className={styles.title}>
                  <SplitText text={c.title} highlight={c.highlight} />
                </h2>
              )}
              <p className={styles.lead}>{c.lead}</p>

              {c.chips.length > 0 && (
                <div className={styles.chips}>
                  {c.chips.map((chip, ci) => (
                    <span
                      key={chip}
                      className={styles.chip}
                      style={{ '--i': ci } as React.CSSProperties}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              {i === 0 && (
                <>
                  <div className={styles.actions}>
                    <Link href="/book-a-demo" className={buttonClass('primary', 'lg')}>
                      Book a demo call
                    </Link>
                    <Link href="/pricing" className={buttonClass('secondary', 'lg')}>
                      See pricing
                    </Link>
                  </div>
                  <p className={styles.phoneLine}>
                    Or just call the agent:{' '}
                    <a href={`tel:${phone.tel}`} className={styles.phoneLink}>
                      {phone.display}
                    </a>
                    . Pick your language when it answers.
                  </p>
                </>
              )}

              {c.href && (
                <Link href={c.href} className={styles.chapterLink}>
                  {c.linkLabel ?? 'See the workflow'} →
                </Link>
              )}
            </div>
          </div>
        ))}

        <nav className={styles.nav} aria-label="Story chapters">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={styles.navItem}
              data-active={i === act}
              aria-current={i === act ? 'true' : undefined}
              /* The rail scrolls horizontally on narrow screens; without this
                 the active chapter drifts off the end of it. */
              ref={
                i === act
                  ? (n) => n?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
                  : undefined
              }
              onClick={() => goTo(i)}
            >
              {c.nav}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className={styles.voice}
          data-on={narrating}
          aria-pressed={narrating}
          onClick={() => setNarrating((v) => !v)}
        >
          <span className={styles.orb} aria-hidden="true">
            <span className={styles.orbRing} />
            <span className={styles.orbRing} />
            <span className={styles.orbCore} />
          </span>
          {narrating ? 'Stop narration' : 'Hear the story'}
        </button>
        <audio ref={audioRef} preload="none" />

        {/* Temporary — remove before merge. See BuildBadge.tsx. */}
        <BuildBadge />

        <div className={styles.rail} aria-hidden="true">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              type="button"
              tabIndex={-1}
              className={styles.railTick}
              data-active={i === act}
              data-done={i < act}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <a href="#story-end" className={styles.skip}>
          Skip the story
        </a>

        <p className={styles.cue} aria-hidden="true">
          Scroll to begin
        </p>

        {/* The languages, running. Duplicated once so the -50% loop is seamless. */}
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[...LANGUAGE_STRIP, ...LANGUAGE_STRIP].map((item, li) => (
              <span key={li} className={styles.marqueeItem} data-indic={item.indic || undefined}>
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

/* ---------------------------------------------------------------------------
   The story.

   The chapter count is NOT fixed. It falls out of what the brand has to say:
   a spine of four arguments only Decibyl can make, plus one chapter per
   vertical we are actually willing to stand behind. Add a vertical and the
   story grows a chapter — the counter, the nav, the rail and the scroll
   length all read from this array.

   Which verticals arrive here is the caller's decision, and it is a real one.
   `components/marketing/Nav.tsx` carries the standing rule: we show three
   verticals, not all nine, because nine verticals against three live pilots
   reads as "we do everything, we've proven nothing". The story obeys the same
   rule for the same reason.
   --------------------------------------------------------------------------- */

/** Rendered plates per vertical, keyed by slug. These paths are wired ahead of
 *  the files existing: dropping the PNG in makes the chapter switch from the
 *  drawn stand-in to the render with no code change, and a missing file falls
 *  back rather than breaking. See `public/media/story/README.md`. */
const VERTICAL_PLATE: Record<string, string> = {
  clinics: '/media/story/decibyl-room-02-the-clinic.webp',
  'd2c-ndr-recovery': '/media/story/decibyl-room-03-the-commerce.webp',
};

/** How each vertical is told, keyed by slug. A vertical with no entry still
 *  gets a chapter, built from its own card copy. */
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
      art: VERTICAL_PLATE[need.id],
      drawn: need.id,
      href: need.href,
    };
  });

  return [
    /* Opens on the problem every business recognises, and carries the H1. */
    {
      id: 'street',
      nav: 'The street',
      eyebrow: 'AI voice agents · Built in India',
      title: 'AI voice agents for Indian businesses.',
      highlight: 3,
      lead: 'Decibyl answers your phone, qualifies the lead, books the appointment and makes the follow-up call. Every call transcribed, recorded and scored.',
      chips: ['Always available', 'Inbound and outbound', '10+ languages'],
      drawn: 'street',
    },

    /* The sharpest thing we own. Everyone claims languages; almost nobody
       admits that real Indian business calls are code-mixed mid-sentence, and
       that a language menu is an admission of failure rather than a feature. */
    {
      id: 'language',
      nav: 'The language',
      eyebrow: 'The register your customer actually speaks',
      title: '“Press 1 for English” is the bug, not the feature.',
      lead: 'Most Indian business calls are code-mixed — Hindi and English in the same sentence, Tamil and English in the next. Agents built for clean English fall apart on the first line, and a language menu just asks the customer to do the work. Decibyl is built for the mixed register by default.',
      chips: ['Hinglish · Tanglish', 'No language menu', '7 Indian languages live'],
      drawn: 'language',
      href: '/voice-ai',
      linkLabel: 'Hear the languages',
    },

    /* What it actually does, in the one place a buyer asks for it. */
    {
      id: 'switchboard',
      nav: 'The answer',
      eyebrow: '9:47 PM · nobody left to pick up',
      title: 'The call you didn’t answer was the sale.',
      lead: 'Two lines, one receptionist, and a customer who decided to buy at nine at night. Decibyl picks up on the first ring instead — not a menu, but a voice that asks what they need and does the next thing about it.',
      chips: ['Answers on ring one', 'Books and confirms', 'Calls back too'],
      art: '/media/story/decibyl-room-01-the-answer.webp',
      drawn: 'switchboard',
      href: '/how-it-works',
      linkLabel: 'How it works',
    },

    ...verticalChapters,

    /* Closes on evidence rather than on a promise: the receipt is the product. */
    {
      id: 'receipt',
      nav: 'The receipt',
      eyebrow: `${call.duration} · ${call.language}`,
      title: 'Every call leaves a receipt.',
      lead: 'The point was never that it can talk. At the end there is a booked appointment, a confirmed order or a qualified lead — with the transcript, the recording and a QA score on every single call, not on a sample. You are billed for what the call actually cost, in credits, not in rounded-up minutes.',
      chips: [call.outcome, '100% QA-scored', 'Credits, not minutes'],
      drawn: 'outcome',
      href: '/book-a-demo',
      linkLabel: 'Book a demo call',
    },
  ];
}
