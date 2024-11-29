/** @type {import('next').NextConfig} */
import { withContentlayer } from "next-contentlayer2";

const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_APP_CORE_BASE_URL: process.env.NEXT_PUBLIC_APP_CORE_BASE_URL,
    NEXT_PUBLIC_APP_WEBSOCKET_URL: process.env.NEXT_PUBLIC_APP_WEBSOCKET_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        port: "",
        protocol: "https",
      },
      {
        hostname: "github.com",
        port: "",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'contentlayer2'];
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default withContentlayer(nextConfig);
