import { Suspense } from "react";
import IntroLanding from "@/components/IntroLanding";

export default async function IntroV2UuidPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  return (
    <Suspense>
      <IntroLanding uuid={uuid} porcentaje={3} landing="intro-v2" />
    </Suspense>
  );
}
