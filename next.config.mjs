/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/glossario",
        destination: "/guias/python/glossario",
        permanent: false,
      },
    ];
  },
};
export default nextConfig;
