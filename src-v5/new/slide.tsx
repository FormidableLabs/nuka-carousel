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

export const renderSlide = (
  children: ReactNode | ReactNode[],
  child: ReactNode,
  index: number
): ReactNode | ReactNode[] => {
  const count = React.Children.count(children);

  return (
    <div key={index} className="slide" style={getSlideStyles(count)}>
      {child}
    </div>
  );
};
