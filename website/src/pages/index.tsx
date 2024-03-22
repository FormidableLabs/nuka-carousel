import React from 'react';
import Layout from '@theme/Layout';
import { CarouselDemo } from '../components/carousel-demo';
import { LandingBanner } from '../components/landing/landing-banner';
import { LandingHero } from '../components/landing/landing-hero';
import { LandingFeaturedProjects } from '../components/landing/landing-featured-projects';
import { LandingFeatures } from '../components/landing/landing-features';
import responsiveFeature from '../assets/images/responsive.png';
import nativeFeature from '../assets/images/native-support.png';
import styleFeature from '../assets/images/style.png';

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
            imgSrc: responsiveFeature,
            alt: 'logo alt',
            title: 'Fully Responsive',
            body: 'Nuka leans into responsive front-end practices from the foundation so it will scale with your user screens and devices. While Nuka is responsive out of the box, you can override it for your specific use cases.',
          },
          {
            imgSrc: styleFeature,
            alt: 'logo alt',
            title: 'Customizable Controls',
            body: 'With a straight forward API that allows you to zero in on the adaptations you want right away, Nuka is flexible enough to fit almost any need or use case.',
          },
          {
            imgSrc: nativeFeature,
            alt: 'logo alt',
            title: 'Native Touch Support',
            body: "Nothing is worse than building a beautiful carousel only to discover it's not mobile friendly. With Nuka, we baked in the mobile device support to ensure accessibility for all your users.",
          },
        ]}
      />
      <CarouselDemo />
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
