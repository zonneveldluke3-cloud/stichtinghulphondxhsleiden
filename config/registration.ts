/**
 * ─────────────────────────────────────────────────────────────
 *  INSCHRIJFINSTELLINGEN
 * ─────────────────────────────────────────────────────────────
 * Dit bestand wordt zowel in de browser als op de server gebruikt.
 * De server rekent het bedrag ALTIJD zelf uit op basis van deze
 * waarden — een bedrag uit de browser wordt nooit vertrouwd.
 */

/** Prijs per speler in centen (3000 = €30,00). */
export const PRICE_PER_PERSON_CENTS = 3000;

/** Aantal spelers per team. */
export const PLAYERS_PER_TEAM = 2;

/** Prijs per team in centen (2 × €30 = €60,00). */
export const PRICE_PER_TEAM_CENTS = PRICE_PER_PERSON_CENTS * PLAYERS_PER_TEAM;

export const CURRENCY = "EUR";

export const MIN_TEAMS = 1;
/** Maximum aantal teams per inschrijving (bijv. max 3). */
export const MAX_TEAMS = 3;

/** Maximaal aantal teams in het hele toernooi (48 spelers = 24 teams). */
export const TOTAL_TEAM_CAPACITY = 24;

/** Vanaf dit moment kan niemand zich meer inschrijven (start toernooi, Nederlandse tijd). */
export const REGISTRATION_CLOSES_AT = "2026-10-30T17:00:00+01:00";

export function registrationIsClosed(now: number = Date.now()): boolean {
  return now >= new Date(REGISTRATION_CLOSES_AT).getTime();
}

export type FieldType = "text" | "email" | "tel" | "select";

export interface FieldDef {
  /** Unieke sleutel. Gebruik snake_case. */
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  maxLength: number;
  placeholder?: string;
  autoComplete?: string;
  /** Neemt de hele breedte in op desktop */
  fullWidth?: boolean;
  /** Alleen voor type "select": de keuzes */
  options?: readonly { value: string; label: string }[];
}

/** Speelniveaus. De poules worden per niveau ingedeeld. */
export const LEVELS = [
  {
    value: "beginner",
    label: "Beginner",
    text: "Je speelt net of af en toe een potje. Plezier staat voorop en je hoeft nog niet alle regels te kennen.",
  },
  {
    value: "gemiddeld",
    label: "Gemiddeld",
    text: "Je speelt regelmatig, kent de regels en kunt de bal een tijdje in het spel houden.",
  },
  {
    value: "gevorderd",
    label: "Gevorderd",
    text: "Je speelt vaak of in competitie, gebruikt de wanden goed en houdt van een pittige wedstrijd.",
  },
] as const;

/**
 * Velden die per team worden gevraagd.
 *
 * De eerste drie (team_name, contact_name, email) hebben een eigen kolom
 * in de tabel `teams`. Ieder EXTRA veld dat je hier toevoegt, wordt
 * automatisch getoond, gevalideerd en opgeslagen in de kolom
 * `teams.extra_fields` (jsonb). Je hoeft dus geen database-migratie te
 * draaien om een veld toe te voegen.
 *
 * Voorbeeld van een extra veld:
 *   { name: "player_2_name", label: "Naam tweede speler", type: "text",
 *     required: false, maxLength: 100, placeholder: "Bijv. Sanne de Vries" },
 */
export const TEAM_FIELDS: FieldDef[] = [
  {
    name: "team_name",
    label: "Teamnaam",
    type: "text",
    required: true,
    maxLength: 60,
    placeholder: "Bijv. De Smashers",
    fullWidth: true,
  },
  {
    name: "level",
    label: "Niveau van het team",
    type: "select",
    required: true,
    maxLength: 20,
    options: LEVELS.map((l) => ({ value: l.value, label: l.label })),
    fullWidth: true,
  },
  {
    name: "contact_name",
    label: "Naam contactpersoon",
    type: "text",
    required: true,
    maxLength: 100,
    placeholder: "Voor- en achternaam",
    autoComplete: "off",
  },
  {
    name: "email",
    label: "E-mailadres",
    type: "email",
    required: true,
    maxLength: 254,
    placeholder: "naam@voorbeeld.nl",
    autoComplete: "off",
  },
];

/** Kolommen die een eigen databasekolom hebben in `teams`. */
export const TEAM_CORE_COLUMNS = ["team_name", "contact_name", "email"] as const;

/**
 * Algemene gegevens die één keer per inschrijving worden gevraagd
 * (opgeslagen in de tabel `registrations`).
 */
export const GENERAL_FIELDS: FieldDef[] = [
  {
    name: "contact_name",
    label: "Jouw naam",
    type: "text",
    required: true,
    maxLength: 100,
    placeholder: "Voor- en achternaam",
    autoComplete: "name",
    fullWidth: true,
  },
  {
    name: "email",
    label: "E-mailadres",
    type: "email",
    required: true,
    maxLength: 254,
    placeholder: "naam@voorbeeld.nl",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Telefoonnummer",
    type: "tel",
    required: true,
    maxLength: 20,
    placeholder: "06 12345678",
    autoComplete: "tel",
  },
];

export function totalCents(numberOfTeams: number): number {
  return numberOfTeams * PRICE_PER_TEAM_CENTS;
}
