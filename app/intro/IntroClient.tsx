"use client";

import { useSearchParams } from "next/navigation";
import styles from "./intro.module.css";

const LANDING_URL = "https://habi-seller-mx-cph.vercel.app/";

export default function IntroClient() {
  const searchParams = useSearchParams();
  const ofertaUrl = searchParams.get("oferta");

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>habi</div>

        <h1 className={styles.title}>
          Conoce tu oferta de compra y asegura la transición a tu próximo hogar
          sin salir de casa
        </h1>

        <p className={styles.subtitle}>
          En Habi no solo compramos tu inmueble. Si estás buscando cambiar de
          casa, diseñamos un programa exclusivo donde liquidamos tu hipoteca
          actual con Infonavit y te damos hasta 3 meses de estancia libre para
          que tu puntaje crediticio se restablezca y asegures tu próximo hogar
          con total tranquilidad.
        </p>

        <div className={styles.actions}>
          <a href={LANDING_URL} className={styles.btnPrimary}>
            Me interesa
          </a>

          {ofertaUrl ? (
            <a
              href={ofertaUrl}
              className={styles.btnSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conocer mi oferta de compra estándar
            </a>
          ) : (
            <button className={styles.btnSecondaryDisabled} disabled>
              Conocer mi oferta de compra estándar
            </button>
          )}
        </div>

        <p className={styles.footnote}>
          Sin compromiso · Proceso 100% digital
        </p>
      </div>
    </main>
  );
}
