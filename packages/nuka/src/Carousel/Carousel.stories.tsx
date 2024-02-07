import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselProps, SlideHandle } from './Carousel';
import { useRef } from 'react';
import { ExampleSlide } from './ExampleSlide';
import './CarouselStories.css';

const StorybookComponent = (props: CarouselProps) => {
  const ref = useRef<SlideHandle>(null);
  return (
    <div>
      <Carousel ref={ref} {...props} />
      <button
        onClick={() => {
          if (ref.current) ref.current.previousSlide();
        }}
      >
        previous
      </button>
      <button
        onClick={() => {
          if (ref.current) ref.current.nextSlide();
        }}
      >
        next
      </button>
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

export const Default: Story = {
  args: {
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
