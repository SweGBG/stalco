"use client";
import { useRef } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import CountUp from "./CountUp";
import Magnetic from "./Magnetic";
import styles from "./Hero.module.css";

export default function Hero() {
  const { lang } = useLang();
  const tr = t[lang].hero;
  const mainRef = useRef<HTMLDivElement>(null);

  // Diskret spotlight som följer muspekaren över hjältebilden
  const onMove = (e: React.MouseEvent) => {
    const el = mainRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.main} ref={mainRef} onMouseMove={onMove}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=80&fit=crop&crop=center" alt="Professionella verktyg" />
        <div className={styles.overlay} />
        <div className={styles.spotlight} />
        <div className={styles.content}>
          <div className={styles.kicker} data-reveal style={{ ["--reveal-delay" as string]: "0.05s" }}>{tr.kicker}</div>
          <h1 className={styles.title} data-reveal style={{ ["--reveal-delay" as string]: "0.12s" }}>
            {tr.title1}<br /><span className={`${styles.gold} shimmer`}>{tr.title2}</span><br />{tr.title3}
          </h1>
          <p className={styles.sub} data-reveal style={{ ["--reveal-delay" as string]: "0.2s" }}>{tr.sub}</p>
          <div className={styles.actions} data-reveal style={{ ["--reveal-delay" as string]: "0.28s" }}>
            <Magnetic href="#produkter" className={styles.btnPrimary}>{tr.btn1}</Magnetic>
            <Magnetic href="#om-oss" className={styles.btnOutline} strength={0.18}>{tr.btn2}</Magnetic>
          </div>
          <div className={styles.stats} data-reveal style={{ ["--reveal-delay" as string]: "0.36s" }}>
            <div className={styles.stat}><span className={styles.statNum}><CountUp value={tr.stat1Num} /></span><span className={styles.statLabel}>{tr.stat1Label}</span></div>
            <div className={styles.stat}><span className={styles.statNum}><CountUp value={tr.stat2Num} /></span><span className={styles.statLabel}>{tr.stat2Label}</span></div>
            <div className={styles.stat}><span className={styles.statNum}><CountUp value={tr.stat3Num} /></span><span className={styles.statLabel}>{tr.stat3Label}</span></div>
          </div>
        </div>
      </div>
      <div className={styles.side}>
        <div className={styles.sideCard} data-reveal="right" style={{ ["--reveal-delay" as string]: "0.15s" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80&fit=crop&crop=center" alt="Elverktyg" />
          <div className={styles.sideOverlay} />
          <div className={styles.sideContent}>
            <div className={styles.sideKicker}>{tr.card1Kicker}</div>
            <div className={styles.sideName}>{tr.card1Name}</div>
            <div className={styles.sideSub}>{tr.card1Sub}</div>
          </div>
        </div>
        <div className={styles.sideCard} data-reveal="right" style={{ ["--reveal-delay" as string]: "0.28s" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1590635023142-73c3d34f2805?w=600&q=80&fit=crop&crop=center" alt="Handverktyg" />
          <div className={styles.sideOverlay} />
          <div className={styles.sideContent}>
            <div className={styles.sideKicker}>{tr.card2Kicker}</div>
            <div className={styles.sideName}>{tr.card2Name}</div>
            <div className={styles.sideSub}>{tr.card2Sub}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
