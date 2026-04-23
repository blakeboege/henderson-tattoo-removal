import Link from "next/link";

const cols: { h: string; items: [string, string][] }[] = [
  {
    h: "Treatment",
    items: [
      ["Laser tattoo removal", "/services"],
      ["Pricing", "/#pricing"],
      ["Before & after", "/results"],
      ["Aftercare", "/services"],
    ],
  },
  {
    h: "Service area",
    items: [
      ["Henderson, NV", "/contact"],
      ["Las Vegas", "/contact"],
      ["Summerlin", "/contact"],
      ["Hours", "/contact"],
    ],
  },
  {
    h: "Company",
    items: [
      ["About", "/about"],
      ["The team", "/about"],
      ["Press", "/about"],
    ],
  },
  {
    h: "Support",
    items: [
      ["Contact", "/contact"],
      ["FAQ", "/#faq"],
      ["Accessibility", "/contact"],
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#000", color: "#fff", padding: "56px 24px 32px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          className="cl-grid-4-to-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            paddingBottom: 40,
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {cols.map((c) => (
            <div key={c.h}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "-0.12px",
                  color: "#fff",
                  marginBottom: 12,
                }}
              >
                {c.h}
              </div>
              {c.items.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    padding: "4px 0",
                    letterSpacing: "-0.12px",
                    transition: "color 180ms var(--cl-ease)",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div
          className="cl-stack-sm"
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 12,
            color: "rgba(255,255,255,0.48)",
            letterSpacing: "-0.12px",
          }}
        >
          <div>
            © 2026 Henderson Tattoo Removal · Serving Henderson, Las Vegas, Summerlin, and surrounding
            areas · (702) 659-7135
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            <Link href="/contact" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
              Privacy
            </Link>
            <Link href="/contact" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
              Terms
            </Link>
            <Link href="/contact" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
              HIPAA notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
