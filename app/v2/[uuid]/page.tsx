import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import ComoFunciona from "@/components/ComoFunciona";
import Benefits from "@/components/Benefits";
import FormSection from "@/components/FormSection";
import CostSection from "@/components/CostSection";
import Footer from "@/components/Footer";
import TrackedSection from "@/components/TrackedSection";
import PageTracker from "@/components/PageTracker";

export default async function V2UuidPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  return (
    <>
      <PageTracker uuid={uuid} version="intro-v2" />
      <TopBar />
      <Hero />
      <TrackedSection name="como_funciona" uuid={uuid} version="intro-v2">
        <ComoFunciona />
      </TrackedSection>
      <TrackedSection name="beneficios" uuid={uuid} version="intro-v2">
        <Benefits />
      </TrackedSection>
      <TrackedSection name="encuesta" uuid={uuid} version="intro-v2">
        <FormSection uuid={uuid} version="intro-v2" />
      </TrackedSection>
      <CostSection uuid={uuid} porcentaje={5} />
      <Footer />
    </>
  );
}
