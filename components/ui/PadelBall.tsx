/** Padelbal zoals op de flyer: limoen met twee witte bogen. */
export function PadelBall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <circle cx="100" cy="100" r="100" fill="var(--color-ball)" />
      <path d="M14 46 C 48 70, 48 130, 14 154" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
      <path d="M186 46 C 152 70, 152 130, 186 154" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
    </svg>
  );
}
