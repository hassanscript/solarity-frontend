/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const webpack = require("webpack");

/** eslint-disable @typescript-eslint/no-var-requires */
const withTM = require("next-transpile-modules")([
  "@solana/wallet-adapter-base",
  "web3",
  // Uncomment wallets you want to use
  // "@solana/wallet-adapter-bitpie",
  // "@solana/wallet-adapter-coin98",
  // "@solana/wallet-adapter-ledger",
  // "@solana/wallet-adapter-mathwallet",
  "@solana/wallet-adapter-phantom",
  "@solana/wallet-adapter-react",
  "@solana/wallet-adapter-solflare",
  // "@solana/wallet-adapter-sollet",
  // "@solana/wallet-adapter-solong",
  // "@solana/wallet-adapter-torus",
  "@solana/wallet-adapter-wallets",
  // "@project-serum/sol-wallet-adapter",
  // "@solana/wallet-adapter-ant-design",
]);

// add this if you need LESS
// also install less and less-loader
// const withLess = require("next-with-less");

const plugins = [
  // add this if you need LESS
  // [withLess, {
  //   lessLoaderOptions: {
  //     /* ... */
  //   },
  // }],
  [
    withTM,
    {
      webpack5: true,
      reactStrictMode: true,
    },
  ],
];

const nextConfig = {
  swcMinify: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["i.pravatar.cc"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      // FIX this
      // Disable minimize to make it work with Candy Machine template
      // minimization brakes Public Key names
      config.optimization.minimize = false;
    }
    config.plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /^electron$/
    }));
    return config;
  },
};

module.exports = withPlugins(plugins, nextConfig);
