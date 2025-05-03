/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true, // For static export compatibility
  },

  // disable eslint
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
