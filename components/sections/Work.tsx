"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Arrow } from "@/components/ui/Arrow";
import { GiftingVisual, ShowroomVisual, VilmsVisual } from "./WorkVisuals";

// Only verified facts from the product repositories. No invented metrics.
const PROJECTS = [
  {
    name: "VILMS",
    kind: "Viral Inbound product · Education SaaS",
    tagline: "The LMS built for paid-traffic conversion.",
    challenge:
      "Most learning platforms deliver courses but do little to turn ad and search traffic into paying students — and institutes rarely own their brand, payments or data.",
    solution:
      "A multi-tenant, white-label LMS. Each institute runs on its own brand and domain, sells courses with free previews that capture leads, takes payments into its own account with GST invoices, runs live classes and webinars, and evaluates written answers with AI-drafted marking and human review.",
    tech: ["Next.js", "React", "Supabase", "Claude AI", "Razorpay", "Resend"],
    result: "Live with The Round Table IAS, a UPSC coaching institute and VILMS's first customer.",
    link: { label: "vilms.in", href: "https://vilms.in" },
    visual: VilmsVisual,
    visualNote: "Product screenshots",
  },
  {
    name: "Corporate Gifting Platform",
    kind: "Custom CRM / ERP · B2B operations",
    tagline: "Souvenir – Gifting Solutions",
    challenge:
      "Corporate gifting runs on long chains of quotations, suppliers, printing vendors, samples, orders and payments — typically tracked across spreadsheets and inboxes.",
    solution:
      "One system for the entire flow, from company and lead through requirement, quotation, order, fulfilment, invoice and payment. Around thirty internal modules with role-based access for admin, sales, operations, accounts and management, plus a client portal for catalogues, shortlists, quotes, orders and documents.",
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase", "Radix UI"],
    result: null,
    link: { label: "Live storefront", href: "https://giffter.vercel.app/" },
    visual: GiftingVisual,
    visualNote: "Storefront imagery · order-to-payment flow",
  },
  {
    name: "SuperShowroom",
    kind: "Viral Inbound product · Managed e-commerce",
    tagline: "Online stores for Indian sellers, run for them.",
    challenge:
      "Small sellers want to sell online but can't take on the technology behind a store: hosting, payments, delivery partners, GST invoices and day-to-day upkeep.",
    solution:
      "A managed commerce platform. Viral Inbound sets up the storefront, uploads the catalogue and connects UPI, cash-on-delivery and GST invoicing — then keeps the store running. Merchants work from one console for catalogue, orders, design, billing, analytics and domain.",
    tech: ["Industry storefront layouts", "Merchant console", "UPI & COD", "GST invoicing", "WhatsApp alerts", "Delivery integrations"],
    result: null,
    link: null,
    visual: ShowroomVisual,
    visualNote: "Illustrative interface",
  },
];

export function Work() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, i));
    const slide = el.children[clamped] as HTMLElement | undefined;
    if (slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const slides = Array.from(el.children) as HTMLElement[];
      const mid = el.scrollLeft + el.clientWidth * 0.3;
      let best = 0;
      slides.forEach((s, i) => {
        if (s.offsetLeft - el.offsetLeft <= mid) best = i;
      });
      setIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="work" aria-labelledby="work-title" className="section-y overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead
            id="work-title"
            index="08"
            label="Products / work"
            title="We build and operate digital products."
            lede={<p>Real platforms, designed and engineered by Viral Inbound — each one a connected system of software, data, automation and, where it helps, AI.</p>}
          />
          <div className="flex items-center gap-3">
            <span className="mono mr-2 text-[12px] text-[var(--muted)]">
              {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous project"
              className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line-strong)] transition hover:border-ink hover:bg-white disabled:opacity-30"
            >
              <Arrow className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === PROJECTS.length - 1}
              aria-label="Next project"
              className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white transition hover:bg-[var(--signal)] disabled:opacity-30"
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:px-10 lg:mt-16 [scroll-padding-inline:20px] md:[scroll-padding-inline:40px] xl:px-[max(40px,calc((100vw-1320px)/2+40px))] xl:[scroll-padding-inline:max(40px,calc((100vw-1320px)/2+40px))]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Products and work"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
      >
        {PROJECTS.map((p, i) => {
          const Visual = p.visual;
          return (
            <article
              key={p.name}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${PROJECTS.length}: ${p.name}`}
              className="group grid w-[90vw] max-w-[1240px] shrink-0 snap-start overflow-hidden rounded-[28px] border border-[var(--line)] bg-white md:w-[86vw] lg:grid-cols-12"
            >
              <div className="relative lg:col-span-7">
                <div className="h-[320px] sm:h-[420px] lg:h-full lg:min-h-[600px]">
                  <Visual />
                </div>
                <span className="mono absolute left-4 top-4 rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur">
                  {p.visualNote}
                </span>
              </div>
              <div className="flex flex-col p-6 sm:p-9 lg:col-span-5 lg:p-10">
                <p className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">{p.kind}</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[2.1rem] font-semibold leading-none tracking-tight sm:text-[2.6rem]">
                  {p.name}
                </h3>
                <p className="mt-2 text-[var(--muted)]">{p.tagline}</p>

                <dl className="mt-8 space-y-5 text-[0.96rem] leading-relaxed">
                  <div>
                    <dt className="mono mb-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--signal)]">Challenge</dt>
                    <dd>{p.challenge}</dd>
                  </div>
                  <div>
                    <dt className="mono mb-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--signal)]">Solution</dt>
                    <dd className="text-[var(--ink-3)]">{p.solution}</dd>
                  </div>
                  <div>
                    <dt className="mono mb-2 text-[10.5px] uppercase tracking-[0.14em] text-[var(--signal)]">Technology</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <li key={t} className="rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[12px]">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  {p.result && (
                    <div>
                      <dt className="mono mb-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--signal)]">Result</dt>
                      <dd className="font-medium">{p.result}</dd>
                    </div>
                  )}
                </dl>

                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.95rem] font-semibold underline-offset-4 hover:underline"
                  >
                    {p.link.label} <Arrow />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="container-x mt-4 flex gap-2" aria-hidden>
        {PROJECTS.map((p, i) => (
          <span key={p.name} className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-12 bg-ink" : "w-6 bg-black/15"}`} />
        ))}
      </div>
    </section>
  );
}
