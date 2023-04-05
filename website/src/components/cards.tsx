import React from 'react';
import clsx from 'clsx';
import FormidableLogo from '@site/static/img/formidable-icon.svg';

type CardProps = {
  className: string;
};
const Card = ({ className }: CardProps) => (
  <div
    className={clsx(
      className,
      'flex justify-center w-full flex-row',
      'py-10 px-5 border-8 border-solid'
    )}
  >
    <FormidableLogo className="h-40 z-10" />
  </div>
);

export const Cards = [
  <Card key="amber-card" className="bg-amber-400 text-amber-700" />,
  <Card key="indigo-card" className="bg-indigo-400 text-indigo-800" />,
  <Card key="green-card" className="bg-green-400 text-green-800" />,
  <Card key="rose-card" className="bg-rose-400 text-rose-800" />,
  <Card key="stone-card" className="bg-stone-400 text-stone-700" />,
];
