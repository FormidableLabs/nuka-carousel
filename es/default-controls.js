"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prevButtonDisabled = exports.nextButtonDisabled = exports.getDotIndexes = exports.PreviousButton = exports.PauseButton = exports.PagingDots = exports.NextButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _types = require("./types");
var _utils = require("./utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
  var cellAlign = _ref.cellAlign,
    currentSlide = _ref.currentSlide,
    slidesToShow = _ref.slidesToShow,
    wrapAround = _ref.wrapAround;
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
var PreviousButton = function PreviousButton(_ref2) {
  var previousSlide = _ref2.previousSlide,
    _ref2$defaultControls = _ref2.defaultControlsConfig,
    prevButtonClassName = _ref2$defaultControls.prevButtonClassName,
    _ref2$defaultControls2 = _ref2$defaultControls.prevButtonStyle,
    prevButtonStyle = _ref2$defaultControls2 === void 0 ? {} : _ref2$defaultControls2,
    prevButtonText = _ref2$defaultControls.prevButtonText,
    prevButtonOnClick = _ref2$defaultControls.prevButtonOnClick,
    id = _ref2.id,
    onUserNavigation = _ref2.onUserNavigation,
    disabled = _ref2.previousDisabled;
  var handleClick = function handleClick(event) {
    prevButtonOnClick === null || prevButtonOnClick === void 0 || prevButtonOnClick(event);
    if (event.defaultPrevented) return;
    onUserNavigation(event);
    event.preventDefault();
    previousSlide();
  };
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: prevButtonClassName,
    style: _objectSpread(_objectSpread({}, defaultButtonStyles(disabled)), prevButtonStyle),
    disabled: disabled,
    onClick: handleClick,
    "aria-controls": "".concat(id, "-slides"),
    "aria-label": "previous",
    type: "button"
  }, prevButtonText || 'Prev');
};
exports.PreviousButton = PreviousButton;
var nextButtonDisabled = function nextButtonDisabled(_ref3) {
  var cellAlign = _ref3.cellAlign,
    currentSlide = _ref3.currentSlide,
    slideCount = _ref3.slideCount,
    slidesToShow = _ref3.slidesToShow,
    wrapAround = _ref3.wrapAround;
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
var NextButton = function NextButton(_ref4) {
  var nextSlide = _ref4.nextSlide,
    _ref4$defaultControls = _ref4.defaultControlsConfig,
    nextButtonClassName = _ref4$defaultControls.nextButtonClassName,
    _ref4$defaultControls2 = _ref4$defaultControls.nextButtonStyle,
    nextButtonStyle = _ref4$defaultControls2 === void 0 ? {} : _ref4$defaultControls2,
    nextButtonText = _ref4$defaultControls.nextButtonText,
    nextButtonOnClick = _ref4$defaultControls.nextButtonOnClick,
    id = _ref4.id,
    disabled = _ref4.nextDisabled,
    onUserNavigation = _ref4.onUserNavigation;
  var handleClick = function handleClick(event) {
    nextButtonOnClick === null || nextButtonOnClick === void 0 || nextButtonOnClick(event);
    if (event.defaultPrevented) return;
    onUserNavigation(event);
    event.preventDefault();
    nextSlide();
  };
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: nextButtonClassName,
    style: _objectSpread(_objectSpread({}, defaultButtonStyles(disabled)), nextButtonStyle),
    disabled: disabled,
    onClick: handleClick,
    "aria-label": "next",
    "aria-controls": "".concat(id, "-slides"),
    type: "button"
  }, nextButtonText || 'Next');
};
exports.NextButton = NextButton;
var PauseButton = function PauseButton(_ref5) {
  var autoplay = _ref5.autoplay,
    pause = _ref5.pause,
    setPause = _ref5.setPause;
  if (!autoplay) return null;
  return /*#__PURE__*/_react["default"].createElement("button", {
    style: _objectSpread(_objectSpread({}, defaultButtonStyles(false)), {}, {
      marginBottom: '1rem'
    }),
    onClick: function onClick() {
      return setPause(!pause);
    },
    "aria-label": pause ? 'play' : 'pause',
    "data-testid": "pause-button",
    type: "button"
  }, pause ? 'Play' : 'Pause');
};

/**
 * Calculate the indices that each dot will jump to when clicked
 */
