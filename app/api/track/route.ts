import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw6btcMsIvFgz0-gCT6Nlh7qExBg3E41FItxfSKqWshN4Fp21Fmg5kLyVo2n9N05C7ueg/exec";

const OFERTAS_BASE_URL = "https://ofertas.tuhabi.mx";

export async function GET(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("uuid") ?? "";

  fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      logType: "logs_boton",
      uuid,
    }),
  }).catch(() => {});

  return NextResponse.redirect(`${OFERTAS_BASE_URL}/${uuid}`, { status: 302 });
}
