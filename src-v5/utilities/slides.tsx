import React, { CSSProperties } from 'react';
import { TransitionProps } from '../types';
import {
  getSlideClassName,
  handleSelfFocus,
  isFullyVisible
} from './utilities';

export const getSlides = (
  children: TransitionProps['children'],
  getSlideStyles: (index: number) => CSSProperties,
  props: TransitionProps,
  slidesPosition: 'left' | 'right' | 'primary'
) => {
  const { currentSlide, slidesToShow } = props;
  const length = React.Children.count(children);

  const elements = React.Children.map(children, (child, index) => {
    const isVisible = isFullyVisible(index, props);
    const inert = isVisible ? {} : { inert: 'true' };
    return (
      <div
        className={`slider-slide slide-${slidesPosition}${getSlideClassName(
          index,
          currentSlide,
          slidesToShow
        )}`}
        aria-label={`slide ${index + 1} of ${length}`}
        role="group"
        style={getSlideStyles(index)}
        key={`${slidesPosition}-${index}`}
        onClick={handleSelfFocus}
        tabIndex={-1}
        {...inert}
      >
        {child}
      </div>
    );
  });

  return elements || [];
};
