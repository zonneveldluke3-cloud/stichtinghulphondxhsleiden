"use client";

import { useEffect, useRef } from "react";

/**
 * Geanimeerde padelbaan (zijaanzicht): vier spelers, een bal die heen en weer
 * gaat en een hulphond die over de baan loopt. Puur SVG-animaties, dus licht.
 * Bij "minder beweging" (prefers-reduced-motion) staat alles stil.
 */

const RALLY = 2.6; // seconden voor één keer heen en terug

type PlayerProps = {
  x: number;
  shirt: string;
  skin: string;
  hair: string;
  flip?: boolean;
  /** Slaat deze speler de bal? Dan zwaait het racket mee met de rally. */
  hitAt?: number;
  /** Klein heen-en-weer bewegen (voor de spelers aan het net). */
  shuffle?: boolean;
  scale?: number;
};

function Player({ x, shirt, skin, hair, flip = false, hitAt, shuffle = false, scale = 1 }: PlayerProps) {
  const ground = 330;
  const leg = (x1: number, delay: number) => (
    <line x1={x1} y1="0" x2={x1 * 0.5} y2="-32" stroke="#29235d" strokeWidth="8" strokeLinecap="round">
      <animateTransform
        attributeName="transform"
        type="rotate"
        values={`-18 ${x1 * 0.5} -32; 18 ${x1 * 0.5} -32; -18 ${x1 * 0.5} -32`}
        dur="0.42s"
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </line>
  );
  return (
    <g transform={`translate(${x} ${ground}) scale(${flip ? -scale : scale} ${scale})`}>
      <g>
        {/* rennen: heen en weer over de baan */}
        <animateTransform
          attributeName="transform"
          type="translate"
          values={shuffle ? "0 0; 22 0; 4 0; -20 0; 0 0" : "0 0; -30 0; -34 -10; -10 0; 18 0; 0 0"}
          keyTimes={shuffle ? "0; 0.25; 0.5; 0.75; 1" : "0; 0.3; 0.42; 0.6; 0.85; 1"}
          dur={shuffle ? "2.2s" : `${RALLY}s`}
          begin={hitAt !== undefined ? `${hitAt}s` : "0s"}
          repeatCount="indefinite"
        />
        {/* benen bewegen alsof ze rennen */}
        {leg(-8, 0)}
        {leg(8, 0.21)}
        {/* lijf, wiebelt een beetje mee */}
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-4 0 -30; 4 0 -30; -4 0 -30" dur="0.84s" repeatCount="indefinite" />
          <rect x="-15" y="-78" width="30" height="50" rx="12" fill={shirt} />
          {/* andere arm */}
          <line x1="-8" y1="-66" x2="-20" y2="-46" stroke={skin} strokeWidth="7" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" values="20 -8 -66; -25 -8 -66; 20 -8 -66" dur="0.84s" repeatCount="indefinite" />
          </line>
          {/* hoofd */}
          <circle cx="0" cy="-92" r="13" fill={skin} />
          <path d="M-13 -94 Q0 -112 13 -94 Z" fill={hair} />
          {/* arm + racket, draait rond de schouder */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={
                hitAt !== undefined
                  ? "40 8 -66; 40 8 -66; -95 8 -66; -110 8 -66; 70 8 -66; 40 8 -66"
                  : "10 8 -66; -40 8 -66; 10 8 -66; 30 8 -66; 10 8 -66"
              }
              keyTimes={hitAt !== undefined ? "0; 0.62; 0.86; 0.94; 0.98; 1" : "0; 0.25; 0.5; 0.75; 1"}
              dur={hitAt !== undefined ? `${RALLY}s` : "1.8s"}
              begin={hitAt !== undefined ? `${hitAt}s` : "0s"}
              repeatCount="indefinite"
            />
            <line x1="8" y1="-66" x2="28" y2="-74" stroke={skin} strokeWidth="7" strokeLinecap="round" />
            <line x1="28" y1="-74" x2="36" y2="-84" stroke="#29235d" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="44" cy="-98" rx="11" ry="15" transform="rotate(25 44 -98)" fill="#29235d" />
            <ellipse cx="44" cy="-98" rx="7.5" ry="11" transform="rotate(25 44 -98)" fill="#ffffff" opacity="0.9" />
          </g>
        </g>
      </g>
    </g>
  );
}

function Dog() {
  return (
    <g>
      <animateTransform attributeName="transform" type="translate" values="-160 384; 960 384" dur="17s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2.5; 0 0" dur="0.4s" repeatCount="indefinite" />
        {/* staart */}
        <path d="M-34 -36 Q-50 -54 -44 -66" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="-12 -34 -36; 18 -34 -36; -12 -34 -36" dur="0.35s" repeatCount="indefinite" />
        </path>
        {/* poten */}
        {[
          { x: -22, d: 0 },
          { x: -12, d: 0.2 },
          { x: 16, d: 0.2 },
          { x: 26, d: 0 },
        ].map((leg) => (
          <line key={leg.x} x1={leg.x} y1="-20" x2={leg.x} y2="0" stroke="#ffffff" strokeWidth="7" strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`-22 ${leg.x} -20; 22 ${leg.x} -20; -22 ${leg.x} -20`}
              dur="0.4s"
              begin={`${leg.d}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
        {/* lijf */}
        <ellipse cx="0" cy="-30" rx="38" ry="17" fill="#ffffff" />
        {/* hulphond-tuigje */}
        <rect x="-14" y="-46" width="26" height="30" rx="6" fill="#d9f23a" />
        <rect x="-14" y="-46" width="26" height="6" rx="3" fill="#29235d" />
        {/* hoofd */}
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0 34 -44; -4 34 -44; 0 34 -44" dur="0.8s" repeatCount="indefinite" />
          <circle cx="36" cy="-50" r="15" fill="#ffffff" />
          <ellipse cx="50" cy="-45" rx="11" ry="7.5" fill="#ffffff" />
          <circle cx="60" cy="-47" r="3.5" fill="#29235d" />
          <circle cx="40" cy="-54" r="2.6" fill="#29235d" />
          <path d="M26 -60 Q20 -48 28 -40 Q34 -48 30 -60 Z" fill="#c9a26b" />
        </g>
      </g>
    </g>
  );
}

export function HeroScene({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => (mq.matches ? svg.pauseAnimations() : svg.unpauseAnimations());
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Racketkoppen van de twee spelers achterin (links en rechts)
  const ballPath = "M222 244 Q400 40 520 328 Q548 262 578 244";

  return (
    <svg ref={ref} viewBox="0 130 800 290" className={className} role="img" aria-label="Spelers aan het padellen met een hulphond die over de baan loopt">
      {/* glazen wanden */}
      <g fill="#ffffff" fillOpacity="0.14" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3">
        <rect x="30" y="150" width="70" height="180" rx="4" />
        <rect x="700" y="150" width="70" height="180" rx="4" />
      </g>
      {/* hekwerk achter de baan */}
      <g stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={i} x1={100 + i * 50} y1="190" x2={100 + i * 50} y2="330" />
        ))}
        <line x1="100" y1="190" x2="700" y2="190" />
      </g>

      {/* vloer */}
      <rect x="20" y="330" width="760" height="22" rx="4" fill="#3f84bd" />
      <line x1="30" y1="333" x2="770" y2="333" stroke="#ffffff" strokeWidth="3" />

      {/* net */}
      <rect x="396" y="282" width="8" height="50" rx="2" fill="#29235d" />
      <rect x="320" y="284" width="160" height="30" fill="none" stroke="#ffffff" strokeWidth="3" />
      <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.5">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1={320 + i * 20} y1="284" x2={320 + i * 20} y2="314" />
        ))}
        <line x1="320" y1="299" x2="480" y2="299" />
      </g>

      {/* spelers: links lime-team, rechts wit-team */}
      <Player x={295} shirt="#d9f23a" skin="#e8b98f" hair="#4a3426" shuffle scale={0.88} />
      <Player x={170} shirt="#d9f23a" skin="#8d5a3b" hair="#1d1410" hitAt={0} />
      <Player x={505} shirt="#ffffff" skin="#f2cba8" hair="#c79a4a" flip shuffle scale={0.88} />
      <Player x={630} shirt="#ffffff" skin="#c88a62" hair="#2b1c14" flip hitAt={RALLY / 2} />

      {/* schaduw van de bal */}
      <ellipse cx="222" cy="336" rx="9" ry="3" fill="#29235d" opacity="0.3">
        <animate attributeName="cx" values="222; 578; 222" dur={`${RALLY}s`} repeatCount="indefinite" />
      </ellipse>
      {/* bal */}
      <g>
        <animateMotion
          path={ballPath}
          keyPoints="0;1;0"
          keyTimes="0;0.5;1"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1"
          dur={`${RALLY}s`}
          repeatCount="indefinite"
        />
        <circle r="8" fill="#d9f23a" />
        <path d="M-5 -5 Q-1 0 -5 5 M5 -5 Q1 0 5 5" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* grond voor de baan + hond */}
      <Dog />
    </svg>
  );
}
