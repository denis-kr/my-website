import { Link } from "react-router";

import { SectionIcon, sectionLinks } from "~/components/nav/section-links";
import { focusRing } from "~/components/styles";

// Links from an error page straight to each homepage section.
export function SectionJumpLinks() {
  return (
    <nav aria-label="Sections" className="w-full max-w-xl">
      <p className="mb-3 text-sm text-ink/60 dark:text-ochre/60">
        Or jump straight to a section
      </p>
      <ul className="flex flex-wrap justify-center gap-2">
        {sectionLinks.map(({ id, label, icon, tint }) => (
          <li key={id}>
            <Link
              to={`/#${id}`}
              className={`glass glass-button flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${focusRing}`}
            >
              <SectionIcon icon={icon} className={`size-4 ${tint}`} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
