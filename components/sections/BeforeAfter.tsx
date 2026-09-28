"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useReduced } from "@/lib/useReduced";
import { SectionHead } from "@/components/ui/SectionHead";
import { Glyph } from "@/components/ui/Glyph";

type Tile = { label: string; al?: string; b: [number, number, number]; a: [number, number] };

const AREAS: {
  name: string;
  before: string;
  after: string;
  hub: string;
  mode: "hub" | "flow";
  tiles: Tile[];
}[] = [
  {
    name: "Customer Management",
    before: "Customer information is distributed across different tools and teams.",
    after: "Customer information, interactions and history are connected through a unified system.",
    hub: "Unified customer record",
    mode: "hub",
    tiles: [
      { label: "Spreadsheets", al: "Contact details", b: [8, 12, -6], a: [14, 18] },
      { label: "Email threads", al: "Interactions", b: [62, 8, 5], a: [86, 18] },
      { label: "Call notes", al: "Conversations", b: [30, 58, 4], a: [14, 82] },
      { label: "Chat messages", al: "Order history", b: [74, 64, -4], a: [86, 82] },
      { label: "Billing tool", al: "Invoices", b: [44, 30, -2], a: [50, 90] },
    ],
  },
  {
    name: "Operations",
    before: "Employees repeat manual tasks across disconnected tools.",
    after: "Automated workflows manage repetitive processes.",
    hub: "Automated workflow",
    mode: "flow",
    tiles: [
      { label: "Manual entry", al: "Auto-captured data", b: [10, 60, 5], a: [14, 36] },
      { label: "Copy & paste", al: "Synced records", b: [58, 14, -5], a: [32, 64] },
      { label: "Status calls", al: "Live status", b: [34, 22, 3], a: [50, 36] },
      { label: "Email approvals", al: "One-click approvals", b: [70, 66, -3], a: [68, 64] },
      { label: "Re-keying data", al: "Notifications", b: [16, 20, -4], a: [86, 36] },
    ],
  },
  {
    name: "Business Reporting",
    before: "Reports are manually prepared from scattered information.",
    after: "Dashboards provide real-time business visibility.",
    hub: "Live dashboard",
    mode: "hub",
    tiles: [
      { label: "CSV exports", al: "Sales data", b: [12, 64, -5], a: [14, 18] },
      { label: "Merged sheets", al: "Operations data", b: [56, 12, 4], a: [86, 18] },
      { label: "Slide decks", al: "Finance data", b: [72, 58, -3], a: [14, 82] },
      { label: "Emailed reports", al: "Customer data", b: [28, 16, 6], a: [86, 82] },
      { label: "Month-end rush", al: "Team activity", b: [44, 72, -2], a: [50, 90] },
    ],
  },
  {
    name: "Sales",
    before: "Leads and follow-ups are handled manually.",
    after: "Lead capture, qualification, assignment and follow-up are connected and trackable.",
    hub: "Connected sales pipeline",
    mode: "flow",
    tiles: [
      { label: "Capture", b: [60, 64, -4], a: [14, 36] },
      { label: "Qualify", b: [14, 18, 5], a: [32, 64] },
      { label: "Assign", b: [70, 12, -6], a: [50, 36] },
      { label: "Follow up", b: [32, 66, 3], a: [68, 64] },
      { label: "Track", b: [42, 32, -3], a: [86, 36] },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function BeforeAfter() {
  const [area, setArea] = useState(0);
  const [after, setAfter] = useState(false);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const reduce = useReduced();

  // Autoplay: show "before", transform to "after", then move to next area.
  useEffect(() => {
    if (!inView || touched || reduce) return;
    const t = setTimeout(
      () => {
        if (!after) setAfter(true);
        else {
          setAfter(false);
          setArea((a) => (a + 1) % AREAS.length);
        }
      },
      after ? 3600 : 1800,
    );
    return () => clearTimeout(t);
  }, [after, inView, touched, reduce]);

  const a = AREAS[area];

  return (
    <section aria-labelledby="ba-title" className="section-y border-t border-[var(--line)]">
      <div className="container-x">
        <SectionHead
          id="ba-title"
          index="04"
          label="Before / after"
          title="From fragmented processes to connected business systems."
          lede={<p>What changes when a business runs on connected systems. Pick an area and flip the switch.</p>}
        />

        <div ref={ref} className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12">
          {/* area selector */}
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:col-span-3 lg:mx-0 lg:flex-col lg:px-0" role="tablist" aria-label="Business areas">
            {AREAS.map((ar, i) => (
              <button
                key={ar.name}
                role="tab"
                aria-selected={i === area}
                onClick={() => {
                  setArea(i);
                  setAfter(false);
                  setTouched(true);
                }}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-left text-[0.95rem] font-medium transition-all lg:rounded-2xl lg:px-5 lg:py-4 ${
                  i === area ? "border-ink bg-ink text-white" : "border-[var(--line-strong)] text-[var(--ink-3)] hover:border-ink"
                }`}
              >
                <span className="mono mr-2 text-[11px] opacity-60">0{i + 1}</span>
                {ar.name}
              </button>
            ))}
          </div>

          <div className="lg:col-span-9">
            {/* stage */}
            <div className="relative overflow-hidden rounded-[26px] border border-[var(--line)] bg-white">
              <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3">
                <span className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">{a.name}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={after}
                  aria-label="Show after transformation"
                  onClick={() => {
                    setAfter((v) => !v);
                    setTouched(true);
                  }}
                  className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.12em]"
                >
                  <span className={after ? "text-[var(--muted)]" : "text-ink"}>Before</span>
                  <span className={`relative h-6 w-11 rounded-full transition-colors ${after ? "bg-[var(--signal)]" : "bg-black/15"}`}>
                    <motion.span
                      className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
                      animate={{ left: after ? 22 : 2 }}
                      transition={{ duration: 0.35, ease }}
                    />
                  </span>
                  <span className={after ? "text-ink" : "text-[var(--muted)]"}>After</span>
                </button>
              </div>

              <div className={`relative h-[340px] transition-colors duration-700 sm:h-[380px] ${after ? "bg-white" : "bg-[#faf7f4]"}`}>
                <div className={`grid-paper pointer-events-none absolute inset-0 transition-opacity duration-700 ${after ? "opacity-100" : "opacity-0"}`} aria-hidden />

                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                  {after &&
                    (a.mode === "hub"
                      ? a.tiles.map((t, i) => (
                          <motion.line
                            key={`${area}-${i}`}
                            x1={t.a[0]}
                            y1={t.a[1]}
                            x2={50}
                            y2={50}
                            stroke="var(--signal)"
                            strokeWidth="0.3"
                            vectorEffect="non-scaling-stroke"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.35 + i * 0.05, duration: 0.6 }}
                          />
                        ))
                      : (
                          <motion.polyline
                            key={`flow-${area}`}
                            points={a.tiles.map((t) => t.a.join(",")).join(" ")}
                            fill="none"
                            stroke="var(--signal)"
                            strokeWidth="0.3"
                            vectorEffect="non-scaling-stroke"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.35, duration: 0.8 }}
                          />
                        ))}
                </svg>

                {/* hub */}
                <AnimatePresence>
                  {after && a.mode === "hub" && (
                    <motion.div
                      key={`hub-${area}`}
                      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: 0.25, duration: 0.5, ease }}
                    >
                      <div className="flex items-center gap-2.5 rounded-2xl bg-ink px-4 py-3 text-white shadow-xl sm:px-5 sm:py-4">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--signal)]">
                          <Glyph name={area === 2 ? "intelligence" : "customer"} size={16} />
                        </span>
                        <span className="text-[12.5px] font-semibold sm:text-[14px]">{a.hub}</span>
                      </div>
                    </motion.div>
                  )}
                  {after && a.mode === "flow" && (
                    <motion.p
                      key={`flowlabel-${area}`}
                      className="mono absolute left-1/2 top-[10%] -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[10.5px] uppercase tracking-[0.14em] text-white"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {a.hub}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* tiles */}
                {a.tiles.map((t, i) => {
                  const [bx, by, rot] = t.b;
                  const [ax, ay] = t.a;
                  const flow = a.mode === "flow";
                  return (
                    <motion.div
                      key={`${area}-${t.label}`}
                      className="absolute z-[5]"
                      initial={false}
                      animate={
                        after
                          ? { left: `${ax}%`, top: `${ay}%`, rotate: 0, x: "-50%", y: "-50%" }
                          : { left: `${bx + 8}%`, top: `${by + 6}%`, rotate: rot, x: "-50%", y: "-50%" }
                      }
                      transition={{ duration: 0.8, delay: i * 0.04, ease }}
                    >
                      <div
                        className={`flex items-center gap-2 whitespace-nowrap rounded-xl border px-2.5 py-2 text-[11px] font-medium shadow-sm transition-colors duration-500 sm:px-3.5 sm:py-2.5 sm:text-[13px] ${
                          after
                            ? "border-[var(--line-strong)] bg-white text-ink"
                            : "border-dashed border-black/20 bg-[#fffdfb] text-[var(--muted)]"
                        }`}
                      >
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-md text-[10px] transition-colors duration-500 ${
                            after ? "bg-[var(--signal)] text-white" : "bg-black/[0.06]"
                          }`}
                        >
                          {after ? <Glyph name="check" size={12} /> : flow ? i + 1 : "!"}
                        </span>
                        {after ? (t.al ?? t.label) : t.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* narrative */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2" aria-live="polite">
              <div className={`rounded-2xl border p-5 transition-all duration-500 ${after ? "border-[var(--line)] opacity-50" : "border-[var(--line-strong)] bg-white"}`}>
                <p className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Before</p>
                <p className="mt-2 text-[1.02rem] leading-relaxed">{a.before}</p>
              </div>
              <div className={`rounded-2xl border p-5 transition-all duration-500 ${after ? "border-ink bg-ink text-white" : "border-[var(--line)] opacity-50"}`}>
                <p className={`mono text-[11px] uppercase tracking-[0.14em] ${after ? "text-[var(--signal)]" : "text-[var(--muted)]"}`}>After</p>
                <p className="mt-2 text-[1.02rem] leading-relaxed">{a.after}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
