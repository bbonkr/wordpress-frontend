import type { Metadata } from "next";
import CategoriesListTemplate from "@/components/Templates/Categories/CategoryListTemplate";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { GeneralSettings } from "@/gql/graphql";
import { GeneralSettingsQuery } from "@/queries/general/GeneralSettingsQuery";
import { print } from "graphql/language/printer";
import { setDefaultSeoData } from "@/utils/setDefaultSeoData";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const title = "Categories";
  const slug = "categories";
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
    <CategoriesListTemplate
      after={after?.toString()}
      before={before?.toString()}
      first={first?.toString()}
      last={last?.toString()}
      s={s?.toString()}
    />
  );
}
