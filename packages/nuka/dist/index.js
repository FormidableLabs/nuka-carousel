"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __pow = Math.pow;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Alignment: () => Alignment,
  Directions: () => Directions,
  NextButton: () => NextButton,
  PagingDots: () => PagingDots,
  Positions: () => Positions,
  PreviousButton: () => PreviousButton,
  ScrollMode: () => ScrollMode,
  default: () => Carousel
});
module.exports = __toCommonJS(src_exports);

// src/carousel.tsx
var import_react9 = __toESM(require("react"));

// src/slide.tsx
var import_react2 = require("react");

// src/hooks/use-slide-intersection-observer.ts
var import_react = require("react");
var useSlideIntersectionObserver = (elementRef, rootRef, callback) => {
  const [entry, setEntry] = (0, import_react.useState)();
  const callbackRef = (0, import_react.useRef)(callback);
  (0, import_react.useEffect)(() => {
    callbackRef.current = callback;
  }, [callback]);
  (0, import_react.useEffect)(() => {
    const node = elementRef == null ? void 0 : elementRef.current;
    const root = rootRef == null ? void 0 : rootRef.current;
    if (!window.IntersectionObserver || !node || !root)
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry2) => {
          setEntry(entry2);
          callbackRef.current(entry2);
        });
      },
      {
        threshold: [0.05, 0.95],
        root
      }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [elementRef, rootRef]);
  return entry;
};

// src/slide.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var getSlideWidth = (count, wrapAround) => `${wrapAround ? 100 / (3 * count) : 100 / count}%`;
var getSlideStyles = (count, isCurrentSlide, isVisibleSlide, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight, initializedAdaptiveHeight, slideWidth) => {
  const width = slideWidth != null ? slideWidth : getSlideWidth(count, wrapAround);
  const visibleSlideOpacity = isVisibleSlide ? 1 : 0;
  const animationSpeed = animation === "fade" ? 200 : 500;
  let height = "auto";
  if (adaptiveHeight) {
    if (initializedAdaptiveHeight) {
      height = "100%";
    } else if (isVisibleSlide) {
      height = "auto";
    } else {
      height = "0";
    }
  }
  return {
    width,
    height,
    padding: `0 ${cellSpacing ? cellSpacing / 2 : 0}px`,
    transition: animation ? `${speed || animationSpeed}ms ease 0s` : void 0,
    transform: animation === "zoom" ? `scale(${isCurrentSlide && isVisibleSlide ? 1 : zoomScale || 0.85})` : void 0,
    opacity: animation === "fade" ? visibleSlideOpacity : 1
  };
};
var generateIndex = (index, count, typeOfSlide) => {
  if (typeOfSlide === "prev-cloned") {
    return index - count;
  }
  if (typeOfSlide === "next-cloned") {
    return index + count;
  }
  return index;
};
var Slide = ({
  count,
  children,
  index,
  isCurrentSlide,
  typeOfSlide,
  wrapAround,
  cellSpacing,
  slideWidth,
  animation,
  speed,
  zoomScale,
  onVisibleSlideHeightChange,
  adaptiveHeight,
  initializedAdaptiveHeight,
  updateIOEntry,
  id,
  carouselRef
}) => {
  var _a;
  const customIndex = wrapAround ? generateIndex(index, count, typeOfSlide) : index;
  const slideRef = (0, import_react2.useRef)(null);
  const entry = useSlideIntersectionObserver(slideRef, carouselRef, (entry2) => {
    updateIOEntry(id, (entry2 == null ? void 0 : entry2.intersectionRatio) >= 0.95);
  });
  const isVisible = !!(entry == null ? void 0 : entry.isIntersecting);
  const isFullyVisible = ((_a = entry == null ? void 0 : entry.intersectionRatio) != null ? _a : 1) >= 0.95;
  const prevIsVisibleRef = (0, import_react2.useRef)(false);
  (0, import_react2.useEffect)(() => {
    var _a2;
    const node = slideRef.current;
    if (node) {
      const slideHeight = (_a2 = node.getBoundingClientRect()) == null ? void 0 : _a2.height;
      const prevIsVisible = prevIsVisibleRef.current;
      if (isVisible && !prevIsVisible) {
        onVisibleSlideHeightChange(customIndex, slideHeight);
      } else if (!isVisible && prevIsVisible) {
        onVisibleSlideHeightChange(customIndex, null);
      }
      prevIsVisibleRef.current = isVisible;
    }
  }, [customIndex, isVisible, onVisibleSlideHeightChange]);
  const currentSlideClass = isCurrentSlide && isFullyVisible ? " slide-current" : "";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    __spreadProps(__spreadValues({
      ref: slideRef
    }, { inert: isFullyVisible ? void 0 : "true" }), {
      className: `slide${currentSlideClass}${typeOfSlide ? ` ${typeOfSlide}` : ""}${isFullyVisible ? " slide-visible" : ""}`,
      style: getSlideStyles(
        count,
        isCurrentSlide,
        isFullyVisible,
        wrapAround,
        cellSpacing,
        animation,
        speed,
        zoomScale,
        adaptiveHeight,
        initializedAdaptiveHeight,
        slideWidth
      ),
      children
    })
  );
};
var slide_default = Slide;

// src/announce-slide.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var styles = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  padding: 0,
  margin: "-1px",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0
};
var AnnounceSlide = ({
  message,
  ariaLive = "polite"
}) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "aria-live": ariaLive, "aria-atomic": "true", style: styles, tabIndex: -1, children: message });
var defaultRenderAnnounceSlideMessage = ({
  currentSlide,
  count
}) => `Slide ${currentSlide + 1} of ${count}`;
var announce_slide_default = AnnounceSlide;

// src/slider-list.tsx
var import_react5 = __toESM(require("react"));

// src/default-controls.tsx
var import_react3 = require("react");

