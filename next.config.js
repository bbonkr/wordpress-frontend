/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_API_HOSTNAME,
        port: "",
      },
    ],
  },
  client: {
    service: {
      name: "WordPress",
      localSchemaFile: "./src/gql/schema.gql",
    },
  },
};

module.exports = nextConfig;
