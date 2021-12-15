import React, { CSSProperties, ReactNode } from 'react';
import { Alignment } from './types';

const getSliderListWidth = (count: number, slidesToShow?: number): string => {
  const visibleSlides = slidesToShow || 1;

  return `${(count * 100) / visibleSlides}%`;
};

const getInitialPositioning = (
  cellAlign: 'left' | 'right' | 'center',
  slidesToShow: number,
  count: number
): string => {
  if (!cellAlign || cellAlign === Alignment.Left) {
    return 'translate3d(0, 0, 0)';
  }
  if (cellAlign === Alignment.Right) {
    const right =
      slidesToShow > 1 ? `${(100 / count) * (slidesToShow - 1)}%` : 0;
    return `translate3d(${right}, 0, 0)`;
  }
  if (cellAlign === Alignment.Center) {
    const center =
      slidesToShow > 1 ? `${(100 / count) * Math.floor(slidesToShow / 2)}%` : 0;
    return `translate3d(${center}, 0, 0)`;
  }

  return 'translate3d(0, 0, 0)';
};

export const getSliderListStyles = (
  children: ReactNode | ReactNode[],
  slidesToShow?: number,
  cellAlign?: 'left' | 'right' | 'center'
): CSSProperties => {
  const count = React.Children.count(children);

  const width = getSliderListWidth(count, slidesToShow);
  const initialPositioning = getInitialPositioning(
    cellAlign || Alignment.Left,
    slidesToShow || 1,
    count
  );

  return {
    width,
    textAlign: 'left',
    transform: initialPositioning
  };
};
