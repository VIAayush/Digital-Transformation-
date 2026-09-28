import Image from "next/image";

/** VILMS — two real product screens, layered. */
export function VilmsVisual() {
  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden bg-[#0f1a2e] p-5 sm:p-8">
      <div className="grid-paper-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative h-full">
        <div className="absolute left-0 top-0 w-[82%] overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-transform duration-700 group-hover:-translate-y-1">
          <Image
            src="/work/vilms-console.png"
            alt="VILMS admin console showing enrolments, pending grading, live classes and a grading pipeline"
            width={1270}
            height={749}
            sizes="(min-width: 1024px) 50vw, 90vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
        <div className="absolute right-0 top-[30%] w-[70%] overflow-hidden rounded-xl border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,.55)] transition-transform duration-700 group-hover:translate-x-[-6px] group-hover:translate-y-[-10px]">
          <Image
            src="/work/vilms-grading.png"
            alt="VILMS grading workspace: an AI-drafted rubric score beside a handwritten answer, awaiting faculty review"
            width={1270}
            height={749}
            sizes="(min-width: 1024px) 42vw, 80vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

/** SuperShowroom — illustrative merchant console composed in code. */
export function ShowroomVisual() {
  const orders = [
    ["#1042", "UPI", "Paid", "bg-emerald-100 text-emerald-800"],
    ["#1041", "COD", "Out for delivery", "bg-sky-100 text-sky-800"],
    ["#1040", "UPI", "Packed", "bg-amber-100 text-amber-800"],
    ["#1039", "Card", "Delivered", "bg-zinc-100 text-zinc-700"],
  ];
  return (
    <div className="relative flex h-full min-h-[320px] w-full items-center justify-center overflow-hidden bg-[#f4efe6] p-5 sm:p-8">
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(0,0,0,.08)_1px,transparent_1px)] [background-size:14px_14px]" aria-hidden />
      <div className="relative grid w-full max-w-[640px] grid-cols-5 gap-3 transition-transform duration-700 group-hover:scale-[1.015]">
        <div className="col-span-5 flex items-center justify-between rounded-xl border-2 border-black bg-white px-4 py-3">
          <span className="text-[15px] font-bold tracking-tight">
            supershowroom<span className="text-[#ff3d8b]">✦</span>
            <span className="mono ml-2 text-[9px] font-medium uppercase tracking-[0.14em] text-black/50">merchant console</span>
          </span>
          <span className="mono rounded-md bg-[#e8ff3a] px-2 py-1 text-[10px] font-semibold">Store online</span>
        </div>
        <div className="col-span-3 rounded-xl border-2 border-black bg-white p-4">
          <p className="mono mb-3 text-[10px] uppercase tracking-[0.12em] text-black/50">Orders</p>
          <ul className="space-y-2">
            {orders.map(([id, pay, st, tone]) => (
              <li key={id} className="flex items-center justify-between text-[12px]">
                <span className="mono font-medium">{id}</span>
                <span className="mono text-black/50">{pay}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tone}`}>{st}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <div className="flex-1 rounded-xl border-2 border-black bg-[#ff3d8b] p-4 text-white">
            <p className="mono text-[10px] uppercase tracking-[0.12em] opacity-80">GST invoice</p>
            <p className="mt-2 text-[13px] font-semibold leading-snug">Generated automatically with every order</p>
          </div>
          <div className="flex-1 rounded-xl border-2 border-black bg-white p-4">
            <p className="mono text-[10px] uppercase tracking-[0.12em] text-black/50">Alerts</p>
            <p className="mt-2 text-[12.5px] font-medium leading-snug">WhatsApp order updates to buyers</p>
          </div>
        </div>
        <div className="col-span-5 grid grid-cols-4 gap-2">
          {["Catalogue", "Design", "Delivery", "Domain"].map((t) => (
            <div key={t} className="rounded-lg border-2 border-black bg-white px-2 py-2 text-center text-[11px] font-semibold">
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Corporate gifting platform — real site imagery with the order-to-payment flow the CRM runs. */
export function GiftingVisual() {
  const flow = ["Company", "Lead", "Requirement", "Quotation", "Order", "Fulfilment", "Invoice", "Payment"];
  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden bg-[#2a2620]">
      <Image
        src="/work/gifting-hero.webp"
        alt="Corporate gift set imagery from the Souvenir gifting storefront"
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover opacity-90 transition-transform duration-[1.2s] group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" aria-hidden />
      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/55 p-4 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5">
        <p className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-white/60">One system, end to end</p>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[11.5px] font-medium sm:text-[12.5px]">
          {flow.map((f, i) => (
            <li key={f} className="flex items-center gap-1.5">
              <span className={`rounded-md px-2 py-1 ${i === flow.length - 1 ? "bg-[var(--signal)]" : "bg-white/10"}`}>{f}</span>
              {i < flow.length - 1 && <span className="text-white/40">→</span>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
