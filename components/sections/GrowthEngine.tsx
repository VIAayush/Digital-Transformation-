"use client";

import { useMemo } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { r2, useReduced } from "@/lib/useReduced";

const STAGES = [
  "Target Market",
  "Prospect Intelligence",
  "Campaigns & Outreach",
  "Lead Capture",
  "Qualification",
  "CRM",
  "Sales Workflow",
  "Conversion",
  "Customer",
];

const PILLARS = [
  {
    g: "target",
    t: "Identify the right prospects",
    d: "Define the target market and build prospect intelligence, so effort goes to the accounts most likely to buy.",
    tags: ["Target market", "Prospect intelligence"],
  },
  {
    g: "mail",
    t: "Reach the right audience",
    d: "Structured campaigns and outreach across the channels your buyers actually use.",
    tags: ["Campaigns", "LinkedIn outreach", "Email"],
  },
  {
    g: "sales",
    t: "Manage and convert opportunities",
    d: "Every lead captured, qualified, assigned and followed up inside a CRM, with the pipeline visible end to end.",
    tags: ["Qualification", "CRM", "Sales pipeline", "Automation"],
  },
];

const W = 1200;
const H = 340;
const TOP_L = 30;
const BOT_L = 290;
const TOP_R = 140;
const BOT_R = 200;

const edge = (x: number, top: boolean) => {
  const t = x / W;
  return top ? TOP_L + (TOP_R - TOP_L) * t : BOT_L + (BOT_R - BOT_L) * t;
};

function Funnel() {
  const reduce = useReduced();
  // Particle lanes: start spread across the band, converge toward the right.
  const lanes = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => {
        const f = (i + 0.5) / 14;
        const y0 = r2(TOP_L + (BOT_L - TOP_L) * f);
        const y1 = r2(TOP_R + (BOT_R - TOP_R) * f);
        const dropsAt = i % 3 === 0 ? 0.52 : i % 5 === 0 ? 0.72 : 1; // some leads don't qualify
        const x1 = W * dropsAt;
        const yEnd = r2(y0 + (y1 - y0) * dropsAt);
        return { d: `M0 ${y0} C ${W * 0.35} ${y0}, ${W * 0.6} ${yEnd}, ${x1} ${yEnd}`, dur: 7 + (i % 4), begin: (i * 0.6) % 6, drop: dropsAt < 1 };
      }),
    [],
  );
  const band = `M0 ${TOP_L} L${W} ${TOP_R} L${W} ${BOT_R} L0 ${BOT_L} Z`;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
        <defs>
          <linearGradient id="band" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(11,11,12,0.03)" />
            <stop offset="100%" stopColor="rgba(255,79,31,0.14)" />
          </linearGradient>
        </defs>
        <path d={band} fill="url(#band)" stroke="rgba(11,11,12,0.12)" />
        {STAGES.map((_, i) => {
          if (i === 0) return null;
          const x = r2((i / STAGES.length) * W);
          return <line key={i} x1={x} x2={x} y1={r2(edge(x, true))} y2={r2(edge(x, false))} stroke="rgba(11,11,12,0.1)" strokeDasharray="3 5" />;
        })}
        {lanes.map((l, i) => (
          <g key={i}>
            <path d={l.d} fill="none" stroke="rgba(11,11,12,0.05)" />
            {!reduce && (
              <circle r="3.2" fill={l.drop ? "rgba(11,11,12,0.35)" : "var(--signal)"}>
                <animateMotion dur={`${l.dur}s`} begin={`${l.begin}s`} repeatCount="indefinite" path={l.d} />
                {l.drop && <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.85;1" dur={`${l.dur}s`} begin={`${l.begin}s`} repeatCount="indefinite" />}
              </circle>
            )}
          </g>
        ))}
        <circle cx={W - 8} cy={(TOP_R + BOT_R) / 2} r="7" fill="var(--signal)" />
      </svg>
      <ol className="mt-4 grid grid-cols-9 gap-2">
        {STAGES.map((s, i) => (
          <li key={s} className="text-center">
            <span className="mono block text-[10px] text-[var(--muted)]">{String(i + 1).padStart(2, "0")}</span>
            <span className={`mt-1 block text-[12.5px] font-medium leading-tight ${i === STAGES.length - 1 ? "text-[var(--signal)]" : ""}`}>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FunnelMobile() {
  return (
    <ol className="space-y-1.5">
      {STAGES.map((s, i) => {
        const w = 100 - i * 7;
        const last = i === STAGES.length - 1;
        return (
          <li key={s} className="flex justify-center">
            <Reveal delay={i * 0.04} className="w-full" y={10}>
              <div
                className={`mx-auto flex items-center justify-between rounded-xl px-4 py-3 text-[0.92rem] font-medium ${
                  last ? "bg-[var(--signal)] text-white" : i > 4 ? "bg-ink text-white" : "border border-[var(--line-strong)] bg-white"
                }`}
                style={{ width: `${w}%` }}
              >
                <span>{s}</span>
                <span className="mono text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

export function GrowthEngine() {
  return (
    <section id="growth" aria-labelledby="growth-title" className="section-y">
      <div className="container-x">
        <SectionHead
          id="growth-title"
          index="06"
          label="Business growth infrastructure"
          align="split"
          title="Build a predictable engine for business growth."
          lede={
            <p>
              We help businesses create structured, measurable systems for identifying prospects, reaching the right
              audience, managing opportunities and converting them into customers.
            </p>
          }
        />

        <Reveal className="mt-14 hidden rounded-[26px] border border-[var(--line)] bg-white p-6 md:block lg:mt-20 lg:p-10">
          <div className="mb-6 flex items-center justify-between">
            <span className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Growth system · end to end</span>
            <span className="mono flex items-center gap-4 text-[11px] text-[var(--muted)]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--signal)]" /> Qualified opportunity
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-black/35" /> Filtered out
              </span>
            </span>
          </div>
          <Funnel />
        </Reveal>

        <div className="mt-12 md:hidden">
          <FunnelMobile />
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08} className="group bg-[var(--paper)] p-7 transition-colors duration-500 hover:bg-white sm:p-9">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-white transition-colors duration-500 group-hover:bg-[var(--signal)]">
                <Glyph name={p.g} size={20} />
              </span>
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-[1.4rem] font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">{p.d}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="mono rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[10.5px] text-[var(--ink-3)]">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
