/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static.sketchfab.com', 'media.sketchfab.com', 'img.youtube.com'],
  },
  transpilePackages: ['three'],
};
module.exports = nextConfig;
