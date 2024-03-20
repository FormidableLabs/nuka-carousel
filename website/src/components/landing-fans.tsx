import React from 'react';

export const LandingFans = ({
  body,
  heading,
  list,
}: {
  body: string;
  heading: string;
  list: { imgSrc: string; alt: string }[];
}) => (
  <div>
    <div className="flex flex-col text-left mx-16 lg:mx-32 xl:mx-64 my-12">
      <div className="mt-8 h-1 bg-theme-1" />
      <h2 className="my-8 text-4xl font-semibold">{heading}</h2>
      <p className="text-lg max-w-prose">{body}</p>
      <ul className="grid grid-cols-4 items-center content-start justify-items-start gap-8 list-none pl-0">
        {list.map(({ imgSrc, alt }) => (
          <li className="col-span-1 ">
            <img src={imgSrc} alt={alt} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);
