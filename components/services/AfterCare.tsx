"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";

const days = [
  {
    n: "Hours 0–24",
    h: "Cool, cover, rest",
    b: "Apply the aftercare sheet's instructions. Cold compress for 10 minutes an hour. Don't remove the bandage before bedtime.",
  },
  {
    n: "Days 1–3",
    h: "Blistering is normal",
    b: "Small blisters are part of the healing response and prove the laser worked. Don't pop them. Keep the area dry.",
  },
  {
    n: "Week 1",
    h: "Gentle wash twice daily",
    b: "Fragrance-free cleanser, pat dry. Aquaphor or similar, thin layer. No soaking, no swimming, no gym until cleared.",
  },
  {
    n: "Weeks 2–6",
    h: "Fading accelerates",
    b: "The ink is breaking down under the skin. Wear sunscreen religiously over the area — UV is the single biggest risk factor for hyperpigmentation.",
  },
];

export default function AfterCare() {
  const ref = useReveal<HTMLElement>({ y: 22, stagger: 0.07 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.eyebrow} data-reveal>
          Aftercare
        </div>
        <h2 style={styles.h} className="cl-h-sm" data-reveal>
          What to expect after a session.
        </h2>
        <p style={styles.sub} data-reveal>
          A printed aftercare sheet comes home with you. Here&apos;s the short version.
        </p>
        <div style={styles.grid} className="cl-grid-4-to-2">
          {days.map((d) => (
            <div key={d.n} style={styles.card} className="cl-hover-lift" data-reveal>
              <div style={styles.cardN}>{d.n}</div>
              <div style={styles.cardH}>{d.h}</div>
              <div style={styles.cardB}>{d.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#f5f5f7", color: "#1d1d1f", padding: "128px 24px" },
  inner: { maxWidth: 1080, margin: "0 auto" },
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
  sub: {
    marginTop: 16,
    maxWidth: 640,
    fontSize: 19,
    lineHeight: 1.6,
    letterSpacing: "-0.374px",
    color: "rgba(0,0,0,0.72)",
  },
  grid: {
    marginTop: 56,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 24,
    alignItems: "stretch",
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 28,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 18px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
  },
  cardN: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 12,
    color: "#0066cc",
    letterSpacing: "-0.12px",
    marginBottom: 16,
  },
  cardH: {
    fontFamily: 'var(--cl-font-display)',
    fontSize: 19,
    fontWeight: 600,
    letterSpacing: "0.196px",
  },
  cardB: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 1.6,
    letterSpacing: "-0.224px",
    color: "rgba(0,0,0,0.72)",
  },
};
