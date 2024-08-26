/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // https://www.netron.net/storage/images/22db069a-0e33-47e9-b28c-c59566a9d249.png
      {
        protocol: 'https',
        hostname: 'www.netron.net',
        port: '',
        pathname: '/storage/images/*',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/*',
      },
    ],
  },
};

export default nextConfig;
