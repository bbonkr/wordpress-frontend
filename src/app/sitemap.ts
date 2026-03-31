import { MetadataRoute } from "next";
import { getAllPostsForSitemap } from "@/lib/strapi/client";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  let posts: { slug: string; updatedAt: string }[] = [];
  try {
    posts = await getAllPostsForSitemap();
  } catch {
    // Strapi API 미설정 시 빈 sitemap 반환
    return [];
  }

  return posts.map(({ slug, updatedAt }) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}
