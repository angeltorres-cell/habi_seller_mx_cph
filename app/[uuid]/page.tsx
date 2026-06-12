import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import ComoFunciona from "@/components/ComoFunciona";
import Benefits from "@/components/Benefits";
import FormSection from "@/components/FormSection";
import CostSection from "@/components/CostSection";
import Footer from "@/components/Footer";

export default async function UuidHomePage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  // uuid disponible para uso futuro (ej. pre-fill de formulario, tracking)
  const { uuid } = await params;
  void uuid;

  return (
    <>
      <TopBar />
      <Hero />
      <ComoFunciona />
      <Benefits />
      <FormSection />
      <CostSection />
      <Footer />
    </>
  );
}
