import React from 'react';

export const DocumentationBanner = () => (
  <div className="text-[#000e38] bg-[#00e6a4]">
    <div className="flex flex-col text-left mx-16 lg:mx-32 xl:mx-64 mt-12 py-12">
      <h2 className="my-8 text-4xl font-semibold">Get Started</h2>
      <p className="text-lg">
        Build a performative, fully accessible and customizable carousel today!
      </p>
      <a
        href="/docs"
        className="rounded-md bg-[#dd4add] w-min px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#b13bb1] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b13bb1]"
      >
        Documentation
      </a>
    </div>
  </div>
);
