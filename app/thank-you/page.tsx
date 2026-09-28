import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <>
      <Header />
      <main id="main" className="grid-paper flex min-h-[80vh] items-center pt-32">
        <div className="container-x max-w-3xl py-20">
          <p className="eyebrow mb-6">Received</p>
          <h1 className="display text-[clamp(2.6rem,6vw,4.8rem)]">Thank you. We&apos;ll be in touch soon.</h1>
          <p className="lede mt-6 max-w-xl">
            Our team will review what you shared and come back with a first view of the opportunity. If it&apos;s
            urgent, reach us at <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> or{" "}
            <a className="underline" href={SITE.phoneHref}>{SITE.phone}</a>.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary">Back to home</Link>
            <a href={SITE.bookCall} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Book a call</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
