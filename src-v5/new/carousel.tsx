/* eslint-disable complexity */

import React, { useEffect, useState, useRef } from 'react';
import Slide from './slide';
import { getSliderListStyles } from './slider-list';
import { CarouselProps, Directions, KeyCodeFunction } from './types';
import renderControls from './controls';
import defaultProps from './default-carousel-props';
import { getIndexes, addEvent, removeEvent } from './utils';
import AnnounceSlide from './announce-slide';

const Carousel = (props: CarouselProps): React.ReactElement => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [animation, setAnimation] = useState<boolean>(false);
  const [direction, setDirection] = useState<Directions | null>(null);
  const [pause, setPause] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [move, setMove] = useState<number>(0);
  const [keyboardMove, setKeyboardMove] = useState<KeyCodeFunction>(null);
  const carouselWidth = useRef<number | null>(null);

  const count = React.Children.count(props.children);

  const focus = useRef<boolean>(false);
  const prevMove = useRef<number>(0);
  const carouselEl = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextSlide = () => {
    // TODO: change the boundary for cellAlign=center and right
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
    if (props.enableKeyboardControls && keyboardMove && focus.current) {
      switch (keyboardMove) {
        case 'nextSlide':
          nextSlide(); // set boundaries for !wrapAround
          break;
        case 'previousSlide':
          prevSlide(); // set boundaries for !wrapAround
          break;
        case 'firstSlide':
          setCurrentSlide(0);
          break;
        case 'lastSlide':
          setCurrentSlide(count - props.slidesToShow);
          break;
        case 'pause':
          if (pause && props.autoplay) {
            setPause(false);
            break;
          } else if (props.autoplay) {
            setPause(true);
            break;
          }
          break;
      }
      setKeyboardMove(null);
    }
  }, [keyboardMove]);

  const onKeyPress = (e: Event) => {
    if (
      props.enableKeyboardControls &&
      focus.current &&
      (e as KeyboardEvent).keyCode
    ) {
      const keyConfig = props.keyCodeConfig;
      for (const func in keyConfig) {
        if (keyConfig[func].includes((e as KeyboardEvent).keyCode)) {
          setKeyboardMove(func as KeyCodeFunction);
        }
      }
    }
  };

  useEffect(() => {
    if (carouselEl && carouselEl.current) {
      carouselWidth.current = carouselEl.current.offsetWidth;
    } else if (props.innerRef) {
      carouselWidth.current = props.innerRef.current.offsetWidth;
    }

    if (props.enableKeyboardControls) {
      addEvent(document, 'keydown', onKeyPress);
    }

    return () => {
      removeEvent(document, 'keydown', onKeyPress);
    };
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
      } else if (!props.wrapAround && currentSlide > 0) {
        prevSlide();
      } else if (props.wrapAround) {
        prevSlide();
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

      const moveState =
        newPrevValue > 20 && newPrevValue > -20
          ? move + 20
          : move + newPrevValue;

      if (
        !props.wrapAround &&
        props.disableEdgeSwiping &&
        ((currentSlide <= 0 && moveState <= 0) ||
          (moveState > 0 && currentSlide >= count - props.slidesToShow))
      ) {
        return;
      }

      setMove(moveState);
      prevMove.current = moveValue;
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e?.preventDefault();
    const carouselRef = props.innerRef || carouselEl;
    carouselRef?.current?.focus();

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
      const carouselRef = props.innerRef || carouselEl;
      const offsetX =
        e.clientX - (carouselRef.current?.getBoundingClientRect().left || 0);
      const moveValue = (carouselWidth?.current || 0) - offsetX;
      const newPrevValue = moveValue - prevMove.current;

      props.onDragStart(e);

      const moveState =
        newPrevValue > 20 && newPrevValue > -20
          ? move + 20
          : move + newPrevValue;

      if (
        !props.wrapAround &&
        props.disableEdgeSwiping &&
        ((currentSlide <= 0 && moveState <= 0) ||
          (moveState > 0 && currentSlide >= count - props.slidesToShow))
      ) {
        return;
      }

      setMove(moveState);
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
      } else if (!props.wrapAround && currentSlide > 0) {
        prevSlide();
      } else if (props.wrapAround) {
        prevSlide();
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
    const slides = React.Children.map(props.children, (child, index) => {
      const isCurrentSlide = props.wrapAround
        ? currentSlide === index ||
          currentSlide === index + count ||
          currentSlide === index - count
        : currentSlide === index;

      return (
        <Slide
          key={`${typeOfSlide}-${index}`}
          count={count}
          currentSlide={currentSlide}
          index={index}
          isCurrentSlide={isCurrentSlide}
          typeOfSlide={typeOfSlide}
          wrapAround={props.wrapAround}
          cellSpacing={props.cellSpacing}
          animation={props.animation}
          slidesToShow={props.slidesToShow}
          speed={props.speed}
          zoomScale={props.zoomScale}
          cellAlign={props.cellAlign}
        >
          {child}
        </Slide>
      );
    });

    return slides;
  };

  const [slide] = getIndexes(
    currentSlide,
    currentSlide - props.slidesToScroll,
    count
  );

  return (
    <div
      style={{
        position: 'relative',
        padding: props.withoutControls ? 0 : '0 60px 50px'
      }}
    >
      {!props.autoplay && (
        <AnnounceSlide
          message={props.renderAnnounceSlideMessage({
            currentSlide: slide,
            count
          })}
        />
      )}
      <div
        className={['slider-frame', props.className || ''].join(' ').trim()}
        style={{
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
          outline: 'none',
          ...props.style
        }}
        aria-label="carousel-slider"
        role="region"
        tabIndex={0}
        onFocus={() => (focus.current = true)}
        onBlur={() => (focus.current = false)}
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
