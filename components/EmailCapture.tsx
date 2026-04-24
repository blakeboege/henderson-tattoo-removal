"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";
import { postLead } from "@/lib/postLead";

function Dot({ active, done }: { active?: boolean; done?: boolean }) {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: done ? "#30d158" : active ? "#2997ff" : "rgba(255,255,255,0.22)",
        display: "inline-block",
      }}
    />
  );
}
function DotSep({ active }: { active?: boolean }) {
  return (
    <span
      style={{
        width: 18,
        height: 1,
        background: active ? "#2997ff" : "rgba(255,255,255,0.22)",
        display: "inline-block",
      }}
    />
  );
}

function LockIcon() {
  return (
    <svg
      width="13"
      height="13"
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

export default function EmailCapture() {
  const [step, setStep] = useState<"email" | "phone" | "done">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Snapshot of submitted values so the success state can reference them
  // after the live input state is cleared.
  const [sentEmail, setSentEmail] = useState("");
  const [sentPhone, setSentPhone] = useState("");
  // Gate the final submit so a slow network can't produce a double-tap.
  const [submitting, setSubmitting] = useState(false);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const ref = useReveal<HTMLElement>({ y: 24, stagger: 0.08, duration: 0.9 });

  const finalize = async (emailValue: string, phoneValue: string) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      // Await so we observe that postLead has at least dispatched the
      // request (fetch + keepalive primary, sendBeacon / hidden-form
      // fallbacks) before flipping to the success state.
      await postLead(emailValue, phoneValue);
    } finally {
      setSentEmail(emailValue);
      setSentPhone(phoneValue);
      setEmail("");
      setPhone("");
      setSubmitting(false);
      setStep("done");
    }
  };

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep("phone");
    setTimeout(() => phoneRef.current?.focus(), 80);
  };

  const submitPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    void finalize(email, phone);
  };

  const skipPhone = () => {
    if (submitting) return;
    void finalize(email, "");
  };

  return (
    <section
      id="estimate-form"
      ref={ref}
      style={styles.section}
      aria-labelledby="ec-headline"
      className="cl-section-sm cl-pad-sm"
    >
      <div style={styles.inner}>
        {step === "email" && (
          <>
            <div style={styles.stepBar} data-reveal>
              <Dot active /> <DotSep /> <Dot />
              <span style={styles.stepLabel}>Step 1 of 2 · Email</span>
            </div>
            <h2 id="ec-headline" style={styles.h} className="cl-display-sm" data-reveal>
              Want to know what your tattoo will take to remove?
            </h2>
            <p style={styles.sub} data-reveal>
              We&apos;ll send realistic pricing and session timelines based on your tattoo. Serving
              Henderson and Las Vegas.
            </p>
            <form onSubmit={submitEmail} style={styles.form} noValidate data-reveal>
              <div style={styles.field}>
                <label htmlFor="ec-email" style={styles.label}>
                  Email
                </label>
                <input
                  id="ec-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={styles.input}
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
              <button type="submit" style={styles.btn} className="cl-btn-pressable">
                Get my estimate →
              </button>
              <div style={styles.trust}>
                <LockIcon />
                <span>We respect your privacy. No spam.</span>
              </div>
            </form>
          </>
        )}

        {step === "phone" && (
          <>
            <div style={styles.stepBar} data-reveal>
              <Dot done /> <DotSep active /> <Dot active />
              <span style={styles.stepLabel}>Step 2 of 2 · Phone optional</span>
            </div>
            <h2 style={styles.h} className="cl-display-sm" data-reveal>
              Got it. Want the estimate by text too?
            </h2>
            <p style={styles.sub} data-reveal>
              Add your phone number for a faster reply, or continue with email only.
            </p>
            <form onSubmit={submitPhone} style={styles.form} noValidate data-reveal>
              <div style={styles.field}>
                <label htmlFor="ec-phone" style={styles.label}>
                  Phone number
                </label>
                <input
                  ref={phoneRef}
                  id="ec-phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(702) 555-0123"
                  style={styles.input}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
              <button
                type="submit"
                style={{ ...styles.btn, ...(submitting ? styles.btnDisabled : {}) }}
                className="cl-btn-pressable"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Finish →"}
              </button>
              <div style={styles.trust}>
                <button
                  type="button"
                  onClick={skipPhone}
                  style={styles.skipBtn}
                  disabled={submitting}
                >
                  Email only is fine
                </button>
                <span style={{ opacity: 0.4 }}>·</span>
                <LockIcon />
                <span>We respect your privacy. No spam.</span>
              </div>
            </form>
          </>
        )}

        {step === "done" && (
          <div style={styles.done} data-reveal>
            <div style={styles.doneIcon}>
              <svg
                width="30"
                height="30"
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
            <div style={styles.doneH}>Got it — your estimate is on its way.</div>
            <div style={styles.doneB}>
              We&apos;ll follow up with <strong style={{ color: "#fff" }}>{sentEmail}</strong>
              {sentPhone ? (
                <>
                  {" "}
                  and text <strong style={{ color: "#fff" }}>{sentPhone}</strong>
                </>
              ) : null}{" "}
              within one business day.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    background: "#000",
    color: "#fff",
    padding: "128px 24px",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    scrollMarginTop: 72,
  },
  inner: { maxWidth: 720, margin: "0 auto", position: "relative" },
  stepBar: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    letterSpacing: "-0.12px",
    color: "rgba(255,255,255,0.66)",
    marginBottom: 20,
    fontWeight: 500,
  },
  stepLabel: { marginLeft: 8 },
  h: {
    margin: 0,
    fontFamily: "var(--cl-font-display)",
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 1.07,
    letterSpacing: "-0.4px",
    textWrap: "balance",
  },
  sub: {
    margin: "18px auto 0",
    maxWidth: 580,
    fontSize: 19,
    lineHeight: 1.6,
    letterSpacing: "-0.374px",
    color: "rgba(255,255,255,0.8)",
  },
  form: {
    marginTop: 44,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    maxWidth: 520,
    margin: "44px auto 0",
    textAlign: "left",
  },
  field: { display: "flex", flexDirection: "column", gap: 8, minWidth: 0 },
  label: {
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "-0.12px",
    color: "rgba(255,255,255,0.82)",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 14,
    padding: "16px 20px",
    fontSize: 17,
    letterSpacing: "-0.374px",
    color: "#fff",
    fontFamily: "inherit",
    outline: "none",
    minWidth: 0,
    transition: "border-color 180ms var(--cl-ease), background 180ms var(--cl-ease)",
  },
  btn: {
    marginTop: 4,
    background: "#0071e3",
    color: "#fff",
    border: "none",
    padding: "18px 28px",
    borderRadius: 980,
    fontFamily: "inherit",
    fontSize: 17,
    fontWeight: 500,
    letterSpacing: "-0.374px",
    cursor: "pointer",
    width: "100%",
    transition: "opacity 180ms var(--cl-ease)",
  },
  btnDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  trust: {
    marginTop: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 13,
    letterSpacing: "-0.12px",
    color: "rgba(255,255,255,0.6)",
    flexWrap: "wrap",
    textAlign: "center",
  },
  skipBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.82)",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 13,
    letterSpacing: "-0.12px",
    padding: 0,
    textDecoration: "underline",
  },
  done: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  doneIcon: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "rgba(48,209,88,0.14)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  doneH: {
    fontFamily: "var(--cl-font-display)",
    fontSize: 30,
    fontWeight: 600,
    letterSpacing: "-0.3px",
  },
  doneB: {
    maxWidth: 560,
    fontSize: 17,
    lineHeight: 1.6,
    letterSpacing: "-0.224px",
    color: "rgba(255,255,255,0.78)",
  },
};
