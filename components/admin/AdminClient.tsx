"use client";

import { useActionState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { login, markAsPaid, markAsPending, type LoginState } from "@/app/admin/actions";
import { AlertIcon, CheckIcon, LockIcon } from "@/components/ui/icons";

export function LoginForm() {
  const [state, action] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-[15px] font-semibold">
          Wachtwoord
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          autoFocus
          className="block w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base shadow-sm focus:border-court focus:outline-none focus:ring-4 focus:ring-court/15"
        />
      </div>
      {state.error && (
        <p role="alert" className="flex items-start gap-2 text-sm font-semibold text-danger">
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          {state.error}
        </p>
      )}
      <SubmitButton className="w-full rounded-full bg-ink px-6 py-3.5 font-bold text-white hover:bg-court">
        <LockIcon className="h-4 w-4" /> Inloggen
      </SubmitButton>
    </form>
  );
}

function SubmitButton({ children, className }: { children: ReactNode; className: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 transition disabled:cursor-wait disabled:opacity-60 ${className}`}
    >
      {pending ? "Bezig…" : children}
    </button>
  );
}

export function MarkPaidButton({ id, label }: { id: string; label: string }) {
  return (
    <form
      action={markAsPaid}
      onSubmit={(e) => {
        if (!window.confirm(`Weet je zeker dat je deze inschrijving als betaald wilt markeren?\n\n${label}`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton className="w-full rounded-full bg-success px-5 py-2.5 text-sm font-bold text-white hover:bg-ink sm:w-auto">
        <CheckIcon className="h-4 w-4" /> Markeer als betaald
      </SubmitButton>
    </form>
  );
}

export function UndoPaidButton({ id, label }: { id: string; label: string }) {
  return (
    <form
      action={markAsPending}
      onSubmit={(e) => {
        if (!window.confirm(`Deze inschrijving terugzetten naar "pending" (niet betaald)?\n\n${label}`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton className="text-xs font-semibold text-ink/45 underline underline-offset-2 hover:text-danger">
        Ongedaan maken
      </SubmitButton>
    </form>
  );
}
