import { getDotIndexes } from './default-controls';
import { Alignment, ScrollMode } from './types';

export const getIndexes = (
  slide: number,
  endSlide: number,
  slideCount: number
): [number, number] => {
  let slideIndex = slide;
  let endSlideIndex = endSlide;

  if (slideIndex < 0) {
    slideIndex += slideCount;
  } else if (slideIndex > slideCount - 1) {
    slideIndex -= slideCount;
  }

  if (endSlideIndex < 0) {
    endSlideIndex += slideCount;
  } else if (endSlideIndex > slideCount - 1) {
    endSlideIndex -= slideCount;
  }

  return [slideIndex, endSlideIndex];
};

export const addEvent = (
  elem: Window | Document,
  type: string,
  eventHandler: EventListener
): void => {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandler, false);
  }
};

export const removeEvent = (
  elem: Window | Document,
  type: string,
  eventHandler: EventListener
): void => {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandler, false);
  }
};

export const isSlideVisible = (
  currentSlide: number,
  indexToCheck: number,
  slidesToShow: number,
  cellAlign: Alignment
) => {
  // The addition or subtraction of constants (1 , 0.5) in the following
  // calculations are accounting for the fact that a slide will be visible even
  // after the position associated with its index is off-screen. For example,
  // with cellAlign="left", slidesToShow=1 and indexToCheck=0,
  // if the currentSlide is set to 0.99, both (a sliver of) slide 0 and slide 1
  // will be visible at the same time, even though the position we associate
  // with index 0, its leftmost edge, is off-screen.

  if (cellAlign === Alignment.Left) {
    return (
      indexToCheck < currentSlide + slidesToShow &&
      indexToCheck > currentSlide - 1
    );
  }

  if (cellAlign === Alignment.Center) {
    return (
      (indexToCheck > currentSlide - slidesToShow / 2 - 0.5 &&
        indexToCheck <= currentSlide) ||
      (indexToCheck > currentSlide &&
        indexToCheck < currentSlide + slidesToShow / 2 + 0.5)
    );
  }

  if (cellAlign === Alignment.Right) {
    return (
      indexToCheck < currentSlide + 1 &&
      indexToCheck > currentSlide - slidesToShow
    );
  }

  return false;
};

export const getNextMoveIndex = (
  scrollMode: ScrollMode,
  wrapAround: boolean,
  currentSlide: number,
  slideCount: number,
  slidesToScroll: number,
  slidesToShow: number,
  cellAlign: Alignment
) => {
  if (wrapAround) {
    return currentSlide + slidesToScroll;
  }
  // Quit early if we're already as far right as we can go
  if (
    currentSlide >= slideCount - 1 ||
    (cellAlign === Alignment.Left && currentSlide >= slideCount - slidesToShow)
  ) {
    return currentSlide;
  }

  if (scrollMode === ScrollMode.remainder && cellAlign === Alignment.Left) {
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
  cellAlign: Alignment
) => {
  if (wrapAround) {
    return currentSlide - slidesToScroll;
  }

  // Quit early if we're already as far left as we can go
  if (
    currentSlide <= 0 ||
    (cellAlign === Alignment.Right && currentSlide <= slidesToShow - 1)
  ) {
    return currentSlide;
  }

  if (scrollMode === ScrollMode.remainder && cellAlign === Alignment.Right) {
    return Math.max(currentSlide - slidesToScroll, slidesToShow - 1);
  }

  return Math.max(currentSlide - slidesToScroll, 0);
};

export const getDefaultSlideIndex = (
  slideIndex: number | undefined,
  slideCount: number,
  slidesToShow: number,
  slidesToScroll: number,
  cellAlign: Alignment,
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
