const euro = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

/** 6000 -> "€ 60,00" */
export function formatEuro(cents: number): string {
  return euro.format(cents / 100);
}

/** 6000 -> "60" (zonder decimalen als het een rond bedrag is) */
export function formatEuroShort(cents: number): string {
  const value = cents / 100;
  return Number.isInteger(value) ? `€${value}` : formatEuro(cents);
}
