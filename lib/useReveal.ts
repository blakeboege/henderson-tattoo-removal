"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RevealOptions = {
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
};

/**
 * Scroll-triggered reveal for elements marked with [data-reveal] inside the
 * returned ref container. The hook hides targets via gsap.set() at mount
 * (before paint), then animates them in on scroll. If the effect never runs
 * for any reason, elements remain at their default visible state — so the
 * page is always readable.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(opts: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const {
    selector = "[data-reveal]",
    y = 28,
    stagger = 0.08,
    duration = 0.9,
    delay = 0,
    start = "top 82%",
    once = true,
  } = opts;

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(selector);
    if (targets.length === 0) return;

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return; // leave content in its visible default state

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y, filter: "blur(6px)" });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration,
        delay,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          once,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [selector, y, stagger, duration, delay, start, once]);

  return ref;
}

/**
 * Image reveal — a slightly longer travel and subtle scale to feel "expensive".
 * Same fail-safe pattern as useReveal.
 */
export function useImageReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-reveal-image]");
    if (targets.length === 0) return;

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 32, scale: 1.02, filter: "blur(10px)" });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
