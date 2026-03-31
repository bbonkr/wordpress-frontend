export const setDefaultSeoData = (
  route?: string,
  routeDescription?: string,
  slug?: string
) => {
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE ?? "Blog";
  const defaultImageUrl = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL ?? "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const decodedSlug = decodeURIComponent(slug ?? "");

  let actualTitle = "";
  if (slug) {
    actualTitle = decodedSlug;
  }

  if (routeDescription) {
    actualTitle = actualTitle
      ? `Posts in ${actualTitle} ${routeDescription}`
      : routeDescription;
  }

  actualTitle = actualTitle ? `${actualTitle} | ${siteTitle}` : siteTitle;

  return {
    metadataBase: new URL(baseUrl),
    title: actualTitle,
    description: "",
    openGraph: {
      title: actualTitle,
      description: "",
      url: `${baseUrl}/${route ?? ""}${slug ? `/${slug}` : ""}`,
      siteName: siteTitle,
      images: defaultImageUrl
        ? [{ url: defaultImageUrl, width: 1024, height: 1024, alt: siteTitle }]
        : [],
      locale: "ko_KR",
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: actualTitle,
      description: "",
      images: defaultImageUrl ? [defaultImageUrl] : [],
    },
  };
};
