import React, { useEffect, useState, useRef, useCallback } from 'react';
import Slide from './slide';
import AnnounceSlide from './announce-slide';
import { getPercentOffsetForSlide, SliderList } from './slider-list';
import {
  CarouselProps,
  InternalCarouselProps,
  KeyCodeConfig,
  KeyCodeFunction,
} from './types';
import renderControls from './controls';
import defaultProps from './default-carousel-props';
import {
  getNextMoveIndex,
  getPrevMoveIndex,
  getDefaultSlideIndex,
  getBoundedIndex,
} from './utils';
import { useFrameHeight } from './hooks/use-frame-height';
import { getDotIndexes } from './default-controls';

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
    dragging: desktopDraggingEnabled,
    dragThreshold: propsDragThreshold,
    enableKeyboardControls,
    frameAriaLabel,
    innerRef,
    keyCodeConfig,
    onDrag,
    onDragEnd,
    onDragStart,
    onUserNavigation,
    pauseOnHover,
    renderAnnounceSlideMessage,
    scrollMode,
    slideIndex,
    slidesToScroll: propsSlidesToScroll,
    slidesToShow,
    speed,
    style,
    swiping: mobileDraggingEnabled,
    wrapAround,
    zoomScale,
  } = props;

  const filteredSlides = React.Children.toArray(children).filter(Boolean);
  const slideCount = filteredSlides.length;

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
  const [pause, setPause] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragDistance, setDragDistance] = useState<number>(0);
  const [animationDistance, setAnimationDistance] = useState<number>(0);

  const prevXPosition = useRef<number | null>(null);
  const preDragOffset = useRef<number>(0);
  const sliderListRef = useRef<HTMLDivElement | null>(null);
  const defaultCarouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimeout = useRef<ReturnType<typeof setTimeout>>();
  const autoplayLastTriggeredRef = useRef<number | null>(null);
  const isMounted = useRef<boolean>(true);

  const setSliderListRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      // disable img draggable attribute by default, this will improve the dragging
      // applying the querySelectorAll on just the descendants of the sliderList prevents
      // impacting DOM elements outside our scope
      node
        .querySelectorAll('.slider-list img')
        .forEach((el) => el.setAttribute('draggable', 'false'));
    }
    sliderListRef.current = node;
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const carouselRef = innerRef || defaultCarouselRef;

  const goToSlide = useCallback(
    (targetSlideUnbounded: number) => {
      if (!sliderListRef.current || !carouselRef.current) return;

      const targetSlideBounded = getBoundedIndex(
        targetSlideUnbounded,
        slideCount
      );

      const slideChanged = targetSlideUnbounded !== currentSlide;
      slideChanged && beforeSlide(currentSlide, targetSlideBounded);

      // Calculate the distance the slide transition animation needs to cover.
      const currentOffset =
        sliderListRef.current.getBoundingClientRect().left -
        carouselRef.current.getBoundingClientRect().left;
      const sliderWidth = sliderListRef.current.offsetWidth;
      let targetOffset =
        (getPercentOffsetForSlide(
          targetSlideBounded,
          slideCount,
          slidesToShow,
          cellAlign,
          wrapAround
        ) /
          100) *
        sliderWidth;
      if (wrapAround) {
        // We have to do a bit of a recovery effort to figure out the closest
        // offset based on the direction we're going in the slides. The reason
        // it's complicated is because, when wrapped, both the current offset
        // and the calculated target offset are based on bounded slide indices -
        // that is, when wrapping, we often skip back to the first or last slide
        // seamlessly to make the carousel appear to infinitely repeat

        // The DOM width of `slideCount` slides
        const slideSetWidth = sliderWidth / 3;

        if (targetSlideUnbounded < 0) {
          targetOffset += slideSetWidth;
        }
        if (targetSlideUnbounded >= slideCount) {
          targetOffset -= slideSetWidth;
        }
      }

      setAnimationDistance(targetOffset - currentOffset);

      if (slideChanged) {
        setCurrentSlide(targetSlideBounded);

        // if animation is disabled decrease the speed to 40
        const msToEndOfAnimation = !disableAnimation ? speed || 500 : 40;
        setTimeout(() => {
          if (!isMounted.current) return;
          afterSlide(targetSlideBounded);
        }, msToEndOfAnimation);
      }
    },
    [
      afterSlide,
      beforeSlide,
      carouselRef,
      cellAlign,
      currentSlide,
      disableAnimation,
      speed,
      slideCount,
      slidesToShow,
      wrapAround,
    ]
  );

  const nextSlide = useCallback(() => {
    const nextSlideIndex = getNextMoveIndex(
      scrollMode,
      wrapAround,
      currentSlide,
      slideCount,
      slidesToScroll,
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
    slidesToScroll,
    scrollMode,
    slideCount,
    slidesToShow,
    wrapAround,
  ]);

  const prevSlide = useCallback(() => {
    const prevSlideIndex = getPrevMoveIndex(
      scrollMode,
      wrapAround,
      currentSlide,
      slidesToScroll,
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
    slidesToScroll,
    scrollMode,
    slidesToShow,
    wrapAround,
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
    nextSlide,
  ]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let keyCommand: KeyCodeFunction = null;
    (Object.keys(keyCodeConfig) as (keyof KeyCodeConfig)[]).forEach(
      (command) => {
        if (keyCodeConfig[command]?.includes(event.keyCode)) {
          keyCommand = command;
        }
      }
    );

    if (keyCommand === null) return;

    // At this point we know some action is going to be triggered, so we
    // preventDefault to avoid the browser interpreting the key event and
    // stopPropagation to avoid any higher-up handlers from interpreting it.
    event.preventDefault();
    event.stopPropagation();

    switch (keyCommand) {
      case 'nextSlide':
        onUserNavigation(event);
        nextSlide();
        break;
      case 'previousSlide':
        onUserNavigation(event);
        prevSlide();
        break;
      case 'firstSlide':
      case 'lastSlide': {
        onUserNavigation(event);

        const dotIndices = getDotIndexes(
          slideCount,
          slidesToScroll,
          scrollMode,
          slidesToShow,
          wrapAround,
          cellAlign
        );

        if (keyCommand === 'firstSlide') {
          goToSlide(dotIndices[0]);
        } else {
          goToSlide(dotIndices[dotIndices.length - 1]);
        }
        break;
      }
      case 'pause':
        setPause((p) => !p);
        break;
    }
  };

  const dragPositions = useRef<{ pos: number; time: number }[]>([]);

  const handleDragEnd = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging || !carouselRef.current) return;

    setIsDragging(false);

    // Inertia calculation is used to allow quick flicks to scroll the carousel
    // where they might not based on the start and end points of the gesture
    // alone. In certain conditions, the inertia may also scroll the carousel
    // several times.
    let distanceFromInertia = 0;
    if (dragPositions.current.length > 1) {
      const startMove = dragPositions.current[0];
      const endMove = dragPositions.current[dragPositions.current.length - 1];
      const timeOffset = endMove.time - startMove.time;
      const goodInertiaFeelConstant = 9;
      const goodFrictionFeelConstant = 0.92;
      const initialVelocity =
        goodInertiaFeelConstant *
        Math.abs((endMove.pos - startMove.pos) / timeOffset);
      let velocity = initialVelocity;

      while (Math.abs(velocity) > 1) {
        distanceFromInertia += velocity;
        velocity *= goodFrictionFeelConstant;
      }
    }
    dragPositions.current = [];

    const adjustedDragDistance =
      Math.abs(dragDistance) + Math.abs(distanceFromInertia);

    onDragEnd(e);

    prevXPosition.current = null;
    setDragDistance(0);

    const oneScrollWidth =
      carouselRef.current.offsetWidth *
      Math.min(1, slidesToScroll / slidesToShow);
    const dragThreshold = oneScrollWidth * propsDragThreshold;

    if (adjustedDragDistance < dragThreshold) {
      goToSlide(currentSlide);
      return;
    }

    // If skipping over multiple slides at a time is still roughly trackable by
    // your eyes, we allow for skipping multiple slides with a single gesture.
    // This formula is just based off an observation that it is confusing to
    // skip from slides 1 to 3 when only one slide is shown at a time, but
    // skipping from 1 to 4 or so with two slides shown at a time is pulled-back
    // enough that you can still roughly keep track of your place in the
    // carousel.
    const canMaintainVisualContinuity = slidesToShow >= 2 * slidesToScroll;
    const timesToMove = canMaintainVisualContinuity
      ? 1 + Math.floor((adjustedDragDistance - dragThreshold) / oneScrollWidth)
      : 1;

    let nextSlideIndex = currentSlide;
    for (let index = 0; index < timesToMove; index += 1) {
      if (dragDistance > 0) {
        nextSlideIndex = getNextMoveIndex(
          scrollMode,
          wrapAround,
          nextSlideIndex,
          slideCount,
          slidesToScroll,
          slidesToShow,
          cellAlign
        );
      } else {
        nextSlideIndex = getPrevMoveIndex(
          scrollMode,
          wrapAround,
          nextSlideIndex,
          slidesToScroll,
          slidesToShow,
          cellAlign
        );
      }
    }

    if (nextSlideIndex !== currentSlide) {
      onUserNavigation(e);
    }

    goToSlide(nextSlideIndex);
  };

  const onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
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
      const nextDragDistance = dragDistance + delta;

      const now = Date.now();
      // Maintain a buffer of drag positions from the last 100ms
      while (dragPositions.current.length > 0) {
        if (now - dragPositions.current[0].time <= 100) {
          break;
        }
        dragPositions.current.shift();
      }
      dragPositions.current.push({ pos: nextDragDistance, time: now });

      if (!isFirstMove) {
        // nextDragDistance will always be `0` on the first move event, so we
        // skip it because the value is already set to 0 at this point
        setDragDistance(nextDragDistance);
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
    initializedAdaptiveHeight,
  } = useFrameHeight(adaptiveHeight, slidesToShow, slideCount);

  const renderSlides = (typeOfSlide?: 'prev-cloned' | 'next-cloned') => {
    const slides = filteredSlides.map((child, index) => {
      return (
        <Slide
          key={`${typeOfSlide}-${index}`}
          count={slideCount}
          currentSlide={currentSlide}
          index={index}
          isCurrentSlide={currentSlide === index}
          typeOfSlide={typeOfSlide}
          wrapAround={wrapAround}
          cellSpacing={cellSpacing}
          animation={animation}
          slidesToShow={slidesToShow}
          speed={speed}
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
        position: 'relative',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnnounceSlide
        ariaLive={autoplay && !pause ? 'off' : 'polite'}
        message={renderAnnounceSlideMessage({
          currentSlide,
          count: slideCount,
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
          userSelect: 'none',
          ...style,
        }}
        aria-label={frameAriaLabel}
        role="region"
        tabIndex={0}
        onKeyDown={enableKeyboardControls ? onKeyDown : undefined}
        ref={carouselRef}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={handleDragEnd}
        onTouchMove={onTouchMove}
      >
        <SliderList
          animationDistance={animationDistance}
          cellAlign={cellAlign}
          currentSlide={currentSlide}
          disableEdgeSwiping={props.disableEdgeSwiping}
          draggedOffset={preDragOffset.current - dragDistance}
          disableAnimation={disableAnimation}
          easing={props.easing}
          edgeEasing={props.edgeEasing}
          isDragging={isDragging}
          ref={setSliderListRef}
          scrollMode={scrollMode}
          animation={animation}
          slideCount={slideCount}
          slidesToScroll={slidesToScroll}
          slidesToShow={slidesToShow}
          speed={speed}
          wrapAround={wrapAround}
        >
          {wrapAround ? renderSlides('prev-cloned') : null}
          {renderSlides()}
          {wrapAround ? renderSlides('next-cloned') : null}
        </SliderList>
      </div>
    </div>
  );
};

Carousel.defaultProps = defaultProps;

export default Carousel;
