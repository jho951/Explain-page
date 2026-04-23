import path from 'path';
import type { NextConfig } from 'next';
import type { Configuration, RuleSetRule } from 'webpack';

const nextConfig: NextConfig = {
  transpilePackages: ['@jho951/ui-components'],
  output: 'standalone',

  env: {
    NEXT_PUBLIC_TITLE: process.env.NEXT_PUBLIC_TITLE,
    NEXT_PUBLIC_DESCRIPTION: process.env.NEXT_PUBLIC_DESCRIPTION,
    NEXT_PUBLIC_COPY: process.env.NEXT_PUBLIC_COPY,
    NEXT_PUBLIC_START_FRONTEND_URL: process.env.NEXT_PUBLIC_START_FRONTEND_URL,
    NEXT_PUBLIC_ADSENSE_CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
    NEXT_PUBLIC_ADSENSE_SLOT_ID: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID,
  },

  webpack(config: Configuration) {
    const rules = config.module?.rules ?? [];

    const fileLoaderRule = rules.find(
      (rule): rule is RuleSetRule =>
        typeof rule === 'object' &&
        rule !== null &&
        'test' in rule &&
        rule.test instanceof RegExp &&
        rule.test.test('.svg'),
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };

    return config;
  },

  compress: true,

  allowedDevOrigins: [
    '127.0.0.1',
    'localhost',
    '172.30.*.*',
    'local-origin.dev',
    '*.local-origin.dev',
  ],
};

export default nextConfig;
