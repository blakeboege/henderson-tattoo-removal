const LEAD_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzQaMtYtjkPv-xs-XQze-DkPuy4CveJmJBp3kS1jsxQ0s8kSxNbJXaZvDG0cjZOZsDFkw/exec";

/**
 * Lead submission to the Google Apps Script endpoint.
 *
 * Primary path: `navigator.sendBeacon` with FormData. This queues a
 * fire-and-forget request at the browser level, bypasses CORS entirely
 * (the page never sees the response), and is the most reliable way to
 * POST to Apps Script web apps. Apps Script reads the fields via
 * `e.parameter.email` and `e.parameter.phone`.
 *
 * Fallback: a hidden <form> submitted into an off-screen iframe, for
 * any browser without sendBeacon support.
 */
export async function postLead(email: string, phone: string): Promise<void> {
  if (typeof window === "undefined") return;

  const data = new FormData();
  data.append("email", email);
  data.append("phone", phone);

  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const ok = navigator.sendBeacon(LEAD_ENDPOINT, data);
      if (ok) return;
    }
    submitViaHiddenForm(email, phone);
  } catch {
    // Swallow — UX should not depend on the network result.
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

  const addField = (name: string, value: string) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };
  addField("email", email);
  addField("phone", phone);

  document.body.appendChild(form);
  form.submit();
  window.setTimeout(() => form.remove(), 2000);
}
