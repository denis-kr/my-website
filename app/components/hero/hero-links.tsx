import {
  SectionIcon,
  scrollToSection,
  sectionLinks,
} from "~/components/nav/section-links";
import { focusRing } from "~/components/styles";

// Row of glass tiles under the hero's ask box; each one jumps to its section.
export function HeroLinks() {
  return (
    <nav id="hero-links" aria-label="Sections" className="w-full max-w-2xl">
      <ul className="grid grid-cols-5 gap-2 sm:gap-3">
        {sectionLinks.map(({ id, label, icon, tint }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => scrollToSection(e, id)}
              className={`glass glass-button flex flex-col items-center gap-1.5 rounded-2xl px-1 py-3 text-xs font-medium sm:py-5 sm:text-base ${focusRing}`}
            >
              <SectionIcon icon={icon} className={tint} />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
