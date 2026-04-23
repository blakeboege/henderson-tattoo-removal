"use client";

import type { CSSProperties } from "react";
import Icon from "@/components/Icon";
import { useReveal } from "@/lib/useReveal";

const items = [
  {
    icon: "shield-check",
    h: "FDA-cleared technology",
    b: "PicoWay picosecond laser — the standard of care for effective ink breakdown on all skin tones.",
  },
  {
    icon: "stethoscope",
    h: "Medically supervised",
    b: "Every session is performed by a certified laser technician under a Nevada-licensed medical director.",
  },
  {
    icon: "snowflake",
    h: "Zimmer cooling",
    b: "−30°F chilled air blown across the skin throughout treatment. The single biggest factor in patient comfort.",
  },
  {
    icon: "file-text",
    h: "Written session plan",
    b: "You leave the consult with a printed estimate. Session count, total cost, realistic timeline. No surprises.",
  },
];

export default function TrustSection() {
  const ref = useReveal<HTMLElement>({ y: 24, stagger: 0.08 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.eyebrow} data-reveal>
          Why clients choose us
        </div>
        <h2 style={styles.h} className="cl-h-sm" data-reveal>
          A medical clinic, not a tattoo shop.
        </h2>
        <p style={styles.sub} data-reveal>
          Tattoo removal is a medical procedure. We treat it like one — with credentialed staff,
          clinical-grade equipment, and the quiet seriousness you&apos;d expect from a dermatology office.
        </p>
        <div style={styles.grid} className="cl-grid-4-to-2">
          {items.map((it) => (
            <div
              key={it.h}
              style={styles.card}
              className="cl-hover-lift"
              data-reveal
            >
              <Icon name={it.icon} />
              <div style={styles.cardH}>{it.h}</div>
              <div style={styles.cardB}>{it.b}</div>
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
    lineHeight: 1.47,
    letterSpacing: "-0.374px",
    color: "rgba(0,0,0,0.72)",
  },
  grid: { marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  cardH: {
    fontFamily: 'var(--cl-font-display)',
    fontSize: 19,
    fontWeight: 600,
    letterSpacing: "0.231px",
    marginTop: 4,
  },
  cardB: {
    fontSize: 15,
    lineHeight: 1.47,
    letterSpacing: "-0.224px",
    color: "rgba(0,0,0,0.8)",
  },
};
