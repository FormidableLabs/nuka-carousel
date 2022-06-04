import React, { useCallback, useEffect, useRef, useState } from 'react';
import Slide from './slide';
import AnnounceSlide from './announce-slide';
import { getSliderListStyles } from './slider-list';
import { CarouselProps, InternalCarouselProps, KeyCodeFunction } from './types';
import renderControls from './controls';
import defaultProps from './default-carousel-props';
import {
  addEvent,
  getIndexes,
  getNextMoveIndex,
  getPrevMoveIndex,
  removeEvent
} from './utils';
import { useFrameHeight } from './hooks/use-frame-height';

interface KeyboardEvent {
  keyCode: number;
}

export const Carousel = (rawProps: CarouselProps): React.ReactElement => {
  /**
   * We need this cast because we want the component's properties to seem
   * optional to external users, but always-present for the internal
   * implementation.
   *
   * This cast is safe due to the `Carousel.defaultProps = defaultProps;`
   * statement below. That guarantees all the properties are present, since
   * `defaultProps` has type `InternalCarouselProps`.
   */
  const props = rawProps as InternalCarouselProps;

  const {
    adaptiveHeight,
    afterSlide,
    animation,
    autoplay,
    autoplayInterval,
    autoplayReverse,
    beforeSlide,
    cellAlign,
    cellSpacing,
    children,
    className,
    disableAnimation,
    disableEdgeSwiping,
    dragging,
    dragThreshold: propsDragThreshold,
    enableKeyboardControls,
    frameAriaLabel,
    innerRef,
    keyCodeConfig,
    onDrag,
    onDragEnd,
    onDragStart,
    pauseOnHover,
    renderAnnounceSlideMessage,
    scrollMode,
    slideIndex,
    slidesToScroll: propsSlidesToScroll,
    slidesToShow,
    speed: propsSpeed,
    style,
    swiping,
    wrapAround,
    zoomScale
  } = props;

  const count = React.Children.count(children);

  const [currentSlide, setCurrentSlide] = useState<number>(
    autoplayReverse ? count - slidesToShow : slideIndex
  );
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [move, setMove] = useState<number>(0);
  const [keyboardMove, setKeyboardMove] = useState<KeyCodeFunction>(null);
  const carouselWidth = useRef<number | null>(null);

  const focus = useRef<boolean>(false);
  const prevMove = useRef<number>(0);
  const carouselEl = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef<boolean>(true);

  const slidesToScroll =
    animation === 'fade' ? slidesToShow : propsSlidesToScroll;

  const dragThreshold =
    ((carouselWidth.current || 0) / slidesToShow) * propsDragThreshold;

  const [slide] = getIndexes(
    currentSlide,
    currentSlide - slidesToScroll,
    count
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // disable img draggable attribute by default, this will improve the dragging
    document
      .querySelectorAll('.slider-list img')
      .forEach((el) => el.setAttribute('draggable', 'false'));
  }, []);

  const carouselRef = innerRef || carouselEl;

  const getNextIndex = useCallback(
    (to?: number) => {
      const index = to ?? currentSlide;
      if (index < 0) {
        return index + count;
      }
      if (index === count) {
        return 0;
      }
      return index;
    },
    [count, currentSlide]
  );

  const moveSlide = useCallback(
    (to?: number) => {
      const nextIndex = getNextIndex(to);
      typeof to === 'number' && beforeSlide(slide, nextIndex);

      !disableAnimation && setAnimationEnabled(true);

      if (typeof to === 'number') {
        setCurrentSlide(to);
      }

      setTimeout(
        () => {
          if (!isMounted.current) return;
          typeof to === 'number' && afterSlide(nextIndex);
          !disableAnimation && setAnimationEnabled(false);
        },
        !disableAnimation ? propsSpeed || 500 : 40
      ); // if animation is disabled decrease the speed to 40
    },
    [slide, afterSlide, beforeSlide, disableAnimation, getNextIndex, propsSpeed]
  );

  const nextSlide = useCallback(() => {
    if (wrapAround || currentSlide < count - propsSlidesToScroll) {
      const nextPosition = getNextMoveIndex(
        scrollMode,
        wrapAround,
        currentSlide,
        count,
        propsSlidesToScroll,
        slidesToShow
      );

      moveSlide(nextPosition);
    }
  }, [
    count,
    currentSlide,
    moveSlide,
    propsSlidesToScroll,
    scrollMode,
    wrapAround,
    slidesToShow
  ]);

  const prevSlide = useCallback(() => {
    // boundary
    if (wrapAround || currentSlide > 0) {
      const prevPosition = getPrevMoveIndex(
        scrollMode,
        wrapAround,
        currentSlide,
        propsSlidesToScroll
      );

      moveSlide(prevPosition);
    }
  }, [currentSlide, moveSlide, propsSlidesToScroll, scrollMode, wrapAround]);

  // When user changed the slideIndex property from outside.
  useEffect(() => {
    if (typeof slideIndex === 'number' && !autoplayReverse) {
      moveSlide(slideIndex);
    }
  }, [slideIndex, autoplayReverse]); // eslint-disable-line react-hooks/exhaustive-deps

  // Makes the carousel infinity when autoplay and wrapAround are enabled
  useEffect(() => {
    if (autoplay && !animationEnabled && wrapAround) {
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
  }, [animationEnabled, currentSlide, count, wrapAround, autoplay]);

  useEffect(() => {
    if (autoplay && !pause) {
      timer.current = setTimeout(() => {
        if (autoplayReverse) {
          if (!wrapAround && currentSlide > 0) {
            prevSlide();
          } else if (wrapAround) {
            prevSlide();
          }
        } else if (!wrapAround && currentSlide < count - slidesToShow) {
          nextSlide();
        } else if (wrapAround) {
          nextSlide();
        }
      }, autoplayInterval);
    }

    // Clear the timeout if user hover on carousel
    if (autoplay && pause && timer?.current) {
      clearTimeout(timer.current);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [
    currentSlide,
    slidesToShow,
    count,
    pause,
    autoplay,
    autoplayInterval,
    autoplayReverse,
    wrapAround,
    prevSlide,
    nextSlide
  ]);

  // Makes the carousel infinity when wrapAround is enabled, but autoplay is disabled
  useEffect(() => {
    let prevTimeout: ReturnType<typeof setTimeout> | null = null;
    let nextTimeout: ReturnType<typeof setTimeout> | null = null;

    if (wrapAround && !autoplay) {
      // if animation is disabled decrease the speed to 0
      const speed = !disableAnimation ? propsSpeed || 500 : 0;

      if (currentSlide <= -slidesToShow) {
        // prev
        prevTimeout = setTimeout(() => {
          if (!isMounted.current) return;
          setCurrentSlide(count - -currentSlide);
        }, speed + 10);
      } else if (currentSlide >= count) {
        // next
        nextTimeout = setTimeout(() => {
          if (!isMounted.current) return;
          setCurrentSlide(currentSlide - count);
        }, speed + 10);
      }
    }

    return function cleanup() {
      if (prevTimeout) {
        clearTimeout(prevTimeout);
      }
      if (nextTimeout) {
        clearTimeout(nextTimeout);
      }
    };
  }, [
    currentSlide,
    autoplay,
    wrapAround,
    disableAnimation,
    propsSpeed,
    slidesToShow,
    count
  ]);

  useEffect(() => {
    if (enableKeyboardControls && keyboardMove && focus.current) {
      switch (keyboardMove) {
        case 'nextSlide':
          nextSlide();
          break;
        case 'previousSlide':
          prevSlide();
          break;
        case 'firstSlide':
          setCurrentSlide(0);
          break;
        case 'lastSlide':
          setCurrentSlide(count - slidesToShow);
          break;
        case 'pause':
          if (pause && autoplay) {
            setPause(false);
            break;
          } else if (autoplay) {
            setPause(true);
            break;
          }
          break;
      }
      setKeyboardMove(null);
    }
  }, [
    keyboardMove,
    enableKeyboardControls,
    count,
    slidesToShow,
    pause,
    autoplay,
    nextSlide,
    prevSlide
  ]);

  const onKeyPress = useCallback(
    (e: Event) => {
      if (
        enableKeyboardControls &&
        focus.current &&
        (e as unknown as KeyboardEvent).keyCode
      ) {
        const keyConfig = keyCodeConfig;
        for (const func in keyConfig) {
          if (
            keyConfig[func as keyof typeof keyConfig]?.includes(
              (e as unknown as KeyboardEvent).keyCode
            )
          ) {
            setKeyboardMove(func as KeyCodeFunction);
          }
        }
      }
    },
    [enableKeyboardControls, keyCodeConfig]
  );

  useEffect(() => {
    if (carouselEl && carouselEl.current) {
      carouselWidth.current = carouselEl.current.offsetWidth;
    } else if (innerRef) {
      carouselWidth.current = innerRef.current.offsetWidth;
    }

    if (enableKeyboardControls) {
      addEvent(document, 'keydown', onKeyPress);
    }

    return () => {
      removeEvent(document, 'keydown', onKeyPress);
    };
  }, [enableKeyboardControls, innerRef, onKeyPress]);

  const handleDragEnd = useCallback(
    (
      e?: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      if (!dragging || !isDragging) return;

      setIsDragging(false);
      onDragEnd(e);

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
    },
    [
      dragThreshold,
      isDragging,
      move,
      moveSlide,
      nextSlide,
      onDragEnd,
      prevSlide,
      dragging
    ]
  );

  const onTouchStart = useCallback(
    (e?: React.TouchEvent<HTMLDivElement>) => {
      if (!swiping) {
        return;
      }
      setIsDragging(true);
      onDragStart(e);
    },
    [onDragStart, swiping]
  );

  const handlePointerMove = useCallback(
    (m: number) => {
      if (!dragging || !isDragging) return;

      const moveValue = m * 0.75; // Friction
      const moveState = move + (moveValue - prevMove.current);

      // Exit drag early if passed threshold
      if (Math.abs(move) > dragThreshold) {
        handleDragEnd();
        return;
      }

      if (
        !wrapAround &&
        disableEdgeSwiping &&
        ((currentSlide <= 0 && moveState <= 0) ||
          (moveState > 0 && currentSlide >= count - slidesToShow))
      ) {
        prevMove.current = moveValue;
        return;
      }

      if (prevMove.current !== 0) {
        setMove(moveState);
      }

      prevMove.current = moveValue;
    },
    [
      count,
      currentSlide,
      disableEdgeSwiping,
      dragThreshold,
      isDragging,
      handleDragEnd,
      move,
      dragging,
      slidesToShow,
      wrapAround
    ]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!dragging || !isDragging) return;

      onDragStart(e);

      const moveValue = (carouselWidth?.current || 0) - e.touches[0].pageX;

      handlePointerMove(moveValue);
    },
    [dragging, isDragging, handlePointerMove, onDragStart]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!dragging) return;

      carouselRef?.current?.focus();

      setIsDragging(true);
      onDragStart(e);
    },
    [carouselRef, dragging, onDragStart]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!dragging || !isDragging) return;

      onDrag(e);

      const offsetX =
        e.clientX - (carouselRef.current?.getBoundingClientRect().left || 0);
      const moveValue = (carouselWidth?.current || 0) - offsetX;

      handlePointerMove(moveValue);
    },
    [carouselRef, isDragging, handlePointerMove, onDrag, dragging]
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e?.preventDefault();
      handleDragEnd(e);
    },
    [handleDragEnd]
  );

  const onMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setPause(true);
    }
  }, [pauseOnHover]);

  const onMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setPause(false);
    }
  }, [pauseOnHover]);

  const { frameHeight, handleVisibleSlideHeightChange } = useFrameHeight({
    adaptiveHeight
  });

  const renderSlides = (typeOfSlide?: 'prev-cloned' | 'next-cloned') => {
    const slides = React.Children.map(children, (child, index) => {
      const isCurrentSlide = wrapAround
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
          wrapAround={wrapAround}
          cellSpacing={cellSpacing}
          animation={animation}
          slidesToShow={slidesToShow}
          speed={propsSpeed}
          zoomScale={zoomScale}
          cellAlign={cellAlign}
          onVisibleSlideHeightChange={handleVisibleSlideHeightChange}
          adaptiveHeight={adaptiveHeight}
        >
          {child}
        </Slide>
      );
    });

    return slides;
  };

  return (
    <div
      className={'slider-container'}
      style={{
        position: 'relative'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnnounceSlide
        ariaLive={autoplay && !pause ? 'off' : 'polite'}
        message={renderAnnounceSlideMessage({
          currentSlide: slide,
          count
        })}
      />

      {renderControls(
        props,
        count,
        currentSlide,
        moveSlide,
        nextSlide,
        prevSlide,
        slidesToScroll
      )}

      <div
        className={['slider-frame', className || ''].join(' ').trim()}
        style={{
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
          outline: 'none',
          height: frameHeight,
          ...style
        }}
        aria-label={frameAriaLabel}
        role="region"
        tabIndex={0}
        onFocus={() => (focus.current = true)}
        onBlur={() => (focus.current = false)}
        ref={innerRef || carouselEl}
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
            children,
            currentSlide,
            animationEnabled,
            slidesToShow,
            cellAlign,
            wrapAround,
            propsSpeed,
            move,
            animation
          )}
        >
          {wrapAround ? renderSlides('prev-cloned') : null}
          {renderSlides()}
          {wrapAround ? renderSlides('next-cloned') : null}
        </div>
      </div>
    </div>
  );
};

Carousel.defaultProps = defaultProps;

export default Carousel;
