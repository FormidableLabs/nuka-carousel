import React, { CSSProperties, ReactNode } from "react";

const getSlideWidth = (count: number, slidesToShow?: number): string => {
  const visibleSlides = slidesToShow || 1;

  return `${(100 / count)}%`;
}

const getSlideStyles = (
  count: number,
  slidesToShow?: number
): CSSProperties => {
  const width = getSlideWidth(count, slidesToShow)

  return {
    width,
    height: '100%',
    display: 'inline-block',
  }
}

export const renderSlide = (
  children: ReactNode | ReactNode[],
  child: ReactNode,
  index: number,
  slidesToShow?: number
): ReactNode | ReactNode[] => {
  const count = React.Children.count(children)

  return (
    <div
      key={index}
      className="slide"
      style={getSlideStyles(count, slidesToShow)}
    >
      {child}
    </div>
  )
}
