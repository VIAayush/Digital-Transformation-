"use client";

import { motion } from "motion/react";
import { Glyph } from "@/components/ui/Glyph";
import { r2 } from "@/lib/useReduced";

// Illustrative interface compositions for each capability. Sample labels only — no real client data.

const fade = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[0_30px_80px_-40px_rgba(11,11,12,0.35)]">
      <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-black/10" />
        <span className="h-2 w-2 rounded-full bg-black/10" />
        <span className="h-2 w-2 rounded-full bg-black/10" />
        <span className="mono ml-2 text-[10.5px] text-[var(--muted)]">{title}</span>
      </div>
      <div className="relative flex-1 p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Experience() {
  return (
    <Frame title="portal.yourbusiness.com">
      <div className="grid h-full grid-cols-5 gap-3">
        <motion.div {...fade(0)} className="col-span-3 flex flex-col justify-between rounded-xl bg-[var(--ink)] p-4 text-white">
          <div className="space-y-2">
            <div className="h-2 w-16 rounded bg-white/30" />
            <div className="h-4 w-4/5 rounded bg-white/90" />
            <div className="h-4 w-3/5 rounded bg-white/90" />
          </div>
          <div className="flex gap-2">
            <div className="h-7 w-24 rounded-full bg-[var(--signal)]" />
            <div className="h-7 w-20 rounded-full border border-white/30" />
          </div>
        </motion.div>
        <motion.div {...fade(1)} className="col-span-2 space-y-2 rounded-xl border border-[var(--line)] p-3">
          <p className="mono text-[10px] text-[var(--muted)]">Customer login</p>
          <div className="h-7 rounded-md border border-[var(--line)] bg-[var(--paper)]" />
          <div className="h-7 rounded-md border border-[var(--line)] bg-[var(--paper)]" />
          <div className="h-7 rounded-md bg-[var(--ink)]" />
        </motion.div>
        {["Orders", "Documents", "Support"].map((t, i) => (
          <motion.div
            key={t}
            {...fade(i + 2)}
            className={`${i === 2 ? "col-span-1" : "col-span-2"} rounded-xl border border-[var(--line)] p-3`}
          >
            <p className="text-[11px] font-semibold">{t}</p>
            <div className="mt-2 h-1.5 w-3/4 rounded bg-black/10" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded bg-black/10" />
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function Software() {
  const rows = [
    ["Requirement", "Quotation sent", "bg-amber-100 text-amber-800"],
    ["Order", "In fulfilment", "bg-sky-100 text-sky-800"],
    ["Invoice", "Awaiting payment", "bg-orange-100 text-orange-800"],
    ["Payment", "Received", "bg-emerald-100 text-emerald-800"],
    ["Lead", "Assigned", "bg-violet-100 text-violet-800"],
  ];
  return (
    <Frame title="internal-crm / pipeline">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold">Accounts</p>
        <div className="mono rounded-md bg-[var(--paper)] px-2 py-1 text-[10px] text-[var(--muted)]">Role: Operations</div>
      </div>
      <div className="overflow-hidden rounded-xl border border-[var(--line)]">
        {rows.map(([stage, status, tone], i) => (
          <motion.div
            key={stage}
            {...fade(i)}
            className="flex items-center justify-between border-b border-[var(--line)] px-3 py-2.5 last:border-0"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--paper-2)] text-[10px] font-semibold">
                {String.fromCharCode(65 + i)}
              </span>
              <div>
                <p className="text-[12px] font-medium">Account {String.fromCharCode(65 + i)}</p>
                <p className="mono text-[10px] text-[var(--muted)]">{stage}</p>
              </div>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tone}`}>{status}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function Automation() {
  const steps = [
    { g: "mail", t: "Trigger", d: "New enquiry submitted" },
    { g: "filter", t: "Condition", d: "Qualifies for sales follow-up" },
    { g: "customer", t: "Action", d: "Assign owner, create CRM record" },
    { g: "automation", t: "Action", d: "Send confirmation, schedule reminder" },
  ];
  return (
    <Frame title="workflow / new-enquiry">
      <div className="relative mx-auto flex max-w-[320px] flex-col gap-3">
        <div className="absolute bottom-6 left-[19px] top-6 w-px bg-[var(--line-strong)]" aria-hidden />
        {steps.map((s, i) => (
          <motion.div key={i} {...fade(i)} className="relative flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white p-2.5">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${i === 0 ? "bg-[var(--signal)] text-white" : "bg-[var(--paper-2)]"}`}>
              <Glyph name={s.g} size={16} />
            </span>
            <div>
              <p className="mono text-[10px] uppercase tracking-wider text-[var(--muted)]">{s.t}</p>
              <p className="text-[12.5px] font-medium">{s.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function AI() {
  return (
    <Frame title="assistant / account-brief">
      <div className="flex h-full flex-col gap-3">
        <motion.div {...fade(0)} className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[var(--ink)] px-3.5 py-2.5 text-[12.5px] text-white">
          Summarise this account before tomorrow&apos;s call.
        </motion.div>
        <motion.div {...fade(1)} className="max-w-[88%] rounded-2xl rounded-bl-md border border-[var(--line)] bg-[var(--paper)] px-3.5 py-3 text-[12.5px] leading-relaxed">
          <p className="mono mb-1.5 flex items-center gap-1.5 text-[10px] text-[var(--signal)]">
            <Glyph name="ai" size={12} /> Drafted from CRM, orders and emails
          </p>
          <ul className="space-y-1 text-[var(--ink-3)]">
            <li>• Two open quotations, one awaiting approval</li>
            <li>• Last order delivered; invoice pending</li>
            <li>• Suggested next step: confirm approval timeline</li>
          </ul>
        </motion.div>
        <motion.div {...fade(2)} className="mt-auto flex items-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2">
          <span className="text-[12px] text-[var(--muted)]">Human review before sending</span>
          <span className="ml-auto rounded-md bg-[var(--ink)] px-2 py-1 text-[10px] font-medium text-white">Approve</span>
        </motion.div>
      </div>
    </Frame>
  );
}

function DataViz() {
  const bars = [38, 52, 44, 66, 58, 74, 82];
  return (
    <Frame title="dashboard / operations">
      <div className="grid grid-cols-3 gap-2.5">
        {["Pipeline", "Fulfilment", "Receivables"].map((k, i) => (
          <motion.div key={k} {...fade(i)} className="rounded-xl border border-[var(--line)] p-2.5">
            <p className="mono text-[9.5px] uppercase tracking-wider text-[var(--muted)]">{k}</p>
            <div className="mt-2 h-2 w-3/4 rounded bg-[var(--ink)]" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded bg-black/10" />
          </motion.div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-[var(--line)] p-3">
        <p className="mono mb-3 text-[10px] text-[var(--muted)]">Weekly activity · illustrative</p>
        <div className="flex h-28 items-end gap-2">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className={`flex-1 rounded-t-md ${i === bars.length - 1 ? "bg-[var(--signal)]" : "bg-[var(--ink)]/85"}`}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Integration() {
  const apps = ["Website", "CRM", "Payments", "Email", "WhatsApp", "Accounting"];
  return (
    <Frame title="integration-hub">
      <div className="relative mx-auto aspect-square h-full max-h-[260px]">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
          {apps.map((_, i) => {
            const a = (i / apps.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={r2(100 + Math.cos(a) * 76)}
                y2={r2(100 + Math.sin(a) * 76)}
                stroke="rgba(11,11,12,.25)"
                strokeWidth="1"
                className="flow-line"
              />
            );
          })}
        </svg>
        <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-[var(--ink)] text-white">
          <Glyph name="integration" size={22} />
        </div>
        {apps.map((app, i) => {
          const a = (i / apps.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <motion.span
              key={app}
              {...fade(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--line)] bg-white px-2.5 py-1 text-[10.5px] font-medium shadow-sm"
              style={{ left: `${r2(50 + Math.cos(a) * 38)}%`, top: `${r2(50 + Math.sin(a) * 38)}%` }}
            >
              {app}
            </motion.span>
          );
        })}
      </div>
    </Frame>
  );
}

export const CAPABILITY_VISUALS = [Experience, Software, Automation, AI, DataViz, Integration];
