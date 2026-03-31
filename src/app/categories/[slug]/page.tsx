import type { Metadata } from "next";
import CategoryPostsTemplate from "@/components/Templates/CategoryPosts/CategoryPostsTemplate";
import { getCategoryBySlug } from "@/lib/strapi/client";
import { buildPageMetadata, getSiteDefaults } from "@/lib/metadata";
import { extractPageNumber, extractDecodedSlug } from "@/lib/searchParams";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedSlug = await extractDecodedSlug(params);
  const { siteTitle } = getSiteDefaults();
  const category = await getCategoryBySlug(decodedSlug);
  const categoryName = category?.name ?? decodedSlug;
  return buildPageMetadata(
    `${categoryName} | ${siteTitle}`,
    `categories/${decodedSlug}`,
    category?.description
  );
}

export function generateStaticParams() {
  return [];
}

export default async function CategoryPostsPage({
  params,
  searchParams,
}: Readonly<Props>) {
  const decodedSlug = await extractDecodedSlug(params);
  const page = await extractPageNumber(searchParams);
  return <CategoryPostsTemplate categorySlug={decodedSlug} page={page} />;
}
