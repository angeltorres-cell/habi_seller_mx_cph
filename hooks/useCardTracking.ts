"use client";

import { useEffect, useRef } from "react";

type CardSectionName =
  | "card_programa"
  | "btn_lista_espera"
  | "card_oferta_estandar"
  | "btn_oferta_estandar";

type LandingVersion = "intro" | "intro-v2";

export function useCardTracking(
  ref: React.RefObject<HTMLElement | null>,
  sectionName: CardSectionName,
  uuid: string,
  landingVersion: LandingVersion
) {
  const tracked = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    const deviceType = isMobile ? "mobile" : "desktop";

    const fireEvent = () => {
      if (tracked.current) return;
      tracked.current = true;
      const properties = {
        section_name: sectionName,
        uuid,
        landing_version: landingVersion,
        country: "MX",
        device_type: deviceType,
        timestamp: new Date().toISOString(),
      };
      if (process.env.NODE_ENV === "development") {
        console.log("🟣 Segment: section_viewed", properties);
      }
      window.analytics?.track("section_viewed", properties);
    };

    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) fireEvent(); },
        { threshold: 0.5 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      el.addEventListener("mouseenter", fireEvent);
      return () => el.removeEventListener("mouseenter", fireEvent);
    }
  }, [ref, sectionName, uuid, landingVersion]);
}
