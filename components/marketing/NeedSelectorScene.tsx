'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const needs = [
  {
    id: 'answer',
    label: 'Answer every call',
    detail: 'Inbound calls are answered instantly, even after hours.',
    result: 'No missed caller',
  },
  {
    id: 'qualify',
    label: 'Qualify new leads',
    detail: 'Every enquiry is understood, scored and routed to the right person.',
    result: 'Sales-ready lead',
  },
  {
    id: 'book',
    label: 'Book appointments',
    detail: 'Availability is checked and the appointment is confirmed while they are still on the call.',
    result: 'Calendar confirmed',
  },
  {
    id: 'recover',
    label: 'Recover failed orders',
    detail: 'The buyer is called in their language and the delivery is rescheduled.',
    result: 'Order recovered',
  },
] as const;

export function NeedSelectorScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<(typeof needs)[number]['id']>('answer');
  const active = needs.find((need) => need.id === activeId) ?? needs[0];
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  });

  const worldScale = useTransform(scrollYProgress, [0, 1], [1.01, reducedMotion ? 1.01 : 1.12]);
  const worldX = useTransform(scrollYProgress, [0, 1], ['0%', reducedMotion ? '0%' : '-3.5%']);
  const panelY = useTransform(scrollYProgress, [0, 0.75, 1], [26, 0, reducedMotion ? 0 : -48]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.16, 0.88, 1], [0, 1, 1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={sceneRef}
      className="relative h-[165svh] bg-[#17100d]"
      aria-label="Choose what your voice agent should handle"
    >
      <div className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden bg-[#17100d]">
        <motion.div
          aria-hidden="true"
          className="absolute -inset-[2%] origin-center"
          style={{ scale: worldScale, x: worldX }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/scene-two/decibyl-business-selector.png"
            alt=""
            className="h-full w-full object-cover object-center max-sm:object-[72%_center]"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(247,241,234,0.08),transparent_48%,rgba(247,241,234,0.04))] max-sm:bg-[linear-gradient(0deg,rgba(247,241,234,0.98)_0%,rgba(247,241,234,0.82)_35%,transparent_67%)]"
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-[36.2%] left-[76.7%] z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff776c]/65 max-sm:top-[35%] max-sm:left-[62%]"
          animate={reducedMotion ? undefined : { scale: [0.8, 2.15], opacity: [0.7, 0] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-[36.2%] left-[76.7%] z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6f63]/35 shadow-[0_0_22px_rgba(255,102,91,0.65)] max-sm:top-[35%] max-sm:left-[62%]"
          animate={reducedMotion ? undefined : { scale: [0.9, 1.18, 0.9], opacity: [0.72, 1, 0.72] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute top-1/2 right-[clamp(1.5rem,5vw,6rem)] z-20 w-[min(30vw,370px)] -translate-y-1/2 max-sm:top-auto max-sm:right-5 max-sm:bottom-16 max-sm:w-[calc(100%-2.5rem)] max-sm:translate-y-0"
          style={{ y: panelY, opacity: panelOpacity }}
        >
          <p className="mb-4 font-mono text-[0.58rem] font-semibold tracking-[0.2em] text-[#7a6259] uppercase">
            02 / 06 · Start with the job
          </p>
          <h2 className="font-display text-[clamp(2.1rem,3.5vw,3.8rem)] leading-[0.94] font-semibold tracking-[-0.052em] text-[#241b18] max-sm:text-[2.25rem]">
            What should
            <br />
            Decibyl handle?
          </h2>

          <div className="mt-6 grid gap-2" role="group" aria-label="Choose a business need">
            {needs.map((need) => {
              const selected = need.id === activeId;
              return (
                <button
                  key={need.id}
                  type="button"
                  onClick={() => setActiveId(need.id)}
                  aria-pressed={selected}
                  className={`flex items-center justify-between rounded-full border px-4 py-2.5 text-left text-[0.82rem] font-medium transition-all ${
                    selected
                      ? 'border-[#f06359]/45 bg-[#f06359] text-white shadow-[0_8px_24px_rgba(126,55,48,0.18)]'
                      : 'border-[#3e302a]/10 bg-white/55 text-[#3e302a] hover:bg-white/80'
                  }`}
                >
                  <span>{need.label}</span>
                  <span aria-hidden="true" className={selected ? 'text-white' : 'text-[#a18d83]'}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={active.id}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 border-l border-[#f06359]/60 pl-4"
          >
            <p className="text-[0.82rem] leading-relaxed text-[#5d4c45]">{active.detail}</p>
            <p className="mt-2 font-mono text-[0.6rem] font-semibold tracking-[0.16em] text-[#a4443d] uppercase">
              Outcome · {active.result}
            </p>
          </motion.div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-30 h-[3px] bg-white/15" aria-hidden="true">
          <motion.div className="h-full bg-[#f06359]" style={{ width: progressWidth }} />
        </div>
      </div>
    </section>
  );
}
