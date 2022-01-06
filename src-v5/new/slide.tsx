import React, { CSSProperties, ReactNode } from 'react';

const getSlideWidth = (count: number, wrapAround?: boolean): string =>
  `${wrapAround ? 100 / (3 * count) : 100 / count}%`;

const getSlideStyles = (
  count: number,
  wrapAround?: boolean,
  cellSpacing?: number
): CSSProperties => {
  const width = getSlideWidth(count, wrapAround);

  return {
    width,
    height: '100%',
    display: 'inline-block',
    padding: `0 ${cellSpacing ? cellSpacing / 2 : 0}px`
  };
};

const Slide = ({
  count,
  children,
  typeOfSlide,
  wrapAround,
  cellSpacing
}: {
  count: number;
  children: ReactNode | ReactNode[];
  typeOfSlide?: 'prev-cloned' | 'next-cloned';
  wrapAround?: boolean;
  cellSpacing?: number;
}): JSX.Element => (
  <div
    className={`slide ${typeOfSlide || ''}`}
    style={getSlideStyles(count, wrapAround, cellSpacing)}
  >
    {children}
  </div>
);

export default Slide;
