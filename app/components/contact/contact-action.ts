import { data } from "react-router";

export type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

// Handles the homepage contact form. The home route exports this as its action.
export async function contactAction({ request }: { request: Request }) {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();

  // Hidden from people; bots that fill every field get a quiet success and nothing is sent.
  if (form.get("website")) return { ok: true as const };

  const errors: ContactErrors = {};
  if (!name) errors.name = "Add your name so I know who's writing.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter an email address I can reply to, like you@example.com.";
  if (message.length < 10) errors.message = "Write a little more — at least 10 characters.";
  if (Object.keys(errors).length) return data({ ok: false as const, errors }, { status: 400 });

  // TODO: deliver through a mail provider (e.g. Resend, Postmark). Until then messages only reach the server log.
  console.log("[contact]", { name, email, message });

  return { ok: true as const };
}

