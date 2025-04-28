import type { Metadata } from "next";
import TagsListTemplate from "@/components/Templates/Tags/TagsListTemplate";
import { GeneralSettingsQuery } from "@/queries/general/GeneralSettingsQuery";
import { GeneralSettings } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { setDefaultSeoData } from "@/utils/setDefaultSeoData";
import { print } from "graphql/language/printer";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const title = "Tags";
  const slug = "tags";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const { generalSettings } = await fetchGraphQL<{
    generalSettings: GeneralSettings;
  }>(print(GeneralSettingsQuery), {});

  const metadata = setDefaultSeoData(generalSettings, slug, title, "");

  return {
    ...metadata,
    alternates: {
      canonical: `${baseUrl}/${slug}`,
    },
  } as Metadata;
}

export function generateStaticParams() {
  return [];
}

export default async function CategoriesPage({
  searchParams,
}: Readonly<Props>) {
  const searchParamsValue = await searchParams;
  const { after, before, first, last, s } = searchParamsValue ?? {};

  return (
    <TagsListTemplate
      after={after?.toString()}
      before={before?.toString()}
      first={first?.toString()}
      last={last?.toString()}
      s={s?.toString()}
      showPagination
    />
  );
}
