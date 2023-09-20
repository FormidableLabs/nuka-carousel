"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderList = exports.getPercentOffsetForSlide = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const default_controls_1 = require("./default-controls");
const use_tween_1 = require("./hooks/use-tween");
const getPercentOffsetForSlide = (currentSlide, slideCount, slidesToShow, cellAlign, wrapAround) => {
    // When wrapAround is enabled, we show the slides 3 times
    const renderedSlideCount = wrapAround ? 3 * slideCount : slideCount;
    const singleSlidePercentOfWhole = 100 / renderedSlideCount;
    // When wrap is on, -33.33% puts us right on the center, true set of slides
    // (the left and right sets are clones meant to avoid visual gaps)
    let slide0Offset = wrapAround ? -100 / 3 : 0;
    if (cellAlign === 'right' && slidesToShow > 1) {
        const excessSlides = slidesToShow - 1;
        slide0Offset += singleSlidePercentOfWhole * excessSlides;
    }
    if (cellAlign === 'center' && slidesToShow > 1) {
        const excessSlides = slidesToShow - 1;
        // Half of excess is on left and half is on right when centered
        const excessLeftSlides = excessSlides / 2;
        slide0Offset += singleSlidePercentOfWhole * excessLeftSlides;
    }
    const currentSlideOffsetFrom0 = (100 / renderedSlideCount) * currentSlide;
    return slide0Offset - currentSlideOffsetFrom0;
};
exports.getPercentOffsetForSlide = getPercentOffsetForSlide;
exports.SliderList = react_1.default.forwardRef(({ animation, animationDistance, cellAlign, children, currentSlide, disableAnimation, disableEdgeSwiping, draggedOffset, easing, edgeEasing, isDragging, scrollMode, slideCount, slidesToScroll, slidesToShow, speed, wrapAround, slideWidth, setIsAnimating, }, forwardedRef) => {
    // When wrapAround is enabled, we show the slides 3 times
    const renderedSlideCount = wrapAround ? 3 * slideCount : slideCount;
    const listVisibleWidth = slideWidth
        ? `calc(${slideWidth} * ${renderedSlideCount})`
        : `${(renderedSlideCount * 100) / slidesToShow}%`;
    const percentOffsetForSlideProps = [
        slideCount,
        slidesToShow,
        cellAlign,
        wrapAround,
    ];
    // We recycle dot index generation to determine the leftmost and rightmost
    // indices used, to be used in calculating the x-translation values we need
    // to limit to or when edgeEasing should be used.
    const dotIndexes = (0, default_controls_1.getDotIndexes)(slideCount, slidesToScroll, scrollMode, slidesToShow, wrapAround, cellAlign);
    let clampedDraggedOffset = `${draggedOffset}px`;
    if (isDragging && disableEdgeSwiping && !wrapAround) {
        const clampOffsets = [
            dotIndexes[0],
            dotIndexes[dotIndexes.length - 1],
        ].map((index) => (0, exports.getPercentOffsetForSlide)(index, ...percentOffsetForSlideProps));
        // Offsets are seemingly backwards because the rightmost slide creates
        // the most negative translate value
        clampedDraggedOffset = `clamp(${clampOffsets[1]}%, ${draggedOffset}px, ${clampOffsets[0]}%)`;
    }
    const slideBasedOffset = (0, exports.getPercentOffsetForSlide)(currentSlide, ...percentOffsetForSlideProps);
    const isEdgeEasing = !disableEdgeSwiping &&
        !wrapAround &&
        ((currentSlide === dotIndexes[0] && animationDistance < 0) ||
            (currentSlide === dotIndexes[dotIndexes.length - 1] &&
                animationDistance > 0));
    const { value: transition, isAnimating } = (0, use_tween_1.useTween)(speed, !isEdgeEasing ? easing : edgeEasing, 
    // animationDistance is assumed to be unique enough that it can be used to
    // detect when a new animation should start. This is used in addition to
    // currentSlide because some animations, such as those with edgeEasing, do
    // not occur due to a change in value of currentSlide
    currentSlide + animationDistance, isDragging || disableAnimation || animation === 'fade');
    // Return undefined if the transform would be 0 pixels since transforms can
    // cause flickering in chrome.
    let positioning;
    if (isDragging || slideBasedOffset !== 0 || isAnimating) {
        if (isDragging) {
            positioning = `translateX(${clampedDraggedOffset})`;
        }
        else {
            const transitionOffset = isAnimating
                ? (1 - transition) * animationDistance
                : 0;
            positioning = `translateX(calc(${slideBasedOffset}% - ${transitionOffset}px))`;
        }
    }
    (0, react_1.useEffect)(() => {
        setIsAnimating(isAnimating);
    }, [isAnimating, setIsAnimating]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ ref: forwardedRef, className: "slider-list", style: {
            width: listVisibleWidth,
            textAlign: 'left',
            userSelect: 'auto',
            transform: positioning,
            display: 'flex',
        } }, { children: children })));
});
exports.SliderList.displayName = 'SliderList';
//# sourceMappingURL=slider-list.js.map