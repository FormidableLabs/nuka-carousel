"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagingDots = exports.getDotIndexes = exports.NextButton = exports.nextButtonDisabled = exports.PreviousButton = exports.prevButtonDisabled = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const types_1 = require("./types");
const utils_1 = require("./utils");
const defaultButtonStyles = (disabled) => ({
    border: 0,
    background: 'rgba(0,0,0,0.4)',
    color: 'white',
    padding: 10,
    textTransform: 'uppercase',
    opacity: disabled ? 0.3 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
});
const prevButtonDisabled = ({ cellAlign, currentSlide, slidesToShow, wrapAround, }) => {
    // inifite carousel
    if (wrapAround) {
        return false;
    }
    // disable if displaying the leftmost slide
    if (currentSlide === 0) {
        return true;
    }
    // remainder scroll mode
    if (cellAlign === 'right' && currentSlide <= slidesToShow - 1) {
        return true;
    }
    return false;
};
exports.prevButtonDisabled = prevButtonDisabled;
const PreviousButton = ({ previousSlide, defaultControlsConfig: { prevButtonClassName, prevButtonStyle = {}, prevButtonText, prevButtonOnClick, }, carouselId, onUserNavigation, previousDisabled: disabled, }) => {
    const handleClick = (event) => {
        prevButtonOnClick === null || prevButtonOnClick === void 0 ? void 0 : prevButtonOnClick(event);
        if (event.defaultPrevented)
            return;
        onUserNavigation(event);
        event.preventDefault();
        previousSlide();
    };
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: prevButtonClassName, style: Object.assign(Object.assign({}, defaultButtonStyles(disabled)), prevButtonStyle), disabled: disabled, onClick: handleClick, "aria-label": "previous", "aria-controls": `${carouselId}-slider-frame`, type: "button" }, { children: prevButtonText || 'Prev' })));
};
exports.PreviousButton = PreviousButton;
const nextButtonDisabled = ({ cellAlign, currentSlide, slideCount, slidesToShow, wrapAround, }) => {
    // inifite carousel
    if (wrapAround) {
        return false;
    }
    // If we are at the last possible slide without wrap, disable
    if (currentSlide >= slideCount - 1) {
        return true;
    }
    // remainder scroll mode
    if (cellAlign === 'left' && currentSlide >= slideCount - slidesToShow) {
        return true;
    }
    return false;
};
exports.nextButtonDisabled = nextButtonDisabled;
const NextButton = ({ nextSlide, defaultControlsConfig: { nextButtonClassName, nextButtonStyle = {}, nextButtonText, nextButtonOnClick, }, carouselId, nextDisabled: disabled, onUserNavigation, }) => {
    const handleClick = (event) => {
        nextButtonOnClick === null || nextButtonOnClick === void 0 ? void 0 : nextButtonOnClick(event);
        if (event.defaultPrevented)
            return;
        onUserNavigation(event);
        event.preventDefault();
        nextSlide();
    };
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: nextButtonClassName, style: Object.assign(Object.assign({}, defaultButtonStyles(disabled)), nextButtonStyle), disabled: disabled, onClick: handleClick, "aria-label": "next", "aria-controls": `${carouselId}-slider-frame`, type: "button" }, { children: nextButtonText || 'Next' })));
};
exports.NextButton = NextButton;
/**
 * Calculate the indices that each dot will jump to when clicked
 */
