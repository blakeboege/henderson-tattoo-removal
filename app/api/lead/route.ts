import { NextResponse } from "next/server";

/**
 * Same-origin lead-capture endpoint.
 *
 * The browser POSTs to /api/lead on your own domain (no CORS, no beacon
 * quirks, no mobile WebKit cancellation). This handler then forwards
 * the lead server-side to the Google Apps Script web-app URL and
 * responds to the browser with a plain JSON result.
 *
 * Server-side forwarding uses `application/x-www-form-urlencoded`, which
 * Apps Script reads via `e.parameter.email` / `e.parameter.phone`.
 */

const LEAD_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzQaMtYtjkPv-xs-XQze-DkPuy4CveJmJBp3kS1jsxQ0s8kSxNbJXaZvDG0cjZOZsDFkw/exec";

// This route must run at request time and never be cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { email?: unknown; phone?: unknown };

async function readBody(req: Request): Promise<{ email: string; phone: string }> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const parsed = (await req.json()) as Body;
    return {
      email: typeof parsed?.email === "string" ? parsed.email.trim() : "",
      phone: typeof parsed?.phone === "string" ? parsed.phone.trim() : "",
    };
  }

  // application/x-www-form-urlencoded or multipart/form-data.
  const form = await req.formData();
  return {
    email: String(form.get("email") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
  };
}

// Very loose email sanity check — we don't want to reject valid addresses
// over a regex, just catch obvious garbage before we forward.
function looksLikeEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

export async function POST(req: Request) {
  let email = "";
  let phone = "";

  try {
    const parsed = await readBody(req);
    email = parsed.email;
    phone = parsed.phone;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!email || !looksLikeEmail(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
  }

  const upstreamBody = new URLSearchParams();
  upstreamBody.set("email", email);
  upstreamBody.set("phone", phone);

  try {
    const upstream = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json,text/plain,*/*",
      },
      body: upstreamBody,
      // Apps Script redirects through googleusercontent.com — follow it.
      redirect: "follow",
      // Guard against hangs.
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: `Upstream responded ${upstream.status}` },
        { status: 502 }
      );
    }

    // We don't care about the upstream response body — Apps Script has
    // already written the row by the time it responds 2xx.
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upstream network error";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
