import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || "https://steadfast-renewal-d75371361d.strapiapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
