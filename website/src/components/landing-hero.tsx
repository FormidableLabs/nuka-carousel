import React from 'react';
import { FeaturedBadge } from 'formidable-oss-badges';

export const LandingHero = () => (
  <div className="relative isolate overflow-hidden pt-14 dark:text-white text-[#000e38] mx-16 lg:mx-32 xl:mx-64 ">
    <div className="flex justify-between gap-16 lg:gap-24 py-24 mx-auto">
      <div>
        <FeaturedBadge name="nuka" className="h-[320px] w-[320px]" />
      </div>
      <div className="text-left lg:w-6/12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Nuka Carousel
        </h1>
        <p className="mt-6 text-lg leading-8">
          Small, fast, and accessibility-first React carousel library with
          easily customizable UI and behavior to fit your brand and site.
        </p>
        <div className="mt-10 flex flex-wrap flex-col xl:flex-row xl:items-center justify-start gap-6">
          <button
            className="lg:max-w-fit grid lg:grid-cols-6 align-center rounded-md shadow-sm border-none bg-white my-0 py-0 px-0 text-sm font-semibold text-[#dd4add] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b13bb1]"
            onClick={() =>
              navigator.clipboard.writeText('pnpm add nuka-carousel')
            }
          >
            <code className="max-w-fit py-2.5 pl-3.5 content-center grid-span-12 lg:col-span-4 border-0 bg-white">
              pnpm add nuka-carousel
            </code>
            <span className="w-full lg:min-w-fit col-span-2 capitalize rounded-b-md lg:rounded-l-none lg:!rounded-r-md text-white bg-[#dd4add] lg:ml-2 pr-3.5 lg:pl-2.5 py-2.5 h-full">
              Copy
            </span>
          </button>
        </div>
        <nav className="mt-6">
          <ul className="list-none flex justify-items-start content-start items-start align-left pl-0 gap-6 lg:gap-12 font-bold">
            <li>
              <a href="/docs">Documentation</a>
            </li>
            <li>
              <a href="#demo">Demo</a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://github.com/FormidableLabs/nuka-carousel"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
);
