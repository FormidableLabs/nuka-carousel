import React from 'react';
import clsx from 'clsx';
import FormidableLogo from '@site/static/img/formidable-icon.svg';

type CardProps = {
  className: string;
  slideId: string;
};
const Card = ({ className, slideId }: CardProps) => (
  <div
    data-slide={slideId}
    className={clsx(
      className,
      'flex justify-center w-full flex-row',
      'py-8 md:py-10 px-8 md:px-16 border-8 border-solid'
    )}
  >
    <FormidableLogo className="h-40 z-10" />
  </div>
);

const colorPairings = [
  'bg-red-300 text-red-700',
  'bg-orange-300 text-orange-700',
  'bg-yellow-300 text-yellow-700',
  'bg-green-300 text-green-700',
  'bg-blue-300 text-blue-700',
  'bg-purple-300 text-purple-700',
  'bg-violet-300 text-violet-700',
];

export const generateCards = (length: number = 7) =>
  [...Array(length)].map((_, index) => (
    <Card
      slideId={`Slide ${index}`}
      key={index}
      className={colorPairings[index % 7]}
    />
  ));
