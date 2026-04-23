"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";

type Case = {
  ink: string;
  loc: string;
  sessions: number;
  age: string;
  size: string;
  notes: string;
  before: string;
  after: string;
};

const cases: Case[] = [
  {
    ink: "Black ink",
    loc: "Forearm",
    sessions: 7,
    age: "11 years old",
    size: "Medium",
    notes: "Tribal band. Client stopped at session 7 — satisfied.",
    before: "/assets/forearm-before.jpg",
    after: "/assets/forearm-after.jpg",
  },
  {
    ink: "Black ink",
    loc: "Shoulder",
    sessions: 9,
    age: "8 years old",
    size: "Large",
    notes: "Dense black. 95% clearance at session 9.",
    before: "/assets/shoulder-before.jpg",
    after: "/assets/shoulder-after.jpg",
  },
  {
    ink: "Multi-color",
    loc: "Wrist",
    sessions: 10,
    age: "6 years old",
    size: "Palm-sized",
    notes: "Red and green pigment. Full clearance.",
    before: "/assets/wrist-before.jpg",
    after: "/assets/wrist-after.jpg",
  },
  {
    ink: "Black ink",
    loc: "Hand",
    sessions: 6,
    age: "4 years old",
    size: "Palm-sized",
    notes: "Single initial. Fast clearance on young ink.",
    before: "/assets/hand-before.jpg",
    after: "/assets/hand-after.jpg",
  },
  {
    ink: "Fade for coverup",
    loc: "Upper arm",
    sessions: 4,
    age: "9 years old",
    size: "Medium",
    notes: "Prepped for a half-sleeve coverup. Client's artist confirmed workable.",
    before: "/assets/upperarm-before.jpg",
    after: "/assets/upperarm-after.jpg",
  },
  {
    ink: "Multi-color",
    loc: "Ankle",
    sessions: 11,
    age: "12 years old",
    size: "Medium",
    notes: "Old school Americana. Yellow pigment was the slow piece.",
    before: "/assets/ankle-before.jpg",
    after: "/assets/ankle-after.jpg",
  },
  {
    ink: "Black ink",
    loc: "Chest",
    sessions: 8,
    age: "7 years old",
    size: "Large",
    notes: "Full clearance. Client pursued other tattoos post-removal.",
    before: "/assets/chest-before.jpg",
    after: "/assets/chest-after.jpg",
  },
  {
    ink: "Black ink",
    loc: "Neck",
    sessions: 9,
    age: "10 years old",
    size: "Palm-sized",
    notes: "Behind-ear script. Careful low-fluence protocol for thin skin.",
    before: "/assets/neck-before.jpg",
    after: "/assets/neck-after.jpg",
  },
  {
    ink: "Fade for coverup",
    loc: "Ribs",
    sessions: 3,
    age: "5 years old",
    size: "Medium",
    notes: "Light fade only. Artist overlay planned for 60-day mark.",
    before: "/assets/ribs-before.jpg",
    after: "/assets/ribs-after.jpg",
  },
];

const filters = ["All", "Black ink", "Multi-color", "Fade for coverup"] as const;
type Filter = (typeof filters)[number];

