import { createClient } from "@supabase/supabase-js";

/**
 * OPTIONEEL — browser-client met de publishable key.
 *
 * De inschrijfflow gebruikt deze client bewust NIET: alle database-acties
 * lopen via de server (zie lib/supabase/admin.ts). Omdat Row Level Security
 * aanstaat zonder policies, kan deze client geen persoonsgegevens lezen of
 * schrijven. Hij staat hier klaar voor eventuele toekomstige publieke data.
 */
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL of NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ontbreekt.",
    );
  }
  return createClient(url, key);
}
