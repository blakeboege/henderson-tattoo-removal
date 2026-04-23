import PageHero from "@/components/PageHero";
import Mission from "@/components/about/Mission";
import TeamBlock from "@/components/about/TeamBlock";
import Facility from "@/components/about/Facility";
import Principles from "@/components/about/Principles";
import FinalCTA from "@/components/FinalCTA";

export const metadata = {
  title: "About — Henderson Tattoo Removal",
  description:
    "A single-focus clinic for laser tattoo removal. Medical director, licensed technicians, flat per-session pricing.",
};

export default function AboutPage() {
  return (
    <div data-screen-label="About">
      <PageHero
        eyebrow="About"
        headline="We do one thing."
        sub="Henderson Tattoo Removal is a single-focus clinic. No fillers, no microneedling, no cosmetic tattooing. Tattoo removal is the whole practice — which is why we've gotten good at it."
      />
      <Mission />
      <TeamBlock />
      <Facility />
      <Principles />
      <FinalCTA />
    </div>
  );
}
