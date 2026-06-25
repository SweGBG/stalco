"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Products.module.css";

const products = [
  { id:1, name:"DeWalt DCD796 XR", catIdx:1, brand:"DeWalt", spec:"18V · Borstlös · 70 Nm", price:2490, oldPrice:2990, discount:17, img:"https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=80&fit=crop", stock:true, hot:true },
  { id:2, name:"Milwaukee M18 FMTIW2", catIdx:1, brand:"Milwaukee", spec:"18V FUEL · 1000 Nm", price:3890, oldPrice:4490, discount:13, img:"https://images.unsplash.com/photo-1590635023142-73c3d34f2805?w=500&q=80&fit=crop", stock:true, hot:true },
  { id:3, name:"Makita DGA504", catIdx:1, brand:"Makita", spec:'18V · 125mm · BL-motor', price:1890, oldPrice:2290, discount:17, img:"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80&fit=crop", stock:true, hot:false },
  { id:4, name:"Stanley FatMax 5m", catIdx:4, brand:"Stanley", spec:"5m · Självlåsande · Magnetisk", price:290, oldPrice:390, discount:26, img:"https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=80&fit=crop", stock:true, hot:false },
  { id:5, name:"Bosch GBH 2-26 DFR", catIdx:3, brand:"Bosch", spec:"230V · SDS-plus · 2,7J", price:2190, oldPrice:2690, discount:19, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&fit=crop", stock:false, hot:false },
  { id:6, name:"Hilti SF 6H-A22", catIdx:1, brand:"Hilti", spec:"22V · 5,2Ah · 75 Nm", price:5490, oldPrice:6290, discount:13, img:"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80&fit=crop&crop=right", stock:true, hot:false },
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
        {filtered.map((p, idx) => (
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
        ))}
      </div>
    </section>
  );
}
