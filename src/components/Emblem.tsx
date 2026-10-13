// Stålcos emblem (kugghjul + hammare) som riktiga renderade metallbilder (WebP med alfa).
// Bilderna ligger i emblemets 200-koordinatsystem så att hjältens animationer
// (em-gearwrap, em-gear, em-hammer, em-hammer-loop) har samma pivotpunkter som förut.
// Kugghjulets centrum = (100, 118), hammarens pivot = (100, 196).

type Box = { x?: number; y?: number; width?: number; height?: number };

export default function Emblem({ id = "em", className = "", ...box }: { id?: string; className?: string } & Box) {
  return (
    <svg viewBox="0 0 200 200" className={`emblem ${className}`} aria-hidden="true" {...box}>
      <defs>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-l`}><rect x="0" y="0" width="100" height="200" /></clipPath>
        <clipPath id={`${id}-r`}><rect x="100" y="0" width="100" height="200" /></clipPath>
        <clipPath id={`${id}-head`}>
          <path d="M44 84 C44 46 76 26 114 26 L140 26 L140 18 L162 18 L162 64 L140 64 L140 56 L116 56 C92 56 72 66 62 88 Z" />
        </clipPath>
      </defs>

      {/* Kugghjulet snurrar, men stål-vänster/orange-höger ligger still (som i loggan):
          två bilder av hela hjulet, var och en klippt till sin halva. */}
      <g className="em-gearwrap">
        <g clipPath={`url(#${id}-l)`}>
          <g className="em-gear"><image href="/emblem/gear-steel.webp" x="21" y="39" width="158" height="158" /></g>
        </g>
        <g clipPath={`url(#${id}-r)`}>
          <g className="em-gear"><image href="/emblem/gear-orange.webp" x="21" y="39" width="158" height="158" /></g>
        </g>
      </g>

      <g className="em-hammer">
        <g className="em-hammer-loop">
          <image href="/emblem/hammer.webp" x="36" y="10" width="134" height="193" />
          <g clipPath={`url(#${id}-head)`}>
            <path className="em-sheen" d="M50 44 L150 20 L150 34 L50 58 Z" fill={`url(#${id}-sheen)`} />
          </g>
        </g>
      </g>
    </svg>
  );
}
