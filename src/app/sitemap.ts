import type { MetadataRoute } from "next";
import { getPublishedServices } from "@/lib/service-content";
import { getPublishedBlogPosts } from "@/lib/data";
import { isBlogPublished } from "@/lib/settings";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/pricing"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.8 }
  ];

  const services = await getPublishedServices();
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.8
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  if (await isBlogPublished()) {
    blogRoutes.push({
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6
    });
    const posts = await getPublishedBlogPosts();
    blogRoutes = blogRoutes.concat(
      posts.map((p) => ({
        url: absoluteUrl(`/blog/${p.slug}`),
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.5
      }))
    );
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
