import styles from "./CostSection.module.css";

export default function CostSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inline}>
        <span className={styles.text}>Costo del servicio:</span>
        <span className={styles.num}>
          -6<span className={styles.sym}>%</span>
        </span>
        <span className={styles.detail}>sobre el precio de compra de tu inmueble</span>
      </div>
    </section>
  );
}
