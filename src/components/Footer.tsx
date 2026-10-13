"use client";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import Emblem from "./Emblem";
import Wordmark from "./Wordmark";

export default function Footer() {
  const { tr } = useLang();
  const f = tr.footer;
  const [done, setDone] = useState(false);
  const [mail, setMail] = useState("");

  return (
    <footer className="footer" data-anim>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a href="#top" className="brand" aria-label="Stålco"><Emblem id="foot" className="brand-em" /><Wordmark /></a>
            <p>{f.desc}</p>
          </div>
          <form className="news" onSubmit={(e) => { e.preventDefault(); if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) setDone(true); }}>
            <label htmlFor="news">{f.newsTitle}</label>
            {done ? (
              <p className="news-done">{f.subDone}</p>
            ) : (
              <div>
                <input id="news" type="email" placeholder={f.placeholder} value={mail} onChange={(e) => setMail(e.target.value)} />
                <button className="btn btn-hot">{f.subBtn}</button>
              </div>
            )}
          </form>
        </div>

        <div className="foot-cols">
          {[[f.col1, f.shop], [f.col2, f.help], [f.col3, f.company]].map(([title, links]) => (
            <div key={title as string}>
              <h4>{title as string}</h4>
              <ul>{(links as string[]).map((l) => <li key={l}><a href="#sortiment">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
      </div>

      {/* Stor kontur-logga med guldsvep. SVG (clipPath + transform) i stället för
          background-clip: text — det senare animeras inte pålitligt i mobil Safari/Chrome. */}
      <svg className="giant" viewBox="0 0 1000 230" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id="giant-clip">
            <text x="500" y="214" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs" className="giant-txt">STÅLCO</text>
          </clipPath>
          <linearGradient id="giant-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff8c1e" stopOpacity="0" />
            <stop offset=".35" stopColor="#ff9a2a" stopOpacity=".35" />
            <stop offset=".5" stopColor="#ffd27a" stopOpacity=".75" />
            <stop offset=".65" stopColor="#ff9a2a" stopOpacity=".35" />
            <stop offset="1" stopColor="#ff8c1e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g clipPath="url(#giant-clip)">
          <rect className="giant-sweep" x="-420" y="0" width="360" height="230" fill="url(#giant-gold)" />
        </g>
        <text x="500" y="214" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs" className="giant-txt giant-stroke">STÅLCO</text>
      </svg>

      <div className="wrap foot-bottom">
        <span>{f.copy}</span>
        <span>{f.orgnr}</span>
        <a href="#top" className="to-top">{f.top} ↑</a>
        <a href="https://www.swegbg.com" target="_blank" rel="noopener" className="credit">
          {f.credit} <b>SweGBG</b>
        </a>
      </div>
    </footer>
  );
}
