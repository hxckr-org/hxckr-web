/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
