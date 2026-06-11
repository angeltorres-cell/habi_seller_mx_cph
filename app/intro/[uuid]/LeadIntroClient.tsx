"use client";

import { useEffect, useState } from "react";
import styles from "../intro.module.css";

const LANDING_URL = "https://habi-seller-mx-cph.vercel.app/";
const OFERTA_ESTANDAR_URL =
  "https://ofertas.tuhabi.mx/f9e1c4b9-17e0-4e44-a104-6feec893099c";

type LeadProperties = {
  link_bnpl__comercial_?: string;
  bnpl_1__comercial_?: string;
  final_final_aprobado_b_o?: string;
  oferta_final_prestamo_mx_calculada?: string;
  precio_comite?: string;
  precio_comite_original?: string;
  pipeline?: string;
  country?: string;
  deal_uuid?: string;
};

type Lead = {
  id: string;
  properties: LeadProperties;
};

function formatMXN(val?: string) {
  if (!val) return null;
  const num = parseFloat(val);
  if (isNaN(num)) return val;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(num);
}

export default function LeadIntroClient({ uuid }: { uuid: string }) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/lead/${uuid}`)
      .then((res) => {
        if (!res.ok) throw new Error("Lead no encontrado");
        return res.json() as Promise<Lead>;
      })
      .then((data) => {
        setLead(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
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
  const ofertaUrl = p.link_bnpl__comercial_ ?? OFERTA_ESTANDAR_URL;
  const hasFinancials =
    p.precio_comite ||
    p.oferta_final_prestamo_mx_calculada ||
    p.final_final_aprobado_b_o;

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        {/* HEADER */}
        <header className={styles.header}>
          <span className={styles.readyBadge}>✓ Tu oferta TuHabi está lista</span>
          <h1 className={styles.title}>
            ¡Tenemos una novedad para ti! Diseñamos un nuevo servicio exclusivo
            para quienes venden para volver a comprar. Asegura tu lugar en la
            lista de acceso.
          </h1>
        </header>

        {/* BLOQUE DE FINANCIEROS PERSONALIZADOS */}
        {hasFinancials && (
          <div className={styles.financialsBlock}>
            {p.precio_comite && (
              <div className={styles.financialItem}>
                <span className={styles.financialLabel}>Precio comité</span>
                <span className={styles.financialValue}>
                  {formatMXN(p.precio_comite)}
                </span>
              </div>
            )}
            {p.oferta_final_prestamo_mx_calculada && (
              <div className={styles.financialItem}>
                <span className={styles.financialLabel}>Oferta calculada</span>
                <span className={styles.financialValue}>
                  {formatMXN(p.oferta_final_prestamo_mx_calculada)}
                </span>
              </div>
            )}
            {p.final_final_aprobado_b_o && (
              <div className={styles.financialItem}>
                <span className={styles.financialLabel}>Monto aprobado</span>
                <span className={styles.financialValue}>
                  {formatMXN(p.final_final_aprobado_b_o)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* CARDS */}
        <div className={styles.cards}>
          {/* PROGRAMA CAMBIO DE CASA — PREMIUM */}
          <div className={`${styles.card} ${styles.cardPremium}`}>
            <div className={styles.premiumBadge}>★ Nuevo Exclusivo</div>
            <h2 className={styles.cardTitle}>Programa Cambio de Casa</h2>
            <p className={styles.cardDesc}>
              TuHabi compra tu inmueble,{" "}
              <strong>liquida tu hipoteca Infonavit</strong> y te otorga{" "}
              <strong>3 meses de estancia libre</strong> en tu propiedad para
              que tu puntaje crediticio se restablezca y puedas tramitar tu
              nuevo crédito sin complicaciones.
            </p>
            <ul className={styles.checkList}>
              <li>
                <span className={styles.check}>✓</span> Hipoteca Infonavit
                liquidada
              </li>
              <li>
                <span className={styles.check}>✓</span> 3 meses de estancia sin
                costo de renta
              </li>
              <li>
                <span className={styles.check}>✓</span> Tiempo real para
                asegurar tu próximo hogar
              </li>
              <li>
                <span className={styles.check}>✓</span> Un solo proceso, sin
                intermediarios
              </li>
            </ul>
            <div className={styles.costTag}>
              Costo adicional: <strong>-6%</strong> sobre tu oferta base
            </div>
            <a href={LANDING_URL} className={styles.btnPrimary}>
              Unirme a la lista de espera del programa
            </a>
          </div>

          {/* OFERTA ESTÁNDAR */}
          <div className={`${styles.card} ${styles.cardStandard}`}>
            <h2 className={styles.cardTitle}>Oferta Estándar</h2>
            <p className={styles.cardDesc}>
              Recibe una oferta directa por tu inmueble. Proceso rápido, pago
              seguro y sin publicación ni visitas de desconocidos.
            </p>
            <a
              href={ofertaUrl}
              className={styles.btnSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver mi oferta de compra estándar
            </a>
          </div>
        </div>

        {/* PIE */}
        <p className={styles.footnote}>
          Sin compromiso · Proceso 100% digital · TuHabi México
        </p>
      </div>
    </main>
  );
}
