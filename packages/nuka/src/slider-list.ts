import React, { CSSProperties, ReactNode } from 'react';
import { getDotIndexes } from './default-controls';
import { Alignment, ScrollMode } from './types';

const getSliderListWidth = (
  slideCount: number,
  slidesToShow: number,
  wrapAround: boolean
): string => {
  const visibleSlides = slidesToShow;

  if (wrapAround) {
    const percentage = (slideCount * 100) / visibleSlides;
    return `${3 * percentage}%`;
  }
  const percentage = (slideCount * 100) / visibleSlides;
  return `${percentage}%`;
};

const getPercentOffsetForSlide = (
  slideCount: number,
  initialValue: number,
  currentSlide: number,
  cellAlign: Alignment,
  wrapAround: boolean
): number => {
  if (cellAlign === Alignment.Left) {
    if (wrapAround) {
      const slideTransition = 100 / (3 * slideCount);
      const currentTransition =
        initialValue - slideTransition * (currentSlide - 1);

      return currentTransition - slideTransition;
    }
    const slideTransition = (100 / slideCount) * currentSlide;
    return -(slideTransition + initialValue);
  } else if (cellAlign === Alignment.Center) {
    if (wrapAround) {
      const slideTransition = 100 / (3 * slideCount);
      const currentTransition =
        initialValue - slideTransition * (currentSlide - 1);

      return currentTransition - slideTransition;
    }
    const slideTransition = (100 / slideCount) * currentSlide;
    return initialValue - slideTransition;
  } else if (cellAlign === Alignment.Right) {
    if (wrapAround) {
      const slideTransition = 100 / (3 * slideCount);
      const currentTransition =
        initialValue - slideTransition * (currentSlide - 1);

      return currentTransition - slideTransition;
    }
    const slideTransition = (100 / slideCount) * currentSlide;
    return initialValue - slideTransition;
  }

  return initialValue;
};

const getPositioning = (
  cellAlign: Alignment,
  slidesToShow: number,
  slideCount: number,
  currentSlide: number,
  wrapAround: boolean,
  draggedOffset: number,
  clampIndices: number[] | null
): string | undefined => {
  // When wrapAround is enabled, we show the slides 3 times
  const totalCount = wrapAround ? 3 * slideCount : slideCount;
  const slideSize = 100 / totalCount;
  let initialValue = wrapAround ? -slideCount * slideSize : 0;

  if (cellAlign === Alignment.Right && slidesToShow > 1) {
    const excessSlides = slidesToShow - 1;
    initialValue += slideSize * excessSlides;
  }

  if (cellAlign === Alignment.Center && slidesToShow > 1) {
    const excessSlides = slidesToShow - 1;
    // Half of excess is on left and half is on right when centered
    const excessLeftSlides = excessSlides / 2;
    initialValue += slideSize * excessLeftSlides;
  }

  const slideBasedOffset = getPercentOffsetForSlide(
    slideCount,
    initialValue,
    currentSlide,
    cellAlign,
    wrapAround
  );

  // Special-case this. It's better to return undefined rather than a
  // transform of 0 pixels since transforms can cause flickering in chrome.
  if (draggedOffset === 0 && slideBasedOffset === 0) {
    return undefined;
  }

  let clampOffsets: number[] | null = null;
  if (clampIndices) {
    clampOffsets = clampIndices.map((index) =>
      getPercentOffsetForSlide(
        slideCount,
        initialValue,
        index,
        cellAlign,
        wrapAround
      )
    );
  }

  const clampedDraggedOffset = clampOffsets
    ? // Offsets are seemingly backwards because the rightmost slide creates
      // the most negative translate value
      `clamp(${clampOffsets[1]}%, ${draggedOffset}px, ${clampOffsets[0]}%)`
    : `${draggedOffset}px`;

  return `translate3d(${
    draggedOffset ? clampedDraggedOffset : `${slideBasedOffset}%`
  }, 0, 0)`;
};

export const getSliderListStyles = (
  children: ReactNode | ReactNode[],
  currentSlide: number,
  isAnimating: boolean,
  slidesToShow: number,
  cellAlign: Alignment,
  wrapAround: boolean,
  speed: number,
  draggedOffset: number,
  slidesToScroll: number,
  scrollMode: ScrollMode,
  disableEdgeSwiping: boolean,
  slideAnimation?: 'fade' | 'zoom'
): CSSProperties => {
  const slideCount = React.Children.count(children);

  const width = getSliderListWidth(slideCount, slidesToShow, wrapAround);

  // When disableEdgeSwiping=true, we recycle dot index generation to determine
  // the leftmost and rightmost indices used, to be used in calculating the
  // x-translation values we need to limit to.
  let clampIndices: number[] | null = null;
  if (disableEdgeSwiping && !wrapAround) {
    const dotIndexes = getDotIndexes(
      slideCount,
      slidesToScroll,
      scrollMode,
      slidesToShow,
      wrapAround,
      cellAlign
    );
    clampIndices = [dotIndexes[0], dotIndexes[dotIndexes.length - 1]];
  }

  const positioning = getPositioning(
    cellAlign,
    slidesToShow,
    slideCount,
    currentSlide,
    wrapAround,
    draggedOffset,
    clampIndices
  );

  return {
    width,
    textAlign: 'left',
    userSelect: 'auto',
    transition:
      draggedOffset === 0 && isAnimating && slideAnimation !== 'fade'
        ? `${speed}ms cubic-bezier(0.16, 1, 0.3, 1) 0s`
        : undefined,
    transform: positioning,
    display: 'flex'
  };
};
