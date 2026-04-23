"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Logomark from "./Logomark";
import { useBooking } from "./BookingProvider";

const items = [
  { label: "Services", href: "/services" },
  { label: "Before & after", href: "/results" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mount animation: nav fades down into place.
  useEffect(() => {
    if (!barRef.current) return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.05 }
      );
    }, barRef);
    return () => ctx.revert();
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      ref={barRef}
      className="cl-nav-bar"
      data-scrolled={scrolled}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        height: 48,
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 22px",
          color: "#fff",
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#fff",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "-0.224px",
            whiteSpace: "nowrap",
          }}
        >
          <Logomark />
          <span>Henderson Tattoo Removal</span>
        </Link>

        <div
          className="cl-nav-links-sm"
          style={{ display: "flex", gap: 28, flex: 1, justifyContent: "center" }}
        >
          {items.map((i) => {
            const active = isActive(i.href);
            return (
              <Link
                key={i.href}
                href={i.href}
                className="cl-nav-link"
                data-active={active}
                style={{
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: "-0.12px",
                  color: active ? "#fff" : "rgba(255,255,255,0.72)",
                  transition: "color 180ms var(--cl-ease)",
                }}
              >
                {i.label}
              </Link>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
            className="cl-nav-menu-btn"
            style={{
              display: "none",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.24)",
              color: "#fff",
              width: 36,
              height: 28,
              borderRadius: 980,
              cursor: "pointer",
              padding: 0,
              fontSize: 13,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ≡
          </button>
          <button
            type="button"
            onClick={openBooking}
            className="cl-btn-pressable"
            style={{
              color: "#fff",
              textDecoration: "none",
              border: "none",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "-0.12px",
              background: "#0071e3",
              borderRadius: 980,
              padding: "6px 14px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Book a consult
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(0,0,0,0.94)",
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "14px 22px 18px",
          }}
        >
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                color: "#fff",
                textDecoration: "none",
                fontSize: 15,
                padding: "10px 0",
                letterSpacing: "-0.224px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {i.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
