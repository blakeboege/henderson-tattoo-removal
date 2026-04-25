import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import TattooRemovalCostArticle from "@/components/blog/articles/TattooRemovalCostArticle";
import BeforeAfterResultsArticle from "@/components/blog/articles/BeforeAfterResultsArticle";
import { blogPosts, getPostBySlug } from "@/lib/blogPosts";

type Params = { slug: string };

const COST_SLUG = "tattoo-removal-cost-las-vegas-henderson";
const BEFORE_AFTER_SLUG = "tattoo-removal-before-and-after-results";

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

  return {
    title: `${post.title} — Henderson Tattoo Removal`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
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
        <ComingSoonPlaceholder />
      )}
      <FinalCTA />
    </div>
  );
}

function ComingSoonPlaceholder() {
  return (
    <section style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.note}>
          <div style={styles.noteEyebrow}>Coming soon</div>
          <h2 style={styles.noteH}>The full guide is being written.</h2>
          <p style={styles.noteBody}>
            We&apos;re finishing this article — it will be published here shortly. In the
            meantime, browse our other guides, or book a free 30-minute consult for a
            personalized answer to your specific tattoo.
          </p>
          <div style={styles.actions}>
            <Link href="/blog" style={styles.backLink}>
              ← Back to blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#f5f5f7", color: "#1d1d1f", padding: "96px 24px 128px" },
  inner: { maxWidth: 760, margin: "0 auto" },
  note: {
    background: "#fff",
    borderRadius: 16,
    padding: "48px 40px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
    textAlign: "center",
  },
  noteEyebrow: {
    fontSize: 12,
    fontWeight: 600,
    color: "#0066cc",
    letterSpacing: "-0.12px",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  noteH: {
    margin: 0,
    fontFamily: "var(--cl-font-display)",
    fontSize: 30,
    fontWeight: 600,
    lineHeight: 1.12,
    letterSpacing: "-0.2px",
  },
  noteBody: {
    margin: "18px auto 0",
    maxWidth: 560,
    fontSize: 17,
    lineHeight: 1.6,
    letterSpacing: "-0.224px",
    color: "rgba(0,0,0,0.72)",
  },
  actions: {
    marginTop: 28,
    display: "flex",
    justifyContent: "center",
    gap: 14,
  },
  backLink: {
    color: "#0066cc",
    textDecoration: "none",
    fontSize: 16,
    letterSpacing: "-0.224px",
    fontWeight: 500,
  },
};
