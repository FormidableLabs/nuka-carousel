"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPercentOffsetForSlide = exports.SliderList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _defaultControls = require("./default-controls");

var _useTween2 = require("./hooks/use-tween");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getPercentOffsetForSlide = function getPercentOffsetForSlide(currentSlide, slideCount, slidesToShow, cellAlign, wrapAround) {
  // When wrapAround is enabled, we show the slides 3 times
  var renderedSlideCount = wrapAround ? 3 * slideCount : slideCount;
  var singleSlidePercentOfWhole = 100 / renderedSlideCount; // When wrap is on, -33.33% puts us right on the center, true set of slides
  // (the left and right sets are clones meant to avoid visual gaps)

  var slide0Offset = wrapAround ? -100 / 3 : 0;

  if (cellAlign === 'right' && slidesToShow > 1) {
    var excessSlides = slidesToShow - 1;
    slide0Offset += singleSlidePercentOfWhole * excessSlides;
  }

  if (cellAlign === 'center' && slidesToShow > 1) {
    var _excessSlides = slidesToShow - 1; // Half of excess is on left and half is on right when centered


    var excessLeftSlides = _excessSlides / 2;
    slide0Offset += singleSlidePercentOfWhole * excessLeftSlides;
  }

  var currentSlideOffsetFrom0 = 100 / renderedSlideCount * currentSlide;
  return slide0Offset - currentSlideOffsetFrom0;
};

exports.getPercentOffsetForSlide = getPercentOffsetForSlide;

var SliderList = /*#__PURE__*/_react["default"].forwardRef(function (_ref, forwardedRef) {
  var animation = _ref.animation,
      animationDistance = _ref.animationDistance,
      cellAlign = _ref.cellAlign,
      children = _ref.children,
      currentSlide = _ref.currentSlide,
      disableAnimation = _ref.disableAnimation,
      disableEdgeSwiping = _ref.disableEdgeSwiping,
      draggedOffset = _ref.draggedOffset,
      easing = _ref.easing,
      edgeEasing = _ref.edgeEasing,
      isDragging = _ref.isDragging,
      scrollMode = _ref.scrollMode,
      slideCount = _ref.slideCount,
      slidesToScroll = _ref.slidesToScroll,
      slidesToShow = _ref.slidesToShow,
      speed = _ref.speed,
      wrapAround = _ref.wrapAround,
      slideWidth = _ref.slideWidth,
      setIsAnimating = _ref.setIsAnimating;
  // When wrapAround is enabled, we show the slides 3 times
  var renderedSlideCount = wrapAround ? 3 * slideCount : slideCount;
  var listVisibleWidth = slideWidth ? "calc(".concat(slideWidth, " * ").concat(renderedSlideCount, ")") : "".concat(renderedSlideCount * 100 / slidesToShow, "%");
  var percentOffsetForSlideProps = [slideCount, slidesToShow, cellAlign, wrapAround]; // We recycle dot index generation to determine the leftmost and rightmost
  // indices used, to be used in calculating the x-translation values we need
  // to limit to or when edgeEasing should be used.

  var dotIndexes = (0, _defaultControls.getDotIndexes)(slideCount, slidesToScroll, scrollMode, slidesToShow, wrapAround, cellAlign);
  var clampedDraggedOffset = "".concat(draggedOffset, "px");

  if (isDragging && disableEdgeSwiping && !wrapAround) {
    var clampOffsets = [dotIndexes[0], dotIndexes[dotIndexes.length - 1]].map(function (index) {
      return getPercentOffsetForSlide.apply(void 0, [index].concat(percentOffsetForSlideProps));
    }); // Offsets are seemingly backwards because the rightmost slide creates
    // the most negative translate value

    clampedDraggedOffset = "clamp(".concat(clampOffsets[1], "%, ").concat(draggedOffset, "px, ").concat(clampOffsets[0], "%)");
  }

  var slideBasedOffset = getPercentOffsetForSlide.apply(void 0, [currentSlide].concat(percentOffsetForSlideProps));
  var isEdgeEasing = !disableEdgeSwiping && !wrapAround && (currentSlide === dotIndexes[0] && animationDistance < 0 || currentSlide === dotIndexes[dotIndexes.length - 1] && animationDistance > 0);

  var _useTween = (0, _useTween2.useTween)(speed, !isEdgeEasing ? easing : edgeEasing, // animationDistance is assumed to be unique enough that it can be used to
  // detect when a new animation should start. This is used in addition to
  // currentSlide because some animations, such as those with edgeEasing, do
  // not occur due to a change in value of currentSlide
  currentSlide + animationDistance, isDragging || disableAnimation || animation === 'fade'),
      transition = _useTween.value,
      isAnimating = _useTween.isAnimating; // Return undefined if the transform would be 0 pixels since transforms can
  // cause flickering in chrome.


  var positioning;

  if (isDragging || slideBasedOffset !== 0 || isAnimating) {
    if (isDragging) {
      positioning = "translateX(".concat(clampedDraggedOffset, ")");
    } else {
      var transitionOffset = isAnimating ? (1 - transition) * animationDistance : 0;
      positioning = "translateX(calc(".concat(slideBasedOffset, "% - ").concat(transitionOffset, "px))");
    }
  }

  (0, _react.useEffect)(function () {
    setIsAnimating(isAnimating);
  }, [isAnimating, setIsAnimating]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: forwardedRef,
    className: "slider-list",
    style: {
      width: listVisibleWidth,
      textAlign: 'left',
      userSelect: 'auto',
      transform: positioning,
      display: 'flex'
    }
  }, children);
});

exports.SliderList = SliderList;
SliderList.displayName = 'SliderList';