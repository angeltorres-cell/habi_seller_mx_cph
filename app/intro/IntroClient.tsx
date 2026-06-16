"use client";

import { useSearchParams } from "next/navigation";
import styles from "./intro.module.css";

const LANDING_URL = "https://habi-seller-mx-cph.vercel.app/";
const OFERTA_ESTANDAR_URL = "https://ofertas.tuhabi.mx/f9e1c4b9-17e0-4e44-a104-6feec893099c";

export default function IntroClient() {
  const searchParams = useSearchParams();
  const ofertaUrl = searchParams.get("oferta") ?? OFERTA_ESTANDAR_URL;

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>

        {/* ── ENCABEZADO ── */}
        <header className={styles.header}>
          <span className={styles.readyBadge}>✓ Tu oferta TuHabi está lista</span>
          <h1 className={styles.title}>
            <span className={styles.titleIntro}>¡Tenemos una novedad para ti!</span>
            Diseñamos un nuevo servicio exclusivo para quienes venden para volver a comprar. Asegura tu lugar en la lista de acceso.
          </h1>
        </header>

        {/* ── TARJETAS DE OPCIÓN ── */}
        <div className={styles.cards}>

          {/* PROGRAMA CAMBIO DE CASA — PREMIUM */}
          <div className={`${styles.card} ${styles.cardPremium}`}>
            <div className={styles.premiumBadge}>⭐ Más popular</div>

            {/* Encabezado */}
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Programa Cambio de Casa</h2>
              <p className={styles.cardDesc}>
                TuHabi compra tu inmueble, <strong>liquida tu hipoteca Infonavit</strong> y
                te otorga <strong>3 meses de estancia libre</strong> en tu propiedad para que tu
                puntaje crediticio se restablezca y puedas tramitar tu nuevo crédito sin complicaciones.
              </p>
            </div>

            {/* Beneficios */}
            <ul className={`${styles.checkList} ${styles.cardFeatures}`}>
              <li className={styles.featureIntro}>✦ Todo lo de la Oferta Estándar, más:</li>
              <li><span className={styles.check}>✓</span> Hipoteca Infonavit liquidada</li>
              <li><span className={styles.check}>✓</span> No necesitas mudarte a un lugar temporal</li>
              <li><span className={styles.check}>✓</span> Tiempo real para asegurar tu próximo hogar</li>
              <li><span className={styles.check}>✓</span> Ahorro de costo de una mudanza adicional</li>
            </ul>

            {/* Precio y CTA */}
            <div className={styles.cardFooter}>
              <div className={styles.cardPriceWrapper}>
                <div className={styles.costTag}>Costo adicional: <strong>-5%</strong> sobre tu oferta base</div>
              </div>
              <a href={LANDING_URL} className={styles.btnPrimary}>
                Unirme a la lista de espera del programa
              </a>
              <p className={styles.tycNote}>Aplica términos y condiciones*</p>
            </div>
          </div>

          {/* OFERTA ESTÁNDAR */}
          <div className={`${styles.card} ${styles.cardStandard}`}>

            {/* Encabezado */}
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Oferta Estándar</h2>
              <p className={styles.cardDesc}>
                Recibe una oferta directa por tu inmueble. Proceso rápido, pago seguro
                y sin publicación ni visitas de desconocidos.
              </p>
            </div>

            {/* Beneficios */}
            <ul className={`${styles.checkList} ${styles.cardFeatures}`}>
              <li><span className={styles.check}>✓</span> Revisa detalles de tu oferta de compra</li>
              <li><span className={styles.check}>✓</span> Cierra y recibe tu dinero de forma segura</li>
              <li><span className={styles.check}>✓</span> Proceso rápido y sin complicaciones</li>
              <li><span className={styles.check}>✓</span> Pago seguro y directo</li>
            </ul>

            {/* Precio y CTA */}
            <div className={styles.cardFooter}>
              <div className={styles.cardPriceWrapper} />
              <a
                href={ofertaUrl}
                className={styles.btnSecondary}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver mi oferta de compra estándar
              </a>
              <p className={`${styles.tycNote} ${styles.tycNotePlaceholder}`} aria-hidden="true">Aplica términos y condiciones*</p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
