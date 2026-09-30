import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "catalogo",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          catalogo:
            "cardapio@http://localhost:3001/_next/static/chunks/remoteEntry.js",
          carrinho:
            "pedidos@http://localhost:3002/_next/static/chunks/remoteEntry.js",
        },

        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
        },
      }),
    );

    return config;
  },

  reactStrictMode: true,
};

export default nextConfig;
