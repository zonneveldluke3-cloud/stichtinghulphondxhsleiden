import { NextResponse, type NextRequest } from "next/server";
import { TEAM_CORE_COLUMNS, TEAM_FIELDS, registrationIsClosed, totalCents } from "@/config/registration";
import { getRemainingSpots } from "@/lib/capacity";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { flattenIssues, registrationSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;

function jsonError(status: number, message: string, fieldErrors?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, fieldErrors }, { status });
}

export async function POST(request: NextRequest) {
  // ── 1. Basiscontroles op het request ────────────────────────────
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonError(415, "Ongeldig verzoek.");
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return jsonError(403, "Ongeldig verzoek.");
    } catch {
      return jsonError(403, "Ongeldig verzoek.");
    }
  }

  if (!rateLimit(`register:${getClientIp(request.headers)}`)) {
    return jsonError(429, "Te veel pogingen. Probeer het over een paar minuten opnieuw.");
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return jsonError(413, "Verzoek is te groot.");
    raw = JSON.parse(text);
  } catch {
    return jsonError(400, "Ongeldig verzoek.");
  }

  // ── 2. Validatie (server is leidend) ────────────────────────────
  const parsed = registrationSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonError(422, "Controleer de gemarkeerde velden.", flattenIssues(parsed.error));
  }
  const input = parsed.data;

  // Honeypot ingevuld → waarschijnlijk een bot; niets opslaan.
  if (input.website) {
    return jsonError(400, "Ongeldig verzoek.");
  }

  // ── 3. Bedrag ALTIJD server-side berekenen ──────────────────────
  const numberOfTeams = input.teams.length;
  const amountCents = totalCents(numberOfTeams);

  const extraFieldNames = TEAM_FIELDS.map((f) => f.name).filter(
    (n) => !(TEAM_CORE_COLUMNS as readonly string[]).includes(n),
  );

  const teamsPayload = input.teams.map((t) => ({
    team_name: t.team_name,
    contact_name: t.contact_name,
    email: t.email.toLowerCase(),
    extra_fields: Object.fromEntries(extraFieldNames.map((n) => [n, t[n] ?? ""])),
  }));

  // ── Inschrijving gesloten of vol? ──────────────────────────────
  if (registrationIsClosed()) {
    return jsonError(409, "De inschrijving is gesloten. Het toernooi is al begonnen.");
  }

  try {
    const remaining = await getRemainingSpots();
    if (numberOfTeams > remaining) {
      return jsonError(
        409,
        remaining === 0
          ? "Het toernooi is helaas vol. Mail ons als je op de reservelijst wilt."
          : `Er ${remaining === 1 ? "is nog maar 1 plek" : `zijn nog maar ${remaining} plekken`} vrij. Kies minder teams.`,
      );
    }

    const supabase = getSupabaseAdmin();

    // ── 4. Inschrijving opslaan met status "pending" ──────────────
    const { data, error } = await supabase.rpc("create_registration", {
      p_contact_name: input.general.contact_name,
      p_email: input.general.email.toLowerCase(),
      p_phone: input.general.phone,
      p_total_amount: amountCents / 100,
      p_idempotency_key: input.idempotencyKey,
      p_teams: teamsPayload,
    });
    if (error) throw new Error(`Supabase: ${error.message}`);

    const row = Array.isArray(data) ? data[0] : data;
    const registrationId: string | undefined = row?.out_registration_id;
    if (!registrationId) throw new Error("Geen registration ID ontvangen.");

    // ── 5. Klaar: door naar de bevestigingspagina met de betaalknop ─
    // (Bij een dubbele klik bestaat de inschrijving al; dan sturen we
    // gewoon naar dezelfde bevestigingspagina. Er wordt niets dubbel opgeslagen.)
    return NextResponse.json({
      ok: true,
      redirectUrl: `/inschrijving/bevestiging?rid=${registrationId}`,
    });
  } catch (err) {
    console.error("[api/registrations]", err);
    return jsonError(
      500,
      "Er ging iets mis bij het opslaan van je inschrijving. Probeer het opnieuw of neem contact met ons op.",
    );
  }
}

export function GET() {
  return jsonError(405, "Methode niet toegestaan.");
}
