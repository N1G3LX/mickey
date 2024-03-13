/** @type {import('next').NextConfig} */
const nextConfig = { typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },};

export default nextConfig;
