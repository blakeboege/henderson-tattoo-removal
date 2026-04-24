import { NextResponse } from "next/server";

/**
 * Same-origin lead-capture endpoint.
 *
 * The browser POSTs to /api/lead on your own domain (no CORS, no beacon
 * quirks, no mobile WebKit cancellation). This handler validates the
 * payload and inserts a row into the Supabase `public.leads` table using
 * Supabase's REST (PostgREST) API with the service-role key. The key
 * never leaves the server.
 *
 * Env (set in Vercel):
 *   SUPABASE_URL               e.g. https://xyzcompany.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY  server-only service role JWT
 */

// Must run at request time — no caching, no static optimization.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { email?: unknown; phone?: unknown; source_page?: unknown };

async function readBody(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const parsed = (await req.json()) as Body;
    return {
      email: typeof parsed?.email === "string" ? parsed.email.trim() : "",
      phone: typeof parsed?.phone === "string" ? parsed.phone.trim() : "",
      source_page:
        typeof parsed?.source_page === "string" ? parsed.source_page.trim() : "",
    };
  }
  const form = await req.formData();
  return {
    email: String(form.get("email") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    source_page: String(form.get("source_page") ?? "").trim(),
  };
}

function looksLikeEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

export async function POST(req: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[api/lead] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return NextResponse.json(
      { ok: false, error: "Server is not configured for lead capture." },
      { status: 500 }
    );
  }

  let email = "";
  let phone = "";
  let sourcePage = "";

  try {
    const parsed = await readBody(req);
    email = parsed.email;
    phone = parsed.phone;
    sourcePage = parsed.source_page;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!email || !looksLikeEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required" },
      { status: 400 }
    );
  }

  // source_page: prefer body → Referer header → "/"
  if (!sourcePage) {
    const referer = req.headers.get("referer") || "";
    if (referer) {
      try {
        const url = new URL(referer);
        sourcePage = url.pathname + url.search;
      } catch {
        /* ignore bad referer */
      }
    }
  }
  if (!sourcePage) sourcePage = "/";

  const userAgent = req.headers.get("user-agent") || "";

  const row = {
    email,
    phone: phone || null,
    source_page: sourcePage,
    user_agent: userAgent,
    status: "new" as const,
  };

  try {
    const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/leads`;
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        // We don't need the inserted row back — save a round trip.
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      console.error(
        "[api/lead] Supabase insert failed",
        upstream.status,
        detail.slice(0, 500)
      );
      return NextResponse.json(
        {
          ok: false,
          error: `Lead store responded ${upstream.status}`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upstream network error";
    console.error("[api/lead] Upstream error", message);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}

/**
 * Any non-POST method returns a proper JSON 405 through NextResponse.json,
 * so the browser always sees `Content-Type: application/json` and renders
 * the response inline instead of triggering a mobile-Chrome download.
 */
function methodNotAllowed() {
  return NextResponse.json(
    {
      ok: false,
      error: "Method not allowed. POST JSON { email, phone } to this endpoint.",
    },
    {
      status: 405,
      headers: {
        Allow: "POST",
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function GET() {
  return methodNotAllowed();
}
export async function HEAD() {
  return methodNotAllowed();
}
export async function PUT() {
  return methodNotAllowed();
}
export async function PATCH() {
  return methodNotAllowed();
}
export async function DELETE() {
  return methodNotAllowed();
}
