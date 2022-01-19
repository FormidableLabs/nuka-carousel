import React, { CSSProperties, ReactNode } from 'react';
import { Alignment } from './types';

const getSlideWidth = (count: number, wrapAround?: boolean): string =>
  `${wrapAround ? 100 / (3 * count) : 100 / count}%`;

const getSlideStyles = (
  count: number,
  isCurrentSlide: boolean,
  isVisibleSlide: boolean,
  wrapAround?: boolean,
  cellSpacing?: number,
  animation?: 'zoom' | 'fade',
  speed?: number,
  zoomScale?: number
): CSSProperties => {
  const width = getSlideWidth(count, wrapAround);
  const visibleSlideOpacity = isVisibleSlide ? 1 : 0;
  const animationSpeed = animation === 'fade' ? 200 : 500;

  return {
    width,
    height: '100%',
    display: 'inline-block',
    padding: `0 ${cellSpacing ? cellSpacing / 2 : 0}px`,
    transition: animation ? `${speed || animationSpeed}ms ease 0s` : 'none',
    transform: `${
      animation === 'zoom'
        ? `scale(${isCurrentSlide ? 1 : zoomScale || 0.85})`
        : 'initial'
    }`,
    opacity: animation === 'fade' ? visibleSlideOpacity : 1
  };
};

const isVisibleSlide = (
  currentSlide: number,
  index: number,
  slidesToShow: number,
  cellAlign: Alignment
) => {
  if (slidesToShow === 1) {
    return false;
  }

  if (cellAlign === Alignment.Left) {
    return index < currentSlide + slidesToShow && index > currentSlide;
  }

  if (cellAlign === Alignment.Center) {
    return (
      (index >= currentSlide - slidesToShow / 2 && index < currentSlide) ||
      (index > currentSlide && index <= currentSlide + slidesToShow / 2)
    );
  }

  if (cellAlign === Alignment.Right) {
    return index < currentSlide && index > currentSlide - slidesToShow;
  }

  return false;
};

const generateIndex = (
  index: number,
  count: number,
  typeOfSlide?: 'prev-cloned' | 'next-cloned'
): number => {
  if (typeOfSlide === 'prev-cloned') {
    return index - count;
  }

  if (typeOfSlide === 'next-cloned') {
    return index + count;
  }

  return index;
};

const Slide = ({
  count,
  children,
  currentSlide,
  index,
  isCurrentSlide,
  typeOfSlide,
  wrapAround,
  cellSpacing,
  animation,
  speed,
  slidesToShow,
  zoomScale,
  cellAlign
}: {
  count: number;
  children: ReactNode | ReactNode[];
  currentSlide: number;
  index: number;
  isCurrentSlide: boolean;
  typeOfSlide?: 'prev-cloned' | 'next-cloned';
  wrapAround?: boolean;
  cellSpacing?: number;
  animation?: 'zoom' | 'fade';
  speed?: number;
  slidesToShow: number;
  zoomScale?: number;
  cellAlign: Alignment;
}): JSX.Element => {
  const customIndex = wrapAround
    ? generateIndex(index, count, typeOfSlide)
    : index;
  const isVisible = isVisibleSlide(
    currentSlide,
    customIndex,
    slidesToShow,
    cellAlign
  );

  return (
    <div
      className={`slide ${typeOfSlide || ''} ${
        isCurrentSlide || isVisible ? 'slide-visible' : ''
      }`}
      style={getSlideStyles(
        count,
        isCurrentSlide,
        isCurrentSlide || isVisible,
        wrapAround,
        cellSpacing,
        animation,
        speed,
        zoomScale
      )}
    >
      {children}
    </div>
  );
};

export default Slide;
