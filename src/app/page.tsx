export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import PostListTemplate from "@/components/Templates/Posts/PostListTemplate";
import { buildPageMetadata, getSiteDefaults } from "@/lib/metadata";
import { extractPageNumber } from "@/lib/searchParams";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { siteTitle } = getSiteDefaults();
  return buildPageMetadata(siteTitle, "");
}

export function generateStaticParams() {
  return [];
}

export default async function Page({ searchParams }: Readonly<Props>) {
  const page = await extractPageNumber(searchParams);
  return <PostListTemplate page={page} />;
}
