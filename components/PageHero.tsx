"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";
import { useBooking } from "./BookingProvider";

type Props = {
  eyebrow: string;
  headline: string;
  sub: string;
  showCtas?: boolean;
};

export default function PageHero({ eyebrow, headline, sub, showCtas = false }: Props) {
  const { openBooking } = useBooking();
  const ref = useReveal<HTMLElement>({ y: 28, stagger: 0.08, duration: 0.9 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.eyebrow} data-reveal>
          {eyebrow}
        </div>
        <h1 style={styles.h} className="cl-display-sm" data-reveal>
          {headline}
        </h1>
        <p style={styles.sub} className="cl-sub-sm" data-reveal>
          {sub}
        </p>
        {showCtas && (
          <div style={styles.row} data-reveal>
            <button type="button" onClick={openBooking} style={styles.primary} className="cl-btn-pressable">
              Book a consult
            </button>
            <Link href="/results" style={styles.ghost} className="cl-btn-pressable">
              See results ›
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#000", color: "#fff", padding: "112px 24px 96px" },
  inner: { maxWidth: 1080, margin: "0 auto" },
  eyebrow: {
    fontSize: 14,
    fontWeight: 600,
    color: "#2997ff",
    letterSpacing: "-0.224px",
    marginBottom: 12,
  },
  h: {
    margin: 0,
    fontFamily: 'var(--cl-font-display)',
    fontSize: 64,
    fontWeight: 600,
    lineHeight: 1.05,
    letterSpacing: "-0.5px",
    maxWidth: 820,
  },
  sub: {
    marginTop: 20,
    maxWidth: 720,
    fontSize: 21,
    lineHeight: 1.42,
    letterSpacing: "0.231px",
    color: "rgba(255,255,255,0.72)",
  },
  row: { marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" },
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
