"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { useBooking } from "@/components/BookingProvider";

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          fontFamily: "var(--cl-font-display)",
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: "-0.28px",
          color: "#fff",
        }}
      >
        {n}
      </div>
      <div
        style={{
          marginTop: 4,
          fontSize: 13,
          letterSpacing: "-0.224px",
          color: "rgba(255,255,255,0.64)",
        }}
      >
        {l}
      </div>
    </div>
  );
}

export default function HomeHero() {
  const { openBooking } = useBooking();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;

    const ctx = gsap.context(() => {
      const eyebrow = el.querySelector("[data-hero-eyebrow]");
      const lines = headlineRef.current?.querySelectorAll("[data-hero-line]") ?? [];
      const tagline = el.querySelector("[data-hero-tagline]");
      const sub = el.querySelector("[data-hero-sub]");
      const ctas = el.querySelectorAll("[data-hero-cta] > *");
      const stats = el.querySelectorAll("[data-hero-stat]");
      const local = el.querySelector("[data-hero-local]");

      // Set hidden state via JS (not inline) so if this effect never runs,
      // the content stays visible for users and search engines.
      gsap.set(eyebrow, { opacity: 0, y: 12 });
      if (lines.length) gsap.set(lines, { opacity: 0, y: 24, filter: "blur(12px)" });
      gsap.set(tagline, { opacity: 0, y: 14 });
      gsap.set(sub, { opacity: 0, y: 14 });
      gsap.set(ctas, { opacity: 0, y: 14 });
      gsap.set(imgRef.current, { opacity: 0, y: 32, scale: 0.98, filter: "blur(10px)" });
      gsap.set(stats, { opacity: 0, y: 18 });
      gsap.set(local, { opacity: 0, y: 10 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.6 });
      if (lines.length) {
        tl.to(
          lines,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.09 },
          "-=0.25"
        );
      }
      tl.to(tagline, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5");
      tl.to(sub, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
      tl.to(ctas, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.45");
      tl.to(
        imgRef.current,
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.0 },
        "-=0.45"
      );
      tl.to(stats, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, "-=0.5");
      tl.to(local, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={styles.section} className="cl-section-sm cl-pad-sm">
      <div style={styles.inner}>
        <div data-hero-eyebrow style={styles.eyebrowPill}>
          Henderson, Nevada · Licensed medical spa
        </div>

        <h1 ref={headlineRef} style={styles.headline} className="cl-display-sm">
          <span data-hero-line style={{ display: "inline-block" }}>
            Laser Tattoo Removal
          </span>
          <br />
          <span data-hero-line style={{ display: "inline-block" }}>
            in Henderson, NV
          </span>
        </h1>

        <p data-hero-tagline style={styles.tagline}>
          Remove your tattoo safely and cleanly.
        </p>

        <p data-hero-sub style={styles.sub} className="cl-sub-sm">
          Evidence based laser tattoo removal with transparent pricing, realistic timelines, and no
          package upsells.
        </p>

        <div data-hero-cta style={styles.ctaRow}>
          <button
            type="button"
            onClick={openBooking}
            style={styles.primaryPill}
            className="cl-btn-pressable"
          >
            Book a consult — free
          </button>
          <Link href="/results" style={styles.ghostPill} className="cl-btn-pressable">
            See results ›
          </Link>
        </div>

        <div ref={imgRef} style={styles.artWrap}>
          <img
            src="/assets/hero.jpg"
            alt="Before and after laser tattoo removal"
            style={styles.art}
            draggable={false}
          />
        </div>

        <div style={styles.statRow} className="cl-grid-4-to-2">
          <div data-hero-stat>
            <Stat n="2,400+" l="Sessions delivered" />
          </div>
          <div data-hero-stat>
            <Stat n="6–10" l="Sessions for black ink" />
          </div>
          <div data-hero-stat>
            <Stat n="<1%" l="Scarring rate" />
          </div>
          <div data-hero-stat>
            <Stat n="$0" l="Consultation fee" />
          </div>
        </div>

        <p data-hero-local style={styles.localLine}>
          Serving Henderson, Green Valley, Anthem, Seven Hills, and nearby Las Vegas areas.
        </p>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    background: "#000",
    color: "#fff",
    padding: "48px 24px 56px",
    textAlign: "center",
  },
  inner: { maxWidth: 1080, margin: "0 auto" },
  eyebrowPill: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 980,
    border: "1px solid rgba(255,255,255,0.24)",
    fontSize: 12,
    letterSpacing: "-0.12px",
    color: "rgba(255,255,255,0.72)",
    marginBottom: 16,
  },
  headline: {
    margin: 0,
    fontFamily: "var(--cl-font-display)",
    fontSize: 64,
    fontWeight: 600,
    lineHeight: 1.05,
    letterSpacing: "-0.5px",
  },
  tagline: {
    margin: "14px auto 0",
    maxWidth: 620,
    fontFamily: "var(--cl-font-display)",
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.3,
    letterSpacing: "-0.196px",
    color: "rgba(255,255,255,0.94)",
  },
  sub: {
    marginTop: 14,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 620,
    fontFamily: "var(--cl-font-display)",
    fontSize: 19,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.231px",
    color: "rgba(255,255,255,0.76)",
  },
  ctaRow: {
    marginTop: 24,
    display: "flex",
    gap: 14,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryPill: {
    background: "#0071e3",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 980,
    fontFamily: "var(--cl-font-text)",
    fontSize: 17,
    fontWeight: 400,
    cursor: "pointer",
    letterSpacing: "-0.374px",
  },
  ghostPill: {
    background: "transparent",
    color: "#2997ff",
    border: "1px solid #2997ff",
    padding: "12px 24px",
    borderRadius: 980,
    textDecoration: "none",
    fontFamily: "var(--cl-font-text)",
    fontSize: 17,
    letterSpacing: "-0.374px",
  },
  artWrap: { marginTop: 56, display: "flex", justifyContent: "center" },
  art: {
    width: "100%",
    maxWidth: 1000,
    height: "auto",
    display: "block",
    margin: "0 auto",
    borderRadius: 12,
    boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
    userSelect: "none",
  },
  statRow: {
    marginTop: 56,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 40,
    paddingTop: 32,
    borderTop: "1px solid rgba(255,255,255,0.12)",
    justifyItems: "center",
  },
  localLine: {
    margin: "32px auto 0",
    maxWidth: 600,
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: "-0.224px",
    color: "rgba(255,255,255,0.56)",
  },
};

