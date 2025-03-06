export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import CategoryPostsTemplate from "@/components/Templates/CategoryPosts/CategoryPostsTemplate";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${slug}`,
    },
  };
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
