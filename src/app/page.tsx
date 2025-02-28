import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";

import { setSeoData } from "@/utils/seoData";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { ContentInfoQuery } from "@/queries/general/ContentInfoQuery";
import { ContentNode } from "@/gql/graphql";
import PageTemplate from "@/components/Templates/Page/PageTemplate";
import { nextSlugToWpSlug } from "@/utils/nextSlugToWpSlug";
import PostTemplate from "@/components/Templates/Post/PostTemplate";
import { SeoQuery } from "@/queries/general/SeoQuery";
import PostListTemplate from "@/components/Templates/PostList/PostListTemplate";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
  };
}

export function generateStaticParams() {
  return [];
}

export default async function Page({ searchParams }: Readonly<Props>) {
  const searchParamsValue = await searchParams;
  const { after, before, first, last, s } = searchParamsValue ?? {};

  return (
    <PostListTemplate
      after={after?.toString()}
      before={before?.toString()}
      first={first?.toString()}
      last={last?.toString()}
      s={s?.toString()}
    />
  );
}
