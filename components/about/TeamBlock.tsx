"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";

const team = [
  {
    name: "Dr. Mira Adeyemi, MD",
    role: "Medical director",
    bio: "Board-certified dermatologist. Oversees clinical protocols, supervises complex cases, and signs off on every treatment plan.",
    years: "12 yrs",
    photo: "/assets/team-mira.jpg",
  },
  {
    name: "Jordan Reyes, CLT",
    role: "Lead laser technician",
    bio: "Certified laser technician, 2,000+ sessions delivered. Specializes in multi-color and Fitzpatrick V–VI treatment.",
    years: "7 yrs",
    photo: "/assets/team-jordan.jpg",
  },
  {
    name: "Priya Chen, RN",
    role: "Clinical coordinator",
    bio: "Registered nurse. Runs consults, handles aftercare questions, manages the progress photography archive.",
    years: "9 yrs",
    photo: "/assets/team-priya.jpg",
  },
];

export default function TeamBlock() {
  const ref = useReveal<HTMLElement>({ y: 28, stagger: 0.08, duration: 1.0 });
  return (
    <section ref={ref} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.eyebrow} data-reveal>
          The team
        </div>
        <h2 style={styles.h} className="cl-h-sm" data-reveal>
          Small practice. Credentialed staff.
        </h2>
        <div style={styles.grid} className="cl-grid-3-to-1">
          {team.map((m) => (
            <div key={m.name} style={styles.card} className="cl-hover-lift-dark" data-reveal>
              <div style={styles.portrait}>
                <img
                  src={m.photo}
                  alt={m.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 28%",
                    display: "block",
                  }}
                />
              </div>
              <div style={styles.cardBody}>
                <div style={styles.name}>{m.name}</div>
                <div style={styles.role}>
                  {m.role} · {m.years}
                </div>
                <div style={styles.bio}>{m.bio}</div>
              </div>
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
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  card: { background: "#1d1d1f", borderRadius: 12, overflow: "hidden" },
  portrait: { aspectRatio: "1", background: "#2a2a2d", overflow: "hidden" },
  cardBody: { padding: 24 },
  name: {
    fontFamily: 'var(--cl-font-display)',
    fontSize: 21,
    fontWeight: 600,
    letterSpacing: "0.231px",
  },
  role: { marginTop: 4, fontSize: 13, color: "#2997ff", letterSpacing: "-0.224px" },
  bio: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.72)",
    letterSpacing: "-0.224px",
  },
};
