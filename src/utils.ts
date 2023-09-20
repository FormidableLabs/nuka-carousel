import { getDotIndexes } from './default-controls';
import { CellAlign, ScrollMode } from './types';

export const getNextMoveIndex = (
  scrollMode: ScrollMode,
  wrapAround: boolean,
  currentSlide: number,
  slideCount: number,
  slidesToScroll: number,
  slidesToShow: number,
  cellAlign: CellAlign
) => {
  if (wrapAround) {
    return currentSlide + slidesToScroll;
  }
  // Quit early if we're already as far right as we can go
  if (
    currentSlide >= slideCount - 1 ||
    (cellAlign === 'left' && currentSlide >= slideCount - slidesToShow)
  ) {
    return currentSlide;
  }

  if (scrollMode === ScrollMode.remainder && cellAlign === 'left') {
    return Math.min(currentSlide + slidesToScroll, slideCount - slidesToShow);
  }

  return Math.min(currentSlide + slidesToScroll, slideCount - 1);
};

export const getPrevMoveIndex = (
  scrollMode: ScrollMode,
  wrapAround: boolean,
  currentSlide: number,
  slidesToScroll: number,
  slidesToShow: number,
  cellAlign: CellAlign
) => {
  if (wrapAround) {
    return currentSlide - slidesToScroll;
  }

  // Quit early if we're already as far left as we can go
  if (
    currentSlide <= 0 ||
    (cellAlign === 'right' && currentSlide <= slidesToShow - 1)
  ) {
    return currentSlide;
  }

  if (scrollMode === ScrollMode.remainder && cellAlign === 'right') {
    return Math.max(currentSlide - slidesToScroll, slidesToShow - 1);
  }

  return Math.max(currentSlide - slidesToScroll, 0);
};

export const getDefaultSlideIndex = (
  slideIndex: number | undefined,
  slideCount: number,
  slidesToShow: number,
  slidesToScroll: number,
  cellAlign: CellAlign,
  autoplayReverse: boolean,
  scrollMode: ScrollMode
) => {
  if (slideIndex !== undefined) {
    return slideIndex;
  }

  const dotIndexes = getDotIndexes(
    slideCount,
    slidesToScroll,
    scrollMode,
    slidesToShow,
    false,
    cellAlign
  );

  return autoplayReverse ? dotIndexes[dotIndexes.length - 1] : dotIndexes[0];
};

/**
 * Boils down an unbounded index (-Infinity < index < Infinity) to a bounded one
 * (0 ≤ index < slideCount)
 */
export const getBoundedIndex = (rawIndex: number, slideCount: number) => {
  return ((rawIndex % slideCount) + slideCount) % slideCount;
};
