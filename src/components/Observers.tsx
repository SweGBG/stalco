"use client";
import { useEffect } from "react";

// [data-reveal] får .in när det syns · [data-anim] får .off när det är utanför skärmen
// (pausar tunga loopar). MutationObserver fångar element som renderas senare (filter m.m.).
export default function Observers() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    const pause = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.classList.toggle("off", !e.isIntersecting)),
      { rootMargin: "120px" }
    );
    // Spåra per effekt-instans (inte via attribut i DOM:en) — annars missar
    // React Strict Modes andra körning i dev alla element.
    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => {
        if (!seen.has(el)) { seen.add(el); reveal.observe(el); }
      });
      document.querySelectorAll("[data-anim]").forEach((el) => {
        if (!seen.has(el)) { seen.add(el); pause.observe(el); }
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { reveal.disconnect(); pause.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}
