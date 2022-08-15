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
    dragging: desktopDraggingEnabled,
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
    swiping: mobileDraggingEnabled,
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
  const [dragDistance, setDragDistance] = useState<number>(0);
  const [keyboardMove, setKeyboardMove] = useState<KeyCodeFunction>(null);

  const focus = useRef<boolean>(false);
  const prevXPosition = useRef<number | null>(null);
  const preDragOffset = useRef<number>(0);
  const sliderListRef = useRef<HTMLDivElement>(null);
  const defaultCarouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimeout = useRef<ReturnType<typeof setTimeout>>();
  const autoplayLastTriggeredRef = useRef<number | null>(null);
  const animationEndTimeout = useRef<ReturnType<typeof setTimeout>>();
  const isMounted = useRef<boolean>(true);

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

  const carouselRef = innerRef || defaultCarouselRef;

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

  // Makes the carousel infinity when wrapAround is enabled
  useEffect(() => {
    if (wrapAround && !isAnimating && !isDragging) {
      if (currentSlide <= -slidesToShow) {
        setCurrentSlide(slideCount - -currentSlide);
      } else if (currentSlide >= slideCount) {
        setCurrentSlide(currentSlide - slideCount);
      }
    }
  }, [
    currentSlide,
    isAnimating,
    isDragging,
    slideCount,
    slidesToShow,
    wrapAround
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

  const dragPositions = useRef<{ pos: number; time: number }[]>([]);

  useEffect(() => {
    if (enableKeyboardControls) {
      addEvent(document, 'keydown', onKeyPress);
    }

    return () => {
      removeEvent(document, 'keydown', onKeyPress);
    };
  }, [enableKeyboardControls, carouselRef, onKeyPress]);

  const handleDragEnd = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging || !carouselRef.current) return;

    setIsDragging(false);

    let distanceFromInertia = 0;
    if (dragPositions.current.length > 0) {
      const startMove = dragPositions.current[0];
      const endMove = dragPositions.current[dragPositions.current.length - 1];
      const timeOffset = endMove.time - startMove.time;
      const initialVelocity =
        10 * Math.abs((endMove.pos - startMove.pos) / timeOffset);
      const friction = 0.92;
      let velocity = initialVelocity;

      while (Math.abs(velocity) > 1) {
        distanceFromInertia += velocity;
        velocity *= friction;
      }

      dragPositions.current = [];
    }

    const adjustedDragDistance =
      Math.abs(dragDistance) + Math.abs(distanceFromInertia);

    onDragEnd(e);

    prevXPosition.current = null;
    setDragDistance(0);

    const slideUnit =
      (carouselRef.current.offsetWidth || 0) *
      Math.min(1, slidesToScroll / slidesToShow);
    const dragThreshold = slideUnit * propsDragThreshold;

    if (adjustedDragDistance <= dragThreshold) {
      goToSlide(currentSlide);
      return;
    }

    const timesToMove =
      1 +
      Math.min(
        // The maximum number of slides we could cross with one swipe; basically
        // no more than one page's worth of slides.
        Math.max(1, Math.floor(slidesToShow / slidesToScroll)) - 1,

        // The additional slides to move, based on the excess move distance
        Math.floor((adjustedDragDistance - dragThreshold) / slideUnit)
      );

    let nextSlideIndex = currentSlide;
    for (let index = 0; index < timesToMove; index += 1) {
      if (dragDistance > 0) {
        nextSlideIndex = getNextMoveIndex(
          scrollMode,
          wrapAround,
          nextSlideIndex,
          slideCount,
          propsSlidesToScroll,
          slidesToShow,
          cellAlign
        );
      } else {
        nextSlideIndex = getPrevMoveIndex(
          scrollMode,
          wrapAround,
          nextSlideIndex,
          propsSlidesToScroll,
          slidesToShow,
          cellAlign
        );
      }
    }

    goToSlide(nextSlideIndex);
  };

  const onTouchStart = useCallback(
    (e?: React.TouchEvent<HTMLDivElement>) => {
      if (
        !mobileDraggingEnabled ||
        !sliderListRef.current ||
        !carouselRef.current
      ) {
        return;
      }
      setIsDragging(true);
      preDragOffset.current =
        sliderListRef.current.getBoundingClientRect().left -
        carouselRef.current.getBoundingClientRect().left;

      onDragStart(e);
    },
    [carouselRef, onDragStart, mobileDraggingEnabled]
  );

  const handlePointerMove = useCallback(
    (xPosition: number) => {
      if (!isDragging) return;

      const isFirstMove = prevXPosition.current === null;
      const delta =
        prevXPosition.current !== null ? xPosition - prevXPosition.current : 0;
      const moveState = dragDistance + delta;

      const now = Date.now();
      // Maintain a buffer of drag positions from the last 100ms
      while (dragPositions.current.length > 0) {
        if (now - dragPositions.current[0].time <= 100) {
          break;
        }
        dragPositions.current.shift();
      }
      if (!isFirstMove) {
        dragPositions.current.push({ pos: moveState, time: now });
      }

      if (!isFirstMove) {
        setDragDistance(moveState);
      }

      prevXPosition.current = xPosition;
    },
    [isDragging, dragDistance]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging || !carouselRef.current) return;

      onDragStart(e);

      const moveValue = carouselRef.current.offsetWidth - e.touches[0].pageX;

      handlePointerMove(moveValue);
    },
    [isDragging, carouselRef, handlePointerMove, onDragStart]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !desktopDraggingEnabled ||
        !sliderListRef.current ||
        !carouselRef.current
      )
        return;

      carouselRef.current.focus();

      setIsDragging(true);

      preDragOffset.current =
        sliderListRef.current.getBoundingClientRect().left -
        carouselRef.current.getBoundingClientRect().left;

      onDragStart(e);
    },
    [carouselRef, desktopDraggingEnabled, onDragStart]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !carouselRef.current) return;

      onDrag(e);

      const offsetX =
        e.clientX - carouselRef.current.getBoundingClientRect().left;
      const moveValue = carouselRef.current.offsetWidth - offsetX;

      handlePointerMove(moveValue);
    },
    [carouselRef, isDragging, handlePointerMove, onDrag]
  );

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleDragEnd(e);
  };

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
        ref={carouselRef}
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
            isDragging ? preDragOffset.current - dragDistance : 0,
            slidesToScroll,
            scrollMode,
            disableEdgeSwiping,
            animation
          )}
          ref={sliderListRef}
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
