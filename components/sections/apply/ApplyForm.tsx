"use client";

import { useActionState, useState, type ReactNode } from "react";
import { submitApplication, type ApplyField, type ApplyState } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { apply } from "@/lib/content";
import { cn } from "@/lib/utils";

const initial: ApplyState = { status: "idle" };

const inputBase =
  "w-full rounded-xl border bg-paper px-4 text-[0.975rem] text-ink-950 placeholder:text-steel-400 transition-[border-color,box-shadow,background-color] duration-300 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgb(16_140_232/0.14)] focus:outline-none";

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: ApplyField;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`apply-${name}`} className="flex items-baseline justify-between text-sm font-semibold text-ink-900">
        {label}
        {optional && <span className="text-xs font-normal text-steel-400">Optional</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`apply-${name}-error`} className="mt-1.5 text-sm text-danger-500">
          {error}
        </p>
      )}
    </div>
  );
}

export function ApplyForm() {
  const [state, action, pending] = useActionState(submitApplication, initial);
  // A success result stays on screen until the visitor chooses to send another.
  const [dismissed, setDismissed] = useState<ApplyState | null>(null);
  const done = state.status === "success" && state !== dismissed;
  const errors = state.errors ?? {};
  const v = state.values ?? {};

  const aria = (name: ApplyField) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `apply-${name}-error` } : {};
  const border = (name: ApplyField) => (errors[name] ? "border-danger-500" : "border-ink-900/12");

  if (done) {
    return (
      <div
        ref={(el) => el?.focus()}
        tabIndex={-1}
        role="status"
        className="flex min-h-[32rem] flex-col items-center justify-center rounded-[1.75rem] bg-white p-10 text-center text-ink-950 shadow-[0_50px_100px_-40px_rgb(0_0_0/0.6)] outline-none"
      >
        <svg viewBox="0 0 64 64" className="size-20" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="30" stroke="#108CE8" strokeOpacity=".2" strokeWidth="2" />
          <circle cx="32" cy="32" r="30" stroke="#108CE8" strokeWidth="2.5" pathLength={1} className="success-ring" />
          <path d="m20 33 8 8 16-17" stroke="#108CE8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="success-check" />
        </svg>
        <p className="mt-8 text-2xl font-extrabold tracking-[-0.03em]">Application received</p>
        <p className="mt-3 max-w-[34ch] leading-relaxed text-steel-600">{state.message}</p>
        <button
          type="button"
          onClick={() => setDismissed(state)}
          className="link-draw mt-8 text-sm font-semibold text-blue-500"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="rounded-[1.75rem] bg-white p-6 text-ink-950 shadow-[0_50px_100px_-40px_rgb(0_0_0/0.6)] sm:p-9"
      aria-describedby="apply-form-note"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xl font-extrabold tracking-[-0.02em]">Free website application</p>
        <span className="mono-label hidden rounded-full bg-blue-500/10 px-3 py-1 !text-[0.62rem] text-blue-500 sm:inline-block">~2 min</span>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" error={errors.name}>
          <input id="apply-name" name="name" autoComplete="name" required defaultValue={v.name} className={cn(inputBase, "h-12", border("name"))} {...aria("name")} />
        </Field>
        <Field label="Business name" name="business" error={errors.business}>
          <input
            id="apply-business"
            name="business"
            autoComplete="organization"
            required
            defaultValue={v.business}
            className={cn(inputBase, "h-12", border("business"))}
            {...aria("business")}
          />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <input
            id="apply-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={v.email}
            className={cn(inputBase, "h-12", border("email"))}
            {...aria("email")}
          />
        </Field>
        <Field label="Type of business" name="type" error={errors.type}>
          <div className="relative">
            <select
              id="apply-type"
              name="type"
              required
              defaultValue={v.type ?? ""}
              className={cn(inputBase, "h-12 appearance-none pr-10", border("type"))}
              {...aria("type")}
            >
              <option value="" disabled>
                Choose one…
              </option>
              {apply.businessTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 16 16" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-steel-500" fill="none" aria-hidden="true">
              <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Current website" name="website" error={errors.website} optional>
            <input
              id="apply-website"
              name="website"
              inputMode="url"
              placeholder="yourbusiness.com"
              defaultValue={v.website}
              className={cn(inputBase, "h-12", border("website"))}
              {...aria("website")}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Tell us about your business" name="message" error={errors.message} optional>
            <textarea
              id="apply-message"
              name="message"
              rows={3}
              placeholder="Services, location, what you'd love your new site to do…"
              defaultValue={v.message}
              className={cn(inputBase, "resize-none py-3", border("message"))}
              {...aria("message")}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-5 rounded-xl bg-danger-500/8 px-4 py-3 text-sm text-danger-500">
          {state.message}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="solid" disabled={pending} className="w-full sm:w-auto" aria-busy={pending}>
          {pending ? "Sending application…" : "Apply for free"}
        </Button>
        <p id="apply-form-note" className="text-xs leading-relaxed text-steel-500 sm:max-w-[16rem]">
          No payment details needed. We&apos;ll only use your details to contact you about your website.
        </p>
      </div>
    </form>
  );
}
