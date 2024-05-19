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
