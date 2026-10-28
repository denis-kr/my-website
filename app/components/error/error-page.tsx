import { ArchWindow } from "~/components/error/arch-window";
import { SectionJumpLinks } from "~/components/error/section-jump-links";
import { focusRing } from "~/components/styles";

// Solid pill for an error page's main action.
export const primaryButton = `inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-ochre transition-colors hover:bg-lake dark:bg-ochre dark:text-night dark:hover:bg-ochre-deep ${focusRing}`;

// Quieter glass pill for a secondary action next to it.
export const secondaryButton = `glass glass-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold ${focusRing}`;

// Inline code chip for a path or message shown in an error page's text.
export const codeChip =
  "rounded-md bg-white/35 px-1.5 py-0.5 font-mono text-[0.9em] break-all text-ink dark:bg-white/10 dark:text-ochre";

// Shared layout for the 404 and error pages: the arched window with a scene, the status code, a headline,
// an explanation and the actions, then links to every section.
export function ErrorPage({
  scene,
  status,
  heading,
  description,
  actions,
  children,
}: {
  scene: React.ReactNode;
  status: number;
  heading: string;
  description: React.ReactNode;
  actions: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-[clamp(1rem,3svh,1.5rem)] px-4 py-10 text-center">
      <ArchWindow>{scene}</ArchWindow>

      <h1 className="flex flex-col items-center gap-2">
        <span className="text-7xl leading-none font-bold tracking-tighter sm:text-9xl">
          {status}
        </span>
        <span className="text-xl font-semibold text-balance sm:text-2xl">
          {heading}
        </span>
      </h1>

      <p className="max-w-md text-base text-pretty text-ink/75 sm:text-lg dark:text-ochre/75">
        {description}
      </p>

      <div className="flex flex-wrap justify-center gap-3">{actions}</div>

      {children}

      <SectionJumpLinks />
    </main>
  );
}
