"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carousel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const slide_1 = __importDefault(require("./slide"));
const announce_slide_1 = __importDefault(require("./announce-slide"));
const slider_list_1 = require("./slider-list");
const types_1 = require("./types");
const controls_1 = __importDefault(require("./controls"));
const default_carousel_props_1 = __importDefault(require("./default-carousel-props"));
const utils_1 = require("./utils");
const use_frame_height_1 = require("./hooks/use-frame-height");
const default_controls_1 = require("./default-controls");
const Carousel = (rawProps) => {
    /**
     * We need this cast because we want the component's properties to seem
     * optional to external users, but always-present for the internal
     * implementation.
     *
     * This cast is safe due to the `Carousel.defaultProps = defaultProps;`
     * statement below. That guarantees all the properties are present, since
     * `defaultProps` has type `InternalCarouselProps`.
     */
    const props = rawProps;
    const { adaptiveHeight, adaptiveHeightAnimation, afterSlide, animation, autoplay, autoplayInterval, autoplayReverse, beforeSlide, cellAlign: propsCellAlign, cellSpacing, children, className, disableAnimation, dragging: desktopDraggingEnabled, dragThreshold: propsDragThreshold, enableKeyboardControls, frameAriaLabel, id, innerRef, keyCodeConfig, onDrag, onDragEnd, onDragStart, onUserNavigation, pauseOnHover, renderAnnounceSlideMessage, scrollMode: propsScrollMode, slideIndex, slidesToScroll: propsSlidesToScroll, slidesToShow: propsSlidesToShow, slideWidth, speed, style, swiping: mobileDraggingEnabled, tabbed, wrapAround, zoomScale, } = props;
    const filteredSlides = react_1.default.Children.toArray(children).filter(Boolean);
    const slideCount = filteredSlides.length;
    const cellAlign = slideWidth || propsSlidesToScroll === 'auto' ? 'left' : propsCellAlign;
    const scrollMode = propsSlidesToScroll === 'auto' ? types_1.ScrollMode.remainder : propsScrollMode;
    const [slideIOEntries, setSlideIOEntries] = (0, react_1.useState)(new Map());
    const visibleCount = Array.from(slideIOEntries).filter(([, visible]) => visible).length;
    const [constantVisibleCount, setConstantVisibleCount] = (0, react_1.useState)(visibleCount);
    const slidesToShow = slideWidth ? constantVisibleCount : propsSlidesToShow;
    const slidesToScroll = animation === 'fade'
        ? slidesToShow
        : propsSlidesToScroll === 'auto'
            ? Math.max(constantVisibleCount, 1)
            : propsSlidesToScroll;
    const [currentSlide, setCurrentSlide] = (0, react_1.useState)(() => (0, utils_1.getDefaultSlideIndex)(slideIndex, slideCount, slidesToShow, slidesToScroll, cellAlign, autoplayReverse, scrollMode));
    const [pause, setPause] = (0, react_1.useState)(false);
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [dragDistance, setDragDistance] = (0, react_1.useState)(0);
    const [animationDistance, setAnimationDistance] = (0, react_1.useState)(0);
    const [isAnimating, setIsAnimating] = (0, react_1.useState)(false);
    const updateSlideIOEntry = (0, react_1.useCallback)((id, isFullyVisible) => {
        if (!!slideIOEntries.get(id) === isFullyVisible)
            return;
        setSlideIOEntries((prev) => {
            const newMap = new Map(prev);
            newMap.set(id, isFullyVisible);
            return newMap;
        });
    }, [slideIOEntries]);
    const prevDragged = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (isDragging)
            prevDragged.current = true;
        if (!(isDragging || isAnimating)) {
            // Wait for the animation to complete after dragging
            if (!prevDragged.current)
                setConstantVisibleCount(visibleCount);
            prevDragged.current = false;
        }
    }, [isAnimating, isDragging, visibleCount]);
    const prevXPosition = (0, react_1.useRef)(null);
    const preDragOffset = (0, react_1.useRef)(0);
    const sliderListRef = (0, react_1.useRef)(null);
    const defaultCarouselRef = (0, react_1.useRef)(null);
    const autoplayTimeout = (0, react_1.useRef)();
    const autoplayLastTriggeredRef = (0, react_1.useRef)(null);
    const isMounted = (0, react_1.useRef)(true);
    const setSliderListRef = (0, react_1.useCallback)((node) => {
        if (node) {
            // disable img draggable attribute by default, this will improve the dragging
            // applying the querySelectorAll on just the descendants of the sliderList prevents
            // impacting DOM elements outside our scope
            node
                .querySelectorAll('.slider-list img')
                .forEach((el) => el.setAttribute('draggable', 'false'));
        }
        sliderListRef.current = node;
    }, []);
    (0, react_1.useEffect)(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    const carouselRef = innerRef || defaultCarouselRef;
    const goToSlide = (0, react_1.useCallback)((targetSlideUnbounded) => {
        if (!sliderListRef.current || !carouselRef.current)
            return;
        const targetSlideBounded = (0, utils_1.getBoundedIndex)(targetSlideUnbounded, slideCount);
        const slideChanged = targetSlideUnbounded !== currentSlide;
        slideChanged && beforeSlide(currentSlide, targetSlideBounded);
        // Calculate the distance the slide transition animation needs to cover.
        const currentOffset = sliderListRef.current.getBoundingClientRect().left -
            carouselRef.current.getBoundingClientRect().left;
        const sliderWidth = sliderListRef.current.offsetWidth;
        let targetOffset = ((0, slider_list_1.getPercentOffsetForSlide)(targetSlideBounded, slideCount, slidesToShow, cellAlign, wrapAround) /
            100) *
            sliderWidth;
        if (wrapAround) {
            // We have to do a bit of a recovery effort to figure out the closest
            // offset based on the direction we're going in the slides. The reason
            // it's complicated is because, when wrapped, both the current offset
            // and the calculated target offset are based on bounded slide indices -
            // that is, when wrapping, we often skip back to the first or last slide
            // seamlessly to make the carousel appear to infinitely repeat
            // The DOM width of `slideCount` slides
            const slideSetWidth = sliderWidth / 3;
            if (targetSlideUnbounded < 0) {
                targetOffset += slideSetWidth;
            }
            if (targetSlideUnbounded >= slideCount) {
                targetOffset -= slideSetWidth;
            }
        }
        setAnimationDistance(targetOffset - currentOffset);
        if (slideChanged) {
            // Uncache autoplay timer so new slide has full duration.
            autoplayLastTriggeredRef.current = null;
            setCurrentSlide(targetSlideBounded);
            // if animation is disabled decrease the speed to 40
            const msToEndOfAnimation = !disableAnimation ? speed || 500 : 40;
            setTimeout(() => {
                if (!isMounted.current)
                    return;
                afterSlide(targetSlideBounded);
            }, msToEndOfAnimation);
        }
    }, [
        afterSlide,
        beforeSlide,
        carouselRef,
        cellAlign,
        currentSlide,
        disableAnimation,
        speed,
        slideCount,
        slidesToShow,
        wrapAround,
    ]);
    const nextSlide = (0, react_1.useCallback)(() => {
        const nextSlideIndex = (0, utils_1.getNextMoveIndex)(scrollMode, wrapAround, currentSlide, slideCount, slidesToScroll, slidesToShow, cellAlign);
        if (currentSlide !== nextSlideIndex) {
            goToSlide(nextSlideIndex);
        }
    }, [
        cellAlign,
        currentSlide,
        goToSlide,
        slidesToScroll,
        scrollMode,
        slideCount,
        slidesToShow,
        wrapAround,
    ]);
    const prevSlide = (0, react_1.useCallback)(() => {
        const prevSlideIndex = (0, utils_1.getPrevMoveIndex)(scrollMode, wrapAround, currentSlide, slidesToScroll, slidesToShow, cellAlign);
        if (currentSlide !== prevSlideIndex) {
            goToSlide(prevSlideIndex);
        }
    }, [
        cellAlign,
        currentSlide,
        goToSlide,
        slidesToScroll,
        scrollMode,
        slidesToShow,
        wrapAround,
    ]);
    // When user changed the slideIndex property from outside.
    const prevMovedToSlideIndex = (0, react_1.useRef)(slideIndex);
    (0, react_1.useEffect)(() => {
        if (slideIndex !== undefined &&
            slideIndex !== prevMovedToSlideIndex.current &&
            !autoplayReverse) {
            goToSlide(slideIndex);
            prevMovedToSlideIndex.current = slideIndex;
        }
    }, [slideIndex, autoplayReverse, goToSlide]);
    (0, react_1.useEffect)(() => {
        let pauseStarted = null;
        // Keep track of when autoplay was paused so we can resume it with the same
        // remaining time to the next slide transition
        if (pause) {
            pauseStarted = Date.now();
        }
        return () => {
            if (pauseStarted !== null && autoplayLastTriggeredRef.current !== null) {
                autoplayLastTriggeredRef.current += Date.now() - pauseStarted;
            }
        };
    }, [pause]);
    (0, react_1.useEffect)(() => {
        if (autoplay && !pause) {
            // Adjust the timeout duration to account for changes that triggered the
            // re-creation of this timeout, such as the currentSlide being changed
            // periodically to make wrapAround loop forever
            const adjustedTimeoutMs = autoplayLastTriggeredRef.current !== null
                ? autoplayInterval - (Date.now() - autoplayLastTriggeredRef.current)
                : autoplayInterval;
            autoplayTimeout.current = setTimeout(() => {
                autoplayLastTriggeredRef.current = Date.now();
                if (autoplayReverse) {
                    prevSlide();
                }
                else {
                    nextSlide();
                }
            }, adjustedTimeoutMs);
        }
        // Clear the timeout if user hover on carousel
        if (autoplay && pause) {
            clearTimeout(autoplayTimeout.current);
        }
        return () => {
            clearTimeout(autoplayTimeout.current);
        };
    }, [
        pause,
        autoplay,
        autoplayInterval,
        autoplayReverse,
        prevSlide,
        nextSlide,
    ]);
    const onKeyDown = (event) => {
        let keyCommand = null;
        Object.keys(keyCodeConfig).forEach((command) => {
            var _a;
            if ((_a = keyCodeConfig[command]) === null || _a === void 0 ? void 0 : _a.includes(event.keyCode)) {
                keyCommand = command;
            }
        });
        if (keyCommand === null)
            return;
        // At this point we know some action is going to be triggered, so we
        // preventDefault to avoid the browser interpreting the key event and
        // stopPropagation to avoid any higher-up handlers from interpreting it.
        event.preventDefault();
        event.stopPropagation();
        switch (keyCommand) {
            case 'nextSlide':
                onUserNavigation(event);
                nextSlide();
                break;
            case 'previousSlide':
                onUserNavigation(event);
                prevSlide();
                break;
            case 'firstSlide':
            case 'lastSlide': {
                onUserNavigation(event);
                const dotIndices = (0, default_controls_1.getDotIndexes)(slideCount, slidesToScroll, scrollMode, slidesToShow, wrapAround, cellAlign);
                if (keyCommand === 'firstSlide') {
                    goToSlide(dotIndices[0]);
                }
                else {
                    goToSlide(dotIndices[dotIndices.length - 1]);
                }
                break;
            }
            case 'pause':
                setPause((p) => !p);
                break;
        }
    };
    const dragPositions = (0, react_1.useRef)([]);
    const handleDragEnd = (e) => {
        if (!isDragging || !carouselRef.current)
            return;
        setIsDragging(false);
        // Inertia calculation is used to allow quick flicks to scroll the carousel
        // where they might not based on the start and end points of the gesture
        // alone. In certain conditions, the inertia may also scroll the carousel
        // several times.
        let distanceFromInertia = 0;
        if (dragPositions.current.length > 1) {
            const startMove = dragPositions.current[0];
            const endMove = dragPositions.current[dragPositions.current.length - 1];
            const timeOffset = endMove.time - startMove.time;
            const goodInertiaFeelConstant = 9;
            const goodFrictionFeelConstant = 0.92;
            const initialVelocity = goodInertiaFeelConstant *
                Math.abs((endMove.pos - startMove.pos) / timeOffset);
            let velocity = initialVelocity;
            while (Math.abs(velocity) > 1) {
                distanceFromInertia += velocity;
                velocity *= goodFrictionFeelConstant;
            }
        }
        dragPositions.current = [];
        const adjustedDragDistance = Math.abs(dragDistance) + Math.abs(distanceFromInertia);
        onDragEnd(e);
        prevXPosition.current = null;
        setDragDistance(0);
        const oneScrollWidth = carouselRef.current.offsetWidth *
            Math.min(1, slidesToScroll / slidesToShow);
        const dragThreshold = oneScrollWidth * propsDragThreshold;
        if (adjustedDragDistance < dragThreshold) {
            goToSlide(currentSlide);
            return;
        }
        // If skipping over multiple slides at a time is still roughly trackable by
        // your eyes, we allow for skipping multiple slides with a single gesture.
        // This formula is just based off an observation that it is confusing to
        // skip from slides 1 to 3 when only one slide is shown at a time, but
        // skipping from 1 to 4 or so with two slides shown at a time is pulled-back
        // enough that you can still roughly keep track of your place in the
        // carousel.
        const canMaintainVisualContinuity = slidesToShow >= 2 * slidesToScroll;
        const timesToMove = canMaintainVisualContinuity
            ? 1 + Math.floor((adjustedDragDistance - dragThreshold) / oneScrollWidth)
            : 1;
        let nextSlideIndex = currentSlide;
        for (let index = 0; index < timesToMove; index += 1) {
            if (dragDistance > 0) {
                nextSlideIndex = (0, utils_1.getNextMoveIndex)(scrollMode, wrapAround, nextSlideIndex, slideCount, slidesToScroll, slidesToShow, cellAlign);
            }
            else {
                nextSlideIndex = (0, utils_1.getPrevMoveIndex)(scrollMode, wrapAround, nextSlideIndex, slidesToScroll, slidesToShow, cellAlign);
            }
        }
        if (nextSlideIndex !== currentSlide) {
            onUserNavigation(e);
        }
        goToSlide(nextSlideIndex);
    };
    const onTouchStart = (0, react_1.useCallback)((e) => {
        if (!mobileDraggingEnabled ||
            !sliderListRef.current ||
            !carouselRef.current) {
            return;
        }
        setIsDragging(true);
        preDragOffset.current =
            sliderListRef.current.getBoundingClientRect().left -
                carouselRef.current.getBoundingClientRect().left;
        onDragStart(e);
    }, [carouselRef, onDragStart, mobileDraggingEnabled]);
    const handlePointerMove = (0, react_1.useCallback)((xPosition) => {
        if (!isDragging)
            return;
        const isFirstMove = prevXPosition.current === null;
        const delta = prevXPosition.current !== null ? xPosition - prevXPosition.current : 0;
        const nextDragDistance = dragDistance + delta;
        const now = Date.now();
        // Maintain a buffer of drag positions from the last 100ms
        while (dragPositions.current.length > 0) {
            if (now - dragPositions.current[0].time <= 100) {
                break;
            }
            dragPositions.current.shift();
        }
        dragPositions.current.push({ pos: nextDragDistance, time: now });
        if (!isFirstMove) {
            // nextDragDistance will always be `0` on the first move event, so we
            // skip it because the value is already set to 0 at this point
            setDragDistance(nextDragDistance);
        }
        prevXPosition.current = xPosition;
    }, [isDragging, dragDistance]);
    const onTouchMove = (0, react_1.useCallback)((e) => {
        if (!isDragging || !carouselRef.current)
            return;
        onDragStart(e);
        const moveValue = carouselRef.current.offsetWidth - e.touches[0].pageX;
        handlePointerMove(moveValue);
    }, [isDragging, carouselRef, handlePointerMove, onDragStart]);
    const onMouseDown = (0, react_1.useCallback)((e) => {
        if (!desktopDraggingEnabled ||
            !sliderListRef.current ||
            !carouselRef.current)
            return;
        setIsDragging(true);
        preDragOffset.current =
            sliderListRef.current.getBoundingClientRect().left -
                carouselRef.current.getBoundingClientRect().left;
        onDragStart(e);
    }, [carouselRef, desktopDraggingEnabled, onDragStart]);
    const onMouseMove = (0, react_1.useCallback)((e) => {
        if (!isDragging || !carouselRef.current)
            return;
        onDrag(e);
        const offsetX = e.clientX - carouselRef.current.getBoundingClientRect().left;
        const moveValue = carouselRef.current.offsetWidth - offsetX;
        handlePointerMove(moveValue);
    }, [carouselRef, isDragging, handlePointerMove, onDrag]);
    const onMouseUp = (e) => {
        e.preventDefault();
        handleDragEnd(e);
    };
    const onMouseEnter = (0, react_1.useCallback)(() => {
        if (pauseOnHover) {
            setPause(true);
        }
    }, [pauseOnHover]);
    const onMouseLeave = (0, react_1.useCallback)(() => {
        if (pauseOnHover) {
            setPause(false);
        }
    }, [pauseOnHover]);
    const { frameHeight, handleVisibleSlideHeightChange, initializedAdaptiveHeight, } = (0, use_frame_height_1.useFrameHeight)(adaptiveHeight, slidesToShow, slideCount);
    const renderSlides = (typeOfSlide) => {
        const slides = filteredSlides.map((child, index) => {
            return ((0, jsx_runtime_1.jsx)(slide_1.default, Object.assign({ id: id, count: slideCount, index: index, isCurrentSlide: currentSlide === index, typeOfSlide: typeOfSlide, wrapAround: wrapAround, cellSpacing: cellSpacing, animation: animation, speed: speed, zoomScale: zoomScale, onVisibleSlideHeightChange: handleVisibleSlideHeightChange, slideWidth: slideWidth, updateIOEntry: updateSlideIOEntry, adaptiveHeight: adaptiveHeight, initializedAdaptiveHeight: initializedAdaptiveHeight, carouselRef: carouselRef, tabbed: tabbed }, { children: child }), `${typeOfSlide}-${index}`));
        });
        return slides;
    };
    return ((0, jsx_runtime_1.jsxs)("section", Object.assign({ className: 'slider-container', style: {
            position: 'relative',
        }, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, role: "group", "aria-roledescription": "carousel", "data-testid": id }, { children: [(0, jsx_runtime_1.jsx)(announce_slide_1.default, { ariaLive: autoplay && !pause ? 'off' : 'polite', message: renderAnnounceSlideMessage({
                    currentSlide,
                    count: slideCount,
                }) }, void 0), (0, controls_1.default)(props, slideCount, currentSlide, goToSlide, nextSlide, pause, prevSlide, setPause, slidesToScroll), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: ['slider-frame', className || ''].join(' ').trim(), style: Object.assign({ overflow: 'hidden', width: '100%', position: 'relative', outline: 'none', touchAction: 'pan-y', height: frameHeight, transition: adaptiveHeightAnimation
                        ? 'height 300ms ease-in-out'
                        : undefined, willChange: 'height', userSelect: 'none' }, style), "aria-label": frameAriaLabel, role: "region", tabIndex: enableKeyboardControls ? 0 : -1, onKeyDown: enableKeyboardControls ? onKeyDown : undefined, ref: carouselRef, onMouseUp: onMouseUp, onMouseDown: onMouseDown, onMouseMove: onMouseMove, onMouseLeave: onMouseUp, onTouchStart: onTouchStart, onTouchEnd: handleDragEnd, onTouchMove: onTouchMove, id: `${id}-slides` }, { children: (0, jsx_runtime_1.jsxs)(slider_list_1.SliderList, Object.assign({ animationDistance: animationDistance, cellAlign: cellAlign, currentSlide: currentSlide, disableEdgeSwiping: props.disableEdgeSwiping, draggedOffset: preDragOffset.current - dragDistance, disableAnimation: disableAnimation, easing: props.easing, edgeEasing: props.edgeEasing, isDragging: isDragging, ref: setSliderListRef, scrollMode: scrollMode, animation: animation, slideCount: slideCount, slidesToScroll: slidesToScroll, slidesToShow: slidesToShow, speed: speed, slideWidth: slideWidth, wrapAround: wrapAround, setIsAnimating: setIsAnimating }, { children: [wrapAround ? renderSlides('prev-cloned') : null, renderSlides(), wrapAround ? renderSlides('next-cloned') : null] }), void 0) }), void 0)] }), void 0));
};
exports.Carousel = Carousel;
exports.Carousel.defaultProps = default_carousel_props_1.default;
exports.default = exports.Carousel;
//# sourceMappingURL=carousel.js.map