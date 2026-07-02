"use client";

import { useEffect, useRef, useState } from "react";
import { useCardTracking } from "@/hooks/useCardTracking";
import { useSearchParams } from "next/navigation";
import { resolveOfertaBase, formatMXN, type Lead } from "@/lib/oferta";

declare global {
  interface Window {
    analytics?: {
      track(event: string, properties?: Record<string, unknown>): void;
      page(category?: string, name?: string | Record<string, unknown>, properties?: Record<string, unknown>): void;
    };
  }
}
import styles from "@/app/intro/intro.module.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw6btcMsIvFgz0-gCT6Nlh7qExBg3E41FItxfSKqWshN4Fp21Fmg5kLyVo2n9N05C7ueg/exec";

const OFERTA_ESTANDAR_URL =
  "https://ofertas.tuhabi.mx/f9e1c4b9-17e0-4e44-a104-6feec893099c";

type Props = {
  uuid: string;
  porcentaje: number;
  landing: string;
};

async function sendLog(
  logType: string,
  uuid: string,
  boton: string,
  landing: string,
  source?: string
) {
  const payload: Record<string, string> = { logType, uuid, boton, version: landing, userAgent: navigator.userAgent };
  if (source) payload.source = source;
  await Promise.race([
    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    }),
    new Promise<void>((resolve) => setTimeout(resolve, 1500)),
  ]);
}

