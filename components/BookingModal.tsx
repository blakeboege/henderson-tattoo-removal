"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";

type Props = { open: boolean; onClose: () => void };

export default function BookingModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Reset state each time the modal opens.
  useEffect(() => {
    if (open) {
      setStep(0);
      setSlot(null);
    }
  }, [open]);

  // Enter animation.
  useEffect(() => {
    if (!open) return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: "power2.out" });
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 14, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Animate step transitions.
  const stepContentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open || !stepContentRef.current) return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;
    gsap.fromTo(
      stepContentRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.34, ease: "power3.out" }
    );
  }, [step, open]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bm-title"
      style={styles.backdrop}
      onClick={onClose}
    >
      <div ref={cardRef} style={styles.card} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.close} aria-label="Close">
          ×
        </button>

        <div ref={stepContentRef}>
          {step === 0 && (
            <>
              <div style={styles.eyebrow}>Step 1 of 2</div>
              <div id="bm-title" style={styles.h}>
                Tell us about the tattoo.
              </div>
              <div style={styles.sub}>
                This helps us estimate your session count before you come in.
              </div>
              <div className="cl-grid-2-to-1-sm" style={styles.fieldGrid}>
                <div style={styles.field}>
                  <label style={styles.label}>Location on body</label>
                  <input style={styles.input} placeholder="e.g. left forearm" />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Approximate size</label>
                  <select style={styles.input} defaultValue="Palm-sized (up to 2 in²)">
                    <option>Palm-sized (up to 2 in²)</option>
                    <option>Medium (2–10 in²)</option>
                    <option>Large (10 in²+)</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Ink color</label>
                  <select style={styles.input} defaultValue="Black only">
                    <option>Black only</option>
                    <option>Black + gray</option>
                    <option>Multi-color</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Years old</label>
                  <input style={styles.input} placeholder="5" />
                </div>
              </div>
              <div style={styles.cta}>
                <button
                  onClick={() => setStep(1)}
                  style={styles.primary}
                  className="cl-btn-pressable"
                >
                  Continue
                </button>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div style={styles.eyebrow}>Step 2 of 2</div>
              <div style={styles.h}>Pick a consult time.</div>
              <div style={styles.sub}>Consults are free and take 30 minutes.</div>
              <div className="cl-grid-3-to-2" style={styles.slotGrid}>
                {[
                  "Tue · May 5 · 10:00",
                  "Tue · May 5 · 11:30",
                  "Wed · May 6 · 14:00",
                  "Thu · May 7 · 09:00",
                  "Thu · May 7 · 16:30",
                  "Fri · May 8 · 12:00",
                ].map((t) => {
                  const active = slot === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSlot(t)}
                      style={{ ...styles.slot, ...(active ? styles.slotActive : {}) }}
                      className="cl-btn-pressable"
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
              <div style={styles.cta}>
                <button onClick={() => setStep(0)} style={styles.ghost} className="cl-btn-pressable">
                  Back
                </button>
                <button
                  onClick={onClose}
                  style={{
                    ...styles.primary,
                    opacity: slot ? 1 : 0.5,
                    cursor: slot ? "pointer" : "not-allowed",
                  }}
                  className="cl-btn-pressable"
                  disabled={!slot}
                >
                  Confirm booking
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.48)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: 24,
  },
  card: {
    position: "relative",
    background: "#fff",
    borderRadius: 12,
    padding: 40,
    width: "100%",
    maxWidth: 540,
    fontFamily: 'var(--cl-font-text)',
    boxShadow: "0 40px 80px rgba(0,0,0,0.38)",
  },
  close: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "none",
    background: "rgba(210,210,215,0.64)",
    color: "rgba(0,0,0,0.48)",
    fontSize: 20,
    cursor: "pointer",
    lineHeight: 1,
  },
  eyebrow: { fontSize: 12, fontWeight: 600, letterSpacing: "-0.12px", color: "rgba(0,0,0,0.48)" },
  h: {
    marginTop: 6,
    fontFamily: 'var(--cl-font-display)',
    fontSize: 28,
    fontWeight: 400,
    lineHeight: 1.14,
    letterSpacing: "0.196px",
    color: "#1d1d1f",
  },
  sub: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 1.47,
    letterSpacing: "-0.224px",
    color: "rgba(0,0,0,0.8)",
  },
  fieldGrid: { marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, fontWeight: 600, letterSpacing: "-0.12px", color: "#1d1d1f" },
  input: {
    background: "#fafafc",
    border: "3px solid rgba(0,0,0,0.04)",
    borderRadius: 11,
    padding: "8px 12px",
    fontSize: 15,
    letterSpacing: "-0.374px",
    color: "rgba(0,0,0,0.8)",
    fontFamily: "inherit",
    outline: "none",
  },
  slotGrid: { marginTop: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 },
  slot: {
    background: "#f5f5f7",
    border: "2px solid transparent",
    borderRadius: 8,
    padding: "10px 8px",
    fontSize: 13,
    letterSpacing: "-0.224px",
    color: "#1d1d1f",
    fontFamily: "inherit",
    cursor: "pointer",
  },
  slotActive: { border: "2px solid #0071e3", background: "#fff" },
  cta: { marginTop: 28, display: "flex", justifyContent: "flex-end", gap: 10 },
  primary: {
    background: "#0071e3",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: 980,
    fontSize: 15,
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "-0.374px",
  },
  ghost: {
    background: "transparent",
    color: "#0066cc",
    border: "1px solid #0066cc",
    padding: "10px 22px",
    borderRadius: 980,
    fontSize: 15,
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "-0.374px",
  },
};
