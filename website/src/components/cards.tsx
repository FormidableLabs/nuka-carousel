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

export const Cards = [
  <Card
    slideId="Slide 1"
    key="amber-card"
    className="bg-amber-400 text-amber-700"
  />,
  <Card
    slideId="Slide 2"
    key="indigo-card"
    className="bg-indigo-400 text-indigo-800"
  />,
  <Card
    slideId="Slide 3"
    key="green-card"
    className="bg-green-400 text-green-800"
  />,
  <Card
    slideId="Slide 4"
    key="rose-card"
    className="bg-rose-400 text-rose-800"
  />,
  <Card
    slideId="Slide 5"
    key="stone-card"
    className="bg-stone-400 text-stone-700"
  />,
];
