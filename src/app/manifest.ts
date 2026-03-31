import type { MetadataRoute } from "next";
import constants from "@/constants";

export default function manifest(): MetadataRoute.Manifest {
  const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_URL ?? "";
  const baseRoute = "strapi";
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

  return {
    name: process.env.NEXT_PUBLIC_SITE_TITLE ?? "Blog",
    short_name: process.env.NEXT_PUBLIC_SITE_SHORT_TITLE ?? "Blog",
    description: "",
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
