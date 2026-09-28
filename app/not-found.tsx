import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid-paper flex min-h-screen items-center">
      <div className="container-x max-w-2xl">
        <p className="eyebrow mb-6">404</p>
        <h1 className="display text-[clamp(2.4rem,5vw,4rem)]">This page doesn&apos;t exist.</h1>
        <Link href="/" className="btn btn-primary mt-10">Back to home</Link>
      </div>
    </main>
  );
}
