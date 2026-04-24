const LEAD_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzQaMtYtjkPv-xs-XQze-DkPuy4CveJmJBp3kS1jsxQ0s8kSxNbJXaZvDG0cjZOZsDFkw/exec";

/**
 * Submit a lead to the Google Apps Script endpoint.
 *
 * Strategy (top-to-bottom, stop on first success):
 *
 *   1. fetch POST with `application/x-www-form-urlencoded` body,
 *      `keepalive: true`, `mode: "no-cors"`.
 *      – Works reliably on iPhone Chrome / iPhone Safari / Android Chrome
 *        / desktop Chrome.
 *      – URL-encoded is a CORS "simple request" → no preflight.
 *      – `keepalive: true` guarantees the request completes even if the
 *        page is immediately re-rendered or the user navigates away.
 *      – `mode: "no-cors"` keeps the opaque CORS response from throwing;
 *        Apps Script still receives the POST and writes the row.
 *
 *   2. `navigator.sendBeacon` with a url-encoded Blob (historical fallback).
 *      iOS WebKit can silently drop sendBeacon when the page doesn't
 *      actually unload, which is why it must not be the primary path.
 *
 *   3. Hidden `<form>` submitted into an invisible iframe (universal
 *      fallback that works even on very old browsers).
 *
 * Returns `true` as soon as any path accepts the request.
 */
export async function postLead(email: string, phone: string): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const body = new URLSearchParams();
  body.append("email", email);
  body.append("phone", phone);

  // --- 1. Primary: fetch with keepalive -----------------------------------
  try {
    // We deliberately do NOT await the response body — only the headers.
    // With `mode: "no-cors"` the response is opaque but the request is
    // committed to the network stack as soon as fetch() is called, and
    // `keepalive: true` guarantees it completes regardless of re-renders.
    const res = fetch(LEAD_ENDPOINT, {
      method: "POST",
      body,
      mode: "no-cors",
      keepalive: true,
      // Explicit Content-Type isn't needed (URLSearchParams sets it), but
      // being explicit is harmless and makes the network inspector clearer.
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    });
    // Give fetch a microtask tick to hand off to the network stack, then
    // resolve. We don't await the full response because on slow mobile
    // networks that can stall the UI for several seconds — the request
    // is already in-flight with keepalive protecting it.
    void res.catch(() => {});
    return true;
  } catch {
    // Fell through — try beacon.
  }

  // --- 2. Secondary: sendBeacon -------------------------------------------
  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body.toString()], {
        type: "application/x-www-form-urlencoded;charset=UTF-8",
      });
      if (navigator.sendBeacon(LEAD_ENDPOINT, blob)) return true;
    }
  } catch {
    // Fell through — try hidden-form.
  }

  // --- 3. Tertiary: hidden form into hidden iframe ------------------------
  try {
    submitViaHiddenForm(email, phone);
    return true;
  } catch {
    return false;
  }
}

function submitViaHiddenForm(email: string, phone: string) {
  if (typeof document === "undefined") return;

  const frameName = "htr-lead-sink";
  let frame = document.querySelector<HTMLIFrameElement>(`iframe[name="${frameName}"]`);
  if (!frame) {
    frame = document.createElement("iframe");
    frame.name = frameName;
    frame.style.display = "none";
    document.body.appendChild(frame);
  }

  const form = document.createElement("form");
  form.method = "POST";
  form.action = LEAD_ENDPOINT;
  form.target = frameName;
  form.enctype = "application/x-www-form-urlencoded";
  form.style.display = "none";

  const add = (name: string, value: string) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };
  add("email", email);
  add("phone", phone);

  document.body.appendChild(form);
  form.submit();
  window.setTimeout(() => form.remove(), 2000);
}
