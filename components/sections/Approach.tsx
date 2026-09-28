"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useReduced } from "@/lib/useReduced";
import { SectionHead } from "@/components/ui/SectionHead";

const STEPS = [
  { t: "Discover", d: "Understand the business, customers, processes, technology and challenges." },
  { t: "Diagnose", d: "Identify bottlenecks, inefficiencies and transformation opportunities." },
  { t: "Strategize", d: "Define what should be digitized, automated, connected or rebuilt." },
  { t: "Design", d: "Create the experience, architecture and workflows." },
  { t: "Build", d: "Develop the required software, infrastructure, automation and AI systems." },
  { t: "Integrate", d: "Connect new systems with existing tools, data and processes." },
  { t: "Optimize", d: "Use data and feedback to continuously improve the system." },
];

/** Small original line illustration for each stage. */
function StepArt({ i }: { i: number }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const accent = { ...s, stroke: "var(--signal)", strokeWidth: 2 };
  const arts = [
    <g key="0">
      {Array.from({ length: 30 }).map((_, k) => (
        <circle key={k} cx={30 + (k % 6) * 28} cy={30 + Math.floor(k / 6) * 26} r="2.2" fill="currentColor" opacity={0.3} />
      ))}
      <circle cx="115" cy="80" r="34" {...accent} />
      <path d="M140 105l26 26" {...accent} />
    </g>,
    <g key="1">
      <path d="M20 40h60l30 40M20 80h60l30 0M20 120h60l30-40" {...s} opacity={0.5} />
      <circle cx="120" cy="80" r="10" {...accent} />
      <path d="M130 80h50" {...s} strokeDasharray="3 6" />
    </g>,
    <g key="2">
      <circle cx="30" cy="80" r="6" {...s} />
      <path d="M36 80h30M66 80c20 0 20-40 40-40h20M66 80h60M66 80c20 0 20 40 40 40h20" {...s} opacity={0.6} />
      <circle cx="132" cy="40" r="6" {...s} />
      <circle cx="132" cy="80" r="6" {...accent} />
      <circle cx="132" cy="120" r="6" {...s} />
      <path d="M138 80h40" {...accent} />
    </g>,
    <g key="3">
      <rect x="24" y="24" width="152" height="112" rx="8" {...s} />
      <path d="M24 46h152" {...s} />
      <rect x="38" y="60" width="60" height="62" rx="4" {...accent} />
      <path d="M112 64h50M112 80h40M112 96h50M112 112h30" {...s} opacity={0.5} />
    </g>,
    <g key="4">
      <path d="M100 30l70 28-70 28-70-28z" {...s} />
      <path d="M30 80l70 28 70-28" {...s} opacity={0.6} />
      <path d="M30 102l70 28 70-28" {...accent} />
    </g>,
    <g key="5">
      {[
        [40, 40],
        [160, 40],
        [40, 120],
        [160, 120],
      ].map(([x, y], k) => (
        <g key={k}>
          <rect x={x - 16} y={y - 12} width="32" height="24" rx="6" {...s} />
          <path d={`M${x} ${y}L100 80`} {...s} opacity={0.5} strokeDasharray="3 5" />
        </g>
      ))}
      <circle cx="100" cy="80" r="16" {...accent} />
    </g>,
    <g key="6">
      <path d="M20 130c30-4 40-40 70-50s50-30 90-60" {...accent} />
      <path d="M20 140h160M20 20v120" {...s} opacity={0.4} />
      <path d="M150 34a18 18 0 1 1-6 26" {...s} />
      <path d="M144 60l-2-10 10 2" {...s} />
    </g>,
  ];
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full text-[var(--ink)]" aria-hidden>
      {arts[i]}
    </svg>
  );
}

