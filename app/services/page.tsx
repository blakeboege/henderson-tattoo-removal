import PageHero from "@/components/PageHero";
import ServiceDetail from "@/components/services/ServiceDetail";
import Technology from "@/components/services/Technology";
import AfterCare from "@/components/services/AfterCare";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/FinalCTA";

const servicesFaqItems = [
  {
    q: "Do you treat all skin tones?",
    a: "Yes. PicoWay is FDA-cleared for all Fitzpatrick types (I through VI). We calibrate energy per-client, per-session — never one-size-fits-all.",
  },
  {
    q: "Can you remove colored ink?",
    a: "Yes. PicoWay has three wavelengths (532, 785, 1064 nm) that between them address every common tattoo pigment — including notoriously stubborn greens and blues.",
  },
  {
    q: "What if I only want partial removal?",
    a: "We can target any region of a tattoo you want. Bring a marked photo to the consult and we'll only treat what you specify.",
  },
  {
    q: "Are there medical reasons I shouldn't get this?",
    a: "A few. Active skin infection in the area, recent sunburn, recent Accutane use, and certain pregnancy considerations. We screen for all of these at the consult.",
  },
];

export const metadata = {
  title: "Services — Henderson Tattoo Removal",
  description:
    "Laser tattoo removal, fade-for-coverup sessions, and scar-conscious assessments. PicoWay technology, Zimmer cooling, written session plans.",
};

export default function ServicesPage() {
  return (
    <div data-screen-label="Services">
      <PageHero
        eyebrow="Our services"
        headline="Laser tattoo removal, done cleanly."
        sub="A single, focused practice. We don't do microneedling, fillers, or cosmetic tattooing. Tattoo removal is all we do — which is why we do it well."
        showCtas
      />
      <ServiceDetail />
      <Technology />
      <AfterCare />
      <FAQ
        items={servicesFaqItems}
        eyebrow="Service FAQ"
        heading="More questions."
        dark
        id="services-faq"
        initialOpen={-1}
      />
      <FinalCTA />
    </div>
  );
}
