import type { Metadata } from "next";
import PostListTemplate from "@/components/Templates/Posts/PostListTemplate";

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
