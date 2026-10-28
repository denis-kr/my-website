import { Section } from "~/components/section/section";
import { chip } from "~/components/styles";

const facts = [
  ["Based in", "Northern Virginia, USA"],
  ["Focus", "Software Engineering & AI Engineering"],
  ["Currently", "Building Hilton Hotels web apps"],
  ["Languages", "English, Russian"],
];

const skills = [
  "TypeScript",
  "React",
  "React Router",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
  "NestJS",
];

export function AboutSection() {
  return (
    <Section id="about" index={1} title="About Me">
      <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
        <div className="glass overflow-hidden rounded-2xl">
          {/* macOS Terminal title bar: traffic lights. */}
          <div className="flex items-center border-b border-ink/10 bg-white/30 px-4 py-2.5 dark:border-white/10 dark:bg-white/5">
            <div className="flex gap-2" aria-hidden="true">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
          </div>
          <div className="space-y-4 p-6 text-base leading-relaxed sm:text-lg">
            <p>
              I’m a software engineer who started out on the frontend, building
              interfaces. Over time, curiosity pulled me deeper into the stack:
              I picked up backend development and DevOps along the way.
            </p>
            <p>
              Today I focus on software engineering and AI engineering, and I’m
              most passionate about AI integration: turning what models can do
              into features people actually rely on every day.
            </p>
            <ul className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill) => (
                <li key={skill} className={chip}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <dl className="glass grid content-start gap-4 rounded-2xl p-6">
          {facts.map(([term, value]) => (
            <div key={term}>
              <dt className="font-mono text-xs tracking-wide uppercase opacity-60">
                {term}
              </dt>
              <dd className="font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
