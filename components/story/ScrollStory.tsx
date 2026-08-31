'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { buttonClass } from '@/components/ui/Button';
import { IsoDistrict } from './IsoDistrict';
import { SplitText } from './SplitText';
import styles from './story.module.css';

export type StoryNeed = { id: string; label: string; pain: string; href: string };

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

export function ScrollStory({ needs, call, phone }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [act, setAct] = useState(0);
  const [narrating, setNarrating] = useState(false);
  const [artFailed, setArtFailed] = useState<Record<string, true>>({});

  const chapters = useMemo(() => buildChapters(needs, call), [needs, call]);
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
          >
            <div className={styles.artCol}>
              <div className={styles.plate}>
                {chapter.art && !artFailed[chapter.id] ? (
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
                ) : (
                  <IsoDistrict variant={chapter.drawn} className={styles.plateDrawn} />
                )}
              </div>
            </div>

            <div className={`${styles.copyCol} ${styles.cascade}`}>
              <p className={styles.count}>
                {String(index + 1).padStart(2, '0')} / {String(acts).padStart(2, '0')}
              </p>
              <p className={styles.eyebrow}>{chapter.eyebrow}</p>
              {index === 0 ? (
                <h1 className={styles.title}>
                  <SplitText text={chapter.title} highlight={chapter.highlight} />
                </h1>
              ) : (
                <h2 className={styles.title}>
                  <SplitText text={chapter.title} highlight={chapter.highlight} />
                </h2>
              )}
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

              {index === 0 && (
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
                    Or call the agent:{' '}
                    <a href={`tel:${phone.tel}`} className={styles.phoneLink}>
                      {phone.display}
                    </a>
                    . Pick your language when it answers.
                  </p>
                </>
              )}

              {chapter.href && (
                <Link href={chapter.href} className={styles.chapterLink}>
                  {chapter.linkLabel ?? 'See the workflow'} →
                </Link>
              )}
            </div>
          </div>
        ))}

        <nav className={styles.nav} aria-label="Story chapters">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              className={styles.navItem}
              data-active={index === act}
              aria-current={index === act ? 'true' : undefined}
              ref={
                index === act
                  ? (node) => node?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
                  : undefined
              }
              onClick={() => goTo(index)}
            >
              {chapter.nav}
            </button>
          ))}
        </nav>

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
          Skip the story
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

const VERTICAL_PLATE: Record<string, string> = {
  clinics: '/media/story/decibyl-room-02-the-clinic.webp',
};

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
