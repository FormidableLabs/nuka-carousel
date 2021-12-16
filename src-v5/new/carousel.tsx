import React, { useState } from 'react';
import Slide from './slide';
import { getSliderListStyles } from './slider-list';
import { CarouselProps, Directions } from './types';
import renderControls from './controls';
import defaultProps from './default-carousel-props';

const Carousel = (props: CarouselProps): React.ReactElement => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<Directions | null>(null);

  const nextSlide = () => {
    setDirection(Directions.Next);
    setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    setDirection(Directions.Prev);
    setCurrentSlide(currentSlide - 1);
  };

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
        position: 'relative',
        ...props.style
      }}
    >
      <div
        className="slider-list"
        style={getSliderListStyles(
          props.children,
          direction,
          currentSlide,
          props.slidesToShow,
          props.cellAlign
        )}
      >
        {slides}
      </div>
      {renderControls(props, count, currentSlide, nextSlide, prevSlide)}
    </div>
  );
};

Carousel.defaultProps = defaultProps;

export default Carousel;
