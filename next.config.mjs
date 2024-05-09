/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true
  },
  transpilePackages: ['next-mdx-remote'],
  async headers() {
    return [
      {
        source: '/api/theme/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://giscus.app' },
          { key: 'Access-Control-Allow-Private-Network', value: 'true' }
        ]
      }
    ]
  },
  images: {
    remotePatterns: [
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
