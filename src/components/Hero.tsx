"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { rng } from "@/lib/rng";
import Emblem from "./Emblem";
import CountUp from "./CountUp";

// Gnistor vid hammarslaget + glöd som stiger i bakgrunden. Seedat = samma på server/klient.
const r1 = rng(2009);
const SPARKS = Array.from({ length: 16 }, () => ({
  a: -165 + r1() * 150, // utkast uppåt/åt sidorna
  d: 28 + r1() * 62,    // hur långt gnistan flyger
  g: 18 + r1() * 40,    // hur mycket den faller (gravitation)
  l: 6 + r1() * 7,
  w: 1 + r1() * 1,
  t: r1() * 0.1,
}));
const r2 = rng(62);
const EMBERS = Array.from({ length: 18 }, () => ({
  x: r2() * 100, s: 2 + r2() * 3, dur: 9 + r2() * 10, del: -r2() * 18, drift: -30 + r2() * 60,
}));

// Slagpunkt i scenens koordinater (hammarens slagyta mot kugghjulet)
const IX = 262, IY = 150;

export default function Hero() {
  const { tr } = useLang();
  const h = tr.hero;
  // H3-film av slaget (svart bakgrund → screen-blend). Emblemet ligger kvar under
  // tills filmen faktiskt spelar, och används ensamt vid reducerad rörelse.
  const filmRef = useRef<HTMLVideoElement>(null);
  const [film, setFilm] = useState(false);
  useEffect(() => {
    const v = filmRef.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.src = v.dataset.src!;
    const on = () => setFilm(true);
    v.addEventListener("playing", on);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); });
    io.observe(v);
    return () => { io.disconnect(); v.removeEventListener("playing", on); };
  }, []);
  let n = 0;

  return (
    <section className="hero" id="top" data-anim>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="embers" aria-hidden="true">
        {EMBERS.map((e, i) => (
          <i key={i} style={{ left: `${e.x}%`, width: e.s, height: e.s, ["--dur" as string]: `${e.dur}s`, ["--del" as string]: `${e.del}s`, ["--drift" as string]: `${e.drift}px` }} />
        ))}
      </div>

      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="kicker hero-kicker"><span className="kicker-bar" />{h.kicker}</p>
          <h1 className="hero-title" aria-label={h.title.join(" ")}>
            {h.title.map((w, wi) => (
              <span key={wi} className={`hw ${wi === 2 ? "hot" : ""}`} aria-hidden="true">
                {[...w].map((c, ci) => (
                  <span key={ci} className="hl" style={{ ["--n" as string]: n++ }}>{c}</span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero-sub">{h.sub}</p>
          <div className="hero-actions">
            <a href="#sortiment" className="btn btn-hot">
              {h.btn1}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="#om-oss" className="btn btn-ghost">{h.btn2}</a>
          </div>
          <dl className="hero-stats">
            {h.stats.map(([num, suf, label]) => (
              <div key={label}>
                <dt><CountUp to={Number(num)} suffix={suf} /></dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={`hero-stage${film ? " has-film" : ""}`}>
          <svg viewBox="0 0 440 420" className="stage-svg" aria-hidden="true">
            {/* konstruktionslinjer */}
            <g className="bp">
              <circle cx="200" cy="212" r="118" className="bp-l dashed" />
              <path d="M60 212 H340 M200 70 V354" className="bp-l dashed" />
              <path d="M44 100 V326 M38 100 H50 M38 326 H50" pathLength="1" className="bp-l" />
              <path d="M80 384 H320 M80 378 V390 M320 378 V390" pathLength="1" className="bp-l" />
              <path d="M300 286 L346 334 H436" pathLength="1" className="bp-l" />
              <text x="36" y="213" className="bp-t" transform="rotate(-90 36 213)" textAnchor="middle">{h.dims[0]}</text>
              <text x="200" y="404" className="bp-t" textAnchor="middle">{h.dims[1]}</text>
              <text x="434" y="326" className="bp-t" textAnchor="end">{h.dims[2]}</text>
            </g>

            <Emblem id="hero" className="hero-em" x={80} y={70} width={240} height={240} />

            {/* slag: varm glöd + gnistor som kastas ut och faller (intro + loop) */}
            <defs>
              <radialGradient id="hit-glow">
                <stop offset="0" stopColor="#fff6dc" stopOpacity=".95" />
                <stop offset=".35" stopColor="#ffc457" stopOpacity=".55" />
                <stop offset="1" stopColor="#ff8a1e" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="spark-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="10" y2="0">
                <stop offset="0" stopColor="#ff7a12" stopOpacity="0" />
                <stop offset=".55" stopColor="#ffb547" />
                <stop offset="1" stopColor="#fff4cf" />
              </linearGradient>
            </defs>
            {["intro", "loop"].map((k) => (
              <g key={k} className={`impact impact-${k}`}>
                <circle cx={IX} cy={IY} r="18" className="shock" />
                <circle cx={IX} cy={IY} r="16" className="flash" fill="url(#hit-glow)" />
                <g transform={`translate(${IX} ${IY})`}>
                  {SPARKS.map((s, i) => (
                    <g key={i} className="sp-fall" style={{ ["--g" as string]: `${s.g.toFixed(0)}px`, ["--t" as string]: `${s.t.toFixed(2)}s` }}>
                      <g transform={`rotate(${s.a.toFixed(1)})`}>
                        <line x1="0" y1="0" x2={s.l.toFixed(1)} y2="0" className="spark"
                          style={{ strokeWidth: s.w, ["--d" as string]: `${s.d.toFixed(0)}px` }} />
                      </g>
                    </g>
                  ))}
                </g>
              </g>
            ))}
          </svg>
          <video ref={filmRef} className="hero-film" data-src="/film/stalco-slag.mp4" muted loop playsInline preload="none" aria-hidden="true" />
          <div className="plate">
            <span>{h.plate}</span>
            <span>STÅLCO AB · 1:1</span>
          </div>
        </div>
      </div>

      <a href="#sortiment" className="scroll-hint" aria-label={h.scroll}>
        <span>{h.scroll}</span><i />
      </a>
    </section>
  );
}
