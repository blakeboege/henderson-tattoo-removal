"use client";

import { type CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";

export default function EstimateCTA() {
  const ref = useReveal<HTMLElement>({ y: 14, stagger: 0.06, duration: 0.7 });

  const scrollToForm = () => {
    const el = document.getElementById("estimate-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={ref} style={styles.section} className="cl-pad-sm">
      <div style={styles.inner} className="cl-estimate-strip">
        <div style={styles.copy}>
          <div style={styles.h} data-reveal>
            Not sure how many sessions you&apos;ll need?
          </div>
          <div style={styles.sub} data-reveal>
            Get a free estimate by text or email.
          </div>
        </div>
        <button
          type="button"
          onClick={scrollToForm}
          style={styles.btn}
          className="cl-btn-pressable"
          data-reveal
        >
          Get my estimate
        </button>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    background: "#000",
    color: "#fff",
    padding: "44px 24px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  inner: {
    maxWidth: 1080,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  h: {
    fontFamily: "var(--cl-font-display)",
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: "-0.3px",
    color: "#fff",
    lineHeight: 1.25,
  },
  sub: {
    fontSize: 15,
    letterSpacing: "-0.224px",
    color: "rgba(255,255,255,0.78)",
    lineHeight: 1.5,
  },
  btn: {
    background: "#0071e3",
    color: "#fff",
    border: "none",
    padding: "14px 26px",
    borderRadius: 980,
    fontFamily: "var(--cl-font-text)",
    fontSize: 17,
    fontWeight: 500,
    cursor: "pointer",
    letterSpacing: "-0.374px",
    whiteSpace: "nowrap",
  },
};
