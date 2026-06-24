"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Animerar ett tal från 0 → mål när elementet syns.
 * Behåller prefix/suffix från strängen (t.ex. "2 000+", "15 år", "8 000+").
 * Faller tillbaka till råtexten om inget tal hittas eller vid reducerad rörelse.
 */
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const done = useRef(false);

  // Plocka ut första talet (tillåt mellanslag/punkt som tusentalsavgränsare)
  const match = value.match(/[\d\s.,]*\d/);
  const numStr = match ? match[0] : null;
  const target = numStr ? parseInt(numStr.replace(/[\s.,]/g, ""), 10) : null;

  useEffect(() => {
    if (target == null || isNaN(target)) { setDisplay(value); return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setDisplay(value); return; }

    const prefix = value.slice(0, match!.index);
    const suffix = value.slice(match!.index! + numStr!.length);
    const fmt = (n: number) =>
      prefix + n.toLocaleString("sv-SE") + suffix;

    setDisplay(fmt(0));

    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting || done.current) return;
        done.current = true;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          // easeOutExpo
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setDisplay(fmt(Math.round(eased * target)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });

    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, target, duration]);

  return <span ref={ref}>{display}</span>;
}
