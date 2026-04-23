"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MapBlock() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    const svg = svgRef.current;
    if (!el || !svg) return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;

    const ctx = gsap.context(() => {
      // Whole wrapper fades up
      gsap.fromTo(
        el,
        { opacity: 0, y: 24, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );

      // Coverage circles pop in
      const circles = svg.querySelectorAll("[data-map-circle]");
      gsap.fromTo(
        circles,
        { opacity: 0, scale: 0.6, transformOrigin: "center center" },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: "#f5f5f7", padding: "0 24px 112px" }} className="cl-pad-sm">
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          ref={wrapRef}
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            aspectRatio: "21/8",
            background: "#e8e8ea",
            boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
          }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 1080 412"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="1080" height="412" fill="#eceff3" />
            <g stroke="#dcdfe4" strokeWidth="1">
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={"h" + i} x1="0" y1={34 * i + 10} x2="1080" y2={34 * i + 10} />
              ))}
              {Array.from({ length: 26 }).map((_, i) => (
                <line key={"v" + i} x1={44 * i + 10} y1="0" x2={44 * i + 10} y2="412" />
              ))}
            </g>
            <g stroke="#cfd3d9" strokeWidth="4" fill="none">
              <path d="M 0 180 Q 400 150 700 200 T 1080 210" />
              <path d="M 300 0 Q 340 180 420 412" />
              <path d="M 760 0 Q 720 200 820 412" />
            </g>
            <rect x="80" y="40" width="140" height="90" rx="4" fill="#dce6d6" />
            <rect x="880" y="260" width="150" height="110" rx="4" fill="#dce6d6" />
            <path d="M 900 20 Q 1020 60 1080 40 L 1080 0 L 900 0 Z" fill="#d6e2ec" />

            <g data-map-circle>
              <circle
                cx="380"
                cy="160"
                r="92"
                fill="rgba(0,113,227,0.12)"
                stroke="rgba(0,113,227,0.55)"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
              <circle cx="380" cy="160" r="5" fill="#0071e3" />
              <text
                x="380"
                y="142"
                textAnchor="middle"
                fontFamily='-apple-system, "SF Pro Text", Inter, sans-serif'
                fontSize="13"
                fontWeight="600"
                fill="#1d1d1f"
                letterSpacing="-0.224"
              >
                Las Vegas
              </text>
            </g>

            <g data-map-circle>
              <circle
                cx="205"
                cy="230"
                r="72"
                fill="rgba(0,113,227,0.12)"
                stroke="rgba(0,113,227,0.55)"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
              <circle cx="205" cy="230" r="5" fill="#0071e3" />
              <text
                x="205"
                y="212"
                textAnchor="middle"
                fontFamily='-apple-system, "SF Pro Text", Inter, sans-serif'
                fontSize="13"
                fontWeight="600"
                fill="#1d1d1f"
                letterSpacing="-0.224"
              >
                Summerlin
              </text>
            </g>

            <g data-map-circle>
              <circle
                cx="680"
                cy="260"
                r="108"
                fill="rgba(0,113,227,0.18)"
                stroke="rgba(0,113,227,0.7)"
                strokeWidth="2.5"
              />
              <circle cx="680" cy="260" r="6" fill="#0071e3" />
              <text
                x="680"
                y="238"
                textAnchor="middle"
                fontFamily='-apple-system, "SF Pro Text", Inter, sans-serif'
                fontSize="14"
                fontWeight="700"
                fill="#1d1d1f"
                letterSpacing="-0.224"
              >
                Henderson
              </text>
            </g>

            <text
              x="540"
              y="385"
              textAnchor="middle"
              fontFamily='-apple-system, "SF Pro Text", Inter, sans-serif'
              fontSize="12"
              fill="rgba(0,0,0,0.56)"
              letterSpacing="-0.12"
            >
              Serving Henderson, Las Vegas, Summerlin, and surrounding areas
            </text>
          </svg>
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "#fff",
              color: "#1d1d1f",
              padding: "8px 14px",
              borderRadius: 980,
              fontSize: 13,
              letterSpacing: "-0.224px",
              boxShadow: "rgba(0,0,0,0.12) 0 2px 8px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#30d158",
                display: "inline-block",
              }}
            />
            By appointment · (702) 659-7135
          </div>
        </div>
      </div>
    </section>
  );
}