const getDotIndexes = (slideCount, slidesToScroll, scrollMode, slidesToShow, wrapAround, cellAlign) => {
    const dotIndexes = [];
    const scrollSlides = slidesToScroll <= 0 ? 1 : slidesToScroll;
    if (wrapAround) {
        for (let i = 0; i < slideCount; i += scrollSlides) {
            dotIndexes.push(i);
        }
        return dotIndexes;
    }
    if (cellAlign === 'center') {
        for (let i = 0; i < slideCount - 1; i += scrollSlides) {
            dotIndexes.push(i);
        }
        if (slideCount > 0) {
            dotIndexes.push(slideCount - 1);
        }
        return dotIndexes;
    }
    if (cellAlign === 'left') {
        if (slidesToShow >= slideCount) {
            return [0];
        }
        const lastPossibleIndexWithoutWhitespace = slideCount - slidesToShow;
        for (let i = 0; i < lastPossibleIndexWithoutWhitespace; i += scrollSlides) {
            dotIndexes.push(i);
        }
        if (scrollMode === types_1.ScrollMode.remainder) {
            dotIndexes.push(lastPossibleIndexWithoutWhitespace);
        }
        else {
            dotIndexes.push(dotIndexes[dotIndexes.length - 1] + scrollSlides);
        }
        return dotIndexes;
    }
    if (cellAlign === 'right') {
        if (slidesToShow >= slideCount) {
            return [slideCount - 1];
        }
        const firstPossibleIndexWithoutWhitespace = slidesToShow - 1;
        if (scrollMode === types_1.ScrollMode.remainder) {
            for (let i = firstPossibleIndexWithoutWhitespace; i < slideCount - 1; i += scrollSlides) {
                dotIndexes.push(i);
            }
            dotIndexes.push(slideCount - 1);
        }
        else {
            for (let i = slideCount - 1; i > firstPossibleIndexWithoutWhitespace; i -= scrollSlides) {
                dotIndexes.push(i);
            }
            dotIndexes.push(dotIndexes[dotIndexes.length - 1] - scrollSlides);
            dotIndexes.reverse();
        }
        return dotIndexes;
    }
    // We should never reach this, because the if statements above cover all
    // possible values of cellAlign
    return dotIndexes;
};
exports.getDotIndexes = getDotIndexes;
const PagingDots = ({ pagingDotsIndices, defaultControlsConfig: { pagingDotsContainerClassName, pagingDotsClassName, pagingDotsStyle = {}, pagingDotsOnClick, }, carouselId, currentSlide, onUserNavigation, slideCount, goToSlide, tabbed, }) => {
    const listStyles = {
        position: 'relative',
        top: -10,
        display: 'flex',
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    };
    const getButtonStyles = (0, react_1.useCallback)((active) => ({
        cursor: 'pointer',
        opacity: active ? 1 : 0.5,
        background: 'transparent',
        border: 'none',
        fill: 'black',
    }), []);
    const currentSlideBounded = (0, utils_1.getBoundedIndex)(currentSlide, slideCount);
    if (!tabbed)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: pagingDotsContainerClassName, style: listStyles, "aria-label": "Choose slide to display.", role: "tablist" }, { children: pagingDotsIndices.map((slideIndex, i) => {
            const isActive = currentSlideBounded === slideIndex ||
                // sets navigation dots active if the current slide falls in the current index range
                (currentSlideBounded < slideIndex &&
                    (i === 0 || currentSlideBounded > pagingDotsIndices[i - 1]));
            return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: [
                    'paging-item',
                    pagingDotsClassName,
                    isActive ? 'active' : null,
                ].join(' '), type: "button", style: Object.assign(Object.assign({}, getButtonStyles(isActive)), pagingDotsStyle), onClick: (event) => {
                    pagingDotsOnClick === null || pagingDotsOnClick === void 0 ? void 0 : pagingDotsOnClick(event);
                    if (event.defaultPrevented)
                        return;
                    onUserNavigation(event);
                    goToSlide(slideIndex);
                }, "aria-label": `slide ${slideIndex + 1}`, "aria-selected": isActive, "aria-controls": `${carouselId}-slide-${slideIndex + 1}`, role: "tab" }, { children: (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "paging-dot", width: "6", height: "6", "aria-hidden": "true", focusable: "false", viewBox: "0 0 6 6" }, { children: (0, jsx_runtime_1.jsx)("circle", { cx: "3", cy: "3", r: "3" }) })) }), slideIndex));
        }) })));
};
exports.PagingDots = PagingDots;
//# sourceMappingURL=default-controls.js.map