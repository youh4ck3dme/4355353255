import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // This allows the Next.js development server to accept requests from the
    // Firebase Studio development environment.
    allowedDevOrigins: [
      "https://6000-firebase-studio-1754719593544.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
