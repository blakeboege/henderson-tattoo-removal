/**
 * Blog post manifest. Shared between the /blog index grid and the
 * dynamic /blog/[slug] placeholder pages so both stay in lock-step.
 * Add a post: append an entry here.
 */
export const blogPosts = [
  {
    slug: "tattoo-removal-cost-las-vegas-henderson",
    title: "How Much Does Tattoo Removal Cost in Las Vegas and Henderson?",
    excerpt:
      "Pricing depends on tattoo size, ink color, treatment goals, and the number of sessions needed. See what affects tattoo removal cost before you book.",
  },
  {
    slug: "tattoo-removal-before-and-after-results",
    title: "Tattoo Removal Before and After: What Results Should You Expect?",
    excerpt:
      "Before and after results vary by ink color, tattoo age, location, and your body's healing response. Learn what realistic fading looks like over time.",
  },
  {
    slug: "best-tattoo-removal-las-vegas-henderson",
    title: "How to Choose the Best Tattoo Removal Clinic in Las Vegas or Henderson",
    excerpt:
      "Compare lasers, pricing, consultation process, aftercare, reviews, and before and after results before choosing a clinic.",
  },
] as const;

export type BlogPost = (typeof blogPosts)[number];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
