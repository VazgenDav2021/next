import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // если Strapi работает на https://steadfast-renewal-d75371361d.media.strapiapp.com//api
  },
};

export default nextConfig;