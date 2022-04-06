import { ScrollMode } from './types';

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
  eventHandle: EventListener
): void => {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent(`on${type}`, eventHandle);
  } else {
    elem[`on${type}`] = eventHandle;
  }
};

export const removeEvent = (
  elem: Window | Document,
  type: string,
  eventHandle: EventListener
): void => {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }
  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent(`on${type}`, eventHandle);
  } else {
    elem[`on${type}`] = null;
  }
};

export const getNextMoveIndex = (
  scrollMode: ScrollMode,
  wrapAround: boolean,
  currentSlide: number,
  count: number,
  slidesToScroll: number
) => {
  if (
    !wrapAround &&
    scrollMode === ScrollMode.remainder &&
    count < currentSlide + slidesToScroll * 2
  ) {
    const remindedSlides = count - (currentSlide + slidesToScroll);
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
