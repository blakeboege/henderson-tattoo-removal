"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";

export default function DisclaimerBlock() {
  const ref = useReveal<HTMLElement>({ y: 24, stagger: 0.08 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#2997ff",
            letterSpacing: "-0.224px",
            marginBottom: 10,
          }}
          data-reveal
        >
          Transparency
        </div>
        <h2 style={styles.h} className="cl-h-sm" data-reveal>
          What these photos are, and what they aren&apos;t.
        </h2>
        <div style={styles.grid} className="cl-grid-2-to-1">
          <div data-reveal>
            <strong style={{ color: "#fff" }}>Real clients.</strong> Every photo shown with written
            consent. No stock imagery, no borrowed cases.
          </div>
          <div data-reveal>
            <strong style={{ color: "#fff" }}>Not guarantees.</strong> Results vary with ink type, skin
            tone, location, age of tattoo, and immune response. Your plan is yours.
          </div>
          <div data-reveal>
            <strong style={{ color: "#fff" }}>Not retouched.</strong> Same camera, same lighting, same
            distance. Cropping only — no color correction.
          </div>
          <div data-reveal>
            <strong style={{ color: "#fff" }}>Not cherry-picked.</strong> We publish the outliers too.
            Ask to see cases that took longer than average — we have those.
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#000", color: "rgba(255,255,255,0.72)", padding: "96px 24px" },
  inner: { maxWidth: 1080, margin: "0 auto" },
  h: {
    margin: 0,
    fontFamily: 'var(--cl-font-display)',
    fontSize: 40,
    fontWeight: 600,
    lineHeight: 1.07,
    letterSpacing: "-0.3px",
    color: "#fff",
    marginBottom: 32,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: "-0.224px",
  },
};
