import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Allow all crawlers — this includes general search engines (Googlebot,
  // Bingbot, etc.) and AI-related crawlers (GPTBot, ClaudeBot,
  // PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Amazonbot, …).
  // Listing a wildcard is the canonical way to permit all of the above.
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://hendersontattooremoval.com/sitemap.xml",
    host: "https://hendersontattooremoval.com",
  };
}
