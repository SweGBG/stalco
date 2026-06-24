"use client";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Brands.module.css";

const brands = ["DeWalt","Milwaukee","Makita","Bosch","Stanley","Hilti","Husqvarna"];

export default function Brands() {
  const { lang } = useLang();
  return (
    <div className={`${styles.wrap} fade-in`}>
      <div className={styles.label}>{t[lang].brands.label}</div>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className={styles.brand}>{b}</span>
          ))}
        </div>
        <div className={styles.track} aria-hidden="true">
          {[...brands, ...brands].map((b, i) => (
            <span key={`b-${i}`} className={styles.brand}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
