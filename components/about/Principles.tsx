"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";

const items = [
  {
    k: "01",
    h: "Per session, every session.",
    b: 'No packages. No "save $600 by prepaying ten visits." You pay for what you get, one visit at a time.',
  },
  {
    k: "02",
    h: "We photograph every visit.",
    b: 'Same lighting, same angle. You see your progress. So do we. No gaslighting about "look how far you\'ve come."',
  },
  {
    k: "03",
    h: "Realistic timelines.",
    b: "We quote a range, not a minimum. Most black ink is 6–10 sessions. If your tattoo is an outlier, we'll tell you at the consult.",
  },
  {
    k: "04",
    h: "Honest when we aren't the answer.",
    b: "Some tattoos don't respond. Some skin should rest. If removal isn't right for you right now, we say so and we don't charge for the consult.",
  },
];

export default function Principles() {
  const ref = useReveal<HTMLElement>({ y: 26, stagger: 0.08 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.eyebrow} data-reveal>
          How we work
        </div>
        <h2 style={styles.h} className="cl-h-sm" data-reveal>
          Four principles.
        </h2>
        <div style={styles.grid} className="cl-grid-2-to-1">
          {items.map((i) => (
            <div key={i.k} data-reveal>
              <div style={styles.k}>{i.k}</div>
              <div style={styles.itemH}>{i.h}</div>
              <div style={styles.itemB}>{i.b}</div>
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
    margin: "0 0 48px",
    fontFamily: 'var(--cl-font-display)',
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 1.07,
    letterSpacing: "-0.3px",
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 48 },
  k: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 12,
    color: "#2997ff",
    letterSpacing: "-0.12px",
    marginBottom: 14,
  },
  itemH: {
    fontFamily: 'var(--cl-font-display)',
    fontSize: 28,
    fontWeight: 600,
    lineHeight: 1.14,
    letterSpacing: "-0.196px",
  },
  itemB: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.72)",
    letterSpacing: "-0.374px",
  },
};
