import { Reveal } from "./Reveal";

type Props = {
  index: string;
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  id?: string;
  align?: "left" | "split";
  className?: string;
};

/** Consistent section opener: mono index label, headline, optional lede. */
export function SectionHead({ index, label, title, lede, id, align = "left", className = "" }: Props) {
  if (align === "split") {
    return (
      <div className={`grid gap-8 md:grid-cols-12 md:gap-10 ${className}`}>
        <Reveal className="md:col-span-7">
          <p className="eyebrow mb-6">
            <span>{index}</span>
            <span aria-hidden>/</span>
            <span>{label}</span>
          </p>
          <h2 id={id} className="h-section">
            {title}
          </h2>
        </Reveal>
        {lede && (
          <Reveal delay={0.1} className="md:col-span-5 md:self-end">
            <div className="lede space-y-4">{lede}</div>
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <p className="eyebrow mb-6">
        <span>{index}</span>
        <span aria-hidden>/</span>
        <span>{label}</span>
      </p>
      <h2 id={id} className="h-section">
        {title}
      </h2>
      {lede && <div className="lede mt-6 space-y-4">{lede}</div>}
    </Reveal>
  );
}
