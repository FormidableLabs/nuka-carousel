"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prevButtonDisabled = exports.nextButtonDisabled = exports.getDotIndexes = exports.PreviousButton = exports.PagingDots = exports.NextButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _types = require("./types");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultButtonStyles = function defaultButtonStyles(disabled) {
  return {
    border: 0,
    background: 'rgba(0,0,0,0.4)',
    color: 'white',
    padding: 10,
    textTransform: 'uppercase',
    opacity: disabled ? 0.3 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer'
  };
};

var prevButtonDisabled = function prevButtonDisabled(_ref) {
  var currentSlide = _ref.currentSlide,
      slideCount = _ref.slideCount,
      slidesToShow = _ref.slidesToShow,
      wrapAround = _ref.wrapAround;

  // inifite carousel with visible slides that are less than all slides
  if (wrapAround && slidesToShow < slideCount) {
    return false;
  } // inifite carousel with visible slide equal or less than all slides


  if (wrapAround) {
    return false;
  } // if the first slide is not visible return false (button is not disabled)


  if (currentSlide !== 0) {
    return false;
  }

  return true;
};

exports.prevButtonDisabled = prevButtonDisabled;

var PreviousButton = function PreviousButton(props) {
  var handleClick = function handleClick(event) {
    event.preventDefault();
    props === null || props === void 0 ? void 0 : props.previousSlide();
  };

  var _ref2 = props.defaultControlsConfig || {},
      prevButtonClassName = _ref2.prevButtonClassName,
      _ref2$prevButtonStyle = _ref2.prevButtonStyle,
      prevButtonStyle = _ref2$prevButtonStyle === void 0 ? {} : _ref2$prevButtonStyle,
      prevButtonText = _ref2.prevButtonText;

  var disabled = prevButtonDisabled(props);
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: prevButtonClassName,
    style: _objectSpread(_objectSpread({}, defaultButtonStyles(disabled)), prevButtonStyle),
    disabled: disabled,
    onClick: handleClick,
    "aria-label": "previous",
    type: "button"
  }, prevButtonText || 'Prev');
};

exports.PreviousButton = PreviousButton;

var nextButtonDisabled = function nextButtonDisabled(_ref3) {
  var currentSlide = _ref3.currentSlide,
      slideCount = _ref3.slideCount,
      slidesToShow = _ref3.slidesToShow,
      slidesToScroll = _ref3.slidesToScroll,
      wrapAround = _ref3.wrapAround,
      scrollMode = _ref3.scrollMode;

  // remainder scroll mode
  if (!wrapAround && scrollMode === _types.ScrollMode.remainder && currentSlide >= slideCount - slidesToShow) {
    return true;
  } // inifite carousel with visible slides that are less than all slides


  if (wrapAround && slidesToShow < slideCount) {
    return false;
  } // inifite carousel with visible slide equal or less than all slides


  if (wrapAround) {
    return false;
  } // if the last slide is not visible return false (button is not disabled)


  if (currentSlide < slideCount - slidesToScroll) {
    return false;
  }

  return true;
};

exports.nextButtonDisabled = nextButtonDisabled;

var NextButton = function NextButton(props) {
  var handleClick = function handleClick(event) {
    event.preventDefault();
    props.nextSlide();
  };

  var defaultControlsConfig = props.defaultControlsConfig;
  var nextButtonClassName = defaultControlsConfig.nextButtonClassName,
      _defaultControlsConfi = defaultControlsConfig.nextButtonStyle,
      nextButtonStyle = _defaultControlsConfi === void 0 ? {} : _defaultControlsConfi,
      nextButtonText = defaultControlsConfig.nextButtonText;
  var disabled = nextButtonDisabled(props);
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: nextButtonClassName,
    style: _objectSpread(_objectSpread({}, defaultButtonStyles(disabled)), nextButtonStyle),
    disabled: disabled,
    onClick: handleClick,
    "aria-label": "next",
    type: "button"
  }, nextButtonText || 'Next');
};

exports.NextButton = NextButton;

var getDotIndexes = function getDotIndexes(slideCount, slidesToScroll, scrollMode, slidesToShow, wrapAround) {
  var dotIndexes = [];
  var scrollSlides = slidesToScroll === 0 ? 1 : slidesToScroll;

  for (var i = 0; i < slideCount; i += scrollSlides) {
    if (!(!wrapAround && scrollMode === _types.ScrollMode.remainder && i > slideCount - slidesToShow)) {
      dotIndexes.push(i);
    }
  } // check if the slidesToShow is float value, if true add the last dot (remainder scroll mode)


  if (!wrapAround && scrollMode === _types.ScrollMode.remainder && slidesToShow % 1 !== 0) {
    var lastIndex = dotIndexes[dotIndexes.length - 1];
    dotIndexes.push(lastIndex + slidesToShow % 1);
  }

  return dotIndexes;
};

exports.getDotIndexes = getDotIndexes;

var PagingDots = function PagingDots(props) {
  var listStyles = {
    position: 'relative',
    top: -10,
    display: 'flex',
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  };
  var getButtonStyles = (0, _react.useCallback)(function (active) {
    return {
      cursor: 'pointer',
      opacity: active ? 1 : 0.5,
      background: 'transparent',
      border: 'none',
      fill: 'black'
    };
  }, []);
  var indexes = (0, _react.useMemo)(function () {
    return getDotIndexes(props.slideCount, props.slidesToScroll, props.scrollMode, props.slidesToShow, props.wrapAround);
  }, [props.slideCount, props.slidesToScroll, props.scrollMode, props.slidesToShow, props.wrapAround]);
  var _props$defaultControl = props.defaultControlsConfig,
      pagingDotsContainerClassName = _props$defaultControl.pagingDotsContainerClassName,
      pagingDotsClassName = _props$defaultControl.pagingDotsClassName,
      _props$defaultControl2 = _props$defaultControl.pagingDotsStyle,
      pagingDotsStyle = _props$defaultControl2 === void 0 ? {} : _props$defaultControl2;
  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: pagingDotsContainerClassName,
    style: listStyles
  }, indexes.map(function (index, i) {
    var isActive = props.currentSlide === index || props.currentSlide - props.slideCount === index || props.currentSlide + props.slideCount === index; // the below condition checks and sets navigation dots active if the current slide falls in the current index range

    if (props.currentSlide < index && props.currentSlide > indexes[i - 1]) {
      isActive = true;
    }

    return /*#__PURE__*/_react["default"].createElement("li", {
      key: index,
      className: isActive ? 'paging-item active' : 'paging-item'
    }, /*#__PURE__*/_react["default"].createElement("button", {
      className: pagingDotsClassName,
      type: "button",
      style: _objectSpread(_objectSpread({}, getButtonStyles(isActive)), pagingDotsStyle),
      onClick: props.goToSlide.bind(null, index),
      "aria-label": "slide ".concat(index + 1, " bullet"),
      "aria-selected": isActive
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "paging-dot",
      width: "6",
      height: "6",
      "aria-hidden": "true",
      focusable: "false"
    }, /*#__PURE__*/_react["default"].createElement("circle", {
      cx: "3",
      cy: "3",
      r: "3"
    }))));
  }));
};

exports.PagingDots = PagingDots;