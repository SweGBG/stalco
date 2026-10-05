import { gearPath } from "@/lib/gear";

// Stålcos emblem (kugghjul + hammare, stål/orange) återskapat som SVG.
// Klasserna em-* animeras i hjälten; i nav/footer står det still.
const GEAR = gearPath(8, 62, 22, 34);

type Box = { x?: number; y?: number; width?: number; height?: number };

export default function Emblem({ id = "em", className = "", ...box }: { id?: string; className?: string } & Box) {
  return (
    <svg viewBox="0 0 200 200" className={`emblem ${className}`} aria-hidden="true" {...box}>
      <defs>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7d9cbd" />
          <stop offset=".45" stopColor="#4a6a8d" />
          <stop offset="1" stopColor="#2a4463" />
        </linearGradient>
        <linearGradient id={`${id}-orange`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc457" />
          <stop offset=".55" stopColor="#f39c1e" />
          <stop offset="1" stopColor="#d97a0c" />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-l`}><rect x="0" y="0" width="100" height="200" /></clipPath>
        <clipPath id={`${id}-r`}><rect x="100" y="0" width="100" height="200" /></clipPath>
      </defs>

      <g className="em-gearwrap">
        <g transform="translate(100 118)">
          <g className="em-gear">
            <path d={GEAR} fill="#14263a" stroke="#14263a" strokeWidth="9" strokeLinejoin="round" fillRule="evenodd" />
          </g>
        </g>
        <g clipPath={`url(#${id}-l)`}>
          <g transform="translate(100 118)"><g className="em-gear"><path d={GEAR} fill={`url(#${id}-steel)`} fillRule="evenodd" /></g></g>
        </g>
        <g clipPath={`url(#${id}-r)`}>
          <g transform="translate(100 118)"><g className="em-gear"><path d={GEAR} fill={`url(#${id}-orange)`} fillRule="evenodd" /></g></g>
        </g>
      </g>

      <g className="em-hammer">
        <g className="em-hammer-loop">
          {/* skaft */}
          <rect x="91" y="56" width="18" height="142" rx="3" fill="#14263a" />
          <rect x="94" y="58" width="6" height="137" fill={`url(#${id}-steel)`} />
          <rect x="100" y="58" width="6" height="137" fill={`url(#${id}-orange)`} />
          {/* huvud */}
          <path
            d="M44 84 C44 46 76 26 114 26 L140 26 L140 18 L162 18 L162 64 L140 64 L140 56 L116 56 C92 56 72 66 62 88 Z"
            fill={`url(#${id}-steel)`} stroke="#14263a" strokeWidth="5" strokeLinejoin="round"
          />
          <path className="em-sheen" d="M60 40 L150 22 L150 30 L60 48 Z" fill={`url(#${id}-sheen)`} />
        </g>
      </g>
    </svg>
  );
}
