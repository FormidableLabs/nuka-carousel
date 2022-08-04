import { Alignment, ScrollMode } from './types';

export const getIndexes = (
  slide: number,
  endSlide: number,
  count: number
): [number, number] => {
  let slideIndex = slide;
  let endSlideIndex = endSlide;

  if (slideIndex < 0) {
    slideIndex += count;
  } else if (slideIndex > count - 1) {
    slideIndex -= count;
  }

  if (endSlideIndex < 0) {
    endSlideIndex += count;
  } else if (endSlideIndex > count - 1) {
    endSlideIndex -= count;
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
  count: number,
  slidesToScroll: number,
  slidesToShow: number
) => {
  if (
    !wrapAround &&
    scrollMode === ScrollMode.remainder &&
    count < currentSlide + (slidesToScroll + slidesToShow)
  ) {
    const remindedSlides =
      count - (currentSlide + slidesToScroll) - (slidesToShow - slidesToScroll);
    return currentSlide + remindedSlides;
  }
  return currentSlide + slidesToScroll;
};

export const getPrevMoveIndex = (
  scrollMode: ScrollMode,
  wrapAround: boolean,
  currentSlide: number,
  slidesToScroll: number
) => {
  if (
    !wrapAround &&
    scrollMode === ScrollMode.remainder &&
    currentSlide - slidesToScroll < 0
  ) {
    return 0;
  }

  return currentSlide - slidesToScroll;
};

export const getDefaultSlideIndex = (
  slideIndex: number | undefined,
  slideCount: number,
  slidesToShow: number,
  cellAlign: Alignment,
  autoplayReverse: boolean
) => {
  if (slideIndex !== undefined) {
    return slideIndex;
  }

  if (!autoplayReverse) {
    // When slides are right-aligned, default to an index that will
    // display the first cells with no whitespace on the left.
    if (cellAlign === Alignment.Right) {
      return slidesToShow - 1;
    }

    return 0;
  }

  // When the slideshow is set to start from the end (i.e.,
  // autoplayReverse=true), and slides are left-aligned, default to an index
  // that will display the last few cells with no whitespace on the right.
  if (cellAlign === Alignment.Left) {
    return slideCount - slidesToShow;
  }

  // When center-aligned or right-aligned, use the last slide's index
  return slideCount - 1;
};
