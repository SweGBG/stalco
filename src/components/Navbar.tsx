"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import SE from "country-flag-icons/react/3x2/SE";
import GB from "country-flag-icons/react/3x2/GB";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { lang, setLang } = useLang();
  const tr = t[lang];
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    (window as any).__stalco_addToCart = () => setCartCount(c => c + 1);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* USP bar — dold på mobil */}
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
              {cartCount > 0 && <span key={cartCount} className={styles.badge}>{cartCount}</span>}
            </button>

            <div className={styles.langSwitch}>
              <button className={`${styles.langBtn} ${lang === "sv" ? styles.langActive : ""}`} onClick={() => setLang("sv")}>SE</button>
              <span className={styles.langDivider}>|</span>
              <button className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`} onClick={() => setLang("en")}>EN</button>
            </div>

            <a href="#kontakt" className={styles.ctaBtn}>{tr.nav.cta}</a>

            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Meny"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        <div className={styles.megaBar}>
          <div className={styles.megaInner}>
            {tr.mega.map(l => <a key={l} href="#produkter" className={styles.megaItem}>{l}</a>)}
          </div>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          {tr.mega.map(l => (
            <li key={l}>
              <a href="#produkter" onClick={() => setMenuOpen(false)}>{l}</a>
            </li>
          ))}
          <li><a href="#om-oss" onClick={() => setMenuOpen(false)}>{lang === "sv" ? "Om oss" : "About"}</a></li>
          <li><a href="#kontakt" onClick={() => setMenuOpen(false)}>{lang === "sv" ? "Kontakt" : "Contact"}</a></li>
        </ul>

        <div className={styles.mobileLang}>
          <button className={`${styles.mobileLangBtn} ${lang === "sv" ? styles.mobileLangActive : ""}`} onClick={() => setLang("sv")}><SE className={styles.flag} /> Svenska</button>
          <button className={`${styles.mobileLangBtn} ${lang === "en" ? styles.mobileLangActive : ""}`} onClick={() => setLang("en")}><GB className={styles.flag} /> English</button>
        </div>

        <a href="#kontakt" className={styles.mobileCtaBtn} onClick={() => setMenuOpen(false)}>{tr.nav.cta}</a>
      </div>

      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
    </>
  );
}
