"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSliderListStyles = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSliderListWidth = function getSliderListWidth(count, slidesToShow, wrapAround) {
  var visibleSlides = slidesToShow || 1;

  if (wrapAround) {
    var _percentage = count * 100 / visibleSlides;

    return "".concat(3 * _percentage, "%");
  }

  var percentage = count * 100 / visibleSlides;
  return "".concat(percentage, "%");
};

var getTransition = function getTransition(count, initialValue, currentSlide, cellAlign, wrapAround) {
  if (cellAlign === _types.Alignment.Left) {
    if (wrapAround) {
      var _slideTransition = 100 / (3 * count);

      var currentTransition = initialValue - _slideTransition * (currentSlide - 1);
      return currentTransition - _slideTransition;
    }

    var slideTransition = 100 / count * currentSlide;
    return -(slideTransition + initialValue);
  } else if (cellAlign === _types.Alignment.Center) {
    if (wrapAround) {
      var _slideTransition3 = 100 / (3 * count);

      var _currentTransition = initialValue - _slideTransition3 * (currentSlide - 1);

      return _currentTransition - _slideTransition3;
    }

    var _slideTransition2 = 100 / count * currentSlide;

    return initialValue - _slideTransition2;
  } else if (cellAlign === _types.Alignment.Right) {
    if (wrapAround) {
      var _slideTransition5 = 100 / (3 * count);

      var _currentTransition2 = initialValue - _slideTransition5 * (currentSlide - 1);

      return _currentTransition2 - _slideTransition5;
    }

    var _slideTransition4 = 100 / count * currentSlide;

    return initialValue - _slideTransition4;
  }

  return initialValue;
};

var getPositioning = function getPositioning(cellAlign, slidesToShow, count, currentSlide, wrapAround, move) {
  // When wrapAround is enabled, we show the slides 3 times
  var totalCount = wrapAround ? 3 * count : count;
  var slideSize = 100 / totalCount;
  var initialValue = wrapAround ? -count * slideSize : 0;

  if (cellAlign === _types.Alignment.Right && slidesToShow > 1) {
    var excessSlides = slidesToShow - 1;
    initialValue += slideSize * excessSlides;
  }

  if (cellAlign === _types.Alignment.Center && slidesToShow > 1) {
    var _excessSlides = slidesToShow - 1; // Half of excess is on left and half is on right when centered


    var excessLeftSlides = _excessSlides / 2;
    initialValue += slideSize * excessLeftSlides;
  }

  var horizontalMove = getTransition(count, initialValue, currentSlide, cellAlign, wrapAround); // Special-case this. It's better to return undefined rather than a
  // transform of 0 pixels since transforms can cause flickering in chrome.

  if (move === 0 && horizontalMove === 0) {
    return undefined;
  }

  var draggableMove = move ? "calc(".concat(horizontalMove, "% - ").concat(move, "px)") : "".concat(horizontalMove, "%");
  return "translate3d(".concat(draggableMove, ", 0, 0)");
};

var getSliderListStyles = function getSliderListStyles(children, currentSlide, animation, slidesToShow, cellAlign, wrapAround, speed, move, slideAnimation) {
  var count = _react["default"].Children.count(children);

  var width = getSliderListWidth(count, slidesToShow, wrapAround);
  var positioning = getPositioning(cellAlign || _types.Alignment.Left, slidesToShow || 1, count, currentSlide, wrapAround, move);
  return {
    width: width,
    textAlign: 'left',
    transition: animation && slideAnimation !== 'fade' ? "".concat(speed || 500, "ms ease 0s") : undefined,
    transform: positioning,
    display: 'flex'
  };
};

exports.getSliderListStyles = getSliderListStyles;