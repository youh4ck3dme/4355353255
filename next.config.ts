
import type {NextConfig} from 'next';
import createNextPwa from 'next-pwa';

const withPWA = createNextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // Povolí PWA iba v produkčnom prostredí
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'viandmo.com',
      }
    ],
  },
};

export default withPWA(nextConfig);
