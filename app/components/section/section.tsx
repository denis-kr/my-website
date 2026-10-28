import { pageWidth } from "~/components/styles";

// Every section shares this wrapper so spacing and the sticky-nav offset stay consistent.
export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${pageWidth} scroll-mt-24 py-12 sm:py-16`}
    >
      <p className="font-mono text-sm opacity-60" aria-hidden="true">
        {String(index).padStart(2, "0")} ~/{id}
      </p>
      <div className="mt-1 mb-6 flex items-center gap-6">
        <h2
          id={`${id}-title`}
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-current/20" />
      </div>
      {children}
    </section>
  );
}
