/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    JWT_SECRET: "REPLIQ",
  },
};

module.exports = nextConfig;
