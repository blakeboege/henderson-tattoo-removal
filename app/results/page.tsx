import PageHero from "@/components/PageHero";
import ResultsGallery from "@/components/results/ResultsGallery";
import DisclaimerBlock from "@/components/results/DisclaimerBlock";
import EmailCapture from "@/components/EmailCapture";
import FinalCTA from "@/components/FinalCTA";

export const metadata = {
  title: "Before & after — Henderson Tattoo Removal",
  description:
    "Real clients. Real sessions. Captioned with session counts and ink type. Nothing retouched, nothing cherry-picked.",
};

export default function ResultsPage() {
  return (
    <div data-screen-label="Results">
      <PageHero
        eyebrow="Before & after"
        headline="Real clients. Real sessions."
        sub="Nothing retouched. Nothing flattered. Shot under standardized clinical lighting at every visit. Captions list the session count so you can judge the pace for yourself."
      />
      <ResultsGallery />
      <DisclaimerBlock />
      <EmailCapture />
      <FinalCTA />
    </div>
  );
}
