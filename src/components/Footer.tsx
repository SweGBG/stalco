"use client";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Footer.module.css";

export default function Footer() {
  const { lang } = useLang();
  const tr = t[lang].footer;
  return (
    <footer className={styles.footer}>
      <div className={`${styles.top} fade-in`}>
        <div className={styles.brand}>
          <div className={styles.logo}>STÅL<span>CO</span></div>
          <p className={styles.desc}>{tr.desc}</p>
          <div className={styles.newsletter}>
            <input type="email" className={styles.input} placeholder={tr.placeholder} />
            <button className={styles.subBtn}>{tr.subBtn}</button>
          </div>
          <div className={styles.orgnr}>{tr.orgnr}</div>
        </div>
        <div><div className={styles.colTitle}>{tr.col1}</div><ul className={styles.links}>{tr.shop.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul></div>
        <div><div className={styles.colTitle}>{tr.col2}</div><ul className={styles.links}>{tr.help.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul></div>
        <div><div className={styles.colTitle}>{tr.col3}</div><ul className={styles.links}>{tr.company.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul></div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.copy}>{tr.copy}</div>
        <div className={styles.trust}><span>🔒 SSL</span><span>✓ Klarna</span><span>✓ Swish</span><span>✓ Faktura</span></div>
        <div className={styles.socials}>{["in","ig","yt","x"].map(s => <a key={s} href="#" className={styles.social}>{s}</a>)}</div>
      </div>
    </footer>
  );
}
