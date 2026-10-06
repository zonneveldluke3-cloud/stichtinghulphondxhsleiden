import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const CalendarIcon = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
);
export const PinIcon = (p: P) => (
  <svg {...base} {...p}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const EuroIcon = (p: P) => (
  <svg {...base} {...p}><path d="M18 7a7 7 0 1 0 0 10M4 10h10M4 14h10" /></svg>
);
export const UsersIcon = (p: P) => (
  <svg {...base} {...p}><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3" /></svg>
);
export const FlagIcon = (p: P) => (
  <svg {...base} {...p}><path d="M4 22V4M4 4h13l-2 4 2 4H4" /></svg>
);
export const MailIcon = (p: P) => (
  <svg {...base} {...p}><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m22 7-10 6L2 7" /></svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base} {...p}><path d="M20 6 9 17l-5-5" /></svg>
);
export const PlusIcon = (p: P) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const MinusIcon = (p: P) => (
  <svg {...base} {...p}><path d="M5 12h14" /></svg>
);
export const ArrowRightIcon = (p: P) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const AlertIcon = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></svg>
);
export const LockIcon = (p: P) => (
  <svg {...base} {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
export const HeartIcon = (p: P) => (
  <svg {...base} {...p}><path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6Z" /></svg>
);
export const CameraIcon = (p: P) => (
  <svg {...base} {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" /><circle cx="12" cy="13" r="3" /></svg>
);

export const InstagramIcon = (p: P) => (
  <svg {...base} {...p}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>
);
export const LinkedInIcon = (p: P) => (
  <svg {...base} {...p}><rect x="2" y="2" width="20" height="20" rx="4" /><path d="M7 10v7M7 7h.01M11 17v-7M11 13a3 3 0 0 1 6 0v4" /></svg>
);
export const TikTokIcon = (p: P) => (
  <svg {...base} {...p}><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 3 2.5 5 6 5" /></svg>
);

export function SocialIcon({ name, ...p }: { name: string } & P) {
  if (name === "Instagram") return <InstagramIcon {...p} />;
  if (name === "LinkedIn") return <LinkedInIcon {...p} />;
  if (name === "TikTok") return <TikTokIcon {...p} />;
  return <ArrowRightIcon {...p} />;
}
