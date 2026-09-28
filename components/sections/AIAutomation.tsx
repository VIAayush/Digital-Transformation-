"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Glyph } from "@/components/ui/Glyph";
import { Arrow } from "@/components/ui/Arrow";
import { useReduced } from "@/lib/useReduced";

const MODULES = [
  {
    t: "AI for Operations",
    short: "Operations",
    d: "Automate repetitive workflows.",
    input: ["Incoming requests", "Documents", "Status updates"],
    step: "Reads, classifies and routes each item",
    output: "Task created, owner assigned and status updated in the system — no manual triage.",
  },
  {
    t: "AI for Sales",
    short: "Sales",
    d: "Summarize prospects, assist teams and personalize communication.",
    input: ["Prospect profile", "CRM history", "Past conversations"],
    step: "Drafts an account brief and a tailored first message",
    output: "A ready-to-review brief and message for the rep, grounded in what the CRM already knows.",
  },
  {
    t: "AI for Customers",
    short: "Customers",
    d: "Build intelligent assistants and personalized experiences.",
    input: ["Website questions", "Chat messages", "Order lookups"],
    step: "Answers from your own knowledge and data",
    output: "Common questions resolved instantly; everything else handed to a person with full context.",
  },
  {
    t: "AI for Data",
    short: "Data",
    d: "Analyze business information and surface insights.",
    input: ["Sales data", "Operations data", "Finance data"],
    step: "Finds patterns, trends and exceptions",
    output: "Plain-language insights next to the dashboards your team already uses.",
  },
  {
    t: "AI for Decision-Making",
    short: "Decisions",
    d: "Use intelligence to support faster and more informed business decisions.",
    input: ["Live metrics", "Pipeline status", "Historical trends"],
    step: "Compares options and flags risks",
    output: "Clear options with the reasoning behind them, so leaders decide faster and with more confidence.",
  },
];

function Typed({ text, run }: { text: string; run: boolean }) {
  const [n, setN] = useState(run ? 0 : text.length);
  useEffect(() => {
    if (!run) {
      setN(text.length);
      return;
    }
    setN(0);
    const t = setInterval(() => setN((v) => (v >= text.length ? v : v + 2)), 22);
    return () => clearInterval(t);
  }, [text, run]);
  return (
    <span>
      {text.slice(0, n)}
      {n < text.length && <span className="caret text-[var(--signal)]">▍</span>}
    </span>
  );
}

export function AIAutomation() {
  const [i, setI] = useState(0);
  const reduce = useReduced();
  const m = MODULES[i];

  return (
    <section id="ai" aria-labelledby="ai-title" className="section-y bg-[var(--paper-2)]">
      <div className="container-x">
        <SectionHead
          id="ai-title"
          index="07"
          label="AI & automation"
          align="split"
          title="AI should work inside the business."
          lede={
            <p>
              Not as a separate experiment, but as a layer inside the systems you already run — reading from your
              data, acting through your workflows and keeping people in control.
            </p>
          }
        />

        <div className="mt-14 lg:mt-20">
          <div role="tablist" aria-label="AI use cases" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
            {MODULES.map((mod, k) => (
              <button
                key={mod.t}
                role="tab"
                aria-selected={k === i}
                aria-controls="ai-panel"
                onClick={() => setI(k)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-[0.93rem] font-medium transition-all ${
                  k === i ? "border-ink bg-ink text-white" : "border-[var(--line-strong)] bg-transparent hover:border-ink"
                }`}
              >
                {mod.t}
              </button>
            ))}
          </div>

          <div id="ai-panel" role="tabpanel" className="dark mt-6 overflow-hidden rounded-[26px] border border-white/10">
            <div className="grid lg:grid-cols-[1fr_auto_1.1fr_auto_1.2fr]">
              {/* input */}
              <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0">
                <p className="mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--muted-dark)]">01 · From your systems</p>
                <AnimatePresence mode="wait">
                  <motion.ul key={i} className="mt-5 space-y-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {m.input.map((x, k) => (
                      <motion.li
                        key={x}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: k * 0.08 }}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-[0.93rem]"
                      >
                        <Glyph name="data" size={15} className="text-white/50" />
                        {x}
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>

              <div className="hidden items-center lg:flex" aria-hidden>
                <svg width="56" height="20" viewBox="0 0 56 20">
                  <path d="M0 10h50" stroke="rgba(255,255,255,.35)" className="flow-line" />
                  <path d="M46 5l6 5-6 5" stroke="rgba(255,255,255,.5)" fill="none" />
                </svg>
              </div>

              {/* AI layer */}
              <div className="relative border-b border-white/10 p-6 sm:p-8 lg:border-b-0">
                <p className="mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--muted-dark)]">02 · AI layer</p>
                <div className="relative mt-5 grid place-items-center">
                  <div className="relative grid h-40 w-40 place-items-center">
                    {!reduce &&
                      [0, 1, 2].map((r) => (
                        <motion.span
                          key={r}
                          className="absolute inset-0 rounded-full border border-[var(--signal)]/40"
                          animate={{ scale: [0.6, 1.15], opacity: [0.7, 0] }}
                          transition={{ duration: 2.6, repeat: Infinity, delay: r * 0.85, ease: "easeOut" }}
                        />
                      ))}
                    <span className="grid h-20 w-20 place-items-center rounded-2xl bg-[var(--signal)] text-white shadow-[0_0_60px_rgba(255,79,31,.45)]">
                      <Glyph name="ai" size={30} />
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-center text-[0.95rem] text-white/85"
                    >
                      {m.step}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="hidden items-center lg:flex" aria-hidden>
                <svg width="56" height="20" viewBox="0 0 56 20">
                  <path d="M0 10h50" stroke="rgba(255,79,31,.7)" className="flow-line" />
                  <path d="M46 5l6 5-6 5" stroke="var(--signal)" fill="none" />
                </svg>
              </div>

              {/* output */}
              <div className="p-6 sm:p-8">
                <p className="mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--muted-dark)]">03 · Back into the workflow</p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="mono mb-3 text-[10.5px] text-[var(--signal)]">{m.short.toLowerCase()} · result</p>
                  <p className="min-h-[5.5em] text-[1.05rem] leading-relaxed" aria-live="polite">
                    <Typed text={m.output} run={!reduce} />
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-[12.5px] text-[var(--muted-dark)]">People stay in control</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11.5px] font-semibold text-ink">
                      <Glyph name="check" size={12} /> Review
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="font-[family-name:var(--font-display)] text-[1.2rem] font-medium tracking-tight">{m.t}</p>
              <p className="text-[var(--muted-dark)]">{m.d}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[var(--line-strong)] bg-[var(--paper)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="max-w-3xl text-[0.98rem] leading-relaxed">
              <span className="mono mr-2 text-[11px] uppercase tracking-[0.14em] text-[var(--signal)]">In production</span>
              VILMS, our learning platform, uses AI to draft marks on written answers against a rubric — and a faculty
              member reviews every draft before results are published.
            </p>
            <a href="#work" className="inline-flex shrink-0 items-center gap-2 text-[0.93rem] font-semibold underline-offset-4 hover:underline">
              See the product <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
