"use client";

import type { CSSProperties } from "react";
import { useBooking } from "./BookingProvider";
import { useReveal } from "@/lib/useReveal";

export default function FinalCTA() {
  const { openBooking } = useBooking();
  const ref = useReveal<HTMLElement>({ y: 24, stagger: 0.08, duration: 0.9 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <h2 style={styles.h} className="cl-display-sm" data-reveal>
          A clearer start.
        </h2>
        <p style={styles.sub} data-reveal>
          Your first visit is a 30-minute consult. It&apos;s $0.
        </p>
        <div style={styles.row} data-reveal>
          <button type="button" onClick={openBooking} style={styles.primary} className="cl-btn-pressable">
            Book a consult
          </button>
          <a href="tel:+17026597135" style={styles.ghost} className="cl-btn-pressable">
            Call (702) 659-7135 ›
          </a>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#000", color: "#fff", padding: "128px 24px", textAlign: "center" },
  inner: { maxWidth: 720, margin: "0 auto" },
  h: {
    margin: 0,
    fontFamily: 'var(--cl-font-display)',
    fontSize: 64,
    fontWeight: 600,
    lineHeight: 1.05,
    letterSpacing: "-0.5px",
  },
  sub: { marginTop: 16, fontSize: 21, color: "rgba(255,255,255,0.72)", letterSpacing: "0.231px" },
  row: { marginTop: 32, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" },
  primary: {
    background: "#0071e3",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 980,
    fontFamily: "inherit",
    fontSize: 17,
    cursor: "pointer",
    letterSpacing: "-0.374px",
  },
  ghost: {
    background: "transparent",
    color: "#2997ff",
    border: "1px solid #2997ff",
    padding: "12px 24px",
    borderRadius: 980,
    textDecoration: "none",
    fontFamily: "inherit",
    fontSize: 17,
    letterSpacing: "-0.374px",
  },
};
