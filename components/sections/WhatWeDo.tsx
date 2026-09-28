"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useReduced } from "@/lib/useReduced";
import { SectionHead } from "@/components/ui/SectionHead";
import { Glyph } from "@/components/ui/Glyph";
import { CAPABILITY_VISUALS } from "./CapabilityVisuals";

const CAPABILITIES = [
  {
    title: "Digital Experiences",
    glyph: "experience",
    body: "Websites, platforms, portals and digital experiences designed around business objectives.",
  },
  {
    title: "Custom Software",
    glyph: "software",
    body: "CRMs, dashboards, internal systems, portals and applications designed around real business workflows.",
  },
  {
    title: "Automation",
    glyph: "automation",
    body: "Connect systems and automate repetitive business processes.",
  },
  {
    title: "AI Solutions",
    glyph: "ai",
    body: "Apply AI to real business workflows, customer experiences, analysis and decision-making.",
  },
  {
    title: "Data & Intelligence",
    glyph: "intelligence",
    body: "Turn scattered business information into useful business intelligence.",
  },
  {
    title: "Integration",
    glyph: "integration",
    body: "Connect applications, systems, APIs, data and tools into one ecosystem.",
  },
];

const CYCLE_MS = 5200;

export function WhatWeDo() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReduced();

  useEffect(() => {
    if (!inView || interacted || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % CAPABILITIES.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, inView, interacted, reduce]);

  const Visual = CAPABILITY_VISUALS[active];

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="section-y">
      <div className="container-x">
        <SectionHead
          id="solutions-title"
          index="01"
          label="What we do"
          align="split"
          title="We build digital systems around your business."
          lede={
            <>
              <p>Every business has different processes, challenges and opportunities.</p>
              <p>
                Instead of forcing businesses into generic solutions, we understand how the business works and build
                the digital infrastructure required to improve it.
              </p>
            </>
          }
        />

        <div ref={ref} className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" className="lg:col-span-5">
            {CAPABILITIES.map((c, i) => {
              const on = i === active;
              return (
                <div key={c.title} className="border-t border-[var(--line)] last:border-b">
                  <button
                    role="tab"
                    id={`cap-tab-${i}`}
                    aria-selected={on}
                    aria-controls="cap-panel"
                    onClick={() => {
                      setActive(i);
                      setInteracted(true);
                    }}
                    onMouseEnter={() => {
                      setActive(i);
                      setInteracted(true);
                    }}
                    className="group relative flex w-full items-start gap-5 py-6 text-left"
                  >
                    <span className="mono w-6 pt-1.5 text-[11px] text-[var(--muted)]">0{i + 1}</span>
                    <span className="flex-1">
                      <span
                        className={`flex items-center gap-3 font-[family-name:var(--font-display)] text-[1.45rem] font-semibold tracking-tight transition-colors sm:text-[1.7rem] ${
                          on ? "text-ink" : "text-black/40 group-hover:text-black/70"
                        }`}
                      >
                        {c.title}
                      </span>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.span
                            className="block overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <span className="block max-w-md pt-3 text-[1rem] leading-relaxed text-[var(--muted)]">
                              {c.body}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        on
                          ? "border-[var(--signal)] bg-[var(--signal)] text-white"
                          : "border-[var(--line-strong)] text-[var(--muted)]"
                      }`}
                    >
                      <Glyph name={c.glyph} size={18} />
                    </span>
                    {on && !interacted && !reduce && inView && (
                      <motion.span
                        key={`bar-${active}`}
                        className="absolute -top-px left-0 h-[2px] bg-[var(--signal)]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="order-first lg:order-last lg:col-span-7">
            <div
              id="cap-panel"
              role="tabpanel"
              aria-labelledby={`cap-tab-${active}`}
              className="relative overflow-hidden rounded-[26px] bg-[var(--paper-2)] p-4 sm:p-8 lg:sticky lg:top-28"
            >
              <div className="grid-paper pointer-events-none absolute inset-0 opacity-70" aria-hidden />
              <div className="relative mb-5 flex items-center justify-between">
                <span className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {CAPABILITIES[active].title}
                </span>
                <span className="mono text-[11px] text-[var(--muted)]">
                  0{active + 1} / 0{CAPABILITIES.length}
                </span>
              </div>
              <div className="relative h-[310px] sm:h-[380px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Visual />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
