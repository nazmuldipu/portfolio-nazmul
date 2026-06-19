/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  async redirects() {
    // The portfolio now lives at the home route; keep the old URL working.
    return [{ source: "/portfolio", destination: "/", permanent: true }];
  },
};

module.exports = nextConfig;
