"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHead } from "@/components/ui/SectionHead";

const VALUES = [
  { t: "Business-First", d: "We start with the business challenge.", more: "Every engagement begins with how you operate today — the processes, the people and the problem worth solving." },
  { t: "Built Around Your Business", d: "Solutions adapt to your processes.", more: "Software is shaped around your workflows, so teams don't have to bend the business to fit a tool." },
  { t: "Connected", d: "Applications, data, people and processes work together.", more: "Systems are designed to share information from day one, not stitched together later." },
  { t: "Intelligent", d: "Automation, data and AI improve the system.", more: "What we build gathers data, automates what's repetitive and applies AI where it genuinely helps." },
  { t: "Scalable", d: "Systems evolve as your business grows.", more: "Architecture that can take on new teams, products, markets and volume without starting over." },
];

function Mark({ i, on }: { i: number; on: boolean }) {
  const c = on ? "var(--signal)" : "currentColor";
  const common = { fill: "none", stroke: c, strokeWidth: 1.6, strokeLinecap: "round" as const, style: { transition: "all .5s cubic-bezier(.22,1,.36,1)" } };
  const marks = [
    <g key="0">
      <circle cx="32" cy="32" r="20" {...common} />
      <circle cx="32" cy="32" r={on ? 11 : 8} {...common} />
      <circle cx="32" cy="32" r="2.5" fill={c} />
    </g>,
    <g key="1">
      <rect x="12" y="12" width="18" height="18" rx="3" {...common} />
      <rect x={on ? 34 : 38} y={on ? 12 : 8} width="18" height="18" rx="3" {...common} />
      <rect x="12" y={on ? 34 : 38} width="18" height="18" rx="3" {...common} />
      <rect x="34" y="34" width="18" height="18" rx="3" {...common} />
    </g>,
    <g key="2">
      {[
        [14, 18],
        [50, 14],
        [32, 34],
        [16, 50],
        [50, 48],
      ].map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r="4" {...common} />
      ))}
      <path d="M14 18L32 34L50 14M32 34L16 50M32 34L50 48" {...common} strokeDasharray={on ? "0" : "3 4"} />
    </g>,
    <g key="3">
      <path d="M32 10l4.5 12.5L49 27l-12.5 4.5L32 44l-4.5-12.5L15 27l12.5-4.5z" {...common} transform={on ? "rotate(45 32 27)" : ""} />
      <circle cx="48" cy="48" r="3" {...common} />
    </g>,
    <g key="4">
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={10 + k * 12} y={on ? 50 - (k + 1) * 10 : 42 - k * 3} width="8" height={on ? (k + 1) * 10 : 8 + k * 3} rx="2" {...common} />
      ))}
    </g>,
  ];
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 sm:h-16 sm:w-16" aria-hidden>
      {marks[i]}
    </svg>
  );
}

export function WhyUs() {
  const [open, setOpen] = useState(0);
  return (
    <section id="why" aria-labelledby="why-title" className="section-y">
      <div className="container-x">
        <SectionHead
          id="why-title"
          index="10"
          label="Why Viral Inbound"
          align="split"
          title="Technology should solve business problems."
          lede={<p>Five principles shape everything we design, build and run.</p>}
        />

        <ul className="mt-14 border-t border-[var(--line-strong)] lg:mt-20">
          {VALUES.map((v, i) => {
            const on = i === open;
            return (
              <li key={v.t} className="border-b border-[var(--line-strong)]">
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => setOpen(i)}
                  onMouseEnter={() => setOpen(i)}
                  className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 text-left sm:gap-8 sm:py-8"
                >
                  <span className="mono w-8 text-[12px] text-[var(--muted)]">0{i + 1}</span>
                  <span>
                    <span
                      className={`block font-[family-name:var(--font-display)] text-[clamp(1.7rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] transition-colors duration-500 ${
                        on ? "text-ink" : "text-black/30"
                      }`}
                    >
                      {v.t}
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
                          <span className="grid gap-2 pt-4 sm:grid-cols-2 sm:gap-10">
                            <span className="text-[1.1rem] font-medium">{v.d}</span>
                            <span className="leading-relaxed text-[var(--muted)]">{v.more}</span>
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className={`transition-colors duration-500 ${on ? "text-ink" : "text-black/25"}`}>
                    <Mark i={i} on={on} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
