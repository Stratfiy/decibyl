'use client';

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const needs = [
  {
    id: 'clinic',
    label: 'Clinics & healthcare',
    detail: 'Answer patients, qualify enquiries, book appointments and send reminders.',
    result: 'Clinic world selected',
  },
  {
    id: 'realestate',
    label: 'Real estate',
    detail: 'Respond to portal leads, qualify buyers and schedule property visits.',
    result: 'Property world selected',
  },
  {
    id: 'd2c',
    label: 'D2C & ecommerce',
    detail: 'Confirm orders, recover failed deliveries and handle support calls.',
    result: 'Commerce world selected',
  },
  {
    id: 'other',
    label: 'Other business',
    detail: 'Build an inbound or outbound voice workflow around your exact process.',
    result: 'Custom world selected',
  },
] as const;

export function NeedSelectorScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<(typeof needs)[number]['id']>('clinic');
  const active = needs.find((need) => need.id === activeId) ?? needs[0];
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  });

  const worldScale = useTransform(scrollYProgress, [0, 1], [1.01, reducedMotion ? 1.01 : 1.12]);
  const worldX = useTransform(scrollYProgress, [0, 1], ['0%', reducedMotion ? '0%' : '-3.5%']);
  const panelY = useTransform(scrollYProgress, [0, 1], [reducedMotion ? 0 : 14, reducedMotion ? 0 : -18]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.16, 0.88, 1], [0, 1, 1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (reducedMotion) return;
    const index = Math.min(needs.length - 1, Math.floor(latest * needs.length));
    const nextId = needs[index].id;
    setActiveId((current) => (current === nextId ? current : nextId));
  });

  return (
    <section
      ref={sceneRef}
      className="relative h-[100svh] min-h-[620px] bg-[#17100d]"
      aria-label="Choose your business type"
    >
      <div className="relative h-full overflow-hidden bg-[#17100d]">
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
          className="absolute top-1/2 left-[clamp(2rem,6vw,7rem)] z-20 w-[min(26vw,340px)] -translate-y-1/2 max-sm:top-auto max-sm:right-5 max-sm:bottom-12 max-sm:left-5 max-sm:w-auto max-sm:translate-y-0"
          style={{ y: panelY, opacity: panelOpacity }}
        >
          <p className="mb-4 font-mono text-[0.58rem] font-semibold tracking-[0.2em] text-[#7a6259] uppercase">
            02 / 06 · Choose your world
          </p>
          <h2 className="font-display text-[clamp(1.95rem,3vw,3.15rem)] leading-[0.94] font-semibold tracking-[-0.052em] text-[#241b18] max-sm:text-[2.25rem]">
            What kind of
            <br />
            business are you?
          </h2>

          <div className="mt-5 grid gap-2" role="group" aria-label="Choose your business type">
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
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
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
