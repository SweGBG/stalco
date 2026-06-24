"use client";
import { useEffect } from "react";

/**
 * Global reveal-observer.
 * Hanterar både .fade-in (legacy) och [data-reveal] (nytt, riktningsstyrt).
 * Stäng av allt om användaren föredrar reducerad rörelse.
 */
export default function ScrollFadeIn() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll<HTMLElement>(".fade-in, [data-reveal], .shimmer")
        .forEach(el => el.classList.add("visible", "is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("visible", "is-visible");
          obs.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const observe = () =>
      document.querySelectorAll<HTMLElement>(".fade-in, [data-reveal], .shimmer")
        .forEach(el => {
          if (!el.classList.contains("is-visible") && !el.classList.contains("visible")) {
            io.observe(el);
          }
        });

    observe();
    // Observera igen när språkbyte/filter byter ut DOM-noder
    const mo = new MutationObserver(() => observe());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  return null;
}
