import "server-only";

/**
 * Leest server-side environment variables. Gooit een duidelijke fout
 * wanneer iets ontbreekt, zodat je meteen ziet wat je moet instellen.
 * Secrets staan NOOIT in de code — alleen in .env.local of in Vercel.
 */
function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(
      `Environment variable ${name} ontbreekt. Zie .env.example en README.md.`,
    );
  }
  return value.trim();
}

export function getSupabaseEnv() {
  return {
    url: required("NEXT_PUBLIC_SUPABASE_URL"),
    secretKey: required("SUPABASE_SECRET_KEY"),
  };
}

/**
 * De externe betaallink (bijv. Tikkie of betaalverzoek van je bank).
 * Wordt ingesteld via de environment variable PAYMENT_URL.
 * Geeft null terug als hij ontbreekt of geen geldige https-link is.
 */
export function getPaymentUrl(): string | null {
  const value = process.env.PAYMENT_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/** Minimale lengte van het beheerderswachtwoord. */
export const ADMIN_PASSWORD_MIN_LENGTH = 12;

/** Het beheerderswachtwoord, of null als het (nog) niet goed is ingesteld. */
export function getAdminPassword(): string | null {
  const value = process.env.ADMIN_PASSWORD;
  if (!value || value.length < ADMIN_PASSWORD_MIN_LENGTH) return null;
  return value;
}
