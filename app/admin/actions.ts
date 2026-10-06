"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, checkPassword, createSessionToken, requireAdmin } from "@/lib/admin-auth";
import { getAdminPassword } from "@/lib/env";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { UUID_RE } from "@/lib/validation";

/**
 * Server actions voor /admin. Deze draaien ALTIJD op de server.
 * Iedere actie die iets wijzigt controleert eerst of je bent ingelogd
 * (requireAdmin). Een bezoeker kan deze acties dus niet misbruiken via
 * de developer tools van zijn browser.
 */

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!getAdminPassword()) {
    return { error: "De beheerpagina is nog niet ingesteld (ADMIN_PASSWORD ontbreekt of is te kort)." };
  }

  const ip = getClientIp(await headers());
  if (!rateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000)) {
    return { error: "Te veel pogingen. Probeer het over 15 minuten opnieuw." };
  }

  const password = String(formData.get("password") ?? "");
  // Kleine vertraging maakt raden van wachtwoorden extra traag.
  await new Promise((r) => setTimeout(r, 400));

  if (!checkPassword(password)) {
    return { error: "Onjuist wachtwoord." };
  }

  const { token, maxAge } = createSessionToken();
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge,
  });
  revalidatePath("/admin");
  return {};
}

export async function logout(): Promise<void> {
  (await cookies()).delete(ADMIN_COOKIE);
  revalidatePath("/admin");
}

function getId(formData: FormData): string {
  const id = String(formData.get("id") ?? "");
  if (!UUID_RE.test(id)) throw new Error("Ongeldige inschrijving.");
  return id;
}

/** Zet een inschrijving op "paid" met de huidige datum en tijd. */
export async function markAsPaid(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = getId(formData);

  const { error } = await getSupabaseAdmin()
    .from("registrations")
    .update({ payment_status: "paid", paid_at: new Date().toISOString() })
    .eq("id", id)
    .neq("payment_status", "paid");
  if (error) throw new Error(`Supabase: ${error.message}`);

  revalidatePath("/admin");
}

/** Voor als je per ongeluk op "Markeer als betaald" klikte. */
export async function markAsPending(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = getId(formData);

  const { error } = await getSupabaseAdmin()
    .from("registrations")
    .update({ payment_status: "pending", paid_at: null })
    .eq("id", id)
    .eq("payment_status", "paid");
  if (error) throw new Error(`Supabase: ${error.message}`);

  revalidatePath("/admin");
}
