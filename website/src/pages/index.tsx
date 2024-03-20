import React from 'react';
import Layout from '@theme/Layout';
import { CarouselDemo } from '../components/carousel-demo';
import { DocumentationBanner } from '../components/documentation-banner';
import { LandingHero } from '../components/landing-hero';
import { NukaFans } from '../components/nuka-fans';
import { OtherOSS } from '../components/other-oss';

export default function Index() {
  return (
    <Layout
      title="Nuka Carousel"
      description="Small, fast, and accessibility-first React carousel library with easily customizable UI and behavior to fit your brand and site."
    >
      <div className="dark:bg-[#1b1b1d] bg-gray-200">
        <LandingHero />
        <CarouselDemo />
        <NukaFans />
        <DocumentationBanner />
        <OtherOSS />
      </div>
    </Layout>
  );
}
