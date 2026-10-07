"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  GENERAL_FIELDS,
  MAX_TEAMS,
  TOTAL_TEAM_CAPACITY,
  MIN_TEAMS,
  PRICE_PER_TEAM_CENTS,
  TEAM_FIELDS,
  totalCents,
} from "@/config/registration";
import { formatEuro } from "@/lib/format";
import { flattenIssues, registrationSchema } from "@/lib/validation";
import { Field, fieldId } from "@/components/form/Field";
import { AlertIcon, ArrowRightIcon, CheckIcon, LockIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";

type Values = Record<string, string>;

const emptyValues = (fields: { name: string }[]): Values =>
  Object.fromEntries(fields.map((f) => [f.name, ""]));

function newKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  // Fallback voor oudere browsers
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (Number(c) ^ (Math.random() * 16) >> (Number(c) / 4)).toString(16),
  );
}

export function RegistrationForm() {
  const [teamCount, setTeamCount] = useState(MIN_TEAMS);
  const [general, setGeneral] = useState<Values>(() => emptyValues(GENERAL_FIELDS));
  const [teams, setTeams] = useState<Values[]>(() =>
    Array.from({ length: MAX_TEAMS }, () => emptyValues(TEAM_FIELDS)),
  );
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Zelfde sleutel bij een herhaalde poging = geen dubbele inschrijving.
  const idempotencyKey = useRef<string | null>(null);
  const submittingRef = useRef(false);

  // Terug via de "vorige"-knop vanaf de bevestigingspagina? Formulier weer vrijgeven.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        submittingRef.current = false;
        setSubmitting(false);
      }
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  // Vrije plekken ophalen (vol of gesloten → formulier dicht)
  const [spots, setSpots] = useState<{ open: boolean; reason: "full" | "closed" | null; remaining: number | null } | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/plekken", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setSpots(data);
        if (typeof data.remaining === "number" && data.remaining > 0) {
          setTeamCount((c) => Math.min(c, data.remaining));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  const maxTeams =
    spots && typeof spots.remaining === "number" ? Math.max(MIN_TEAMS, Math.min(MAX_TEAMS, spots.remaining)) : MAX_TEAMS;

  const total = totalCents(teamCount);

  function touched(key: string) {
    idempotencyKey.current = null; // gegevens gewijzigd → nieuw verzoek
    setFormError(null);
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function changeCount(delta: number) {
    const next = Math.min(maxTeams, Math.max(MIN_TEAMS, teamCount + delta));
    if (next === teamCount) return;
    touched("teams");
    setTeamCount(next);
  }

  function setGeneralValue(name: string, value: string) {
    touched(`general.${name}`);
    setGeneral((prev) => ({ ...prev, [name]: value }));
  }

  function setTeamValue(index: number, name: string, value: string) {
    touched(`teams.${index}.${name}`);
    setTeams((prev) => prev.map((t, i) => (i === index ? { ...t, [name]: value } : t)));
  }

  function copyContactToTeam(index: number) {
    idempotencyKey.current = null;
    setTeams((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, contact_name: general.contact_name, email: general.email } : t,
      ),
    );
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`teams.${index}.contact_name`];
      delete next[`teams.${index}.email`];
      return next;
    });
  }

  function focusFirstError(errs: Record<string, string>) {
    const order = [
      ...GENERAL_FIELDS.map((f) => `general.${f.name}`),
      ...Array.from({ length: teamCount }, (_, i) => TEAM_FIELDS.map((f) => `teams.${i}.${f.name}`)).flat(),
      "acceptTerms",
    ];
    const first = order.find((k) => errs[k]);
    if (!first) return;
    const el = document.getElementById(fieldId(first));
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submittingRef.current) return; // voorkomt dubbel verzenden
    setFormError(null);

    if (!idempotencyKey.current) idempotencyKey.current = newKey();

    const payload = {
      idempotencyKey: idempotencyKey.current,
      general,
      teams: teams.slice(0, teamCount),
      acceptTerms,
      website: honeypot,
    };

    const check = registrationSchema.safeParse(payload);
    if (!check.success) {
      const errs = flattenIssues(check.error);
      setErrors(errs);
      setFormError("Controleer de gemarkeerde velden.");
      focusFirstError(errs);
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        redirectUrl?: string;
        message?: string;
        fieldErrors?: Record<string, string>;
      };

      if (res.ok && data.ok && data.redirectUrl) {
        // Laat de knop op "bezig" staan tot de bevestigingspagina geladen is.
        window.location.assign(data.redirectUrl);
        return;
      }

      if (data.fieldErrors) {
        setErrors(data.fieldErrors);
        focusFirstError(data.fieldErrors);
      }
      setFormError(data.message ?? "Er ging iets mis. Probeer het opnieuw.");
    } catch {
      setFormError("Geen verbinding. Controleer je internet en probeer het opnieuw.");
    }

    submittingRef.current = false;
    setSubmitting(false);
  }

  const termsError = errors.acceptTerms;

  if (spots && !spots.open) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-ink/5 sm:p-12">
        <p className="font-display text-3xl font-extrabold text-ink">
          {spots.reason === "closed" ? "De inschrijving is gesloten" : "Het toernooi is vol!"}
        </p>
        <p className="mx-auto mt-3 max-w-xl text-lg text-ink/70">
          {spots.reason === "closed"
            ? "Het toernooi is al begonnen. Bedankt voor je interesse! Je kunt Stichting Hulphond nog steeds steunen met een donatie."
            : "Alle plekken zijn bezet. Wil je op de reservelijst? Stuur ons een mail, dan laten we het je weten als er een plek vrijkomt."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="#doneren" className="rounded-full bg-ball px-6 py-3 font-bold text-ink hover:bg-ink hover:text-white">
            Doneren
          </a>
          <a href="#contact" className="rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-court">
            Contact
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
      <div className="space-y-6">
        {/* ── Stap 1: aantal teams ─────────────────────────────── */}
        <div role="group" aria-labelledby="step-1" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8">
          <StepTitle id="step-1" n={1} title="Hoeveel teams wil je inschrijven?" />
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3" role="group" aria-label="Aantal teams">
              <button
                type="button"
                onClick={() => changeCount(-1)}
                disabled={teamCount <= MIN_TEAMS}
                aria-label="Eén team minder"
                className="grid h-14 w-14 place-items-center rounded-2xl bg-sand text-ink transition hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-sand disabled:hover:text-ink"
              >
                <MinusIcon className="h-6 w-6" />
              </button>
              <output
                aria-live="polite"
                className="w-20 text-center font-display text-5xl font-extrabold tabular-nums"
              >
                {teamCount}
              </output>
              <button
                type="button"
                onClick={() => changeCount(1)}
                disabled={teamCount >= maxTeams}
                aria-label="Eén team meer"
                className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white transition hover:bg-court disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-ink"
              >
                <PlusIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-lg text-ink/70">
              {teamCount} × {formatEuro(PRICE_PER_TEAM_CENTS)} ={" "}
              <strong key={total} className="animate-bump inline-block font-display text-2xl font-extrabold text-ink">
                {formatEuro(total)}
              </strong>
            </p>
          </div>
          <p className="mt-4 text-sm text-ink/55">
            Minimaal {MIN_TEAMS}, maximaal {MAX_TEAMS} teams per inschrijving.
            {spots && typeof spots.remaining === "number" && (
              <>
                {" "}
                <strong className="font-bold text-court">
                  Nog {spots.remaining} van de {TOTAL_TEAM_CAPACITY} plekken vrij.
                </strong>
              </>
            )}
          </p>
          {errors.teams && <p className="mt-2 text-sm font-medium text-danger">{errors.teams}</p>}
        </div>

        {/* ── Stap 2: algemene gegevens ─────────────────────────── */}
        <div role="group" aria-labelledby="step-2" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8">
          <StepTitle id="step-2" n={2} title="Jouw gegevens" />
          <p className="mt-2 text-ink/60">We gebruiken deze gegevens alleen voor de bevestiging en vragen over je inschrijving.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {GENERAL_FIELDS.map((f) => (
              <Field
                key={f.name}
                def={f}
                path={`general.${f.name}`}
                value={general[f.name] ?? ""}
                error={errors[`general.${f.name}`]}
                onChange={(v) => setGeneralValue(f.name, v)}
              />
            ))}
          </div>
        </div>

        {/* ── Stap 3: teams ─────────────────────────────────────── */}
        <div role="group" aria-labelledby="step-3" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8">
          <StepTitle id="step-3" n={3} title={teamCount === 1 ? "Teamgegevens" : `Gegevens van je ${teamCount} teams`} />
          <div className="mt-6 space-y-5">
            {teams.slice(0, teamCount).map((team, i) => (
              <fieldset key={i} className="animate-pop rounded-2xl border border-ink/10 bg-paper p-5 sm:p-6">
                <legend className="sr-only">Team {i + 1}</legend>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 font-display text-xl font-bold" aria-hidden>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-ball text-sm font-extrabold">{i + 1}</span>
                    Team {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyContactToTeam(i)}
                    disabled={!general.contact_name && !general.email}
                    className="rounded-full px-3 py-1.5 text-sm font-semibold text-court ring-1 ring-court/25 transition hover:bg-court hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-court"
                  >
                    Ik ben de contactpersoon
                  </button>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {TEAM_FIELDS.map((f) => (
                    <Field
                      key={f.name}
                      def={f}
                      path={`teams.${i}.${f.name}`}
                      value={team[f.name] ?? ""}
                      error={errors[`teams.${i}.${f.name}`]}
                      onChange={(v) => setTeamValue(i, f.name, v)}
                    />
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          {teamCount < maxTeams && (
            <button
              type="button"
              onClick={() => changeCount(1)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink/15 py-4 font-semibold text-ink/60 transition hover:border-court hover:text-court"
            >
              <PlusIcon className="h-5 w-5" /> Nog een team toevoegen
            </button>
          )}
        </div>

        {/* Honeypot tegen spambots — onzichtbaar voor bezoekers */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>
      </div>

      {/* ── Overzicht + betalen ───────────────────────────────── */}
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-3xl bg-ink p-6 text-white shadow-xl sm:p-8">
          <h3 className="font-display text-2xl font-extrabold">Overzicht</h3>
          <dl className="mt-6 space-y-3 text-[17px]">
            <div className="flex justify-between gap-4">
              <dt className="text-white/65">Aantal teams</dt>
              <dd className="font-semibold tabular-nums">{teamCount}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/65">Prijs per team</dt>
              <dd className="font-semibold tabular-nums">{formatEuro(PRICE_PER_TEAM_CENTS)}</dd>
            </div>
            <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-4">
              <dt className="font-semibold">Totaalbedrag</dt>
              <dd key={total} className="animate-bump font-display text-4xl font-extrabold tabular-nums text-ball">
                {formatEuro(total)}
              </dd>
            </div>
          </dl>

          <div className="mt-7">
            <label htmlFor={fieldId("acceptTerms")} className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug text-white/85">
              <span className="relative mt-0.5 grid h-6 w-6 shrink-0 place-items-center">
                <input
                  id={fieldId("acceptTerms")}
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    touched("acceptTerms");
                    setAcceptTerms(e.target.checked);
                  }}
                  aria-invalid={termsError ? true : undefined}
                  aria-describedby={termsError ? "terms-error" : undefined}
                  className={`peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 bg-white/5 transition checked:border-ball checked:bg-ball ${
                    termsError ? "border-danger" : "border-white/40"
                  }`}
                />
                <CheckIcon className="pointer-events-none absolute h-4 w-4 text-ink opacity-0 peer-checked:opacity-100" />
              </span>
              <span>
                Ik ga akkoord met de{" "}
                <Link href="/voorwaarden" target="_blank" className="font-semibold text-white underline underline-offset-2 hover:text-ball">
                  deelnamevoorwaarden
                </Link>{" "}
                en de{" "}
                <Link href="/privacy" target="_blank" className="font-semibold text-white underline underline-offset-2 hover:text-ball">
                  privacyverklaring
                </Link>
                .
              </span>
            </label>
            {termsError && (
              <p id="terms-error" className="mt-2 rounded-lg bg-danger/20 px-3 py-2 text-sm font-medium text-white">
                {termsError}
              </p>
            )}
          </div>

          {formError && (
            <div role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-danger">
              <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {formError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ball px-6 py-4 text-lg font-extrabold text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
          >
            {submitting ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-ink/25 border-t-ink" aria-hidden />
                Even geduld…
              </>
            ) : (
              <>
                Inschrijven en betalen
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-white/55">
            <LockIcon className="h-4 w-4" /> Na het inschrijven krijg je direct de betaallink
          </p>
        </div>
      </aside>
    </form>
  );
}

function StepTitle({ id, n, title }: { id: string; n: number; title: string }) {
  return (
    <h3 id={id} className="flex items-center gap-3 font-display text-2xl font-extrabold leading-tight">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-court text-base text-white">{n}</span>
      {title}
    </h3>
  );
}
