import React from 'react';
import Layout from '@theme/Layout';
import { CarouselDemo } from '../components/carousel-demo';
import { LandingBanner } from '../components/landing/landing-banner';
import { LandingHero } from '../components/landing/landing-hero';
import { LandingLogos } from '../components/landing/landing-logos';
import { LandingFeaturedProjects } from '../components/landing/landing-featured-projects';
import { LandingFeatures } from '../components/landing/landing-features';

export default function Index() {
  return (
    <Layout
      title="Nuka Carousel"
      description="Small, fast, and accessibility-first React carousel library with easily customizable UI and behavior to fit your brand and site."
    >
      <div className="dark:bg-gray-500 bg-gray-200 dark:text-white text-theme-2">
        <LandingHero
          heading="Nuka Carousel"
          body="Small, fast, and accessibility-first React carousel library with
          easily customizable UI and behavior to fit your brand and site."
          copyText="pnpm add nuka-carousel"
          navItems={[
            { link: '/docs', title: 'Documentation' },
            { link: '#demo', title: 'Demo' },
            {
              link: 'https://github.com/FormidableLabs/nuka-carousel',
              title: 'Github',
            },
          ]}
        />
      </div>
      <LandingFeatures
        heading="Features"
        list={[
          {
            imgSrc:
              'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png',
            alt: 'logo alt',
            title: 'Fully Responsive',
            body: 'Nuka leans into responsive front-end practices from the foundation so it will scale with your user screens and devices. While Nuka is responsive out of the box, you can override it for your specific use cases.',
          },
          {
            imgSrc:
              'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png',
            alt: 'logo alt',
            title: 'Easy to Style Controls',
            body: 'Straight forward API that allows you to zero in on the adaptations you want right away.',
          },
          {
            imgSrc:
              'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png',
            alt: 'logo alt',
            title: 'Native touch support!',
            body: 'Nothing is worse than building a beautiful carousel and going to test it on mobile only to find that tapping does nothing! With Nuka, we baked in the mobile support to ensure accessibility for all users.',
          },
        ]}
      />
      <CarouselDemo />
      <LandingLogos
        showDivider
        heading="A Few of our Fans"
        body="lorem ipsum ajfdklajdflk jalkjda "
        list={[
          {
            imgSrc:
              'https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.png',
            alt: 'brand name',
          },
          {
            imgSrc:
              'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png',
            alt: 'brand name',
          },
          {
            imgSrc:
              'https://shop.raceya.fit/wp-content/uploads/2020/11/logo-placeholder.jpg',
            alt: 'brand name',
          },
          {
            imgSrc:
              'data:image/jpeg;base64,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',
            alt: 'brand name',
          },
          {
            imgSrc:
              'https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.png',
            alt: 'brand name',
          },
        ]}
      />
      <LandingBanner
        showDivider
        heading="Get Started"
        body="Build a performative, fully accessible and customizable carousel today!"
        cta={{ link: '/docs', text: 'Documentation' }}
      />
      <LandingFeaturedProjects
        heading="Other Open Source from Nearform_Commerce"
        projects={[
          {
            name: 'spectacle',
            link: 'https://commerce.nearform.com/open-source/spectacle',
            description:
              'A React.js based library for creating sleek presentations using JSX syntax with the ability to live demo your code!',
          },
          {
            name: 'figlog',
            link: 'https://github.com/FormidableLabs/FigLog',
            description:
              'FigLog is the easiest and most efficient way to document team decisions and the evolution of your changes in Figma.',
            title: 'FigLog',
          },
          {
            name: 'envy',
            link: 'https://github.com/FormidableLabs/envy',
            description:
              'Envy will trace the network calls from every application in your stack and allow you to view them in a central place.',
          },
          {
            name: 'victory',
            link: 'https://commerce.nearform.com/open-source/victory/',
            description:
              'React.js components for modular charting and data visualization.',
          },
        ]}
      />
    </Layout>
  );
}
