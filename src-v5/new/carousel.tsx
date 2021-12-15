import React from 'react';
import Slide from './slide';
import { getSliderListStyles } from './slider-list';
import { CarouselProps } from './types';
import renderControls from './controls';
import defaultProps from './default-carousel-props';

const Carousel = (props: CarouselProps): React.ReactElement => {
  const count = React.Children.count(props.children);
  const slides = React.Children.map(props.children, (child, index) => (
    <Slide key={index} count={count}>
      {child}
    </Slide>
  ));

  return (
    <div
      className="slider-frame"
      style={{
        overflow: 'hidden',
        width: '100%',
        position: 'relative'
      }}
    >
      <div
        className="slider-list"
        style={getSliderListStyles(
          props.children,
          props.slidesToShow,
          props.cellAlign
        )}
      >
        {slides}
      </div>
      {renderControls(props, count)}
    </div>
  );
};

Carousel.defaultProps = defaultProps;

export default Carousel;
