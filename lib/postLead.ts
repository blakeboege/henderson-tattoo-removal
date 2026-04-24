/**
 * Submit a lead to our same-origin /api/lead route.
 *
 * The server then inserts the row into Supabase's `public.leads` table.
 * Same-origin + normal fetch avoids every cross-origin / mobile-WebKit
 * issue (no CORS preflight, no beacon quirks, no mid-flight cancellation).
 *
 * Returns `true` only if the server confirmed the Supabase insert.
 */
export async function postLead(email: string, phone: string): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        phone,
        // Which page did the lead come from? The server will fall back to
        // the Referer header and then "/" if we don't send this, but the
        // path we render is more reliable than Referer (Safari sometimes
        // strips it).
        source_page: window.location.pathname + window.location.search,
      }),
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
