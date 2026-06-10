import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>STÅL<span>CO</span></div>
          <p className={styles.desc}>Professionella verktyg och maskiner sedan 2009. Auktoriserad återförsäljare med över 2 000 produkter i lager.</p>
          <div className={styles.newsletter}>
            <input type="email" className={styles.input} placeholder="Din e-postadress" />
            <button className={styles.subBtn}>Prenumerera</button>
          </div>
          <div className={styles.orgnr}>Org.nr: 556xxx-xxxx · Momsreg. · F-skatt</div>
        </div>

        <div>
          <div className={styles.colTitle}>Sortiment</div>
          <ul className={styles.links}>
            {["Handverktyg","Elverktyg","Maskiner","Mätinstrument","Skyddsutrustning","Förvaring"].map(l => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Kundservice</div>
          <ul className={styles.links}>
            {["Frakt & Retur","Garanti","Betalning","Kontakt","FAQ"].map(l => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Företag</div>
          <ul className={styles.links}>
            {["Om oss","Karriär","Integritetspolicy","Villkor","Cookies"].map(l => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copy}>© 2026 Stålco AB · Alla rättigheter förbehållna</div>
        <div className={styles.trust}>
          <span>🔒 SSL</span>
          <span>✓ Klarna</span>
          <span>✓ Swish</span>
          <span>✓ Faktura</span>
        </div>
        <div className={styles.socials}>
          {["in","ig","yt","x"].map(s => <a key={s} href="#" className={styles.social}>{s}</a>)}
        </div>
      </div>
    </footer>
  );
}
