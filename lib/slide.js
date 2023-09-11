"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _useSlideIntersectionObserver = require("./hooks/use-slide-intersection-observer");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var getSlideWidth = function getSlideWidth(count, wrapAround) {
  return "".concat(wrapAround ? 100 / (3 * count) : 100 / count, "%");
};
var getSlideStyles = function getSlideStyles(count, isCurrentSlide, isVisibleSlide, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight, initializedAdaptiveHeight, slideWidth) {
  var width = slideWidth !== null && slideWidth !== void 0 ? slideWidth : getSlideWidth(count, wrapAround);
  // const width = getSlideWidth(count, wrapAround);
  var visibleSlideOpacity = isVisibleSlide ? 1 : 0;
  var animationSpeed = animation === 'fade' ? 200 : 500;
  var height = 'auto';
  if (adaptiveHeight) {
    if (initializedAdaptiveHeight) {
      // Once adaptiveHeight is initialized, the frame will size to the height
      // of all the visible slides
      height = '100%';
    } else if (isVisibleSlide) {
      // If the slide is visible but we're still measuring heights, have
      // visible slides just take up their natural height
      height = 'auto';
    } else {
      // If the slide is not visible and we're still measuring heights, the
      // slide should have height 0 so it doesn't contribute to the measured
      // height of the frame
      height = '0';
    }
  }
  return {
    width: width,
    height: height,
    padding: "0 ".concat(cellSpacing ? cellSpacing / 2 : 0, "px"),
    transition: animation ? "".concat(speed || animationSpeed, "ms ease 0s") : undefined,
    transform: animation === 'zoom' ? "scale(".concat(isCurrentSlide && isVisibleSlide ? 1 : zoomScale || 0.85, ")") : undefined,
    opacity: animation === 'fade' ? visibleSlideOpacity : 1
  };
};
var generateIndex = function generateIndex(index, count, typeOfSlide) {
  if (typeOfSlide === 'prev-cloned') {
    return index - count;
  }
  if (typeOfSlide === 'next-cloned') {
    return index + count;
  }
  return index;
};
var Slide = function Slide(_ref) {
  var _entry$intersectionRa;
  var count = _ref.count,
    children = _ref.children,
    index = _ref.index,
    isCurrentSlide = _ref.isCurrentSlide,
    typeOfSlide = _ref.typeOfSlide,
    wrapAround = _ref.wrapAround,
    cellSpacing = _ref.cellSpacing,
    slideWidth = _ref.slideWidth,
    animation = _ref.animation,
    speed = _ref.speed,
    zoomScale = _ref.zoomScale,
    onVisibleSlideHeightChange = _ref.onVisibleSlideHeightChange,
    adaptiveHeight = _ref.adaptiveHeight,
    initializedAdaptiveHeight = _ref.initializedAdaptiveHeight,
    updateIOEntry = _ref.updateIOEntry,
    id = _ref.id,
    carouselRef = _ref.carouselRef,
    tabbed = _ref.tabbed;
  var customIndex = wrapAround ? generateIndex(index, count, typeOfSlide) : index;
  var slideRef = (0, _react.useRef)(null);
  var entry = (0, _useSlideIntersectionObserver.useSlideIntersectionObserver)(slideRef, carouselRef, function (entry) {
    updateIOEntry(id, (entry === null || entry === void 0 ? void 0 : entry.intersectionRatio) >= 0.95);
  });
  var isVisible = !!(entry !== null && entry !== void 0 && entry.isIntersecting);
  var isFullyVisible = ((_entry$intersectionRa = entry === null || entry === void 0 ? void 0 : entry.intersectionRatio) !== null && _entry$intersectionRa !== void 0 ? _entry$intersectionRa : 1) >= 0.95;
  var prevIsVisibleRef = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    var node = slideRef.current;
    if (node) {
      var _node$getBoundingClie;
      var slideHeight = (_node$getBoundingClie = node.getBoundingClientRect()) === null || _node$getBoundingClie === void 0 ? void 0 : _node$getBoundingClie.height;
      var prevIsVisible = prevIsVisibleRef.current;
      if (isVisible && !prevIsVisible) {
        onVisibleSlideHeightChange(customIndex, slideHeight);
      } else if (!isVisible && prevIsVisible) {
        onVisibleSlideHeightChange(customIndex, null);
      }
      prevIsVisibleRef.current = isVisible;
    }
  }, [customIndex, isVisible, onVisibleSlideHeightChange]);
  var currentSlideClass = isCurrentSlide && isFullyVisible ? ' slide-current' : '';
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: slideRef,
    inert: isFullyVisible ? undefined : 'true',
    className: "slide".concat(currentSlideClass).concat(typeOfSlide ? " ".concat(typeOfSlide) : '').concat(isFullyVisible ? ' slide-visible' : ''),
    style: getSlideStyles(count, isCurrentSlide, isFullyVisible, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight, initializedAdaptiveHeight, slideWidth),
    id: typeOfSlide ? undefined : "".concat(id, "-slide-").concat(index + 1),
    role: tabbed ? 'tabpanel' : 'group',
    "aria-roledescription": tabbed ? undefined : 'slide'
  }, children);
};
var _default = Slide;
exports["default"] = _default;