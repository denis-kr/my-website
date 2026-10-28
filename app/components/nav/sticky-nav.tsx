import { useEffect, useState } from "react";

import {
  SectionIcon,
  scrollToSection,
  sectionLinks,
} from "~/components/nav/section-links";
import { focusRing } from "~/components/styles";

const sectionIds = sectionLinks.map(({ id }) => id);

// True once the hero's tile row (#hero-links) has scrolled off the top of the viewport.
function usePastHeroLinks() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const tiles = document.getElementById("hero-links");
    if (!tiles) return;
    const observer = new IntersectionObserver(([entry]) =>
      setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(tiles);
    return () => observer.disconnect();
  }, []);

  return past;
}

// Index of the section currently under the top third of the viewport, or -1 above the first one.
function useActiveSection() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let current = -1;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      // The last section may be too short to reach the line, so count the page bottom as reaching it.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = sectionIds.length - 1;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

// Compact copy of the hero tiles, pinned to the top once the tiles scroll away.
// A pill slides behind the link for the section being read.
export function StickyNav() {
  const visible = usePastHeroLinks();
  const active = useActiveSection();

  return (
    <header
      inert={!visible}
      className={`fixed inset-x-0 top-3 z-50 flex justify-center px-4 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none sm:top-4 ${visible ? "" : "pointer-events-none -translate-y-[150%] opacity-0"}`}
    >
      <nav
        aria-label="Sections"
        className="glass w-full max-w-2xl rounded-full p-1.5"
      >
        <ul className="relative grid grid-cols-5 text-center text-xs font-medium min-[400px]:text-sm sm:text-base">
          <li
            aria-hidden="true"
            style={{ translate: `${Math.max(active, 0) * 100}%` }}
            className={`pointer-events-none absolute inset-y-0 left-0 w-1/5 rounded-full bg-white/55 shadow-[inset_0_1px_0_rgb(255_255_255/0.8),0_2px_8px_--alpha(var(--color-ink)/15%)] transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.3,1.3,0.5,1)] motion-reduce:transition-none dark:bg-white/12 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] ${active >= 0 ? "" : "opacity-0"}`}
          />
          {sectionLinks.map(({ id, label, icon, tint }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => scrollToSection(e, id)}
                aria-current={i === active ? "location" : undefined}
                className={`relative flex items-center justify-center gap-2 rounded-full py-2 transition-transform active:scale-95 ${focusRing}`}
              >
                <SectionIcon
                  icon={icon}
                  className={`hidden size-4 sm:block ${tint}`}
                />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
