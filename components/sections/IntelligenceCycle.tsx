"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { r2, useReduced } from "@/lib/useReduced";

const STAGES = [
  { t: "Digitize", line: "Digital transformation does not stop at digitization.", sub: "Manual processes become digital workflows. That is the starting line, not the finish." },
  { t: "Connect", line: "Connected systems generate data.", sub: "When applications, teams and customers share one system, every interaction leaves a record." },
  { t: "Automate", line: "Automation removes the repetitive work.", sub: "Routine steps run on their own, consistently, while people focus on judgement." },
  { t: "Collect Data", line: "Data creates visibility.", sub: "Information that was scattered across tools becomes one reliable picture of the business." },
  { t: "Generate Intelligence", line: "Visibility enables better decisions.", sub: "Dashboards and analysis show what is working, what is slowing down and where to act." },
  { t: "Improve", line: "AI turns insight into intelligent workflows.", sub: "Recommendations, summaries and assistance feed straight back into daily operations." },
  { t: "Repeat", line: "Then the system gets better — again.", sub: "Each cycle compounds. The business becomes more connected, automated and intelligent over time." },
];

const R = 180;
const C = 2 * Math.PI * R;

function Wheel({ active, progress, reduce }: { active: number; progress: number; reduce: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg viewBox="0 0 480 480" className="absolute inset-0 h-full w-full" aria-hidden>
        <g className={reduce ? "" : "origin-center animate-[spin_60s_linear_infinite]"} style={{ transformBox: "fill-box" }}>
          {Array.from({ length: 120 }).map((_, i) => {
            const a = (i / 120) * Math.PI * 2;
            const r1 = 226;
            const rr = i % 10 === 0 ? 214 : 220;
            return (
              <line
                key={i}
                x1={r2(240 + Math.cos(a) * r1)}
                y1={r2(240 + Math.sin(a) * r1)}
                x2={r2(240 + Math.cos(a) * rr)}
                y2={r2(240 + Math.sin(a) * rr)}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
            );
          })}
        </g>
        <circle cx="240" cy="240" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <circle
          cx="240"
          cy="240"
          r={R}
          fill="none"
          stroke="var(--signal)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          transform="rotate(-90 240 240)"
          style={{ transition: "stroke-dashoffset .25s linear" }}
        />
        <circle cx="240" cy="240" r="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 6" />
        {STAGES.map((s, i) => {
          const a = (i / STAGES.length) * Math.PI * 2 - Math.PI / 2;
          const x = r2(240 + Math.cos(a) * R);
          const y = r2(240 + Math.sin(a) * R);
          const on = i === active;
          const done = i <= active;
          return (
            <g key={s.t}>
              {on && !reduce && <circle cx={x} cy={y} r="16" fill="none" stroke="var(--signal)" className="pulse-ring" />}
              <circle
                cx={x}
                cy={y}
                r={on ? 9 : 6}
                fill={done ? "var(--signal)" : "var(--ink)"}
                stroke={done ? "var(--signal)" : "rgba(255,255,255,0.35)"}
                strokeWidth="1.5"
                style={{ transition: "all .4s" }}
              />
            </g>
          );
        })}
      </svg>

      {STAGES.map((s, i) => {
        const a = (i / STAGES.length) * Math.PI * 2 - Math.PI / 2;
        const lx = r2(50 + (Math.cos(a) * (R + 36) * 100) / 480);
        const ly = r2(50 + (Math.sin(a) * (R + 36) * 100) / 480);
        const on = i === active;
        return (
          <span
            key={s.t}
            className={`mono absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[9.5px] uppercase tracking-[0.12em] transition-colors duration-300 sm:text-[11px] ${
              on ? "text-white" : i < active ? "text-white/60" : "text-white/35"
            }`}
            style={{ left: `${lx}%`, top: `${ly}%` }}
          >
            {s.t}
          </span>
        );
      })}

      <div className="absolute inset-[26%] flex flex-col items-center justify-center text-center">
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-white/40 sm:text-[11px]">
          Stage {active + 1} / {STAGES.length}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.35 }}
            className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.2rem,3.2vw,2.1rem)] font-semibold leading-tight tracking-tight"
          >
            {STAGES[active].t}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Narrative({ active }: { active: number }) {
  return (
    <div className="relative min-h-[190px]" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.1] tracking-tight">
            {STAGES[active].line}
          </p>
          <p className="lede mt-5 max-w-md">{STAGES[active].sub}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Header({ withId = true }: { withId?: boolean }) {
  return (
    <>
      <p className="eyebrow mb-6">
        <span>05</span>
        <span aria-hidden>/</span>
        <span>Intelligent business systems</span>
      </p>
      <h2 id={withId ? "cycle-title" : undefined} className="h-section max-w-xl">
        Build once. Connect everything. Make it smarter.
      </h2>
    </>
  );
}

export function IntelligenceCycle() {
  const reduce = useReduced();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(v));
  const active = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));

  if (reduce) {
    return (
      <section id="intelligence" aria-labelledby="cycle-title" className="dark section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Header />
            <ol className="mt-10 space-y-6">
              {STAGES.map((s, i) => (
                <li key={s.t} className="border-t border-white/10 pt-4">
                  <p className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--signal)]">
                    0{i + 1} {s.t}
                  </p>
                  <p className="mt-2 text-lg">{s.line}</p>
                  <p className="mt-1 text-[var(--muted-dark)]">{s.sub}</p>
                </li>
              ))}
            </ol>
          </div>
          <Wheel active={STAGES.length - 1} progress={1} reduce />
        </div>
      </section>
    );
  }

  return (
    <section id="intelligence" aria-labelledby="cycle-title" className="dark relative">
      <div className="container-x pt-24 lg:hidden">
        <Header />
      </div>
      <div ref={ref} style={{ height: `${STAGES.length * 55 + 60}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="grid-paper-dark pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_70%_50%,#000_20%,transparent_70%)]" aria-hidden />
          <div className="container-x relative grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
              <div className="hidden lg:block">
                <Header withId={false} />
              </div>
              <div className="lg:mt-12">
                <Narrative active={active} />
              </div>
              <div className="mt-8 flex gap-1.5" aria-hidden>
                {STAGES.map((s, i) => (
                  <span key={s.t} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= active ? "bg-[var(--signal)]" : "bg-white/15"}`} />
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="mx-auto max-w-[300px] sm:max-w-[420px] lg:max-w-none">
                <Wheel active={active} progress={Math.min(1, p * 1.02)} reduce={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
