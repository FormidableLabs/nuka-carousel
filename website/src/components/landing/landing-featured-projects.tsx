import React from 'react';
import {
  SpectacleBadge,
  FigLogBadge,
  EnvyBadge,
  VictoryBadge,
} from 'formidable-oss-badges';
import { NFLinkButton } from './nf-link-button';
import { LandingDivider } from './landing-divider';

const projects = [
  {
    name: 'spectacle',
    Component: SpectacleBadge,
    link: 'https://commerce.nearform.com/open-source/spectacle',
    description:
      'A React.js based library for creating sleek presentations using JSX syntax with the ability to live demo your code!',
  },
  {
    name: 'figlog',
    Component: FigLogBadge,
    link: 'https://github.com/FormidableLabs/FigLog',
    description:
      'FigLog is the easiest and most efficient way to document team decisions and the evolution of your changes in Figma.',
    title: 'FigLog',
  },
  {
    name: 'envy',
    Component: EnvyBadge,
    link: 'https://github.com/FormidableLabs/envy',
    description:
      'Envy will trace the network calls from every application in your stack and allow you to view them in a central place.',
  },
  {
    name: 'victory',
    Component: VictoryBadge,
    link: 'https://commerce.nearform.com/open-source/victory/',
    description:
      'React.js components for modular charting and data visualization.',
  },
];

export const LandingFeaturedProjects = ({
  heading,
  showDivider,
}: {
  heading: string;
  showDivider?: boolean;
}) => (
  <div className="flex flex-col text-left mx-16 lg:mx-32 xl:mx-64 mt-12 py-12">
    {showDivider && <LandingDivider />}
    <h2 className="my-8 text-4xl font-semibold">{heading}</h2>
    <div className="grid grid-cols-2 gap-8">
      {projects.map(({ name, Component, link, description, title }) => (
        <a
          href={link}
          key={link}
          className="col-span-2 sm:col-span-1 block grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 align-center items-center text-theme-2 hover:text-theme-2 dark:text-white dark:hover:text-white"
        >
          <Component isHoverable className="col-span-1 max-w-full" />
          <span className="flex flex-col col-span-1 lg:col-span-2">
            <span className="text-xl font-semibold capitalize">
              {title || name}
            </span>
            <span className="text-sm ">{description}</span>
          </span>
        </a>
      ))}
    </div>

    <div className="my-8 pt-8 align-center">
      <NFLinkButton link="https://commerce.nearform.com/open-source">
        View All Projects
      </NFLinkButton>
    </div>
  </div>
);
