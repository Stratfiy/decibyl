'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { trustStrip } from '@/data/features';
import { site } from '@/lib/site';

const languages = [
  { short: 'EN', label: 'English' },
  { short: 'हि', label: 'Hindi' },
  { short: 'த', label: 'Tamil' },
  { short: 'తె', label: 'Telugu' },
];

type NetworkInformation = { saveData?: boolean };

export function Hero() {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end start'],
  });

  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.075]);
  const copyY = useTransform(scrollYProgress, [0, 0.72], [0, reducedMotion ? 0 : -34]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.64, 0.92], [1, 1, 0]);
  const titleRotateX = useTransform(scrollYProgress, [0, 0.82], [0, reducedMotion ? 0 : 9]);
  const titleRotateY = useTransform(scrollYProgress, [0, 0.82], [-2.5, reducedMotion ? -2.5 : 5]);
  const titleScale = useTransform(scrollYProgress, [0, 0.82], [1, reducedMotion ? 1 : 0.94]);
  const greetingY = useTransform(scrollYProgress, [0, 0.48, 0.82], [18, 18, 0]);
  const greetingOpacity = useTransform(scrollYProgress, [0, 0.42, 0.72], [0, 0, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    setCanPlayVideo(!reducedMotion && !connection?.saveData);
  }, [reducedMotion]);

  return (
    <section
      ref={sceneRef}
      className="relative h-[145svh] bg-[#f4eee6]"
      aria-label="Meet your Decibyl AI voice agent"
    >
      <div className="sticky top-16 h-[calc(100svh-4rem)] min-h-[620px] overflow-hidden bg-[#f4eee6] max-sm:min-h-[640px]">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 origin-center"
          style={{ scale: sceneScale }}
        >
          {canPlayVideo ? (
            <video
              className="h-full w-full object-cover object-[67%_center] sm:object-center"
              autoPlay
              muted
              playsInline
              preload="auto"
              poster="/media/scene-one/decibyl-office-welcome-poster.webp"
            >
              <source src="/media/scene-one/decibyl-office-welcome.mp4" type="video/mp4" />
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/media/scene-one/decibyl-office-welcome-poster.webp"
              alt=""
              className="h-full w-full object-cover object-[67%_center] sm:object-center"
            />
          )}
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,244,238,0.98)_0%,rgba(248,244,238,0.91)_31%,rgba(248,244,238,0.25)_56%,rgba(248,244,238,0.02)_78%)] max-sm:bg-[linear-gradient(180deg,rgba(248,244,238,0.08)_0%,rgba(248,244,238,0.05)_34%,rgba(248,244,238,0.88)_61%,rgba(248,244,238,0.99)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f4eee6] to-transparent"
        />

        <Container className="relative h-full">
          <motion.div
            className="absolute top-1/2 left-5 z-10 max-w-[620px] -translate-y-1/2 sm:left-6 max-sm:top-auto max-sm:right-5 max-sm:bottom-8 max-sm:translate-y-0"
            style={{ y: copyY, opacity: copyOpacity }}
          >
            <p className="t-eyebrow text-sindoor">AI voice agents for Indian businesses</p>

            <div className="mt-5 [perspective:1200px]">
              <motion.h1
                className="max-w-[11ch] font-display text-[clamp(3.15rem,6.1vw,5.75rem)] leading-[0.93] font-bold tracking-[-0.055em] text-balance max-sm:text-[clamp(2.9rem,14vw,4rem)]"
                style={{
                  rotateX: titleRotateX,
                  rotateY: titleRotateY,
                  scale: titleScale,
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                }}
              >
                <DepthText text="Your AI voice agent." faceColor="#201915" edgeColor="#8b7668" />
                <DepthText
                  text="Always ready to answer."
                  faceColor="#e95a52"
                  edgeColor="#8f2928"
                  className="mt-2 font-normal tracking-[-0.045em]"
                />
              </motion.h1>
            </div>

            <p className="mt-6 max-w-[560px] text-[clamp(1rem,1.35vw,1.2rem)] leading-relaxed text-ink/72 text-pretty max-sm:mt-4 max-sm:line-clamp-3">
              Decibyl handles customer calls, qualifies leads, books appointments and completes
              follow-ups—in Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati, English and more.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 max-sm:mt-5">
              <ButtonLink href="/book-a-demo" size="lg">
                Build my voice agent <span aria-hidden="true">→</span>
              </ButtonLink>
              <a
                href={`tel:${site.demoPhone.tel}`}
                className="inline-flex h-13 items-center gap-2 rounded-button border border-ink/15 bg-white/72 px-6 font-medium text-ink backdrop-blur-md transition-colors hover:bg-white"
              >
                <MicIcon />
                Talk to Decibyl
              </a>
            </div>

            <p className="t-data mt-5 text-ink/58 max-sm:hidden">
              {trustStrip.join(' · ')}
            </p>
          </motion.div>

          <motion.div
            className="glass absolute right-6 bottom-8 z-20 w-[min(390px,calc(100%-3rem))] rounded-panel border-white/90 p-5 shadow-lift max-sm:hidden"
            style={{ y: greetingY, opacity: greetingOpacity }}
          >
            <div className="flex items-start gap-4">
              <span className="relative mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-vermilion text-white shadow-warm">
                <span className="absolute inset-0 animate-ping rounded-full bg-vermilion/20" />
                <WaveIcon />
              </span>
              <div>
                <p className="t-eyebrow text-sindoor">Decibyl is listening</p>
                <p className="mt-1 font-display text-lg font-semibold leading-snug text-ink">
                  Hi! How can I help your business today?
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2" aria-label="Choose a language">
              {languages.map((language) => (
                <span
                  key={language.label}
                  title={language.label}
                  className="t-indic flex h-9 min-w-9 items-center justify-center rounded-full border border-ink/10 bg-white/80 px-2 text-sm font-medium text-ink"
                >
                  {language.short}
                </span>
              ))}
              <span className="ml-auto self-center text-xs font-medium text-slate">Speak naturally</span>
            </div>
          </motion.div>
        </Container>

        <div className="absolute inset-x-0 bottom-0 z-30 h-1 bg-ink/5" aria-hidden="true">
          <motion.div className="h-full bg-vermilion" style={{ width: progressWidth }} />
        </div>
        <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-center max-sm:hidden" aria-hidden="true">
          <p className="t-eyebrow text-ink/45">Scroll to enter the office</p>
          <span className="mx-auto mt-2 block h-8 w-px bg-ink/20" />
        </div>
      </div>
    </section>
  );
}

function DepthText({
  text,
  faceColor,
  edgeColor,
  className = '',
}: {
  text: string;
  faceColor: string;
  edgeColor: string;
  className?: string;
}) {
  return (
    <span
      className={`relative block ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {[7, 6, 5, 4, 3, 2, 1].map((depth) => (
        <span
          key={depth}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block select-none"
          style={{
            color: edgeColor,
            transform: `translate3d(${depth * 1.15}px, ${depth * 1.45}px, ${-depth}px)`,
            opacity: 0.86 + depth * 0.02,
          }}
        >
          {text}
        </span>
      ))}
      <span
        className="relative block"
        style={{
          color: faceColor,
          transform: 'translateZ(1px)',
          textShadow: '0 12px 24px rgba(55, 31, 22, 0.18)',
        }}
      >
        {text}
      </span>
    </span>
  );
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="6" y="2" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.75 8.75a5.25 5.25 0 0 0 10.5 0M9 14v2M6.5 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 11.5v-3m4 6v-9m4 8v-7m4 5v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