// src/types.ts
var Alignment = /* @__PURE__ */ ((Alignment2) => {
  Alignment2["Center"] = "center";
  Alignment2["Right"] = "right";
  Alignment2["Left"] = "left";
  return Alignment2;
})(Alignment || {});
var Directions = /* @__PURE__ */ ((Directions2) => {
  Directions2["Next"] = "next";
  Directions2["Prev"] = "prev";
  Directions2["Up"] = "up";
  Directions2["Down"] = "down";
  return Directions2;
})(Directions || {});
var Positions = /* @__PURE__ */ ((Positions2) => {
  Positions2["TopLeft"] = "TopLeft";
  Positions2["TopCenter"] = "TopCenter";
  Positions2["TopRight"] = "TopRight";
  Positions2["CenterLeft"] = "CenterLeft";
  Positions2["CenterCenter"] = "CenterCenter";
  Positions2["CenterRight"] = "CenterRight";
  Positions2["BottomLeft"] = "BottomLeft";
  Positions2["BottomCenter"] = "BottomCenter";
  Positions2["BottomRight"] = "BottomRight";
  return Positions2;
})(Positions || {});
var ScrollMode = /* @__PURE__ */ ((ScrollMode2) => {
  ScrollMode2["page"] = "page";
  ScrollMode2["remainder"] = "remainder";
  return ScrollMode2;
})(ScrollMode || {});

// src/utils.ts
var getNextMoveIndex = (scrollMode, wrapAround, currentSlide, slideCount, slidesToScroll, slidesToShow, cellAlign) => {
  if (wrapAround) {
    return currentSlide + slidesToScroll;
  }
  if (currentSlide >= slideCount - 1 || cellAlign === "left" && currentSlide >= slideCount - slidesToShow) {
    return currentSlide;
  }
  if (scrollMode === "remainder" /* remainder */ && cellAlign === "left") {
    return Math.min(currentSlide + slidesToScroll, slideCount - slidesToShow);
  }
  return Math.min(currentSlide + slidesToScroll, slideCount - 1);
};
var getPrevMoveIndex = (scrollMode, wrapAround, currentSlide, slidesToScroll, slidesToShow, cellAlign) => {
  if (wrapAround) {
    return currentSlide - slidesToScroll;
  }
  if (currentSlide <= 0 || cellAlign === "right" && currentSlide <= slidesToShow - 1) {
    return currentSlide;
  }
  if (scrollMode === "remainder" /* remainder */ && cellAlign === "right") {
    return Math.max(currentSlide - slidesToScroll, slidesToShow - 1);
  }
  return Math.max(currentSlide - slidesToScroll, 0);
};
var getDefaultSlideIndex = (slideIndex, slideCount, slidesToShow, slidesToScroll, cellAlign, autoplayReverse, scrollMode) => {
  if (slideIndex !== void 0) {
    return slideIndex;
  }
  const dotIndexes = getDotIndexes(
    slideCount,
    slidesToScroll,
    scrollMode,
    slidesToShow,
    false,
    cellAlign
  );
  return autoplayReverse ? dotIndexes[dotIndexes.length - 1] : dotIndexes[0];
};
var getBoundedIndex = (rawIndex, slideCount) => {
  return (rawIndex % slideCount + slideCount) % slideCount;
};

