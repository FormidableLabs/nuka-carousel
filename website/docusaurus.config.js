// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/okaidia');

const title = 'Nuka Carousel';
const tagline =
  'Small, fast, and accessibility-first React carousel library with easily customizable UI and behavior to fit your brand and site.';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title,
  tagline,
  url: 'https://commerce.nearform.com',
  baseUrl: '/open-source/nuka-carousel',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/nearform-icon.svg',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/docs',
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/FormidableLabs/nuka-carousel/tree/main/website',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-M971D063B9',
        },
      }),
    ],
  ],

  plugins: [
    async function myPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Nuka Carousel',
        logo: {
          alt: 'Nearform logo',
          src: 'img/nearform-logo-white.svg',
        },
        items: [
          { to: 'docs', label: 'Documentation', position: 'left' },
          {
            href: 'https://github.com/FormidableLabs/nuka-carousel',
            className: 'header-github-link',
            'aria-label': 'GitHub Repository',
            position: 'right',
          },
        ],
      },
      footer: {
        logo: {
          alt: 'Nearform logo',
          src: 'img/nearform-logo-white.svg',
          href: 'https://nearform.com',
          width: 100,
          height: 100,
        },
        copyright: `Copyright © 2013-${new Date().getFullYear()} Nearform`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [
        {
          name: 'title',
          content: title,
        },
        {
          name: 'description',
          content: tagline,
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: 'https://commerce.nearform.com/open-source/nuka-carousel/',
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: tagline,
        },
        {
          property: 'og:image',
          content:
            'https://commerce.nearform.com/open-source/nuka-carousel/open-graph.png',
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          property: 'twitter:title',
          content: title,
        },
        {
          property: 'twitter:description',
          content: tagline,
        },
        {
          property: 'twitter:image',
          content:
            'https://commerce.nearform.com/open-source/nuka-carousel/open-graph.png',
        },
      ],
    }),
};

module.exports = config;
