import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dw1wmzgy1/image/upload/**',
        search: '',
      }
    ]
  },
};

export default nextConfig;
