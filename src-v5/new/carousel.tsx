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
  const [dragging, setDragging] = useState<boolean>(false);
  const [move, setMove] = useState<number>(0);
  const carouselWidth = useRef<number | null>(null);
  const prevMove = useRef<number>(0);
  const carouselEl = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (carouselEl && carouselEl.current) {
      carouselWidth.current = carouselEl.current.offsetWidth;
    } else if (props.innerRef) {
      carouselWidth.current = props.innerRef.current.offsetWidth;
    }
  }, []);

  const onTouchStart = () => {
    if (!props.swiping) {
      return;
    }
    setDragging(true);
  };

  const onTouchEnd = () => {
    if (!props.dragging) {
      return;
    }
    if (dragging) {
      setDragging(false);
      if (move > 0) {
        if (!props.wrapAround && currentSlide < count - props.slidesToShow) {
          nextSlide();
        } else if (props.wrapAround) {
          nextSlide();
        }
      } else {
        if (!props.wrapAround && currentSlide > 0) {
          prevSlide();
        } else if (props.wrapAround) {
          prevSlide();
        }
      }
      setMove(0);
      prevMove.current = 0;
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!props.dragging) {
      return;
    }
    if (dragging) {
      const moveValue = (carouselWidth?.current || 0) - e.touches[0].pageX;
      const newPrevValue = moveValue - prevMove.current;
      
      props.onDragStart(e);
      setMove(
        newPrevValue > 20 && newPrevValue > -20
          ? move + 20
          : move + newPrevValue
      );
      prevMove.current = moveValue;
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e?.preventDefault();

    if (!props.dragging) {
      return;
    }

    setDragging(true);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!props.dragging) {
      return;
    }
    if (dragging) {
      const carouselRef = props.innerRef || carouselEl
      const offsetX = e.clientX - (carouselRef.current?.getBoundingClientRect().left || 0)
      const moveValue = (carouselWidth?.current || 0) - offsetX;
      const newPrevValue = moveValue - prevMove.current;

      props.onDragStart(e);

      setMove(
        newPrevValue > 20 && newPrevValue > -20
          ? move + 20
          : move + newPrevValue
      );
      prevMove.current = moveValue;
    }
  };
  const onMouseUp = (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.preventDefault();
    if (!props.dragging) {
      return;
    }
    if (dragging) {
      setDragging(false);
      if (move > 0) {
        if (!props.wrapAround && currentSlide < count - props.slidesToShow) {
          nextSlide();
        } else if (props.wrapAround) {
          nextSlide();
        }
      } else {
        if (!props.wrapAround && currentSlide > 0) {
          prevSlide();
        } else if (props.wrapAround) {
          prevSlide();
        }
      }
      setMove(0);
      prevMove.current = 0;
    }
  };

  const onMouseEnter = () => {
    if (props.pauseOnHover) {
      setPause(true);
    }
  };

  const onMouseLeave = () => {
    if (props.pauseOnHover) {
      setPause(false);
    }
    onMouseUp();
  };

  const renderSlides = (typeOfSlide?: 'prev-cloned' | 'next-cloned') => {
    const slides = React.Children.map(props.children, (child, index) => (
      <Slide
        key={index}
        count={count}
        typeOfSlide={typeOfSlide}
        wrapAround={props.wrapAround}
        cellSpacing={props.cellSpacing}
        animation={props.animation}
      >
        {child}
      </Slide>
    ));

    return slides;
  };

  return (
    <div style={{
      position: 'relative',
      padding: props.withoutControls ? 0 : '0 60px 50px'
    }}>

      <div
        className={['slider-frame', props.className || ''].join(' ').trim()}
        style={{
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
          ...props.style
        }}
        ref={props.innerRef || carouselEl}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
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
            props.speed,
            move
          )}
        >
          {props.wrapAround ? renderSlides('prev-cloned') : null}
          {renderSlides()}
          {props.wrapAround ? renderSlides('next-cloned') : null}
        </div>
      </div>
      {renderControls(props, count, currentSlide, nextSlide, prevSlide)}
    </div>
  );
};

Carousel.defaultProps = defaultProps;

export default Carousel;
