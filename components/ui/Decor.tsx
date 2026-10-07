/** Decoratieve elementen: pootafdrukken, padelbaan, golven. Puur visueel (aria-hidden). */

export function PawPrint({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="currentColor">
      <ellipse cx="32" cy="42" rx="14" ry="12" />
      <ellipse cx="14" cy="26" rx="6" ry="8" transform="rotate(-20 14 26)" />
      <ellipse cx="26" cy="15" rx="6" ry="8" transform="rotate(-6 26 15)" />
      <ellipse cx="38" cy="15" rx="6" ry="8" transform="rotate(6 38 15)" />
      <ellipse cx="50" cy="26" rx="6" ry="8" transform="rotate(20 50 26)" />
    </svg>
  );
}

/** Spoor van pootafdrukken, schuin over een vlak. */
export function PawTrail({ className = "" }: { className?: string }) {
  const steps = [
    { x: 0, y: 120, r: 20 },
    { x: 46, y: 80, r: 35 },
    { x: 86, y: 100, r: 20 },
    { x: 132, y: 58, r: 35 },
    { x: 172, y: 78, r: 20 },
    { x: 218, y: 36, r: 35 },
  ];
  return (
    <svg viewBox="0 0 260 170" className={className} aria-hidden fill="currentColor">
      {steps.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y}) rotate(${s.r}) scale(0.5)`}>
          <ellipse cx="32" cy="42" rx="14" ry="12" />
          <ellipse cx="14" cy="26" rx="6" ry="8" />
          <ellipse cx="26" cy="15" rx="6" ry="8" />
          <ellipse cx="38" cy="15" rx="6" ry="8" />
          <ellipse cx="50" cy="26" rx="6" ry="8" />
        </g>
      ))}
    </svg>
  );
}

/** Padelbaan van bovenaf, met een stuiterende bal. */
export function CourtIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 420" className={className} aria-hidden>
      <rect x="0" y="0" width="320" height="420" rx="28" fill="var(--color-sky)" />
      <rect x="30" y="30" width="260" height="360" rx="6" fill="var(--color-sky-deep)" stroke="#fff" strokeWidth="5" />
      {/* servicelijnen */}
      <line x1="30" y1="110" x2="290" y2="110" stroke="#fff" strokeWidth="4" />
      <line x1="30" y1="310" x2="290" y2="310" stroke="#fff" strokeWidth="4" />
      <line x1="160" y1="110" x2="160" y2="310" stroke="#fff" strokeWidth="4" />
      {/* net */}
      <line x1="18" y1="210" x2="302" y2="210" stroke="var(--color-ink)" strokeWidth="7" strokeLinecap="round" />
      <line x1="18" y1="210" x2="302" y2="210" stroke="#fff" strokeWidth="2" strokeDasharray="3 5" />
      {/* baan van de bal */}
      <path d="M88 350 Q 150 230 230 150" fill="none" stroke="var(--color-ball)" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
      <circle cx="236" cy="142" r="20" fill="var(--color-ball)" />
      <path d="M220 130 q 8 12 0 24 M252 130 q -8 12 0 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      {/* spelers als stippen */}
      <circle cx="95" cy="355" r="13" fill="var(--color-ink)" />
      <circle cx="225" cy="345" r="13" fill="var(--color-ink)" opacity="0.85" />
      <circle cx="100" cy="75" r="13" fill="#fff" />
      <circle cx="220" cy="70" r="13" fill="#fff" opacity="0.85" />
    </svg>
  );
}

/** Golvende rand, voor de overgang tussen twee kleuren. */
export function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={`block h-10 w-full sm:h-16 ${flip ? "rotate-180" : ""} ${className}`}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d="M0 80 L0 40 Q 360 0 720 40 T 1440 40 L1440 80 Z" fill="currentColor" />
    </svg>
  );
}
