"use client";
import { useMemo, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { useQuote } from "@/lib/QuoteContext";
import { products, fmt } from "@/lib/products";
import { gearPath } from "@/lib/gear";

// ── Kugghjulsdrevet ──────────────────────────────────────────────
// Riktiga ingrepp: samma modul (kuggdelning) för alla hjul, radie = m·z/2,
// varvtid ∝ antal kuggar och fasen räknas fram så kuggarna går i varandra.
const M = 7;
const TEETH = [16, 10, 14, 11, 15, 12];
const SEC_PER_TOOTH = 1.1;

function buildTrain() {
  const gears: { x: number; y: number; z: number; r: number; off: number; dir: 1 | -1; up: boolean }[] = [];
  let x = 0, y = 0, off = 0;
  TEETH.forEach((z, i) => {
    const r = (M * z) / 2;
    if (i > 0) {
      const prev = gears[i - 1];
      const theta = i % 2 ? 22 : -22; // vinkel mot nästa hjul (grader, sicksack)
      const dist = prev.r + r;
      x = prev.x + Math.cos((theta * Math.PI) / 180) * dist;
      y = prev.y + Math.sin((theta * Math.PI) / 180) * dist;
      const pPrev = 360 / prev.z, pThis = 360 / z;
      const phasePrev = (((theta - (-90 + prev.off)) % pPrev) + pPrev) % pPrev / pPrev;
      const want = (0.5 - phasePrev + 1) % 1;
      const ang = theta + 180;
      // ang - (-90 + off) ≡ want·p  (mod p)
      off = ang + 90 - want * pThis;
    }
    gears.push({ x, y, z, r, off, dir: i % 2 ? -1 : 1, up: false });
  });
  const minY = Math.min(...gears.map((g) => g.y - g.r));
  const maxY = Math.max(...gears.map((g) => g.y + g.r));
  gears.forEach((g, i) => (g.up = i % 2 === 0)); // etiketter växlar ovan/under
  const pad = 46;
  const vb = {
    x: -gears[0].r - 20,
    y: minY - pad,
    w: gears[gears.length - 1].x + gears[gears.length - 1].r + 20 + gears[0].r + 20,
    h: maxY - minY + pad * 2,
  };
  return { gears, vb };
}
const TRAIN = buildTrain();

export default function Shop() {
  const { tr } = useLang();
  const p = tr.products;
  const { add, items } = useQuote();
  const [cat, setCat] = useState(0);
  const [flash, setFlash] = useState<number | null>(null);

  const list = useMemo(() => (cat === 0 ? products : products.filter((x) => x.cat === cat)), [cat]);
  const counts = useMemo(() => p.cats.map((_, i) => (i === 0 ? products.length : products.filter((x) => x.cat === i).length)), [p.cats]);

  const onAdd = (id: number) => {
    add(id);
    setFlash(id);
    setTimeout(() => setFlash((f) => (f === id ? null : f)), 1200);
  };

  return (
    <section className="shop" id="sortiment">
      <div className="wrap">
        <header className="sec-head" data-reveal>
          <p className="kicker">{tr.train.eyebrow}</p>
          <h2 className="sec-title"><span className="mat">{tr.train.title}</span></h2>
          <p className="sec-hint">{tr.train.hint}</p>
        </header>

        <div className="train" data-anim data-reveal>
          <svg viewBox={[TRAIN.vb.x, TRAIN.vb.y, TRAIN.vb.w, TRAIN.vb.h].map((v) => v.toFixed(2)).join(" ")} role="group" aria-label={tr.train.title}>
            <defs>
              <linearGradient id="g-steel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4d6c8f" /><stop offset="1" stopColor="#22374f" />
              </linearGradient>
              <linearGradient id="g-hot" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffc457" /><stop offset="1" stopColor="#e2830f" />
              </linearGradient>
            </defs>
            {TRAIN.gears.map((g, i) => {
              const active = cat === i;
              const label = p.cats[i];
              return (
                <g
                  key={i}
                  className={`tg ${active ? "on" : ""}`}
                  transform={`translate(${g.x.toFixed(2)} ${g.y.toFixed(2)})`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active}
                  aria-label={`${label} (${counts[i]})`}
                  onClick={() => setCat(i)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setCat(i))}
                >
                  <circle r={(g.r + 16).toFixed(2)} className="tg-hit" />
                  <g transform={`rotate(${g.off.toFixed(2)})`}>
                    <g className="tg-spin" style={{ ["--dur" as string]: `${(g.z * SEC_PER_TOOTH).toFixed(2)}s`, ["--dir" as string]: g.dir }}>
                      <path d={gearPath(g.z, g.r, M * 2.1, +(g.r * 0.32).toFixed(2))} className="tg-body" fillRule="evenodd" />
                      {(() => {
                        const nh = g.z > 12 ? 6 : 4;
                        return Array.from({ length: nh }, (_, k) => (
                          <circle key={k} r={(g.r * 0.09).toFixed(2)} cx={(Math.cos((k / nh) * Math.PI * 2) * g.r * 0.6).toFixed(2)} cy={(Math.sin((k / nh) * Math.PI * 2) * g.r * 0.6).toFixed(2)} className="tg-hole" />
                        ));
                      })()}
                    </g>
                  </g>
                  <circle r={(g.r * 0.2).toFixed(2)} className="tg-axle" />
                  <text y={(g.up ? -g.r - 24 : g.r + 34).toFixed(2)} textAnchor="middle" className="tg-label">{label}</text>
                  <text y={(g.up ? -g.r - 10 : g.r + 50).toFixed(2)} textAnchor="middle" className="tg-count">{counts[i]}</text>
                </g>
              );
            })}
          </svg>
          <div className="train-pills" role="group" aria-label={tr.train.title}>
            {p.cats.map((c, i) => (
              <button key={c} className={cat === i ? "on" : ""} aria-pressed={cat === i} onClick={() => setCat(i)}>
                {c} <span>{counts[i]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid-head">
          <h3>{p.title}</h3>
          <span className="mono">{p.count(list.length)}</span>
        </div>

        <ul className="pgrid" key={cat}>
          {list.length === 0 && <li className="empty">{p.empty}</li>}
          {list.map((x, i) => {
            const pct = Math.round((1 - x.price / x.oldPrice) * 100);
            const inQuote = items[x.id] ?? 0;
            return (
              <li key={x.id} className="card" style={{ ["--i" as string]: i }}>
                <span className="rivet tl" /><span className="rivet tr" /><span className="rivet bl" /><span className="rivet br" />
                <div className="card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={x.img} alt={x.name} loading="lazy" style={{ objectPosition: x.pos ?? "center" }} />
                  <span className="stamp">−{pct}%</span>
                  {x.hot && <span className="hot-tag">{p.hot}</span>}
                </div>
                <div className="card-body">
                  <p className="card-brand">{x.brand}</p>
                  <h4 className="card-name">{x.name}</h4>
                  <p className="card-spec">{x.spec}</p>
                  <div className="card-price">
                    <strong>{fmt(x.price)}</strong>
                    <s>{fmt(x.oldPrice)}</s>
                  </div>
                  <p className={`stock ${x.stock ? "ok" : "no"}`}><i />{x.stock ? p.inStock : p.outOfStock}</p>
                  <button className={`add ${flash === x.id ? "pop" : ""}`} onClick={() => onAdd(x.id)} disabled={!x.stock}>
                    <span>{flash === x.id ? p.added : p.add}</span>
                    {inQuote > 0 && <b>{inQuote}</b>}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
