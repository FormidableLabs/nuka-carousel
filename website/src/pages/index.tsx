import React from 'react';
import Layout from '@theme/Layout';
import { FeaturedBadge } from 'formidable-oss-badges';
import { Carousel } from 'nuka-carousel';

function DemoCard({ title, description, imageSrc, price }) {
  return (
    <div className="min-w-[300px] m-4 bg-white rounded-sm shadow-md">
      <div className="relative">
        <div className="absolute top-4 left-4 py-0.5 px-2 bg-gray-800 rounded-sm text-white">
          ${price.toFixed(2)}
        </div>
        <img src={imageSrc} alt={title} className="bg-cover" />
      </div>
      <div className="flex flex-col">
        <div className="text-gray-800 text-center text-xl uppercase font-semibold mt-4">
          {title}
        </div>
        <div className="flex-1 p-4 text-gray-600 text-center">
          {description}
        </div>
        <div className="flex justify-center mb-4">
          <a
            href="#"
            className="inline-block bg-[#dd4add] mx-auto px-6 py-2 text-white rounded-sm"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <Layout
      title="Nuka Carousel"
      description="Small, fast, and accessibility-first React carousel library with easily customizable UI and behavior to fit your brand and site."
    >
      <div>
        <div className="relative isolate overflow-hidden pt-14 bg-gradient-to-tl from-[#300230] to-[#e655e6]">
          <div className="flex gap-16 mx-16 lg:mx-32 xl:mx-64 py-24">
            <div>
              <FeaturedBadge name="nuka" className="h-64 w-64" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Nuka Carousel
              </h1>
              <p className="mt-6 text-lg leading-8">
                Small, fast, and accessibility-first React carousel library with
                easily customizable UI and behavior to fit your brand and site.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-[#dd4add] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#b13bb1] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b13bb1]"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="my-8 text-4xl font-semibold text-center">
            Feature Demo
          </h2>
        </div>
        <div className="mx-16 my-8">
          <Carousel showButtons showPageIndicators>
            <DemoCard
              title="Headphones"
              description="Audio-Technica ATH-M50x Professional Studio Monitor Headphones"
              imageSrc="/open-source/nuka-carousel/img/product-1.jpg"
              price={45}
            />
            <DemoCard
              title="Photography"
              description="Vintage cameras and accessories for the modern photographer with a love of polaroids"
              imageSrc="/open-source/nuka-carousel/img/product-3.jpg"
              price={250}
            />
            <DemoCard
              title="Watches"
              description="High quality watches for the discerning customer available today at all locations"
              imageSrc="/open-source/nuka-carousel/img/product-2.jpg"
              price={90}
            />
            <DemoCard
              title="Lotion"
              description="Organic, natural, and cruelty-free lotions for the whole family. Just in time for holidays"
              imageSrc="/open-source/nuka-carousel/img/product-4.jpg"
              price={45}
            />
            <DemoCard
              title="Body Care"
              description="Our wonderful body care products take care of your skin and hair with all natural ingredients"
              imageSrc="/open-source/nuka-carousel/img/product-5.jpg"
              price={45}
            />
          </Carousel>
        </div>
      </div>
    </Layout>
  );
}
