/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["pdfjs-dist"],
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
