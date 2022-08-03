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
  if (slidesToShow === 1) {
    return indexToCheck === currentSlide;
  }

  if (cellAlign === Alignment.Left) {
    return (
      indexToCheck < currentSlide + slidesToShow && indexToCheck >= currentSlide
    );
  }

  if (cellAlign === Alignment.Center) {
    return (
      (indexToCheck >= currentSlide - slidesToShow / 2 &&
        indexToCheck <= currentSlide) ||
      (indexToCheck > currentSlide &&
        indexToCheck <= currentSlide + slidesToShow / 2)
    );
  }

  if (cellAlign === Alignment.Right) {
    return (
      indexToCheck <= currentSlide && indexToCheck > currentSlide - slidesToShow
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
