import { Suspense } from "react";
import LeadIntroClient from "./LeadIntroClient";

export default async function IntroUuidPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  return (
    <Suspense>
      <LeadIntroClient uuid={uuid} />
    </Suspense>
  );
}
