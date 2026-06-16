"use client";

import { useEffect, useState } from "react";
import { resolveOfertaBase, formatMXN, type Lead } from "@/lib/oferta";
import styles from "./CostSection.module.css";

type Props = {
  uuid?: string;
  porcentaje?: number;
};

export default function CostSection({ uuid, porcentaje = 5 }: Props) {
  const [valor, setValor] = useState<number | null>(null);

  useEffect(() => {
    if (!uuid) return;
    fetch(`/api/lead/${uuid}`)
      .then((res) => (res.ok ? (res.json() as Promise<Lead>) : Promise.reject()))
      .then((data) => {
        const base = resolveOfertaBase(data.properties);
        if (base !== null) {
          setValor(Math.round(base * (1 - porcentaje / 100)));
        }
      })
      .catch(() => {});
  }, [uuid, porcentaje]);

  return (
    <section className={styles.section}>
      <div className={styles.inline}>
        <span className={styles.text}>Costo de servicio:</span>
        {valor !== null ? (
          <span className={styles.num}>{formatMXN(valor)}</span>
        ) : (
          <span className={styles.num}>
            -{porcentaje}<span className={styles.sym}>%</span>
          </span>
        )}
      </div>
    </section>
  );
}
