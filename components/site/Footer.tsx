import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/site";

const COLS = [
  {
    h: "Navigate",
    links: [
      { l: "Solutions", h: "/#solutions" },
      { l: "Approach", h: "/#approach" },
      { l: "AI & Automation", h: "/#ai" },
      { l: "About", h: "/#why" },
      { l: "Careers", h: SITE.careers },
    ],
  },
  {
    h: "Solutions",
    links: [
      { l: "Digital Experiences", h: "/#solutions" },
      { l: "Custom Software", h: "/#solutions" },
      { l: "Automation", h: "/#solutions" },
      { l: "AI Solutions", h: "/#ai" },
      { l: "Data & Intelligence", h: "/#intelligence" },
      { l: "Integration", h: "/#capabilities" },
    ],
  },
  {
    h: "Products / Work",
    links: [
      { l: "VILMS", h: "https://vilms.in" },
      { l: "Corporate Gifting Platform", h: "/#work" },
      { l: "SuperShowroom", h: "/#work" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="dark border-t border-white/10">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo invert className="h-10" />
          <p className="mt-6 max-w-sm leading-relaxed text-[var(--muted-dark)]">
            Viral Inbound is a digital transformation company. We design, build and optimize the digital systems that
            help businesses work, operate and grow.
          </p>
          <ul className="mt-8 flex gap-2">
            {SITE.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono inline-flex h-10 items-center rounded-full border border-white/15 px-4 text-[11.5px] transition hover:border-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
          {COLS.map((c) => (
            <div key={c.h}>
              <p className="mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--muted-dark)]">{c.h}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.l}>
                    <a
                      href={l.h}
                      {...(l.h.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-[0.93rem] text-white/80 transition hover:text-white"
                    >
                      {l.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="lg:col-span-3">
          <p className="mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--muted-dark)]">Contact</p>
          <address className="mt-4 space-y-2.5 not-italic text-[0.93rem] text-white/80">
            <a href={`mailto:${SITE.email}`} className="block hover:text-white">
              {SITE.email}
            </a>
            <a href={SITE.phoneHref} className="block hover:text-white">
              {SITE.phone}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="block hover:text-white">
              WhatsApp us
            </a>
            {SITE.offices.map((o) => (
              <p key={o.city} className="pt-2 text-white/60">
                {o.line}
              </p>
            ))}
            <p className="text-white/60">{SITE.hours}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-[0.82rem] text-[var(--muted-dark)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Viral Inbound. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {SITE.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
