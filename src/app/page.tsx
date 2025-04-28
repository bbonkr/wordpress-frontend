import type { Metadata } from "next";
import PostListTemplate from "@/components/Templates/Posts/PostListTemplate";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { GeneralSettingsQuery } from "@/queries/general/GeneralSettingsQuery";
import { GeneralSettings } from "@/gql/graphql";
import { print } from "graphql/language/printer";
import { setDefaultSeoData } from "@/utils/setDefaultSeoData";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { generalSettings } = await fetchGraphQL<{
    generalSettings: GeneralSettings;
  }>(print(GeneralSettingsQuery), {});

  const metadata = setDefaultSeoData(generalSettings, "");

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
  } as Metadata;
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
