"use client";

import type { CSSProperties } from "react";
import { useReveal, useImageReveal } from "@/lib/useReveal";

function FacilityRow({ k, v }: { k: string; v: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "14px 0",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <dt style={{ fontSize: 14, color: "rgba(0,0,0,0.56)", letterSpacing: "-0.224px" }}>{k}</dt>
      <dd
        style={{
          margin: 0,
          fontSize: 14,
          color: "#1d1d1f",
          letterSpacing: "-0.224px",
          fontWeight: 500,
        }}
      >
        {v}
      </dd>
    </div>
  );
}

export default function Facility() {
  const ref = useReveal<HTMLElement>({ y: 22, stagger: 0.07 });
  const imgRef = useImageReveal<HTMLDivElement>();
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner} className="cl-grid-2-to-1">
        <div>
          <div style={styles.eyebrow} data-reveal>
            Service area
          </div>
          <h2 style={styles.h} className="cl-h-sm" data-reveal>
            Henderson, Nevada.
          </h2>
          <p style={styles.p} data-reveal>
            We serve Henderson, Las Vegas, Summerlin, and surrounding areas by appointment. Consults are
            booked one at a time — no reception scrum, no overlapping sessions. When your appointment
            starts, we&apos;re ready for you.
          </p>
          <dl style={styles.dl} data-reveal>
            <FacilityRow k="Service area" v="Henderson · Las Vegas · Summerlin" />
            <FacilityRow k="Hours" v="Tue–Sat · 9:00–18:00" />
            <FacilityRow k="Booking" v="By appointment only" />
            <FacilityRow k="Languages" v="English · Spanish" />
          </dl>
        </div>
        <div ref={imgRef}>
          <img
            data-reveal-image
            src="/assets/clinic-interior.jpg"
            alt="Treatment room — Henderson Tattoo Removal"
            style={{
              width: "100%",
              borderRadius: 12,
              display: "block",
              aspectRatio: "16/10",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#f5f5f7", color: "#1d1d1f", padding: "112px 24px" },
  inner: {
    maxWidth: 1080,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: 64,
    alignItems: "center",
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
    fontSize: 44,
    fontWeight: 600,
    lineHeight: 1.07,
    letterSpacing: "-0.3px",
  },
  p: {
    marginTop: 16,
    fontSize: 17,
    lineHeight: 1.5,
    letterSpacing: "-0.374px",
    color: "rgba(0,0,0,0.8)",
  },
  dl: { marginTop: 32, padding: 0 },
};
