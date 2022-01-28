/* eslint-disable complexity */

import React, { useEffect, useState, useRef } from 'react';
import Slide from './slide';
import { getSliderListStyles } from './slider-list';
import { CarouselProps, KeyCodeFunction } from './types';
import renderControls from './controls';
import defaultProps from './default-carousel-props';
import { getIndexes, addEvent, removeEvent } from './utils';
import AnnounceSlide from './announce-slide';

const Carousel = (props: CarouselProps): React.ReactElement => {
  const count = React.Children.count(props.children);

  const [currentSlide, setCurrentSlide] = useState<number>(
    props.autoplayReverse ? count - props.slidesToShow : 0
  );
  const [animation, setAnimation] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [move, setMove] = useState<number>(0);
  const [keyboardMove, setKeyboardMove] = useState<KeyCodeFunction>(null);
  const carouselWidth = useRef<number | null>(null);

  const focus = useRef<boolean>(false);
  const prevMove = useRef<number>(0);
  const carouselEl = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef<boolean>(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  const slidesToScroll =
    props.animation === 'fade' ? props.slidesToShow : props.slidesToScroll;
  const dragThreshold = (carouselWidth.current || 0) / 5;
  const carouselRef = props.innerRef || carouselEl;

  const moveSlide = (to?: number) => {
    const [slide, endSlide] = getIndexes(
      currentSlide,
      currentSlide - slidesToScroll,
      count
    );
    to && props.beforeSlide(slide, endSlide);
    !props.disableAnimation && setAnimation(true);

    setCurrentSlide(to ?? currentSlide);
    setTimeout(
      () => {
        if (!isMounted.current) return;
        to && props.afterSlide(currentSlide);
        !props.disableAnimation && setAnimation(false);
      },
      !props.disableAnimation ? props.speed || 500 : 40
    ); // if animation is disabled decrease the speed to 40
  };

  const nextSlide = () => {
    // TODO: change the boundary for cellAlign=center and right
    // boundary
    if (props.wrapAround || currentSlide < count - props.slidesToShow) {
      moveSlide(currentSlide + slidesToScroll);
    } else {
      moveSlide();
    }
  };

  const prevSlide = () => {
    // boundary
    if (props.wrapAround || currentSlide > 0) {
      moveSlide(currentSlide - slidesToScroll);
    } else {
      moveSlide();
    }
  };

  useEffect(() => {
    if (props.autoplay && !animation && props.wrapAround) {
      if (currentSlide > count) {
        setCurrentSlide(currentSlide - count);
        if (timer?.current) {
          clearTimeout(timer.current);
        }
      } else if (currentSlide < 0) {
        setCurrentSlide(count - -currentSlide);
        if (timer?.current) {
          clearTimeout(timer.current);
        }
      }
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [animation, currentSlide]);

  useEffect(() => {
    if (props.autoplay && !pause) {
      timer.current = setTimeout(() => {
        if (props.autoplayReverse) {
          if (!props.wrapAround && currentSlide > 0) {
            prevSlide();
          } else if (props.wrapAround) {
            prevSlide();
          }
        } else if (
          !props.wrapAround &&
          currentSlide < count - props.slidesToShow
        ) {
          nextSlide();
        } else if (props.wrapAround) {
          nextSlide();
        }
      }, props.autoplayInterval);
    }

    // Clear the timeout if user hover on carousel
    if (props.autoplay && pause && timer?.current) {
      clearTimeout(timer.current);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [currentSlide, pause]);

  useEffect(() => {
    // makes the loop infinity
    if (props.wrapAround && !props.autoplay) {
      // if animation is disabled decrease the speed to 0
      const speed = !props.disableAnimation ? props.speed || 500 : 0;

      if (currentSlide <= -props.slidesToShow) {
        // prev
        setTimeout(() => {
          if (!isMounted.current) return;
          setCurrentSlide(count - -currentSlide);
        }, speed + 10);
      } else if (currentSlide >= count) {
        // next
        setTimeout(() => {
          if (!isMounted.current) return;
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
        if (
          keyConfig[func as keyof typeof keyConfig]?.includes(
            (e as KeyboardEvent).keyCode
          )
        ) {
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

  const handleDragEnd = () => {
    if (!props.dragging || !dragging) return;

    setDragging(false);

    if (Math.abs(move) <= dragThreshold) {
      moveSlide();
      setMove(0);
      prevMove.current = 0;
      return;
    }

    if (move > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    setMove(0);
    prevMove.current = 0;
  };

  const onTouchStart = () => {
    if (!props.swiping) {
      return;
    }
    setDragging(true);
  };

  const handlePointerMove = (m: number) => {
    if (!props.dragging || !dragging) return;

    const moveValue = m * 0.75; // Friction
    const moveState = move + (moveValue - prevMove.current);

    // Exit drag early if passed threshold
    if (Math.abs(move) > dragThreshold) {
      handleDragEnd();
      return;
    }

    if (
      !props.wrapAround &&
      props.disableEdgeSwiping &&
      ((currentSlide <= 0 && moveState <= 0) ||
        (moveState > 0 && currentSlide >= count - props.slidesToShow))
    ) {
      prevMove.current = moveValue;
      return;
    }

    if (prevMove.current !== 0) {
      setMove(moveState);
    }

    prevMove.current = moveValue;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!props.dragging || !dragging) return;

    props.onDragStart(e);

    const moveValue = (carouselWidth?.current || 0) - e.touches[0].pageX;

    handlePointerMove(moveValue);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e?.preventDefault();
    carouselRef?.current?.focus();

    if (!props.dragging) return;

    setDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!props.dragging || !dragging) return;

    props.onDragStart(e);

    const offsetX =
      e.clientX - (carouselRef.current?.getBoundingClientRect().left || 0);
    const moveValue = (carouselWidth?.current || 0) - offsetX;

    handlePointerMove(moveValue);
  };

  const onMouseUp = (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.preventDefault();
    handleDragEnd();
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
    currentSlide - slidesToScroll,
    count
  );

  return (
    <div
      className={'slider-container'}
      style={{
        position: 'relative',
        padding: props.withoutControls ? 0 : '0 60px 50px'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnnounceSlide
        ariaLive={props.autoplay && !pause ? 'off' : 'polite'}
        message={props.renderAnnounceSlideMessage({
          currentSlide: slide,
          count
        })}
      />

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
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={handleDragEnd}
        onTouchMove={onTouchMove}
      >
        <div
          className="slider-list"
          style={getSliderListStyles(
            props.children,
            currentSlide,
            animation,
            props.slidesToShow,
            props.cellAlign,
            props.wrapAround,
            props.speed,
            move,
            props.animation
          )}
        >
          {props.wrapAround ? renderSlides('prev-cloned') : null}
          {renderSlides()}
          {props.wrapAround ? renderSlides('next-cloned') : null}
        </div>
      </div>
      {renderControls(
        props,
        count,
        currentSlide,
        nextSlide,
        prevSlide,
        slidesToScroll
      )}
    </div>
  );
};

Carousel.defaultProps = defaultProps;

export default Carousel;
