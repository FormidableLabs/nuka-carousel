"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Carousel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _slide = _interopRequireDefault(require("./slide"));

var _announceSlide = _interopRequireDefault(require("./announce-slide"));

var _sliderList = require("./slider-list");

var _controls = _interopRequireDefault(require("./controls"));

var _defaultCarouselProps = _interopRequireDefault(require("./default-carousel-props"));

var _utils = require("./utils");

var _useFrameHeight2 = require("./hooks/use-frame-height");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Carousel = /*#__PURE__*/_react["default"].forwardRef(function Carousel(rawProps, ref) {
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
      afterSlide = props.afterSlide,
      animation = props.animation,
      autoplay = props.autoplay,
      autoplayInterval = props.autoplayInterval,
      autoplayReverse = props.autoplayReverse,
      beforeSlide = props.beforeSlide,
      cellAlign = props.cellAlign,
      cellSpacing = props.cellSpacing,
      children = props.children,
      className = props.className,
      disableAnimation = props.disableAnimation,
      disableEdgeSwiping = props.disableEdgeSwiping,
      dragging = props.dragging,
      propsDragThreshold = props.dragThreshold,
      enableKeyboardControls = props.enableKeyboardControls,
      frameAriaLabel = props.frameAriaLabel,
      innerRef = props.innerRef,
      keyCodeConfig = props.keyCodeConfig,
      onDrag = props.onDrag,
      onDragEnd = props.onDragEnd,
      onDragStart = props.onDragStart,
      pauseOnHover = props.pauseOnHover,
      renderAnnounceSlideMessage = props.renderAnnounceSlideMessage,
      scrollMode = props.scrollMode,
      slideIndex = props.slideIndex,
      propsSlidesToScroll = props.slidesToScroll,
      slidesToShow = props.slidesToShow,
      propsSpeed = props.speed,
      style = props.style,
      swiping = props.swiping,
      wrapAround = props.wrapAround,
      zoomScale = props.zoomScale,
      slideClassName = props.slideClassName;

  var count = _react["default"].Children.count(children);

  var _useState = (0, _react.useState)(autoplayReverse ? count - slidesToShow : slideIndex),
      _useState2 = _slicedToArray(_useState, 2),
      currentSlide = _useState2[0],
      setCurrentSlide = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      animationEnabled = _useState4[0],
      setAnimationEnabled = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      pause = _useState6[0],
      setPause = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isDragging = _useState8[0],
      setIsDragging = _useState8[1];

  var _useState9 = (0, _react.useState)(0),
      _useState10 = _slicedToArray(_useState9, 2),
      move = _useState10[0],
      setMove = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      keyboardMove = _useState12[0],
      setKeyboardMove = _useState12[1];

  var carouselWidth = (0, _react.useRef)(null);
  var focus = (0, _react.useRef)(false);
  var prevMove = (0, _react.useRef)(0);
  var carouselEl = (0, _react.useRef)(null);
  var timer = (0, _react.useRef)(null);
  var isMounted = (0, _react.useRef)(true);
  var slidesToScroll = animation === 'fade' ? slidesToShow : propsSlidesToScroll;
  var dragThreshold = (carouselWidth.current || 0) / slidesToShow * propsDragThreshold;

  var _getIndexes = (0, _utils.getIndexes)(currentSlide, currentSlide - slidesToScroll, count),
      _getIndexes2 = _slicedToArray(_getIndexes, 1),
      slide = _getIndexes2[0];

  (0, _react.useEffect)(function () {
    isMounted.current = true;
    return function () {
      isMounted.current = false;
    };
  }, []);
  (0, _react.useEffect)(function () {
    // disable img draggable attribute by default, this will improve the dragging
    document.querySelectorAll('.slider-list img').forEach(function (el) {
      return el.setAttribute('draggable', 'false');
    });
  }, []);
  var carouselRef = innerRef || carouselEl;
  var getNextIndex = (0, _react.useCallback)(function (to) {
    var index = to !== null && to !== void 0 ? to : currentSlide;

    if (index < 0) {
      return index + count;
    }

    if (index === count) {
      return 0;
    }

    return index;
  }, [count, currentSlide]);
  var moveSlide = (0, _react.useCallback)(function (to) {
    var nextIndex = getNextIndex(to);
    typeof to === 'number' && beforeSlide(slide, nextIndex);
    !disableAnimation && setAnimationEnabled(true);

    if (typeof to === 'number') {
      setCurrentSlide(to);
    }

    setTimeout(function () {
      if (!isMounted.current) return;
      typeof to === 'number' && afterSlide(nextIndex);
      !disableAnimation && setAnimationEnabled(false);
    }, !disableAnimation ? propsSpeed || 500 : 40); // if animation is disabled decrease the speed to 40
  }, [slide, afterSlide, beforeSlide, disableAnimation, getNextIndex, propsSpeed]);
  var nextSlide = (0, _react.useCallback)(function () {
    if (wrapAround || currentSlide < count - propsSlidesToScroll) {
      var nextPosition = (0, _utils.getNextMoveIndex)(scrollMode, wrapAround, currentSlide, count, propsSlidesToScroll, slidesToShow);
      moveSlide(nextPosition);
    }
  }, [count, currentSlide, moveSlide, propsSlidesToScroll, scrollMode, wrapAround, slidesToShow]);
  var prevSlide = (0, _react.useCallback)(function () {
    // boundary
    if (wrapAround || currentSlide > 0) {
      var prevPosition = (0, _utils.getPrevMoveIndex)(scrollMode, wrapAround, currentSlide, propsSlidesToScroll);
      moveSlide(prevPosition);
    }
  }, [currentSlide, moveSlide, propsSlidesToScroll, scrollMode, wrapAround]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      moveSlide: moveSlide,
      nextSlide: nextSlide,
      prevSlide: prevSlide
    };
  }); // When user changed the slideIndex property from outside.

  var prevMovedToSlideIndex = (0, _react.useRef)(slideIndex);
  (0, _react.useEffect)(function () {
    if (slideIndex !== prevMovedToSlideIndex.current && !autoplayReverse) {
      moveSlide(slideIndex);
      prevMovedToSlideIndex.current = slideIndex;
    }
  }, [slideIndex, currentSlide, autoplayReverse, moveSlide]); // Makes the carousel infinity when autoplay and wrapAround are enabled

  (0, _react.useEffect)(function () {
    if (autoplay && !animationEnabled && wrapAround) {
      if (currentSlide > count) {
        setCurrentSlide(currentSlide - count);

        if (timer !== null && timer !== void 0 && timer.current) {
          clearTimeout(timer.current);
        }
      } else if (currentSlide < 0) {
        setCurrentSlide(count - -currentSlide);

        if (timer !== null && timer !== void 0 && timer.current) {
          clearTimeout(timer.current);
        }
      }
    }
  }, [animationEnabled, currentSlide, count, wrapAround, autoplay]);
  (0, _react.useEffect)(function () {
    if (autoplay && !pause) {
      timer.current = setTimeout(function () {
        if (autoplayReverse) {
          if (!wrapAround && currentSlide > 0) {
            prevSlide();
          } else if (wrapAround) {
            prevSlide();
          }
        } else if (!wrapAround && currentSlide < count - slidesToShow) {
          nextSlide();
        } else if (wrapAround) {
          nextSlide();
        }
      }, autoplayInterval);
    } // Clear the timeout if user hover on carousel


    if (autoplay && pause && timer !== null && timer !== void 0 && timer.current) {
      clearTimeout(timer.current);
    }

    return function () {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [currentSlide, slidesToShow, count, pause, autoplay, autoplayInterval, autoplayReverse, wrapAround, prevSlide, nextSlide]); // Makes the carousel infinity when wrapAround is enabled, but autoplay is disabled

  (0, _react.useEffect)(function () {
    var prevTimeout = null;
    var nextTimeout = null;

    if (wrapAround && !autoplay) {
      // if animation is disabled decrease the speed to 0
      var speed = !disableAnimation ? propsSpeed || 500 : 0;

      if (currentSlide <= -slidesToShow) {
        // prev
        prevTimeout = setTimeout(function () {
          if (!isMounted.current) return;
          setCurrentSlide(count - -currentSlide);
        }, speed + 10);
      } else if (currentSlide >= count) {
        // next
        nextTimeout = setTimeout(function () {
          if (!isMounted.current) return;
          setCurrentSlide(currentSlide - count);
        }, speed + 10);
      }
    }

    return function cleanup() {
      if (prevTimeout) {
        clearTimeout(prevTimeout);
      }

      if (nextTimeout) {
        clearTimeout(nextTimeout);
      }
    };
  }, [currentSlide, autoplay, wrapAround, disableAnimation, propsSpeed, slidesToShow, count]);
  (0, _react.useEffect)(function () {
    if (enableKeyboardControls && keyboardMove && focus.current) {
      switch (keyboardMove) {
        case 'nextSlide':
          nextSlide();
          break;

        case 'previousSlide':
          prevSlide();
          break;

        case 'firstSlide':
          setCurrentSlide(0);
          break;

        case 'lastSlide':
          setCurrentSlide(count - slidesToShow);
          break;

        case 'pause':
          if (pause && autoplay) {
            setPause(false);
            break;
          } else if (autoplay) {
            setPause(true);
            break;
          }

          break;
      }

      setKeyboardMove(null);
    }
  }, [keyboardMove, enableKeyboardControls, count, slidesToShow, pause, autoplay, nextSlide, prevSlide]);
  var onKeyPress = (0, _react.useCallback)(function (e) {
    if (enableKeyboardControls && focus.current && e.keyCode) {
      var keyConfig = keyCodeConfig;

      for (var func in keyConfig) {
        var _keyConfig;

        if ((_keyConfig = keyConfig[func]) !== null && _keyConfig !== void 0 && _keyConfig.includes(e.keyCode)) {
          setKeyboardMove(func);
        }
      }
    }
  }, [enableKeyboardControls, keyCodeConfig]);
  (0, _react.useEffect)(function () {
    if (carouselEl && carouselEl.current) {
      carouselWidth.current = carouselEl.current.offsetWidth;
    } else if (innerRef) {
      carouselWidth.current = innerRef.current.offsetWidth;
    }

    if (enableKeyboardControls) {
      (0, _utils.addEvent)(document, 'keydown', onKeyPress);
    }

    return function () {
      (0, _utils.removeEvent)(document, 'keydown', onKeyPress);
    };
  }, [enableKeyboardControls, innerRef, onKeyPress]);
  var handleDragEnd = (0, _react.useCallback)(function (e) {
    if (!dragging || !isDragging) return;
    setIsDragging(false);
    onDragEnd(e);

    if (Math.abs(move) <= dragThreshold) {
      moveSlide();
      setMove(0);
      prevMove.current = 0;
      return;
    }

    if (move > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    setMove(0);
    prevMove.current = 0;
  }, [dragThreshold, isDragging, move, moveSlide, nextSlide, onDragEnd, prevSlide, dragging]);
  var onTouchStart = (0, _react.useCallback)(function (e) {
    if (!swiping) {
      return;
    }

    setIsDragging(true);
    onDragStart(e);
  }, [onDragStart, swiping]);
  var handlePointerMove = (0, _react.useCallback)(function (m) {
    if (!dragging || !isDragging) return;
    var moveValue = m * 0.75; // Friction

    var moveState = move + (moveValue - prevMove.current); // Exit drag early if passed threshold

    if (Math.abs(move) > dragThreshold) {
      handleDragEnd();
      return;
    }

    if (!wrapAround && disableEdgeSwiping && (currentSlide <= 0 && moveState <= 0 || moveState > 0 && currentSlide >= count - slidesToShow)) {
      prevMove.current = moveValue;
      return;
    }

    if (prevMove.current !== 0) {
      setMove(moveState);
    }

    prevMove.current = moveValue;
  }, [count, currentSlide, disableEdgeSwiping, dragThreshold, isDragging, handleDragEnd, move, dragging, slidesToShow, wrapAround]);
  var onTouchMove = (0, _react.useCallback)(function (e) {
    if (!dragging || !isDragging) return;
    onDragStart(e);
    var moveValue = ((carouselWidth === null || carouselWidth === void 0 ? void 0 : carouselWidth.current) || 0) - e.touches[0].pageX;
    handlePointerMove(moveValue);
  }, [dragging, isDragging, handlePointerMove, onDragStart]);
  var onMouseDown = (0, _react.useCallback)(function (e) {
    var _carouselRef$current;

    if (!dragging) return;
    carouselRef === null || carouselRef === void 0 ? void 0 : (_carouselRef$current = carouselRef.current) === null || _carouselRef$current === void 0 ? void 0 : _carouselRef$current.focus();
    setIsDragging(true);
    onDragStart(e);
  }, [carouselRef, dragging, onDragStart]);
  var onMouseMove = (0, _react.useCallback)(function (e) {
    var _carouselRef$current2;

    if (!dragging || !isDragging) return;
    onDrag(e);
    var offsetX = e.clientX - (((_carouselRef$current2 = carouselRef.current) === null || _carouselRef$current2 === void 0 ? void 0 : _carouselRef$current2.getBoundingClientRect().left) || 0);
    var moveValue = ((carouselWidth === null || carouselWidth === void 0 ? void 0 : carouselWidth.current) || 0) - offsetX;
    handlePointerMove(moveValue);
  }, [carouselRef, isDragging, handlePointerMove, onDrag, dragging]);
  var onMouseUp = (0, _react.useCallback)(function (e) {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    handleDragEnd(e);
  }, [handleDragEnd]);
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

  var _useFrameHeight = (0, _useFrameHeight2.useFrameHeight)({
    adaptiveHeight: adaptiveHeight,
    slidesToShow: slidesToShow
  }),
      frameHeight = _useFrameHeight.frameHeight,
      handleVisibleSlideHeightChange = _useFrameHeight.handleVisibleSlideHeightChange,
      areHeightsCalculated = _useFrameHeight.areHeightsCalculated;

  var renderSlides = function renderSlides(typeOfSlide) {
    var slides = _react["default"].Children.map(children, function (child, index) {
      var isCurrentSlide = wrapAround ? currentSlide === index || currentSlide === index + count || currentSlide === index - count : currentSlide === index;
      return /*#__PURE__*/_react["default"].createElement(_slide["default"], {
        key: "".concat(typeOfSlide, "-").concat(index),
        count: count,
        currentSlide: currentSlide,
        index: index,
        isCurrentSlide: isCurrentSlide,
        typeOfSlide: typeOfSlide,
        wrapAround: wrapAround,
        cellSpacing: cellSpacing,
        animation: animation,
        slidesToShow: slidesToShow,
        speed: propsSpeed,
        zoomScale: zoomScale,
        cellAlign: cellAlign,
        onVisibleSlideHeightChange: handleVisibleSlideHeightChange,
        adaptiveHeight: adaptiveHeight,
        slideClassName: slideClassName
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
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/_react["default"].createElement(_announceSlide["default"], {
    ariaLive: autoplay && !pause ? 'off' : 'polite',
    message: renderAnnounceSlideMessage({
      currentSlide: slide,
      count: count
    })
  }), (0, _controls["default"])(props, count, currentSlide, moveSlide, nextSlide, prevSlide, slidesToScroll), /*#__PURE__*/_react["default"].createElement("div", {
    className: ['slider-frame', className || ''].join(' ').trim(),
    style: _objectSpread({
      overflow: 'hidden',
      width: '100%',
      position: 'relative',
      outline: 'none',
      height: areHeightsCalculated ? frameHeight : 'auto'
    }, style),
    "aria-label": frameAriaLabel,
    role: "region",
    tabIndex: 0,
    onFocus: function onFocus() {
      return focus.current = true;
    },
    onBlur: function onBlur() {
      return focus.current = false;
    },
    ref: innerRef || carouselEl,
    onMouseUp: onMouseUp,
    onMouseDown: onMouseDown,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseUp,
    onTouchStart: onTouchStart,
    onTouchEnd: handleDragEnd,
    onTouchMove: onTouchMove
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: ['slider-list', props.listClassName].filter(function (value) {
      return value;
    }).join(' '),
    style: (0, _sliderList.getSliderListStyles)(children, currentSlide, animationEnabled, slidesToShow, cellAlign, wrapAround, propsSpeed, move, animation)
  }, wrapAround ? renderSlides('prev-cloned') : null, renderSlides(), wrapAround ? renderSlides('next-cloned') : null)));
});

exports.Carousel = Carousel;
Carousel.defaultProps = _defaultCarouselProps["default"];
var _default = Carousel;
exports["default"] = _default;