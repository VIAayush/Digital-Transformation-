"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHead } from "@/components/ui/SectionHead";

type Cap = { id: string; t: string; d: string; links: string[] };

const LAYERS: { name: string; caps: Cap[] }[] = [
  {
    name: "Direction",
    caps: [{ id: "strategy", t: "Strategy", d: "Map processes, priorities and opportunities before choosing any technology.", links: ["web", "software", "data", "ai", "automation"] }],
  },
  {
    name: "Experience",
    caps: [
      { id: "dx", t: "Digital Experiences", d: "Journeys designed around how customers actually find, evaluate and buy.", links: ["web", "portals", "data"] },
      { id: "web", t: "Web & Application Development", d: "Fast, maintainable websites and applications built on modern frameworks.", links: ["cloud", "integration", "crm"] },
      { id: "portals", t: "Customer Portals", d: "Self-service spaces for orders, documents, quotes and support.", links: ["crm", "internal", "integration"] },
    ],
  },
  {
    name: "Business systems",
    caps: [
      { id: "software", t: "Software Development", d: "Custom software engineered around real workflows, not generic templates.", links: ["cloud", "integration", "automation"] },
      { id: "crm", t: "CRM", d: "One place for every lead, account, conversation and opportunity.", links: ["automation", "data", "integration"] },
      { id: "internal", t: "Internal Business Systems", d: "Operations, approvals, inventory and finance workflows your teams run on.", links: ["automation", "data", "cloud"] },
      { id: "dash", t: "Dashboards", d: "Live visibility across sales, operations and finance.", links: ["data", "ai"] },
    ],
  },
  {
    name: "Intelligence",
    caps: [
      { id: "data", t: "Data & Analytics", d: "Clean, connected data models that make reporting trustworthy.", links: ["dash", "ai", "cloud"] },
      { id: "ai", t: "AI", d: "Assistants, summaries, classification and analysis inside real workflows.", links: ["data", "automation", "crm"] },
      { id: "automation", t: "Automation", d: "Rules and workflows that remove repetitive, manual steps.", links: ["integration", "crm", "internal"] },
    ],
  },
  {
    name: "Foundation",
    caps: [
      { id: "cloud", t: "Cloud Technology", d: "Secure, scalable hosting, databases and infrastructure.", links: ["web", "software", "data"] },
      { id: "integration", t: "System Integration", d: "APIs and connectors that make existing tools work as one.", links: ["crm", "software", "automation", "portals"] },
    ],
  },
];

const ALL = LAYERS.flatMap((l) => l.caps);

export function Capabilities() {
  const [active, setActive] = useState<string>("integration");
  const cap = ALL.find((c) => c.id === active)!;
  const related = new Set([...cap.links, ...ALL.filter((c) => c.links.includes(active)).map((c) => c.id)]);

  return (
    <section id="capabilities" aria-labelledby="cap-title" className="dark section-y relative overflow-hidden">
      <div className="grid-paper-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container-x relative">
        <SectionHead
          id="cap-title"
          index="09"
          label="Technology capabilities"
          align="split"
          title="One transformation partner across the digital ecosystem."
          lede={<p>From strategy to infrastructure, every layer is designed to work with the others. Select a capability to see what it connects to.</p>}
        />

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-8">
            {LAYERS.map((layer, li) => (
              <div key={layer.name} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:grid-cols-[150px_1fr] sm:items-center sm:p-4">
                <p className="mono px-1 text-[10.5px] uppercase tracking-[0.16em] text-[var(--muted-dark)]">
                  L{li + 1} · {layer.name}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {layer.caps.map((c) => {
                    const on = c.id === active;
                    const near = related.has(c.id);
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() => setActive(c.id)}
                          onMouseEnter={() => setActive(c.id)}
                          onFocus={() => setActive(c.id)}
                          aria-pressed={on}
                          className={`relative rounded-xl border px-4 py-3 text-left text-[0.95rem] font-medium transition-all duration-300 ${
                            on
                              ? "border-[var(--signal)] bg-[var(--signal)] text-white"
                              : near
                                ? "border-white/40 bg-white/[0.08] text-white"
                                : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {near && !on && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[var(--signal)]" aria-hidden />}
                          {c.t}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[22px] border border-white/10 bg-[var(--ink-2)] p-6 sm:p-8 lg:sticky lg:top-28" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
                  <p className="mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--signal)]">Capability</p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.9rem] font-semibold leading-tight tracking-tight">{cap.t}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--muted-dark)]">{cap.d}</p>
                  <p className="mono mt-8 text-[10.5px] uppercase tracking-[0.16em] text-[var(--muted-dark)]">Works with</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {[...related].map((id) => (
                      <li key={id}>
                        <button
                          type="button"
                          onClick={() => setActive(id)}
                          className="rounded-full border border-white/20 px-3 py-1.5 text-[12.5px] transition hover:border-white"
                        >
                          {ALL.find((c) => c.id === id)!.t}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
