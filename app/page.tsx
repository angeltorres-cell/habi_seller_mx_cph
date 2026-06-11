import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import ComoFunciona from "@/components/ComoFunciona";
import Benefits from "@/components/Benefits";
import FormSection from "@/components/FormSection";
import CostSection from "@/components/CostSection";
import Footer from "@/components/Footer";

export default function Home() {
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