export default function IntroLanding({ uuid, porcentaje, landing }: Props) {
  const [lead, setLead]       = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const cardProgramaRef  = useRef<HTMLDivElement>(null);
  const btnListaRef      = useRef<HTMLButtonElement>(null);
  const cardOfertaRef    = useRef<HTMLDivElement>(null);
  const btnOfertaRef     = useRef<HTMLButtonElement>(null);

  const isReady = !!lead;
  useCardTracking(cardProgramaRef, "card_programa",        uuid, landing as "intro" | "intro-v2", isReady);
  useCardTracking(btnListaRef,    "btn_lista_espera",     uuid, landing as "intro" | "intro-v2", isReady);
  useCardTracking(cardOfertaRef,  "card_oferta_estandar", uuid, landing as "intro" | "intro-v2", isReady);
  useCardTracking(btnOfertaRef,   "btn_oferta_estandar",  uuid, landing as "intro" | "intro-v2", isReady);

  const searchParams = useSearchParams();
  const source = searchParams.get("channel") === "whatsapp" ? "whatsapp" : "comercial";

  useEffect(() => {
    sendLog("logs_boton", uuid, "", landing, source);
  }, [uuid, landing, source]);

  useEffect(() => {
    const properties = { uuid, landing_version: landing, country: "MX" };
    if (process.env.NODE_ENV === "development") {
      console.log("🟣 Segment: page", properties);
    }
    window.analytics?.page(landing, properties);
  }, [uuid, landing]);

  useEffect(() => {
    fetch(`/api/lead/${uuid}`)
      .then((res) => {
        if (!res.ok) throw new Error("Lead no encontrado");
        return res.json() as Promise<Lead>;
      })
      .then((data) => { setLead(data); setLoading(false); })
      .catch((err: Error) => { setError(err.message); setLoading(false); });
  }, [uuid]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.wrapper}>
          <p style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>
            Cargando tu oferta…
          </p>
        </div>
      </main>
    );
  }

  if (error || !lead) {
    return (
      <main className={styles.page}>
        <div className={styles.wrapper}>
          <p style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>
            No encontramos tu oferta. Verifica el enlace o contáctanos.
          </p>
        </div>
      </main>
    );
  }

  const { properties: p } = lead;
  const ofertaUrl = p.deal_uuid
    ? `https://ofertas.tuhabi.mx/${p.deal_uuid}`
    : OFERTA_ESTANDAR_URL;
  const ofertaBase = resolveOfertaBase(p);
  const ofertaConPrograma =
    ofertaBase !== null
      ? Math.round(ofertaBase * (1 - porcentaje / 100))
      : null;

  const ahorroMudanza = ofertaConPrograma !== null ? ofertaConPrograma * 0.005 : null;
  const ahorroArriendo = ofertaConPrograma !== null ? ofertaConPrograma * 0.01 * 4 : null;
  const totalAhorroCalculado =
    ahorroMudanza !== null && ahorroArriendo !== null
      ? ahorroMudanza + ahorroArriendo
      : null;

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        {/* HEADER */}
        <header className={styles.header}>
          <span className={styles.readyBadge}>✓ Tu oferta TuHabi está lista</span>
          <h1 className={styles.title}>
            <span className={styles.titleIntro}>¡Tenemos una novedad para ti!</span>
            <span className={styles.titleSub}>Diseñamos un nuevo servicio exclusivo para quienes venden para volver a comprar.</span>
          </h1>
        </header>

        {/* CARDS */}
        <div className={styles.cards}>

          {/* PROGRAMA CAMBIO DE CASA — PREMIUM */}
          <div ref={cardProgramaRef} className={`${styles.card} ${styles.cardPremium}`}>
            <div className={styles.premiumBadge}>
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none" style={{ marginRight: 6, verticalAlign: "middle", flexShrink: 0 }}>
                <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Recomendado para ti
            </div>

            {/* Encabezado */}
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Programa Cambio de Casa</h2>
              <p className={styles.cardDesc}>
                TuHabi compra tu inmueble,{" "}
                <strong>liquida tu hipoteca Infonavit</strong> y te otorga{" "}
                <strong>4 meses de estancia libre</strong> en tu propiedad para
                que tu puntaje crediticio se restablezca y puedas tramitar tu
                nuevo crédito sin complicaciones.
              </p>
            </div>

            {/* Beneficios */}
            <ul className={`${styles.checkList} ${styles.cardFeatures}`}>
              <li className={styles.featureIntro}>✦ Todo lo de la Oferta Estándar, más:</li>
              <li><span className={styles.check}>✓</span> No pagas ni un peso de hipoteca durante 4 meses</li>
              <li><span className={styles.check}>✓</span> Te quedas viviendo en tu casa hasta tener la nueva</li>
              <li><span className={styles.check}>✓</span> Una sola mudanza: directo a tu nuevo hogar</li>
              <li>
                <span className={styles.check}>✓</span>
                {totalAhorroCalculado !== null
                  ? <>Ahorro real de hasta <strong>{formatMXN(totalAhorroCalculado)}</strong> en gastos</>
                  : "Ahorro real en gastos de mudanza y arriendo"}
              </li>
            </ul>

            {/* Desglose de ahorros */}
            {totalAhorroCalculado !== null && (
              <div className={styles.savingsSection}>
                <p className={styles.savingsTitle}>💰 Lo que te ahorras con Cambio de Casa</p>
                <div className={styles.savingsGrid}>
                  <div className={styles.savingsItem}>
                    <span className={styles.savingsLabel}>Arriendo temporal (4 meses)</span>
                    <span className={styles.savingsValue}>{formatMXN(ahorroArriendo)}</span>
                  </div>
                  <div className={styles.savingsItem}>
                    <span className={styles.savingsLabel}>Mudanza extra</span>
                    <span className={styles.savingsValue}>{formatMXN(ahorroMudanza)}</span>
                  </div>
                  <div className={`${styles.savingsItem} ${styles.savingsItemAccent}`}>
                    <span className={styles.savingsLabel}>Hipoteca Infonavit (4 meses)</span>
                    <span className={styles.savingsValueAccent}>+ tu ahorro</span>
                  </div>
                </div>
                <div className={styles.savingsTotal}>
                  <span className={styles.savingsTotalLabel}>Tu ahorro sin contar hipoteca</span>
                  <span className={styles.savingsTotalValue}>{formatMXN(totalAhorroCalculado)}</span>
                </div>
                <p className={styles.savingsFootnote}>
                  *Además, TuHabi paga tu hipoteca Infonavit durante 4 meses. Suma lo que pagas de hipoteca al mes × 4 para conocer tu ahorro total.
                </p>
              </div>
            )}

            {/* Precio y CTA */}
            <div className={styles.cardFooter}>
              <div className={styles.cardPriceWrapper}>
                <div className={styles.costTag}>
                  {ofertaConPrograma !== null ? (
                    <>Valor de oferta: <strong>{formatMXN(ofertaConPrograma)}</strong></>
                  ) : (
                    <>Costo adicional: <strong>-{porcentaje}%</strong> sobre tu oferta base</>
                  )}
                </div>
              </div>
              <button
                ref={btnListaRef}
                type="button"
                className={styles.btnPrimary}
                onClick={async () => {
                  await sendLog("lista_espera", uuid, "Quiero Cambio de Casa", landing);
                  window.location.href = landing === "intro-v2" ? `/v2/${uuid}` : `/${uuid}`;
                }}
              >
                Quiero Cambio de Casa
              </button>
              <p className={styles.tycNote}>Aplica términos y condiciones*</p>
            </div>
          </div>

          {/* SEPARADOR */}
          <div className={styles.separator}>— o —</div>

          {/* OFERTA ESTÁNDAR */}
          <div ref={cardOfertaRef} className={`${styles.card} ${styles.cardStandard}`}>

            {/* Encabezado */}
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Oferta Estándar</h2>
              <p className={styles.cardDesc}>
                Recibe una oferta directa por tu inmueble. Proceso rápido, pago
                seguro y sin publicación ni visitas de desconocidos.
              </p>
            </div>

            {/* Beneficios */}
            <ul className={`${styles.checkList} ${styles.cardFeatures}`}>
              <li><span className={styles.check}>✓</span> Revisa detalles de tu oferta de compra</li>
              <li><span className={styles.check}>✓</span> Cierra y recibe tu dinero de forma segura</li>
              <li><span className={styles.check}>✓</span> Proceso rápido y sin complicaciones</li>
              <li><span className={styles.check}>✓</span> Pago seguro y directo</li>
            </ul>

            <div className={styles.cardSpacer} />

            {/* Precio y CTA */}
            <div className={styles.cardFooter}>
              <div className={styles.cardPriceWrapper}>
                {ofertaBase !== null && (
                  <div className={styles.ofertaValor}>
                    Valor de oferta: <strong>{formatMXN(ofertaBase)}</strong>
                  </div>
                )}
              </div>
              <button
                ref={btnOfertaRef}
                type="button"
                className={styles.btnOutlineGrey}
                onClick={async () => {
                  await sendLog("oferta_estandar", uuid, "Ver oferta estándar", landing);
                  window.open(ofertaUrl, "_blank", "noopener,noreferrer");
                }}
              >
                Ver mi oferta de compra estándar
              </button>
              <p className={`${styles.tycNote} ${styles.tycNotePlaceholder}`} aria-hidden="true">Aplica términos y condiciones*</p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
