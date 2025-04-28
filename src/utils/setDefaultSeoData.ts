import { GeneralSettings } from "@/gql/graphql";

export const setDefaultSeoData = (
  generalSettings: GeneralSettings,
  route?: string,
  routeDescription?: string,
  slug?: string
) => {
  if (!generalSettings) return {};

  const { title, description } = generalSettings;
  const defaultImageUrl = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL ?? "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  let actualTitle = "";
  if (slug) {
    actualTitle = slug;
  }

  if (routeDescription) {
    actualTitle = `Posts in ${actualTitle} ${routeDescription}`;
  }

  actualTitle = actualTitle ? `${actualTitle} | ${title ?? ""}` : title ?? "";

  return {
    metadataBase: new URL(baseUrl),
    title: actualTitle,
    description: description ?? "",
    // robots: {
    //   index: seo.metaRobotsNoindex === "index" ? true : false,
    //   follow: seo.metaRobotsNofollow === "follow" ? true : false,
    // },
    openGraph: {
      title: actualTitle ?? "",
      description: description ?? "",

      url: `${baseUrl}/${slug ?? ""}`,
      siteName: actualTitle ?? "",
      images: defaultImageUrl
        ? [
            {
              url: defaultImageUrl,
              width: 1024,
              height: 1024,
              alt: title ?? "",
            },
          ]
        : [],
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: actualTitle ?? "",
      description: description ?? "",
      // images: seo.twitterImage
      //   ? [seo.twitterImage?.sourceUrl ?? ""]
      //   : [seo.opengraphImage?.sourceUrl ?? ""],
      images: defaultImageUrl ? [defaultImageUrl] : null,
    },
  };
};
