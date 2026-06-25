"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Products.module.css";

// Bilder: endast bekräftat fungerande Unsplash-ID:n (laddar redan i projektet).
// Byt gärna ut enskilda img mot exakta produktbilder när du vill.
const IMG = {
  drill:    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=80&fit=crop",
  impact:   "https://images.unsplash.com/photo-1590635023142-73c3d34f2805?w=500&q=80&fit=crop",
  grinder:  "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80&fit=crop",
  hammer:   "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=80&fit=crop",
  tools:    "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=80&fit=crop",
  sds:      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&fit=crop",
};

const products = [
  // ── Elverktyg (catIdx 1) ──
  { id:1,  name:"DeWalt DCD796 XR",        catIdx:1, brand:"DeWalt",    spec:"18V · Borstlös · 70 Nm",        price:2490, oldPrice:2990, discount:17, img:IMG.drill,   stock:true,  hot:true  },
  { id:2,  name:"Milwaukee M18 FMTIW2",    catIdx:1, brand:"Milwaukee", spec:"18V FUEL · 1000 Nm",            price:3890, oldPrice:4490, discount:13, img:IMG.impact,  stock:true,  hot:true  },
  { id:3,  name:"Makita DGA504Z",          catIdx:1, brand:"Makita",    spec:"18V · 125mm · BL-motor",        price:1890, oldPrice:2290, discount:17, img:IMG.grinder, stock:true,  hot:false },

  // ── Handverktyg (catIdx 2) ──
  { id:4,  name:"Bahco 808050 P Skruvmejselset", catIdx:2, brand:"Bahco",   spec:"6 delar · ERGO · Härdad spets", price:449,  oldPrice:599,  discount:25, img:IMG.tools,  stock:true,  hot:true  },
  { id:5,  name:"Hultafors TROY Nylonhammare",   catIdx:2, brand:"Hultafors", spec:"35mm · Utbytbara slagytor",    price:529,  oldPrice:649,  discount:18, img:IMG.hammer, stock:true,  hot:false },
  { id:6,  name:"Knipex StepCut Plåtsax",        catIdx:2, brand:"Knipex",  spec:"260mm · Höger · Rostfri",       price:639,  oldPrice:790,  discount:19, img:IMG.tools,  stock:true,  hot:false },

  // ── Maskiner (catIdx 3) ──
  { id:7,  name:"Bosch GBH 2-26 DFR",      catIdx:3, brand:"Bosch",     spec:"230V · SDS-plus · 2,7J",        price:2190, oldPrice:2690, discount:19, img:IMG.sds,     stock:false, hot:false },
  { id:8,  name:"Makita HS7601J Cirkelsåg", catIdx:3, brand:"Makita",   spec:"1200W · 190mm · MAKPAC",        price:1690, oldPrice:1990, discount:15, img:IMG.grinder, stock:true,  hot:false },
  { id:9,  name:"Hilti TE 30-AVR",         catIdx:3, brand:"Hilti",     spec:"230V · SDS-plus · 3,3J · AVR",  price:5990, oldPrice:6790, discount:12, img:IMG.sds,     stock:true,  hot:true  },

  // ── Mätinstrument (catIdx 4) ──
  { id:10, name:"Stanley FatMax 5m",       catIdx:4, brand:"Stanley",   spec:"5m · Självlåsande · Magnetisk", price:290,  oldPrice:390,  discount:26, img:IMG.tools,  stock:true,  hot:false },
  { id:11, name:"Mitutoyo Digital Skjutmått", catIdx:4, brand:"Mitutoyo", spec:"150mm · 0,01mm · IP67",       price:1490, oldPrice:1790, discount:17, img:IMG.tools,  stock:true,  hot:true  },
  { id:12, name:"Stabila Korslaser LAX 300", catIdx:4, brand:"Stabila", spec:"Grön · 20m · Självavvägande",   price:2390, oldPrice:2890, discount:17, img:IMG.tools,  stock:true,  hot:false },

  // ── Skyddsutrustning (catIdx 5) ──
  { id:13, name:"3M Peltor X5A Hörselkåpor", catIdx:5, brand:"3M",      spec:"37 dB · Headband · Komfort",    price:549,  oldPrice:690,  discount:20, img:IMG.tools,  stock:true,  hot:false },
  { id:14, name:"Snickers 9320 Arbetshandskar", catIdx:5, brand:"Snickers", spec:"Skärskydd C · Touch · Stl 9", price:259, oldPrice:329, discount:21, img:IMG.tools, stock:true, hot:false },
  { id:15, name:"Hultafors Skyddsglasögon RX", catIdx:5, brand:"Hultafors", spec:"Anti-imma · UV400 · Klar",   price:189,  oldPrice:249,  discount:24, img:IMG.tools,  stock:true,  hot:true  },
];

