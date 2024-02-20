import type { Meta, StoryObj } from '@storybook/react';
import { within, waitFor, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Carousel, CarouselProps, SlideHandle } from './Carousel';
import { useRef } from 'react';
import { ExampleSlide, FullWidthSlide } from './ExampleSlide';
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

const FIXED_SCROLL_DISTANCE = 200;

export const FixedWidthScroll: Story = {
  args: {
    scrollDistance: FIXED_SCROLL_DISTANCE,
    children: (
      <>
        {[...Array(6)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const backButton = canvas.getByText('previous');
    const forwardButton = canvas.getByText('next');

    await expect(backButton).toBeInTheDocument();
    await expect(forwardButton).toBeInTheDocument();

    await userEvent.click(forwardButton);

    await waitFor(async () => {
      expect(canvas.getByTestId('overflow').scrollLeft).toEqual(
        FIXED_SCROLL_DISTANCE
      );
    });
    await userEvent.click(backButton);

    await waitFor(async () => {
      expect(canvas.getByTestId('overflow').scrollLeft).toEqual(0);
    });
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
