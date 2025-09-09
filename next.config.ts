import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "steadfast-renewal-d75371361d.media.strapiapp.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
