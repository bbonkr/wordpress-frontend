import type { Metadata } from "next";
import TagPostsTemplate from "@/components/Templates/TagPosts/TagPostsTemplate";
import { getTagBySlug } from "@/lib/strapi/client";
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
  const tag = await getTagBySlug(decodedSlug);
  const tagName = tag?.name ?? decodedSlug;
  return buildPageMetadata(`${tagName} | ${siteTitle}`, `tags/${decodedSlug}`);
}

export function generateStaticParams() {
  return [];
}

export default async function TagPostsPage({
  params,
  searchParams,
}: Readonly<Props>) {
  const decodedSlug = await extractDecodedSlug(params);
  const page = await extractPageNumber(searchParams);
  return <TagPostsTemplate tagSlug={decodedSlug} page={page} />;
}
