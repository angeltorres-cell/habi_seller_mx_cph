import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <h1>
            No tienes por qué resolver esto <em>solo</em>
          </h1>
          <p>
            Recibe una oferta directa por tu inmueble. Sin publicar, sin visitas
            de desconocidos, sin complicaciones.
          </p>
        </div>
      </div>
    </section>
  );
}
