// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nuka-Carousel',
  tagline: 'Small, fast and accessibility-first React carousel library with easily customizable UI and behavior to fit your brand and site.',
  url: 'https://formidable.com',
  baseUrl: '/open-source/nuka-carousel/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'images/favicon.ico',
  organizationName: 'FormidableLabs',
  projectName: 'nuka-carousel',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/FormidableLabs/nuka-carousel/edit/main/website/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        pages: {
          remarkPlugins: [require('@docusaurus/remark-plugin-npm2yarn')],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: '/images/social.png',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        style: 'dark',
        title: 'Nuka-Carousel',
        logo: {
          alt: 'Nuka-Carousel Logo',
          src: 'images/nuka-parrot.svg',
        },
        items: [
          {
            label: 'Documentation',
            position: 'left',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started/',
              },
              {
                label: 'CLI',
                to: '/docs/cli/building-the-app/',
              },
              {
                label: 'Methods',
                to: '/docs/api/methods/',
              },
              {
                label: 'Matchers',
                to: '/docs/api/matchers/',
              },
            ],
          },
          {
            href: 'https://github.com/FormidableLabs/nuka-carousel',
            className: 'header-github-link',
            'aria-label': 'GitHub Repository',
            position: 'right',
          },
          {
            href: 'https://formidable.com',
            className: 'header-formidable-link',
            'aria-label': 'Formidable Website',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: null,
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
              {
                label: 'CLI',
                to: '/docs/cli/building-the-app/',
              },
              {
                label: 'Methods',
                to: '/docs/api/methods/',
              },
              {
                label: 'Matchers',
                to: '/docs/api/matchers/',
              },
            ],
          },
        ],
      },
      prism: {
        defaultLanguage: 'javascript',
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
