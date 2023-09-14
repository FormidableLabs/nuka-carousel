"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("./types");

var _defaultControls = require("./default-controls");

var _announceSlide = require("./announce-slide");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var easeOut = function easeOut(t) {
  return Math.pow(t - 1, 3) + 1;
};

var defaultProps = {
  adaptiveHeight: false,
  adaptiveHeightAnimation: true,
  afterSlide: function afterSlide() {// do nothing
  },
  autoplay: false,
  autoplayInterval: 3000,
  autoplayReverse: false,
  beforeSlide: function beforeSlide() {// do nothing
  },
  carouselId: 'nuka-carousel',
  cellAlign: 'left',
  cellSpacing: 0,
  defaultControlsConfig: {},
  disableAnimation: false,
  disableEdgeSwiping: false,
  dragging: true,
  dragThreshold: 0.5,
  easing: easeOut,
  edgeEasing: easeOut,
  enableKeyboardControls: false,
  frameAriaLabel: 'Slider',
  keyCodeConfig: {
    nextSlide: [39, 68, 38, 87],
    previousSlide: [37, 65, 40, 83],
    firstSlide: [81],
    lastSlide: [69],
    pause: [32]
  },
  landmark: false,
  onDragStart: function onDragStart() {// do nothing
  },
  onDrag: function onDrag() {// do nothing
  },
  onDragEnd: function onDragEnd() {// do nothing
  },
  onUserNavigation: function onUserNavigation() {// do nothing
  },
  pauseOnHover: true,
  renderAnnounceSlideMessage: _announceSlide.defaultRenderAnnounceSlideMessage,
  renderBottomCenterControls: function renderBottomCenterControls(props) {
    return /*#__PURE__*/_react["default"].createElement(_defaultControls.PagingDots, props);
  },
  renderCenterLeftControls: function renderCenterLeftControls(props) {
    return /*#__PURE__*/_react["default"].createElement(_defaultControls.PreviousButton, props);
  },
  renderCenterRightControls: function renderCenterRightControls(props) {
    return /*#__PURE__*/_react["default"].createElement(_defaultControls.NextButton, props);
  },
  scrollMode: _types.ScrollMode.page,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  style: {},
  swiping: true,
  tabbed: true,
  vertical: false,
  withoutControls: false,
  wrapAround: false,
  children: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null)
};
var _default = defaultProps;
exports["default"] = _default;