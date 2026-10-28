// Placeholder replies until a real model answers questions about the site owner.
import { OWNER } from "~/components/owner";

export function dummyAnswer(question: string) {
  const quoted = question.length > 80 ? `${question.slice(0, 77)}…` : question;
  return [
    `Good question! This is a placeholder reply, so I can't really answer "${quoted}" just yet.`,
    `Once the assistant is connected, it will be able to tell you about ${OWNER.name}'s work as a ${OWNER.title.toLowerCase()}, the projects behind it, past roles, and what happens away from the keyboard.`,
    `Until then, the homepage has the whole story. Scroll through it, or use the contact form to reach ${OWNER.name} directly.`,
  ].join("\n\n");
}
