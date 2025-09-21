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
  // Add output configuration to handle static generation issues
  output: 'standalone',
  // Ensure proper environment variable handling during build
  env: {
    COSMIC_BUCKET_SLUG: process.env.COSMIC_BUCKET_SLUG,
    COSMIC_READ_KEY: process.env.COSMIC_READ_KEY,
    COSMIC_WRITE_KEY: process.env.COSMIC_WRITE_KEY,
  },
}

module.exports = nextConfig