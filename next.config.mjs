/** @type {import('next').NextConfig} */
import { withContentlayer } from "next-contentlayer2";

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        port: "",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default withContentlayer(nextConfig);
