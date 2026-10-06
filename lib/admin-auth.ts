import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getAdminPassword } from "@/lib/env";

/**
 * Beveiliging van /admin
 * ──────────────────────
 * - Inloggen met het wachtwoord uit de environment variable ADMIN_PASSWORD.
 * - Na inloggen krijgt de browser een cookie met een ondertekende sessie
 *   (HMAC-SHA256). Het cookie is httpOnly (JavaScript kan er niet bij),
 *   secure (alleen via https) en sameSite=strict.
 * - De handtekening is gebaseerd op het wachtwoord + de Supabase secret key.
 *   Verander je ADMIN_PASSWORD, dan worden alle sessies direct ongeldig.
 * - Iedere beheeractie (zoals "Markeer als betaald") controleert de sessie
 *   opnieuw op de server.
 */

export const ADMIN_COOKIE = "admin_session";
export const SESSION_HOURS = 8;

function signingKey(password: string): Buffer {
  return createHash("sha256")
    .update(`admin-session:${password}:${process.env.SUPABASE_SECRET_KEY ?? ""}`)
    .digest();
}

function sign(expiresAt: number, password: string): string {
  return createHmac("sha256", signingKey(password)).update(String(expiresAt)).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** Controleert een ingevoerd wachtwoord (tijd-constant). */
export function checkPassword(input: string): boolean {
  const password = getAdminPassword();
  if (!password) return false;
  return safeEqual(input, password);
}

export function createSessionToken(): { token: string; maxAge: number } {
  const password = getAdminPassword();
  if (!password) throw new Error("ADMIN_PASSWORD is niet ingesteld.");
  const maxAge = SESSION_HOURS * 60 * 60;
  const expiresAt = Date.now() + maxAge * 1000;
  return { token: `${expiresAt}.${sign(expiresAt, password)}`, maxAge };
}

function verifyToken(token: string | undefined): boolean {
  const password = getAdminPassword();
  if (!password || !token) return false;
  const [expStr, signature] = token.split(".");
  const expiresAt = Number(expStr);
  if (!Number.isFinite(expiresAt) || !signature || expiresAt < Date.now()) return false;
  return safeEqual(signature, sign(expiresAt, password));
}

/** Is de huidige bezoeker ingelogd als beheerder? */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

/** Gebruik dit bovenaan iedere beheeractie. Gooit een fout als je niet bent ingelogd. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Error("Niet ingelogd als beheerder.");
}
