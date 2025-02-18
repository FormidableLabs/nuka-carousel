import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

import { Carousel } from './Carousel';
import {
  ExampleSlide,
  FocusableLinkSlide,
  FullWidthSlide,
} from './ExampleSlide';

import './CarouselStories.css';
import { CarouselProps, SlideHandle } from '../types';

const StorybookComponent = (props: CarouselProps) => {
  const ref = useRef<SlideHandle>(null);
  return (
    <div>
      <button
        onClick={() => {
          if (ref.current) ref.current.goBack();
        }}
      >
        previous
      </button>
      <button
        onClick={() => {
          if (ref.current) ref.current.goForward();
        }}
      >
        next
      </button>
      <Carousel ref={ref} {...props} />
    </div>
  );
};

const meta: Meta<typeof Carousel> = {
  title: 'components/Carousel',
  component: StorybookComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const FixedWidthScroll: Story = {
  args: {
    scrollDistance: 200,
    children: (
      <>
        {[...Array(6)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
};

export const Slide: Story = {
  args: {
    scrollDistance: 'slide',
    className: 'slide__with-gap',
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    scrollDistance: 'slide',
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <FullWidthSlide key={index} index={index} />
        ))}
      </>
    ),
  },
};

export const Screen: Story = {
  args: {
    scrollDistance: 'screen',
    className: 'slide__with-gap',
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
};

export const AutoPlay: Story = {
  args: {
    scrollDistance: 'slide',
    autoplay: true,
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <FullWidthSlide key={index} index={index} />
        ))}
      </>
    ),
  },
};

export const PageIndicators: Story = {
  args: {
    scrollDistance: 'screen',
    showDots: true,
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
};

export const FocusableCards: Story = {
  args: {
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <FocusableLinkSlide key={index} index={index} />
        ))}
      </>
    ),
  },
};

const CustomGoToPageRenderComponent = (props: CarouselProps) => {
  const ref = useRef<SlideHandle>(null);
  return (
    <div>
      <button
        onClick={() => {
          if (ref.current) {
            ref.current.goToPage(2);
          }
        }}
      >
        Go to Page 2
      </button>
      <Carousel ref={ref} {...props} />
    </div>
  );
};

export const GoToPage: Story = {
  render: CustomGoToPageRenderComponent,
  args: {
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
};

export const InitialPage: Story = {
  args: {
    initialPage: 2,
    scrollDistance: 'slide',
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
};

export const BeforeSlide: Story = {
  args: {
    beforeSlide: (currentSlideIndex, endSlideIndex) =>
      console.log(
        'Function was called before scroll occurred ',
        currentSlideIndex,
        endSlideIndex,
      ),
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
};

export const AfterSlide: Story = {
  args: {
    afterSlide: (endSlideIndex) =>
      console.log('Function was called after scroll occurred ', endSlideIndex),
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
};
