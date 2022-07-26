import React, { ReactNode, useEffect } from 'react';
import { getDotIndexes } from './default-controls';
import { useTween } from './hooks/use-tween';
import { CellAlign, InternalCarouselProps } from './types';

export const getPercentOffsetForSlide = (
  currentSlide: number,
  slideCount: number,
  slidesToShow: number,
  cellAlign: CellAlign,
  wrapAround: boolean
): number => {
  // When wrapAround is enabled, we show the slides 3 times
  const renderedSlideCount = wrapAround ? 3 * slideCount : slideCount;

  const singleSlidePercentOfWhole = 100 / renderedSlideCount;

  // When wrap is on, -33.33% puts us right on the center, true set of slides
  // (the left and right sets are clones meant to avoid visual gaps)
  let slide0Offset = wrapAround ? -100 / 3 : 0;

  if (cellAlign === 'right' && slidesToShow > 1) {
    const excessSlides = slidesToShow - 1;
    slide0Offset += singleSlidePercentOfWhole * excessSlides;
  }

  if (cellAlign === 'center' && slidesToShow > 1) {
    const excessSlides = slidesToShow - 1;
    // Half of excess is on left and half is on right when centered
    const excessLeftSlides = excessSlides / 2;
    slide0Offset += singleSlidePercentOfWhole * excessLeftSlides;
  }

  const currentSlideOffsetFrom0 = (100 / renderedSlideCount) * currentSlide;

  return slide0Offset - currentSlideOffsetFrom0;
};

interface SliderListProps
  extends Pick<
    InternalCarouselProps,
    | 'cellAlign'
    | 'disableAnimation'
    | 'disableEdgeSwiping'
    | 'easing'
    | 'edgeEasing'
    | 'listClassName'
    | 'scrollMode'
    | 'animation'
    | 'slidesToShow'
    | 'slideWidth'
    | 'speed'
    | 'wrapAround'
  > {
  slidesToScroll: number;
  animationDistance: number;
  children: ReactNode;
  currentSlide: number;
  draggedOffset: number;
  isDragging: boolean;
  slideCount: number;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SliderList = React.forwardRef<HTMLDivElement, SliderListProps>(
  (
    {
      animation,
      animationDistance,
      cellAlign,
      children,
      currentSlide,
      disableAnimation,
      disableEdgeSwiping,
      draggedOffset,
      easing,
      edgeEasing,
      isDragging,
      listClassName,
      scrollMode,
      slideCount,
      slidesToScroll,
      slidesToShow,
      speed,
      wrapAround,
      slideWidth,
      setIsAnimating,
    },
    forwardedRef
  ) => {
    // When wrapAround is enabled, we show the slides 3 times
    const renderedSlideCount = wrapAround ? 3 * slideCount : slideCount;

    const listVisibleWidth = slideWidth
      ? `calc(${slideWidth} * ${renderedSlideCount})`
      : `${(renderedSlideCount * 100) / slidesToShow}%`;

    const percentOffsetForSlideProps = [
      slideCount,
      slidesToShow,
      cellAlign,
      wrapAround,
    ] as const;

    // We recycle dot index generation to determine the leftmost and rightmost
    // indices used, to be used in calculating the x-translation values we need
    // to limit to or when edgeEasing should be used.
    const dotIndexes = getDotIndexes(
      slideCount,
      slidesToScroll,
      scrollMode,
      slidesToShow,
      wrapAround,
      cellAlign
    );

    let clampedDraggedOffset = `${draggedOffset}px`;
    if (isDragging && disableEdgeSwiping && !wrapAround) {
      const clampOffsets = [
        dotIndexes[0],
        dotIndexes[dotIndexes.length - 1],
      ].map((index) =>
        getPercentOffsetForSlide(index, ...percentOffsetForSlideProps)
      );
      // Offsets are seemingly backwards because the rightmost slide creates
      // the most negative translate value
      clampedDraggedOffset = `clamp(${clampOffsets[1]}%, ${draggedOffset}px, ${clampOffsets[0]}%)`;
    }

    const slideBasedOffset = getPercentOffsetForSlide(
      currentSlide,
      ...percentOffsetForSlideProps
    );

    const isEdgeEasing =
      !disableEdgeSwiping &&
      !wrapAround &&
      ((currentSlide === dotIndexes[0] && animationDistance < 0) ||
        (currentSlide === dotIndexes[dotIndexes.length - 1] &&
          animationDistance > 0));
    const { value: transition, isAnimating } = useTween(
      speed,
      !isEdgeEasing ? easing : edgeEasing,
      // animationDistance is assumed to be unique enough that it can be used to
      // detect when a new animation should start. This is used in addition to
      // currentSlide because some animations, such as those with edgeEasing, do
      // not occur due to a change in value of currentSlide
      currentSlide + animationDistance,
      isDragging || disableAnimation || animation === 'fade'
    );

    // Return undefined if the transform would be 0 pixels since transforms can
    // cause flickering in chrome.
    let positioning: string | undefined;
    if (isDragging || slideBasedOffset !== 0 || isAnimating) {
      if (isDragging) {
        positioning = `translateX(${clampedDraggedOffset})`;
      } else {
        const transitionOffset = isAnimating
          ? (1 - transition) * animationDistance
          : 0;
        positioning = `translateX(calc(${slideBasedOffset}% - ${transitionOffset}px))`;
      }
    }

    useEffect(() => {
      setIsAnimating(isAnimating);
    }, [isAnimating, setIsAnimating]);

    return (
      <div
        ref={forwardedRef}
        className={['slider-list', listClassName].filter(Boolean).join(' ')}
        style={{
          width: listVisibleWidth,
          textAlign: 'left',
          userSelect: 'auto',
          transform: positioning,
          display: 'flex',
        }}
      >
        {children}
      </div>
    );
  }
);

SliderList.displayName = 'SliderList';
