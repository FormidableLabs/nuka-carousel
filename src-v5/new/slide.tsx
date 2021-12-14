import React, { CSSProperties, ReactNode } from 'react';

const getSlideWidth = (count: number): string => `${100 / count}%`;

const getSlideStyles = (count: number): CSSProperties => {
  const width = getSlideWidth(count);

  return {
    width,
    height: '100%',
    display: 'inline-block'
  };
};

const Slide = ({
  count,
  children
}: {
  count: number;
  children: ReactNode | ReactNode[];
}): JSX.Element => (
  <div className="slide" style={getSlideStyles(count)}>
    {children}
  </div>
);

export default Slide;
