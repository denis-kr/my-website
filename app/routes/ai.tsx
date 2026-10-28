import { useEffect, useRef, useState } from "react";
import { Link, redirect } from "react-router";

import { AssistantMessage } from "~/components/ai/assistant-message";
import { dummyAnswer } from "~/components/ai/dummy-answer";
import { OWNER } from "~/components/owner";
import { focusRing } from "~/components/styles";
import type { Route } from "./+types/ai";

const MAX_QUESTION_LENGTH = 500;

// The question arrives from the homepage ask box as ?q=. Without one there is nothing to answer.
export function loader({ request }: Route.LoaderArgs) {
  const question = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (!question) throw redirect("/");
  return { question: question.slice(0, MAX_QUESTION_LENGTH) };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: `${loaderData?.question ?? "Ask"} · Ask ${OWNER.name}` },
    { name: "robots", content: "noindex" },
  ];
}

type Message = { id: number; role: "user" | "assistant"; text: string };

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end motion-safe:animate-message-in">
      <p className="glass max-w-[85%] rounded-3xl rounded-br-md px-5 py-3 text-lg leading-relaxed break-words whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
}

function Chat({ question }: { question: string }) {
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 0, role: "user", text: question },
    { id: 1, role: "assistant", text: dummyAnswer(question) },
  ]);
  // The assistant message that is still thinking or streaming, if any.
  const [activeId, setActiveId] = useState<number | null>(1);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const busy = activeId !== null;

  // Follow the answer as it grows, unless the reader has scrolled up to look at something.
  const followAnswer = () => {
    const distanceFromBottom =
      document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
    if (distanceFromBottom < 160) bottomRef.current?.scrollIntoView({ block: "end" });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages.length]);

  const ask = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim().slice(0, MAX_QUESTION_LENGTH);
    if (!text || busy) return;
    const nextId = messages.length;
    setMessages((m) => [
      ...m,
      { id: nextId, role: "user", text },
      { id: nextId + 1, role: "assistant", text: dummyAnswer(text) },
    ]);
    setActiveId(nextId + 1);
    setDraft("");
  };

  return (
    <>
      <section aria-label="Conversation" className="flex flex-1 flex-col gap-8 pb-8">
        {messages.map((m) =>
          m.role === "user" ? (
            <UserMessage key={m.id} text={m.text} />
          ) : (
            <AssistantMessage
              key={m.id}
              text={m.text}
              animate={m.id === activeId}
              onProgress={followAnswer}
              onDone={() => {
                setActiveId(null);
                inputRef.current?.focus({ preventScroll: true });
              }}
            />
          ),
        )}
        <div ref={bottomRef} />
      </section>

      {/* Same look and view-transition name as the homepage ask box, so it glides down into place. */}
      <form
        onSubmit={ask}
        className="glass sticky bottom-4 flex w-full items-center gap-2 rounded-full p-1.5 pl-6 [view-transition-name:ask-box] focus-within:border-lake dark:focus-within:border-ochre/60"
      >
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={busy ? `${OWNER.name} is answering…` : "Ask a follow-up…"}
          aria-label={`Ask ${OWNER.name} a follow-up question`}
          maxLength={MAX_QUESTION_LENGTH}
          className="min-w-0 flex-1 bg-transparent py-2 text-base placeholder:text-ink/60 focus:outline-none sm:text-lg dark:placeholder:text-ochre/60"
        />
        <button
          type="submit"
          aria-label="Ask"
          disabled={busy || !draft.trim()}
          className={`grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-ink text-ochre transition-[background-color,opacity,scale] hover:bg-lake disabled:cursor-default disabled:opacity-40 disabled:hover:bg-ink active:scale-90 dark:bg-ochre dark:text-night dark:hover:bg-ochre-deep dark:disabled:hover:bg-ochre ${focusRing}`}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </form>
    </>
  );
}

export default function Ai({ loaderData }: Route.ComponentProps) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-2xl flex-col px-4 pt-6 pb-4">
      <header className="flex items-center justify-between pb-10 motion-safe:animate-page-in">
        <Link
          to="/"
          viewTransition
          className={`glass glass-button flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${focusRing}`}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <p className="text-sm font-semibold tracking-wide uppercase opacity-70">
          Ask {OWNER.name}
        </p>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Keyed by question, so asking something new from the homepage starts a fresh conversation. */}
        <Chat key={loaderData.question} question={loaderData.question} />
      </main>
    </div>
  );
}
