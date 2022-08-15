import React, { CSSProperties, ReactNode } from 'react';
import { Alignment } from './types';

const getSliderListWidth = (
  count: number,
  slidesToShow?: number,
  wrapAround?: boolean
): string => {
  const visibleSlides = slidesToShow || 1;

  if (wrapAround) {
    const percentage = (count * 100) / visibleSlides;
    return `${3 * percentage}%`;
  }
  const percentage = (count * 100) / visibleSlides;
  return `${percentage}%`;
};

const getTransition = (
  count: number,
  initialValue: number,
  currentSlide: number,
  cellAlign: Alignment,
  wrapAround?: boolean
): number => {
  if (cellAlign === Alignment.Left) {
    if (wrapAround) {
      const slideTransition = 100 / (3 * count);
      const currentTransition =
        initialValue - slideTransition * (currentSlide - 1);

      return currentTransition - slideTransition;
    }
    const slideTransition = (100 / count) * currentSlide;
    return -(slideTransition + initialValue);
  } else if (cellAlign === Alignment.Center) {
    if (wrapAround) {
      const slideTransition = 100 / (3 * count);
      const currentTransition =
        initialValue - slideTransition * (currentSlide - 1);

      return currentTransition - slideTransition;
    }
    const slideTransition = (100 / count) * currentSlide;
    return initialValue - slideTransition;
  } else if (cellAlign === Alignment.Right) {
    if (wrapAround) {
      const slideTransition = 100 / (3 * count);
      const currentTransition =
        initialValue - slideTransition * (currentSlide - 1);

      return currentTransition - slideTransition;
    }
    const slideTransition = (100 / count) * currentSlide;
    return initialValue - slideTransition;
  }

  return initialValue;
};

const getPositioning = (
  cellAlign: Alignment,
  slidesToShow: number,
  slideCount: number,
  currentSlide: number,
  wrapAround: boolean,
  draggedOffset: number
): string | undefined => {
  // When wrapAround is enabled, we show the slides 3 times
  const totalCount = wrapAround ? 3 * slideCount : slideCount;
  const slideSize = 100 / totalCount;
  let initialValue = wrapAround ? -slideCount * slideSize : 0;

  if (cellAlign === Alignment.Right && slidesToShow > 1) {
    const excessSlides = slidesToShow - 1;
    initialValue += slideSize * excessSlides;
  }

  if (cellAlign === Alignment.Center && slidesToShow > 1) {
    const excessSlides = slidesToShow - 1;
    // Half of excess is on left and half is on right when centered
    const excessLeftSlides = excessSlides / 2;
    initialValue += slideSize * excessLeftSlides;
  }

  const slideBasedOffset = getTransition(
    slideCount,
    initialValue,
    currentSlide,
    cellAlign,
    wrapAround
  );

  // Special-case this. It's better to return undefined rather than a
  // transform of 0 pixels since transforms can cause flickering in chrome.
  if (draggedOffset === 0 && slideBasedOffset === 0) {
    return undefined;
  }

  return `translate3d(${
    draggedOffset ? `${draggedOffset}px` : `${slideBasedOffset}%`
  }, 0, 0)`;
};

export const getSliderListStyles = (
  children: ReactNode | ReactNode[],
  currentSlide: number,
  isAnimating: boolean,
  slidesToShow: number,
  cellAlign: Alignment,
  wrapAround: boolean,
  speed: number,
  draggedOffset: number,
  slideAnimation?: 'fade' | 'zoom'
): CSSProperties => {
  const count = React.Children.count(children);

  const width = getSliderListWidth(count, slidesToShow, wrapAround);
  const positioning = getPositioning(
    cellAlign,
    slidesToShow,
    count,
    currentSlide,
    wrapAround,
    draggedOffset
  );

  return {
    width,
    textAlign: 'left',
    transition:
      draggedOffset === 0 && isAnimating && slideAnimation !== 'fade'
        ? `${speed}ms ease 0s`
        : undefined,
    transform: positioning,
    display: 'flex'
  };
};
