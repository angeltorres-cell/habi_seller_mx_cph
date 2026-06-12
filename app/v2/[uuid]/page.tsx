import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import ComoFunciona from "@/components/ComoFunciona";
import Benefits from "@/components/Benefits";
import FormSection from "@/components/FormSection";
import CostSection from "@/components/CostSection";
import Footer from "@/components/Footer";

export default async function V2UuidPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  return (
    <>
      <TopBar />
      <Hero />
      <ComoFunciona />
      <Benefits />
      <FormSection uuid={uuid} version="intro-v2" />
      <CostSection porcentaje={3} />
      <Footer />
    </>
  );
}
