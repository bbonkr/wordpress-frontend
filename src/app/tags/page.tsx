export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import TagsListTemplate from "@/components/Templates/Tags/TagsListTemplate";
import { buildPageMetadata, getSiteDefaults } from "@/lib/metadata";
import { extractPageNumber } from "@/lib/searchParams";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { siteTitle } = getSiteDefaults();
  return buildPageMetadata(`Tags | ${siteTitle}`, "tags");
}

export function generateStaticParams() {
  return [];
}

export default async function TagsPage({ searchParams }: Readonly<Props>) {
  const page = await extractPageNumber(searchParams);
  return <TagsListTemplate page={page} />;
}
