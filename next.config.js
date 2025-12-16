/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl.amorz.ir",
        pathname: "/**",
      },
      // اگر گاهی از خود دامنه هم عکس داری:
      {
        protocol: "https",
        hostname: "amorz.ir",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
