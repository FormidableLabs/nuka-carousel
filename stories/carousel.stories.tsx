import React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import Carousel from '../src';
import { Carousel as CarouselV5 } from '../src-v5/carousel';
import { Alignment, CarouselProps, ControlProps } from '../src-v5';

export default {
  title: 'Nuka Carousel/Carousel',
  component: CarouselV5,
  args: CarouselV5.defaultProps
} as ComponentMeta<typeof CarouselV5>;

/* Set up story template */
interface StoryProps {
  storySlideCount: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  slideHeights?: number[];
}

const colors = [
  '7732bb',
  '047cc0',
  '00884b',
  'e3bc13',
  'db7c00',
  'aa231f',
  'e3bc13',
  'db7c00',
  'aa231f'
];

// const getHeight = (heightMode: any, index: number) => {
//   switch (heightMode) {
//     case 'first': {
//       return index === 0 ? '600px' : '400px';
//     }
//     case 'current': {
//       return 100 * (index + 1);
//     }
//     default: {
//       return '400px';
//     }
//   }
// };

const Template: Story<CarouselProps & StoryProps> = ({
  storySlideCount = 9,
  slideHeights,
  ...args
}: CarouselProps & StoryProps) => {
  const slides = colors.slice(0, storySlideCount).map((color, index) => (
    <img
      src={`https://via.placeholder.com/800/${color}/ffffff/&text=slide${
        index + 1
      }`}
      alt={`Slide ${index + 1}`}
      key={color}
      style={{
        height:
          slideHeights && index in slideHeights
            ? slideHeights[index]
            : undefined,
        width: '100%'
      }}
    />
  ));
  return (
    <div
      style={{
        display: 'flex',
        gap: '40px',
        padding: '0 20px',
        overflow: 'hidden'
      }}
    >
      <div style={{ width: '50%' }}>
        <p>Carousel</p>
        <Carousel {...args}>{slides}</Carousel>
      </div>
      <div style={{ width: '50%' }}>
        <p>
          Carousel v5 <abbr title="Work in Progress">(WIP)</abbr>
        </p>
        <CarouselV5 {...args}>{slides}</CarouselV5>
      </div>
    </div>
  );
};

// We disable no-explicit-any so that we can use v4 Carousel props in Storybook
// stories. This can be deleted when we no longer want to support the v4
// Carousel in Storybook stories.
/* eslint-disable @typescript-eslint/no-explicit-any */

/* Stories - add common combinations of props here! */
export const Default = Template.bind({});
Default.args = {};

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true
};

export const FadeTransition = Template.bind({});
FadeTransition.args = {
  // Cast to any for v4-only prop
  transitionMode: 'fade'
} as any;

export const Scroll3DTransition = Template.bind({});
Scroll3DTransition.args = {
  // Cast to any for v4-only prop
  transitionMode: 'scroll3d'
} as any;

export const ZoomAnimation = Template.bind({});
ZoomAnimation.args = {
  animation: 'zoom',
  cellAlign: Alignment.Center,
  // Cast to any for v4-only prop
  ...({ slideOffset: 60 } as any)
};

export const WrapAround = Template.bind({});
WrapAround.args = {
  wrapAround: true
};

export const Autoplay = Template.bind({});
Autoplay.args = {
  autoplay: true
};

export const AutoplayReverse = Template.bind({});
AutoplayReverse.args = {
  autoplay: true,
  autoplayReverse: true,
  slideIndex: 8
};

export const AutoplayWithCustomInterval = Template.bind({});
AutoplayWithCustomInterval.args = {
  autoplay: true,
  autoplayInterval: 500
};

export const AutoplayWithoutPauseOnHover = Template.bind({});
AutoplayWithoutPauseOnHover.args = {
  autoplay: true,
  pauseOnHover: false
};

export const WithoutControls = Template.bind({});
WithoutControls.args = {
  withoutControls: true
};

export const WithoutDragging = Template.bind({});
WithoutDragging.args = {
  dragging: false
};

export const WithoutAnimation = Template.bind({});
WithoutAnimation.args = {
  disableAnimation: true
};

export const WithoutEdgeSwiping = Template.bind({});
WithoutEdgeSwiping.args = {
  disableEdgeSwiping: true
};

export const InitialIndex = Template.bind({});
InitialIndex.args = {
  slideIndex: 4
};

export const MultipleSlides = Template.bind({});
MultipleSlides.args = {
  slidesToShow: 3
};

export const MultipleSlidesWithSpacing = Template.bind({});
MultipleSlidesWithSpacing.args = {
  slidesToShow: 3,
  cellSpacing: 10
};

export const ScrollMultipleSlides = Template.bind({});
ScrollMultipleSlides.args = {
  slidesToShow: 3,
  slidesToScroll: 3
};

export const DragMultipleSlides = Template.bind({});
DragMultipleSlides.args = {
  slidesToShow: 3,
  // 'auto' is a v4-only setting
  ...({ slidesToScroll: 'auto' } as any)
};

export const CellAlignCenter = Template.bind({});
CellAlignCenter.args = {
  slidesToShow: 1.5,
  cellAlign: Alignment.Center,
  wrapAround: true
};

export const FramePadding = Template.bind({});
FramePadding.args = {
  // Cast to any for v4-only prop
  framePadding: '20px'
} as any;

export const AdaptiveHeight = Template.bind({});
AdaptiveHeight.args = {
  adaptiveHeight: true,
  slideHeights: [210, 220, 230, 240, 250, 260, 270, 280, 290]
};

export const AdaptiveHeightThreeSlides = Template.bind({});
AdaptiveHeightThreeSlides.args = {
  adaptiveHeight: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  slideHeights: [210, 220, 230, 240, 250, 260, 270, 280, 290]
};

export const CurrentHeightMode = Template.bind({});
CurrentHeightMode.args = {
  // Cast to any for v4-only prop
  heightMode: 'current'
} as any;

export const FirstHeightMode = Template.bind({});
FirstHeightMode.args = {
  // Cast to any for v4-only prop
  heightMode: 'first'
} as any;

export const KeyboardControls = Template.bind({});
KeyboardControls.args = {
  enableKeyboardControls: true
};

export const CustomControls = Template.bind({});
CustomControls.args = {
  wrapAround: true,
  renderCenterLeftControls: (props: ControlProps) => (
    <button
      type="button"
      // eslint-disable-next-line react/jsx-handler-names
      onClick={props.previousSlide}
      aria-label="Previous slide"
      style={{ background: 'none', border: 0, fontSize: '32px' }}
    >
      ⬅️
    </button>
  ),
  renderCenterRightControls: (props: ControlProps) => (
    <button
      type="button"
      // eslint-disable-next-line react/jsx-handler-names
      onClick={props.nextSlide}
      aria-label="Next slide"
      style={{ background: 'none', border: 0, fontSize: '32px' }}
    >
      ➡️
    </button>
  ),
  renderBottomCenterControls: (props: ControlProps) => (
    <ul style={{ display: 'flex', gap: 10, listStyle: 'none', padding: 0 }}>
      {[...new Array(props.slideCount)].map((_, i) => (
        <li key={i}>
          <button
            type="button"
            onClick={() => props.goToSlide(i)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 24,
              height: 24,
              color: props.currentSlide === i ? 'white' : 'black',
              background: props.currentSlide === i ? 'black' : 'white',
              borderRadius: '50%',
              border: 0
            }}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={props.currentSlide === i}
          >
            {i + 1}
          </button>
        </li>
      ))}
    </ul>
  )
};
