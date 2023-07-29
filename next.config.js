/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://rupload.facebook.com/video-upload/v17.0/:path*',
      }
    ]
  }
}

module.exports = nextConfig
