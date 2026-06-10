"use client";
import { useState } from "react";
import styles from "./Products.module.css";

const cats = ["Alla", "Elverktyg", "Handverktyg", "Maskiner", "Mätinstrument", "Skyddsutrustning"];

const products = [
  {
    id: 1, name: "DeWalt DCD796 XR", cat: "Elverktyg",
    brand: "DeWalt", spec: "18V · Borstlös · 70 Nm",
    price: 2490, oldPrice: 2990, discount: 17,
    img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=80&fit=crop",
    stock: true, hot: true,
  },
  {
    id: 2, name: "Milwaukee M18 FMTIW2", cat: "Elverktyg",
    brand: "Milwaukee", spec: "18V FUEL · 1000 Nm · 4-stegs",
    price: 3890, oldPrice: 4490, discount: 13,
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80&fit=crop",
    stock: true, hot: true,
  },
  {
    id: 3, name: "Makita DGA504", cat: "Elverktyg",
    brand: "Makita", spec: '18V · 125mm · BL-motor',
    price: 1890, oldPrice: 2290, discount: 17,
    img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80&fit=crop",
    stock: true, hot: false,
  },
  {
    id: 4, name: "Stanley FatMax Tumstock", cat: "Mätinstrument",
    brand: "Stanley", spec: "5m · Självlåsande · Magnetisk",
    price: 290, oldPrice: 390, discount: 26,
    img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=80&fit=crop",
    stock: true, hot: false,
  },
  {
    id: 5, name: "Bosch GBH 2-26 DFR", cat: "Maskiner",
    brand: "Bosch", spec: "230V · SDS-plus · 2,7J",
    price: 2190, oldPrice: 2690, discount: 19,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&fit=crop",
    stock: false, hot: false,
  },
  {
    id: 6, name: "Hilti SF 6H-A22", cat: "Elverktyg",
    brand: "Hilti", spec: "22V · 5,2Ah · 75 Nm",
    price: 5490, oldPrice: 6290, discount: 13,
    img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80&fit=crop&crop=right",
    stock: true, hot: false,
  },
];

export default function Products() {
  const [active, setActive] = useState("Alla");

  const filtered = active === "Alla" ? products : products.filter(p => p.cat === active);

  return (
    <section className={styles.section} id="produkter">
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>// Sortiment</div>
          <h2 className={styles.title}>POPULÄRA PRODUKTER</h2>
        </div>
        <a href="#" className={styles.seeAll}>Se hela sortimentet →</a>
      </div>

      <div className={styles.filters}>
        {cats.map(c => (
          <button
            key={c}
            className={`${styles.filter} ${active === c ? styles.filterActive : ""}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(p => (
          <div key={p.id} className={styles.card}>
            <div className={styles.imgWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.name} />
              {p.discount > 0 && <span className={styles.discBadge}>−{p.discount}%</span>}
              {p.hot && <span className={styles.hotBadge}>Bestseller</span>}
              {!p.stock && <div className={styles.outOfStock}>Tillfälligt slut</div>}
            </div>
            <div className={styles.body}>
              <div className={styles.brand}>{p.brand}</div>
              <div className={styles.name}>{p.name}</div>
              <div className={styles.spec}>{p.spec}</div>
              <div className={styles.footer}>
                <div>
                  <div className={styles.price}>{p.price.toLocaleString("sv-SE")} kr</div>
                  {p.oldPrice && <div className={styles.oldPrice}>{p.oldPrice.toLocaleString("sv-SE")} kr</div>}
                </div>
                <button
                  className={`${styles.addBtn} ${!p.stock ? styles.addBtnDisabled : ""}`}
                  disabled={!p.stock}
                  onClick={() => p.stock && (window as any).__stalco_addToCart?.()}
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
