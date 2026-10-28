import { useEffect, useMemo, useRef, useState } from "react";

// Spinner frames and status words in the spirit of Claude Code's "thinking" line.
const SPINNER = ["·", "✢", "✳", "✶", "✻", "✽", "✻", "✶", "✳", "✢"];
const THINKING_WORDS = ["Thinking", "Recalling", "Pondering", "Remembering", "Composing"];

const THINK_MS = 1400;

type Phase = "thinking" | "streaming" | "done";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Splits text into paragraphs of word tokens (each keeps its trailing space), numbered in reading order.
function tokenize(text: string) {
  let index = 0;
  return text.split(/\n{2,}/).map((paragraph) =>
    (paragraph.match(/\S+\s*/g) ?? []).map((word) => ({ word, index: index++ })),
  );
}

function ThinkingIndicator() {
  const [frame, setFrame] = useState(0);
  const word = useMemo(
    () => THINKING_WORDS[Math.floor(Math.random() * THINKING_WORDS.length)],
    [],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setFrame((f) => f + 1), 110);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="flex items-center gap-2 font-medium motion-safe:animate-message-in">
      <span aria-hidden="true" className="inline-block w-4 text-center text-lake dark:text-ochre">
        {SPINNER[frame % SPINNER.length]}
      </span>
      <span className="motion-safe:animate-shimmer shimmer-text">{word}…</span>
    </p>
  );
}

// An assistant reply that "thinks" for a moment, then streams in word by word.
// With `animate` off it renders the finished text straight away.
export function AssistantMessage({
  text,
  animate,
  onDone,
  onProgress,
}: {
  text: string;
  animate: boolean;
  onDone?: () => void;
  onProgress?: () => void;
}) {
  const paragraphs = useMemo(() => tokenize(text), [text]);
  const total = paragraphs.reduce((sum, p) => sum + p.length, 0);

  const [phase, setPhase] = useState<Phase>(animate ? "thinking" : "done");
  const [shown, setShown] = useState(animate ? 0 : total);

  // Keep the latest callbacks without restarting the stream when they change.
  const onDoneRef = useRef(onDone);
  const onProgressRef = useRef(onProgress);
  onDoneRef.current = onDone;
  onProgressRef.current = onProgress;

  useEffect(() => {
    if (!animate) return;

    const finish = () => {
      setShown(total);
      setPhase("done");
      onDoneRef.current?.();
    };
    if (prefersReducedMotion()) {
      finish();
      return;
    }

    let count = 0;
    let timer: number;
    const tick = () => {
      // One to three words at a time, at an uneven pace, like tokens arriving from a model.
      count = Math.min(total, count + 1 + Math.floor(Math.random() * 3));
      setShown(count);
      onProgressRef.current?.();
      if (count >= total) {
        finish();
        return;
      }
      timer = window.setTimeout(tick, 35 + Math.random() * 90);
    };
    timer = window.setTimeout(() => {
      setPhase("streaming");
      tick();
    }, THINK_MS);
    return () => window.clearTimeout(timer);
  }, [animate, total]);

  return (
    <div className="flex items-start gap-3 motion-safe:animate-message-in">
      <img
        src="/portrait.jpg"
        alt=""
        width={36}
        height={36}
        className="mt-0.5 size-9 shrink-0 rounded-full object-cover object-[50%_30%] ring-2 ring-white/50 dark:ring-white/10"
      />
      <div className="min-w-0 flex-1 pt-1.5" aria-busy={phase !== "done"}>
        {phase === "thinking" ? (
          <ThinkingIndicator />
        ) : (
          <>
            {/* Screen readers get the finished answer once, instead of every word as it lands. */}
            <div className="sr-only" aria-live="polite">
              {phase === "done" ? text : ""}
            </div>
            <div aria-hidden="true" className="flex flex-col gap-4 text-lg leading-relaxed">
              {paragraphs.map((tokens, i) => {
                const visible = tokens.filter((t) => t.index < shown);
                if (!visible.length) return null;
                // The caret follows the newest word while the answer is streaming.
                const isLast =
                  phase === "streaming" && visible[visible.length - 1].index === shown - 1;
                return (
                  <p key={i}>
                    {visible.map((t) => (
                      <span key={t.index} className={animate ? "motion-safe:animate-token" : undefined}>
                        {t.word}
                      </span>
                    ))}
                    {isLast && (
                      <span className="ml-0.5 inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] bg-current/70 motion-safe:animate-caret" />
                    )}
                  </p>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
