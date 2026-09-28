"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { r2, useReduced } from "@/lib/useReduced";
import { SectionHead } from "@/components/ui/SectionHead";
import { Glyph } from "@/components/ui/Glyph";

const NODES = [
  { key: "customer", label: "Customers", text: "Every system starts with the people you serve: their journey, their needs and every interaction they have with you." },
  { key: "experience", label: "Digital Experience", text: "Websites, portals and applications where customers discover you, engage with you and transact." },
  { key: "sales", label: "Sales & CRM", text: "Every enquiry, conversation and opportunity captured, assigned and tracked in one place." },
  { key: "operations", label: "Operations", text: "Orders, fulfilment, approvals and teams running on connected digital workflows." },
  { key: "automation", label: "Automation", text: "Connect repetitive workflows and reduce unnecessary manual work." },
  { key: "data", label: "Data", text: "Bring fragmented information together for better visibility." },
  { key: "ai", label: "AI & Intelligence", text: "Turn business information into intelligent assistance and decisions." },
  { key: "growth", label: "Business Growth", text: "A business that learns from its own systems — and scales with less friction." },
];

// Cross-links beyond the main loop: what else each system talks to.
const LINKS: [number, number][] = [
  [2, 5],
  [3, 5],
  [6, 0],
  [6, 2],
  [4, 2],
  [7, 0],
  [4, 3],
];

const W = 1000;
const H = 620;
const CX = 500;
const CY = 310;
const RX = 400;
const RY = 230;
const ORBIT = `M${CX},${CY - RY} A${RX},${RY} 0 0,1 ${CX + RX},${CY} A${RX},${RY} 0 0,1 ${CX},${CY + RY} A${RX},${RY} 0 0,1 ${CX - RX},${CY} A${RX},${RY} 0 0,1 ${CX},${CY - RY}`;

const pos = NODES.map((_, i) => {
  const a = ((-90 + i * 45) * Math.PI) / 180;
  return { x: r2(CX + RX * Math.cos(a)), y: r2(CY + RY * Math.sin(a)) };
});

function curve(a: number, b: number) {
  const p = pos[a];
  const q = pos[b];
  const mx = (p.x + q.x) / 2;
  const my = (p.y + q.y) / 2;
  const cx = r2(mx + (CX - mx) * 0.45);
  const cy = r2(my + (CY - my) * 0.45);
  return `M${p.x},${p.y} Q${cx},${cy} ${q.x},${q.y}`;
}

