import { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/strapi/client";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  let slugs: string[] = [];
  try {
    slugs = await getAllPostSlugs();
  } catch {
    // Strapi API 미설정 시 빈 sitemap 반환
    return [];
  }

  return slugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}
