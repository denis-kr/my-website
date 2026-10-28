import { Section } from "~/components/section/section";
import { focusRing } from "~/components/styles";

const projects = [
  {
    name: "Lakeside",
    blurb:
      "A weather dashboard for sailors: wind, waves and ferry times on one glanceable screen.",
    tags: ["React", "D3", "Open-Meteo"],
    href: "#",
  },
  {
    name: "Terminal Portfolio",
    blurb:
      "This site. Glass panels, a typing terminal and an AI that answers questions about me.",
    tags: ["React Router", "Tailwind", "SSR"],
    href: "#",
  },
  {
    name: "Pocket Ledger",
    blurb:
      "An offline-first expense tracker that syncs when it can and never loses a receipt.",
    tags: ["PWA", "IndexedDB", "Node.js"],
    href: "#",
  },
  {
    name: "Recipe Box",
    blurb:
      "Paste any recipe URL and get a clean, ad-free card with scaled ingredients.",
    tags: ["TypeScript", "Postgres", "Scraping"],
    href: "#",
  },
];

// Fill for the folder's back panel and tab: a lake-tinted pane behind the glass front. The tab's sloped edge is an SVG and repeats it as `fill`.
const folderBack = "bg-lake/30 dark:bg-white/8";

// Each tag is a sheet of paper standing in the folder, tilted a little so the stack looks hand-filed.
const sheetTilt = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export function ProjectsSection() {
  return (
    <Section id="projects" index={2} title="Projects">
      <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2">
        {projects.map(({ name, blurb, tags, href }) => (
          <li key={name}>
            {/* A Finder folder: tinted back panel with a tab, the tags filed inside as paper sheets, and the glass front panel. */}
            <a
              href={href}
              className={`group relative flex h-full flex-col rounded-2xl pt-5 ${focusRing}`}
            >
              <span aria-hidden="true" className="absolute top-0 left-0 flex">
                <span className={`h-5 w-24 rounded-tl-xl ${folderBack}`} />
                <svg viewBox="0 0 24 16" preserveAspectRatio="none" className="h-5 w-7 fill-lake/30 dark:fill-white/8">
                  <path d="M0 0h4c6 0 8 16 16 16h4H0Z" />
                </svg>
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-5 bottom-0 rounded-2xl rounded-tl-none ${folderBack}`}
              />
              <ul className="relative -mb-4 flex flex-wrap items-end gap-1.5 px-5 pt-3">
                {tags.map((tag, i) => (
                  <li
                    key={tag}
                    style={{ transitionDelay: `${i * 60}ms` }}
                    className={`rounded-t-md bg-white px-3 pt-1.5 pb-5 text-xs font-medium text-ink shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 dark:bg-ochre/90 ${sheetTilt[i % sheetTilt.length]}`}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="relative flex flex-1 flex-col gap-3 glass rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">{name}</h3>
                  <span
                    aria-hidden="true"
                    className="opacity-60 transition-[translate,opacity] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </div>
                <p className="flex-1 leading-relaxed opacity-80">{blurb}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
