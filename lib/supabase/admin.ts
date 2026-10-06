import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/env";

/**
 * Supabase-client met de SECRET key. Deze omzeilt Row Level Security en
 * mag daarom uitsluitend op de server worden gebruikt (API routes en
 * server components). Het `server-only` import zorgt ervoor dat de build
 * faalt als dit bestand per ongeluk in de browser terechtkomt.
 */
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;
  const { url, secretKey } = getSupabaseEnv();
  client = createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return client;
}

export type PaymentStatus = "pending" | "paid" | "failed" | "canceled" | "expired";

export interface RegistrationRow {
  id: string;
  contact_name: string;
  email: string;
  phone: string;
  number_of_teams: number;
  total_amount: number | string;
  currency: string;
  payment_status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
}
