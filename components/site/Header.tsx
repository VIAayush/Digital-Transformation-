"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Arrow";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        // Is the section directly under the header a dark surface?
        const probe = document
          .elementsFromPoint(window.innerWidth / 2, 70)
          .find((el) => !el.closest("header"));
        setOnDark(!!probe?.closest(".dark"));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${onDark ? "dark !bg-transparent" : ""}`}>
      <div
        className={`transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          scrolled
            ? onDark
              ? "border-b border-white/10 bg-[rgba(11,11,12,0.72)] backdrop-blur-xl"
              : "border-b border-[var(--line)] bg-[rgba(245,244,240,0.82)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`container-x flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            scrolled ? "h-[64px]" : "h-[80px]"
          }`}
        >
          <Link href="/" aria-label="Viral Inbound — home" className="shrink-0">
            <Logo invert={onDark} className={`transition-all duration-500 ${scrolled ? "h-7" : "h-8"}`} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors ${
                      onDark ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-[var(--ink-3)] hover:bg-black/[0.05] hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="/#start" className={`btn btn-primary hidden sm:inline-flex ${scrolled ? "!h-11" : "!h-12"}`}>
              Start Your Transformation <Arrow />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${onDark ? "border-white/25 text-white" : "border-[var(--line-strong)]"}`}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <path d="M2 6h14M2 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="dark fixed inset-0 z-[60] flex flex-col"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-x flex h-[80px] items-center justify-between">
              <Logo invert className="h-8" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20"
                aria-label="Close menu"
                autoFocus
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto pt-6">
              <ul className="border-t border-white/10">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
                    className="border-b border-white/10"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-5 font-[family-name:var(--font-display)] text-[1.9rem] font-medium tracking-tight"
                    >
                      {item.label}
                      <span className="mono text-xs text-[var(--muted-dark)]">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="container-x space-y-4 pb-10 pt-6">
              <a href="/#start" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Start Your Transformation <Arrow />
              </a>
              <p className="mono text-center text-xs text-[var(--muted-dark)]">
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={SITE.phoneHref}>{SITE.phone}</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
