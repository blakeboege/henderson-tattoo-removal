/**
 * Submit a lead to our same-origin /api/lead route.
 *
 * The server then forwards it to the Google Apps Script endpoint. This
 * avoids the whole category of cross-origin / mobile-WebKit problems
 * that come with browsers talking directly to script.google.com:
 *
 *   - no CORS preflight
 *   - no opaque-response / no-cors tricks
 *   - no navigator.sendBeacon quirks on iOS (WebKit often drops beacons
 *     when the page doesn't actually unload)
 *   - no mid-flight request cancellation when the React tree re-renders
 *
 * Returns `true` only if the server confirmed the upstream write.
 */
export async function postLead(email: string, phone: string): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone }),
      // Same origin by default for a relative URL; state this explicitly.
      credentials: "same-origin",
      cache: "no-store",
    });

    if (!res.ok) return false;
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return data?.ok === true;
  } catch {
    return false;
  }
}
