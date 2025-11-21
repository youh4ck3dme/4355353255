/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
        ],
    },
    webpack: (config, { isServer }) => {
        // Add a rule to handle the service worker file
        if (!isServer) {
            config.output.publicPath = '/';
        }

        return config;
    },
};

export default nextConfig;
