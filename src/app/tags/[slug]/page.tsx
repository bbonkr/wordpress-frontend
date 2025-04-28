export const dynamic = "force-dynamic";
import TagPostsTemplate from "@/components/Templates/TagPosts/TagPostsTemplate";
import type { Metadata } from "next";
import { GeneralSettingsQuery } from "@/queries/general/GeneralSettingsQuery";
import { GeneralSettings } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { setDefaultSeoData } from "@/utils/setDefaultSeoData";
import { print } from "graphql/language/printer";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const title = "Tag";
  const route = "tags";
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

export default async function TagPostsPage({
  params,
  searchParams,
}: Readonly<Props>) {
  const { slug } = await params;
  const searchParamsValue = await searchParams;
  const { after, before, first, last, s } = searchParamsValue ?? {};

  return (
    <TagPostsTemplate
      tagSlug={slug}
      after={after?.toString()}
      before={before?.toString()}
      first={first?.toString()}
      last={last?.toString()}
      s={s?.toString()}
    />
  );
}
