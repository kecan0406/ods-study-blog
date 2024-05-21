/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { ppr: true },
  logging: { fetches: { fullUrl: true } },
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/*'
      }
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536]
  },
  headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      }
    ]
  }
}

export default nextConfig
