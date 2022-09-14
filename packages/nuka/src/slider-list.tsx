import React, { ReactNode } from 'react';
import { getDotIndexes } from './default-controls';
import { useTween } from './hooks/use-tween';
import { Alignment, EasingFunction, ScrollMode } from './types';

export const getPercentOffsetForSlide = (
  currentSlide: number,
  slideCount: number,
  slidesToShow: number,
  cellAlign: Alignment,
  wrapAround: boolean
): number => {
  // When wrapAround is enabled, we show the slides 3 times
  const renderedSlideCount = wrapAround ? 3 * slideCount : slideCount;

  const singleSlidePercentOfWhole = 100 / renderedSlideCount;

  // When wrap is on, -33.33% puts us right on the center, true set of slides
  // (the left and right sets are clones meant to avoid visual gaps)
  let slide0Offset = wrapAround ? -100 / 3 : 0;

  if (cellAlign === Alignment.Right && slidesToShow > 1) {
    const excessSlides = slidesToShow - 1;
    slide0Offset += singleSlidePercentOfWhole * excessSlides;
  }

  if (cellAlign === Alignment.Center && slidesToShow > 1) {
    const excessSlides = slidesToShow - 1;
    // Half of excess is on left and half is on right when centered
    const excessLeftSlides = excessSlides / 2;
    slide0Offset += singleSlidePercentOfWhole * excessLeftSlides;
  }

  const currentSlideOffsetFrom0 = (100 / renderedSlideCount) * currentSlide;

  return slide0Offset - currentSlideOffsetFrom0;
};

interface SliderListProps {
  animationDistance: number;
  cellAlign: Alignment;
  children: ReactNode;
  currentSlide: number;
  disableAnimation: boolean;
  disableEdgeSwiping: boolean;
  draggedOffset: number;
  easing: EasingFunction;
  isDragging: boolean;
  scrollMode: ScrollMode;
  slideAnimation?: 'fade' | 'zoom';
  slideCount: number;
  slidesToScroll: number;
  slidesToShow: number;
  speed: number;
  wrapAround: boolean;
}

export const SliderList = React.forwardRef<HTMLDivElement, SliderListProps>(
  (
    {
      animationDistance,
      cellAlign,
      children,
      currentSlide,
      disableAnimation,
      disableEdgeSwiping,
      draggedOffset,
      easing,
      isDragging,
      scrollMode,
      slideAnimation,
      slideCount,
      slidesToScroll,
      slidesToShow,
      speed,
      wrapAround,
    },
    forwardedRef
  ) => {
    const { value: transition, isAnimating } = useTween(
      speed,
      easing,
      currentSlide,
      isDragging || disableAnimation || slideAnimation === 'fade'
    );

    // When wrapAround is enabled, we show the slides 3 times
    const renderedSlideCount = wrapAround ? 3 * slideCount : slideCount;

    const listVisibleWidth = `${(renderedSlideCount * 100) / slidesToShow}%`;

    const percentOffsetForSlideProps = [
      slideCount,
      slidesToShow,
      cellAlign,
      wrapAround,
    ] as const;

    // When disableEdgeSwiping=true, we recycle dot index generation to determine
    // the leftmost and rightmost indices used, to be used in calculating the
    // x-translation values we need to limit to.
    let clampedDraggedOffset = `${draggedOffset}px`;
    if (isDragging && disableEdgeSwiping && !wrapAround) {
      const dotIndexes = getDotIndexes(
        slideCount,
        slidesToScroll,
        scrollMode,
        slidesToShow,
        wrapAround,
        cellAlign
      );
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

    return (
      <div
        ref={forwardedRef}
        className="slider-list"
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
