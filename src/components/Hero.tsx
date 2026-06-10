"use client";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.main}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=80&fit=crop&crop=center"
          alt="Professionella verktyg"
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.kicker}>— Proffsutrustning för proffs</div>
          <h1 className={styles.title}>
            BYGGD FÖR<br />
            <span className={styles.gold}>VERKLIGA</span><br />
            ARBETEN
          </h1>
          <p className={styles.sub}>
            Professionella verktyg och maskiner för hantverkare, industri och
            byggbranschen. Över 2 000 produkter från världens ledande varumärken.
          </p>
          <div className={styles.actions}>
            <a href="#produkter" className={styles.btnPrimary}>Se sortimentet</a>
            <a href="#om-oss" className={styles.btnOutline}>Om Stålco</a>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>2 000<sup>+</sup></span>
              <span className={styles.statLabel}>Produkter</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>15<sup>år</sup></span>
              <span className={styles.statLabel}>I branschen</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>8 000<sup>+</sup></span>
              <span className={styles.statLabel}>Kunder</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.side}>
        <div className={styles.sideCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80&fit=crop&crop=center"
            alt="Elverktyg"
          />
          <div className={styles.sideOverlay} />
          <div className={styles.sideContent}>
            <div className={styles.sideKicker}>Nyhet</div>
            <div className={styles.sideName}>DeWalt 18V XR</div>
            <div className={styles.sideSub}>Borstlös borr/skruvdragare</div>
          </div>
        </div>
        <div className={styles.sideCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&fit=crop&crop=center"
            alt="Handverktyg"
          />
          <div className={styles.sideOverlay} />
          <div className={styles.sideContent}>
            <div className={styles.sideKicker}>Populärt</div>
            <div className={styles.sideName}>Milwaukee M18</div>
            <div className={styles.sideSub}>Slagskruvdragare FUEL</div>
          </div>
        </div>
      </div>
    </section>
  );
}
