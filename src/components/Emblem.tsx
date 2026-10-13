// Stålcos emblem (kugghjul + hammare) som riktiga renderade metallbilder (WebP med alfa).
// Bilderna ligger i emblemets 200-koordinatsystem så att hjältens animationer
// (em-gearwrap, em-gear, em-hammer, em-hammer-loop) har samma pivotpunkter som förut.
// Kugghjulets centrum = (100, 124), hammarens pivot = (100, 196).
// Bilderna är Z-Image Turbo-foton (ComfyUI) med bakgrunden borttagen av BiRefNet.

type Box = { x?: number; y?: number; width?: number; height?: number };

export default function Emblem({ id = "em", className = "", ...box }: { id?: string; className?: string } & Box) {
  return (
    <svg viewBox="0 0 200 200" className={`emblem ${className}`} aria-hidden="true" {...box}>
      <defs>
        <clipPath id={`${id}-l`}><rect x="0" y="0" width="100" height="200" /></clipPath>
        <clipPath id={`${id}-r`}><rect x="100" y="0" width="100" height="200" /></clipPath>
      </defs>

      {/* Kugghjulet snurrar, men stål-vänster/orange-höger ligger still (som i loggan):
          två bilder av hela hjulet, var och en klippt till sin halva. */}
      <g className="em-gearwrap">
        <g clipPath={`url(#${id}-l)`}>
          <g className="em-gear"><image href="/emblem/gear-steel.webp" x="22" y="46" width="156" height="156" /></g>
        </g>
        <g clipPath={`url(#${id}-r)`}>
          <g className="em-gear"><image href="/emblem/gear-orange.webp" x="22" y="46" width="156" height="156" /></g>
        </g>
      </g>

      <g className="em-hammer">
        <g className="em-hammer-loop">
          <image href="/emblem/hammer.webp" x="56.7" y="30" width="78.9" height="180" />
        </g>
      </g>
    </svg>
  );
}
