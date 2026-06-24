"use client";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Contact.module.css";

export default function Contact() {
  const { lang } = useLang();
  const tr = t[lang].contact;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", phone:"", msg:"" });

  return (
    <section className={styles.section} id="kontakt">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.eyebrow} data-reveal>{tr.eyebrow}</div>
          <h2 className={styles.title} data-reveal style={{ ["--reveal-delay" as string]: "0.08s" }}>{tr.title1}<br /><span className={`${styles.gold} shimmer`}>{tr.title2}</span></h2>
          <p className={styles.sub} data-reveal style={{ ["--reveal-delay" as string]: "0.16s" }}>{tr.sub}</p>
          <div className={styles.items} data-reveal style={{ ["--reveal-delay" as string]: "0.22s" }}>
            {[
              { label: tr.phone, val: "08-123 456 78", href: "tel:+4681234567" },
              { label: tr.email, val: "info@stalco.se", href: "mailto:info@stalco.se" },
              { label: tr.address, val: "Industrivägen 4, 123 45 Stockholm", href: undefined },
              { label: tr.hours, val: tr.hoursVal, href: undefined },
            ].map(item => (
              <div key={item.label} className={styles.item}>
                <div className={styles.itemIcon}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></div>
                <div>
                  <div className={styles.itemLabel}>{item.label}</div>
                  {item.href ? <a href={item.href} className={styles.itemVal}>{item.val}</a> : <div className={styles.itemVal}>{item.val}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.mapWrap}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.8!2d18.0646!3d59.3326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5f0a14f2c5%3A0x1!2sIndustrivägen%2C+Stockholm!5e0!3m2!1ssv!2sse!4v1" width="100%" height="200" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Stålco karta" />
          </div>
        </div>
        <div className={styles.right} data-reveal="scale" style={{ ["--reveal-delay" as string]: "0.12s" }}>
          {sent ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>{tr.successTitle}</h3>
              <p>{tr.successSub}</p>
            </div>
          ) : (
            <div className={styles.form}>
              <div className={styles.formTitle}>{tr.formTitle}</div>
              <div className={styles.field}><label className={styles.label}>{tr.labelName}</label><input className={styles.input} placeholder={tr.placeholderName} value={form.name} onChange={e => setForm({...form, name:e.target.value})} /></div>
              <div className={styles.row}>
                <div className={styles.field}><label className={styles.label}>{tr.labelEmail}</label><input className={styles.input} type="email" placeholder={tr.placeholderEmail} value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></div>
                <div className={styles.field}><label className={styles.label}>{tr.labelPhone}</label><input className={styles.input} placeholder={tr.placeholderPhone} value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} /></div>
              </div>
              <div className={styles.field}><label className={styles.label}>{tr.labelMsg}</label><textarea className={`${styles.input} ${styles.textarea}`} placeholder={tr.placeholderMsg} rows={5} value={form.msg} onChange={e => setForm({...form, msg:e.target.value})} /></div>
              <button className={styles.submitBtn} onClick={() => { if(form.name && form.email && form.msg) setSent(true); }}>{tr.submitBtn} <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
              <p className={styles.note}>{tr.note}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
