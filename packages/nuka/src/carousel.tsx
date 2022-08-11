import React, { useEffect, useState, useRef, useCallback } from 'react';
import Slide from './slide';
import AnnounceSlide from './announce-slide';
import { getSliderListStyles } from './slider-list';
import { CarouselProps, InternalCarouselProps, KeyCodeFunction } from './types';
import renderControls from './controls';
import defaultProps from './default-carousel-props';
import {
  getIndexes,
  addEvent,
  removeEvent,
  getNextMoveIndex,
  getPrevMoveIndex,
  getDefaultSlideIndex
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
    adaptiveHeightAnimation,
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

  const slideCount = React.Children.count(children);
  const slidesToScroll =
    animation === 'fade' ? slidesToShow : propsSlidesToScroll;

  const [currentSlide, setCurrentSlide] = useState<number>(() =>
    getDefaultSlideIndex(
      slideIndex,
      slideCount,
      slidesToShow,
      slidesToScroll,
      cellAlign,
      autoplayReverse,
      scrollMode
    )
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [move, setMove] = useState<number>(0);
  const [keyboardMove, setKeyboardMove] = useState<KeyCodeFunction>(null);
  const carouselWidth = useRef<number | null>(null);

  const focus = useRef<boolean>(false);
  const prevMove = useRef<number>(0);
  const carouselEl = useRef<HTMLDivElement>(null);
  const autoplayTimeout = useRef<ReturnType<typeof setTimeout>>();
  const autoplayLastTriggeredRef = useRef<number | null>(null);
  const animationEndTimeout = useRef<ReturnType<typeof setTimeout>>();
  const isMounted = useRef<boolean>(true);

  const dragThreshold =
    ((carouselWidth.current || 0) / slidesToShow) * propsDragThreshold;

  const [slide] = getIndexes(
    currentSlide,
    currentSlide - slidesToScroll,
    slideCount
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

  const goToSlide = useCallback(
    (targetSlideIndex: number) => {
      // Boil down the target index (-Infinity < targetSlideIndex < Infinity) to
      // a user-friendly index (0 ≤ targetSlideIndex < slideCount)
      const userFacingIndex =
        ((targetSlideIndex % slideCount) + slideCount) % slideCount;

      const slideChanged = targetSlideIndex !== currentSlide;
      slideChanged && beforeSlide(slide, userFacingIndex);

      // if animation is disabled decrease the speed to 40
      const msToEndOfAnimation = !disableAnimation ? propsSpeed || 500 : 40;

      if (!disableAnimation) {
        setIsAnimating(true);

        clearTimeout(animationEndTimeout.current);
        animationEndTimeout.current = setTimeout(() => {
          if (!isMounted.current) return;
          setIsAnimating(false);
        }, msToEndOfAnimation);
      }

      if (slideChanged) {
        setCurrentSlide(targetSlideIndex);

        setTimeout(() => {
          if (!isMounted.current) return;
          afterSlide(userFacingIndex);
        }, msToEndOfAnimation);
      }
    },
    [
      slide,
      afterSlide,
      beforeSlide,
      slideCount,
      currentSlide,
      disableAnimation,
      propsSpeed
    ]
  );

  const nextSlide = useCallback(() => {
    const nextSlideIndex = getNextMoveIndex(
      scrollMode,
      wrapAround,
      currentSlide,
      slideCount,
      propsSlidesToScroll,
      slidesToShow,
      cellAlign
    );

    if (currentSlide !== nextSlideIndex) {
      goToSlide(nextSlideIndex);
    }
  }, [
    cellAlign,
    currentSlide,
    goToSlide,
    propsSlidesToScroll,
    scrollMode,
    slideCount,
    slidesToShow,
    wrapAround
  ]);

  const prevSlide = useCallback(() => {
    const prevSlideIndex = getPrevMoveIndex(
      scrollMode,
      wrapAround,
      currentSlide,
      propsSlidesToScroll,
      slidesToShow,
      cellAlign
    );

    if (currentSlide !== prevSlideIndex) {
      goToSlide(prevSlideIndex);
    }
  }, [
    cellAlign,
    currentSlide,
    goToSlide,
    propsSlidesToScroll,
    scrollMode,
    slidesToShow,
    wrapAround
  ]);

  // When user changed the slideIndex property from outside.
  const prevMovedToSlideIndex = useRef(slideIndex);
  useEffect(() => {
    if (
      slideIndex !== undefined &&
      slideIndex !== prevMovedToSlideIndex.current &&
      !autoplayReverse
    ) {
      goToSlide(slideIndex);
      prevMovedToSlideIndex.current = slideIndex;
    }
  }, [slideIndex, autoplayReverse, goToSlide]);

  // Makes the carousel infinity when autoplay and wrapAround are enabled
  useEffect(() => {
    if (autoplay && !isAnimating && wrapAround) {
      if (currentSlide > slideCount) {
        setCurrentSlide(currentSlide - slideCount);
        clearTimeout(autoplayTimeout.current);
      } else if (currentSlide < 0) {
        setCurrentSlide(slideCount - -currentSlide);
        clearTimeout(autoplayTimeout.current);
      }
    }
  }, [isAnimating, currentSlide, slideCount, wrapAround, autoplay]);

  useEffect(() => {
    let pauseStarted: number | null = null;

    // Keep track of when autoplay was paused so we can resume it with the same
    // remaining time to the next slide transition
    if (pause) {
      pauseStarted = Date.now();
    }

    return () => {
      if (pauseStarted !== null && autoplayLastTriggeredRef.current !== null) {
        autoplayLastTriggeredRef.current += Date.now() - pauseStarted;
      }
    };
  }, [pause]);

  useEffect(() => {
    if (autoplay && !pause) {
      // Adjust the timeout duration to account for changes that triggered the
      // re-creation of this timeout, such as the currentSlide being changed
      // periodically to make wrapAround loop forever
      const adjustedTimeoutMs =
        autoplayLastTriggeredRef.current !== null
          ? autoplayInterval - (Date.now() - autoplayLastTriggeredRef.current)
          : autoplayInterval;

      autoplayTimeout.current = setTimeout(() => {
        autoplayLastTriggeredRef.current = Date.now();

        if (autoplayReverse) {
          prevSlide();
        } else {
          nextSlide();
        }
      }, adjustedTimeoutMs);
    }

    // Clear the timeout if user hover on carousel
    if (autoplay && pause) {
      clearTimeout(autoplayTimeout.current);
    }

    return () => {
      clearTimeout(autoplayTimeout.current);
    };
  }, [
    pause,
    autoplay,
    autoplayInterval,
    autoplayReverse,
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
          setCurrentSlide(slideCount - -currentSlide);
        }, speed + 10);
      } else if (currentSlide >= slideCount) {
        // next
        nextTimeout = setTimeout(() => {
          if (!isMounted.current) return;
          setCurrentSlide(currentSlide - slideCount);
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
    slideCount
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
          setCurrentSlide(slideCount - slidesToShow);
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
    slideCount,
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
        goToSlide(currentSlide);
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
      currentSlide,
      dragging,
      dragThreshold,
      isDragging,
      move,
      goToSlide,
      nextSlide,
      onDragEnd,
      prevSlide
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
          (moveState > 0 && currentSlide >= slideCount - slidesToShow))
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
      slideCount,
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

  const {
    frameHeight,
    handleVisibleSlideHeightChange,
    initializedAdaptiveHeight
  } = useFrameHeight(adaptiveHeight, slidesToShow, slideCount);

  const renderSlides = (typeOfSlide?: 'prev-cloned' | 'next-cloned') => {
    const slides = React.Children.map(children, (child, index) => {
      const isCurrentSlide = wrapAround
        ? currentSlide === index ||
          currentSlide === index + slideCount ||
          currentSlide === index - slideCount
        : currentSlide === index;

      return (
        <Slide
          key={`${typeOfSlide}-${index}`}
          count={slideCount}
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
          initializedAdaptiveHeight={initializedAdaptiveHeight}
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
          count: slideCount
        })}
      />

      {renderControls(
        props,
        slideCount,
        currentSlide,
        goToSlide,
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
          transition: adaptiveHeightAnimation
            ? 'height 300ms ease-in-out'
            : undefined,
          willChange: 'height',
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
            isAnimating,
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
