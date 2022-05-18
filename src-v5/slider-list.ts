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
  cellAlign: 'left' | 'right' | 'center',
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

// eslint-disable-next-line complexity
const getPositioning = (
  cellAlign: 'left' | 'right' | 'center',
  slidesToShow: number,
  count: number,
  currentSlide: number,
  wrapAround?: boolean,
  move?: number
): string => {
  if (!cellAlign || cellAlign === Alignment.Left) {
    const initialValue = wrapAround ? -(count * (100 / (3 * count))) : 0;
    const horizontalMove = getTransition(
      count,
      initialValue,
      currentSlide,
      cellAlign,
      wrapAround
    );
    const draggableMove = move
      ? `calc(${horizontalMove}% - ${move}px)`
      : `${horizontalMove}%`;
    return `translate3d(${draggableMove}, 0, 0)`;
  }
  if (cellAlign === Alignment.Right) {
    const right = slidesToShow > 1 ? (100 / count) * (slidesToShow - 1) : 0;

    // if wrapAround is enabled
    const rightAlignedFirstSlide =
      -(count * (100 / (3 * count))) + (slidesToShow - 1) * (100 / (3 * count));

    const initialValue = wrapAround ? rightAlignedFirstSlide : right;

    const horizontalMove = getTransition(
      count,
      initialValue,
      currentSlide,
      cellAlign,
      wrapAround
    );
    const draggableMove = move
      ? `calc(${horizontalMove}% - ${move}px)`
      : `${horizontalMove}%`;
    return `translate3d(${draggableMove}, 0, 0)`;
  }
  if (cellAlign === Alignment.Center) {
    let initialValue: number;
    if (wrapAround) {
      // Logic for the `wrapAround` branch hasn't been tested for v5, and may
      // need work
      const centerAlignedFirstSlide =
        -(count * (100 / (3 * count))) +
        Math.floor(slidesToShow / 2) * (100 / (3 * count));
      initialValue =
        slidesToShow % 2 === 0
          ? centerAlignedFirstSlide - 100 / (3 * count) / 2
          : centerAlignedFirstSlide;
    } else {
      // If slidesToShow is 1.5, we need 0.25 of a slide of margin.
      // If slidesToShow is 2.6, we need 0.3 of a slide of margin.
      //
      // eslint-disable-next-line no-lonely-if
      if (slidesToShow <= 1) {
        initialValue = 0;
      } else {
        const slideSize = 100 / count;
        const excessSlides = slidesToShow - Math.floor(slidesToShow);
        const excessLeftSlides = excessSlides / 2;
        initialValue = excessLeftSlides * slideSize;
      }
    }

    const horizontalMove = getTransition(
      count,
      initialValue,
      currentSlide,
      cellAlign,
      wrapAround
    );

    const draggableMove = move
      ? `calc(${horizontalMove}% - ${move}px)`
      : `${horizontalMove}%`;
    return `translate3d(${draggableMove}, 0, 0)`;
  }

  return 'translate3d(0, 0, 0)';
};

export const getSliderListStyles = (
  children: ReactNode | ReactNode[],
  currentSlide: number,
  animation: boolean,
  slidesToShow?: number,
  cellAlign?: 'left' | 'right' | 'center',
  wrapAround?: boolean,
  speed?: number,
  move?: number,
  slideAnimation?: 'fade' | 'zoom'
): CSSProperties => {
  const count = React.Children.count(children);

  const width = getSliderListWidth(count, slidesToShow, wrapAround);
  const positioning = getPositioning(
    cellAlign || Alignment.Left,
    slidesToShow || 1,
    count,
    currentSlide,
    wrapAround,
    move
  );

  return {
    width,
    textAlign: 'left',
    transition:
      animation && slideAnimation !== 'fade'
        ? `${speed || 500}ms ease 0s`
        : 'none',
    transform: positioning,
    display: 'flex'
  };
};
