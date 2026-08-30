'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { heroTypographySrc } from '@/data/heroTypography';

type NetworkInformation = { saveData?: boolean };

export function Hero() {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
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
  const titleRotate = useTransform(scrollYProgress, [0, 1], [-1.6, reducedMotion ? -1.6 : 1.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.76, 1], [1, 0.96, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    setCanPlayVideo(!reducedMotion && !connection?.saveData);
  }, [reducedMotion]);

  return (
    <section
      ref={sceneRef}
      className="relative h-[180svh] bg-[#17100d]"
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
              className="h-full w-full object-cover object-[68%_center] sm:object-center"
              autoPlay
              muted
              loop
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

        <motion.div
          className="absolute bottom-[clamp(4.5rem,8vh,6.5rem)] left-[clamp(1.25rem,3.5vw,4rem)] z-20 w-[clamp(17rem,30vw,34rem)] origin-bottom-left max-sm:bottom-[5.5rem] max-sm:w-[min(76vw,24rem)]"
          style={{
            x: titleX,
            y: titleY,
            scale: titleScale,
            rotate: titleRotate,
            opacity: titleOpacity,
          }}
        >
          <h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroTypographySrc}
              alt="Your AI voice agent"
              className="h-auto w-full select-none object-contain object-left-bottom drop-shadow-[0_18px_26px_rgba(12,7,6,0.42)]"
              draggable={false}
            />
          </h1>
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
