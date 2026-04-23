import HomeHero from "@/components/home/HomeHero";
import TrustSection from "@/components/home/TrustSection";
import BeforeAfterPreview from "@/components/home/BeforeAfterPreview";
import EmailCapture from "@/components/EmailCapture";
import Process from "@/components/home/Process";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <div data-screen-label="Home">
      <HomeHero />
      <TrustSection />
      <BeforeAfterPreview />
      <EmailCapture />
      <Process />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
