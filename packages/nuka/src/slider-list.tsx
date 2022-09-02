import React, { ReactNode, useEffect, useRef } from 'react';
import { getDotIndexes } from './default-controls';
import { useTween } from './hooks/use-tween';
import { Alignment, D3EasingFunctions, ScrollMode } from './types';
import { getBoundedIndex } from './utils';

const getPercentOffsetForSlide = (
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
  cellAlign: Alignment;
  children: ReactNode;
  currentSlideUnbounded: number;
  disableEdgeSwiping: boolean;
  draggedOffset: number;
  easing: D3EasingFunctions;
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
      cellAlign,
      children,
      currentSlideUnbounded,
      disableEdgeSwiping,
      draggedOffset,
      easing,
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
    const currentSlideBounded = getBoundedIndex(
      currentSlideUnbounded,
      slideCount
    );
    const { value: transition, isAnimating } = useTween(
      speed,
      easing,
      currentSlideUnbounded
    );
    const myTween = useRef(0);
    const unfinishedBusiness = useRef(0);
    myTween.current = transition;
    const prevCurrentSlideUnbounded = useRef(currentSlideUnbounded);

    useEffect(() => {
      const delta = currentSlideUnbounded - prevCurrentSlideUnbounded.current;
      unfinishedBusiness.current =
        unfinishedBusiness.current * (1 - myTween.current) - delta;

      return () => {
        prevCurrentSlideUnbounded.current = currentSlideUnbounded;
      };
    }, [currentSlideUnbounded]);

    // When wrapAround is enabled, we show the slides 3 times
    const renderedSlideCount = wrapAround ? 3 * slideCount : slideCount;
    const singleSlidePercentOfWhole = 100 / renderedSlideCount;

    const transitionMultiplier =
      singleSlidePercentOfWhole * unfinishedBusiness.current;

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
    if (disableEdgeSwiping && !wrapAround) {
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
      currentSlideBounded,
      ...percentOffsetForSlideProps
    );

    // Return undefined if the transform would be 0 pixels since transforms can
    // cause flickering in chrome.
    let positioning: string | undefined;
    if (draggedOffset !== 0 || slideBasedOffset !== 0 || isAnimating) {
      if (draggedOffset) {
        positioning = `translateX(${clampedDraggedOffset})`;
      } else {
        const transitionOffset =
          (1 - (!isAnimating || slideAnimation === 'fade' ? 1 : transition)) *
          transitionMultiplier;
        positioning = `translateX(${slideBasedOffset - transitionOffset}%)`;
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
