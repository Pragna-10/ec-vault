import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://ecvault.in";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/curriculum", "/iit-mapping", "/search", "/pricing", "/subjects/", "/about", "/contact"],
        disallow: ["/admin", "/api/", "/dashboard", "/checkout"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

