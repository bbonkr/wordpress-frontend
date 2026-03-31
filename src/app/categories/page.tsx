export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import CategoriesListTemplate from "@/components/Templates/Categories/CategoryListTemplate";
import { buildPageMetadata, getSiteDefaults } from "@/lib/metadata";
import { extractPageNumber } from "@/lib/searchParams";

export async function generateMetadata(): Promise<Metadata> {
  const { siteTitle } = getSiteDefaults();
  return buildPageMetadata(`Categories | ${siteTitle}`, "categories");
}

export function generateStaticParams() {
  return [];
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CategoriesPage({ searchParams }: Readonly<Props>) {
  const page = await extractPageNumber(searchParams);
  return <CategoriesListTemplate page={page} />;
}
