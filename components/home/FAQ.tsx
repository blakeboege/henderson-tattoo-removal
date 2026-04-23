"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";

type Q = { q: string; a: string };

type FAQProps = {
  items?: Q[];
  eyebrow?: string;
  heading?: string;
  dark?: boolean;
  id?: string;
  initialOpen?: number;
};

const defaultItems: Q[] = [
  {
    q: "Does it hurt?",
    a: "Most clients describe it as a rubber band snap or hot oil spatter. We use a Zimmer cooling device that blows −30°F air across the skin during treatment. Topical numbing cream is available on request.",
  },
  {
    q: "How many sessions will I need?",
    a: "Most black-ink tattoos clear in six to ten sessions. Multi-color tattoos typically take eight to twelve. After your consult, we give you a written estimate with a range.",
  },
  {
    q: "How long between sessions?",
    a: "Six to eight weeks. The ink breaks down between visits; treating sooner doesn't speed it up, it just irritates the skin.",
  },
  {
    q: "Will there be scarring?",
    a: "Very rarely — and almost always tied to aftercare. Follow the aftercare sheet we send you home with and the risk is below 1%.",
  },
  {
    q: "Is the consultation really free?",
    a: "Yes. $0. It takes about 30 minutes. We assess the tattoo, take baseline photos, and give you a session estimate. No pressure to book.",
  },
  {
    q: "Do you do fade-for-coverup?",
    a: "Yes. A typical coverup fade is 3–5 sessions, enough to give your tattoo artist a workable canvas. Bring your coverup design to the consult and we'll plan around it.",
  },
];

export default function FAQ({
  items = defaultItems,
  eyebrow = "FAQ",
  heading = "Questions we hear often.",
  dark = false,
  id = "faq",
  initialOpen = 0,
}: FAQProps) {
  const [open, setOpen] = useState<number>(initialOpen);
  const ref = useReveal<HTMLElement>({ y: 18, stagger: 0.04 });

  const palette = dark ? darkPalette : lightPalette;

  return (
    <section
      id={id}
      ref={ref}
      style={{ ...styles.section, background: palette.bg, color: palette.fg }}
      className="cl-section-sm cl-pad-sm"
    >
      <div style={styles.inner}>
        <div style={{ ...styles.eyebrow, color: palette.accent }} data-reveal>
          {eyebrow}
        </div>
        <h2 style={styles.h} className="cl-h-sm" data-reveal>
          {heading}
        </h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {items.map((item, i) => (
            <FAQRow
              key={item.q}
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
              palette={palette}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQRow({
  item,
  isOpen,
  onToggle,
  palette,
}: {
  item: Q;
  isOpen: boolean;
  onToggle: () => void;
  palette: { bg: string; fg: string; accent: string; border: string; sub: string };
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  return (
    <div data-reveal style={{ borderBottom: `1px solid ${palette.border}` }}>
      <button
        onClick={onToggle}
        style={{
          ...styles.qBtn,
          color: palette.fg,
        }}
        aria-expanded={isOpen}
      >
        <span>{item.q}</span>
        <span
          style={{
            ...styles.plus,
            color: palette.sub,
            transform: isOpen ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>
      <div
        ref={panelRef}
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? 600 : 0,
          opacity: isOpen ? 1 : 0,
          transition: "max-height 420ms var(--cl-ease-out-soft), opacity 280ms var(--cl-ease)",
        }}
      >
        <div
          style={{
            ...styles.a,
            color: palette.sub,
          }}
        >
          {item.a}
        </div>
      </div>
    </div>
  );
}

const lightPalette = {
  bg: "#f5f5f7",
  fg: "#1d1d1f",
  accent: "#0066cc",
  border: "rgba(0,0,0,0.08)",
  sub: "rgba(0,0,0,0.72)",
};
const darkPalette = {
  bg: "#000",
  fg: "#fff",
  accent: "#2997ff",
  border: "rgba(255,255,255,0.12)",
  sub: "rgba(255,255,255,0.72)",
};

const styles: Record<string, CSSProperties> = {
  section: { padding: "112px 24px" },
  inner: { maxWidth: 820, margin: "0 auto" },
  eyebrow: { fontSize: 14, fontWeight: 600, letterSpacing: "-0.224px", marginBottom: 10 },
  h: {
    margin: "0 0 32px",
    fontFamily: 'var(--cl-font-display)',
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 1.07,
    letterSpacing: "-0.3px",
  },
  qBtn: {
    width: "100%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "22px 4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: 'var(--cl-font-display)',
    fontSize: 21,
    fontWeight: 400,
    lineHeight: 1.19,
    letterSpacing: "0.231px",
    textAlign: "left",
  },
  plus: {
    fontSize: 22,
    lineHeight: 1,
    transition: "transform 240ms cubic-bezier(0.4,0,0.2,1)",
  },
  a: {
    padding: "0 4px 24px",
    fontSize: 17,
    lineHeight: 1.47,
    letterSpacing: "-0.374px",
    maxWidth: 640,
  },
};
