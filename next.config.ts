import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/app/[locale]/i18n/request.ts');

const nextConfig: NextConfig = {
  experimental: {
    turbo: {}
  },
  images: {
    domains: ['upload.wikimedia.org','images.unsplash.com'], // aquí agregas los hostnames externos
  },
};

export default withNextIntl(nextConfig);