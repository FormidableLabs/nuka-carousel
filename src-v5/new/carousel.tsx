import React, { useEffect, useState, useRef } from 'react';
import Slide from './slide';
import { getSliderListStyles } from './slider-list';
import { CarouselProps, Directions } from './types';
import renderControls from './controls';
import defaultProps from './default-carousel-props';
import { getIndexes } from './utils';

const Carousel = (props: CarouselProps): React.ReactElement => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [animation, setAnimation] = useState<boolean>(false);
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
      const [slide, endSlide] = getIndexes(
        currentSlide,
        currentSlide + props.slidesToScroll,
        count
      );
      props.beforeSlide(slide, endSlide);
      !props.disableAnimation && setAnimation(true);

      setDirection(Directions.Next);
      setCurrentSlide(currentSlide + props.slidesToScroll);

      setTimeout(
        () => {
          props.afterSlide(currentSlide);
          !props.disableAnimation && setAnimation(false);
        },
        !props.disableAnimation ? props.speed || 500 : 40
      );
    }
  };

  const prevSlide = () => {
    // boundary
    if (!(props.autoplay && !props.wrapAround && currentSlide > 0)) {
      const [slide, endSlide] = getIndexes(
        currentSlide,
        currentSlide - props.slidesToScroll,
        count
      );
      props.beforeSlide(slide, endSlide);
      !props.disableAnimation && setAnimation(true);
      setDirection(Directions.Prev);
      setCurrentSlide(currentSlide - props.slidesToScroll);
      setTimeout(
        () => {
          props.afterSlide(currentSlide);
          !props.disableAnimation && setAnimation(false);
        },
        !props.disableAnimation ? props.speed || 500 : 40
      ); // if animation is disabled decrease the speed to 40
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
      // if animation is disabled decrease the speed to 40
      const speed = !props.disableAnimation ? props.speed || 500 : 40;

      if (currentSlide <= -props.slidesToShow) {
        // prev
        setTimeout(() => {
          setCurrentSlide(count - -currentSlide);
        }, speed + 10);
      } else if (currentSlide >= count + props.slidesToShow) {
        // next
        setTimeout(() => {
          setCurrentSlide(currentSlide - count);
        }, speed + 10);
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
        cellSpacing={props.cellSpacing}
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
          props.slidesToScroll,
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
