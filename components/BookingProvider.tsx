"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import BookingModal from "./BookingModal";
import EmailCapturePopup from "./EmailCapturePopup";

type BookingCtx = {
  open: boolean;
  openBooking: () => void;
  closeBooking: () => void;
};

const Ctx = createContext<BookingCtx | null>(null);

export function useBooking() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useBooking must be used inside BookingProvider");
  return v;
}

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openBooking = useCallback(() => setOpen(true), []);
  const closeBooking = useCallback(() => setOpen(false), []);

  // Support the legacy "#book" sigil from in-content CTAs (mirrors original design file).
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const a = target.closest("a");
      if (a && a.getAttribute("href") === "#book") {
        e.preventDefault();
        openBooking();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [openBooking]);

  // Lock body scroll when modal is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const value = useMemo(() => ({ open, openBooking, closeBooking }), [open, openBooking, closeBooking]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <BookingModal open={open} onClose={closeBooking} />
      <EmailCapturePopup />
    </Ctx.Provider>
  );
}
