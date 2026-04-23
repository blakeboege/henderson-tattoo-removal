"use client";

import type { CSSProperties } from "react";
import Icon, { type IconName } from "@/components/Icon";
import { useReveal } from "@/lib/useReveal";

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        fontSize: 14,
        letterSpacing: "-0.224px",
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.56)" }}>{k}</span>
      <span style={{ color: "#fff" }}>{v}</span>
    </div>
  );
}

function SmallCard({ icon, h, b }: { icon: IconName; h: string; b: string }) {
  return (
    <div style={styles.smallCard} className="cl-hover-lift">
      <Icon name={icon} size={22} color="#0071e3" />
      <div
        style={{
          marginTop: 16,
          fontFamily: 'var(--cl-font-display)',
          fontSize: 21,
          fontWeight: 600,
          letterSpacing: "0.231px",
        }}
      >
        {h}
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 15,
          lineHeight: 1.6,
          letterSpacing: "-0.224px",
          color: "rgba(0,0,0,0.72)",
        }}
      >
        {b}
      </div>
    </div>
  );
}

export default function Technology() {
  const ref = useReveal<HTMLElement>({ y: 28, stagger: 0.08 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.eyebrow} data-reveal>
          Our technology
        </div>
        <h2 style={styles.h} className="cl-h-sm" data-reveal>
          One laser. The right one.
        </h2>
        <p style={styles.sub} data-reveal>
          Not every clinic uses the same equipment. Here&apos;s what we use, and why.
        </p>
        <div style={styles.grid} className="cl-grid-2-to-1">
          <div style={styles.big} data-reveal>
            <div>
              <div style={styles.bigTag}>PicoWay</div>
              <div style={styles.bigH}>Picosecond Nd:YAG laser</div>
              <p style={styles.bigB}>
                PicoWay fires in picoseconds — a trillionth of a second. That&apos;s short enough to
                shatter ink pigment into particles small enough for your lymphatic system to carry away.
                Older Q-switched lasers work in nanoseconds and rely on heat; PicoWay relies on mechanical
                shockwave. The result is faster clearance, less thermal damage, and a reliable safety
                profile on darker skin tones.
              </p>
              <div style={{ marginTop: 24 }}>
                <Spec k="Pulse width" v="450 ps" />
                <Spec k="Wavelengths" v="532 / 785 / 1064 nm" />
                <Spec k="FDA cleared" v="All Fitzpatrick types" />
                <Spec k="Footprint" v="2.1m × 0.9m" />
              </div>
            </div>
          </div>
          <div style={styles.small}>
            <div data-reveal>
              <SmallCard
                icon="snowflake"
                h="Zimmer Cryo 7"
                b="Chilled-air cooling at −30°F, delivered through a directional hose. Runs the entire session. The single biggest factor in patient comfort."
              />
            </div>
            <div data-reveal>
              <SmallCard
                icon="camera"
                h="Medical-grade photography"
                b="Standardized lighting, angle, and distance at every visit. You see the same image the clinician does, and you can watch the fade progress over time."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#000", color: "#fff", padding: "128px 24px" },
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
  sub: {
    marginTop: 16,
    maxWidth: 640,
    fontSize: 19,
    lineHeight: 1.6,
    letterSpacing: "-0.374px",
    color: "rgba(255,255,255,0.72)",
  },
  grid: { marginTop: 56, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 28 },
  big: {
    background: "linear-gradient(160deg, #1f1f22 0%, #161618 100%)",
    borderRadius: 16,
    padding: 44,
    boxShadow: "0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
  },
  bigTag: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "-0.12px",
    color: "#2997ff",
    background: "rgba(41,151,255,0.14)",
    padding: "5px 12px",
    borderRadius: 980,
    marginBottom: 18,
  },
  bigH: {
    fontFamily: 'var(--cl-font-display)',
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: "-0.196px",
  },
  bigB: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 1.6,
    letterSpacing: "-0.224px",
    color: "rgba(255,255,255,0.78)",
  },
  small: { display: "flex", flexDirection: "column", gap: 20 },
  smallCard: {
    background: "#fff",
    color: "#1d1d1f",
    borderRadius: 16,
    padding: 32,
    flex: 1,
    boxShadow: "0 24px 60px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.06)",
  },
};