export default function ResultsGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const gridRef = useRef<HTMLDivElement | null>(null);
  const firstMountRef = useRef(true);

  const filtered = filter === "All" ? cases : cases.filter((c) => c.ink === filter);

  // Animate cards in on first mount (scroll-triggered) and on filter change.
  useEffect(() => {
    if (!gridRef.current) return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = gridRef.current.querySelectorAll<HTMLElement>("[data-result-card]");
    if (prefersReduce) {
      gsap.set(cards, { opacity: 1, y: 0, clearProps: "all" });
      return;
    }
    if (firstMountRef.current) {
      firstMountRef.current = false;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    } else {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 14, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.04,
        }
      );
    }
  }, [filter]);

  return (
    <>
      <section style={styles.filterSection} className="cl-pad-sm">
        <div style={styles.filterInner}>
          <div style={styles.filterRow}>
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{ ...styles.chip, ...(active ? styles.chipActive : {}) }}
                  className="cl-btn-pressable"
                >
                  {f}
                </button>
              );
            })}
          </div>
          <div style={styles.count}>
            {filtered.length} case{filtered.length === 1 ? "" : "s"}
          </div>
        </div>
      </section>
      <section style={styles.gallery} className="cl-pad-sm">
        <div style={styles.galleryInner}>
          <div ref={gridRef} style={styles.grid} className="cl-grid-3-to-1">
            {filtered.map((c, i) => (
              <CaseCard key={c.loc + i} c={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CaseCard({ c }: { c: Case }) {
  return (
    <div data-result-card style={styles.case} className="cl-hover-lift">
      <div style={styles.pair}>
        <div style={styles.imgWrap}>
          <img src={c.before} alt="" style={styles.img} className="cl-img-hover" />
          <div style={styles.stamp}>Before</div>
        </div>
        <div style={styles.imgWrap}>
          <img src={c.after} alt="" style={styles.img} className="cl-img-hover" />
          <div style={styles.stamp}>Session {c.sessions}</div>
        </div>
      </div>
      <div style={styles.meta}>
        <div style={styles.metaTop}>
          <span style={styles.loc}>{c.loc}</span>
          <span style={styles.pill}>{c.ink}</span>
        </div>
        <div style={styles.facts}>
          <Fact k="Size" v={c.size} />
          <Fact k="Age of tattoo" v={c.age} />
          <Fact k="Sessions" v={String(c.sessions)} />
        </div>
        <div style={styles.notes}>{c.notes}</div>
      </div>
    </div>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          color: "rgba(0,0,0,0.48)",
          letterSpacing: "-0.12px",
          textTransform: "uppercase",
        }}
      >
        {k}
      </div>
      <div
        style={{
          marginTop: 2,
          fontSize: 14,
          color: "#1d1d1f",
          letterSpacing: "-0.224px",
          fontWeight: 500,
        }}
      >
        {v}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  filterSection: { background: "#f5f5f7", padding: "32px 24px 0" },
  filterInner: {
    maxWidth: 1080,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  filterRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  chip: {
    background: "#fff",
    border: "1px solid transparent",
    color: "#1d1d1f",
    padding: "8px 16px",
    borderRadius: 980,
    fontFamily: "inherit",
    fontSize: 14,
    cursor: "pointer",
    letterSpacing: "-0.224px",
  },
  chipActive: { background: "#1d1d1f", color: "#fff" },
  count: { fontSize: 13, color: "rgba(0,0,0,0.56)", letterSpacing: "-0.224px" },
  gallery: { background: "#f5f5f7", padding: "32px 24px 112px" },
  galleryInner: { maxWidth: 1080, margin: "0 auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 },
  case: {
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  pair: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "#fff" },
  imgWrap: { position: "relative", overflow: "hidden", background: "#e8e6e4" },
  img: { width: "100%", display: "block" },
  stamp: {
    position: "absolute",
    bottom: 8,
    left: 8,
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    fontSize: 10,
    letterSpacing: "-0.08px",
    padding: "3px 8px",
    borderRadius: 5,
  },
  meta: { padding: 20 },
  metaTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  loc: {
    fontFamily: 'var(--cl-font-display)',
    fontSize: 17,
    fontWeight: 600,
    letterSpacing: "0.231px",
  },
  pill: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "-0.12px",
    color: "#0066cc",
    background: "rgba(0,113,227,0.08)",
    padding: "3px 10px",
    borderRadius: 980,
  },
  facts: {
    marginTop: 16,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    paddingBottom: 14,
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },
  notes: {
    marginTop: 14,
    fontSize: 13,
    lineHeight: 1.5,
    color: "rgba(0,0,0,0.72)",
    letterSpacing: "-0.224px",
  },
};
