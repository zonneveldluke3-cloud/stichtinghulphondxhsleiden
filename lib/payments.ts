import "server-only";
import { getSupabaseAdmin, type RegistrationRow } from "@/lib/supabase/admin";

const REGISTRATION_COLUMNS =
  "id, contact_name, email, phone, number_of_teams, total_amount, currency, payment_status, paid_at, created_at";

export async function getRegistration(id: string): Promise<RegistrationRow | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("registrations")
    .select(REGISTRATION_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Supabase: ${error.message}`);
  return data as RegistrationRow | null;
}

/**
 * Korte, leesbare code om een betaling aan een inschrijving te koppelen.
 * De deelnemer zet deze in de omschrijving van de betaling; jij ziet
 * dezelfde code op de beheerpagina.
 */
export function paymentReference(registrationId: string): string {
  return registrationId.replace(/-/g, "").slice(0, 8).toUpperCase();
}
