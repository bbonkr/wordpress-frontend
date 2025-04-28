export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import CategoryPostsTemplate from "@/components/Templates/CategoryPosts/CategoryPostsTemplate";
import { GeneralSettings } from "@/gql/graphql";
import { GeneralSettingsQuery } from "@/queries/general/GeneralSettingsQuery";
import { print } from "graphql/language/printer";
import { setDefaultSeoData } from "@/utils/setDefaultSeoData";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const title = "Category";
  const route = "categories";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const { generalSettings } = await fetchGraphQL<{
    generalSettings: GeneralSettings;
  }>(print(GeneralSettingsQuery), {});

  const metadata = setDefaultSeoData(generalSettings, route, title, slug);

  return {
    ...metadata,
    alternates: {
      canonical: `${baseUrl}/${route}/${slug}`,
    },
  } as Metadata;
}

export function generateStaticParams() {
  return [];
}

export default async function CategoryPostsPage({
  params,
  searchParams,
}: Readonly<Props>) {
  const { slug } = await params;
  const searchParamsValue = await searchParams;
  const { after, before, first, last, s } = searchParamsValue ?? {};

  return (
    <CategoryPostsTemplate
      categorySlug={slug}
      after={after?.toString()}
      before={before?.toString()}
      first={first?.toString()}
      last={last?.toString()}
      s={s?.toString()}
    />
  );
}
