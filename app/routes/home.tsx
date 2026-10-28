import { useEffect, useState } from "react";
import { Form } from "react-router";

import { contactAction } from "~/components/contact/contact-action";
import { AboutSection } from "~/components/about/about-section";
import { ContactSection } from "~/components/contact/contact-section";
import { ExperienceSection } from "~/components/experience/experience-section";
import { HobbiesSection } from "~/components/hobbies/hobbies-section";
import { HeroLinks } from "~/components/hero/hero-links";
import { StickyNav } from "~/components/nav/sticky-nav";
import { RollingPlaceholder } from "~/components/hero/rolling-placeholder";
import { ProjectsSection } from "~/components/projects/projects-section";
import { OWNER } from "~/components/owner";
import { focusRing } from "~/components/styles";
import type { Route } from "./+types/home";

// The contact form at the bottom of the page posts here.
export async function action(args: Route.ActionArgs) {
  return contactAction(args);
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${OWNER.name} · Portfolio` },
    {
      name: "description",
      content: `Personal portfolio of ${OWNER.name}, ${OWNER.title}.`,
    },
  ];
}

const placeholderPhrases = [
  "Ask me anything…",
  "or scroll down to learn more…",
];

// Spacing shared by every vertical gap on the page, so they all stay equal.
const stackGap = "gap-[clamp(1rem,3svh,1.5rem)]";

const TYPING_START_MS = 700;

// Types `text` out one character at a time. The untyped remainder is rendered
// invisibly so line breaks are fixed from the first frame and nothing reflows.
function TypedText({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }

    let typed = 0;
    let timer: number;
    const typeNext = () => {
      typed += 1;
      setCount(typed);
      if (typed >= text.length) return;
      // Pause at punctuation, and vary the rest a little so it reads as a person typing.
      const delay = /[.,]/.test(text[typed - 1]) ? 140 : 8 + Math.random() * 18;
      timer = window.setTimeout(typeNext, delay);
    };
    timer = window.setTimeout(typeNext, TYPING_START_MS);
    return () => window.clearTimeout(timer);
  }, [text]);

  const isDone = count >= text.length;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {/* Plain inline anchor: zero width and no line-break opportunity, so the caret never moves text. */}
        {!isDone && (
          <span className="relative">
            <span
              className={`absolute top-1/2 left-0 h-[1.15em] w-[0.6em] -translate-y-1/2 bg-current/70 ${count === 0 ? "motion-safe:animate-caret" : ""}`}
            />
          </span>
        )}
        <span className="invisible">{text.slice(count)}</span>
      </span>
    </>
  );
}

export default function Home() {
  const [question, setQuestion] = useState("");

  return (
    <div className={`flex flex-col items-center px-4 pt-6 pb-16 ${stackGap}`}>
      <StickyNav />

      <main className="flex w-full flex-col items-center">
        {/* Hero: fills the first screen. */}
        <div
          className={`relative isolate flex min-h-[calc(100svh-1.5rem)] w-full flex-col items-center justify-center text-center ${stackGap}`}
        >
          <h1 className="flex flex-col items-center gap-1">
            <span className="text-xl font-semibold sm:text-3xl">
              Hey, I'm {OWNER.name}{" "}
              <span
                aria-hidden="true"
                className="inline-block origin-[70%_70%] motion-safe:animate-wave"
              >
                👋
              </span>
            </span>
            <span className="text-5xl leading-none font-bold tracking-tighter sm:text-7xl lg:text-8xl">
              <TypedText text={OWNER.title} />
            </span>
          </h1>

          {/* The page is the plaster wall; the portrait is an arched window cut into it. Its height is whatever the viewport has left after the other elements (~29rem). */}
          <div className="glass aspect-[4/5] h-[clamp(9rem,calc(100svh-29rem),24rem)] rounded-t-full p-2">
            <div className="size-full overflow-hidden rounded-t-full">
              <img
                src="/portrait.jpg"
                alt={`Portrait of ${OWNER.name}`}
                width={900}
                height={1200}
                className="size-full object-cover object-[50%_35%] motion-safe:animate-blind"
              />
            </div>
          </div>

          {/* Opens the question on /ai. The shared view-transition name lets the box glide into the chat composer. */}
          <Form
            action="/ai"
            viewTransition
            onSubmit={(e) => {
              if (!question.trim()) e.preventDefault();
            }}
            className="glass flex w-full max-w-xl items-center gap-2 rounded-full p-1.5 pl-6 [view-transition-name:ask-box] focus-within:border-lake dark:focus-within:border-ochre/60"
          >
            <div className="relative min-w-0 flex-1 text-base sm:text-lg">
              <input
                type="text"
                name="q"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                aria-label={`Ask ${OWNER.name} a question`}
                className="w-full bg-transparent py-2 focus:outline-none"
              />
              {!question && (
                <RollingPlaceholder
                  phrases={placeholderPhrases}
                  className="text-ink/60 dark:text-ochre/60"
                />
              )}
            </div>
            <button
              type="submit"
              aria-label="Ask"
              className={`grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-ink text-ochre transition-colors hover:bg-lake dark:bg-ochre dark:text-night dark:hover:bg-ochre-deep ${focusRing}`}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Form>

          <HeroLinks />

          {/* The owner's name as an oversized watermark, cut off by the bottom of the hero. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
          >
            <p className="absolute inset-x-0 -bottom-[0.2em] text-center text-[min(28vw,22rem)] leading-none font-bold tracking-tighter text-ink/[0.05] mask-[linear-gradient(to_bottom,black_40%,transparent)] dark:text-white/[0.04]">
              {OWNER.name.toLowerCase()}
            </p>
          </div>
        </div>

        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <HobbiesSection />
        <ContactSection />
      </main>
    </div>
  );
}
