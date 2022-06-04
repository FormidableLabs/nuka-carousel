import React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import Carousel, {
  Alignment,
  ControlProps,
  InternalCarouselProps
} from '../src/index';

export default {
  title: 'Nuka Carousel/Carousel',
  component: Carousel,
  args: {
    storySlideCount: 9,
    ...Carousel.defaultProps
  }
} as ComponentMeta<typeof Carousel>;

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

const Template: Story<InternalCarouselProps & StoryProps> = ({
  storySlideCount = 9,
  slideHeights,
  ...args
}) => {
  const slides = colors.slice(0, storySlideCount).map((color, index) => (
    <img
      src={`https://via.placeholder.com/800/${color}/ffffff/&text=slide${
        index + 1
      }`}
      alt={`Slide ${index + 1}`}
      key={color}
      style={{
        height: slideHeights?.[index] ?? undefined,
        width: '100%'
      }}
    />
  ));
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: '0px auto'
        }}
      >
        <Carousel {...args}>{slides}</Carousel>
      </div>
    </div>
  );
};

/* Stories - add common combinations of props here! */
export const Default = Template.bind({});
Default.args = {};

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true
};

// export const FadeTransition = Template.bind({});
// FadeTransition.args = {
//   transitionMode: 'fade'
// };

// export const Scroll3DTransition = Template.bind({});
// Scroll3DTransition.args = {
//   transitionMode: 'scroll3d'
// };

export const ZoomAnimation = Template.bind({});
ZoomAnimation.args = {
  animation: 'zoom',
  cellAlign: Alignment.Center
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
  slidesToShow: 3
};

export const CellAlignCenter = Template.bind({});
CellAlignCenter.args = {
  slidesToShow: 2.5,
  cellAlign: Alignment.Center
};

export const CellAlignCenterWrapAround = Template.bind({});
CellAlignCenterWrapAround.args = {
  slidesToShow: 2.5,
  cellAlign: Alignment.Center,
  wrapAround: true
};

export const CellAlignRight = Template.bind({});
CellAlignRight.args = {
  slidesToShow: 2.5,
  cellAlign: Alignment.Right
};

export const CellAlignRightWrapAround = Template.bind({});
CellAlignRightWrapAround.args = {
  slidesToShow: 2.5,
  cellAlign: Alignment.Right,
  wrapAround: true
};

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
