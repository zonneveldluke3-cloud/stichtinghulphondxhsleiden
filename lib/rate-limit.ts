import "server-only";

/**
 * Eenvoudige rate limiter in het geheugen (per serverinstantie).
 * Genoeg om misbruik en dubbele requests af te remmen. Voor zwaardere
 * bescherming kun je dit vervangen door bijv. Upstash Redis of de
 * Vercel Firewall.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 10, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
    }
    return true;
  }

  entry.count += 1;
  return entry.count <= limit;
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
