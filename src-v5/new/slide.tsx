import React, { CSSProperties, ReactNode } from 'react';

const getSlideWidth = (count: number, wrapAround?: boolean): string =>
  `${wrapAround ? 100 / (3 * count) : 100 / count}%`;

const getSlideStyles = (count: number, wrapAround?: boolean): CSSProperties => {
  const width = getSlideWidth(count, wrapAround);

  return {
    width,
    height: '100%',
    display: 'inline-block'
  };
};

const Slide = ({
  count,
  children,
  typeOfSlide,
  wrapAround
}: {
  count: number;
  children: ReactNode | ReactNode[];
  typeOfSlide?: 'prev-cloned' | 'next-cloned';
  wrapAround?: boolean;
}): JSX.Element => (
  <div
    className={`slide ${typeOfSlide || ''}`}
    style={getSlideStyles(count, wrapAround)}
  >
    {children}
  </div>
);

export default Slide;