export function Ecosystem() {
  const [active, setActive] = useState(4);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const reduce = useReduced();

  useEffect(() => {
    if (!inView || touched || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % NODES.length), 3200);
    return () => clearInterval(t);
  }, [inView, touched, reduce]);

  const n = NODES.length;
  const neighbours = new Set<number>([(active + 1) % n, (active - 1 + n) % n]);
  LINKS.forEach(([a, b]) => {
    if (a === active) neighbours.add(b);
    if (b === active) neighbours.add(a);
  });

  const select = (i: number) => {
    setActive(i);
    setTouched(true);
  };

  return (
    <section id="ecosystem" aria-labelledby="eco-title" className="dark section-y relative overflow-hidden">
      <div className="grid-paper-dark pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" aria-hidden />
      <div className="container-x relative">
        <SectionHead
          id="eco-title"
          index="02"
          label="Connected ecosystem"
          align="split"
          title="Your business should work as one connected system."
          lede={
            <p>
              Most businesses run on tools that don&apos;t talk to each other. We design the connections, so every
              customer, process and piece of data moves through one system. Select any part to see its role.
            </p>
          }
        />

        <div ref={ref} className="relative mt-14 lg:mt-20">
          <div className="relative mx-auto hidden aspect-[1000/620] w-full max-w-[1000px] md:block">
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <radialGradient id="eco-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,79,31,0.18)" />
                  <stop offset="100%" stopColor="rgba(255,79,31,0)" />
                </radialGradient>
              </defs>
              <ellipse cx={CX} cy={CY} rx={220} ry={150} fill="url(#eco-glow)" />
              <path d={ORBIT} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
              <path d={ORBIT} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" className="flow-line" />
              {LINKS.map(([a, b]) => {
                const on = a === active || b === active;
                return (
                  <path
                    key={`${a}-${b}`}
                    d={curve(a, b)}
                    fill="none"
                    stroke={on ? "var(--signal)" : "rgba(255,255,255,0.08)"}
                    strokeWidth={on ? 1.8 : 1}
                    className={on ? "flow-line" : ""}
                    style={{ transition: "stroke .5s" }}
                  />
                );
              })}
              {!reduce &&
                [0, 1.6, 3.2, 4.8].map((b) => (
                  <circle key={b} r="3.5" fill="#fff">
                    <animateMotion dur="6.4s" repeatCount="indefinite" begin={`${b}s`} path={ORBIT} />
                  </circle>
                ))}
              {pos.map((p, i) =>
                i === active && !reduce ? (
                  <circle key={`ring-${i}`} cx={p.x} cy={p.y} r="34" fill="none" stroke="var(--signal)" className="pulse-ring" />
                ) : null,
              )}
            </svg>

            {/* centre panel (desktop) */}
            <div className="absolute left-1/2 top-1/2 hidden w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-[radial-gradient(ellipse_at_center,rgba(11,11,12,0.92)_40%,rgba(11,11,12,0)_75%)] px-6 py-8 text-center md:block" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--signal)]">
                    0{active + 1} · {NODES[active].label}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.1rem,1.9vw,1.6rem)] font-medium leading-snug tracking-tight">
                    {NODES[active].text}
                  </p>
                  <p className="mono mt-4 text-[10.5px] text-[var(--muted-dark)]">
                    Connected to {[...neighbours].map((j) => NODES[j].label).join(" · ")}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {NODES.map((node, i) => {
              const on = i === active;
              const near = neighbours.has(i);
              return (
                <button
                  key={node.key}
                  type="button"
                  onClick={() => select(i)}
                  onMouseEnter={() => select(i)}
                  aria-pressed={on}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${r2((pos[i].x / W) * 100)}%`, top: `${r2((pos[i].y / H) * 100)}%` }}
                >
                  <span
                    className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 transition-all duration-500 sm:gap-2.5 sm:py-2 sm:pl-2 sm:pr-4 ${
                      on
                        ? "border-[var(--signal)] bg-[var(--signal)] text-white shadow-[0_0_40px_rgba(255,79,31,0.45)]"
                        : near
                          ? "border-white/40 bg-[var(--ink-2)] text-white"
                          : "border-white/15 bg-[var(--ink)] text-white/60 hover:text-white"
                    }`}
                  >
                    <span className={`grid h-6 w-6 place-items-center rounded-full sm:h-8 sm:w-8 ${on ? "bg-white/20" : "bg-white/10"}`}>
                      <Glyph name={node.key} size={15} />
                    </span>
                    <span className="whitespace-nowrap text-[10px] font-medium sm:text-[13.5px]">{node.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* mobile: vertical chain with inline explanation */}
          <div className="relative md:hidden">
            <span className="absolute bottom-6 left-[21px] top-6 w-px bg-white/15" aria-hidden />
            <ol>
            {NODES.map((node, i) => {
              const on = i === active;
              return (
                <li key={node.key} className="relative">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-expanded={on}
                    className="flex w-full items-center gap-4 py-2.5 text-left"
                  >
                    <span
                      className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors ${
                        on ? "border-[var(--signal)] bg-[var(--signal)] text-white" : "border-white/15 bg-[var(--ink)] text-white/70"
                      }`}
                    >
                      <Glyph name={node.key} size={17} />
                    </span>
                    <span className={`text-[1.05rem] font-medium ${on ? "text-white" : "text-white/60"}`}>{node.label}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-[60px] text-[0.95rem] leading-relaxed text-[var(--muted-dark)]"
                      >
                        <span className="block pb-3">{node.text}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
