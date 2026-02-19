import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/ai/live-data";

function resolveSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://susinsight.vercel.app";
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = resolveSiteUrl();
  const wpEntries = await getSitemapEntries();

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7
    }
  ];

  const dynamicEntries: MetadataRoute.Sitemap = wpEntries.map((entry) => ({
    url: `${siteUrl}${entry.url}`,
    lastModified: entry.lastModified ? new Date(entry.lastModified) : undefined,
    changeFrequency: "weekly",
    priority: entry.url.startsWith("/stories/") ? 0.9 : 0.7
  }));

  const dedup = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const item of [...baseEntries, ...dynamicEntries]) {
    dedup.set(item.url, item);
  }

  return [...dedup.values()];
}
