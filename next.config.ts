import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
};

module.exports = {
  output: "standalone",
};

export default nextConfig;
