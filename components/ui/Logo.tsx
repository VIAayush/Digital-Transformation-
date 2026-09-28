import Image from "next/image";

/** The existing Viral Inbound wordmark. `invert` renders it white on dark surfaces. */
export function Logo({ invert = false, className = "" }: { invert?: boolean; className?: string }) {
  return (
    <Image
      src="/brand/vi-logo.png"
      alt="Viral Inbound"
      width={496}
      height={250}
      priority
      className={`h-9 w-auto select-none ${invert ? "invert" : ""} ${className}`}
    />
  );
}