// src/default-controls.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var defaultButtonStyles = (disabled) => ({
  border: 0,
  background: "rgba(0,0,0,0.4)",
  color: "white",
  padding: 10,
  textTransform: "uppercase",
  opacity: disabled ? 0.3 : 1,
  cursor: disabled ? "not-allowed" : "pointer"
});
var prevButtonDisabled = ({
  cellAlign,
  currentSlide,
  slidesToShow,
  wrapAround
}) => {
  if (wrapAround) {
    return false;
  }
  if (currentSlide === 0) {
    return true;
  }
  if (cellAlign === "right" && currentSlide <= slidesToShow - 1) {
    return true;
  }
  return false;
};
var PreviousButton = ({
  previousSlide,
  defaultControlsConfig: {
    prevButtonClassName,
    prevButtonStyle = {},
    prevButtonText,
    prevButtonOnClick
  },
  onUserNavigation,
  previousDisabled: disabled
}) => {
  const handleClick = (event) => {
    prevButtonOnClick == null ? void 0 : prevButtonOnClick(event);
    if (event.defaultPrevented)
      return;
    onUserNavigation(event);
    event.preventDefault();
    previousSlide();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "button",
    {
      className: prevButtonClassName,
      style: __spreadValues(__spreadValues({}, defaultButtonStyles(disabled)), prevButtonStyle),
      disabled,
      onClick: handleClick,
      "aria-label": "previous",
      type: "button",
      children: prevButtonText || "Prev"
    }
  );
};
var nextButtonDisabled = ({
  cellAlign,
  currentSlide,
  slideCount,
  slidesToShow,
  wrapAround
}) => {
  if (wrapAround) {
    return false;
  }
  if (currentSlide >= slideCount - 1) {
    return true;
  }
  if (cellAlign === "left" && currentSlide >= slideCount - slidesToShow) {
    return true;
  }
  return false;
};
var NextButton = ({
  nextSlide,
  defaultControlsConfig: {
    nextButtonClassName,
    nextButtonStyle = {},
    nextButtonText,
    nextButtonOnClick
  },
  nextDisabled: disabled,
  onUserNavigation
}) => {
  const handleClick = (event) => {
    nextButtonOnClick == null ? void 0 : nextButtonOnClick(event);
    if (event.defaultPrevented)
      return;
    onUserNavigation(event);
    event.preventDefault();
    nextSlide();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "button",
    {
      className: nextButtonClassName,
      style: __spreadValues(__spreadValues({}, defaultButtonStyles(disabled)), nextButtonStyle),
      disabled,
      onClick: handleClick,
      "aria-label": "next",
      type: "button",
      children: nextButtonText || "Next"
    }
  );
};
var getDotIndexes = (slideCount, slidesToScroll, scrollMode, slidesToShow, wrapAround, cellAlign) => {
  const dotIndexes = [];
  const scrollSlides = slidesToScroll <= 0 ? 1 : slidesToScroll;
  if (wrapAround) {
    for (let i = 0; i < slideCount; i += scrollSlides) {
      dotIndexes.push(i);
    }
    return dotIndexes;
  }
  if (cellAlign === "center") {
    for (let i = 0; i < slideCount - 1; i += scrollSlides) {
      dotIndexes.push(i);
    }
    if (slideCount > 0) {
      dotIndexes.push(slideCount - 1);
    }
    return dotIndexes;
  }
  if (cellAlign === "left") {
    if (slidesToShow >= slideCount) {
      return [0];
    }
    const lastPossibleIndexWithoutWhitespace = slideCount - slidesToShow;
    for (let i = 0; i < lastPossibleIndexWithoutWhitespace; i += scrollSlides) {
      dotIndexes.push(i);
    }
    if (scrollMode === "remainder" /* remainder */) {
      dotIndexes.push(lastPossibleIndexWithoutWhitespace);
    } else {
      dotIndexes.push(dotIndexes[dotIndexes.length - 1] + scrollSlides);
    }
    return dotIndexes;
  }
  if (cellAlign === "right") {
    if (slidesToShow >= slideCount) {
      return [slideCount - 1];
    }
    const firstPossibleIndexWithoutWhitespace = slidesToShow - 1;
    if (scrollMode === "remainder" /* remainder */) {
      for (let i = firstPossibleIndexWithoutWhitespace; i < slideCount - 1; i += scrollSlides) {
        dotIndexes.push(i);
      }
      dotIndexes.push(slideCount - 1);
    } else {
      for (let i = slideCount - 1; i > firstPossibleIndexWithoutWhitespace; i -= scrollSlides) {
        dotIndexes.push(i);
      }
      dotIndexes.push(dotIndexes[dotIndexes.length - 1] - scrollSlides);
      dotIndexes.reverse();
    }
    return dotIndexes;
  }
  return dotIndexes;
};
var PagingDots = ({
  pagingDotsIndices,
  defaultControlsConfig: {
    pagingDotsContainerClassName,
    pagingDotsClassName,
    pagingDotsStyle = {},
    pagingDotsOnClick
  },
  currentSlide,
  onUserNavigation,
  slideCount,
  goToSlide
}) => {
  const listStyles = {
    position: "relative",
    top: -10,
    display: "flex",
    margin: 0,
    padding: 0,
    listStyleType: "none"
  };
  const getButtonStyles = (0, import_react3.useCallback)(
    (active) => ({
      cursor: "pointer",
      opacity: active ? 1 : 0.5,
      background: "transparent",
      border: "none",
      fill: "black"
    }),
    []
  );
  const currentSlideBounded = getBoundedIndex(currentSlide, slideCount);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ul", { className: pagingDotsContainerClassName, style: listStyles, children: pagingDotsIndices.map((slideIndex, i) => {
    const isActive = currentSlideBounded === slideIndex || // sets navigation dots active if the current slide falls in the current index range
    currentSlideBounded < slideIndex && (i === 0 || currentSlideBounded > pagingDotsIndices[i - 1]);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "li",
      {
        className: isActive ? "paging-item active" : "paging-item",
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            className: pagingDotsClassName,
            type: "button",
            style: __spreadValues(__spreadValues({}, getButtonStyles(isActive)), pagingDotsStyle),
            onClick: (event) => {
              pagingDotsOnClick == null ? void 0 : pagingDotsOnClick(event);
              if (event.defaultPrevented)
                return;
              onUserNavigation(event);
              goToSlide(slideIndex);
            },
            "aria-label": `slide ${slideIndex + 1} bullet`,
            "aria-selected": isActive,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "svg",
              {
                className: "paging-dot",
                width: "6",
                height: "6",
                "aria-hidden": "true",
                focusable: "false",
                viewBox: "0 0 6 6",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "3", cy: "3", r: "3" })
              }
            )
          }
        )
      },
      slideIndex
    );
  }) });
};

// src/hooks/use-tween.ts
var import_react4 = require("react");
var useTween = (durationMs, easingFunction, navigationNum, shouldInterrupt) => {
  const [normalizedTimeRaw, setNormalizedTime] = (0, import_react4.useState)(1);
  const startTime = (0, import_react4.useRef)(Date.now());
  const rAF = (0, import_react4.useRef)();
  const isFirstRender = (0, import_react4.useRef)(true);
  const lastNavigationNum = (0, import_react4.useRef)(null);
  const normalizedTime = lastNavigationNum.current === null || lastNavigationNum.current === navigationNum || shouldInterrupt ? normalizedTimeRaw : 0;
  (0, import_react4.useEffect)(() => {
    lastNavigationNum.current = navigationNum;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (shouldInterrupt) {
      return;
    }
    startTime.current = Date.now();
    setNormalizedTime(0);
    const tick = () => {
      rAF.current = requestAnimationFrame(() => {
        const currentTime = Date.now();
        const normalizedTime2 = Math.min(
          1,
          (currentTime - startTime.current) / durationMs
        );
        setNormalizedTime(normalizedTime2);
        if (normalizedTime2 < 1) {
          tick();
        } else {
          rAF.current = void 0;
        }
      });
    };
    tick();
    return () => {
      if (rAF.current !== void 0) {
        cancelAnimationFrame(rAF.current);
        setNormalizedTime(1);
      }
    };
  }, [navigationNum, durationMs, shouldInterrupt]);
  return {
    isAnimating: normalizedTime !== 1,
    value: easingFunction(normalizedTime)
  };
};

