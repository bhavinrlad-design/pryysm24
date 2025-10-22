const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, 'src'),
      '@/components': path.join(__dirname, 'src/components'),
      '@/hooks': path.join(__dirname, 'src/hooks'),
      '@/lib': path.join(__dirname, 'src/lib'),
      '@/ui': path.join(__dirname, 'src/components/ui'),
      '@/navigation': path.join(__dirname, 'src/components/navigation'),
      '@/dashboard': path.join(__dirname, 'src/components/dashboard')
    };
    return config;
  }
};

module.exports = nextConfig;
