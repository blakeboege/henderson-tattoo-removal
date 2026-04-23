"use client";

import type { CSSProperties } from "react";
import Icon from "@/components/Icon";
import { useReveal } from "@/lib/useReveal";

const services = [
  {
    tag: "Full removal",
    h: "Complete tattoo removal",
    b: "Our most common treatment. We work until your skin is clear — typically 6 to 10 sessions for black ink, 8 to 12 for multi-color. Booked a session at a time, priced a session at a time. You can stop at any point and keep what you've already paid for.",
    bullets: [
      "All ink colors treated",
      "PicoWay laser, medically supervised",
      "Written session estimate at consult",
      "6 to 8 weeks between visits",
    ],
  },
  {
    tag: "Fade for coverup",
    h: "Fade-for-coverup sessions",
    b: "You don't need full removal — just enough fade for a new piece to sit cleanly on top. We work directly with your tattoo artist. Typical fade-for-coverup is 3 to 5 sessions.",
    bullets: [
      "Collaborate with your artist",
      "Planned around your design",
      "Typically 3–5 sessions",
      "Discounted from the regular rate",
    ],
  },
  {
    tag: "Scar-conscious",
    h: "Previously-treated tattoos",
    b: "If a previous clinic caused scarring, hypopigmentation, or left stubborn residual ink — bring us the photos and we'll give you an honest assessment. Sometimes the right answer is not to treat.",
    bullets: [
      "Complimentary scar consult",
      "Second-opinion photography",
      "Honest yes/no assessment",
      "Referral out if we aren't the right fit",
    ],
  },
];

// Map each service index to a medical, trustworthy visual.
// 0 — Complete removal: before/after pair showing full clearance
// 1 — Fade for coverup:  before/after pair showing partial fade
// 2 — Scar-conscious:    clinic interior, signals careful clinical assessment
const artForVariant = [
  {
    kind: "pair" as const,
    before: "/assets/chest-before.jpg",
    after: "/assets/chest-after.jpg",
    session: 8,
  },
  {
    kind: "pair" as const,
    before: "/assets/upperarm-before.jpg",
    after: "/assets/upperarm-after.jpg",
    session: 4,
  },
  {
    kind: "single" as const,
    src: "/assets/clinic-interior.jpg",
    alt: "Treatment room — Henderson Tattoo Removal",
  },
];

function ServiceArt({ variant }: { variant: number }) {
  const art = artForVariant[variant];
  if (!art) return null;

  if (art.kind === "single") {
    return (
      <div style={artStyles.card}>
        <img src={art.src} alt={art.alt} style={artStyles.singleImg} draggable={false} />
      </div>
    );
  }

  return (
    <div style={artStyles.card}>
      <div style={artStyles.pair}>
        <div style={artStyles.imgWrap}>
          <img src={art.before} alt="" style={artStyles.pairImg} draggable={false} />
          <div style={artStyles.stamp}>Before</div>
        </div>
        <div style={artStyles.imgWrap}>
          <img src={art.after} alt="" style={artStyles.pairImg} draggable={false} />
          <div style={artStyles.stamp}>Session {art.session}</div>
        </div>
      </div>
    </div>
  );
}

const artStyles: Record<string, CSSProperties> = {
  card: {
    position: "relative",
    width: "100%",
    aspectRatio: "5 / 4",
    borderRadius: 16,
    overflow: "hidden",
    background: "#e8e6e4",
    boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)",
  },
  singleImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    userSelect: "none",
  },
  pair: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 3,
    height: "100%",
    background: "#fff",
  },
  imgWrap: {
    position: "relative",
    overflow: "hidden",
    background: "#e8e6e4",
  },
  pairImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    userSelect: "none",
  },
  stamp: {
    position: "absolute",
    bottom: 10,
    left: 10,
    background: "rgba(0,0,0,0.62)",
    color: "#fff",
    fontSize: 10,
    letterSpacing: "-0.08px",
    padding: "4px 9px",
    borderRadius: 5,
  },
};

export default function ServiceDetail() {
  const ref = useReveal<HTMLElement>({ y: 30, stagger: 0.08, duration: 1.0 });
  return (
    <section ref={ref} style={styles.section} className="cl-pad-sm">
      <div style={styles.inner}>
        {services.map((s, i) => (
          <div
            key={s.h}
            style={{ ...styles.row, flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}
            className="cl-row-reverse-md"
          >
            <div style={styles.copy} data-reveal>
              <div style={styles.tag}>{s.tag}</div>
              <h2 style={styles.h}>{s.h}</h2>
              <p style={styles.b}>{s.b}</p>
              <ul style={styles.list} className="cl-grid-2-to-1">
                {s.bullets.map((bu) => (
                  <li key={bu} style={styles.li}>
                    <span style={styles.dot}>
                      <Icon name="check" size={14} color="#0071e3" />
                    </span>
                    <span>{bu}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={styles.art} data-reveal>
              <ServiceArt variant={i} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#f5f5f7", color: "#1d1d1f", padding: "128px 24px" },
  inner: {
    maxWidth: 1080,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 128,
  },
  row: { display: "flex", gap: 88, alignItems: "center", flexWrap: "wrap" },
  copy: { flex: "1 1 360px" },
  tag: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "-0.12px",
    color: "#0066cc",
    background: "rgba(0,113,227,0.08)",
    padding: "5px 12px",
    borderRadius: 980,
    marginBottom: 18,
  },
  h: {
    margin: 0,
    fontFamily: "var(--cl-font-display)",
    fontSize: 42,
    fontWeight: 600,
    lineHeight: 1.06,
    letterSpacing: "-0.32px",
  },
  b: {
    marginTop: 20,
    fontSize: 17,
    lineHeight: 1.6,
    letterSpacing: "-0.374px",
    color: "rgba(0,0,0,0.72)",
  },
  list: {
    marginTop: 28,
    padding: 0,
    listStyle: "none",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
  },
  li: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    fontSize: 15,
    lineHeight: 1.5,
    letterSpacing: "-0.224px",
    color: "rgba(0,0,0,0.84)",
  },
  dot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "rgba(0,113,227,0.1)",
    flexShrink: 0,
    marginTop: 1,
  },
  art: { flex: "1 1 360px" },
};
