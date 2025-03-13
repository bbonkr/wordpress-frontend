export const dynamic = "force-dynamic";
import TagPostsTemplate from "@/components/Templates/TagPosts/TagPostsTemplate";
import type { Metadata } from "next";

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
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/tags/${slug}`,
    },
  };
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

  console.info("slug: ", slug);

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
