"use client";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Hero.module.css";

export default function Hero() {
  const { lang } = useLang();
  const tr = t[lang].hero;
  return (
    <section className={styles.hero}>
      <div className={styles.main}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=80&fit=crop&crop=center" alt="Professionella verktyg" />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.kicker}>{tr.kicker}</div>
          <h1 className={styles.title}>
            {tr.title1}<br /><span className={styles.gold}>{tr.title2}</span><br />{tr.title3}
          </h1>
          <p className={styles.sub}>{tr.sub}</p>
          <div className={styles.actions}>
            <a href="#produkter" className={styles.btnPrimary}>{tr.btn1}</a>
            <a href="#om-oss" className={styles.btnOutline}>{tr.btn2}</a>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}><span className={styles.statNum}>{tr.stat1Num}</span><span className={styles.statLabel}>{tr.stat1Label}</span></div>
            <div className={styles.stat}><span className={styles.statNum}>{tr.stat2Num}</span><span className={styles.statLabel}>{tr.stat2Label}</span></div>
            <div className={styles.stat}><span className={styles.statNum}>{tr.stat3Num}</span><span className={styles.statLabel}>{tr.stat3Label}</span></div>
          </div>
        </div>
      </div>
      <div className={styles.side}>
        <div className={styles.sideCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80&fit=crop&crop=center" alt="Elverktyg" />
          <div className={styles.sideOverlay} />
          <div className={styles.sideContent}>
            <div className={styles.sideKicker}>{tr.card1Kicker}</div>
            <div className={styles.sideName}>{tr.card1Name}</div>
            <div className={styles.sideSub}>{tr.card1Sub}</div>
          </div>
        </div>
        <div className={styles.sideCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&fit=crop&crop=center" alt="Handverktyg" />
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
