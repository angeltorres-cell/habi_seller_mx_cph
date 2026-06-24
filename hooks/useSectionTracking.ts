"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    analytics?: {
      track(event: string, properties?: Record<string, unknown>): void;
      page(category?: string, name?: string | Record<string, unknown>, properties?: Record<string, unknown>): void;
    };
  }
}

type SectionName =
  | "como_funciona"
  | "beneficios"
  | "encuesta"
  | "card_programa"
  | "btn_lista_espera"
  | "card_oferta_estandar"
  | "btn_oferta_estandar";
type LandingVersion = "intro" | "intro-v2";

export function useSectionTracking(
  ref: React.RefObject<HTMLElement | null>,
  sectionName: SectionName,
  uuid: string,
  landingVersion: LandingVersion
) {
  const tracked = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          const properties = {
            section_name: sectionName,
            uuid,
            landing_version: landingVersion,
            country: "MX",
            timestamp: new Date().toISOString(),
          };
          if (process.env.NODE_ENV === "development") {
            console.log("🟣 Segment:", "section_viewed", properties);
          }
          window.analytics?.track("section_viewed", properties);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, sectionName, uuid, landingVersion]);
}
