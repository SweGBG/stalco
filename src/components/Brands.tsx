"use client";
import { useLang } from "@/lib/LangContext";

const BRANDS = ["DeWalt", "Milwaukee", "Makita", "Bosch", "Hilti", "Stanley", "Bahco", "Knipex", "Hultafors", "Mitutoyo", "Stabila", "Snickers", "3M"];

export default function Brands() {
  const { tr } = useLang();
  const row = [...BRANDS, ...BRANDS];
  return (
    <section className="brands" aria-label={tr.brands.label} data-anim>
      <div className="brands-band">
        <p className="brands-label"><span>{tr.brands.label}</span></p>
        <div className="brands-track">
          {row.map((b, i) => (
            <span key={i} className="brand-name">{b}<i aria-hidden="true">✦</i></span>
          ))}
        </div>
      </div>
    </section>
  );
}
