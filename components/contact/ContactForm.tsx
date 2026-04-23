"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";
import { useReveal } from "@/lib/useReveal";

function Field({
  label,
  val,
  on,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  val: string;
  on: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input
        style={styles.input}
        value={val}
        onChange={on}
        placeholder={placeholder}
        type={type}
        required={required}
      />
    </div>
  );
}

function SideBlock({ icon, h, lines }: { icon: IconName; h: string; lines: ReactNode[] }) {
  return (
    <div style={styles.sideBlock} className="cl-hover-lift" data-reveal>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Icon name={icon} size={18} color="#0071e3" />
        <span style={styles.sideH}>{h}</span>
      </div>
      <div style={styles.sideLines}>
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "Book a consult",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const upd =
    <K extends keyof typeof form>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const ref = useReveal<HTMLElement>({ y: 20, stagger: 0.05, duration: 0.8 });

  return (
    <section ref={ref} style={styles.section} className="cl-pad-sm">
      <div style={styles.inner} className="cl-grid-2-to-1">
        <div style={styles.formCol} data-reveal>
          {!sent ? (
            <form onSubmit={submit} style={styles.form}>
              <div style={styles.eyebrow}>Send us a message</div>
              <div style={styles.fieldGrid} className="cl-grid-2-to-1-sm">
                <Field
                  label="Full name"
                  val={form.name}
                  on={upd("name")}
                  placeholder="Alex Martinez"
                  required
                />
                <Field
                  label="Email"
                  val={form.email}
                  on={upd("email")}
                  placeholder="you@example.com"
                  type="email"
                  required
                />
                <Field
                  label="Phone (optional)"
                  val={form.phone}
                  on={upd("phone")}
                  placeholder="(702) 555-0193"
                  type="tel"
                />
                <div style={styles.field}>
                  <label style={styles.label}>What&apos;s this about?</label>
                  <select style={styles.input} value={form.topic} onChange={upd("topic")}>
                    <option>Book a consult</option>
                    <option>Pricing question</option>
                    <option>Fade for coverup</option>
                    <option>Scar-conscious assessment</option>
                    <option>Something else</option>
                  </select>
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Message</label>
                <textarea
                  style={{ ...styles.input, minHeight: 120, resize: "vertical", padding: "12px" }}
                  placeholder="Tell us about the tattoo — size, location, age, ink colors — and any timing you have in mind."
                  value={form.message}
                  onChange={upd("message")}
                />
              </div>
              <div style={styles.footer}>
                <div style={styles.disclaimer}>
                  We reply within one business day. No marketing emails — we don&apos;t do those.
                </div>
                <button type="submit" style={styles.submit} className="cl-btn-pressable">
                  Send message
                </button>
              </div>
            </form>
          ) : (
            <div style={styles.sent}>
              <div style={styles.sentIcon}>
                <Icon name="check" size={28} color="#0071e3" />
              </div>
              <div style={styles.sentH}>Message sent.</div>
              <div style={styles.sentB}>
                We&apos;ll reply to {form.email || "your email"} within one business day. If it&apos;s
                urgent, call us at{" "}
                <a href="tel:+17026597135" style={{ color: "#0066cc", textDecoration: "none" }}>
                  (702) 659-7135
                </a>
                .
              </div>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", phone: "", topic: "Book a consult", message: "" });
                }}
                style={styles.ghost}
                className="cl-btn-pressable"
              >
                Send another
              </button>
            </div>
          )}
        </div>
        <aside style={styles.sideCol}>
          <SideBlock
            icon="map-pin"
            h="Service area"
            lines={[
              "Serving Henderson, Las Vegas,",
              "Summerlin, and surrounding areas.",
              "By appointment only.",
            ]}
          />
          <SideBlock
            icon="phone"
            h="Call"
            lines={[
              <a
                key="c"
                href="tel:+17026597135"
                style={{ color: "#0066cc", textDecoration: "none" }}
              >
                (702) 659-7135
              </a>,
              "Tue–Sat · 9:00–18:00",
            ]}
          />
          <SideBlock
            icon="mail"
            h="Email"
            lines={[
              <a
                key="e"
                href="mailto:estimates@hendersontattooremoval.com"
                style={{ color: "#0066cc", textDecoration: "none", wordBreak: "break-all" }}
              >
                estimates@hendersontattooremoval.com
              </a>,
            ]}
          />
          <SideBlock
            icon="clock"
            h="Hours"
            lines={["Mon · Closed", "Tue–Fri · 9:00–18:00", "Sat · 10:00–16:00", "Sun · Closed"]}
          />
        </aside>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: { background: "#f5f5f7", color: "#1d1d1f", padding: "64px 24px 96px" },
  inner: { maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 },
  formCol: { background: "#fff", borderRadius: 12, padding: 40 },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  eyebrow: { fontSize: 14, fontWeight: 600, color: "#0066cc", letterSpacing: "-0.224px" },
  fieldGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, fontWeight: 600, letterSpacing: "-0.12px", color: "#1d1d1f" },
  input: {
    background: "#fafafc",
    border: "3px solid rgba(0,0,0,0.04)",
    borderRadius: 11,
    padding: "10px 12px",
    fontSize: 15,
    letterSpacing: "-0.374px",
    color: "#1d1d1f",
    fontFamily: "inherit",
    outline: "none",
  },
  footer: {
    marginTop: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  disclaimer: {
    fontSize: 13,
    color: "rgba(0,0,0,0.56)",
    letterSpacing: "-0.224px",
    maxWidth: 320,
  },
  submit: {
    background: "#0071e3",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 980,
    fontFamily: "inherit",
    fontSize: 15,
    cursor: "pointer",
    letterSpacing: "-0.374px",
  },
  sent: { padding: "32px 8px", textAlign: "center" },
  sentIcon: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "rgba(0,113,227,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },
  sentH: {
    marginTop: 20,
    fontFamily: 'var(--cl-font-display)',
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: "-0.196px",
  },
  sentB: {
    marginTop: 10,
    fontSize: 16,
    color: "rgba(0,0,0,0.72)",
    letterSpacing: "-0.224px",
    maxWidth: 380,
    margin: "10px auto 0",
  },
  ghost: {
    marginTop: 24,
    background: "transparent",
    color: "#0066cc",
    border: "1px solid #0066cc",
    padding: "10px 22px",
    borderRadius: 980,
    fontFamily: "inherit",
    fontSize: 14,
    cursor: "pointer",
    letterSpacing: "-0.374px",
  },
  sideCol: { display: "flex", flexDirection: "column", gap: 2 },
  sideBlock: { background: "#fff", borderRadius: 12, padding: 24, marginBottom: 10 },
  sideH: {
    fontFamily: 'var(--cl-font-display)',
    fontSize: 17,
    fontWeight: 600,
    letterSpacing: "0.231px",
  },
  sideLines: { fontSize: 14, lineHeight: 1.6, color: "rgba(0,0,0,0.72)", letterSpacing: "-0.224px" },
};
