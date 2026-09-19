import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

/**
 * Every AI crawler is explicitly allowed. Two kinds matter:
 *   - training/index crawlers (GPTBot, ClaudeBot, Google-Extended, ...)
 *   - live "search" fetchers that produce citations in answers
 *     (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User,
 *      Perplexity-User, DuckAssistBot, Bingbot which feeds Copilot and
 *      ChatGPT search).
 * Listing them by name is belt-and-braces; the wildcard already allows all.
 */
const aiUserAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "DuckAssistBot",
  "YouBot",
  "cohere-ai",
  "MistralAI-User",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...aiUserAgents.map((userAgent) => ({ userAgent, allow: "/" })),
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