export default function Products() {
  const { lang } = useLang();
  const tr = t[lang].products;
  const [activeIdx, setActiveIdx] = useState(0);

  // Scroll-affordans för filterraden på mobil
  const filtersRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ atStart: true, atEnd: false, scrollable: false });

  const updateScrollState = useCallback(() => {
    const el = filtersRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth > el.clientWidth + 2;
    const atStart = el.scrollLeft <= 1;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
    setScrollState({ atStart, atEnd, scrollable });
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = filtersRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, lang]);

  // Auto-scrolla aktiv pill till synligt läge när man väljer kategori
  const handleSelect = (i: number, btn: HTMLButtonElement) => {
    setActiveIdx(i);
    btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const filtered = activeIdx === 0 ? products : products.filter(p => p.catIdx === activeIdx);

  return (
    <section className={styles.section} id="produkter">
      <div className={styles.header}>
        <div data-reveal>
          <div className={styles.eyebrow}>{tr.eyebrow}</div>
          <h2 className={styles.title}>{tr.title}</h2>
        </div>
        <button
          type="button"
          className={styles.seeAll}
          data-reveal
          onClick={() => setActiveIdx(0)}
        >
          {tr.seeAll}
        </button>
      </div>
      <div
        className={`${styles.filtersWrap} ${scrollState.scrollable && !scrollState.atStart ? styles.fadeLeft : ""} ${scrollState.scrollable && !scrollState.atEnd ? styles.fadeRight : ""}`}
        data-reveal
      >
        <div className={styles.filters} ref={filtersRef}>
          {tr.cats.map((c, i) => (
            <button
              key={c}
              className={`${styles.filter} ${activeIdx === i ? styles.filterActive : ""}`}
              onClick={(e) => handleSelect(i, e.currentTarget)}
            >
              {c}
            </button>
          ))}
        </div>
        {scrollState.scrollable && !scrollState.atEnd && (
          <span className={styles.scrollHint} aria-hidden="true">
            <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18" /></svg>
          </span>
        )}
      </div>
      <div className={styles.grid}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>{tr.empty}</div>
        ) : (
          filtered.map((p, idx) => (
          <div
            key={p.id}
            className={styles.card}
            data-reveal="scale"
            style={{ ["--reveal-delay" as string]: `${idx * 0.07}s` }}
          >
            <div className={styles.imgWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.name} />
              <div className={styles.shine} />
              {p.discount > 0 && <span className={styles.discBadge}>−{p.discount}%</span>}
              {p.hot && <span className={styles.hotBadge}>Bestseller</span>}
              {!p.stock && <div className={styles.outOfStock}>{tr.outOfStock}</div>}
            </div>
            <div className={styles.body}>
              <div className={styles.brand}>{p.brand}</div>
              <div className={styles.name}>{p.name}</div>
              <div className={styles.spec}>{p.spec}</div>
              <div className={styles.footer}>
                <div>
                  <div className={styles.price}>{p.price.toLocaleString("sv-SE")} kr</div>
                  <div className={styles.oldPrice}>{p.oldPrice.toLocaleString("sv-SE")} kr</div>
                </div>
                <button
                  className={`${styles.addBtn} ${!p.stock ? styles.addBtnDisabled : ""}`}
                  disabled={!p.stock}
                  onClick={(e) => {
                    if (!p.stock) return;
                    (window as any).__stalco_addToCart?.();
                    const btn = e.currentTarget;
                    btn.classList.remove(styles.pop);
                    void btn.offsetWidth;
                    btn.classList.add(styles.pop);
                  }}
                >
                  <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </section>
  );
}
