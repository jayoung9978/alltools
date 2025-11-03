import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      // calc.asdw.kr → /calc/*
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'calc.asdw.kr' }],
        destination: '/calc/:path*',
      },
      // conv.asdw.kr → /conv/*
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'conv.asdw.kr' }],
        destination: '/conv/:path*',
      },
      // gen.asdw.kr → /gen/*
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'gen.asdw.kr' }],
        destination: '/gen/:path*',
      },
      // text.asdw.kr → /text/*
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'text.asdw.kr' }],
        destination: '/text/:path*',
      },
      // dev.asdw.kr → /dev/*
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'dev.asdw.kr' }],
        destination: '/dev/:path*',
      },
    ];
  },
};

export default nextConfig;
