/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.discordapp.net', // imagens do discord
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
