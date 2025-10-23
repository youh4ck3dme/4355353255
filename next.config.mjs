/** @type {import('next').NextConfig} */

import createNextPwa from 'next-pwa';

const withPWA = createNextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'viandmo.com',
      },
    ],
  },
};

export default withPWA(nextConfig);
