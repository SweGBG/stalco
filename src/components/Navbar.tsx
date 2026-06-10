"use client";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const megaLinks = ["Handverktyg", "Elverktyg", "Maskiner", "Mätinstrument", "Skyddsutrustning", "Förvaring", "Tillbehör"];

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    (window as any).__stalco_addToCart = () => setCartCount((c) => c + 1);
  }, []);

  return (
    <>
      {/* USP bar */}
      <div className={styles.uspBar}>
        <div className={styles.uspInner}>
          <span className={styles.uspItem}>
            <svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Fri frakt över 799 kr
          </span>
          <span className={styles.uspItem}>
            <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5.5"/></svg>
            30 dagars retur
          </span>
          <span className={styles.uspItem}>
            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Auktoriserad återförsäljare
          </span>
          <span className={styles.uspItem}>
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12"/></svg>
            Support: 08-123 456 78
          </span>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navTop}>
          <a href="#" className={styles.logo}>
            STÅL<span>CO</span>
          </a>

          <div className={styles.search}>
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Sök verktyg, varumärke eller artikelnr..." />
          </div>

          <div className={styles.navIcons}>
            <button className={styles.navIcon} aria-label="Varukorg">
              <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>
            <a href="#kontakt" className={styles.ctaBtn}>Kontakta oss</a>
            <button className={styles.hamburger} onClick={() => setMenuOpen(o => !o)} aria-label="Meny">
              <span /><span /><span />
            </button>
          </div>
        </div>

        <div className={styles.megaBar}>
          <div className={styles.megaInner}>
            {megaLinks.map(l => (
              <a key={l} href="#produkter" className={styles.megaItem}>{l}</a>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            {megaLinks.map(l => (
              <a key={l} href="#produkter" onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
            <a href="#om-oss" onClick={() => setMenuOpen(false)}>Om oss</a>
            <a href="#kontakt" onClick={() => setMenuOpen(false)}>Kontakt</a>
          </div>
        )}
      </nav>
    </>
  );
}
