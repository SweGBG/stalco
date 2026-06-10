import styles from "./Brands.module.css";

const brands = ["DeWalt", "Milwaukee", "Makita", "Bosch", "Stanley", "Hilti", "Husqvarna"];

export default function Brands() {
  return (
    <div className={`${styles.wrap} fade-in`}>
      <div className={styles.label}>AUKTORISERAD ÅTERFÖRSÄLJARE</div>
      <div className={styles.track}>
        {[...brands, ...brands].map((b, i) => (
          <span key={i} className={styles.brand}>{b}</span>
        ))}
      </div>
    </div>
  );
}
