// Minimal, original line glyphs used across the system diagrams.
const PATHS: Record<string, React.ReactNode> = {
  customer: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  experience: (
    <>
      <rect x="3" y="4.5" width="18" height="13" rx="2" />
      <path d="M3 8.5h18M8 20.5h8" />
    </>
  ),
  sales: (
    <>
      <path d="M4 19V11M10 19V7M16 19v-5M21 5l-5 5-4-3-8 6" />
    </>
  ),
  operations: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </>
  ),
  automation: (
    <>
      <path d="M4 7h10l-3-3M20 17H10l3 3" />
      <path d="M17 7h3M4 17h3" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  intelligence: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M7.5 15.5l3-3.5 2.5 2 3.5-4.5" />
    </>
  ),
  growth: (
    <>
      <path d="M4 20h16M6 16l4-4 3 3 6-7" />
      <path d="M15 8h4v4" />
    </>
  ),
  software: (
    <>
      <path d="M8.5 8L4.5 12l4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13" />
    </>
  ),
  integration: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8 7.5l2.8 8.2M16 7.5l-2.8 8.2M8.5 6h7" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  filter: <path d="M4 5h16l-6 7.5V19l-4-2v-4.5z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

export type GlyphName = keyof typeof PATHS;

export function Glyph({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name] ?? PATHS.operations}
    </svg>
  );
}
