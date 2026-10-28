// Icon paths in a 24×24 box, drawn with a 1.75 stroke (Lucide style).
const icons = {
  smile: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
    </>
  ),
  briefcase: (
    <>
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </>
  ),
  layers: (
    <>
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65M22 17.65l-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    </>
  ),
  sparkles: (
    <path d="M12 3l1.9 5.8L20 10.7l-6.1 1.9L12 18.5l-1.9-5.9L4 10.7l6.1-1.9ZM19 3v4M21 5h-4M5 17v4M7 19H3" />
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
};

// The page's sections, in order. Each icon gets its own tint, toned to sit with the ochre/lake palette.
export const sectionLinks = [
  {
    id: "about",
    label: "Me",
    icon: icons.smile,
    tint: "text-lake dark:text-sky-300",
  },
  {
    id: "projects",
    label: "Projects",
    icon: icons.briefcase,
    tint: "text-emerald-700 dark:text-emerald-300",
  },
  {
    id: "experience",
    label: "Experience",
    icon: icons.layers,
    tint: "text-violet-700 dark:text-violet-300",
  },
  {
    id: "hobbies",
    label: "Hobbies",
    icon: icons.sparkles,
    tint: "text-rose-700 dark:text-rose-300",
  },
  {
    id: "contact",
    label: "Contact",
    icon: icons.mail,
    tint: "text-ochre-deep dark:text-ochre",
  },
];

// Click handler for `#id` section links. A native hash jump fires popstate, which React Router
// treats as a back/forward navigation and <ScrollRestoration> answers by restoring the top of
// the page. So scroll ourselves and swap the hash in place, keeping the router's history state.
export function scrollToSection(
  event: React.MouseEvent<HTMLAnchorElement>,
  id: string,
) {
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  )
    return;
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  // No `behavior` here, so the CSS `scroll-behavior` (smooth unless reduced motion) applies, as does `scroll-mt-*`.
  target.scrollIntoView();
  window.history.replaceState(window.history.state, "", `#${id}`);
}

export function SectionIcon({
  icon,
  className = "",
}: {
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`size-5 fill-none stroke-current stroke-[1.75] [stroke-linecap:round] [stroke-linejoin:round] ${className}`}
    >
      {icon}
    </svg>
  );
}
