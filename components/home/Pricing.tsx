"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";

const tiers: {
  name: string;
  size: string;
  price: number;
  note: string;
  featured?: boolean;
}[] = [
  { name: "Palm-sized", size: "up to 2 in²", price: 125, note: "Small hand, wrist, ankle" },
  {
    name: "Medium",
    size: "2 – 10 in²",
    price: 225,
    note: "Forearm, calf, shoulder",
    featured: true,
  },
  { name: "Large", size: "10 in² and up", price: 375, note: "Sleeve, back piece, chest" },
];

export default function Pricing() {
  const ref = useReveal<HTMLElement>({ y: 26, stagger: 0.1, duration: 1.0 });
  return (
    <section id="pricing" ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.eyebrow} data-reveal>
          Pricing
        </div>
        <h2 style={styles.h} className="cl-h-sm" data-reveal>
          Flat per session. No packages.
        </h2>
        <p style={styles.sub} data-reveal>
          Pay per visit. Cancel whenever. Most black ink clears in 6 to 10 sessions. What you see is what
          you pay.
        </p>
        <div style={styles.grid} className="cl-grid-3-to-1">
          {tiers.map((t) => (
            <div
              key={t.name}
              style={{ ...styles.card, ...(t.featured ? styles.cardFeatured : {}) }}
              className={t.featured ? undefined : "cl-hover-lift"}
              data-reveal
            >
              {t.featured && <div style={styles.badge}>Most common</div>}
              <div style={styles.tierName}>{t.name}</div>
              <div style={styles.tierSize}>{t.size}</div>
              <div style={styles.priceRow}>
                <span style={styles.dollar}>$</span>
                <span style={styles.price}>{t.price}</span>
                <span style={styles.per}>/ session</span>
              </div>
              <div style={styles.note}>{t.note}</div>
              <a href="#book" style={styles.link}>
                Book this size ›
              </a>
            </div>
          ))}
        </div>
        <div style={styles.asterisks} className="cl-grid-3-to-1" data-reveal>
          <div>
            Consultation — <strong>$0</strong>
          </div>
          <div>
            Touch-up session after completion — <strong>same flat rate</strong>
          </div>
          <div>
            Financing via Cherry — <strong>0% APR for 6 months</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#000", color: "#fff", padding: "112px 24px" },
  inner: { maxWidth: 1080, margin: "0 auto" },
  eyebrow: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "-0.224px",
    color: "#2997ff",
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
    lineHeight: 1.47,
    letterSpacing: "-0.374px",
    color: "rgba(255,255,255,0.72)",
  },
  grid: {
    marginTop: 56,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
    alignItems: "center",
  },
  card: {
    position: "relative",
    background: "#1d1d1f",
    borderRadius: 14,
    padding: 32,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    height: "100%",
  },
  cardFeatured: {
    background: "#fff",
    color: "#1d1d1f",
    transform: "scale(1.04)",
    zIndex: 1,
    boxShadow:
      "0 30px 70px rgba(0, 113, 227, 0.28), 0 12px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.85)",
  },
  badge: {
    position: "absolute",
    top: 16,
    right: 16,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "-0.12px",
    color: "#0066cc",
    background: "rgba(0,113,227,0.08)",
    padding: "4px 10px",
    borderRadius: 980,
  },
  tierName: {
    fontFamily: 'var(--cl-font-display)',
    fontSize: 21,
    fontWeight: 700,
    letterSpacing: "0.231px",
  },
  tierSize: { fontSize: 13, opacity: 0.56, letterSpacing: "-0.224px" },
  priceRow: { display: "flex", alignItems: "baseline", gap: 4, marginTop: 16 },
  dollar: { fontSize: 20, fontWeight: 600 },
  price: {
    fontFamily: 'var(--cl-font-display)',
    fontSize: 56,
    fontWeight: 600,
    letterSpacing: "-0.5px",
    lineHeight: 1,
  },
  per: { fontSize: 13, opacity: 0.56, marginLeft: 6 },
  note: { fontSize: 14, opacity: 0.8, letterSpacing: "-0.224px", marginTop: 4 },
  link: { marginTop: 12, color: "inherit", fontSize: 14, textDecoration: "none", opacity: 0.72 },
  asterisks: {
    marginTop: 40,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    fontSize: 14,
    color: "rgba(255,255,255,0.64)",
    letterSpacing: "-0.224px",
    paddingTop: 32,
    borderTop: "1px solid rgba(255,255,255,0.12)",
  },
};
