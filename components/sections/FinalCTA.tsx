"use client";

import { useState } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { useFormSubmit } from "@/lib/useFormSubmit";

const FOCUS = [
  "Customer management",
  "Operations & workflows",
  "Reporting & data",
  "Sales & growth",
  "Customer experience",
  "AI & automation",
  "Something else",
];

const CODES = ["+91", "+1", "+44", "+61", "+971", "+65", "+49", "+33"];

const field =
  "h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-[0.95rem] text-white placeholder:text-white/35 transition focus:border-white/60 focus:bg-white/[0.07] focus:outline-none";

export function FinalCTA() {
  const [focus, setFocus] = useState<string[]>([]);
  const { submitForm, loading, error } = useFormSubmit();

  const toggle = (f: string) => setFocus((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website_hp")) return; // honeypot
    const data: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (k !== "website_hp") data[k] = String(v);
    });
    data.focusArea = focus.join(", ");
    await submitForm(data, "Start Your Transformation");
  }

  return (
    <section id="start" aria-labelledby="cta-title" className="dark relative overflow-hidden">
      <div className="grid-paper-dark pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,79,31,.55), transparent 65%)" }}
        aria-hidden
      />
      <div className="container-x section-y relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow mb-6">
            <span>11</span>
            <span aria-hidden>/</span>
            <span>Start</span>
          </p>
          <h2 id="cta-title" className="display text-[clamp(2.8rem,6.8vw,6rem)]">
            What would you <span className="text-[var(--signal)]">transform</span> first?
          </h2>
          <div className="lede mt-8 max-w-lg space-y-4">
            <p>
              Every business has processes that can be improved, systems that can be connected and opportunities that
              technology can unlock.
            </p>
            <p>
              Tell us what is slowing your business down, creating unnecessary manual work or limiting your growth.
              We&apos;ll help identify the opportunity and design the digital solution.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#transform-form" className="btn btn-primary">
              Start Your Transformation <Arrow />
            </a>
            <a href={SITE.bookCall} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Talk to Our Team
              <span className="sr-only">(opens booking calendar in a new tab)</span>
            </a>
          </div>
          <dl className="mono mt-12 grid max-w-lg grid-cols-2 gap-6 border-t border-white/10 pt-8 text-[12px]">
            <div>
              <dt className="text-[var(--muted-dark)]">Email</dt>
              <dd className="mt-1 text-white">
                <a href={`mailto:${SITE.email}`} className="hover:text-[var(--signal)]">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted-dark)]">Phone / WhatsApp</dt>
              <dd className="mt-1 text-white">
                <a href={SITE.phoneHref} className="hover:text-[var(--signal)]">
                  {SITE.phone}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <form
            id="transform-form"
            onSubmit={onSubmit}
            className="scroll-mt-28 rounded-[26px] border border-white/10 bg-[var(--ink-2)]/80 p-6 backdrop-blur sm:p-8"
            aria-describedby="form-note"
          >
            <fieldset>
              <legend className="font-[family-name:var(--font-display)] text-[1.35rem] font-semibold tracking-tight">
                Tell us where to start
              </legend>
              <p className="mt-1 text-[0.9rem] text-[var(--muted-dark)]">Choose one or more areas.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {FOCUS.map((f) => {
                  const on = focus.includes(f);
                  return (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(f)}
                      className={`rounded-full border px-3.5 py-2 text-[0.86rem] transition ${
                        on ? "border-[var(--signal)] bg-[var(--signal)] text-white" : "border-white/15 text-white/75 hover:border-white/50"
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">First name</span>
                <input name="firstName" required autoComplete="given-name" placeholder="First name *" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Last name</span>
                <input name="lastName" autoComplete="family-name" placeholder="Last name" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Work email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="Work email *" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Company</span>
                <input name="company" autoComplete="organization" placeholder="Company" className={field} />
              </label>
              <div className="flex gap-2 sm:col-span-2">
                <label className="block w-[92px] shrink-0">
                  <span className="sr-only">Country code</span>
                  <select name="countryCode" defaultValue="+91" className={`${field} appearance-none pr-2`}>
                    {CODES.map((c) => (
                      <option key={c} value={c} className="bg-[var(--ink)]">
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block flex-1">
                  <span className="sr-only">Phone number</span>
                  <input name="phone" type="tel" autoComplete="tel-national" placeholder="Phone number" className={field} />
                </label>
              </div>
              <label className="block sm:col-span-2">
                <span className="sr-only">What is slowing your business down?</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="What is slowing your business down?"
                  className={`${field} h-auto resize-none py-3`}
                />
              </label>
              <input type="text" name="website_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-[0.9rem] text-red-200">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary mt-6 w-full disabled:opacity-60">
              {loading ? "Sending…" : "Start Your Transformation"} {!loading && <Arrow />}
            </button>
            <p id="form-note" className="mt-4 text-center text-[0.78rem] text-[var(--muted-dark)]">
              By submitting this form, you agree to our{" "}
              <a href={SITE.legal[0].href} className="underline underline-offset-2 hover:text-white">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href={SITE.legal[1].href} className="underline underline-offset-2 hover:text-white">
                Cookie Policy
              </a>
              .
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
