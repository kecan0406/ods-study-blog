/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/*'
      } 
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048]
  }
}

export default nextConfig