exports.PauseButton = PauseButton;
var getDotIndexes = function getDotIndexes(slideCount, slidesToScroll, scrollMode, slidesToShow, wrapAround, cellAlign) {
  var dotIndexes = [];
  var scrollSlides = slidesToScroll <= 0 ? 1 : slidesToScroll;
  if (wrapAround) {
    for (var i = 0; i < slideCount; i += scrollSlides) {
      dotIndexes.push(i);
    }
    return dotIndexes;
  }
  if (cellAlign === 'center') {
    for (var _i = 0; _i < slideCount - 1; _i += scrollSlides) {
      dotIndexes.push(_i);
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
    var lastPossibleIndexWithoutWhitespace = slideCount - slidesToShow;
    for (var _i2 = 0; _i2 < lastPossibleIndexWithoutWhitespace; _i2 += scrollSlides) {
      dotIndexes.push(_i2);
    }
    if (scrollMode === _types.ScrollMode.remainder) {
      dotIndexes.push(lastPossibleIndexWithoutWhitespace);
    } else {
      dotIndexes.push(dotIndexes[dotIndexes.length - 1] + scrollSlides);
    }
    return dotIndexes;
  }
  if (cellAlign === 'right') {
    if (slidesToShow >= slideCount) {
      return [slideCount - 1];
    }
    var firstPossibleIndexWithoutWhitespace = slidesToShow - 1;
    if (scrollMode === _types.ScrollMode.remainder) {
      for (var _i3 = firstPossibleIndexWithoutWhitespace; _i3 < slideCount - 1; _i3 += scrollSlides) {
        dotIndexes.push(_i3);
      }
      dotIndexes.push(slideCount - 1);
    } else {
      for (var _i4 = slideCount - 1; _i4 > firstPossibleIndexWithoutWhitespace; _i4 -= scrollSlides) {
        dotIndexes.push(_i4);
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
var PagingDots = function PagingDots(_ref6) {
  var pagingDotsIndices = _ref6.pagingDotsIndices,
    _ref6$defaultControls = _ref6.defaultControlsConfig,
    pagingDotsContainerClassName = _ref6$defaultControls.pagingDotsContainerClassName,
    pagingDotsClassName = _ref6$defaultControls.pagingDotsClassName,
    _ref6$defaultControls2 = _ref6$defaultControls.pagingDotsStyle,
    pagingDotsStyle = _ref6$defaultControls2 === void 0 ? {} : _ref6$defaultControls2,
    pagingDotsOnClick = _ref6$defaultControls.pagingDotsOnClick,
    id = _ref6.id,
    currentSlide = _ref6.currentSlide,
    onUserNavigation = _ref6.onUserNavigation,
    slideCount = _ref6.slideCount,
    tabbed = _ref6.tabbed,
    goToSlide = _ref6.goToSlide;
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
  var currentSlideBounded = (0, _utils.getBoundedIndex)(currentSlide, slideCount);
  if (!tabbed) return null;
  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: pagingDotsContainerClassName,
    style: listStyles,
    role: "tablist"
  }, pagingDotsIndices.map(function (slideIndex, i) {
    var isActive = currentSlideBounded === slideIndex ||
    // sets navigation dots active if the current slide falls in the current index range
    currentSlideBounded < slideIndex && (i === 0 || currentSlideBounded > pagingDotsIndices[i - 1]);
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: slideIndex,
      className: isActive ? 'paging-item active' : 'paging-item'
    }, /*#__PURE__*/_react["default"].createElement("button", {
      className: pagingDotsClassName,
      type: "button",
      style: _objectSpread(_objectSpread({}, getButtonStyles(isActive)), pagingDotsStyle),
      onClick: function onClick(event) {
        pagingDotsOnClick === null || pagingDotsOnClick === void 0 || pagingDotsOnClick(event);
        if (event.defaultPrevented) return;
        onUserNavigation(event);
        goToSlide(slideIndex);
      },
      "aria-label": "slide ".concat(slideIndex + 1),
      "aria-selected": isActive,
      "aria-controls": "".concat(id, "-slide-").concat(slideIndex + 1),
      role: "tab"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "paging-dot",
      width: "6",
      height: "6",
      "aria-hidden": "true",
      focusable: "false",
      viewBox: "0 0 6 6"
    }, /*#__PURE__*/_react["default"].createElement("circle", {
      cx: "3",
      cy: "3",
      r: "3"
    }))));
  }));
};
exports.PagingDots = PagingDots;