import { ScrollMode } from './types';
export var getIndexes = function getIndexes(slide, endSlide, count) {
  var slideIndex = slide;
  var endSlideIndex = endSlide;

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
export var addEvent = function addEvent(elem, type, eventHandler) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandler, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on".concat(type), eventHandler);
  } else {
    elem["on".concat(type)] = eventHandler;
  }
};
export var removeEvent = function removeEvent(elem, type, eventHandler) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandler, false);
  } else if (elem.detachEvent) {
    elem.detachEvent("on".concat(type), eventHandler);
  } else {
    elem["on".concat(type)] = null;
  }
};
export var getNextMoveIndex = function getNextMoveIndex(scrollMode, wrapAround, currentSlide, count, slidesToScroll, slidesToShow) {
  if (!wrapAround && scrollMode === ScrollMode.remainder && count < currentSlide + (slidesToScroll + slidesToShow)) {
    var remindedSlides = count - (currentSlide + slidesToScroll) - (slidesToShow - slidesToScroll);
    return currentSlide + remindedSlides;
  }

  return currentSlide + slidesToScroll;
};
export var getPrevMoveIndex = function getPrevMoveIndex(scrollMode, wrapAround, currentSlide, slidesToScroll) {
  if (!wrapAround && scrollMode === ScrollMode.remainder && currentSlide - slidesToScroll < 0) {
    return 0;
  }

  return currentSlide - slidesToScroll;
};