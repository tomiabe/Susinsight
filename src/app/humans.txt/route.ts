import { getSiteUrl } from "@/ai/site-url";

export function GET() {
  const siteUrl = getSiteUrl();
  const lines = [
    "/* TEAM */",
    "Project: Susinsight Headless Frontend",
    "Website: Susinsight",
    "",
    "/* SITE */",
    `URL: ${siteUrl}`,
    "Standards: HTML5, CSS3, TypeScript, Next.js, WPGraphQL",
    "Type: Headless WordPress + Next.js"
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
