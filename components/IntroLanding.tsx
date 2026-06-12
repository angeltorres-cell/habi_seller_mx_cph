"use client";

import { useEffect, useState } from "react";
import styles from "@/app/intro/intro.module.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw6btcMsIvFgz0-gCT6Nlh7qExBg3E41FItxfSKqWshN4Fp21Fmg5kLyVo2n9N05C7ueg/exec";

const OFERTA_ESTANDAR_URL =
  "https://ofertas.tuhabi.mx/f9e1c4b9-17e0-4e44-a104-6feec893099c";

type LeadProperties = {
  link_bnpl__comercial_?: string | null;
  bnpl_1__comercial_?: string | null;
  final_final_aprobado_b_o?: string | null;
  oferta_final_prestamo_mx_calculada?: string | null;
  precio_comite?: string | null;
  precio_comite_original?: string | null;
  ask_price_comite_mx_hesh?: string | null;
  pipeline?: string | null;
  country?: string | null;
  deal_uuid?: string | null;
};

type Lead = {
  id: string;
  properties: LeadProperties;
};

type Props = {
  uuid: string;
  porcentaje: number;
  landing: string;
};

async function sendLog(
  logType: string,
  uuid: string,
  boton: string,
  landing: string
) {
  const payload = { logType, uuid, boton, version: landing, userAgent: navigator.userAgent };
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

function formatMXN(val: number | string | null | undefined): string | null {
  if (val === null || val === undefined || val === "") return null;
  const num = typeof val === "number" ? val : parseFloat(val);
  if (isNaN(num)) return String(val);
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(num);
}

function toNum(val: string | null | undefined): number | null {
  if (!val) return null;
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

function resolveOfertaBase(p: LeadProperties): number | null {
  const bnpl     = toNum(p.bnpl_1__comercial_);
  const aprobado = toNum(p.final_final_aprobado_b_o);
  const calculada = toNum(p.oferta_final_prestamo_mx_calculada);

  if (bnpl === null && aprobado === null) return calculada;
  if (bnpl !== null && aprobado === null)
    return calculada !== null ? Math.min(bnpl, calculada) : bnpl;
  if (bnpl === null && aprobado !== null) return aprobado;
  return Math.min(bnpl!, aprobado!);
}

export default function IntroLanding({ uuid, porcentaje, landing }: Props) {
  const [lead, setLead]       = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

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
  const ofertaUrl = p.link_bnpl__comercial_ ?? OFERTA_ESTANDAR_URL;
  const ofertaBase = resolveOfertaBase(p);
  const ofertaConPrograma =
    ofertaBase !== null
      ? Math.round(ofertaBase * (1 - porcentaje / 100))
      : null;

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
              <li><span className={styles.check}>✓</span> Hipoteca Infonavit liquidada</li>
              <li><span className={styles.check}>✓</span> No necesitas mudarte a un lugar temporal</li>
              <li><span className={styles.check}>✓</span> Tiempo real para asegurar tu próximo hogar</li>
              <li><span className={styles.check}>✓</span> Ahorro de costo de una mudanza adicional</li>
            </ul>
            <div className={styles.costTag}>
              {ofertaConPrograma !== null ? (
                <>Valor de oferta con el programa: <strong>{formatMXN(ofertaConPrograma)}</strong></>
              ) : (
                <>Costo adicional: <strong>-{porcentaje}%</strong> sobre tu oferta base</>
              )}
            </div>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={async () => {
                await sendLog("lista_espera", uuid, "Unirme a la lista de espera del programa", landing);
                window.location.href = landing === "intro-v2" ? `/v2/${uuid}` : `/${uuid}`;
              }}
            >
              Unirme a la lista de espera del programa
            </button>
            <p className={styles.tycNote}>Aplica términos y condiciones*</p>
          </div>

          {/* OFERTA ESTÁNDAR */}
          <div className={`${styles.card} ${styles.cardStandard}`}>
            <h2 className={styles.cardTitle}>Oferta Estándar</h2>
            <p className={styles.cardDesc}>
              Recibe una oferta directa por tu inmueble. Proceso rápido, pago
              seguro y sin publicación ni visitas de desconocidos.
            </p>
            <ul className={styles.checkList}>
              <li><span className={styles.check}>✓</span> Revisa detalles de tu oferta de compra</li>
              <li><span className={styles.check}>✓</span> Cierra y recibe tu dinero de forma segura</li>
            </ul>
            {ofertaBase !== null && (
              <div className={styles.ofertaValor}>
                Valor de oferta: <strong>{formatMXN(ofertaBase)}</strong>
              </div>
            )}
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={async () => {
                await sendLog("oferta_estandar", uuid, "Ver oferta estándar", landing);
                window.open(ofertaUrl, "_blank", "noopener,noreferrer");
              }}
            >
              Ver mi oferta de compra estándar
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
