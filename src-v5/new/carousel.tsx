import React, { useEffect, useState, useRef } from 'react';
import Slide from './slide';
import { getSliderListStyles } from './slider-list';
import { CarouselProps, Directions } from './types';
import renderControls from './controls';
import defaultProps from './default-carousel-props';

const Carousel = (props: CarouselProps): React.ReactElement => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [animation, setAnimation] = useState<boolean>(true);
  const [direction, setDirection] = useState<Directions | null>(null);
  const [pause, setPause] = useState<boolean>(false);
  const count = React.Children.count(props.children);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextSlide = () => {
    // boundary
    if (
      !(
        props.autoplay &&
        !props.wrapAround &&
        currentSlide < count - props.slidesToShow
      )
    ) {
      setDirection(Directions.Next);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    // boundary
    if (!(props.autoplay && !props.wrapAround && currentSlide > 0)) {
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
      clearTimeout(timer.current);
    }
  }, [currentSlide, pause]);

  useEffect(() => {
    // makes the loop infinity
    if (props.wrapAround) {
      const speed = props.speed || 500;

      if (currentSlide === -props.slidesToShow) {
        // prev
        setTimeout(() => {
          setAnimation(false);
        }, speed);

        setTimeout(() => {
          setCurrentSlide(count - props.slidesToShow);
        }, speed + 50);

        setTimeout(() => {
          setAnimation(true);
        }, speed + 100);
      } else if (currentSlide === count + props.slidesToShow) {
        // next
        setTimeout(() => {
          setAnimation(false);
        }, speed);

        setTimeout(() => {
          setCurrentSlide(props.slidesToShow);
        }, speed + 50);

        setTimeout(() => {
          setAnimation(true);
        }, speed + 100);
      }
    }
  }, [currentSlide]);

  const onMouseEnter = () => {
    if (props.pauseOnHover) {
      setPause(true);
    }
  };

  const onMouseLeave = () => {
    if (props.pauseOnHover) {
      setPause(false);
    }
  };

  const renderSlides = (typeOfSlide?: 'prev-cloned' | 'next-cloned') => {
    const slides = React.Children.map(props.children, (child, index) => (
      <Slide
        key={index}
        count={count}
        typeOfSlide={typeOfSlide}
        wrapAround={props.wrapAround}
      >
        {child}
      </Slide>
    ));

    return slides;
  };

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
          animation,
          props.slidesToShow,
          props.cellAlign,
          props.wrapAround,
          props.speed
        )}
      >
        {props.wrapAround ? renderSlides('prev-cloned') : null}
        {renderSlides()}
        {props.wrapAround ? renderSlides('next-cloned') : null}
      </div>
      {renderControls(props, count, currentSlide, nextSlide, prevSlide)}
    </div>
  );
};

Carousel.defaultProps = defaultProps;

export default Carousel;
