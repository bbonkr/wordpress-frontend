/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_API_HOSTNAME,
        port: "",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_API_HOSTNAME,
        port: "443",
      },
    ],
  },
};

module.exports = nextConfig;