function StepCard({ i, active = true }: { i: number; active?: boolean }) {
  const step = STEPS[i];
  return (
    <article
      className={`flex h-full flex-col justify-between rounded-[26px] border bg-white p-6 transition-all duration-500 sm:p-8 ${
        active ? "border-[var(--line-strong)] shadow-[0_30px_80px_-50px_rgba(11,11,12,0.5)]" : "border-[var(--line)] opacity-55"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="mono text-[12px] text-[var(--muted)]">Stage {String(i + 1).padStart(2, "0")}</span>
        <span className="font-[family-name:var(--font-display)] text-[4.5rem] font-semibold leading-none tracking-tighter text-black/[0.06] sm:text-[6rem]">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="my-6 h-[130px] sm:h-[160px]">
        <StepArt i={i} />
      </div>
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-[2rem] font-semibold tracking-tight sm:text-[2.4rem]">
          {step.t}
        </h3>
        <p className="mt-3 max-w-sm text-[1.02rem] leading-relaxed text-[var(--muted)]">{step.d}</p>
      </div>
    </article>
  );
}

function Rail({ progress }: { progress: number }) {
  return (
    <div className="relative" aria-hidden>
      <div className="h-px w-full bg-[var(--line-strong)]" />
      <div className="absolute left-0 top-0 h-px bg-[var(--signal)] transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
      <div className="absolute inset-x-0 -top-[5px] flex justify-between">
        {STEPS.map((s, i) => {
          const reached = progress >= i / (STEPS.length - 1) - 0.001;
          return (
            <span key={s.t} className="flex flex-col items-center gap-3">
              <span
                className={`h-[11px] w-[11px] rounded-full border-2 transition-colors duration-300 ${
                  reached ? "border-[var(--signal)] bg-[var(--signal)]" : "border-[var(--line-strong)] bg-[var(--paper)]"
                }`}
              />
              <span className={`mono hidden text-[11px] sm:block ${reached ? "text-ink" : "text-[var(--muted)]"}`}>{s.t}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** Desktop: pinned section, vertical scroll drives the horizontal journey. */
function PinnedJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(v));
  const current = Math.round(p * (STEPS.length - 1));

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${STEPS.length * 58}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        <div className="container-x">
          <Rail progress={p} />
        </div>
        <div className="mt-16">
          <motion.div
            ref={track}
            className="flex w-max gap-6"
            style={{
              x,
              paddingLeft: "max(40px, calc((100vw - 1320px) / 2 + 40px))",
              paddingRight: "max(40px, calc((100vw - 1320px) / 2 + 40px))",
            }}
          >
            {STEPS.map((_, i) => (
              <div key={i} className="h-[520px] w-[min(520px,42vw)] shrink-0">
                <StepCard i={i} active={i === current} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Mobile/tablet (and reduced motion): native swipe with snap points. */
function SwipeJourney({ always = false }: { always?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  return (
    <div className={always ? "" : "lg:hidden"}>
      <div className="container-x mb-10">
        <Rail progress={p} />
      </div>
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          setP(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 md:scroll-px-10 md:px-10"
        tabIndex={0}
        aria-label="Our approach, seven stages. Scroll horizontally."
      >
        {STEPS.map((_, i) => (
          <div key={i} className="w-[84%] max-w-[420px] shrink-0 snap-start">
            <StepCard i={i} />
          </div>
        ))}
      </div>
      <p className="mono container-x mt-4 text-[11px] text-[var(--muted)]">Swipe to follow the journey →</p>
    </div>
  );
}

export function Approach() {
  const reduce = useReduced();
  return (
    <section id="approach" aria-labelledby="approach-title" className="relative bg-[var(--paper)] pt-[clamp(88px,11vw,160px)] pb-[clamp(60px,8vw,120px)]">
      <div className="container-x">
        <SectionHead
          id="approach-title"
          index="03"
          label="Our approach"
          align="split"
          title="We start with the business, not the technology."
          lede={
            <p>
              Technology decisions come last. Every engagement moves through the same seven stages — from
              understanding how you work today to continuously improving what we build together.
            </p>
          }
        />
      </div>
      <div className={reduce ? "mt-14 lg:mt-20" : "mt-12 lg:mt-0"}>
        {reduce ? (
          <SwipeJourney always />
        ) : (
          <>
            <PinnedJourney />
            <SwipeJourney />
          </>
        )}
      </div>
    </section>
  );
}
