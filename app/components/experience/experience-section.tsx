import { Section } from "~/components/section/section";

type Job = {
  role: string;
  company: string;
  url: string;
  logo?: string;
  period: string;
  points?: string[];
};

// TODO: the points below are placeholders; replace them with real ones.
const jobs: Job[] = [
  {
    role: "Software Engineer",
    company: "Hilton Hotels",
    url: "https://www.linkedin.com/company/hilton/home/",
    logo: "/logos/hilton_logo.jpg",
    period: "2022 — Present",
    points: [
      "Build and maintain features across guest-facing web applications.",
      "Work with design and product teams to ship accessible, responsive UI.",
    ],
  },
  {
    role: "Junior UI Developer",
    company: "Assyst",
    url: "https://www.linkedin.com/company/assyst/home/",
    logo: "/logos/assyst_logo.jpg",
    period: "2020 — 2022",
    points: [
      "Turned design mockups into reusable React components.",
      "Improved page performance and cross-browser consistency.",
    ],
  },
  {
    role: "Web Application Developer",
    company: "National Research Council Canada",
    url: "https://www.linkedin.com/company/national-research-council/home/",
    logo: "/logos/national_research_council_logo.jpg",
    period: "2019",
    points: [
      "Developed internal web tools to support research teams.",
      "Wrote documentation and tests for new application features.",
    ],
  },
  {
    role: "Student",
    company: "Algonquin College of Applied Arts and Technology",
    url: "https://www.linkedin.com/school/algonquincollege/posts/",
    logo: "/logos/algonquin_college_logo.jpg",
    period: "2018 — 2020",
    points: [
      "Studied web and application development.",
      "Completed team projects covering front-end, back-end and databases.",
    ],
  },
  {
    role: "Student",
    company: "York University",
    url: "https://www.linkedin.com/school/york-university/home/",
    logo: "/logos/york_university_logo.jpg",
    period: "2016 — 2017",
    points: ["Took foundational courses in computer science and mathematics."],
  },
];

// "York University" -> "YU"; skips short connecting words like "of" and "and".
function initials(name: string) {
  return name
    .split(" ")
    .filter((word) => word.length > 3 || word === word.toUpperCase())
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export function ExperienceSection() {
  return (
    <Section id="experience" index={3} title="Experience">
      {/* On wide screens a timeline rail runs down the left edge of the cards. */}
      <ol className="relative space-y-4">
        <span
          aria-hidden="true"
          className="absolute inset-y-7 left-[calc(1rem-0.5px)] hidden w-px bg-current/20 md:block"
        />
        {jobs.map(({ role, company, url, logo, period, points }) => (
          <li key={`${company}-${role}`} className="md:pl-8">
            <article className="glass relative grid grid-cols-[auto_1fr] gap-4 rounded-2xl p-6">
              <span
                aria-hidden="true"
                className="absolute top-7 -left-[1.4rem] hidden size-3 rounded-full border-2 border-ochre bg-lake md:block dark:border-night dark:bg-ochre"
              />
              {/* Without a logo file, the company's initials fill the same tile. */}
              {logo ? (
                <img
                  src={logo}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  className="size-10 rounded-lg bg-white object-contain sm:size-12"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="grid size-10 place-items-center rounded-lg bg-current/10 text-sm font-semibold sm:size-12"
                >
                  {initials(company)}
                </span>
              )}
              <div className="min-w-0">
                {/* Below sm the period stacks above the title; from sm up it sits in the top-right corner. */}
                <header className="flex flex-col-reverse gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="text-xl font-semibold">
                    {role}{" "}
                    <span className="font-normal opacity-70">
                      ·{" "}
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-current/30 underline-offset-4 transition-colors hover:decoration-current focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                      >
                        {company}
                      </a>
                    </span>
                  </h3>
                  <p className="shrink-0 font-mono text-sm whitespace-nowrap opacity-60">
                    {period}
                  </p>
                </header>
                {points && points.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed opacity-85 marker:opacity-50">
                    {points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
