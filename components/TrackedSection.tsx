"use client";

import { useRef } from "react";
import { useSectionTracking } from "@/hooks/useSectionTracking";

type Props = {
  name: "como_funciona" | "beneficios" | "encuesta";
  uuid: string;
  version: "intro" | "intro-v2";
  children: React.ReactNode;
};

export default function TrackedSection({ name, uuid, version, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useSectionTracking(ref, name, uuid, version);
  return (
    <div ref={ref}>
      {children}
    </div>
  );
}
