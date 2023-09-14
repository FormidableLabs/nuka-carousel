"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const use_slide_intersection_observer_1 = require("./hooks/use-slide-intersection-observer");
const getSlideWidth = (count, wrapAround) => `${wrapAround ? 100 / (3 * count) : 100 / count}%`;
const getSlideStyles = (count, isCurrentSlide, isVisibleSlide, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight, initializedAdaptiveHeight, slideWidth) => {
    const width = slideWidth !== null && slideWidth !== void 0 ? slideWidth : getSlideWidth(count, wrapAround);
    // const width = getSlideWidth(count, wrapAround);
    const visibleSlideOpacity = isVisibleSlide ? 1 : 0;
    const animationSpeed = animation === 'fade' ? 200 : 500;
    let height = 'auto';
    if (adaptiveHeight) {
        if (initializedAdaptiveHeight) {
            // Once adaptiveHeight is initialized, the frame will size to the height
            // of all the visible slides
            height = '100%';
        }
        else if (isVisibleSlide) {
            // If the slide is visible but we're still measuring heights, have
            // visible slides just take up their natural height
            height = 'auto';
        }
        else {
            // If the slide is not visible and we're still measuring heights, the
            // slide should have height 0 so it doesn't contribute to the measured
            // height of the frame
            height = '0';
        }
    }
    return {
        width,
        height,
        padding: `0 ${cellSpacing ? cellSpacing / 2 : 0}px`,
        transition: animation ? `${speed || animationSpeed}ms ease 0s` : undefined,
        transform: animation === 'zoom'
            ? `scale(${isCurrentSlide && isVisibleSlide ? 1 : zoomScale || 0.85})`
            : undefined,
        opacity: animation === 'fade' ? visibleSlideOpacity : 1,
    };
};
const generateIndex = (index, count, typeOfSlide) => {
    if (typeOfSlide === 'prev-cloned') {
        return index - count;
    }
    if (typeOfSlide === 'next-cloned') {
        return index + count;
    }
    return index;
};
const Slide = ({ count, children, index, isCurrentSlide, typeOfSlide, wrapAround, cellSpacing, slideWidth, animation, speed, zoomScale, onVisibleSlideHeightChange, adaptiveHeight, initializedAdaptiveHeight, updateIOEntry, id, carouselRef, carouselId, tabbed, }) => {
    var _a;
    const customIndex = wrapAround
        ? generateIndex(index, count, typeOfSlide)
        : index;
    const slideRef = (0, react_1.useRef)(null);
    const entry = (0, use_slide_intersection_observer_1.useSlideIntersectionObserver)(slideRef, carouselRef, (entry) => {
        updateIOEntry(id, (entry === null || entry === void 0 ? void 0 : entry.intersectionRatio) >= 0.95);
    });
    const isVisible = !!(entry === null || entry === void 0 ? void 0 : entry.isIntersecting);
    const isFullyVisible = ((_a = entry === null || entry === void 0 ? void 0 : entry.intersectionRatio) !== null && _a !== void 0 ? _a : 1) >= 0.95;
    const prevIsVisibleRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        var _a;
        const node = slideRef.current;
        if (node) {
            const slideHeight = (_a = node.getBoundingClientRect()) === null || _a === void 0 ? void 0 : _a.height;
            const prevIsVisible = prevIsVisibleRef.current;
            if (isVisible && !prevIsVisible) {
                onVisibleSlideHeightChange(customIndex, slideHeight);
            }
            else if (!isVisible && prevIsVisible) {
                onVisibleSlideHeightChange(customIndex, null);
            }
            prevIsVisibleRef.current = isVisible;
        }
    }, [customIndex, isVisible, onVisibleSlideHeightChange]);
    const currentSlideClass = isCurrentSlide && isFullyVisible ? ' slide-current' : '';
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ ref: slideRef }, { inert: isFullyVisible ? undefined : 'true' }, { className: `slide${currentSlideClass}${typeOfSlide ? ` ${typeOfSlide}` : ''}${isFullyVisible ? ' slide-visible' : ''}`, style: getSlideStyles(count, isCurrentSlide, isFullyVisible, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight, initializedAdaptiveHeight, slideWidth), id: typeOfSlide ? undefined : `${carouselId}-slide-${index + 1}`, role: tabbed ? 'tabpanel' : 'group', "aria-roledescription": tabbed ? undefined : 'slide' }, { children: children })));
};
exports.default = Slide;
//# sourceMappingURL=slide.js.map