import React from 'react';
import Slide from './slide';
import { getSliderListStyles } from './slider-list';
import { ControlProps } from './types';

const Carousel = (props: ControlProps): React.ReactElement => {
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
        width: '100%'
      }}
    >
      <div
        className="slider-list"
        style={getSliderListStyles(props.children, props.slidesToShow)}
      >
        {slides}
      </div>
    </div>
  );
};

export default Carousel;
