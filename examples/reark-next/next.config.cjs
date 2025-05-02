const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // For static export compatibility
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@aokiapp/renderer": path.resolve(__dirname, "../../renderer"),
      "@aokiapp/lark-api": path.resolve(__dirname, "../../lark-api"),
    };
    return config;
  },
};

module.exports = nextConfig;
