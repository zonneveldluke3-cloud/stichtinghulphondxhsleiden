import Image from "next/image";
import type { Sponsor } from "@/config/event";

export function SponsorLogo({ sponsor, large = false }: { sponsor: Sponsor; large?: boolean }) {
  const inner = sponsor.logo ? (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={320}
      height={160}
      className={`w-auto object-contain ${large ? "max-h-24" : "max-h-14"}`}
    />
  ) : (
    <span className={`font-display font-extrabold text-ink ${large ? "text-2xl" : "text-lg"}`}>{sponsor.name}</span>
  );

  const box = `grid place-items-center rounded-3xl bg-white px-6 text-center shadow-sm ring-1 ring-ink/5 transition ${
    large ? "h-40" : "h-28"
  }`;

  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className={`${box} hover:-translate-y-0.5 hover:ring-court/30`}>
      {inner}
    </a>
  ) : (
    <div className={box}>{inner}</div>
  );
}
