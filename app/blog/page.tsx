import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogCardGrid from "@/components/blog/BlogCardGrid";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Tattoo Removal Blog — Henderson Tattoo Removal",
  description:
    "Guides on laser tattoo removal in Las Vegas and Henderson, NV. Pricing, session counts, clinic selection, cover-up fading, and aftercare from the Henderson Tattoo Removal team.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <div data-screen-label="Blog">
      <PageHero
        eyebrow="Blog"
        headline="Tattoo Removal Blog"
        sub="Helpful guides about laser tattoo removal pricing, sessions, clinic selection, cover-up fading, and aftercare in Henderson and Las Vegas."
      />
      <BlogCardGrid />
      <FinalCTA />
    </div>
  );
}
