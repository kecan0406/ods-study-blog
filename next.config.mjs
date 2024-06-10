/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { ppr: 'incremental', after: true, reactCompiler: true },
  logging: { fetches: { fullUrl: true } },
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/*'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/*'
      }
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536]
  }
}

export default nextConfig
