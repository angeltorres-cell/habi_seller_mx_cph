import { Suspense } from "react";
import IntroClient from "./IntroClient";

export const metadata = {
  title: "Habi - Conoce tu oferta de compra",
  description:
    "Diseñamos un programa exclusivo donde liquidamos tu hipoteca actual con Infonavit y te damos hasta 3 meses de estancia libre.",
};

export default function IntroPage() {
  return (
    <Suspense>
      <IntroClient />
    </Suspense>
  );
}