// src/slider-list.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var getPercentOffsetForSlide = (currentSlide, slideCount, slidesToShow, cellAlign, wrapAround) => {
  const renderedSlideCount = wrapAround ? 3 * slideCount : slideCount;
  const singleSlidePercentOfWhole = 100 / renderedSlideCount;
  let slide0Offset = wrapAround ? -100 / 3 : 0;
  if (cellAlign === "right" && slidesToShow > 1) {
    const excessSlides = slidesToShow - 1;
    slide0Offset += singleSlidePercentOfWhole * excessSlides;
  }
  if (cellAlign === "center" && slidesToShow > 1) {
    const excessSlides = slidesToShow - 1;
    const excessLeftSlides = excessSlides / 2;
    slide0Offset += singleSlidePercentOfWhole * excessLeftSlides;
  }
  const currentSlideOffsetFrom0 = 100 / renderedSlideCount * currentSlide;
  return slide0Offset - currentSlideOffsetFrom0;
};
var SliderList = import_react5.default.forwardRef(
  ({
    animation,
    animationDistance,
    cellAlign,
    children,
    currentSlide,
    disableAnimation,
    disableEdgeSwiping,
    draggedOffset,
    easing,
    edgeEasing,
    isDragging,
    scrollMode,
    slideCount,
    slidesToScroll,
    slidesToShow,
    speed,
    wrapAround,
    slideWidth,
    setIsAnimating
  }, forwardedRef) => {
    const renderedSlideCount = wrapAround ? 3 * slideCount : slideCount;
    const listVisibleWidth = slideWidth ? `calc(${slideWidth} * ${renderedSlideCount})` : `${renderedSlideCount * 100 / slidesToShow}%`;
    const percentOffsetForSlideProps = [
      slideCount,
      slidesToShow,
      cellAlign,
      wrapAround
    ];
    const dotIndexes = getDotIndexes(
      slideCount,
      slidesToScroll,
      scrollMode,
      slidesToShow,
      wrapAround,
      cellAlign
    );
    let clampedDraggedOffset = `${draggedOffset}px`;
    if (isDragging && disableEdgeSwiping && !wrapAround) {
      const clampOffsets = [
        dotIndexes[0],
        dotIndexes[dotIndexes.length - 1]
      ].map(
        (index) => getPercentOffsetForSlide(index, ...percentOffsetForSlideProps)
      );
      clampedDraggedOffset = `clamp(${clampOffsets[1]}%, ${draggedOffset}px, ${clampOffsets[0]}%)`;
    }
    const slideBasedOffset = getPercentOffsetForSlide(
      currentSlide,
      ...percentOffsetForSlideProps
    );
    const isEdgeEasing = !disableEdgeSwiping && !wrapAround && (currentSlide === dotIndexes[0] && animationDistance < 0 || currentSlide === dotIndexes[dotIndexes.length - 1] && animationDistance > 0);
    const { value: transition, isAnimating } = useTween(
      speed,
      !isEdgeEasing ? easing : edgeEasing,
      // animationDistance is assumed to be unique enough that it can be used to
      // detect when a new animation should start. This is used in addition to
      // currentSlide because some animations, such as those with edgeEasing, do
      // not occur due to a change in value of currentSlide
      currentSlide + animationDistance,
      isDragging || disableAnimation || animation === "fade"
    );
    let positioning;
    if (isDragging || slideBasedOffset !== 0 || isAnimating) {
      if (isDragging) {
        positioning = `translateX(${clampedDraggedOffset})`;
      } else {
        const transitionOffset = isAnimating ? (1 - transition) * animationDistance : 0;
        positioning = `translateX(calc(${slideBasedOffset}% - ${transitionOffset}px))`;
      }
    }
    (0, import_react5.useEffect)(() => {
      setIsAnimating(isAnimating);
    }, [isAnimating, setIsAnimating]);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        ref: forwardedRef,
        className: "slider-list",
        style: {
          width: listVisibleWidth,
          textAlign: "left",
          userSelect: "auto",
          transform: positioning,
          display: "flex"
        },
        children
      }
    );
  }
);
SliderList.displayName = "SliderList";

// src/controls.tsx
var import_react6 = require("react");

// src/control-styles.ts
var commonStyles = {
  position: "absolute",
  display: "flex",
  zIndex: 1,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};
var getControlContainerFlexStyles = (pos) => {
  let alignItems;
  switch (pos) {
    case "TopLeft" /* TopLeft */:
    case "TopCenter" /* TopCenter */:
    case "TopRight" /* TopRight */:
      alignItems = "flex-start";
      break;
    case "CenterLeft" /* CenterLeft */:
    case "CenterCenter" /* CenterCenter */:
    case "CenterRight" /* CenterRight */:
      alignItems = "center";
      break;
    case "BottomLeft" /* BottomLeft */:
    case "BottomCenter" /* BottomCenter */:
    case "BottomRight" /* BottomRight */:
      alignItems = "flex-end";
      break;
  }
  let justifyContent;
  switch (pos) {
    case "TopLeft" /* TopLeft */:
    case "CenterLeft" /* CenterLeft */:
    case "BottomLeft" /* BottomLeft */:
      justifyContent = "flex-start";
      break;
    case "TopCenter" /* TopCenter */:
    case "CenterCenter" /* CenterCenter */:
    case "BottomCenter" /* BottomCenter */:
      justifyContent = "center";
      break;
    case "TopRight" /* TopRight */:
    case "CenterRight" /* CenterRight */:
    case "BottomRight" /* BottomRight */:
      justifyContent = "flex-end";
      break;
  }
  return { alignItems, justifyContent };
};
var getControlContainerStyles = (pos) => {
  return __spreadValues(__spreadValues({}, getControlContainerFlexStyles(pos)), commonStyles);
};

