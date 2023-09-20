"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Carousel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _slide = _interopRequireDefault(require("./slide"));

var _announceSlide = _interopRequireDefault(require("./announce-slide"));

var _sliderList = require("./slider-list");

var _types = require("./types");

var _controls = _interopRequireDefault(require("./controls"));

var _defaultCarouselProps = _interopRequireDefault(require("./default-carousel-props"));

var _utils = require("./utils");

var _useFrameHeight2 = require("./hooks/use-frame-height");

var _defaultControls = require("./default-controls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Carousel = function Carousel(rawProps) {
  /**
   * We need this cast because we want the component's properties to seem
   * optional to external users, but always-present for the internal
   * implementation.
   *
   * This cast is safe due to the `Carousel.defaultProps = defaultProps;`
   * statement below. That guarantees all the properties are present, since
   * `defaultProps` has type `InternalCarouselProps`.
   */
  var props = rawProps;
  var adaptiveHeight = props.adaptiveHeight,
      adaptiveHeightAnimation = props.adaptiveHeightAnimation,
      afterSlide = props.afterSlide,
      animation = props.animation,
      autoplay = props.autoplay,
      autoplayInterval = props.autoplayInterval,
      autoplayReverse = props.autoplayReverse,
      beforeSlide = props.beforeSlide,
      carouselId = props.carouselId,
      propsCellAlign = props.cellAlign,
      cellSpacing = props.cellSpacing,
      children = props.children,
      className = props.className,
      disableAnimation = props.disableAnimation,
      desktopDraggingEnabled = props.dragging,
      propsDragThreshold = props.dragThreshold,
      enableKeyboardControls = props.enableKeyboardControls,
      frameAriaLabel = props.frameAriaLabel,
      innerRef = props.innerRef,
      keyCodeConfig = props.keyCodeConfig,
      landmark = props.landmark,
      onDrag = props.onDrag,
      onDragEnd = props.onDragEnd,
      onDragStart = props.onDragStart,
      onUserNavigation = props.onUserNavigation,
      pauseOnHover = props.pauseOnHover,
      renderAnnounceSlideMessage = props.renderAnnounceSlideMessage,
      resumeAfterPause = props.resumeAfterPause,
      propsScrollMode = props.scrollMode,
      slideIndex = props.slideIndex,
      propsSlidesToScroll = props.slidesToScroll,
      propsSlidesToShow = props.slidesToShow,
      slideWidth = props.slideWidth,
      speed = props.speed,
      style = props.style,
      mobileDraggingEnabled = props.swiping,
      tabbed = props.tabbed,
      wrapAround = props.wrapAround,
      zoomScale = props.zoomScale;

  var filteredSlides = _react["default"].Children.toArray(children).filter(Boolean);

  var slideCount = filteredSlides.length;
  var cellAlign = slideWidth || propsSlidesToScroll === 'auto' ? 'left' : propsCellAlign;
  var scrollMode = propsSlidesToScroll === 'auto' ? _types.ScrollMode.remainder : propsScrollMode;

  var _useState = (0, _react.useState)(new Map()),
      _useState2 = _slicedToArray(_useState, 2),
      slideIOEntries = _useState2[0],
      setSlideIOEntries = _useState2[1];

  var visibleCount = Array.from(slideIOEntries).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        visible = _ref2[1];

    return visible;
  }).length;

  var _useState3 = (0, _react.useState)(visibleCount),
      _useState4 = _slicedToArray(_useState3, 2),
      constantVisibleCount = _useState4[0],
      setConstantVisibleCount = _useState4[1];

  var slidesToShow = slideWidth ? constantVisibleCount : propsSlidesToShow;
  var slidesToScroll = animation === 'fade' ? slidesToShow : propsSlidesToScroll === 'auto' ? Math.max(constantVisibleCount, 1) : propsSlidesToScroll;

  var _useState5 = (0, _react.useState)(function () {
    return (0, _utils.getDefaultSlideIndex)(slideIndex, slideCount, slidesToShow, slidesToScroll, cellAlign, autoplayReverse, scrollMode);
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      currentSlide = _useState6[0],
      setCurrentSlide = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      pause = _useState8[0],
      setPause = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isDragging = _useState10[0],
      setIsDragging = _useState10[1];

  var _useState11 = (0, _react.useState)(0),
      _useState12 = _slicedToArray(_useState11, 2),
      dragDistance = _useState12[0],
      setDragDistance = _useState12[1];

  var _useState13 = (0, _react.useState)(0),
      _useState14 = _slicedToArray(_useState13, 2),
      animationDistance = _useState14[0],
      setAnimationDistance = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      isAnimating = _useState16[0],
      setIsAnimating = _useState16[1];

  var updateSlideIOEntry = (0, _react.useCallback)(function (id, isFullyVisible) {
    if (!!slideIOEntries.get(id) === isFullyVisible) return;
    setSlideIOEntries(function (prev) {
      var newMap = new Map(prev);
      newMap.set(id, isFullyVisible);
      return newMap;
    });
  }, [slideIOEntries]);
  var prevDragged = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    if (isDragging) prevDragged.current = true;

    if (!(isDragging || isAnimating)) {
      // Wait for the animation to complete after dragging
      if (!prevDragged.current) setConstantVisibleCount(visibleCount);
      prevDragged.current = false;
    }
  }, [isAnimating, isDragging, visibleCount]);
  var prevXPosition = (0, _react.useRef)(null);
  var preDragOffset = (0, _react.useRef)(0);
  var sliderListRef = (0, _react.useRef)(null);
  var defaultCarouselRef = (0, _react.useRef)(null);
  var autoplayTimeout = (0, _react.useRef)();
  var autoplayLastTriggeredRef = (0, _react.useRef)(null);
  var isMounted = (0, _react.useRef)(true);
  var setSliderListRef = (0, _react.useCallback)(function (node) {
    if (node) {
      // disable img draggable attribute by default, this will improve the dragging
      // applying the querySelectorAll on just the descendants of the sliderList prevents
      // impacting DOM elements outside our scope
      node.querySelectorAll('.slider-list img').forEach(function (el) {
        return el.setAttribute('draggable', 'false');
      });
    }

    sliderListRef.current = node;
  }, []);
  (0, _react.useEffect)(function () {
    isMounted.current = true;
    return function () {
      isMounted.current = false;
    };
  }, []);
  var carouselRef = innerRef || defaultCarouselRef;
  var goToSlide = (0, _react.useCallback)(function (targetSlideUnbounded) {
    if (!sliderListRef.current || !carouselRef.current) return;
    var targetSlideBounded = (0, _utils.getBoundedIndex)(targetSlideUnbounded, slideCount);
    var slideChanged = targetSlideUnbounded !== currentSlide;
    console.log({
      slideChanged: slideChanged,
      targetSlideUnbounded: targetSlideUnbounded,
      currentSlide: currentSlide
    });

    if (!resumeAfterPause) {
      autoplayLastTriggeredRef.current = null;
    }

    slideChanged && beforeSlide(currentSlide, targetSlideBounded); // Calculate the distance the slide transition animation needs to cover.

    var currentOffset = sliderListRef.current.getBoundingClientRect().left - carouselRef.current.getBoundingClientRect().left;
    var sliderWidth = sliderListRef.current.offsetWidth;
    var targetOffset = (0, _sliderList.getPercentOffsetForSlide)(targetSlideBounded, slideCount, slidesToShow, cellAlign, wrapAround) / 100 * sliderWidth;

    if (wrapAround) {
      // We have to do a bit of a recovery effort to figure out the closest
      // offset based on the direction we're going in the slides. The reason
      // it's complicated is because, when wrapped, both the current offset
      // and the calculated target offset are based on bounded slide indices -
      // that is, when wrapping, we often skip back to the first or last slide
      // seamlessly to make the carousel appear to infinitely repeat
      // The DOM width of `slideCount` slides
      var slideSetWidth = sliderWidth / 3;

      if (targetSlideUnbounded < 0) {
        targetOffset += slideSetWidth;
      }

      if (targetSlideUnbounded >= slideCount) {
        targetOffset -= slideSetWidth;
      }
    }

    setAnimationDistance(targetOffset - currentOffset);

    if (slideChanged) {
      setCurrentSlide(targetSlideBounded); // if animation is disabled decrease the speed to 40

      var msToEndOfAnimation = !disableAnimation ? speed || 500 : 40;
      setTimeout(function () {
        if (!isMounted.current) return;
        afterSlide(targetSlideBounded);
      }, msToEndOfAnimation);
    }
  }, [afterSlide, beforeSlide, carouselRef, cellAlign, currentSlide, disableAnimation, resumeAfterPause, speed, slideCount, slidesToShow, wrapAround]);
  var nextSlide = (0, _react.useCallback)(function () {
    var nextSlideIndex = (0, _utils.getNextMoveIndex)(scrollMode, wrapAround, currentSlide, slideCount, slidesToScroll, slidesToShow, cellAlign);

    if (currentSlide !== nextSlideIndex) {
      goToSlide(nextSlideIndex);
    }
  }, [cellAlign, currentSlide, goToSlide, slidesToScroll, scrollMode, slideCount, slidesToShow, wrapAround]);
  var prevSlide = (0, _react.useCallback)(function () {
    var prevSlideIndex = (0, _utils.getPrevMoveIndex)(scrollMode, wrapAround, currentSlide, slidesToScroll, slidesToShow, cellAlign);

    if (currentSlide !== prevSlideIndex) {
      goToSlide(prevSlideIndex);
    }
  }, [cellAlign, currentSlide, goToSlide, slidesToScroll, scrollMode, slidesToShow, wrapAround]); // When user changed the slideIndex property from outside.

  var prevMovedToSlideIndex = (0, _react.useRef)(slideIndex);
  (0, _react.useEffect)(function () {
    if (slideIndex !== undefined && slideIndex !== prevMovedToSlideIndex.current && !autoplayReverse) {
      goToSlide(slideIndex);
      prevMovedToSlideIndex.current = slideIndex;
    }
  }, [slideIndex, autoplayReverse, goToSlide]);
  (0, _react.useEffect)(function () {
    var pauseStarted = null; // Keep track of when autoplay was paused so we can resume it with the same
    // remaining time to the next slide transition

    if (pause) {
      pauseStarted = Date.now();
    }

    return function () {
      if (pauseStarted !== null && autoplayLastTriggeredRef.current !== null) {
        autoplayLastTriggeredRef.current += Date.now() - pauseStarted;
      }
    };
  }, [pause]);
  (0, _react.useEffect)(function () {
    if (autoplay && !pause) {
      // Adjust the timeout duration to account for changes that triggered the
      // re-creation of this timeout, such as the currentSlide being changed
      // periodically to make wrapAround loop forever
      var adjustedTimeoutMs = autoplayLastTriggeredRef.current !== null ? autoplayInterval - (Date.now() - autoplayLastTriggeredRef.current) : autoplayInterval;
      autoplayTimeout.current = setTimeout(function () {
        autoplayLastTriggeredRef.current = Date.now();

        if (autoplayReverse) {
          prevSlide();
        } else {
          nextSlide();
        }
      }, adjustedTimeoutMs);
    } // Clear the timeout if user hover on carousel


    if (autoplay && pause) {
      clearTimeout(autoplayTimeout.current);
    }

    return function () {
      clearTimeout(autoplayTimeout.current);
    };
  }, [pause, autoplay, autoplayInterval, autoplayReverse, prevSlide, nextSlide]);

  var onKeyDown = function onKeyDown(event) {
    var keyCommand = null;
    Object.keys(keyCodeConfig).forEach(function (command) {
      var _keyCodeConfig$comman;

      if ((_keyCodeConfig$comman = keyCodeConfig[command]) !== null && _keyCodeConfig$comman !== void 0 && _keyCodeConfig$comman.includes(event.keyCode)) {
        keyCommand = command;
      }
    });
    if (keyCommand === null) return; // At this point we know some action is going to be triggered, so we
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
      case 'lastSlide':
        {
          onUserNavigation(event);
          var dotIndices = (0, _defaultControls.getDotIndexes)(slideCount, slidesToScroll, scrollMode, slidesToShow, wrapAround, cellAlign);

          if (keyCommand === 'firstSlide') {
            goToSlide(dotIndices[0]);
          } else {
            goToSlide(dotIndices[dotIndices.length - 1]);
          }

          break;
        }

      case 'pause':
        setPause(function (p) {
          return !p;
        });
        break;
    }
  };

  var dragPositions = (0, _react.useRef)([]);

  var handleDragEnd = function handleDragEnd(e) {
    if (!isDragging || !carouselRef.current) return;
    setIsDragging(false); // Inertia calculation is used to allow quick flicks to scroll the carousel
    // where they might not based on the start and end points of the gesture
    // alone. In certain conditions, the inertia may also scroll the carousel
    // several times.

    var distanceFromInertia = 0;

    if (dragPositions.current.length > 1) {
      var startMove = dragPositions.current[0];
      var endMove = dragPositions.current[dragPositions.current.length - 1];
      var timeOffset = endMove.time - startMove.time;
      var goodInertiaFeelConstant = 9;
      var goodFrictionFeelConstant = 0.92;
      var initialVelocity = goodInertiaFeelConstant * Math.abs((endMove.pos - startMove.pos) / timeOffset);
      var velocity = initialVelocity;

      while (Math.abs(velocity) > 1) {
        distanceFromInertia += velocity;
        velocity *= goodFrictionFeelConstant;
      }
    }

    dragPositions.current = [];
    var adjustedDragDistance = Math.abs(dragDistance) + Math.abs(distanceFromInertia);
    onDragEnd(e);
    prevXPosition.current = null;
    setDragDistance(0);
    var oneScrollWidth = carouselRef.current.offsetWidth * Math.min(1, slidesToScroll / slidesToShow);
    var dragThreshold = oneScrollWidth * propsDragThreshold;

    if (adjustedDragDistance < dragThreshold) {
      goToSlide(currentSlide);
      return;
    } // If skipping over multiple slides at a time is still roughly trackable by
    // your eyes, we allow for skipping multiple slides with a single gesture.
    // This formula is just based off an observation that it is confusing to
    // skip from slides 1 to 3 when only one slide is shown at a time, but
    // skipping from 1 to 4 or so with two slides shown at a time is pulled-back
    // enough that you can still roughly keep track of your place in the
    // carousel.


    var canMaintainVisualContinuity = slidesToShow >= 2 * slidesToScroll;
    var timesToMove = canMaintainVisualContinuity ? 1 + Math.floor((adjustedDragDistance - dragThreshold) / oneScrollWidth) : 1;
    var nextSlideIndex = currentSlide;

    for (var index = 0; index < timesToMove; index += 1) {
      if (dragDistance > 0) {
        nextSlideIndex = (0, _utils.getNextMoveIndex)(scrollMode, wrapAround, nextSlideIndex, slideCount, slidesToScroll, slidesToShow, cellAlign);
      } else {
        nextSlideIndex = (0, _utils.getPrevMoveIndex)(scrollMode, wrapAround, nextSlideIndex, slidesToScroll, slidesToShow, cellAlign);
      }
    }

    if (nextSlideIndex !== currentSlide) {
      onUserNavigation(e);
    }

    goToSlide(nextSlideIndex);
  };

  var onTouchStart = (0, _react.useCallback)(function (e) {
    if (!mobileDraggingEnabled || !sliderListRef.current || !carouselRef.current) {
      return;
    }

    setIsDragging(true);
    preDragOffset.current = sliderListRef.current.getBoundingClientRect().left - carouselRef.current.getBoundingClientRect().left;
    onDragStart(e);
  }, [carouselRef, onDragStart, mobileDraggingEnabled]);
  var handlePointerMove = (0, _react.useCallback)(function (xPosition) {
    if (!isDragging) return;
    var isFirstMove = prevXPosition.current === null;
    var delta = prevXPosition.current !== null ? xPosition - prevXPosition.current : 0;
    var nextDragDistance = dragDistance + delta;
    var now = Date.now(); // Maintain a buffer of drag positions from the last 100ms

    while (dragPositions.current.length > 0) {
      if (now - dragPositions.current[0].time <= 100) {
        break;
      }

      dragPositions.current.shift();
    }

    dragPositions.current.push({
      pos: nextDragDistance,
      time: now
    });

    if (!isFirstMove) {
      // nextDragDistance will always be `0` on the first move event, so we
      // skip it because the value is already set to 0 at this point
      setDragDistance(nextDragDistance);
    }

    prevXPosition.current = xPosition;
  }, [isDragging, dragDistance]);
  var onTouchMove = (0, _react.useCallback)(function (e) {
    if (!isDragging || !carouselRef.current) return;
    onDragStart(e);
    var moveValue = carouselRef.current.offsetWidth - e.touches[0].pageX;
    handlePointerMove(moveValue);
  }, [isDragging, carouselRef, handlePointerMove, onDragStart]);
  var onMouseDown = (0, _react.useCallback)(function (e) {
    if (!desktopDraggingEnabled || !sliderListRef.current || !carouselRef.current) return;
    setIsDragging(true);
    preDragOffset.current = sliderListRef.current.getBoundingClientRect().left - carouselRef.current.getBoundingClientRect().left;
    onDragStart(e);
  }, [carouselRef, desktopDraggingEnabled, onDragStart]);
  var onMouseMove = (0, _react.useCallback)(function (e) {
    if (!isDragging || !carouselRef.current) return;
    onDrag(e);
    var offsetX = e.clientX - carouselRef.current.getBoundingClientRect().left;
    var moveValue = carouselRef.current.offsetWidth - offsetX;
    handlePointerMove(moveValue);
  }, [carouselRef, isDragging, handlePointerMove, onDrag]);

  var onMouseUp = function onMouseUp(e) {
    e.preventDefault();
    handleDragEnd(e);
  };

  var onMouseEnter = (0, _react.useCallback)(function () {
    if (pauseOnHover) {
      setPause(true);
    }
  }, [pauseOnHover]);
  var onMouseLeave = (0, _react.useCallback)(function () {
    if (pauseOnHover) {
      setPause(false);
    }
  }, [pauseOnHover]);

  var _useFrameHeight = (0, _useFrameHeight2.useFrameHeight)(adaptiveHeight, slidesToShow, slideCount),
      frameHeight = _useFrameHeight.frameHeight,
      handleVisibleSlideHeightChange = _useFrameHeight.handleVisibleSlideHeightChange,
      initializedAdaptiveHeight = _useFrameHeight.initializedAdaptiveHeight;

  var renderSlides = function renderSlides(typeOfSlide) {
    var slides = filteredSlides.map(function (child, index) {
      return /*#__PURE__*/_react["default"].createElement(_slide["default"], {
        key: "".concat(typeOfSlide, "-").concat(index),
        id: "".concat(typeOfSlide, "-").concat(index),
        carouselId: carouselId,
        count: slideCount,
        index: index,
        isCurrentSlide: currentSlide === index,
        typeOfSlide: typeOfSlide,
        wrapAround: wrapAround,
        cellSpacing: cellSpacing,
        animation: animation,
        speed: speed,
        zoomScale: zoomScale,
        onVisibleSlideHeightChange: handleVisibleSlideHeightChange,
        slideWidth: slideWidth,
        updateIOEntry: updateSlideIOEntry,
        adaptiveHeight: adaptiveHeight,
        initializedAdaptiveHeight: initializedAdaptiveHeight,
        carouselRef: carouselRef,
        tabbed: tabbed
      }, child);
    });
    return slides;
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: 'slider-container',
    style: {
      position: 'relative'
    },
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    "aria-label": frameAriaLabel,
    role: landmark ? 'region' : 'group',
    "aria-roledescription": "carousel",
    id: carouselId,
    "data-testid": carouselId
  }, /*#__PURE__*/_react["default"].createElement(_announceSlide["default"], {
    ariaLive: autoplay && !pause ? 'off' : 'polite',
    message: renderAnnounceSlideMessage({
      currentSlide: currentSlide,
      count: slideCount
    })
  }), (0, _controls["default"])(props, slideCount, currentSlide, goToSlide, nextSlide, prevSlide, slidesToScroll), /*#__PURE__*/_react["default"].createElement("div", {
    className: ['slider-frame', className || ''].join(' ').trim(),
    style: _objectSpread({
      overflow: 'hidden',
      width: '100%',
      position: 'relative',
      outline: 'none',
      touchAction: 'pan-y',
      height: frameHeight,
      transition: adaptiveHeightAnimation ? 'height 300ms ease-in-out' : undefined,
      willChange: 'height',
      userSelect: 'none'
    }, style),
    tabIndex: enableKeyboardControls ? 0 : -1,
    onKeyDown: enableKeyboardControls ? onKeyDown : undefined,
    ref: carouselRef,
    onMouseUp: onMouseUp,
    onMouseDown: onMouseDown,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseUp,
    onTouchStart: onTouchStart,
    onTouchEnd: handleDragEnd,
    onTouchMove: onTouchMove,
    id: "".concat(carouselId, "-slider-frame"),
    "data-testid": "".concat(carouselId, "-slider-frame")
  }, /*#__PURE__*/_react["default"].createElement(_sliderList.SliderList, {
    animationDistance: animationDistance,
    cellAlign: cellAlign,
    currentSlide: currentSlide,
    disableEdgeSwiping: props.disableEdgeSwiping,
    draggedOffset: preDragOffset.current - dragDistance,
    disableAnimation: disableAnimation,
    easing: props.easing,
    edgeEasing: props.edgeEasing,
    isDragging: isDragging,
    ref: setSliderListRef,
    scrollMode: scrollMode,
    animation: animation,
    slideCount: slideCount,
    slidesToScroll: slidesToScroll,
    slidesToShow: slidesToShow,
    speed: speed,
    slideWidth: slideWidth,
    wrapAround: wrapAround,
    setIsAnimating: setIsAnimating
  }, wrapAround ? renderSlides('prev-cloned') : null, renderSlides(), wrapAround ? renderSlides('next-cloned') : null)));
};

exports.Carousel = Carousel;
Carousel.defaultProps = _defaultCarouselProps["default"];
var _default = Carousel;
exports["default"] = _default;