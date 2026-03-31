import type { Metadata } from "next";
import type { StrapiSeo } from "./strapi/types";

export function getSiteDefaults(): { baseUrl: string; siteTitle: string } {
  return {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "",
    siteTitle: process.env.NEXT_PUBLIC_SITE_TITLE ?? "Blog",
  };
}

/** HTML 태그를 제거하고 순수 텍스트만 반환 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

export function buildPageMetadata(
  title: string,
  path: string,
  description?: string
): Metadata {
  const { baseUrl, siteTitle } = getSiteDefaults();
  const url = path ? `${baseUrl}/${path}` : baseUrl;
  return {
    title,
    ...(description ? { description } : {}),
    openGraph: {
      title,
      ...(description ? { description } : {}),
      url,
      type: "website",
      siteName: siteTitle,
      locale: "ko_KR",
    },
    alternates: { canonical: url },
  };
}

export function buildArticleMetadata(params: {
  fallbackTitle: string;
  defaultPath: string;
  seo?: StrapiSeo;
  fallbackDescription?: string;
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
}): Metadata {
  const {
    fallbackTitle,
    defaultPath,
    seo,
    fallbackDescription,
    publishedAt,
    updatedAt,
    authorName,
  } = params;
  const { baseUrl, siteTitle } = getSiteDefaults();

  const title = stripHtml(seo?.metaTitle ?? fallbackTitle);
  const description = seo?.metaDescription ?? fallbackDescription;
  const canonicalUrl = seo?.canonicalURL ?? `${baseUrl}/${defaultPath}`;
  const ogImage = seo?.metaImage?.url;

  const twitterSocial = seo?.metaSocial?.find(
    (s) => s.socialNetwork === "Twitter"
  );
  const facebookSocial = seo?.metaSocial?.find(
    (s) => s.socialNetwork === "Facebook"
  );

  const ogTitle = facebookSocial?.title ?? title;
  const ogDescription = facebookSocial?.description ?? description;
  const ogImageUrl = facebookSocial?.image?.url ?? ogImage;

  const twitterTitle = twitterSocial?.title ?? title;
  const twitterDescription = twitterSocial?.description ?? description;
  const twitterImageUrl = twitterSocial?.image?.url ?? ogImage;

  return {
    title,
    ...(description ? { description } : {}),
    ...(seo?.keywords ? { keywords: seo.keywords } : {}),
    ...(seo?.metaRobots ? { robots: seo.metaRobots } : {}),
    openGraph: {
      title: ogTitle,
      ...(ogDescription ? { description: ogDescription } : {}),
      url: canonicalUrl,
      type: "article",
      siteName: siteTitle,
      locale: "ko_KR",
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
      ...(updatedAt ? { modifiedTime: updatedAt } : {}),
      ...(authorName ? { authors: [authorName] } : {}),
    },
    twitter: {
      card: twitterImageUrl ? "summary_large_image" : "summary",
      title: twitterTitle,
      ...(twitterDescription ? { description: twitterDescription } : {}),
      ...(twitterImageUrl ? { images: [twitterImageUrl] } : {}),
    },
    alternates: { canonical: canonicalUrl },
  };
}
