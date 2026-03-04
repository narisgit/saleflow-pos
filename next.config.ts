
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* ตั้งค่าเป็น export เพื่อให้ Deploy บนแผนฟรี (Spark) ได้ */
  output: 'export',
  images: {
    unoptimized: true, // จำเป็นสำหรับโหมด static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
