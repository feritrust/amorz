/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "picsum.photos",'bakhtarflower.com'], // ← دامنه picsum.photos اضافه شد
  },
};

module.exports = nextConfig;