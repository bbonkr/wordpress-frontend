import type { MetadataRoute } from "next";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { GeneralSettingsQuery } from "@/queries/general/GeneralSettingsQuery";
import { GeneralSettings } from "@/gql/graphql";
import { print } from "graphql/language/printer";
import constants from "@/constants";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_URL ?? "";
  const baseRoute = "wordpress";
  const filename = "bbon-icon-";
  const fileExtension = ".png";

  const sizes = [
    { size: 36, density: 0.75 },
    { size: 48, density: 1.0 },
    { size: 72, density: 1.5 },
    { size: 96, density: 2.0 },
    { size: 144, density: 3.0 },
    { size: 192, density: 4.0 },
  ];

  const backgroundColor = constants.colors.backgroundColor;
  const themeColor = constants.colors.themeColor;

  const { generalSettings } = await fetchGraphQL<{
    generalSettings: GeneralSettings;
  }>(print(GeneralSettingsQuery), {});

  const title = generalSettings?.title ?? "App";

  return {
    name: title,
    short_name: title,
    description: generalSettings?.description ?? "",
    icons: mediaBaseUrl
      ? sizes.map((s) => ({
          src: `${mediaBaseUrl}/${baseRoute}/${filename}${s.size}${fileExtension}`,
          sizes: `${s.size}x${s.size}`,
          type: "image/png",
          density: `${s.density}`,
        }))
      : [],
    start_url: "/",
    display: "standalone",
    background_color: backgroundColor,
    theme_color: themeColor,
  };
}
