import React, { CSSProperties, ReactNode } from 'react';

const getSliderListWidth = (count: number, slidesToShow?: number): string => {
  const visibleSlides = slidesToShow || 1;

  return `${(count * 100) / visibleSlides}%`;
};

export const getSliderListStyles = (
  children: ReactNode | ReactNode[],
  slidesToShow?: number
): CSSProperties => {
  const count = React.Children.count(children);

  const width = getSliderListWidth(count, slidesToShow);

  return {
    width,
    textAlign: 'left'
  };
};
