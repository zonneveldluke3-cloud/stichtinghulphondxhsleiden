import { NextResponse } from "next/server";
import { registrationIsClosed } from "@/config/registration";
import { getRemainingSpots } from "@/lib/capacity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Openbaar: alleen het aantal vrije plekken, geen persoonsgegevens. */
export async function GET() {
  if (registrationIsClosed()) {
    return NextResponse.json({ open: false, reason: "closed", remaining: 0 });
  }
  try {
    const remaining = await getRemainingSpots();
    return NextResponse.json(
      { open: remaining > 0, reason: remaining > 0 ? null : "full", remaining },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("[api/plekken]", err);
    // Bij een storing het formulier niet blokkeren; de server controleert bij verzenden opnieuw.
    return NextResponse.json({ open: true, reason: null, remaining: null });
  }
}
