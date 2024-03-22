import React from 'react';

export const LandingFeatures = ({
  heading,
  list,
  showDivider,
}: {
  heading: string;
  list: { imgSrc: string; alt: string; title: string; body: string }[];
  showDivider?: boolean;
}) => (
  <div className="flex flex-col text-left mx-16 lg:mx-32 xl:mx-64 my-12">
    {showDivider && <div className="mt-8 h-1 bg-theme-1" />}
    <h2 className="my-8 text-4xl font-semibold">{heading}</h2>
    <ul className="grid grid-cols-3 items-start content-start justify-items-start justify-between gap-12 list-none pl-0">
      {list.map(({ alt, body, imgSrc, title }) => (
        <li className="col-span-3 md:col-span-1 flex flex-col items-center">
          <img src={imgSrc} alt={alt} className="max-h-72" />
          <span className="mt-8 text-2xl font-semibold">{title}</span>
          <span className="mt-2 text-lg leading-8">{body}</span>
        </li>
      ))}
    </ul>
  </div>
);
