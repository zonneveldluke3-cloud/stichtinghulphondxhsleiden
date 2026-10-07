import "server-only";
import { TOTAL_TEAM_CAPACITY } from "@/config/registration";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Aantal teams dat al een plek heeft: betaald én nog niet betaald (pending).
 * Geannuleerde/mislukte inschrijvingen tellen niet mee.
 * Verwijder je een inschrijving in Supabase of /admin, dan komt de plek weer vrij.
 */
export async function getTakenTeams(): Promise<number> {
  const { data, error } = await getSupabaseAdmin()
    .from("registrations")
    .select("number_of_teams")
    .in("payment_status", ["pending", "paid"]);
  if (error) throw new Error(`Supabase: ${error.message}`);
  return (data ?? []).reduce((n: number, r: { number_of_teams: number }) => n + r.number_of_teams, 0);
}

export async function getRemainingSpots(): Promise<number> {
  return Math.max(0, TOTAL_TEAM_CAPACITY - (await getTakenTeams()));
}
