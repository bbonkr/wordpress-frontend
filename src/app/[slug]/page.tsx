import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/strapi/client";
import PostTemplate from "@/components/Templates/Post/PostTemplate";
import { buildArticleMetadata, stripHtml } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return buildArticleMetadata({
    fallbackTitle: post.title,
    defaultPath: slug,
    seo: post.seo?.[0],
    fallbackDescription: post.excerpt,
    publishedAt: post.published,
    updatedAt: post.updatedAt,
    authorName: post.author?.nickname ?? post.author?.username,
  });
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function Page({ params }: Readonly<Props>) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const seo = post.seo?.[0];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const canonicalUrl = seo?.canonicalURL ?? `${baseUrl}/${slug}`;

  const structuredData = seo?.structuredData ?? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: stripHtml(post.title),
    ...(post.excerpt ? { description: post.excerpt } : {}),
    url: canonicalUrl,
    datePublished: post.published,
    dateModified: post.updatedAt,
    ...(post.author
      ? {
          author: {
            "@type": "Person",
            name: post.author.nickname ?? post.author.username,
          },
        }
      : {}),
    ...(seo?.metaImage?.url
      ? { image: seo.metaImage.url }
      : post.featuredImage?.url
        ? { image: post.featuredImage.url }
        : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PostTemplate post={post} />
    </>
  );
}
