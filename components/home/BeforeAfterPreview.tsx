"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";

const cases = [
  {
    ink: "Black ink · forearm",
    sessions: 7,
    before: "/assets/forearm-before.jpg",
    after: "/assets/forearm-after.jpg",
  },
  {
    ink: "Black ink · shoulder",
    sessions: 9,
    before: "/assets/shoulder-before.jpg",
    after: "/assets/shoulder-after.jpg",
  },
  {
    ink: "Mixed color · wrist",
    sessions: 10,
    before: "/assets/wrist-before.jpg",
    after: "/assets/wrist-after.jpg",
  },
];

export default function BeforeAfterPreview() {
  const ref = useReveal<HTMLElement>({ y: 28, stagger: 0.1, duration: 1.0 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.head} className="cl-stack-sm">
          <div data-reveal>
            <div style={styles.eyebrow}>Before &amp; after</div>
            <h2 style={styles.h} className="cl-h-sm">
              Real clients. Real sessions.
            </h2>
          </div>
          <Link href="/results" style={styles.viewAll} data-reveal>
            View full gallery ›
          </Link>
        </div>
        <p style={styles.sub} data-reveal>
          Same lighting. Same angle. Shot on a plain background with no filters. Every photo is captioned
          with the session count.
        </p>
        <div style={styles.grid} className="cl-grid-3-to-1">
          {cases.map((c, i) => (
            <div key={i} style={styles.case} data-reveal>
              <div style={styles.pair}>
                <div style={styles.imgWrap}>
                  <img src={c.before} alt="" style={styles.img} className="cl-img-hover" />
                  <div style={styles.stamp}>Before</div>
                </div>
                <div style={styles.imgWrap}>
                  <img src={c.after} alt="" style={styles.img} className="cl-img-hover" />
                  <div style={styles.stamp}>Session {c.sessions}</div>
                </div>
              </div>
              <div style={styles.caption}>{c.ink}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#f5f5f7", color: "#1d1d1f", padding: "112px 24px" },
  inner: { maxWidth: 1080, margin: "0 auto" },
  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: 16,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0066cc",
    letterSpacing: "-0.224px",
    marginBottom: 10,
  },
  h: {
    margin: 0,
    fontFamily: 'var(--cl-font-display)',
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 1.07,
    letterSpacing: "-0.3px",
  },
  viewAll: { color: "#0066cc", fontSize: 15, textDecoration: "none", letterSpacing: "-0.224px" },
  sub: {
    marginTop: 16,
    maxWidth: 640,
    fontSize: 17,
    lineHeight: 1.47,
    letterSpacing: "-0.374px",
    color: "rgba(0,0,0,0.72)",
  },
  grid: { marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  case: { display: "flex", flexDirection: "column", gap: 10 },
  pair: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 },
  imgWrap: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    background: "#e8e6e4",
  },
  img: { width: "100%", display: "block" },
  stamp: {
    position: "absolute",
    bottom: 8,
    left: 8,
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    fontSize: 10,
    letterSpacing: "-0.08px",
    padding: "3px 8px",
    borderRadius: 5,
  },
  caption: { fontSize: 14, color: "rgba(0,0,0,0.8)", letterSpacing: "-0.224px" },
};
