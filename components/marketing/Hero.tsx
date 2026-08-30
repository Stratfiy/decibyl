'use client';

import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type NetworkInformation = { saveData?: boolean };

export function Hero() {
  const sceneRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playedDuringVisit = useRef(false);
  const reducedMotion = useReducedMotion();
  const sceneIsVisible = useInView(sceneRef, { amount: 0.35 });
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  });

  const worldScale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.16]);
  const worldX = useTransform(scrollYProgress, [0, 1], ['0%', reducedMotion ? '0%' : '-2.5%']);
  const titleY = useTransform(scrollYProgress, [0, 0.72, 1], [0, reducedMotion ? 0 : -72, reducedMotion ? 0 : -150]);
  const titleX = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 46]);
  const titleScale = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.96, reducedMotion ? 1 : 0.84]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.76, 1], [1, 0.96, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    setCanPlayVideo(!reducedMotion && !connection?.saveData);
  }, [reducedMotion]);

  useEffect(() => {
    if (!sceneIsVisible) {
      playedDuringVisit.current = false;
      return;
    }

    if (!canPlayVideo || playedDuringVisit.current) return;

    const playFromStart = () => {
      const video = videoRef.current;
      if (!video || document.visibilityState !== 'visible' || playedDuringVisit.current) return;
      video.currentTime = 0;
      void video.play().then(() => {
        playedDuringVisit.current = true;
      }).catch(() => undefined);
    };

    playFromStart();
    document.addEventListener('visibilitychange', playFromStart);
    return () => document.removeEventListener('visibilitychange', playFromStart);
  }, [canPlayVideo, sceneIsVisible]);

  return (
    <section
      ref={sceneRef}
      className="relative h-[125svh] bg-[#17100d]"
      aria-label="Meet your Decibyl AI voice agent"
    >
      <div className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden bg-[#17100d]">
        <motion.div
          aria-hidden="true"
          className="absolute -inset-[4%] origin-center"
          style={{ scale: worldScale, x: worldX }}
        >
          {canPlayVideo ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover object-[68%_center] sm:object-center"
              muted
              playsInline
              preload="auto"
              onEnded={(event) => event.currentTarget.pause()}
              poster="/media/scene-one/decibyl-office-welcome-poster.webp"
            >
              <source src="/media/scene-one/decibyl-office-welcome.mp4" type="video/mp4" />
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/media/scene-one/decibyl-office-welcome-poster.webp"
              alt=""
              className="h-full w-full object-cover object-[68%_center] sm:object-center"
            />
          )}
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,transparent_28%,rgba(25,13,9,0.16)_76%,rgba(16,9,7,0.36)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#160c08]/70 via-[#160c08]/12 to-transparent"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[min(46vw,560px)] bg-gradient-to-r from-[#f7f1ea]/95 via-[#f7f1ea]/72 to-transparent max-sm:w-[88vw]"
        />

        <motion.div
          className="absolute top-[48%] left-[clamp(1.5rem,6vw,7rem)] z-20 w-[min(27vw,350px)] -translate-y-1/2 origin-left max-sm:top-[56%] max-sm:left-6 max-sm:w-[min(68vw,18.5rem)]"
          style={{
            x: titleX,
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity,
          }}
        >
          <p className="mb-4 font-mono text-[0.58rem] font-semibold tracking-[0.2em] text-[#7a6259] uppercase">
            01 / 06 · Meet Decibyl
          </p>
          <h1 className="font-display text-[clamp(2.35rem,4vw,4.4rem)] leading-[0.92] font-semibold tracking-[-0.055em] text-[#241b18] max-sm:text-[2.6rem]">
            Your AI
            <br />
            voice agent.
          </h1>
          <p className="mt-5 max-w-[31ch] text-[0.92rem] leading-relaxed text-[#564943] max-sm:text-[0.84rem]">
            Handles customer calls, qualifies leads and books appointments—in every language your customers speak.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[0.64rem] font-medium text-[#4b3c36]">
            <span className="rounded-full bg-white/60 px-3 py-1.5">Always available</span>
            <span className="rounded-full bg-white/60 px-3 py-1.5">10+ languages</span>
          </div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute right-5 bottom-5 z-20 flex items-end gap-3 text-white sm:right-8 sm:bottom-7"
          style={{ opacity: cueOpacity }}
        >
          <span className="font-mono text-[0.62rem] font-semibold tracking-[0.24em] uppercase drop-shadow-md">
            Scroll to enter
          </span>
          <span className="block h-12 w-px bg-white/65" />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-30 h-[3px] bg-white/15" aria-hidden="true">
          <motion.div className="h-full bg-[#f06359]" style={{ width: progressWidth }} />
        </div>
      </div>
    </section>
  );
}
