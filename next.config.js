/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/iamhectorsosa/screenshot",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
