import React, { CSSProperties, ReactNode } from 'react';
import { Alignment, Directions } from './types';

const getSliderListWidth = (count: number, slidesToShow?: number): string => {
  const visibleSlides = slidesToShow || 1;

  return `${(count * 100) / visibleSlides}%`;
};

const getTransition = (
  count: number,
  direction: Directions | null,
  initialValue: number,
  currentSlide: number
): number => {
  const slideTransition = (100 / count) * currentSlide;
  const fullTransition = slideTransition; // multiply with slidesToScroll

  if (direction === Directions.Next || direction === Directions.Prev) {
    return -(fullTransition + initialValue);
  }

  return initialValue;
};

const getPositioning = (
  cellAlign: 'left' | 'right' | 'center',
  slidesToShow: number,
  count: number,
  direction: Directions | null,
  currentSlide: number
): string => {
  if (!cellAlign || cellAlign === Alignment.Left) {
    const horizontalMove = getTransition(count, direction, 0, currentSlide);
    return `translate3d(${horizontalMove}%, 0, 0)`;
  }
  if (cellAlign === Alignment.Right) {
    const right = slidesToShow > 1 ? (100 / count) * (slidesToShow - 1) : 0;

    const horizontalMove = getTransition(count, direction, right, currentSlide);
    return `translate3d(${horizontalMove}%, 0, 0)`;
  }
  if (cellAlign === Alignment.Center) {
    const center =
      slidesToShow > 1 ? (100 / count) * Math.floor(slidesToShow / 2) : 0;

    const horizontalMove = getTransition(
      count,
      direction,
      center,
      currentSlide
    );
    return `translate3d(${horizontalMove}%, 0, 0)`;
  }

  return 'translate3d(0, 0, 0)';
};

export const getSliderListStyles = (
  children: ReactNode | ReactNode[],
  direction: Directions | null,
  currentSlide: number,
  slidesToShow?: number,
  cellAlign?: 'left' | 'right' | 'center'
): CSSProperties => {
  const count = React.Children.count(children);

  const width = getSliderListWidth(count, slidesToShow);
  const positioning = getPositioning(
    cellAlign || Alignment.Left,
    slidesToShow || 1,
    count,
    direction,
    currentSlide
  );

  return {
    width,
    textAlign: 'left',
    transition: '500ms ease 0s',
    transform: positioning
  };
};
