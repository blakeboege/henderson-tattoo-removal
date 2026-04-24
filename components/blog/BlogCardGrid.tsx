"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";
import { blogPosts } from "@/lib/blogPosts";

export default function BlogCardGrid() {
  const ref = useReveal<HTMLElement>({ y: 28, stagger: 0.1, duration: 1.0 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.grid} className="cl-grid-3-to-1">
          {blogPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              style={styles.card}
              className="cl-hover-lift"
              data-reveal
            >
              <div style={styles.eyebrow}>Guide</div>
              <h2 style={styles.title}>{p.title}</h2>
              <p style={styles.excerpt}>{p.excerpt}</p>
              <span style={styles.more}>Read more ›</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#f5f5f7", color: "#1d1d1f", padding: "96px 24px 128px" },
  inner: { maxWidth: 1080, margin: "0 auto" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
    alignItems: "stretch",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: "32px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    height: "100%",
    textDecoration: "none",
    color: "#1d1d1f",
    boxShadow: "0 18px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 600,
    color: "#0066cc",
    letterSpacing: "-0.12px",
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    fontFamily: "var(--cl-font-display)",
    fontSize: 22,
    fontWeight: 600,
    lineHeight: 1.22,
    letterSpacing: "-0.196px",
    color: "#1d1d1f",
  },
  excerpt: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.6,
    letterSpacing: "-0.224px",
    color: "rgba(0,0,0,0.72)",
    flex: 1,
  },
  more: {
    fontSize: 14,
    fontWeight: 500,
    color: "#0066cc",
    letterSpacing: "-0.224px",
    marginTop: 6,
  },
};
