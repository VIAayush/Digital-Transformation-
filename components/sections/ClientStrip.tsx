import Image from "next/image";

// Client logos as shown on the existing viralinbound.com homepage.
const CLIENTS = [
  { src: "/clients/roche.svg", name: "Roche", w: 90 },
  { src: "/clients/sycomp.webp", name: "Sycomp", w: 110 },
  { src: "/clients/152co.svg", name: "152co", w: 80 },
  { src: "/clients/globelite-logo.svg", name: "Globelite", w: 120 },
  { src: "/clients/ad2connect.png", name: "Ad2Connect", w: 56 },
  { src: "/clients/aiployee.png", name: "Aiployee", w: 110 },
  { src: "/clients/airavat.avif", name: "Airavat", w: 110 },
  { src: "/clients/aplite-greenstone.png", name: "Aplite Greenstone", w: 130 },
  { src: "/clients/crossroad.avif", name: "Crossroad", w: 110 },
  { src: "/clients/mrunalinirao.svg", name: "Mrunalini Rao", w: 130 },
  { src: "/clients/pakitall.avif", name: "Pakitall", w: 100 },
  { src: "/clients/theterritory.png", name: "The Territory", w: 40 },
  { src: "/clients/tilt.avif", name: "Tilt", w: 70 },
  { src: "/clients/veclan.avif", name: "Veclan", w: 110 },
  { src: "/clients/viveks-creations.png", name: "Vivek's Creations", w: 100 },
  { src: "/clients/yavi.jpg", name: "Yavi", w: 60 },
];

function Row({ dup = false }: { dup?: boolean }) {
  return (
    <ul className={`flex shrink-0 items-center gap-14 pr-14 ${dup ? "marquee-dup" : ""}`} aria-hidden={dup || undefined}>
      {CLIENTS.map((c) => (
        <li key={c.name} className="flex h-12 items-center">
          <Image
            src={c.src}
            alt={dup ? "" : c.name}
            width={c.w * 2}
            height={96}
            loading="lazy"
            className="h-auto max-h-9 w-auto object-contain opacity-60 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            style={{ maxWidth: c.w }}
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientStrip() {
  return (
    <section aria-label="Clients" className="border-y border-[var(--line)] bg-[var(--paper)] py-10">
      <div className="container-x mb-6 flex items-center justify-between gap-6">
        <p className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
          Businesses that have worked with Viral Inbound
        </p>
      </div>
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex w-max">
          <Row />
          <Row dup />
        </div>
      </div>
    </section>
  );
}
