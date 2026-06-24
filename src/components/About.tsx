"use client";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import CountUp from "./CountUp";
import styles from "./About.module.css";

const uspIcons = [
  <svg key="1" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  <svg key="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5.5"/></svg>,
  <svg key="3" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="4" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12"/></svg>,
];

export default function About() {
  const { lang } = useLang();
  const tr = t[lang].about;
  return (
    <section className={styles.section} id="om-oss">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.eyebrow} data-reveal>{tr.eyebrow}</div>
          <h2 className={styles.title} data-reveal style={{ ["--reveal-delay" as string]: "0.08s" }}>{tr.title1}<br /><span className={`${styles.gold} shimmer`}>{tr.title2}</span></h2>
          <p className={styles.body} data-reveal style={{ ["--reveal-delay" as string]: "0.16s" }}>{tr.body1}</p>
          <p className={styles.body} data-reveal style={{ ["--reveal-delay" as string]: "0.22s" }}>{tr.body2}</p>
          <div className={styles.facts} data-reveal style={{ ["--reveal-delay" as string]: "0.3s" }}>
            <div className={styles.fact}><span className={styles.factNum}><CountUp value={tr.stat1Num} /></span><span className={styles.factLabel}>{tr.stat1Label}</span></div>
            <div className={styles.fact}><span className={styles.factNum}><CountUp value={tr.stat2Num} /></span><span className={styles.factLabel}>{tr.stat2Label}</span></div>
            <div className={styles.fact}><span className={styles.factNum}><CountUp value={tr.stat3Num} /></span><span className={styles.factLabel}>{tr.stat3Label}</span></div>
          </div>
        </div>
        <div className={styles.right} data-reveal="right" style={{ ["--reveal-delay" as string]: "0.12s" }}>
          <div className={styles.imgWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80&fit=crop&crop=center" alt="Stålco verkstad" />
            <div className={styles.imgOverlay} />
            <div className={styles.imgBadge}>
              <div className={styles.badgeNum}>2009</div>
              <div className={styles.badgeSub}>{tr.badgeSub}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.uspGrid}>
        {tr.usps.map((u, i) => (
          <div key={u.label} className={styles.usp} data-reveal="scale" style={{ ["--reveal-delay" as string]: `${i * 0.08}s` }}>
            <div className={styles.uspIcon}>{uspIcons[i]}</div>
            <div><div className={styles.uspLabel}>{u.label}</div><div className={styles.uspDesc}>{u.desc}</div></div>
          </div>
        ))}
      </div>
    </section>
  );
}
