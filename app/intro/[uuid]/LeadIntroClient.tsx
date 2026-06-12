import IntroLanding from "@/components/IntroLanding";

export default function LeadIntroClient({ uuid }: { uuid: string }) {
  return <IntroLanding uuid={uuid} porcentaje={6} landing="intro" />;
}
