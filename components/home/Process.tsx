"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";

const steps = [
  {
    n: "01",
    h: "Free consult",
    b: "A 30-minute visit. We assess the tattoo, take baseline photos, explain the plan, and quote a session range. You leave with paperwork. No pressure to book.",
  },
  {
    n: "02",
    h: "Treatment sessions",
    b: "15–30 minutes each. Six to eight weeks apart. Zimmer cooling keeps it tolerable. You'll see visible fading by session three.",
  },
  {
    n: "03",
    h: "Progress review",
    b: "At session five and every three after, we re-photograph and compare. If you're clear before the estimate, you're done. No pressure to keep going.",
  },
  {
    n: "04",
    h: "Follow-up",
    b: "Twelve weeks after your final session we re-photograph one last time. If you need another pass, we do it at our regular per-session rate — never a penalty fee.",
  },
];

export default function Process() {
  const ref = useReveal<HTMLElement>({ y: 24, stagger: 0.08 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.eyebrow} data-reveal>
          How it works
        </div>
        <h2 style={styles.h} className="cl-h-sm" data-reveal>
          Four steps. No surprises.
        </h2>
        <div style={styles.grid} className="cl-grid-4-to-2">
          {steps.map((s) => (
            <div key={s.n} style={styles.step} className="cl-hover-lift-dark" data-reveal>
              <div style={styles.num}>{s.n}</div>
              <div style={styles.stepH}>{s.h}</div>
              <div style={styles.stepB}>{s.b}</div>
            </div>
          ))}
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
    color: "#2997ff",
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
  grid: { marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignItems: "stretch" },
  step: {
    background: "#1d1d1f",
    borderRadius: 12,
    padding: 30,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  num: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 12,
    color: "#2997ff",
    letterSpacing: "-0.12px",
    marginBottom: 16,
  },
  stepH: {
    fontFamily: 'var(--cl-font-display)',
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.14,
    letterSpacing: "0.196px",
  },
  stepB: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 1.6,
    letterSpacing: "-0.224px",
    color: "rgba(255,255,255,0.72)",
  },
};
