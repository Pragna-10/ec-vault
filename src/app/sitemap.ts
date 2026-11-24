import type { MetadataRoute } from "next";
import { CURRICULUM_SUBJECTS } from "@/lib/curriculum-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://ecvault.in";

  const staticRoutes = [
    "",
    "/curriculum",
    "/iit-mapping",
    "/search",
    "/pricing",
    "/about",
    "/contact",
    "/policies/privacy",
    "/policies/terms",
    "/policies/refund",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const subjectRoutes = CURRICULUM_SUBJECTS.map((s) => ({
    url: `${baseUrl}/subjects/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...subjectRoutes];
}

