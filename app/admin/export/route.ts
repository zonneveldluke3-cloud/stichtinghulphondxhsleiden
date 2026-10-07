import { NextResponse } from "next/server";
import { LEVELS } from "@/config/registration";
import { isAdmin } from "@/lib/admin-auth";
import { paymentReference } from "@/lib/payments";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Row = {
  id: string;
  contact_name: string;
  email: string;
  phone: string;
  total_amount: number | string;
  payment_status: string;
  paid_at: string | null;
  created_at: string;
  teams: { team_name: string; contact_name: string; email: string; extra_fields: Record<string, string> | null }[] | null;
};

const fmt = new Intl.DateTimeFormat("nl-NL", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Amsterdam" });

/** Zet een waarde veilig in een CSV-cel (ook tegen formules in Excel). */
function cell(value: unknown): string {
  let v = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
  return `"${v.replace(/"/g, '""')}"`;
}

/** Download alle teams als CSV (opent in Excel). Alleen voor ingelogde beheerders. */
export async function GET() {
  if (!(await isAdmin())) {
    return new NextResponse("Niet ingelogd", { status: 401 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("registrations")
    .select(
      "id, contact_name, email, phone, total_amount, payment_status, paid_at, created_at, teams(team_name, contact_name, email, extra_fields)",
    )
    .order("created_at", { ascending: true });
  if (error) return new NextResponse(`Fout: ${error.message}`, { status: 500 });

  const header = [
    "Kenmerk",
    "Teamnaam",
    "Niveau",
    "Contact team",
    "E-mail team",
    "Ingeschreven door",
    "E-mail",
    "Telefoon",
    "Status",
    "Bedrag inschrijving",
    "Ingeschreven op",
    "Betaald op",
  ];
  const lines = [header.map(cell).join(";")];

  for (const r of (data ?? []) as Row[]) {
    for (const t of r.teams ?? []) {
      const level = t.extra_fields?.level;
      lines.push(
        [
          paymentReference(r.id),
          t.team_name,
          LEVELS.find((l) => l.value === level)?.label ?? level ?? "",
          t.contact_name,
          t.email,
          r.contact_name,
          r.email,
          r.phone,
          r.payment_status,
          Number(r.total_amount).toFixed(2).replace(".", ","),
          fmt.format(new Date(r.created_at)),
          r.paid_at ? fmt.format(new Date(r.paid_at)) : "",
        ]
          .map(cell)
          .join(";"),
      );
    }
  }

  // BOM zodat Excel de é's en ë's goed toont; ";" is het standaard scheidingsteken in NL-Excel.
  const csv = "﻿" + lines.join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="teams-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
