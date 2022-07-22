"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEvent = exports.getPrevMoveIndex = exports.getNextMoveIndex = exports.getIndexes = exports.addEvent = void 0;

var _types = require("./types");

var getIndexes = function getIndexes(slide, endSlide, count) {
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

exports.getIndexes = getIndexes;

var addEvent = function addEvent(elem, type, eventHandler) {
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

exports.addEvent = addEvent;

var removeEvent = function removeEvent(elem, type, eventHandler) {
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

exports.removeEvent = removeEvent;

var getNextMoveIndex = function getNextMoveIndex(scrollMode, wrapAround, currentSlide, count, slidesToScroll, slidesToShow) {
  if (!wrapAround && scrollMode === _types.ScrollMode.remainder && count < currentSlide + (slidesToScroll + slidesToShow)) {
    var remindedSlides = count - (currentSlide + slidesToScroll) - (slidesToShow - slidesToScroll);
    return currentSlide + remindedSlides;
  }

  return currentSlide + slidesToScroll;
};

exports.getNextMoveIndex = getNextMoveIndex;

var getPrevMoveIndex = function getPrevMoveIndex(scrollMode, wrapAround, currentSlide, slidesToScroll) {
  if (!wrapAround && scrollMode === _types.ScrollMode.remainder && currentSlide - slidesToScroll < 0) {
    return 0;
  }

  return currentSlide - slidesToScroll;
};

exports.getPrevMoveIndex = getPrevMoveIndex;