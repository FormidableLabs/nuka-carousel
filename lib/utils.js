"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoundedIndex = exports.getDefaultSlideIndex = exports.getPrevMoveIndex = exports.getNextMoveIndex = void 0;
const default_controls_1 = require("./default-controls");
const types_1 = require("./types");
const getNextMoveIndex = (scrollMode, wrapAround, currentSlide, slideCount, slidesToScroll, slidesToShow, cellAlign) => {
    if (wrapAround) {
        return currentSlide + slidesToScroll;
    }
    // Quit early if we're already as far right as we can go
    if (currentSlide >= slideCount - 1 ||
        (cellAlign === 'left' && currentSlide >= slideCount - slidesToShow)) {
        return currentSlide;
    }
    if (scrollMode === types_1.ScrollMode.remainder && cellAlign === 'left') {
        return Math.min(currentSlide + slidesToScroll, slideCount - slidesToShow);
    }
    return Math.min(currentSlide + slidesToScroll, slideCount - 1);
};
exports.getNextMoveIndex = getNextMoveIndex;
const getPrevMoveIndex = (scrollMode, wrapAround, currentSlide, slidesToScroll, slidesToShow, cellAlign) => {
    if (wrapAround) {
        return currentSlide - slidesToScroll;
    }
    // Quit early if we're already as far left as we can go
    if (currentSlide <= 0 ||
        (cellAlign === 'right' && currentSlide <= slidesToShow - 1)) {
        return currentSlide;
    }
    if (scrollMode === types_1.ScrollMode.remainder && cellAlign === 'right') {
        return Math.max(currentSlide - slidesToScroll, slidesToShow - 1);
    }
    return Math.max(currentSlide - slidesToScroll, 0);
};
exports.getPrevMoveIndex = getPrevMoveIndex;
const getDefaultSlideIndex = (slideIndex, slideCount, slidesToShow, slidesToScroll, cellAlign, autoplayReverse, scrollMode) => {
    if (slideIndex !== undefined) {
        return slideIndex;
    }
    const dotIndexes = (0, default_controls_1.getDotIndexes)(slideCount, slidesToScroll, scrollMode, slidesToShow, false, cellAlign);
    return autoplayReverse ? dotIndexes[dotIndexes.length - 1] : dotIndexes[0];
};
exports.getDefaultSlideIndex = getDefaultSlideIndex;
/**
 * Boils down an unbounded index (-Infinity < index < Infinity) to a bounded one
 * (0 ≤ index < slideCount)
 */
const getBoundedIndex = (rawIndex, slideCount) => {
    return ((rawIndex % slideCount) + slideCount) % slideCount;
};
exports.getBoundedIndex = getBoundedIndex;
//# sourceMappingURL=utils.js.map