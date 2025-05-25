import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Enable optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Turbopack configuration (stable)
  turbopack: {
    resolveAlias: {
      // Add any necessary aliases here
    },
  },
};

export default nextConfig;
