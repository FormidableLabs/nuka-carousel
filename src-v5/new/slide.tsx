import React, { CSSProperties, ReactNode } from 'react';

const getSlideWidth = (count: number, wrapAround?: boolean): string =>
  `${wrapAround ? 100 / (3 * count) : 100 / count}%`;

const getSlideStyles = (
  count: number,
  isCurrentSlide: boolean,
  wrapAround?: boolean,
  cellSpacing?: number,
  animation?: 'zoom',
  speed?: number,
  zoomScale?: number
): CSSProperties => {
  const width = getSlideWidth(count, wrapAround);

  return {
    width,
    height: '100%',
    display: 'inline-block',
    padding: `0 ${cellSpacing ? cellSpacing / 2 : 0}px`,
    transition: animation ? `${speed || 500}ms ease 0s` : 'none',
    transform: `${
      animation ? `scale(${isCurrentSlide ? 1 : zoomScale || 0.85})` : 'initial'
    }`
  };
};

const Slide = ({
  count,
  children,
  isCurrentSlide,
  typeOfSlide,
  wrapAround,
  cellSpacing,
  animation,
  speed,
  zoomScale
}: {
  count: number;
  children: ReactNode | ReactNode[];
  isCurrentSlide: boolean;
  typeOfSlide?: 'prev-cloned' | 'next-cloned';
  wrapAround?: boolean;
  cellSpacing?: number;
  animation?: 'zoom';
  speed?: number;
  zoomScale?: number;
}): JSX.Element => (
  <div
    className={`slide ${typeOfSlide || ''}`}
    style={getSlideStyles(
      count,
      isCurrentSlide,
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

export default Slide;
