import { NextRequest, NextResponse } from "next/server";

const HUBSPOT_PROPERTIES = [
  "link_bnpl__comercial_",
  "bnpl_1__comercial_",
  "final_final_aprobado_b_o",
  "oferta_final_prestamo_mx_calculada",
  "precio_comite",
  "precio_comite_original",
  "pipeline",
  "country",
  "deal_uuid",
];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params;

  const res = await fetch(
    "https://api.hubapi.com/crm/v3/objects/deals/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: "deal_uuid",
                operator: "EQ",
                value: uuid,
              },
            ],
          },
        ],
        properties: HUBSPOT_PROPERTIES,
      }),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Error al consultar HubSpot" },
      { status: res.status }
    );
  }

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    return NextResponse.json({ error: "Lead no encontrado" }, { status: 404 });
  }

  return NextResponse.json(data.results[0]);
}
