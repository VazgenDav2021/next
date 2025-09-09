import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // если Strapi работает на https://steadfast-renewal-d75371361d.strapiapp.com/api
  },
};

export default nextConfig;
