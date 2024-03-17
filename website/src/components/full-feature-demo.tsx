import React from 'react';
import { Carousel } from 'nuka-carousel';

const FeatureCard = ({ src, title }: { src: string; title: string }) => (
  <div>
    <div className="w-[300px] m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={src} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  </div>
);

export const FullFeatureDemo = () => {
  return (
    <div>
      <Carousel
        showPageIndicators
        showButtons
        scrollDistance="slide"
        wrapAround={false}
      >
        <FeatureCard
          title="Why Rainbows are the Secret Ingredient"
          src="https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <FeatureCard
          title="The Evolution of Flower Fields"
          src="https://images.pexels.com/photos/96627/pexels-photo-96627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <FeatureCard
          title="The Idea Maker Article of Your Dreams"
          src="https://images.pexels.com/photos/354939/pexels-photo-354939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <FeatureCard
          title="Why Everyone is Obsesses with Rain"
          src="https://images.pexels.com/photos/243971/pexels-photo-243971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <FeatureCard
          title="The Industry You Can Trust"
          src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </Carousel>
    </div>
  );
};
