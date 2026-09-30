import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "pedidos",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Pedidos": "./src/components/Pedidos",
        },
      }),
    );
    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
