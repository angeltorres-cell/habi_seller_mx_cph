"use client";

import { useEffect } from "react";

type Props = {
  uuid: string;
  version: string;
};

export default function PageTracker({ uuid, version }: Props) {
  useEffect(() => {
    const properties = { uuid, landing_version: version, country: "MX" };
    if (process.env.NODE_ENV === "development") {
      console.log("🟣 Segment: page", properties);
    }
    window.analytics?.page(undefined, properties);
  }, [uuid, version]);

  return null;
}
