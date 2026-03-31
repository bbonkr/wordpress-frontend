import type { StrapiSeo } from "@/lib/strapi/types";

export const setSeoData = (seo: StrapiSeo | undefined, slug?: string) => {
  if (!seo) return {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const twitterMeta = seo.metaSocial?.find(
    (s) => s.socialNetwork === "Twitter"
  );

  return {
    metadataBase: new URL(baseUrl),
    title: seo.metaTitle || "",
    description: seo.metaDescription || "",
    robots: seo.metaRobots || undefined,
    openGraph: {
      title: seo.metaTitle || "",
      description: seo.metaDescription || "",
      url: slug ? `${baseUrl}/${slug}` : baseUrl,
      images: seo.metaImage?.url
        ? [
            {
              url: seo.metaImage.url,
              width: seo.metaImage.width ?? 1200,
              height: seo.metaImage.height ?? 630,
              alt: seo.metaImage.alternativeText || "",
            },
          ]
        : [],
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: twitterMeta?.title ?? seo.metaTitle ?? "",
      description: twitterMeta?.description ?? seo.metaDescription ?? "",
      images: twitterMeta?.image?.url
        ? [twitterMeta.image.url]
        : seo.metaImage?.url
        ? [seo.metaImage.url]
        : [],
    },
    ...(seo.canonicalURL
      ? { alternates: { canonical: seo.canonicalURL } }
      : {}),
  };
};