// src/controls.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var controlsMap = [
  { funcName: "renderTopLeftControls", key: "TopLeft" /* TopLeft */ },
  { funcName: "renderTopCenterControls", key: "TopCenter" /* TopCenter */ },
  { funcName: "renderTopRightControls", key: "TopRight" /* TopRight */ },
  { funcName: "renderCenterLeftControls", key: "CenterLeft" /* CenterLeft */ },
  { funcName: "renderCenterCenterControls", key: "CenterCenter" /* CenterCenter */ },
  { funcName: "renderCenterRightControls", key: "CenterRight" /* CenterRight */ },
  { funcName: "renderBottomLeftControls", key: "BottomLeft" /* BottomLeft */ },
  { funcName: "renderBottomCenterControls", key: "BottomCenter" /* BottomCenter */ },
  { funcName: "renderBottomRightControls", key: "BottomRight" /* BottomRight */ }
];
var renderControls = (props, slideCount, currentSlide, goToSlide, nextSlide, prevSlide, slidesToScroll) => {
  if (props.withoutControls) {
    return null;
  }
  const disableCheckProps = __spreadProps(__spreadValues({}, props), {
    currentSlide,
    slideCount
  });
  const nextDisabled = nextButtonDisabled(disableCheckProps);
  const previousDisabled = prevButtonDisabled(disableCheckProps);
  const pagingDotsIndices = getDotIndexes(
    slideCount,
    slidesToScroll,
    props.scrollMode,
    props.slidesToShow,
    props.wrapAround,
    props.cellAlign
  );
  return controlsMap.map((control) => {
    var _a;
    if (!props[control.funcName] || typeof props[control.funcName] !== "function") {
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react6.Fragment, {}, control.funcName);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "div",
      {
        style: __spreadProps(__spreadValues({}, getControlContainerStyles(control.key)), {
          pointerEvents: "none"
        }),
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "div",
          {
            className: [
              `slider-control-${control.key.toLowerCase()}`,
              props.defaultControlsConfig.containerClassName || ""
            ].join(" ").trim(),
            style: { pointerEvents: "auto" },
            children: (_a = props[control.funcName]) == null ? void 0 : _a.call(props, {
              cellAlign: props.cellAlign,
              cellSpacing: props.cellSpacing,
              currentSlide,
              defaultControlsConfig: props.defaultControlsConfig || {},
              pagingDotsIndices,
              goToSlide,
              nextDisabled,
              nextSlide,
              onUserNavigation: props.onUserNavigation,
              previousDisabled,
              previousSlide: prevSlide,
              scrollMode: props.scrollMode,
              slideCount,
              slidesToScroll,
              slidesToShow: props.slidesToShow || 1,
              vertical: props.vertical,
              wrapAround: props.wrapAround
            })
          }
        )
      },
      control.funcName
    );
  });
};
var controls_default = renderControls;

// src/default-carousel-props.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var easeOut = (t) => __pow(t - 1, 3) + 1;
var defaultProps = {
  adaptiveHeight: false,
  adaptiveHeightAnimation: true,
  afterSlide: () => {
  },
  autoplay: false,
  autoplayInterval: 3e3,
  autoplayReverse: false,
  beforeSlide: () => {
  },
  cellAlign: "left",
  cellSpacing: 0,
  defaultControlsConfig: {},
  disableAnimation: false,
  disableEdgeSwiping: false,
  dragging: true,
  dragThreshold: 0.5,
  easing: easeOut,
  edgeEasing: easeOut,
  enableKeyboardControls: false,
  frameAriaLabel: "carousel-slider",
  keyCodeConfig: {
    nextSlide: [39, 68, 38, 87],
    previousSlide: [37, 65, 40, 83],
    firstSlide: [81],
    lastSlide: [69],
    pause: [32]
  },
  onDragStart: () => {
  },
  onDrag: () => {
  },
  onDragEnd: () => {
  },
  onUserNavigation: () => {
  },
  pauseOnHover: true,
  renderAnnounceSlideMessage: defaultRenderAnnounceSlideMessage,
  renderBottomCenterControls: (props) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(PagingDots, __spreadValues({}, props)),
  renderCenterLeftControls: (props) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(PreviousButton, __spreadValues({}, props)),
  renderCenterRightControls: (props) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(NextButton, __spreadValues({}, props)),
  scrollMode: "page" /* page */,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  style: {},
  swiping: true,
  vertical: false,
  withoutControls: false,
  wrapAround: false,
  children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, {})
};
var default_carousel_props_default = defaultProps;

// src/hooks/use-frame-height.ts
var import_react8 = require("react");

// src/hooks/use-state-with-ref.ts
var import_react7 = require("react");
var useStateWithRef = (initialState) => {
  const [value, setValue] = (0, import_react7.useState)(initialState);
  const valueRef = (0, import_react7.useRef)(initialState);
  const setValueAndRef = (0, import_react7.useCallback)((newValue) => {
    valueRef.current = newValue;
    setValue(newValue);
  }, []);
  return [value, setValueAndRef, valueRef];
};

// src/hooks/use-frame-height.ts
var useFrameHeight = (adaptiveHeight, slidesToShow, slideCount) => {
  const [visibleHeights, setVisibleHeights, visibleHeightsRef] = useStateWithRef([]);
  const [initializedAdaptiveHeight, setInitializedAdaptiveHeight] = (0, import_react8.useState)(false);
  const handleVisibleSlideHeightChange = (0, import_react8.useCallback)(
    (slideIndex, height) => {
      const latestVisibleHeights = visibleHeightsRef.current;
      let newVisibleHeights;
      if (height === null) {
        newVisibleHeights = latestVisibleHeights.filter(
          (slideHeight) => slideHeight.slideIndex !== slideIndex
        );
      } else {
        newVisibleHeights = [...latestVisibleHeights, { slideIndex, height }];
      }
      setVisibleHeights(newVisibleHeights);
      if (newVisibleHeights.length >= Math.min(slideCount, Math.ceil(slidesToShow))) {
        setInitializedAdaptiveHeight(true);
      }
    },
    [slideCount, setVisibleHeights, slidesToShow, visibleHeightsRef]
  );
  const frameHeight = (0, import_react8.useMemo)(() => {
    if (adaptiveHeight) {
      if (!initializedAdaptiveHeight) {
        return "auto";
      }
      const maxHeight = Math.max(
        0,
        ...visibleHeights.map((height) => height.height)
      );
      return `${maxHeight}px`;
    } else {
      return "auto";
    }
  }, [adaptiveHeight, initializedAdaptiveHeight, visibleHeights]);
  return {
    handleVisibleSlideHeightChange,
    frameHeight,
    initializedAdaptiveHeight
  };
};

