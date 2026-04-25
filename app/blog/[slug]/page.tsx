import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import TattooRemovalCostArticle from "@/components/blog/articles/TattooRemovalCostArticle";
import BeforeAfterResultsArticle from "@/components/blog/articles/BeforeAfterResultsArticle";
import BestClinicArticle from "@/components/blog/articles/BestClinicArticle";
import { blogPosts, getPostBySlug } from "@/lib/blogPosts";

type Params = { slug: string };

const COST_SLUG = "tattoo-removal-cost-las-vegas-henderson";
const BEFORE_AFTER_SLUG = "tattoo-removal-before-and-after-results";
const BEST_CLINIC_SLUG = "best-tattoo-removal-las-vegas-henderson";

// Prebuild one static page per known slug. Any other slug 404s.
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  if (post.slug === COST_SLUG) {
    return {
      title: "How Much Does Tattoo Removal Cost in Las Vegas and Henderson?",
      description:
        "Tattoo removal cost in Las Vegas and Henderson depends on tattoo size, ink color, session count, and removal goals. Learn what affects pricing before you book.",
      alternates: { canonical: `/blog/${post.slug}` },
    };
  }

  if (post.slug === BEFORE_AFTER_SLUG) {
    return {
      title: "Tattoo Removal Before and After: What Results Should You Expect?",
      description:
        "Tattoo removal before and after results vary by ink color, tattoo age, size, location, and skin response. Learn what realistic fading looks like before you start.",
      alternates: { canonical: `/blog/${post.slug}` },
    };
  }

  if (post.slug === BEST_CLINIC_SLUG) {
    return {
      title: "How to Choose the Best Tattoo Removal Clinic in Las Vegas or Henderson",
      description:
        "Looking for the best tattoo removal clinic in Las Vegas or Henderson? Learn what to compare before booking, including lasers, pricing, reviews, results, and safety.",
      alternates: { canonical: `/blog/${post.slug}` },
    };
  }

  // Unreachable: blogPosts.slug is a literal union of the three slugs above.
  return {};
}

export default function BlogArticlePage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div data-screen-label="Blog Article">
      <PageHero eyebrow="Blog" headline={post.title} sub={post.excerpt} />
      {post.slug === COST_SLUG ? (
        <TattooRemovalCostArticle />
      ) : post.slug === BEFORE_AFTER_SLUG ? (
        <BeforeAfterResultsArticle />
      ) : (
        <BestClinicArticle />
      )}
      <FinalCTA />
    </div>
  );
}
