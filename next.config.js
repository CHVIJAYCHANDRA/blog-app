/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/modern-blog-app',
  assetPrefix: '/modern-blog-app/',
}

module.exports = nextConfig
