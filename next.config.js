/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next-build',
  experimental: {
    optimizePackageImports: ['lucide-react', 'antd', 'lodash'],
    typedRoutes: true,
  },
  transpilePackages: ['@ant-design/pro-layout'],
  webpack: (config, { dev, isServer }) => {
    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  env: {
    VITE_APP_TITLE: process.env.VITE_APP_TITLE || 'Frontend 101',
  },
  // Enable static export if needed
  // output: 'export',
  // trailingSlash: true,
};

export default nextConfig;