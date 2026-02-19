import { getRssFeedItems } from "@/ai/live-data";

function resolveSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://susinsight.vercel.app";
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc2822(date?: string): string | null {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toUTCString();
}

export async function GET() {
  const siteUrl = resolveSiteUrl();
  const items = await getRssFeedItems(60);
  const buildDate = new Date().toUTCString();

  const xmlItems = items
    .map((item) => {
      const link = `${siteUrl}/stories/${item.slug}`;
      const pubDate = toRfc2822(item.date);
      const categoryXml = item.categories
        .map((category) => `<category>${escapeXml(category)}</category>`)
        .join("");
      const creator = item.author ? `<dc:creator><![CDATA[${item.author}]]></dc:creator>` : "";
      const description = item.excerpt || "Read the full story on Susinsight.";
      const content = item.content || item.excerpt || "";

      return [
        "<item>",
        `<title>${escapeXml(item.title)}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid isPermaLink="true">${escapeXml(link)}</guid>`,
        pubDate ? `<pubDate>${pubDate}</pubDate>` : "",
        creator,
        `<description><![CDATA[${description}]]></description>`,
        `<content:encoded><![CDATA[${content}]]></content:encoded>`,
        categoryXml,
        "</item>"
      ].join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Susinsight</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>Advancing Sustainability in Africa</description>
    <language>en-US</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${escapeXml(`${siteUrl}/feed.xml`)}" rel="self" type="application/rss+xml" />
    ${xmlItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "s-maxage=600, stale-while-revalidate=3600"
    }
  });
}
