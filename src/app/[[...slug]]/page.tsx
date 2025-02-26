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
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise <{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const paramValue = await params;
  const searchParamsValue = await searchParams;

  const slug = nextSlugToWpSlug(paramValue.slug);

  const slugs = slug.split("/").filter((x) => Boolean(x));

  if (slugs && slugs.length > 0) {
    const isPreview = slugs.includes("preview");

    const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
      print(SeoQuery),
      {
        slug: isPreview ? slugs[1] : decodeURIComponent(slugs[0]),
        idType: isPreview ? "DATABASE_ID" : "URI",
      }
    );

    if (!contentNode) {
      return notFound();
    }

    const metadata = setSeoData({ seo: contentNode.seo });

    return {
      ...metadata,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
      },
    } as Metadata;
  } else {
    return {};
  }
}

export function generateStaticParams() {
  return [];
}

export default async function Page({ params, searchParams }: Readonly<Props>) {
  const paramValue = await params;
  const slug = nextSlugToWpSlug(paramValue.slug);
  const slugs = slug.split("/").filter((x) => Boolean(x));
  const searchParamsValue = await searchParams;

  if (slugs && slugs.length > 0) {
    const isPreview = slugs.includes("preview");
    const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
      print(ContentInfoQuery),
      {
        slug: isPreview ? slugs[1] : decodeURIComponent(slugs[0]),
        idType: isPreview ? "DATABASE_ID" : "URI",
      }
    );

    if (!contentNode) return notFound();

    switch (contentNode.contentTypeName) {
      case "page":
        return <PageTemplate node={contentNode} />;
      case "post":
        return <PostTemplate node={contentNode} />;
      default:
        return <p>{contentNode.contentTypeName} not implemented</p>;
    }
  } else {
    return <PostListTemplate {...searchParamsValue} />;
  }
}
