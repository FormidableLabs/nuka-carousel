import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselProps, SlideHandle } from './Carousel';
import { useRef, useState } from 'react';
import {
  ExampleSlide,
  FocusableLinkSlide,
  FullWidthSlide,
} from './ExampleSlide';
import './CarouselStories.css';

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
    wrapperClassName: 'slide__with-gap',
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
    wrapperClassName: 'slide__with-gap',
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
    showPageIndicators: true,
    pageIndicatorProps: {
      currentPageIndicatorClassName: 'indicator__current',
      pageIndicatorClassName: 'indicator',
      containerClassName: 'indicator-container',
    },
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

export const GoToIndex: Story = {
  render: (props) => {
    const ref = useRef<SlideHandle>(null);
    const [randomInRangeIndex, setRandomInRangeIndex] = useState(
      Math.floor(Math.random() * 7)
    );
    return (
      <div>
        <button
          onClick={() => {
            if (ref.current) {
              ref.current.goToIndex(randomInRangeIndex);
              setRandomInRangeIndex(Math.floor(Math.random() * 7));
            }
          }}
        >
          Go to Random Index {randomInRangeIndex}
        </button>
        <Carousel ref={ref} {...props} />
      </div>
    );
  },
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
