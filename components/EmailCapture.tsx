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

export default function EmailCapture() {
  const [step, setStep] = useState<"email" | "phone" | "done">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Snapshot of the values at submit time, so the success message can keep
  // showing them after the input state is cleared.
  const [sentEmail, setSentEmail] = useState("");
  const [sentPhone, setSentPhone] = useState("");
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const ref = useReveal<HTMLElement>({ y: 24, stagger: 0.07 });

  const finalize = (emailValue: string, phoneValue: string) => {
    postLead(emailValue, phoneValue);
    setSentEmail(emailValue);
    setSentPhone(phoneValue);
    setEmail("");
    setPhone("");
    setStep("done");
  };

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep("phone");
    setTimeout(() => phoneRef.current?.focus(), 80);
  };
  const submitPhone = (e: React.FormEvent) => {
    e.preventDefault();
    finalize(email, phone);
  };
  const skipPhone = () => {
    finalize(email, "");
  };

  return (
    <section ref={ref} style={styles.section} aria-labelledby="ec-headline" className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div style={styles.eyebrow} data-reveal>
          Free estimate
        </div>
        <h2 id="ec-headline" style={styles.h} className="cl-display-sm" data-reveal>
          Want to know what your tattoo will take to remove?
        </h2>
        <p style={styles.sub} data-reveal>
          We&apos;ll send realistic pricing and session timelines based on your tattoo. Serving Henderson
          and Las Vegas.
        </p>

        {step === "email" && (
          <form onSubmit={submitEmail} style={styles.form} noValidate data-reveal>
            <div style={styles.stepDots}>
              <Dot active /> <DotSep /> <Dot />
              <span style={styles.stepLabel}>Step 1 of 2 · Email</span>
            </div>
            <div style={styles.row}>
              <label htmlFor="ec-email" style={styles.srOnly}>
                Email address
              </label>
              <input
                id="ec-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={styles.input}
                autoComplete="email"
              />
              <button type="submit" style={styles.btn} className="cl-btn-pressable">
                Get my estimate →
              </button>
            </div>
            <div style={styles.trust}>
              <LockIcon />
              <span>We respect your privacy. No spam.</span>
            </div>
          </form>
        )}

        {step === "phone" && (
          <form onSubmit={submitPhone} style={styles.form} noValidate data-reveal>
            <div style={styles.stepDots}>
              <Dot done /> <DotSep active /> <Dot active />
              <span style={styles.stepLabel}>Step 2 of 2 · Phone (optional)</span>
            </div>
            <div style={styles.stepCopy}>
              Saved <strong style={{ color: "#fff" }}>{email}</strong>. Add a phone number and we&apos;ll
              text your estimate as well — much faster than waiting on email.
            </div>
            <div style={styles.row}>
              <label htmlFor="ec-phone" style={styles.srOnly}>
                Phone number
              </label>
              <input
                ref={phoneRef}
                id="ec-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(702) 555-0123"
                style={styles.input}
                autoComplete="tel"
              />
              <button type="submit" style={styles.btn} className="cl-btn-pressable">
                {phone ? "Send my estimate →" : "Finish →"}
              </button>
            </div>
            <div style={styles.trust}>
              <button type="button" onClick={skipPhone} style={styles.skipBtn}>
                Skip — email only
              </button>
              <span style={{ opacity: 0.4 }}>·</span>
              <LockIcon />
              <span>We respect your privacy. No spam.</span>
            </div>
          </form>
        )}

        {step === "done" && (
          <div style={styles.done} data-reveal>
            <div style={styles.doneIcon}>
              <svg
                width="28"
                height="28"
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
              We&apos;ll send pricing and session timelines to{" "}
              <strong style={{ color: "#fff" }}>{sentEmail}</strong>
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
    padding: "120px 24px",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
  },
  inner: { maxWidth: 760, margin: "0 auto", position: "relative" },
  eyebrow: {
    fontSize: 14,
    fontWeight: 600,
    color: "#2997ff",
    letterSpacing: "-0.224px",
    marginBottom: 16,
  },
  h: {
    margin: 0,
    fontFamily: 'var(--cl-font-display)',
    fontSize: 52,
    fontWeight: 600,
    lineHeight: 1.07,
    letterSpacing: "-0.4px",
    textWrap: "balance",
  },
  sub: {
    margin: "20px auto 0",
    maxWidth: 560,
    fontSize: 19,
    lineHeight: 1.47,
    letterSpacing: "-0.374px",
    color: "rgba(255,255,255,0.72)",
  },
  form: { marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 },
  stepDots: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    letterSpacing: "-0.12px",
    color: "rgba(255,255,255,0.56)",
  },
  stepLabel: { marginLeft: 8 },
  stepCopy: {
    fontSize: 15,
    lineHeight: 1.5,
    letterSpacing: "-0.224px",
    color: "rgba(255,255,255,0.72)",
    maxWidth: 520,
    margin: "4px auto 0",
  },
  row: {
    display: "flex",
    gap: 10,
    width: "100%",
    maxWidth: 520,
    margin: "8px auto 0",
    flexWrap: "wrap",
  },
  input: {
    flex: "1 1 260px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 980,
    padding: "14px 20px",
    fontSize: 16,
    letterSpacing: "-0.374px",
    color: "#fff",
    fontFamily: "inherit",
    outline: "none",
    minWidth: 0,
  },
  btn: {
    background: "#0071e3",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: 980,
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "-0.374px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  trust: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 12,
    letterSpacing: "-0.12px",
    color: "rgba(255,255,255,0.48)",
    flexWrap: "wrap",
  },
  skipBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.72)",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 12,
    letterSpacing: "-0.12px",
    padding: 0,
    textDecoration: "underline",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    border: 0,
  },
  done: { marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 },
  doneIcon: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "rgba(48,209,88,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  doneH: {
    fontFamily: 'var(--cl-font-display)',
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: "-0.3px",
  },
  doneB: {
    maxWidth: 520,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: "-0.224px",
    color: "rgba(255,255,255,0.72)",
  },
};
