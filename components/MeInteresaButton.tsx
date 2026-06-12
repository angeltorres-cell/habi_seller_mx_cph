"use client";

import { usePathname } from "next/navigation";
import styles from "./ComoFunciona.module.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw6btcMsIvFgz0-gCT6Nlh7qExBg3E41FItxfSKqWshN4Fp21Fmg5kLyVo2n9N05C7ueg/exec";

export default function MeInteresaButton() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isV2 = segments[0] === "v2";
  const uuid = isV2 ? (segments[1] ?? "") : (segments[0] ?? "");
  const version = isV2 ? "intro-v2" : "intro";

  async function handleClick() {
    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        logType: "me_interesa",
        uuid,
        version,
        boton: "Me interesa",
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {});

    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button type="button" className={styles.btnInteresa} onClick={handleClick}>
      Me interesa
    </button>
  );
}
