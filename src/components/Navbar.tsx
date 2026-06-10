"use client";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { lang, setLang } = useLang();
  const tr = t[lang];
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  if (typeof window !== "undefined") {
    (window as any).__stalco_addToCart = () => setCartCount(c => c + 1);
  }

  return (
    <>
      <div className={styles.uspBar}>
        <div className={styles.uspInner}>
          {tr.usp.map((u, i) => <span key={i} className={styles.uspItem}>{u}</span>)}
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navTop}>
          <a href="#" className={styles.logo}>STÅL<span>CO</span></a>

          <div className={styles.search}>
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder={lang === "sv" ? "Sök verktyg, varumärke eller artikelnr..." : "Search tools, brand or item no..."} />
          </div>

          <div className={styles.navIcons}>
            <button className={styles.navIcon} aria-label="Varukorg">
              <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>

            <div className={styles.langSwitch}>
              <button
                className={`${styles.langBtn} ${lang === "sv" ? styles.langActive : ""}`}
                onClick={() => setLang("sv")}
                aria-label="Svenska"
              >
                SE
              </button>
              <span className={styles.langDivider}>|</span>
              <button
                className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`}
                onClick={() => setLang("en")}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <a href="#kontakt" className={styles.ctaBtn}>{tr.nav.cta}</a>

            <button className={styles.hamburger} onClick={() => setMenuOpen(o => !o)} aria-label="Meny">
              <span /><span /><span />
            </button>
          </div>
        </div>

        <div className={styles.megaBar}>
          <div className={styles.megaInner}>
            {tr.mega.map(l => <a key={l} href="#produkter" className={styles.megaItem}>{l}</a>)}
          </div>
        </div>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            {tr.mega.map(l => <a key={l} href="#produkter" onClick={() => setMenuOpen(false)}>{l}</a>)}
            <a href="#om-oss" onClick={() => setMenuOpen(false)}>{lang === "sv" ? "Om oss" : "About"}</a>
            <a href="#kontakt" onClick={() => setMenuOpen(false)}>{lang === "sv" ? "Kontakt" : "Contact"}</a>
          </div>
        )}
      </nav>
    </>
  );
}
