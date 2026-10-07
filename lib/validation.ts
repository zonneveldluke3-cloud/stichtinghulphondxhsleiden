import { z } from "zod";
import {
  GENERAL_FIELDS,
  MAX_TEAMS,
  MIN_TEAMS,
  TEAM_FIELDS,
  type FieldDef,
} from "@/config/registration";

/**
 * Eén validatieschema voor browser én server. De server valideert altijd
 * opnieuw; de browservalidatie is alleen voor gebruiksgemak.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{8,20}$/;

function fieldSchema(field: FieldDef) {
  let schema = z
    .string({ error: `${field.label} is verplicht.` })
    .trim()
    .max(field.maxLength, {
      error: `${field.label} mag maximaal ${field.maxLength} tekens bevatten.`,
    });

  if (field.required) {
    schema = schema.min(1, {
      error: field.type === "select" ? `Kies het ${field.label.toLowerCase()}.` : `${field.label} is verplicht.`,
    });
  }

  if (field.type === "select") {
    const allowed = (field.options ?? []).map((o) => o.value);
    return schema.refine((v) => (v === "" && !field.required) || allowed.includes(v), {
      error: `Kies een ${field.label.toLowerCase()}.`,
    });
  }

  if (field.type === "email") {
    return schema.refine((v) => v === "" || EMAIL_RE.test(v), {
      error: "Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.",
    });
  }

  if (field.type === "tel") {
    return schema.refine(
      (v) => v === "" || (PHONE_RE.test(v) && v.replace(/\D/g, "").length >= 9),
      { error: "Vul een geldig telefoonnummer in, bijvoorbeeld 06 12345678." },
    );
  }

  return schema;
}

function objectFromFields(fields: FieldDef[]) {
  return z.object(
    Object.fromEntries(fields.map((f) => [f.name, fieldSchema(f)])) as Record<
      string,
      ReturnType<typeof fieldSchema>
    >,
  );
}

export const teamSchema = objectFromFields(TEAM_FIELDS);
export const generalSchema = objectFromFields(GENERAL_FIELDS);

export const registrationSchema = z.object({
  idempotencyKey: z.uuid({ error: "Ongeldige aanvraag." }),
  general: generalSchema,
  teams: z
    .array(teamSchema)
    .min(MIN_TEAMS, { error: `Schrijf minimaal ${MIN_TEAMS} team in.` })
    .max(MAX_TEAMS, { error: `Je kunt maximaal ${MAX_TEAMS} teams per keer inschrijven.` }),
  acceptTerms: z.literal(true, {
    error: "Je moet akkoord gaan met de deelnamevoorwaarden en de privacyverklaring.",
  }),
  /** Honeypot: echte bezoekers zien dit veld niet en laten het leeg. */
  website: z.string().max(0).optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

/** Zet zod-fouten om naar { "teams.0.email": "melding" } */
export function flattenIssues(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}

export const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
