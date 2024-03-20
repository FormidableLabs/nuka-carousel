import React from 'react';
import { Carousel } from 'nuka-carousel';

function DemoCard({ title, description, imageSrc, price }) {
  return (
    <div className="min-w-[300px] m-4 first:ml-0 last:mr-0 bg-white rounded-sm shadow-md">
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
            className="inline-block bg-[#dd4add] mx-auto px-6 py-2 text-white hover:text-white rounded-sm"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}

export const CarouselDemo = () => (
  <div className="bg-white text-[#000e38]">
    <div className="flex flex-col text-left mx-16 lg:mx-32 xl:mx-64 my-auto py-12">
      <div className="mt-8 h-1 bg-[#00e6a4]" />
      <h2 className="my-8 text-4xl font-semibold">Carousel Demo</h2>
      <p className="text-lg">
        This carousel library is small but mighty! Here's this demo of product
        cards turned into a carousel with a few simple lines!
      </p>
    </div>
    <div className="mx-16 my-8">
      <Carousel showArrows showDots>
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
);
