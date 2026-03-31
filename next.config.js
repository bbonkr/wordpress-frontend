/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_STRAPI_API_HOSTNAME
        ? [
            {
              protocol: "https",
              hostname: process.env.NEXT_PUBLIC_STRAPI_API_HOSTNAME,
            },
          ]
        : []),
      ...(process.env.NEXT_PUBLIC_MEDIA_HOSTNAME
        ? [
            {
              protocol: "https",
              hostname: process.env.NEXT_PUBLIC_MEDIA_HOSTNAME,
              port: "443",
            },
          ]
        : []),
    ],
  },
};

module.exports = nextConfig;
