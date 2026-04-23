"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";

export default function Mission() {
  const ref = useReveal<HTMLElement>({ y: 22, stagger: 0.07 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner} className="cl-grid-2-to-1">
        <div data-reveal>
          <div style={styles.eyebrow}>Mission</div>
          <h2 style={styles.h} className="cl-h-sm">
            Competent care. No theatre.
          </h2>
        </div>
        <div>
          <p style={styles.p} data-reveal>
            Most clients come to us after a cycle of disappointing visits elsewhere. Oversold package
            deals. Vague timelines. A chair behind a bead curtain in a tattoo parlor. We built Henderson
            Tattoo Removal to be the opposite of that.
          </p>
          <p style={styles.p} data-reveal>
            We charge per session, at a flat rate. We take photos every visit and we show them to you. We
            tell you if you&apos;re on track, and we tell you if you aren&apos;t. If the right answer is
            to stop, we say so.
          </p>
          <p style={styles.p} data-reveal>
            Our clients are adults who made a decision once and want a clean slate now. They&apos;re past
            embarrassment. They want competent care from a licensed provider in a quiet room — and
            that&apos;s what we&apos;re here to provide.
          </p>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#f5f5f7", color: "#1d1d1f", padding: "112px 24px" },
  inner: { maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64 },
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
    margin: "0 0 16px",
    fontSize: 17,
    lineHeight: 1.5,
    letterSpacing: "-0.374px",
    color: "rgba(0,0,0,0.8)",
  },
};
