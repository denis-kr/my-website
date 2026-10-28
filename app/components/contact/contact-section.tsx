import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";
import { Section } from "~/components/section/section";
import { focusRing } from "~/components/styles";
import type { action } from "~/routes/home";

const socials = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "X / Twitter", href: "https://x.com/" },
];

const field =
  "w-full rounded-xl border border-ink/15 bg-white/40 px-4 py-2.5 placeholder:text-ink/45 focus:border-lake focus:outline-none aria-invalid:border-red-700 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-ochre/40 dark:focus:border-ochre/60 dark:aria-invalid:border-red-400";

const pillButton = `cursor-pointer rounded-full bg-ink px-6 py-2.5 font-semibold text-ochre transition-colors hover:bg-lake disabled:cursor-wait disabled:opacity-70 dark:bg-ochre dark:text-night dark:hover:bg-ochre-deep ${focusRing}`;

export function ContactSection() {
  const fetcher = useFetcher<typeof action>();
  const sending = fetcher.state !== "idle";
  const sent = fetcher.data?.ok === true;
  const errors = fetcher.data?.ok === false ? fetcher.data.errors : {};
  const thanksRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so screen readers and keyboard users land on it.
  useEffect(() => {
    if (sent) thanksRef.current?.focus();
  }, [sent]);

  return (
    <Section id="contact" index={5} title="Contact">
      <div className="glass grid gap-8 rounded-2xl p-6 sm:p-8 md:grid-cols-[3fr_2fr]">
        {sent ? (
          <div
            ref={thanksRef}
            tabIndex={-1}
            className="flex flex-col items-start gap-4 outline-none"
          >
            <p className="text-2xl font-semibold tracking-tight">
              Message sent. Thanks for writing.
            </p>
            <p className="max-w-prose text-lg leading-relaxed opacity-80">
              I usually reply within a day or two, to the email you gave.
            </p>
            <button
              type="button"
              onClick={() => fetcher.reset()}
              className={`rounded underline decoration-current/30 underline-offset-4 hover:decoration-current ${focusRing}`}
            >
              Send another message
            </button>
          </div>
        ) : (
          <fetcher.Form
            method="post"
            action="/?index"
            noValidate
            className="flex flex-col gap-5"
          >
            <p className="max-w-prose text-lg leading-relaxed">
              Have a project in mind, a question, or just want to say hi? Leave
              a note and I'll get back to you.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" error={errors.name}>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={field}
                />
              </Field>
              <Field label="Email" name="email" error={errors.email}>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={field}
                />
              </Field>
            </div>

            <Field label="Message" name="message" error={errors.message}>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${field} resize-y`}
              />
            </Field>

            {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] size-px opacity-0"
            />

            <button type="submit" disabled={sending} className={`self-start ${pillButton}`}>
              {sending ? "Sending…" : "Send message"}
            </button>
          </fetcher.Form>
        )}

        <div className="flex flex-col gap-3 md:border-l md:border-current/20 md:pl-8">
          <p className="opacity-70">Or find me elsewhere</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono md:flex-col">
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded underline decoration-current/30 underline-offset-4 hover:decoration-current ${focusRing}`}
                >
                  {label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`contact-${name}`} className="font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`contact-${name}-error`} className="text-sm text-red-800 dark:text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
