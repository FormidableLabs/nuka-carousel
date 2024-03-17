import type { Meta, StoryObj } from '@storybook/react';
import { within, waitFor, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
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
  title: 'TestRunners',
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
      expect(canvas.getByTestId('nuka-overflow').scrollLeft).toEqual(
        FIXED_SCROLL_DISTANCE
      );
    });
    await userEvent.click(backButton);

    await waitFor(async () => {
      expect(canvas.getByTestId('nuka-overflow').scrollLeft).toEqual(0);
    });
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const overflow = canvas.getByTestId('nuka-overflow');

    await expect(canvas.getByTestId('nuka-wrapper').classList).toContain(
      'slide__with-gap'
    );
    const forwardButton = canvas.getByText('next');

    await userEvent.click(forwardButton);

    await waitFor(async () => {
      expect(overflow.scrollLeft).toEqual(
        (canvas.getByTestId('nuka-wrapper').children[1] as HTMLElement)
          .offsetLeft - overflow.offsetLeft
      );
    });

    await userEvent.click(forwardButton);

    await waitFor(async () => {
      expect(canvas.getByTestId('nuka-overflow').scrollLeft).toEqual(
        (canvas.getByTestId('nuka-wrapper').children[2] as HTMLElement)
          .offsetLeft - canvas.getByTestId('nuka-overflow').offsetLeft
      );
    });

    overflow.scrollBy({ left: 1000000, behavior: 'instant' });

    setTimeout(async () => {
      await userEvent.click(forwardButton);
      await waitFor(async () => {
        expect(canvas.getByTestId('nuka-overflow').scrollLeft).toEqual(0);
      });
    }, 300);
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

const AUTOPLAY_INTERVAL_IN_MS = 2000;
export const AutoPlay: Story = {
  args: {
    scrollDistance: 'slide',
    autoplay: true,
    autoplayInterval: AUTOPLAY_INTERVAL_IN_MS,
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <FullWidthSlide key={index} index={index} />
        ))}
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const overflow = canvas.getByTestId('nuka-overflow');
    expect(canvas.getByTestId('nuka-overflow').scrollLeft).toEqual(0);

    setTimeout(async () => {
      await waitFor(async () => {
        expect(canvas.getByTestId('nuka-overflow').scrollLeft).toEqual(
          (overflow.children[0].children[1] as HTMLElement).offsetLeft -
            overflow.offsetLeft
        );
      });
    }, AUTOPLAY_INTERVAL_IN_MS);
  },
};

const CURRENT_PAGE_INDICATOR_CLASSNAME = 'indicator__current';
const GENERAL_PAGE_INDICATOR_CLASSNAME = 'indicator';
const PAGE_INDICATOR_CONTAINER_CLASSNAME = 'indicator--container';

export const PageIndicators: Story = {
  args: {
    scrollDistance: 'screen',
    showPageIndicators: true,
    pageIndicatorProps: {
      currentPageIndicatorClassName: CURRENT_PAGE_INDICATOR_CLASSNAME,
      pageIndicatorClassName: GENERAL_PAGE_INDICATOR_CLASSNAME,
      containerClassName: PAGE_INDICATOR_CONTAINER_CLASSNAME,
    },
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const carouselWidth = canvas.getByTestId('nuka-wrapper').clientWidth;

    const pageIndicatorContainer = canvas.getByTestId('pageIndicatorContainer');

    await expect(pageIndicatorContainer).toBeInTheDocument();
    await expect(pageIndicatorContainer).toHaveClass(
      PAGE_INDICATOR_CONTAINER_CLASSNAME
    );
    await expect(
      pageIndicatorContainer.getElementsByClassName(
        GENERAL_PAGE_INDICATOR_CLASSNAME
      ).length
    ).toBe(pageIndicatorContainer.children.length);

    await waitFor(async () => {
      userEvent.click(pageIndicatorContainer.children[1]);
      expect(canvas.getByTestId('nuka-overflow').scrollLeft).toEqual(carouselWidth);
    });

    await waitFor(async () => {
      userEvent.click(pageIndicatorContainer.children[0]);
      expect(canvas.getByTestId('nuka-overflow').scrollLeft).toEqual(0);
    });
  },
};

const beforeFn = jest.fn();

export const BeforeSlide: Story = {
  args: {
    beforeSlide: beforeFn,
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(beforeFn).not.toHaveBeenCalled();

    const forwardButton = canvas.getByText('next');
    await userEvent.click(forwardButton);
    await expect(beforeFn).toHaveBeenCalled();
  },
};

const afterFn = jest.fn();
export const AfterSlide: Story = {
  args: {
    afterSlide: afterFn,
    children: (
      <>
        {[...Array(10)].map((_, index) => (
          <ExampleSlide key={index} index={index} />
        ))}
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(afterFn).not.toHaveBeenCalled();

    const forwardButton = canvas.getByText('next');
    userEvent.click(forwardButton);
    expect(afterFn).not.toHaveBeenCalled(); // should not be immediately called
    await waitFor(async () => {
      await expect(afterFn).toHaveBeenCalled();
    });
  },
};
