"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { useQuote } from "@/lib/QuoteContext";
import Emblem from "./Emblem";
import Wordmark from "./Wordmark";

export default function Navbar() {
  const { lang, setLang, tr } = useLang();
  const { count, setOpen } = useQuote();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);

  const usp = [...tr.usp, ...tr.usp];

  return (
    <>
      <div className="ticker" data-anim>
        <div className="ticker-track">
          {usp.map((u, i) => (
            <span key={i}><i className="bolt" aria-hidden="true" />{u}</span>
          ))}
        </div>
      </div>

      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="wrap nav-in">
          <a href="#top" className="brand" aria-label="Stålco">
            <Emblem id="nav" className="brand-em" />
            <Wordmark />
          </a>

          <nav className="nav-links" aria-label="Huvudmeny">
            {tr.nav.links.map(([label, href]) => (
              <a key={href} href={href}><span>{label}</span></a>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="lang" onClick={() => setLang(lang === "sv" ? "en" : "sv")} aria-label={tr.nav.switchTo}>
              <span className={lang === "sv" ? "on" : ""}>SV</span>
              <span className={lang === "en" ? "on" : ""}>EN</span>
            </button>
            <button className="quote-btn" onClick={() => setOpen(true)} aria-label={`${tr.nav.quote} (${count})`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></svg>
              <span className="quote-label">{tr.nav.quote}</span>
              {count > 0 && <b key={count} className="badge">{count}</b>}
            </button>
            <a href="#kontakt" className="btn btn-hot nav-cta">{tr.nav.cta}</a>
            <button className={`burger ${menu ? "open" : ""}`} onClick={() => setMenu((m) => !m)} aria-label={menu ? tr.nav.close : tr.nav.menu} aria-expanded={menu}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mmenu ${menu ? "open" : ""}`} aria-hidden={!menu}>
        <div className="mmenu-grid" aria-hidden="true" />
        <nav>
          {tr.nav.links.map(([label, href], i) => (
            <a key={href} href={href} onClick={() => setMenu(false)} style={{ ["--i" as string]: i }} tabIndex={menu ? 0 : -1}>
              <small>0{i + 1}</small>{label}
            </a>
          ))}
          <a href="#kontakt" className="btn btn-hot" onClick={() => setMenu(false)} style={{ ["--i" as string]: 3 }} tabIndex={menu ? 0 : -1}>
            {tr.nav.cta}
          </a>
        </nav>
      </div>
    </>
  );
}
