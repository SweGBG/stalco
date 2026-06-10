"use client";
import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", msg: "" });

  const submit = () => {
    if (!form.name || !form.email || !form.msg) return;
    setSent(true);
  };

  return (
    <section className={styles.section} id="kontakt">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>// Kontakta oss</div>
          <h2 className={styles.title}>VI FINNS HÄR<br /><span className={styles.gold}>FÖR DIG</span></h2>
          <p className={styles.sub}>Frågor om produkter, volymrabatter, retur eller garanti? Vi svarar snabbt — alltid av någon som faktiskt kan verktyg.</p>

          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.35a16 16 0 0 0 7.75 7.75l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>
              </div>
              <div>
                <div className={styles.itemLabel}>Telefon</div>
                <a href="tel:+4681234567" className={styles.itemVal}>08-123 456 78</a>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div className={styles.itemLabel}>E-post</div>
                <a href="mailto:info@stalco.se" className={styles.itemVal}>info@stalco.se</a>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div className={styles.itemLabel}>Adress</div>
                <div className={styles.itemVal}>Industrivägen 4, 123 45 Stockholm</div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemIcon}>
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <div className={styles.itemLabel}>Öppettider</div>
                <div className={styles.itemVal}>Mån–Fre 07:30–17:00 · Lör 09–14</div>
              </div>
            </div>
          </div>

          <div className={styles.mapWrap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.8!2d18.0646!3d59.3326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5f0a14f2c5%3A0x1!2sIndustrivägen%2C+Stockholm!5e0!3m2!1ssv!2sse!4v1"
              width="100%" height="200"
              style={{ border: 0 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Stålco karta"
            />
          </div>
        </div>

        <div className={styles.right}>
          {sent ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>Meddelande skickat!</h3>
              <p>Vi återkommer inom en arbetsdag.</p>
            </div>
          ) : (
            <div className={styles.form}>
              <div className={styles.formTitle}>Skicka ett meddelande</div>
              <div className={styles.field}>
                <label className={styles.label}>Namn *</label>
                <input className={styles.input} placeholder="Förnamn Efternamn" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>E-post *</label>
                  <input className={styles.input} type="email" placeholder="din@mail.se" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Telefon</label>
                  <input className={styles.input} placeholder="070-000 00 00" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Meddelande *</label>
                <textarea className={`${styles.input} ${styles.textarea}`} placeholder="Berätta vad vi kan hjälpa dig med..." rows={5} value={form.msg} onChange={e => setForm({...form, msg: e.target.value})} />
              </div>
              <button className={styles.submitBtn} onClick={submit}>
                Skicka meddelande
                <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
              <p className={styles.note}>Svarstid: under 4 timmar på vardagar</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
