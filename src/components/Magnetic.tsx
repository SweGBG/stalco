"use client";
import { useRef, ReactNode, ElementType } from "react";

/**
 * Diskret magnetisk hover: elementet dras lätt mot muspekaren.
 * Avstängt på touch/reducerad rörelse (ingen hover ⇒ inga listeners triggas ändå).
 * Renderar valfri tagg via `as` (default <a>).
 */
export default function Magnetic({
  children,
  className,
  href,
  as,
  strength = 0.25,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  as?: ElementType;
  strength?: number;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag: ElementType = as || (href ? "a" : "button");

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <Tag
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.35s var(--ease)" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
