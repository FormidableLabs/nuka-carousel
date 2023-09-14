"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrevMoveIndex = exports.getNextMoveIndex = exports.getDefaultSlideIndex = exports.getBoundedIndex = void 0;

var _defaultControls = require("./default-controls");

var _types = require("./types");

var getNextMoveIndex = function getNextMoveIndex(scrollMode, wrapAround, currentSlide, slideCount, slidesToScroll, slidesToShow, cellAlign) {
  if (wrapAround) {
    return currentSlide + slidesToScroll;
  } // Quit early if we're already as far right as we can go


  if (currentSlide >= slideCount - 1 || cellAlign === 'left' && currentSlide >= slideCount - slidesToShow) {
    return currentSlide;
  }

  if (scrollMode === _types.ScrollMode.remainder && cellAlign === 'left') {
    return Math.min(currentSlide + slidesToScroll, slideCount - slidesToShow);
  }

  return Math.min(currentSlide + slidesToScroll, slideCount - 1);
};

exports.getNextMoveIndex = getNextMoveIndex;

var getPrevMoveIndex = function getPrevMoveIndex(scrollMode, wrapAround, currentSlide, slidesToScroll, slidesToShow, cellAlign) {
  if (wrapAround) {
    return currentSlide - slidesToScroll;
  } // Quit early if we're already as far left as we can go


  if (currentSlide <= 0 || cellAlign === 'right' && currentSlide <= slidesToShow - 1) {
    return currentSlide;
  }

  if (scrollMode === _types.ScrollMode.remainder && cellAlign === 'right') {
    return Math.max(currentSlide - slidesToScroll, slidesToShow - 1);
  }

  return Math.max(currentSlide - slidesToScroll, 0);
};

exports.getPrevMoveIndex = getPrevMoveIndex;

var getDefaultSlideIndex = function getDefaultSlideIndex(slideIndex, slideCount, slidesToShow, slidesToScroll, cellAlign, autoplayReverse, scrollMode) {
  if (slideIndex !== undefined) {
    return slideIndex;
  }

  var dotIndexes = (0, _defaultControls.getDotIndexes)(slideCount, slidesToScroll, scrollMode, slidesToShow, false, cellAlign);
  return autoplayReverse ? dotIndexes[dotIndexes.length - 1] : dotIndexes[0];
};
/**
 * Boils down an unbounded index (-Infinity < index < Infinity) to a bounded one
 * (0 ≤ index < slideCount)
 */


exports.getDefaultSlideIndex = getDefaultSlideIndex;

var getBoundedIndex = function getBoundedIndex(rawIndex, slideCount) {
  return (rawIndex % slideCount + slideCount) % slideCount;
};

exports.getBoundedIndex = getBoundedIndex;