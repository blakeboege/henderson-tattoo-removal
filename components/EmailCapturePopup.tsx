"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { postLead } from "@/lib/postLead";

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function EmailCapturePopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("htr_ec_popup_seen") === "1";
    } catch {}
    if (seen) return;

    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      try {
        sessionStorage.setItem("htr_ec_popup_seen", "1");
      } catch {}
      setOpen(true);
    };

    const t = window.setTimeout(fire, 40000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && e.relatedTarget === null) fire();
    };
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!open) return null;

  const close = () => setOpen(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    postLead(email, "");
    setEmail("");
    setSent(true);
    setTimeout(close, 1800);
  };

  return (
    <div
      style={styles.pop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ec-pop-h"
      onClick={close}
    >
      <div style={styles.popCard} onClick={(e) => e.stopPropagation()}>
        <button onClick={close} style={styles.popClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        {!sent ? (
          <>
            <h3 id="ec-pop-h" style={styles.popH}>
              Want a free estimate?
            </h3>
            <p style={styles.popP}>
              Realistic pricing and session timelines, based on your tattoo. No sales emails.
            </p>
            <form onSubmit={submit} style={styles.popForm} noValidate>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={styles.popInput}
                autoFocus
              />
              <button type="submit" style={styles.popBtn} className="cl-btn-pressable">
                Get my estimate
              </button>
            </form>
            <div style={styles.popTrust}>
              <LockIcon />
              <span>We respect your privacy. No spam.</span>
            </div>
          </>
        ) : (
          <div style={styles.popDone}>
            <div style={styles.doneIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#30d158"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: "-0.224px",
                  color: "#1d1d1f",
                }}
              >
                Got it — check your inbox.
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "rgba(0,0,0,0.56)",
                  letterSpacing: "-0.224px",
                  marginTop: 2,
                }}
              >
                We&apos;ll reply within one business day.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  pop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
    animation: "ec-fade 220ms ease-out",
  },
  popCard: {
    position: "relative",
    background: "#fff",
    borderRadius: 18,
    padding: "36px 32px 28px",
    maxWidth: 420,
    width: "100%",
    color: "#1d1d1f",
    boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
    animation: "ec-pop 260ms cubic-bezier(0.2, 0.9, 0.3, 1.2)",
    textAlign: "left",
  },
  popClose: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.04)",
    color: "rgba(0,0,0,0.56)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popH: {
    margin: 0,
    fontFamily: 'var(--cl-font-display)',
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: "-0.3px",
  },
  popP: {
    margin: "8px 0 20px",
    fontSize: 15,
    lineHeight: 1.5,
    color: "rgba(0,0,0,0.64)",
    letterSpacing: "-0.224px",
  },
  popForm: { display: "flex", flexDirection: "column", gap: 8 },
  popInput: {
    background: "#fafafc",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 980,
    padding: "12px 18px",
    fontSize: 15,
    letterSpacing: "-0.374px",
    color: "#1d1d1f",
    fontFamily: "inherit",
    outline: "none",
  },
  popBtn: {
    background: "#0071e3",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: 980,
    fontFamily: "inherit",
    fontSize: 15,
    cursor: "pointer",
    letterSpacing: "-0.374px",
  },
  popTrust: {
    marginTop: 14,
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    letterSpacing: "-0.12px",
    color: "rgba(0,0,0,0.48)",
  },
  popDone: { display: "flex", alignItems: "center", gap: 14 },
  doneIcon: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(48,209,88,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
};