// src/carousel.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var Carousel = (rawProps) => {
  const props = rawProps;
  const {
    adaptiveHeight,
    adaptiveHeightAnimation,
    afterSlide,
    animation,
    autoplay,
    autoplayInterval,
    autoplayReverse,
    beforeSlide,
    cellAlign: propsCellAlign,
    cellSpacing,
    children,
    className,
    disableAnimation,
    dragging: desktopDraggingEnabled,
    dragThreshold: propsDragThreshold,
    enableKeyboardControls,
    frameAriaLabel,
    innerRef,
    keyCodeConfig,
    onDrag,
    onDragEnd,
    onDragStart,
    onUserNavigation,
    pauseOnHover,
    renderAnnounceSlideMessage,
    scrollMode: propsScrollMode,
    slideIndex,
    slidesToScroll: propsSlidesToScroll,
    slidesToShow: propsSlidesToShow,
    slideWidth,
    speed,
    style,
    swiping: mobileDraggingEnabled,
    wrapAround,
    zoomScale
  } = props;
  const filteredSlides = import_react9.default.Children.toArray(children).filter(Boolean);
  const slideCount = filteredSlides.length;
  const cellAlign = slideWidth || propsSlidesToScroll === "auto" ? "left" : propsCellAlign;
  const scrollMode = propsSlidesToScroll === "auto" ? "remainder" /* remainder */ : propsScrollMode;
  const [slideIOEntries, setSlideIOEntries] = (0, import_react9.useState)(
    /* @__PURE__ */ new Map()
  );
  const visibleCount = Array.from(slideIOEntries).filter(
    ([, visible]) => visible
  ).length;
  const [constantVisibleCount, setConstantVisibleCount] = (0, import_react9.useState)(visibleCount);
  const slidesToShow = slideWidth ? constantVisibleCount : propsSlidesToShow;
  const slidesToScroll = animation === "fade" ? slidesToShow : propsSlidesToScroll === "auto" ? Math.max(constantVisibleCount, 1) : propsSlidesToScroll;
  const [currentSlide, setCurrentSlide] = (0, import_react9.useState)(
    () => getDefaultSlideIndex(
      slideIndex,
      slideCount,
      slidesToShow,
      slidesToScroll,
      cellAlign,
      autoplayReverse,
      scrollMode
    )
  );
  const [pause, setPause] = (0, import_react9.useState)(false);
  const [isDragging, setIsDragging] = (0, import_react9.useState)(false);
  const [dragDistance, setDragDistance] = (0, import_react9.useState)(0);
  const [animationDistance, setAnimationDistance] = (0, import_react9.useState)(0);
  const [isAnimating, setIsAnimating] = (0, import_react9.useState)(false);
  const updateSlideIOEntry = (0, import_react9.useCallback)(
    (id, isFullyVisible) => {
      if (!!slideIOEntries.get(id) === isFullyVisible)
        return;
      setSlideIOEntries((prev) => {
        const newMap = new Map(prev);
        newMap.set(id, isFullyVisible);
        return newMap;
      });
    },
    [slideIOEntries]
  );
  const prevDragged = (0, import_react9.useRef)(false);
  (0, import_react9.useEffect)(() => {
    if (isDragging)
      prevDragged.current = true;
    if (!(isDragging || isAnimating)) {
      if (!prevDragged.current)
        setConstantVisibleCount(visibleCount);
      prevDragged.current = false;
    }
  }, [isAnimating, isDragging, visibleCount]);
  const prevXPosition = (0, import_react9.useRef)(null);
  const preDragOffset = (0, import_react9.useRef)(0);
  const sliderListRef = (0, import_react9.useRef)(null);
  const defaultCarouselRef = (0, import_react9.useRef)(null);
  const autoplayTimeout = (0, import_react9.useRef)();
  const autoplayLastTriggeredRef = (0, import_react9.useRef)(null);
  const isMounted = (0, import_react9.useRef)(true);
  const setSliderListRef = (0, import_react9.useCallback)((node) => {
    if (node) {
      node.querySelectorAll(".slider-list img").forEach((el) => el.setAttribute("draggable", "false"));
    }
    sliderListRef.current = node;
  }, []);
  (0, import_react9.useEffect)(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  const carouselRef = innerRef || defaultCarouselRef;
  const goToSlide = (0, import_react9.useCallback)(
    (targetSlideUnbounded) => {
      if (!sliderListRef.current || !carouselRef.current)
        return;
      const targetSlideBounded = getBoundedIndex(
        targetSlideUnbounded,
        slideCount
      );
      const slideChanged = targetSlideUnbounded !== currentSlide;
      slideChanged && beforeSlide(currentSlide, targetSlideBounded);
      const currentOffset = sliderListRef.current.getBoundingClientRect().left - carouselRef.current.getBoundingClientRect().left;
      const sliderWidth = sliderListRef.current.offsetWidth;
      let targetOffset = getPercentOffsetForSlide(
        targetSlideBounded,
        slideCount,
        slidesToShow,
        cellAlign,
        wrapAround
      ) / 100 * sliderWidth;
      if (wrapAround) {
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
        setCurrentSlide(targetSlideBounded);
        const msToEndOfAnimation = !disableAnimation ? speed || 500 : 40;
        setTimeout(() => {
          if (!isMounted.current)
            return;
          afterSlide(targetSlideBounded);
        }, msToEndOfAnimation);
      }
    },
    [
      afterSlide,
      beforeSlide,
      carouselRef,
      cellAlign,
      currentSlide,
      disableAnimation,
      speed,
      slideCount,
      slidesToShow,
      wrapAround
    ]
  );
  const nextSlide = (0, import_react9.useCallback)(() => {
    const nextSlideIndex = getNextMoveIndex(
      scrollMode,
      wrapAround,
      currentSlide,
      slideCount,
      slidesToScroll,
      slidesToShow,
      cellAlign
    );
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
    wrapAround
  ]);
  const prevSlide = (0, import_react9.useCallback)(() => {
    const prevSlideIndex = getPrevMoveIndex(
      scrollMode,
      wrapAround,
      currentSlide,
      slidesToScroll,
      slidesToShow,
      cellAlign
    );
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
    wrapAround
  ]);
  const prevMovedToSlideIndex = (0, import_react9.useRef)(slideIndex);
  (0, import_react9.useEffect)(() => {
    if (slideIndex !== void 0 && slideIndex !== prevMovedToSlideIndex.current && !autoplayReverse) {
      goToSlide(slideIndex);
      prevMovedToSlideIndex.current = slideIndex;
    }
  }, [slideIndex, autoplayReverse, goToSlide]);
  (0, import_react9.useEffect)(() => {
    let pauseStarted = null;
    if (pause) {
      pauseStarted = Date.now();
    }
    return () => {
      if (pauseStarted !== null && autoplayLastTriggeredRef.current !== null) {
        autoplayLastTriggeredRef.current += Date.now() - pauseStarted;
      }
    };
  }, [pause]);
  (0, import_react9.useEffect)(() => {
    if (autoplay && !pause) {
      const adjustedTimeoutMs = autoplayLastTriggeredRef.current !== null ? autoplayInterval - (Date.now() - autoplayLastTriggeredRef.current) : autoplayInterval;
      autoplayTimeout.current = setTimeout(() => {
        autoplayLastTriggeredRef.current = Date.now();
        if (autoplayReverse) {
          prevSlide();
        } else {
          nextSlide();
        }
      }, adjustedTimeoutMs);
    }
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
    nextSlide
  ]);
  const onKeyDown = (event) => {
    let keyCommand = null;
    Object.keys(keyCodeConfig).forEach(
      (command) => {
        var _a;
        if ((_a = keyCodeConfig[command]) == null ? void 0 : _a.includes(event.keyCode)) {
          keyCommand = command;
        }
      }
    );
    if (keyCommand === null)
      return;
    event.preventDefault();
    event.stopPropagation();
    switch (keyCommand) {
      case "nextSlide":
        onUserNavigation(event);
        nextSlide();
        break;
      case "previousSlide":
        onUserNavigation(event);
        prevSlide();
        break;
      case "firstSlide":
      case "lastSlide": {
        onUserNavigation(event);
        const dotIndices = getDotIndexes(
          slideCount,
          slidesToScroll,
          scrollMode,
          slidesToShow,
          wrapAround,
          cellAlign
        );
        if (keyCommand === "firstSlide") {
          goToSlide(dotIndices[0]);
        } else {
          goToSlide(dotIndices[dotIndices.length - 1]);
        }
        break;
      }
      case "pause":
        setPause((p) => !p);
        break;
    }
  };
  const dragPositions = (0, import_react9.useRef)([]);
  const handleDragEnd = (e) => {
    if (!isDragging || !carouselRef.current)
      return;
    setIsDragging(false);
    let distanceFromInertia = 0;
    if (dragPositions.current.length > 1) {
      const startMove = dragPositions.current[0];
      const endMove = dragPositions.current[dragPositions.current.length - 1];
      const timeOffset = endMove.time - startMove.time;
      const goodInertiaFeelConstant = 9;
      const goodFrictionFeelConstant = 0.92;
      const initialVelocity = goodInertiaFeelConstant * Math.abs((endMove.pos - startMove.pos) / timeOffset);
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
    const oneScrollWidth = carouselRef.current.offsetWidth * Math.min(1, slidesToScroll / slidesToShow);
    const dragThreshold = oneScrollWidth * propsDragThreshold;
    if (adjustedDragDistance < dragThreshold) {
      goToSlide(currentSlide);
      return;
    }
    const canMaintainVisualContinuity = slidesToShow >= 2 * slidesToScroll;
    const timesToMove = canMaintainVisualContinuity ? 1 + Math.floor((adjustedDragDistance - dragThreshold) / oneScrollWidth) : 1;
    let nextSlideIndex = currentSlide;
    for (let index = 0; index < timesToMove; index += 1) {
      if (dragDistance > 0) {
        nextSlideIndex = getNextMoveIndex(
          scrollMode,
          wrapAround,
          nextSlideIndex,
          slideCount,
          slidesToScroll,
          slidesToShow,
          cellAlign
        );
      } else {
        nextSlideIndex = getPrevMoveIndex(
          scrollMode,
          wrapAround,
          nextSlideIndex,
          slidesToScroll,
          slidesToShow,
          cellAlign
        );
      }
    }
    if (nextSlideIndex !== currentSlide) {
      onUserNavigation(e);
    }
    goToSlide(nextSlideIndex);
  };
  const onTouchStart = (0, import_react9.useCallback)(
    (e) => {
      if (!mobileDraggingEnabled || !sliderListRef.current || !carouselRef.current) {
        return;
      }
      setIsDragging(true);
      preDragOffset.current = sliderListRef.current.getBoundingClientRect().left - carouselRef.current.getBoundingClientRect().left;
      onDragStart(e);
    },
    [carouselRef, onDragStart, mobileDraggingEnabled]
  );
  const handlePointerMove = (0, import_react9.useCallback)(
    (xPosition) => {
      if (!isDragging)
        return;
      const isFirstMove = prevXPosition.current === null;
      const delta = prevXPosition.current !== null ? xPosition - prevXPosition.current : 0;
      const nextDragDistance = dragDistance + delta;
      const now = Date.now();
      while (dragPositions.current.length > 0) {
        if (now - dragPositions.current[0].time <= 100) {
          break;
        }
        dragPositions.current.shift();
      }
      dragPositions.current.push({ pos: nextDragDistance, time: now });
      if (!isFirstMove) {
        setDragDistance(nextDragDistance);
      }
      prevXPosition.current = xPosition;
    },
    [isDragging, dragDistance]
  );
  const onTouchMove = (0, import_react9.useCallback)(
    (e) => {
      if (!isDragging || !carouselRef.current)
        return;
      onDragStart(e);
      const moveValue = carouselRef.current.offsetWidth - e.touches[0].pageX;
      handlePointerMove(moveValue);
    },
    [isDragging, carouselRef, handlePointerMove, onDragStart]
  );
  const onMouseDown = (0, import_react9.useCallback)(
    (e) => {
      if (!desktopDraggingEnabled || !sliderListRef.current || !carouselRef.current)
        return;
      setIsDragging(true);
      preDragOffset.current = sliderListRef.current.getBoundingClientRect().left - carouselRef.current.getBoundingClientRect().left;
      onDragStart(e);
    },
    [carouselRef, desktopDraggingEnabled, onDragStart]
  );
  const onMouseMove = (0, import_react9.useCallback)(
    (e) => {
      if (!isDragging || !carouselRef.current)
        return;
      onDrag(e);
      const offsetX = e.clientX - carouselRef.current.getBoundingClientRect().left;
      const moveValue = carouselRef.current.offsetWidth - offsetX;
      handlePointerMove(moveValue);
    },
    [carouselRef, isDragging, handlePointerMove, onDrag]
  );
  const onMouseUp = (e) => {
    e.preventDefault();
    handleDragEnd(e);
  };
  const onMouseEnter = (0, import_react9.useCallback)(() => {
    if (pauseOnHover) {
      setPause(true);
    }
  }, [pauseOnHover]);
  const onMouseLeave = (0, import_react9.useCallback)(() => {
    if (pauseOnHover) {
      setPause(false);
    }
  }, [pauseOnHover]);
  const {
    frameHeight,
    handleVisibleSlideHeightChange,
    initializedAdaptiveHeight
  } = useFrameHeight(adaptiveHeight, slidesToShow, slideCount);
  const renderSlides = (typeOfSlide) => {
    const slides = filteredSlides.map((child, index) => {
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        slide_default,
        {
          id: `${typeOfSlide}-${index}`,
          count: slideCount,
          index,
          isCurrentSlide: currentSlide === index,
          typeOfSlide,
          wrapAround,
          cellSpacing,
          animation,
          speed,
          zoomScale,
          onVisibleSlideHeightChange: handleVisibleSlideHeightChange,
          slideWidth,
          updateIOEntry: updateSlideIOEntry,
          adaptiveHeight,
          initializedAdaptiveHeight,
          carouselRef,
          children: child
        },
        `${typeOfSlide}-${index}`
      );
    });
    return slides;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "div",
    {
      className: "slider-container",
      style: {
        position: "relative"
      },
      onMouseEnter,
      onMouseLeave,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          announce_slide_default,
          {
            ariaLive: autoplay && !pause ? "off" : "polite",
            message: renderAnnounceSlideMessage({
              currentSlide,
              count: slideCount
            })
          }
        ),
        controls_default(
          props,
          slideCount,
          currentSlide,
          goToSlide,
          nextSlide,
          prevSlide,
          slidesToScroll
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "div",
          {
            className: ["slider-frame", className || ""].join(" ").trim(),
            style: __spreadValues({
              overflow: "hidden",
              width: "100%",
              position: "relative",
              outline: "none",
              touchAction: "pan-y",
              height: frameHeight,
              transition: adaptiveHeightAnimation ? "height 300ms ease-in-out" : void 0,
              willChange: "height",
              userSelect: "none"
            }, style),
            "aria-label": frameAriaLabel,
            role: "region",
            tabIndex: enableKeyboardControls ? 0 : -1,
            onKeyDown: enableKeyboardControls ? onKeyDown : void 0,
            ref: carouselRef,
            onMouseUp,
            onMouseDown,
            onMouseMove,
            onMouseLeave: onMouseUp,
            onTouchStart,
            onTouchEnd: handleDragEnd,
            onTouchMove,
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
              SliderList,
              {
                animationDistance,
                cellAlign,
                currentSlide,
                disableEdgeSwiping: props.disableEdgeSwiping,
                draggedOffset: preDragOffset.current - dragDistance,
                disableAnimation,
                easing: props.easing,
                edgeEasing: props.edgeEasing,
                isDragging,
                ref: setSliderListRef,
                scrollMode,
                animation,
                slideCount,
                slidesToScroll,
                slidesToShow,
                speed,
                slideWidth,
                wrapAround,
                setIsAnimating,
                children: [
                  wrapAround ? renderSlides("prev-cloned") : null,
                  renderSlides(),
                  wrapAround ? renderSlides("next-cloned") : null
                ]
              }
            )
          }
        )
      ]
    }
  );
};
Carousel.defaultProps = default_carousel_props_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Alignment,
  Directions,
  NextButton,
  PagingDots,
  Positions,
  PreviousButton,
  ScrollMode
});
//# sourceMappingURL=index.js.map