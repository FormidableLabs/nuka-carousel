import React from 'react';
import { NFLinkButton } from './nf-link-button';

export const LandingBanner = ({ body, cta, heading }) => (
  <div className="flex flex-col text-left mx-16 lg:mx-32 xl:mx-64">
    <div className="mt-8 h-1 bg-theme-1" />

    <h2 className="my-8 text-4xl font-semibold">{heading}</h2>
    <p className="text-lg">{body}</p>
    <NFLinkButton link={cta.link}>{cta.text}</NFLinkButton>
  </div>
);
