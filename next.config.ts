import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
};

// Note: When @opennextjs/cloudflare is installed, uncomment this for local dev:
// import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
//   initOpenNextCloudflareForDev();
// }).catch(() => {});

export default nextConfig;
