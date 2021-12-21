import React, { useEffect, useState, useRef, MutableRefObject } from 'react';
import Slide from './slide';
import { getSliderListStyles } from './slider-list';
import { CarouselProps, Directions } from './types';
import renderControls from './controls';
import defaultProps from './default-carousel-props';

const Carousel = (props: CarouselProps): React.ReactElement => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<Directions | null>(null);
  const [pause, setPause] = useState<boolean>(false);
  const count = React.Children.count(props.children);
  const timer: MutableRefObject<ReturnType<typeof setTimeout> | null> = useRef(null)

  const nextSlide = () => {
    // boundary
    if (currentSlide < count - props.slidesToShow) {
      setDirection(Directions.Next);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    // boundary
    if (currentSlide > 0) {
      setDirection(Directions.Prev);
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {

    if (
      props.autoplay &&
      currentSlide >= 0 &&
      currentSlide < count - props.slidesToShow &&
      !pause
    ) {
      timer.current = setTimeout(() => {
        if (props.autoplayReverse) {
          prevSlide();
        } else {
          nextSlide();
        }
      }, props.autoplayInterval);
    }

    // Clear the timeout if user hover on carousel
    if (props.autoplay && pause && timer?.current) {
      clearTimeout(timer.current)
    }
  }, [currentSlide, pause]);

  const onMouseEnter = () => {
    if (props.pauseOnHover) {
      setPause(true)
    }
  }

  const onMouseLeave = () => {
    if (props.pauseOnHover) {
      setPause(false)
    }
  }

  const slides = React.Children.map(props.children, (child, index) => (
    <Slide key={index} count={count}>
      {child}
    </Slide>
  ));

  return (
    <div
      className={['slider-frame', props.className || ''].join(' ').trim()}
      style={{
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
        ...props.style
      }}
      ref={props.innerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
