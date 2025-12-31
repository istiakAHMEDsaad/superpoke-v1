import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '**',
        search: '',
      },
      // new URL('https/api.dicebear.com')
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
