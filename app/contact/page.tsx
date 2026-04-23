import PageHero from "@/components/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import MapBlock from "@/components/contact/MapBlock";

export const metadata = {
  title: "Contact — Henderson Tattoo Removal",
  description:
    "Book a free consult, ask a question, or get a quick estimate. Serving Henderson, Las Vegas, and Summerlin by appointment.",
};

export default function ContactPage() {
  return (
    <div data-screen-label="Contact">
      <PageHero
        eyebrow="Contact"
        headline="Get in touch."
        sub="Book a free consult, ask a question, or just get a quick estimate. We reply to every inquiry within one business day."
      />
      <ContactForm />
      <MapBlock />
    </div>
  );
}
