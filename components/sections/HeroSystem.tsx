"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useReduced } from "@/lib/useReduced";
import { Glyph } from "@/components/ui/Glyph";

// Serpentine layout on a 600×480 canvas.
const NODES = [
  { key: "customer", label: "Customer", x: 100, y: 80, at: 0, event: "Enquiry received from the website" },
  { key: "experience", label: "Digital Experience", x: 300, y: 80, at: 200, event: "Visitor journey converted to a quote request" },
  { key: "sales", label: "Sales & CRM", x: 500, y: 80, at: 400, event: "Lead qualified and assigned to an owner" },
  { key: "operations", label: "Operations", x: 500, y: 240, at: 560, event: "Order created, fulfilment queued" },
  { key: "automation", label: "Automation", x: 300, y: 240, at: 760, event: "Follow-up and invoice workflows triggered" },
  { key: "data", label: "Data", x: 100, y: 240, at: 960, event: "Records synced into one source of truth" },
  { key: "ai", label: "AI", x: 100, y: 400, at: 1120, event: "Account summary drafted for the team" },
  { key: "intelligence", label: "Business Intelligence", x: 300, y: 400, at: 1320, event: "Dashboards refreshed with live numbers" },
  { key: "growth", label: "Growth", x: 500, y: 400, at: 1520, event: "Next opportunity surfaced for action" },
];
const TOTAL = 1520;
const PATH = "M100 80 H500 V240 H100 V400 H500";

export function HeroSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReduced();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [log, setLog] = useState<{ id: number; node: number }[]>([]);
  const seq = useRef(0);

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % NODES.length), 1700);
    return () => clearInterval(t);
  }, [inView, paused, reduce]);

  useEffect(() => {
    setLog((l) => l[0]?.node === active ? l : [{ id: ++seq.current, node: active }, ...l].slice(0, 3));
  }, [active]);

  const progress = reduce ? 1 : NODES[active].at / TOTAL;

  return (
    <div
      ref={ref}
      className="dark relative overflow-hidden rounded-[22px] border border-white/10 shadow-[0_40px_120px_-40px_rgba(11,11,12,0.55)]"
      onMouseLeave={() => setPaused(false)}
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="mono text-[11px] text-[var(--muted-dark)]">connected-business.system</span>
        </div>
        <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--muted-dark)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--signal)] opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-[var(--signal)]" />
          </span>
          Live flow
        </span>
      </div>

      {/* canvas */}
      <div className="grid-paper-dark relative">
        <div className="relative mx-auto aspect-[600/480] w-full">
          <svg viewBox="0 0 600 480" className="absolute inset-0 h-full w-full" aria-hidden>
            <path d={PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <path d={PATH} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" className="flow-line" />
            <path
              d={PATH}
              fill="none"
              stroke="var(--signal)"
              strokeWidth="2"
              pathLength={1}
              strokeDasharray="1"
              style={{ strokeDashoffset: 1 - progress, transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)" }}
            />
            {!reduce &&
              [0, 2, 4].map((b) => (
                <circle key={b} r="3" fill="#fff">
                  <animateMotion dur="6s" repeatCount="indefinite" begin={`${b}s`} path={PATH} />
                </circle>
              ))}
          </svg>

          {NODES.map((n, i) => {
            const on = i === active;
            const done = reduce || NODES[i].at <= NODES[active].at;
            return (
              <button
                key={n.key}
                type="button"
                onMouseEnter={() => {
                  setPaused(true);
                  setActive(i);
                }}
                onFocus={() => {
                  setPaused(true);
                  setActive(i);
                }}
                onClick={() => setActive(i)}
                aria-label={`${n.label}: ${n.event}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{ left: `${(n.x / 600) * 100}%`, top: `${(n.y / 480) * 100}%` }}
              >
                <span
                  className={`relative flex w-[76px] flex-col items-center gap-1.5 rounded-xl border px-1.5 py-2 text-center transition-all duration-500 sm:w-[112px] sm:gap-2 sm:px-2 sm:py-3 ${
                    on
                      ? "scale-[1.06] border-[var(--signal)] bg-[#1d1310]"
                      : done
                        ? "border-white/20 bg-[var(--ink-2)]"
                        : "border-white/10 bg-[var(--ink)]"
                  }`}
                >
                  {on && !reduce && (
                    <span className="pointer-events-none absolute inset-0 rounded-xl ring-4 ring-[var(--signal)]/15" />
                  )}
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-lg transition-colors duration-500 sm:h-8 sm:w-8 ${
                      on ? "bg-[var(--signal)] text-white" : done ? "bg-white/10 text-white" : "bg-white/5 text-white/50"
                    }`}
                  >
                    <Glyph name={n.key} size={16} />
                  </span>
                  <span
                    className={`text-[9.5px] font-medium leading-tight sm:text-[12px] ${on || done ? "text-white" : "text-white/55"}`}
                  >
                    {n.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* event console */}
      <div className="border-t border-white/10 px-4 py-3 sm:px-5" aria-live="polite">
        <ul className="mono space-y-1.5 text-[10.5px] sm:text-[11.5px]">
          <AnimatePresence initial={false} mode="popLayout">
            {log.map((entry, idx) => (
              <motion.li
                key={entry.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: idx === 0 ? 1 : 0.4 - idx * 0.1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 truncate"
              >
                <span className={idx === 0 ? "text-[var(--signal)]" : "text-white/40"}>
                  {String(entry.node + 1).padStart(2, "0")}
                </span>
                <span className="text-white/50">{NODES[entry.node].label.toLowerCase()}</span>
                <span className="truncate text-white/90">{NODES[entry.node].event}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
