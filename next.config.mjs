/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/portfolio-website",
    assetPrefix: "/portfolio-website/",
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  };
  
  export default nextConfig;