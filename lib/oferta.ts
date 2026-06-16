export type LeadProperties = {
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

export type Lead = {
  id: string;
  properties: LeadProperties;
};

export function toNum(val: string | null | undefined): number | null {
  if (!val) return null;
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

export function resolveOfertaBase(p: LeadProperties): number | null {
  const bnpl      = toNum(p.bnpl_1__comercial_);
  const aprobado  = toNum(p.final_final_aprobado_b_o);
  const calculada = toNum(p.oferta_final_prestamo_mx_calculada);

  if (bnpl === null && aprobado === null) return calculada;
  if (bnpl !== null && aprobado === null)
    return calculada !== null ? Math.min(bnpl, calculada) : bnpl;
  if (bnpl === null && aprobado !== null) return aprobado;
  return Math.min(bnpl!, aprobado!);
}

export function formatMXN(val: number | string | null | undefined): string | null {
  if (val === null || val === undefined || val === "") return null;
  const num = typeof val === "number" ? val : parseFloat(val);
  if (isNaN(num)) return String(val);
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(num);
}
