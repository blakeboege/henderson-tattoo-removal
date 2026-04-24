import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import EstimateCTA from "@/components/home/EstimateCTA";
import TrustSection from "@/components/home/TrustSection";
import BeforeAfterPreview from "@/components/home/BeforeAfterPreview";
import EmailCapture from "@/components/EmailCapture";
import Process from "@/components/home/Process";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title:
    "Laser Tattoo Removal in Henderson, NV | Henderson Tattoo Removal",
  description:
    "Safe laser tattoo removal in Henderson, NV with transparent pricing, realistic timelines, and free consultations. Serving Henderson, Green Valley, Anthem, Seven Hills, and Las Vegas.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div data-screen-label="Home">
      <HomeHero />
      <EstimateCTA />
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
