/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true
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
