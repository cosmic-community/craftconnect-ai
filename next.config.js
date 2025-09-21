/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Remove output: 'standalone' as it may cause issues with static generation
  // and change to export for better compatibility
  trailingSlash: false,
  // Ensure proper environment variable handling during build
  env: {
    COSMIC_BUCKET_SLUG: process.env.COSMIC_BUCKET_SLUG,
    COSMIC_READ_KEY: process.env.COSMIC_READ_KEY,
    COSMIC_WRITE_KEY: process.env.COSMIC_WRITE_KEY,
  },
  // Add proper error handling for missing environment variables
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't fail build if Cosmic credentials are missing - just warn
      if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
        console.warn('⚠️  Cosmic CMS credentials not found. Pages will show empty state during build.');
      }
    }
    return config;
  },
}

module.exports = nextConfig