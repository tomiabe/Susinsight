import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/ai/site-url";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();

  return {
    name: "Susinsight",
    short_name: "Susinsight",
    description: "Advancing Sustainability in Africa",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3A8B72",
    lang: "en",
    categories: ["news", "education", "business"],
    id: siteUrl,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon"
      }
    ]
  };
}
