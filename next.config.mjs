import { ip } from "address";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["source.unsplash.com", "picsum.photos"],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
if (process.env.NODE_ENV === "development") {
  console.log("info  - lanUrl:", `http://${ip()}:3000`);
}
