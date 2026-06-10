import styles from "./About.module.css";

const usps = [
  { icon: <svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, label: "Fri frakt", desc: "Ordrar över 799 kr. 1–2 dagars leverans." },
  { icon: <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5.5"/></svg>, label: "30 dagars retur", desc: "Enkelt och kostnadsfritt." },
  { icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: "Officiell garanti", desc: "Fullständig tillverkargaranti på alla produkter." },
  { icon: <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12"/></svg>, label: "Expert-support", desc: "Proffs som pratar verktyg, inte skript." },
];

export default function About() {
  return (
    <section className={styles.section} id="om-oss">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>// Om Stålco</div>
          <h2 className={styles.title}>
            15 ÅR AV<br />
            <span className={styles.gold}>PROFFSUTRUSTNING</span>
          </h2>
          <p className={styles.body}>
            Stålco grundades 2009 av hantverkare som inte var nöjda med utbudet
            på marknaden. Vi ville ha ett ställe med rätt verktyg, rätt kunskap
            och rätt pris — så vi byggde det själva.
          </p>
          <p className={styles.body}>
            Idag är vi auktoriserad återförsäljare av DeWalt, Milwaukee, Makita,
            Bosch, Stanley och Hilti. Allt vi säljer är äkta varor med fullständig
            tillverkargaranti.
          </p>
          <div className={styles.facts}>
            <div className={styles.fact}>
              <span className={styles.factNum}>2 000<sup>+</sup></span>
              <span className={styles.factLabel}>Produkter i lager</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.factNum}>8 000<sup>+</sup></span>
              <span className={styles.factLabel}>Nöjda kunder</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.factNum}>15<sup>år</sup></span>
              <span className={styles.factLabel}>I branschen</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imgWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80&fit=crop&crop=center"
              alt="Stålco verkstad"
            />
            <div className={styles.imgOverlay} />
            <div className={styles.imgBadge}>
              <div className={styles.badgeNum}>2009</div>
              <div className={styles.badgeSub}>Grundat</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.uspGrid}>
        {usps.map(u => (
          <div key={u.label} className={styles.usp}>
            <div className={styles.uspIcon}>{u.icon}</div>
            <div>
              <div className={styles.uspLabel}>{u.label}</div>
              <div className={styles.uspDesc}>{u.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
